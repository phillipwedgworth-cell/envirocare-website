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
for(const visibleClaim of ['pet&nbsp;safe','pet&#32;safe','pet&#x20;safe','p&#101;t-safe','pet&nbspsafe','pet&hyphen;safe','pet&ZeroWidthSpace;-safe','pet-<strong>safe</strong>','pet-<strong title="more > less">safe</strong>']) {
 assert.equal(assessEditorialDraft(good.replace('useful',visibleClaim),{keyword:'pest control'}).pass,false,`visible safety claim cannot hide in HTML: ${visibleClaim}`);
}
for(const field of ['title','metaTitle','metaDescription']) {
 assert.equal(assessEditorialDraft(good,{keyword:'pest control',[field]:'Pet-safe pest control'}).pass,false,`${field} is scanned for prohibited claims`);
 assert.equal(assessEditorialDraft(good,{keyword:'pest control',[field]:'Pet&#45;safe pest control'}).pass,false,`${field} entities cannot hide prohibited claims`);
}
assert.equal(assessEditorialDraft(good.replace('food, water','food &amp; water'),{keyword:'pest control'}).pass,true,'ordinary escaped editorial text remains valid');
assert.equal(assessEditorialDraft(good+'<p>&UnsupportedReference;</p>',{keyword:'pest control'}).pass,false,'unhandled named entities fail closed rather than disappearing from the compliance scan');
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

// Load only the writer's pure token/matching functions. Importing the module
// itself would execute live agents and is deliberately avoided in this test.
const writerSource=fs.readFileSync('agents/blog-from-drafts.mjs','utf8');
const matcherStart=writerSource.indexOf('const STOP = '),matcherEnd=writerSource.indexOf('const slugify = ',matcherStart);
assert.ok(matcherStart>=0&&matcherEnd>matcherStart,'writer topic matcher region exists');
const {coveredBy}=vm.runInNewContext(`${writerSource.slice(matcherStart,matcherEnd)}\n({coveredBy});`);
const existingTopics=[
 {slug:'emergency-pest-control-alabama',title:'Emergency Pest Control in Alabama'},
 {slug:'termite-treatment-cost-alabama',title:'Termite Treatment Cost in Alabama'},
 {slug:'birmingham-termite-treatment-inspection-cost',title:'Birmingham Termite Treatment: Inspection and Cost'},
];
assert.equal(coveredBy('pest control sylacauga al',existingTopics),null,'Sylacauga city intent cannot rewrite the emergency article on generic pest/control terms');
assert.equal(coveredBy('emergency pest control alabama',existingTopics),'emergency-pest-control-alabama','legitimate emergency intent still matches');
assert.equal(coveredBy('termite treatment alabama',existingTopics),'termite-treatment-cost-alabama','termite treatment remains a meaningful topic match');
assert.equal(coveredBy('termite treatment inspection cost birmingham',existingTopics),'birmingham-termite-treatment-inspection-cost','a specific full match wins over an earlier 60% match');

// Execute the actual narrator in a VM with fake editor/LLM endpoints. This verifies
// the gate sits before import-content for hand drafts, auto drafts and FORCE;
// none of these tests uses credentials, sends email or changes an editor.
async function runNarrator({html=good,force=false,protectAt,existingScore=null,hand=true,readFails=false,multi=false,maxWrites,getContent,getContentAll,getQuery,currentScoreResponse,listedScore}={}) {
 const calls=[];const findings=[];const logs=[];
 const env={NEURONWRITER_API_KEY:'test-only',ANTHROPIC_API_KEY:'test-only',NARRATOR_SLEEP_MS:'0',...(maxWrites?{NARRATOR_MAX_WRITES:maxWrites}:{}),...(force?{NARRATOR_FORCE:'1'}:{}),...(protectAt?{NARRATOR_PROTECT_AT:protectAt}:{})};
 const context=vm.createContext({console:{log(){},warn(){},error(){}},process:{env,argv:['node','narrator','fill'],exit(code){throw Error(`exit ${code}`);}},setTimeout(cb){cb();},URL,fetch:async (target,opts)=>{
  const method=String(target).split('/').pop();const req=JSON.parse(opts.body);calls.push({method,req});
  let out;
  if(String(target).includes('anthropic.com'))out={content:[{type:'text',text:html}]};
  else if(method==='list-queries')out=[{id:'q',keyword:'pest control',updated:'2026-10-20',...(listedScore!==undefined?{content_score:listedScore}:{})},{id:'older',keyword:' pest  control ',updated:'2026-01-01'},...(multi?[{id:'second',keyword:'general pest control',updated:'2026-10-20'}]:[])];
  else if(method==='get-content'){
    if(readFails)return {ok:false,status:503,text:async()=>'{"error":"unavailable"}'};
    out=req.revision_type==='all'&&getContentAll!==undefined?getContentAll:getContent!==undefined?getContent:existingScore===null?{content:''}:{content:good,score:existingScore};
  }
  else if(method==='get-query')out=getQuery!==undefined?getQuery:{};
  else if(method==='evaluate-content')out=currentScoreResponse!==undefined&&calls.at(-2)?.method==='get-content'?currentScoreResponse:{content_score:75};
  else if(method==='import-content')out={content_score:75};
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
for(const settings of [{html:good.replace('useful','pet-safe')},{html:good.replace('useful','pet-safe'),force:true},{html:good.replace('useful','pet-safe'),hand:false},{html:good.replace('useful','pet&nbsp;safe'),force:true},{html:good.replace('useful','pet-<strong>safe</strong>'),hand:false}]){
 const r=await runNarrator(settings);assert.equal(r.calls.filter(c=>c.method==='import-content').length,0,'failed gate never imports');
}
const limited=await runNarrator({multi:true,maxWrites:'1'});
assert.equal(limited.calls.filter(c=>c.method==='import-content').length,1,'candidate limit applies in the real narrator');
assert.ok(!sourcesFor('temperature planning').some(s=>s.id==='uc-ants'),'partial word ant does not match unrelated terms');
const protectedDraft=await runNarrator({existingScore:80});
assert.equal(protectedDraft.calls.filter(c=>c.method==='import-content').length,0,'good editor protected even if a hand draft exists');
const forcedDraft=await runNarrator({existingScore:80,force:true});
assert.equal(forcedDraft.calls.filter(c=>c.method==='import-content').length,1,'FORCE still permits a validated replacement of a readable protected editor');
const readError=await runNarrator({readFails:true});
assert.equal(readError.calls.filter(c=>c.method==='import-content'||c.method==='evaluate-content').length,0,'failed current-editor read does not authorize replacement');
assert.equal(readError.calls.filter(c=>c.method==='messages').length,0,'failed editor read spends no drafting tokens');
// HTTP 200 does not prove a successful editor read. Exercise the actual narrator
// on malformed bodies and failed current-editor scoring, including FORCE and a
// listed score that must not bypass the current-content read.
for(const force of [false,true]) {
 for(const getContent of [null,{},[],{error:'unavailable'},{content:null},{content:42},{score:80},{content:'',error:'unavailable'},{content:'',status:'error'}]) {
  const r=await runNarrator({getContent,force,hand:false,listedScore:85});
  assert.equal(r.calls.filter(c=>c.method==='import-content'||c.method==='messages').length,0,'unknown editor content prevents both drafting and import, even with FORCE or a listed score');
  assert.equal(r.logs[0][1],'error','malformed current-editor reads are reported as failures');
 }
 for(const currentScoreResponse of [{},{error:'unavailable'},{content_score:null},{content_score:'80'},{content_score:-1},{content_score:101},{status:'error',content_score:80}]) {
  const r=await runNarrator({getContent:{content:good},currentScoreResponse,force});
  assert.equal(r.calls.filter(c=>c.method==='import-content'||c.method==='messages').length,0,'an unreadable score for a nonempty current editor prevents replacement, including FORCE');
  assert.equal(r.logs[0][1],'error','failed current-editor scoring is reported as an error');
 }
 const forcedReadError=await runNarrator({readFails:true,force});
 assert.equal(forcedReadError.calls.filter(c=>c.method==='import-content'||c.method==='messages').length,0,'FORCE cannot bypass an HTTP editor-read failure');
}
// A never-saved editor answers get-content with a bare {} (verified 2026-11-25
// through the NeuronWriter MCP connector). It is a verified EMPTY editor only
// when the autosave-inclusive read is also {} and get-query says READY in this
// project; otherwise it stays unknown and blocks drafting and import.
const readyHere={status:'ready',project:'9d0bec3a70f4743c'};
const neverSaved=await runNarrator({getContent:{},getQuery:readyHere,hand:false});
assert.equal(neverSaved.calls.filter(c=>c.method==='import-content').length,1,'a verified never-saved editor gets one validated first draft');
assert.ok(neverSaved.calls.some(c=>c.method==='get-content'&&c.req.revision_type==='all'),'never-saved check reads autosaves before treating {} as empty');
assert.notEqual(neverSaved.logs[0][1],'error','a never-saved editor is not reported as a provider failure');
for(const settings of [{getContentAll:{content:good}},{getContentAll:{content:''}},{getQuery:{status:'ready',project:'someone-else'}},{getQuery:{status:'in progress',project:'9d0bec3a70f4743c'}},{getQuery:{}}]){
 const r=await runNarrator({getContent:{},getQuery:readyHere,hand:false,...settings});
 assert.equal(r.calls.filter(c=>c.method==='import-content'||c.method==='messages').length,0,'{} with an autosave, another project, or a not-ready analysis stays an unknown read');
 assert.equal(r.logs[0][1],'error','an unconfirmed {} read is still reported as a failure');
}
// One never-saved editor must not halt the run for the rest of the batch.
const twoNeverSaved=await runNarrator({getContent:{},getQuery:readyHere,hand:false,multi:true,maxWrites:'2'});
assert.equal(twoNeverSaved.calls.filter(c=>c.method==='import-content').length,2,'the run continues past a never-saved editor');
const zeroScore=await runNarrator({getContent:{content:good},currentScoreResponse:{content_score:0},html:good.replace('useful','helpful')});
assert.equal(zeroScore.calls.filter(c=>c.method==='import-content').length,1,'a verified zero score is valid and does not make the editor unreadable');
// NeuronWriter editor drafts start with their own <h1> (the narrator's system
// prompt requires it). Only that caller may put one H1 before the lede; blog
// bodies may not, because the page already renders its H1 from the title.
const withH1=`<h1>Pest Control</h1>${good}`;
assert.equal(assessEditorialDraft(withH1,{keyword:'pest control',allowLeadingH1:true}).pass,true,'one leading H1 then the lede passes for editor drafts');
assert.equal(assessEditorialDraft(withH1,{keyword:'pest control'}).pass,false,'blog bodies still must open with the lede');
assert.equal(assessEditorialDraft(`<h1>A</h1><h1>B</h1>${good}`,{keyword:'pest control',allowLeadingH1:true}).pass,false,'only one leading H1 is skipped');
assert.equal(assessEditorialDraft(`<h1>Pest Control</h1><p>${'word '.repeat(20)}</p>`+good.replace(/^<p class="lede">[\s\S]*?<\/p>/,''),{keyword:'pest control',allowLeadingH1:true}).pass,false,'the paragraph after the H1 must be marked as the lede');
const h1Auto=await runNarrator({html:withH1,hand:false});
assert.equal(h1Auto.calls.filter(c=>c.method==='import-content').length,1,'an auto draft that follows the H1-first system prompt is not blocked by the lede gate');
// A reviewed hand draft replaces an unprotected editor unless it scores lower
// (candidate evaluate-content returns 75 in this harness), and is not
// re-imported when the editor already holds the same text.
const handBetter=await runNarrator({existingScore:60,html:good.replace('useful','helpful')});
assert.equal(handBetter.calls.filter(c=>c.method==='import-content').length,1,'a higher-scoring hand draft is imported');
const handWorse=await runNarrator({existingScore:80,protectAt:'90',html:good.replace('useful','helpful')});
assert.equal(handWorse.calls.filter(c=>c.method==='import-content').length,0,'a hand draft that does not beat the current editor is not imported');
assert.ok(handWorse.calls.some(c=>c.method==='evaluate-content'),'the hand draft is scored unsaved before any import');
const handTie=await runNarrator({existingScore:75,protectAt:'90',html:good.replace('useful','helpful')});
assert.equal(handTie.calls.filter(c=>c.method==='import-content').length,1,'a tie still imports a reviewed hand draft (compliance fixes may not move the score)');
const handSame=await runNarrator({existingScore:60,html:good});
assert.equal(handSame.calls.filter(c=>c.method==='import-content').length,0,'a hand draft identical to the saved editor is not re-imported');
const handWorseForced=await runNarrator({existingScore:80,protectAt:'90',force:true});
assert.equal(handWorseForced.calls.filter(c=>c.method==='import-content').length,1,'FORCE still allows replacing with a hand draft');
for (const bad of ['0', '-1', '41', 'NaN', '1.5']) assert.throws(()=>narratorWriteLimit(bad));
assert.equal(narratorWriteLimit(),3);
assert.equal(narratorWriteLimit('36'),36);
assert.equal(assessEditorialDraft(good,{keyword:'pest control',metaTitle:'x'.repeat(61)}).pass,false);
assert.equal(readError.logs[0][1],'error','a run with only failures is not reported as ok');
console.log('PASS: citation scope, visible-text/metadata compliance, topic protection, deterministic query dedupe and real narrator no-write behavior (hand/auto/FORCE/unknown editor).');
