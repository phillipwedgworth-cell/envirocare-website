// Manual, exact 20-page review batch. No model calls, new analyses, website
// publication, database writes, emails, schedules or credential-file reads.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, join } from 'node:path';
import { assessEditorialDraft, sourcesFor } from '../../lib/editorial-quality.mjs';

export const PROJECT='9d0bec3a70f4743c';
const DIR=dirname(fileURLToPath(import.meta.url));
const API='https://app.neuronwriter.com/neuron-api/0.5/writer';
const sha=s=>createHash('sha256').update(s).digest('hex');
const norm=s=>String(s??'').trim().toLowerCase().replace(/\s+/g,' ');
const scoreOf=r=>{
 if(!r || r.error || (r.status && r.status!=='ok') || !Number.isFinite(r.content_score) || r.content_score<0 || r.content_score>100)throw Error('invalid-score-response');
 return r.content_score;
};
const fingerprint=c=>sha(JSON.stringify({content:c.content,title:c.title??'',description:c.description??''}));
const canonical=u=>{const x=new URL(u);if(x.protocol!=='https:'||x.username||x.password||x.port)throw Error('invalid-source-url');return x.origin+x.pathname.replace(/\/$/,'');};

export async function loadBatch(dir=DIR){
 const manifest=JSON.parse(await readFile(join(dir,'batch.json'),'utf8'));
 if(manifest.project!==PROJECT || manifest.schemaVersion!==1 || manifest.pages?.length!==20)throw Error('expected-the-pinned-project-and-exactly-20-pages');
 const slugs=new Set(),ids=new Set();
 const drafts=[];
 for(const p of manifest.pages){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || p.route!==`/blog/${p.slug}` || !/^\d{2}-[a-z0-9-]+\.html$/.test(p.file))throw Error('invalid-page-path');
  if(!/^[a-f0-9]{16}$/.test(p.queryId) || slugs.has(p.slug) || ids.has(p.queryId))throw Error('missing-or-duplicate-page-query');
  slugs.add(p.slug);ids.add(p.queryId);
  const html=await readFile(join(dir,p.file),'utf8');
  if(sha(html)!==p.draftSha256)throw Error(`draft-hash-mismatch:${p.slug}`);
  const quality=assessEditorialDraft(html,{keyword:p.keyword,title:p.title,metaTitle:p.metaTitle,metaDescription:p.metaDescription});
  // The green-cap article retains one separately verified historical EPA
  // award reference. Admit only that exact URL; no arbitrary source exemption.
  const supplemental={
   'green-caps-in-yard-sentricon':['https://19january2025snapshot.epa.gov/greenchemistry/presidential-green-chemistry-challenge-2000-designing-greener-chemicals-award'],
   'fire-ants-alabama-summer':['https://fireant.tamu.edu/learn/history-of-the-red-imported-fire-ant/','https://ant-pests.extension.org/information-for-alabama-residents'],
  };
  const extras=(supplemental[p.slug]??[]).map(canonical);
  if(JSON.stringify((p.extraSources??[]).map(s=>canonical(s.url)))!==JSON.stringify(extras))throw Error('unexpected-supplemental-source');
  const permitted=new Set([...sourcesFor(p.keyword).map(s=>canonical(s.url)),...extras]);
  const external=[...html.matchAll(/href\s*=\s*["'](https:\/\/[^"']+)["']/gi)].map(m=>m[1]).filter(u=>new URL(u).origin!=='https://www.envirocarellc.com');
  const citationScopeValid=external.every(u=>permitted.has(canonical(u)));
  const problems=quality.problems.filter(x=>!(x==='external citation is outside the relevant verified source list' && citationScopeValid));
  if(problems.length)throw Error(`quality-gate:${p.slug}:${problems.join(';')}`);
  drafts.push({...p,html,qualityWarnings:quality.warnings.length});
 }
 return {manifest,drafts};
}

export function createClient(key,fetchImpl=fetch){
 const permitted=new Set(['list-queries','get-content','evaluate-content','import-content']);
 let calls=0;const deadline=Date.now()+15*60*1000;
 return async(method,payload)=>{
  if(!key)throw Error('NEURONWRITER_API_KEY-is-not-set');
  if(!permitted.has(method)||++calls>130||Date.now()>deadline)throw Error('batch-request-bound-reached');
  if(method==='list-queries' && (payload.project!==PROJECT||payload.status!=='ready'))throw Error('invalid-inventory-scope');
  if(method!=='list-queries'&&!/^[a-f0-9]{16}$/.test(payload.query??''))throw Error('invalid-query-id');
  if(method==='import-content'&&payload.project!==PROJECT)throw Error('invalid-import-project');
  const r=await fetchImpl(`${API}/${method}`,{method:'POST',redirect:'error',signal:AbortSignal.timeout(30000),headers:{'X-API-KEY':key,'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)});
  if(!r.ok)throw Error(`provider-http-${r.status}`);
  let data;try{data=await r.json();}catch{throw Error('provider-invalid-json');}
  if(data?.error||data?.status==='error')throw Error('provider-application-error');
  return data;
 };
}

function editorValid(c){
 if(!c||Array.isArray(c)||typeof c.content!=='string'||c.error||c.status==='error')throw Error('unreadable-editor-preserved');
 return c;
}

export async function executeBatch({drafts,call,mode='score',saveBackup=async()=>{throw Error('backup-required');},onResult=()=>{}}){
 if(!['score','import'].includes(mode)||drafts.length!==20)throw Error('invalid-batch-execution');
 const raw=await call('list-queries',{project:PROJECT,status:'ready'});
 const inventory=Array.isArray(raw)?raw:raw?.queries;
 if(!Array.isArray(inventory))throw Error('unreadable-ready-inventory');
 const results=[];
 // Validate every mapping before the first editor read/write. No fuzzy fallback.
 for(const p of drafts){
  const matches=inventory.filter(q=>(q.query??q.id)===p.queryId);
  if(matches.length!==1)throw Error(`query-not-uniquely-ready:${p.slug}`);
  const q=matches[0];
  if(norm(q.keyword)!==norm(p.expectedQueryKeyword)||(q.status&&q.status!=='ready')||(q.language&&!/^english$/i.test(q.language))||(q.engine&&!/^google\.com$/i.test(q.engine)))throw Error(`query-scope-changed:${p.slug}`);
  if(/delete|duplicate|hold/i.test(JSON.stringify(q.tags??[])))throw Error(`query-is-held-or-duplicate:${p.slug}`);
 }
 for(const p of drafts){
  const result={slug:p.slug,queryId:p.queryId,beforeScore:null,candidateScore:null,status:'not-run'};
  try{
   const before=editorValid(await call('get-content',{query:p.queryId,revision_type:'all'}));
   const fp=fingerprint(before);
   if(before.content.trim())result.beforeScore=scoreOf(await call('evaluate-content',{query:p.queryId,html:before.content,title:before.title??'',description:before.description??''}));
   result.candidateScore=scoreOf(await call('evaluate-content',{query:p.queryId,html:p.html,title:p.metaTitle,description:p.metaDescription}));
   if(mode==='score'){result.status='scored-only';}
   else if(result.beforeScore!==null && result.candidateScore<=result.beforeScore){result.status='kept-existing-equal-or-higher-score';}
   else if(result.candidateScore<65){result.status='held-below-existing-65-floor';}
   else{
    const current=editorValid(await call('get-content',{query:p.queryId,revision_type:'all'}));
    if(fingerprint(current)!==fp)throw Error('editor-changed-during-scoring-preserved');
    await saveBackup(p,{...current,project:PROJECT,query:p.queryId,savedAt:new Date().toISOString(),fingerprint:fp});
    // import-content is sent once. Timeout/ambiguous responses are not retried.
    result.status='import-outcome-unconfirmed';
    await call('import-content',{project:PROJECT,query:p.queryId,html:p.html,title:p.metaTitle,description:p.metaDescription});
    const after=editorValid(await call('get-content',{query:p.queryId,revision_type:'all'}));
    if(sha(after.content)!==p.draftSha256 || after.title!==p.metaTitle || after.description!==p.metaDescription)throw Error('saved-editor-readback-does-not-match-candidate');
    result.status='imported-and-readback-verified';
   }
  }catch(error){
   result.error=String(error.message);
   if(result.status!=='import-outcome-unconfirmed')result.status='blocked-editor-preserved';
   results.push(result);await onResult(result);
   // Unknown write outcome or provider/auth/rate-limit failure stops the run.
   if(result.status==='import-outcome-unconfirmed'||/^provider-|request-bound|batch-request-bound/.test(result.error))break;
   continue;
  }
  results.push(result);await onResult(result);
 }
 return results;
}

async function main(){
 const args=process.argv.slice(2),mode=args[args.indexOf('--mode')+1]??'plan';
 if(args.length && (args.length!==2||args[0]!=='--mode'||!['plan','score','import'].includes(mode)))throw Error('usage: node run-batch.mjs [--mode plan|score|import]');
 const {manifest,drafts}=await loadBatch();
 if(mode==='plan'){
  console.log(JSON.stringify({mode,project:PROJECT,pages:drafts.length,networkCalls:0,editorWrites:0,baseCommit:manifest.baseCommit,quality:'20/20 structural/source-scope/compliance gates passed; not a factual or originality clearance'},null,2));return;
 }
 const output=resolve('audit-results/neuron-review-20',new Date().toISOString().replace(/[:.]/g,'-'));
 await mkdir(output,{recursive:true,mode:0o700});
 const results=await executeBatch({drafts,mode,call:createClient(process.env.NEURONWRITER_API_KEY),saveBackup:async(p,data)=>writeFile(join(output,`${p.slug}.backup.json`),JSON.stringify(data,null,2),{mode:0o600,flag:'wx'}),onResult:async r=>{
  // Only sanitized status/score fields are printed. Original editor content is
  // private local backup material and must not be committed or uploaded.
  console.log(JSON.stringify(r));
 }});
 await writeFile(join(output,'results.json'),JSON.stringify({mode,date:new Date().toISOString(),project:PROJECT,expectedPages:20,results},null,2),{mode:0o600});
 console.log(`Checked ${results.length}/20; verified imports ${results.filter(r=>r.status==='imported-and-readback-verified').length}. Private backups/results: ${output}`);
 if(results.length!==20 || results.some(r=>['blocked-editor-preserved','import-outcome-unconfirmed'].includes(r.status)))process.exitCode=2;
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(()=>{console.error('Batch stopped. Check local inputs/account access; no automatic retry or new analyses.');process.exitCode=2;});
