// Review-only score/diagnostic tool. No import-content, new-query, emails, DB or site writes.
// Run from a trusted authorized local/Claude environment; do not commit account reports.
// Default plan is offline. --score makes read-only API calls. --all expands only with --score.
// Existing project ID and priority query IDs from merged Nov 23 review docs and PR #309.
const BASE="https://app.neuronwriter.com/neuron-api/0.5/writer";
const PROJECT="9d0bec3a70f4743c";
const PRIORITIES=[
  [
    "3815beaae9187897",
    "Shelby County termite selection",
    "/alabaster"
  ],
  [
    "56177a4614f54094",
    "Alabaster exterminator (verify identity)",
    "/alabaster"
  ],
  [
    "aa9d0b266f83e5b8",
    "Auburn termite",
    "/auburn"
  ],
  [
    "3641aef869425c81",
    "Auburn pest",
    "/auburn"
  ],
  [
    "4240bbab5be67954",
    "Huntsville termite treatment",
    "/huntsville"
  ],
  [
    "39d7064c83f91d87",
    "Huntsville termite inspection",
    "/huntsville"
  ],
  [
    "c42659f7ac3e2ac5",
    "Huntsville pest",
    "/huntsville"
  ],
  [
    "9ada25dd3b56aaff",
    "Huntsville termite",
    "/huntsville"
  ],
  [
    "baa5aa5fd9b48cbb",
    "Birmingham pest selection",
    "/birmingham"
  ],
  [
    "2a835952f99dc211",
    "Birmingham pest pricing",
    "/birmingham"
  ],
  [
    "dcc8724112919bb6",
    "Birmingham termite inspection",
    "/services/termite-control"
  ],
  [
    "2e053c27bd6131d4",
    "Sentricon cost",
    "/blog/is-sentricon-worth-it"
  ],
  [
    "2de5ca802639d50c",
    "Termite bond cost",
    "/services/termite-control"
  ],
  [
    "2e74c97624871c97",
    "Termite treatment cost",
    "verify canonical"
  ],
  [
    "c2824e2f5de9a87c",
    "Green caps / Sentricon",
    "verify canonical"
  ],
  [
    "508dcd3056241d2d",
    "Meridianville",
    "/meridianville"
  ],
  [
    "21d41c2926735743",
    "Bessemer",
    "/bessemer"
  ],
  [
    "76cfc114e678967c",
    "Gardendale",
    "/gardendale"
  ],
  [
    "c15fec13fdda0990",
    "McCalla",
    "/mccalla"
  ],
  [
    "7caf174fef24a20c",
    "Builder treatment",
    "verify canonical"
  ],
  [
    "65de1d68a325d90b",
    "Core pest service",
    "/services/pest-control"
  ],
  [
    "d31fea843102cbc5",
    "Hoover termite",
    "/hoover"
  ],
  [
    "4f53109624247404",
    "Hoover pest",
    "/hoover"
  ],
  [
    "96b342763ec15c7f",
    "Lake house mosquito",
    "verify canonical"
  ],
  [
    "39a2710bc0fbe010",
    "Carpenter ants vs termites",
    "verify canonical"
  ],
  [
    "3ef64857c67b2507",
    "Pest service frequency",
    "verify canonical"
  ],
  [
    "d303f723d46ae5ca",
    "First pest visit",
    "verify canonical"
  ]
];
function shape(v) {
  const type = v === null ? "null" : Array.isArray(v) ? "array" : typeof v;
  const result = {type};
  if (type === "object") {
    result.keys=Object.keys(v).filter(k=>/^[a-zA-Z_][a-zA-Z0-9_-]{0,40}$/.test(k)).sort().slice(0,30);
    result.contentType=v.content===null?"null":Array.isArray(v.content)?"array":typeof v.content;
    if (typeof v.content==="string") result.contentLength=v.content.length;
    result.hasError=Boolean(v.error);
    if (["ok","ready","error","failed","not found","waiting","in progress"].includes(v.status)) result.status=v.status;
  }
  return result;
}
function failed(v) {
  return !v || Array.isArray(v) || typeof v!=="object" || Boolean(v.error) || ["error","failed","not found"].includes(String(v.status??"").toLowerCase());
}
function classifyEditor(v) {
  if (failed(v)||typeof v.content!=="string") return {state:"unscored_editor_shape",shape:shape(v)};
  if (!v.content.trim()) return {state:"verified_empty_string",shape:shape(v)};
  return {state:"has_content",shape:shape(v)};
}
function scoreOf(v) {
  if (failed(v)) return null;
  for(const k of ["content_score","score","contentScore","current_score"]) {
    if (Number.isFinite(v[k]) && v[k]>=0 && v[k]<=100) return v[k];
  }
  for(const k of ["metrics","content","revision"]) {
    if (v[k] && typeof v[k]==="object") { const s=scoreOf(v[k]); if(s!==null)return s; }
  }
  return null;
}
function inventory(v) {
  if (v && typeof v==="object" && (v.error||["error","failed","not found"].includes(String(v.status??"").toLowerCase()))) throw new Error("inventory_error");
  const rows=Array.isArray(v)?v:v?.queries;
  if (!Array.isArray(rows)) throw new Error("inventory_shape");
  const map=new Map();
  for(const r of rows) {
    const id=r?.query??r?.id;
    if(typeof id!=="string"||!/^[a-f0-9]{16}$/i.test(id)||typeof r.keyword!=="string"||!r.keyword.trim()||(r.query&&r.id&&r.query!==r.id)||map.has(id)) throw new Error("inventory_row");
    map.set(id,r);
  }
  return map;
}
const args=new Set(process.argv.slice(2));
if([...args].some(x=>!["--score","--all"].includes(x))||(args.has("--all")&&!args.has("--score"))) {
  console.error("Usage: node score-priorities.mjs [--score [--all]]"); process.exit(2);
}
const emit=x=>console.log(JSON.stringify(x));
if(!args.has("--score")) {
  emit({mode:"offline_plan",project:PROJECT,priorityCount:PRIORITIES.length,priorities:PRIORITIES,liveCalls:0});
  process.exit(0);
}
const key=process.env.NEURONWRITER_API_KEY;
if(!key) { console.error("NEURONWRITER_API_KEY missing; no calls made"); process.exit(2); }
const sleep=()=>new Promise(r=>setTimeout(r,1200));
async function read(method,body) {
  if(!["list-queries","get-content","evaluate-content"].includes(method)) throw new Error("method_not_allowed");
  let response;
  try {
    response=await fetch(BASE+"/"+method,{method:"POST",headers:{"X-API-KEY":key,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(body),signal:AbortSignal.timeout(25000)});
  } catch { throw new Error("network_or_timeout"); }
  if(!response.ok) throw new Error("http_"+response.status);
  try { return await response.json(); } catch { throw new Error("invalid_json"); }
}
let map;
try { map=inventory(await read("list-queries",{project:PROJECT,status:"ready"})); }
catch(e) { emit({state:"inventory_blocked",reason:e.message}); process.exit(2); }
const hints=new Map(PRIORITIES.map(([id,intent,route])=>[id,{intent,route}]));
const ids=args.has("--all")?[...new Set([...PRIORITIES.map(x=>x[0]),...map.keys()])]:PRIORITIES.map(x=>x[0]);
emit({mode:"read_only_score",project:PROJECT,readyRows:map.size,planned:ids.length});
const counts={scored:0,below65:0,empty:0,unscored:0,notReadyOrMissing:0,notVisited:0};
let consecutiveUnknown=0,visited=0,halted=null;
for(const id of ids) {
  visited++;
  const row=map.get(id), hint=hints.get(id)??{};
  const result={id,...hint};
  if(!row) { counts.notReadyOrMissing++; emit({...result,state:"not_in_ready_inventory"});continue; }
  result.keyword=row.keyword;
  try {
    await sleep();
    const editor=await read("get-content",{query:id,revision_type:"all"});
    const c=classifyEditor(editor);
    if(c.state==="unscored_editor_shape") {
      counts.unscored++; consecutiveUnknown++;
      emit({...result,...c});
      if(consecutiveUnknown>=3){halted="three_consecutive_unknown_editor_shapes";break;}
      continue;
    }
    if(c.state==="verified_empty_string"){
      counts.empty++;consecutiveUnknown=0;
      emit({...result,...c});continue;
    }
    await sleep();
    const evaluation=await read("evaluate-content",{query:id,html:editor.content,title:typeof editor.title==="string"?editor.title:"",description:typeof editor.description==="string"?editor.description:""});
    const score=scoreOf(evaluation);
    if(score===null){
      counts.unscored++;consecutiveUnknown++;
      emit({...result,state:"unscored_evaluation_shape",shape:shape(evaluation)});
      if(consecutiveUnknown>=3){halted="three_consecutive_unknown_score_shapes";break;}
      continue;
    }
    consecutiveUnknown=0;
    counts.scored++;if(score<65)counts.below65++;
    emit({...result,state:"scored",score,revisionType:["manual","autosave"].includes(editor.type)?editor.type:"unknown",contentLength:editor.content.length});
  } catch(e) {
    counts.unscored++;emit({...result,state:"unscored_request_error",reason:e.message});
    if(/^http_(401|403|429|5[0-9][0-9])$|^network_or_timeout$/.test(e.message)){halted=e.message;break;}
    consecutiveUnknown++;
    if(consecutiveUnknown>=3){halted="three_consecutive_request_errors";break;}
  }
}
counts.notVisited=ids.length-visited;
emit({state:"summary",...counts,halted,editorWrites:0,analysesCreated:0});
if(halted||counts.unscored)process.exitCode=2;
