import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';
import vm from 'node:vm';
import { assessEditorialDraft, selectNarratorQueries, sourcePrompt, sourcesFor, narratorWriteLimit } from '../agents/lib/editorial-quality.mjs';

const good = `<p class="lede">A useful pest inspection identifies the insect, records where activity occurs and looks for the conditions that keep bringing it back.</p><h2>What should you check first?</h2><p>Review food, water and entry points. <a href="https://www.epa.gov/safepestcontrol/dos-and-donts-pest-control">EPA prevention guidance</a>.</p>`;
assert.equal(assessEditorialDraft(good, { keyword: 'pest control' }).pass, true);
for (const [label, html] of [
  ['missing citation', good.replace(/<a[\s\S]*?<\/a>/, '')],
  ['deceptive domain', good.replace('www.epa.gov/', 'www.epa.gov.attacker.example/')],
  ['unverified page', good.replace('dos-and-donts-pest-control','invented-claim')],
  ['missing answer',good.replace(/<p class="lede">[\s\S]*?<\/p>/,'<p>Hello.</p>')],
  ['missing question',good.replace('What should you check first?','Inspection')],
  ['compliance regression',good.replace('A useful pest inspection','Our pet-safe pest inspection')],
  ['script',good+'<script>alert(1)</script>'],
  ['unsafe link scheme',good+'<a href="javascript:alert(1)">click</a>'],
  ['protocol relative',good+'<a href="//attacker.example">click</a>'],
  ['unquoted link',good+'<a href=javascript:alert(1)>click</a>'],
]) assert.equal(assessEditorialDraft(html, { keyword: 'pest control' }).pass, false, label);
assert.equal(assessEditorialDraft(good,{keyword:'mosquito control'}).pass,false,'topic-specific sources are required when available');
assert.equal(assessEditorialDraft(good,{keyword:'silverfish'}).pass,false,'a citation must be in the relevant topic list');
assert.ok(sourcePrompt('data center ipm').includes('not EPA certification'));
assert.ok(sourcesFor('rodents').some(s=>s.id==='cdc-rodents'));

const rows=[
 {id:'old',keyword:'Pest control Birmingham AL',updated:'2026-01-01'},
 {id:'new',keyword:' pest   control Birmingham AL ',updated:'2026-10-20'},
 {id:'pending',keyword:'pest control Birmingham AL',status:'pending',updated:'2026-10-25'},
 {id:'ready',keyword:'pest control Birmingham AL',status:'ready',updated:'2026-09-01'},
 {id:'dc',keyword:'data center ipm plan',updated:'2026-01-01'},
 {id:'no-keyword'},
];
const picked=selectNarratorQueries(rows,['data center ipm plan']);
assert.deepEqual(picked.map(q=>q.id),['dc','ready']);
assert.deepEqual(selectNarratorQueries(rows.slice(0,2)).map(q=>q.id),['new']);
assert.deepEqual(selectNarratorQueries([...rows].reverse(),['data center ipm plan']).map(q=>q.id),['dc','ready']);

// Execute the actual narrator in a VM with fake editor/LLM endpoints. This verifies
// the gate sits before import-content for hand drafts, auto drafts and FORCE;
// none of these tests uses credentials, sends email or changes an editor.
async function runNarrator({html=good,force=false,existingScore=null,hand=true,readFails=false,multi=false,maxWrites}={}) {
 const calls=[];const findings=[];const logs=[];
 const env={NEURONWRITER_API_KEY:'test-only',ANTHROPIC_API_KEY:'test-only',NARRATOR_SLEEP_MS:'0',...(maxWrites?{NARRATOR_MAX_WRITES:maxWrites}:{}),...(force?{NARRATOR_FORCE:'1'}:{})};
 const context=vm.createContext({console:{log(){},warn(){},error(){}},process:{env,argv:['node','narrator','fill'],exit(code){throw Error(`exit ${code}`);}},setTimeout(cb){cb();},URL,fetch:async (target,opts)=>{
  const method=String(target).split('/').pop();const req=JSON.parse(opts.body);calls.push({method,req});
  let out;
  if(String(target).includes('anthropic.com'))out={content:[{type:'text',text:html}]};
  else if(method==='list-queries')out=[{id:'q',keyword:'pest control',updated:'2026-10-20'},{id:'older',keyword:' pest  control ',updated:'2026-01-01'},...(multi?[{id:'second',keyword:'general pest control',updated:'2026-10-20'}]:[])];
  else if(method==='get-content'){
    if(readFails)return {ok:false,status:503,text:async()=>'{"error":"unavailable"}'};
    out=existingScore===null?{content:''}:{content:good,score:existingScore};
  }
  else if(method==='get-query')out={};
  else if(method==='evaluate-content'||method==='import-content')out={content_score:75};
  else throw Error(`unexpected fetch ${target}`);
  return {ok:true,status:200,text:async()=>JSON.stringify(out),json:async()=>out};
 }});
 const asModule=(key,exports)=>new vm.SyntheticModule(Object.keys(exports),function(){for(const [k,v]of Object.entries(exports))this.setExport(k,v);},{context,identifier:key});
 const modules={
  'node:fs':asModule('fs',{readFileSync(p){if(String(p).endsWith('manifest.json'))return JSON.stringify({pages:hand?[{keyword:'pest control',file:'hand.html',title:'Pest Control'}]:[]});if(String(p).endsWith('editorial-batch-36.json'))return '{"posts":[]}';return html;},existsSync(){return true;},writeFileSync(){}}),
  'node:path':asModule('path',{dirname:path.dirname,join:path.join}),
  'node:url':asModule('url',{fileURLToPath:url.fileURLToPath}),
  './lib/compliance.mjs':asModule('compliance',{COMPLIANCE_SYSTEM:'',userPrompt(){return 'Write a draft.';}}),
  './lib/run-log.mjs':asModule('run-log',{async logRunREST(...args){logs.push(args);},async logFindingREST(f){findings.push(f);}}),
  './lib/knowledge.mjs':asModule('knowledge',{knowledgeBlock(){return '';}}),
  './lib/editorial-quality.mjs':asModule('quality',{assessEditorialDraft,sourcePrompt,selectNarratorQueries,narratorWriteLimit}),
 };
 const mod=new vm.SourceTextModule(fs.readFileSync('agents/neuronwriter-narrator.mjs','utf8'),{context,identifier:new URL('../agents/neuronwriter-narrator.mjs',import.meta.url).href,initializeImportMeta(meta){meta.url=new URL('../agents/neuronwriter-narrator.mjs',import.meta.url).href;}});
 await mod.link(key=>{if(!modules[key])throw Error(`unexpected import ${key}`);return modules[key];});await mod.evaluate();return {calls,findings,logs};
}
const valid=await runNarrator();
assert.equal(valid.calls.filter(c=>c.method==='import-content').length,1,'duplicate keywords produce only one import');
assert.equal(valid.calls.find(c=>c.method==='import-content').req.query,'q');
for(const settings of [{html:good.replace('useful','pet-safe')},{html:good.replace('useful','pet-safe'),force:true},{html:good.replace('useful','pet-safe'),hand:false}]){
 const r=await runNarrator(settings);assert.equal(r.calls.filter(c=>c.method==='import-content').length,0,'failed gate never imports');
}
const limited=await runNarrator({multi:true,maxWrites:'1'});
assert.equal(limited.calls.filter(c=>c.method==='import-content').length,1,'candidate limit applies in the real narrator');
assert.ok(!sourcesFor('temperature planning').some(s=>s.id==='uc-ants'),'partial word ant does not match unrelated terms');
const protectedDraft=await runNarrator({existingScore:80});
assert.equal(protectedDraft.calls.filter(c=>c.method==='import-content').length,0,'good editor protected even if a hand draft exists');
const readError=await runNarrator({readFails:true});
assert.equal(readError.calls.filter(c=>c.method==='import-content'||c.method==='evaluate-content').length,0,'failed current-editor read does not authorize replacement');
assert.equal(readError.calls.filter(c=>c.method==='messages').length,0,'failed editor read spends no drafting tokens');
for (const bad of ['0', '-1', '41', 'NaN', '1.5']) assert.throws(()=>narratorWriteLimit(bad));
assert.equal(narratorWriteLimit(),3);
assert.equal(narratorWriteLimit('36'),36);
assert.equal(assessEditorialDraft(good,{keyword:'pest control',metaTitle:'x'.repeat(61)}).pass,false);
assert.equal(readError.logs[0][1],'error','a run with only failures is not reported as ok');
console.log('PASS: citation scope, answer structure, compliance, deterministic query dedupe and real narrator no-write behavior (hand/auto/FORCE/read failure).');
