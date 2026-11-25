import assert from 'node:assert/strict';
import { loadBatch, executeBatch, createClient } from './run-batch.mjs';
const {drafts}=await loadBatch();
let passed=0;
async function test(name,fn){await fn();passed++;console.log(`PASS ${name}`);}
function mock(options={}){
 const saved=new Map(drafts.map(p=>[p.queryId,{content:'<p>existing saved editor</p>',title:'Existing title',description:'Existing description'}]));
 const reads=new Map();const calls=[];const backups=[];
 const call=async(method,payload)=>{
  calls.push({method,payload});
  if(method==='list-queries')return drafts.map(p=>({query:p.queryId,keyword:p.expectedQueryKeyword,language:'English',engine:'google.com',tags:options.badTags&&p===drafts[0]?['DUPLICATE-DELETE']:['KEEP']}));
  if(method==='get-content'){
   assert.equal(payload.revision_type,'all');
   reads.set(payload.query,(reads.get(payload.query)??0)+1);
   if(options.concurrent&&payload.query===drafts[0].queryId&&reads.get(payload.query)===2)return {...saved.get(payload.query),content:'<p>new human autosave</p>'};
   if(options.unreadable&&payload.query===drafts[0].queryId)return {error:true};
   return {...saved.get(payload.query)};
  }
  if(method==='evaluate-content'){
   const candidate=drafts.some(p=>p.queryId===payload.query&&p.html===payload.html);
   if(options.invalidScore&&candidate)return {content_score:'90'};
   return {content_score:candidate?(options.candidate??80):(options.existing??70)};
  }
  if(method==='import-content'){
   if(options.timeout)throw Error('provider-http-504');
   saved.set(payload.query,{content:payload.html,title:payload.title,description:payload.description});return {status:'ok'};
  }
  throw Error('unexpected method');
 };
 const saveBackup=async(p,data)=>{if(options.backupFail)throw Error('backup-failed');backups.push({p,data});};
 return {call,saveBackup,calls,backups};
}
await test('real 20-page manifest, hashes, source scope and editorial gates',async()=>assert.equal(drafts.length,20));
await test('score mode never writes editors or backups',async()=>{
 const m=mock();const r=await executeBatch({drafts,...m,mode:'score'});
 assert.equal(r.length,20);assert.ok(r.every(r=>r.status==='scored-only'));
 assert.equal(m.calls.filter(c=>c.method==='import-content').length,0);assert.equal(m.backups.length,0);
});
await test('all 20 improved drafts have backups and verified readback',async()=>{
 const m=mock();const r=await executeBatch({drafts,...m,mode:'import'});
 assert.equal(m.backups.length,20);assert.ok(r.every(r=>r.status==='imported-and-readback-verified'));
});
await test('equal or stronger existing editors remain intact',async()=>{
 const m=mock({existing:85,candidate:80});const r=await executeBatch({drafts,...m,mode:'import'});
 assert.ok(r.every(r=>r.status==='kept-existing-equal-or-higher-score'));assert.equal(m.backups.length,0);assert.equal(m.calls.filter(c=>c.method==='import-content').length,0);
});
await test('invalid score is unknown and cannot authorize import',async()=>{
 const m=mock({invalidScore:true});const r=await executeBatch({drafts,...m,mode:'import'});
 assert.ok(r.every(r=>r.status==='blocked-editor-preserved'));assert.equal(m.calls.filter(c=>c.method==='import-content').length,0);
});
await test('a concurrent human autosave is preserved',async()=>{
 const m=mock({concurrent:true});const r=await executeBatch({drafts,...m,mode:'import'});
 assert.equal(r[0].status,'blocked-editor-preserved');assert.equal(m.calls.filter(c=>c.method==='import-content'&&c.payload.query===drafts[0].queryId).length,0);
});
await test('backup failure prevents every import',async()=>{
 const m=mock({backupFail:true});const r=await executeBatch({drafts,...m,mode:'import'});
 assert.ok(r.every(r=>r.status==='blocked-editor-preserved'));assert.equal(m.calls.filter(c=>c.method==='import-content').length,0);
});
await test('ambiguous import failure stops without retry or further writes',async()=>{
 const m=mock({timeout:true});const r=await executeBatch({drafts,...m,mode:'import'});
 assert.equal(r.length,1);assert.equal(r[0].status,'import-outcome-unconfirmed');assert.equal(m.calls.filter(c=>c.method==='import-content').length,1);
});
await test('deleted or duplicate-tagged mapping fails before editor access',async()=>{
 const m=mock({badTags:true});await assert.rejects(()=>executeBatch({drafts,...m,mode:'import'}),/held-or-duplicate/);
 assert.equal(m.calls.filter(c=>c.method==='get-content').length,0);
});
await test('new-analysis creation is not an allowed API operation',async()=>{
 const call=createClient('test-value',async()=>{throw Error('network must not run');});
 await assert.rejects(()=>call('new-query',{project:'9d0bec3a70f4743c'}),/bound-reached/);
});
console.log(`${passed}/${passed} tests passed. No live account calls or edits.`);
