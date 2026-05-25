(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,i,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},18967,(e,i,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={DecodeError:function(){return f},MiddlewareNotFoundError:function(){return y},MissingStaticPage:function(){return w},NormalizeError:function(){return x},PageNotFoundError:function(){return v},SP:function(){return g},ST:function(){return b},WEB_VITALS:function(){return a},execOnce:function(){return s},getDisplayName:function(){return h},getLocationOrigin:function(){return m},getURL:function(){return c},isAbsoluteUrl:function(){return o},isResSent:function(){return u},loadGetInitialProps:function(){return p},normalizeRepeatedSlashes:function(){return d},stringifyError:function(){return k}};for(var t in r)Object.defineProperty(n,t,{enumerable:!0,get:r[t]});let a=["CLS","FCP","FID","INP","LCP","TTFB"];function s(e){let i,n=!1;return(...r)=>(n||(n=!0,i=e(...r)),i)}let l=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,o=e=>l.test(e);function m(){let{protocol:e,hostname:i,port:n}=window.location;return`${e}//${i}${n?":"+n:""}`}function c(){let{href:e}=window.location,i=m();return e.substring(i.length)}function h(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function u(e){return e.finished||e.headersSent}function d(e){let i=e.split("?");return i[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(i[1]?`?${i.slice(1).join("?")}`:"")}async function p(e,i){let n=i.res||i.ctx&&i.ctx.res;if(!e.getInitialProps)return i.ctx&&i.Component?{pageProps:await p(i.Component,i.ctx)}:{};let r=await e.getInitialProps(i);if(n&&u(n))return r;if(!r)throw Object.defineProperty(Error(`"${h(e)}.getInitialProps()" should resolve to an object. But found "${r}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return r}let g="u">typeof performance,b=g&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class f extends Error{}class x extends Error{}class v extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class w extends Error{constructor(e,i){super(),this.message=`Failed to load static file for page: ${e} ${i}`}}class y extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function k(e){return JSON.stringify({message:e.message,stack:e.stack})}},98183,(e,i,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={assign:function(){return o},searchParamsToUrlQuery:function(){return a},urlQueryToSearchParams:function(){return l}};for(var t in r)Object.defineProperty(n,t,{enumerable:!0,get:r[t]});function a(e){let i={};for(let[n,r]of e.entries()){let e=i[n];void 0===e?i[n]=r:Array.isArray(e)?e.push(r):i[n]=[e,r]}return i}function s(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function l(e){let i=new URLSearchParams;for(let[n,r]of Object.entries(e))if(Array.isArray(r))for(let e of r)i.append(n,s(e));else i.set(n,s(r));return i}function o(e,...i){for(let n of i){for(let i of n.keys())e.delete(i);for(let[i,r]of n.entries())e.append(i,r)}return e}},14262,e=>{"use strict";let i={birmingham:{id:"birmingham",name:"Birmingham Office",phone:"2059406360",phoneDisplay:"(205) 940-6360",address:"2025 Butler Rd",city:"Alabaster",state:"AL",zip:"35007",cityPageSlug:"birmingham"},"lake-martin":{id:"lake-martin",name:"Lake Martin / Alex City Office",phone:"2562346162",phoneDisplay:"(256) 234-6162",address:"1785 Tallapoosa St",city:"Alexander City",state:"AL",zip:"35010",cityPageSlug:"lake-martin"},huntsville:{id:"huntsville",name:"Huntsville Office",phone:"2569377676",phoneDisplay:"(256) 937-7676",address:"7027 Old Madison Pike, Ste 108",city:"Huntsville",state:"AL",zip:"35806",cityPageSlug:"huntsville"}},n={35201:"birmingham",35202:"birmingham",35203:"birmingham",35204:"birmingham",35205:"birmingham",35206:"birmingham",35207:"birmingham",35208:"birmingham",35209:"birmingham",35210:"birmingham",35211:"birmingham",35212:"birmingham",35213:"birmingham",35214:"birmingham",35215:"birmingham",35216:"birmingham",35217:"birmingham",35218:"birmingham",35219:"birmingham",35220:"birmingham",35221:"birmingham",35222:"birmingham",35223:"birmingham",35224:"birmingham",35226:"birmingham",35228:"birmingham",35229:"birmingham",35230:"birmingham",35231:"birmingham",35232:"birmingham",35233:"birmingham",35234:"birmingham",35235:"birmingham",35236:"birmingham",35237:"birmingham",35238:"birmingham",35242:"birmingham",35243:"birmingham",35244:"birmingham",35246:"birmingham",35249:"birmingham",35253:"birmingham",35254:"birmingham",35255:"birmingham",35259:"birmingham",35260:"birmingham",35261:"birmingham",35266:"birmingham",35282:"birmingham",35283:"birmingham",35285:"birmingham",35287:"birmingham",35288:"birmingham",35290:"birmingham",35291:"birmingham",35292:"birmingham",35293:"birmingham",35294:"birmingham",35295:"birmingham",35296:"birmingham",35297:"birmingham",35298:"birmingham",35299:"birmingham",35226:"birmingham",35244:"birmingham",35213:"birmingham",35216:"birmingham",35223:"birmingham",35243:"birmingham",35209:"birmingham",35007:"birmingham",35114:"birmingham",35124:"birmingham",35080:"birmingham",35040:"birmingham",35043:"birmingham",35173:"birmingham",35126:"birmingham",35094:"birmingham",35094:"birmingham",35004:"birmingham",35146:"birmingham",35071:"birmingham",35068:"birmingham",35215:"birmingham",35020:"birmingham",35021:"birmingham",35022:"birmingham",35023:"birmingham",35127:"birmingham",35111:"birmingham",35242:"birmingham",35114:"birmingham",35401:"birmingham",35402:"birmingham",35403:"birmingham",35404:"birmingham",35405:"birmingham",35406:"birmingham",35407:"birmingham",35470:"birmingham",35473:"birmingham",35475:"birmingham",35476:"birmingham",35480:"birmingham",35482:"birmingham",35486:"birmingham",35487:"birmingham",35473:"birmingham",35476:"birmingham",35010:"lake-martin",35011:"lake-martin",36853:"lake-martin",36024:"lake-martin",36078:"lake-martin",36092:"lake-martin",36093:"lake-martin",36830:"lake-martin",36831:"lake-martin",36832:"lake-martin",36849:"lake-martin",36801:"lake-martin",36802:"lake-martin",36803:"lake-martin",36804:"lake-martin",36877:"lake-martin",36867:"lake-martin",36868:"lake-martin",36869:"lake-martin",36870:"lake-martin",36083:"lake-martin",36866:"lake-martin",36850:"lake-martin",35089:"lake-martin",35072:"lake-martin",36026:"lake-martin",36861:"lake-martin",35033:"lake-martin",35020:"birmingham",36274:"lake-martin",36862:"lake-martin",36854:"lake-martin",36863:"lake-martin",35801:"huntsville",35802:"huntsville",35803:"huntsville",35804:"huntsville",35805:"huntsville",35806:"huntsville",35807:"huntsville",35808:"huntsville",35809:"huntsville",35810:"huntsville",35811:"huntsville",35812:"huntsville",35813:"huntsville",35814:"huntsville",35815:"huntsville",35816:"huntsville",35824:"huntsville",35893:"huntsville",35894:"huntsville",35895:"huntsville",35896:"huntsville",35897:"huntsville",35898:"huntsville",35899:"huntsville",35756:"huntsville",35757:"huntsville",35758:"huntsville",35749:"huntsville",35763:"huntsville",35611:"huntsville",35612:"huntsville",35613:"huntsville",35614:"huntsville",35601:"huntsville",35602:"huntsville",35603:"huntsville",35609:"huntsville",35640:"huntsville",35603:"huntsville",35670:"huntsville",35622:"huntsville",35673:"huntsville",35672:"huntsville",35650:"huntsville",35773:"huntsville",35760:"huntsville",35748:"huntsville",35759:"huntsville",35750:"huntsville",35741:"huntsville",35768:"huntsville",35769:"huntsville",35772:"huntsville",35740:"huntsville",35771:"huntsville",35765:"huntsville",35950:"huntsville",35951:"huntsville",35957:"huntsville",35976:"huntsville",35980:"huntsville",35016:"huntsville",35055:"huntsville",35057:"huntsville",35058:"huntsville",35077:"huntsville"};e.s(["isInServiceArea",0,function(e){return(e||"").trim().slice(0,5)in n},"officeForZip",0,function(e){return i[n[(e||"").trim().slice(0,5)]||"birmingham"]}])},56138,e=>{"use strict";var i=e.i(43476),n=e.i(71645),r=e.i(14262);let t=`
.sc-wrap {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 9999;
  font-family: 'DM Sans', system-ui, sans-serif;
  pointer-events: none;
}
.sc-wrap > * { pointer-events: auto; }
.sc-bar {
  display: flex;
  gap: 8px;
  background: #fff;
  border: 1px solid #E8E2D8;
  border-radius: 999px;
  padding: 6px;
  box-shadow: 0 8px 24px rgba(14, 26, 15, 0.18), 0 2px 6px rgba(14, 26, 15, 0.08);
}
.sc-call {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
  color: #fff;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 999px;
  min-height: 48px;
}
.sc-icon { font-size: 20px; flex-shrink: 0; }
.sc-text { display: flex; flex-direction: column; gap: 0; line-height: 1.1; }
.sc-label { font-size: 11px; opacity: 0.85; font-weight: 500; }
.sc-num { font-size: 16px; font-weight: 700; }
.sc-zip-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  background: #F5A800;
  color: #0E1A0F;
  border-radius: 999px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;
}
.sc-zip-btn:hover { background: #E89E00; }
.sc-expanded {
  position: relative;
  background: #fff;
  border: 1px solid #E8E2D8;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 8px;
  box-shadow: 0 8px 24px rgba(14, 26, 15, 0.15);
}
.sc-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 24px;
  color: #5A6660;
  cursor: pointer;
  line-height: 1;
}
.sc-exp-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: #0E1A0F;
  margin-bottom: 12px;
}
.sc-form { display: flex; gap: 8px; }
.sc-input {
  flex: 1;
  padding: 12px 14px;
  font-size: 16px;
  border: 2px solid #E8E2D8;
  border-radius: 10px;
  background: #FEFDF8;
}
.sc-input:focus { outline: none; border-color: #0E8E40; }
.sc-go {
  padding: 12px 18px;
  font-weight: 600;
  background: #0E8E40;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.sc-result-mini {
  margin-top: 10px;
  font-size: 13px;
  color: #0E8E40;
  font-weight: 500;
}
/* Hide on desktop — site already has header phones */
@media (min-width: 900px) {
  .sc-wrap { display: none; }
}
`;e.s(["default",0,function(){let[e,a]=(0,n.useState)(!1),[s,l]=(0,n.useState)(""),[o,m]=(0,n.useState)(null);(0,n.useEffect)(()=>{let e=window.sessionStorage.getItem("envirocare_zip");e&&/^\d{5}$/.test(e)&&(l(e),m((0,r.officeForZip)(e)))},[]);let c=o?.phoneDisplay||"(205) 649-5278",h=o?.phone||"2056495278";return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("style",{dangerouslySetInnerHTML:{__html:t}}),(0,i.jsxs)("div",{className:"sc-wrap","aria-hidden":!1,children:[e&&(0,i.jsxs)("div",{className:"sc-expanded",children:[(0,i.jsx)("button",{className:"sc-close",onClick:()=>a(!1),"aria-label":"Close",children:"×"}),(0,i.jsx)("div",{className:"sc-exp-title",children:"Find Your Local Office"}),(0,i.jsxs)("form",{onSubmit:function(e){e.preventDefault();let i=s.trim().slice(0,5);5===i.length&&/^\d{5}$/.test(i)&&(m((0,r.officeForZip)(i)),window.sessionStorage.setItem("envirocare_zip",i),a(!1))},className:"sc-form",children:[(0,i.jsx)("input",{type:"text",inputMode:"numeric",pattern:"[0-9]{5}",maxLength:5,placeholder:"Your zip code",value:s,onChange:e=>l(e.target.value.replace(/\D/g,"")),className:"sc-input","aria-label":"Zip code",autoFocus:!0}),(0,i.jsx)("button",{type:"submit",className:"sc-go",children:"Go"})]}),o&&(0,i.jsxs)("div",{className:"sc-result-mini",children:[o.name," → ",o.phoneDisplay]})]}),(0,i.jsxs)("div",{className:"sc-bar",children:[(0,i.jsxs)("a",{href:`tel:${h}`,className:"sc-call",children:[(0,i.jsx)("span",{className:"sc-icon",children:"📞"}),(0,i.jsxs)("span",{className:"sc-text",children:[(0,i.jsx)("span",{className:"sc-label",children:o?o.name:"Call EnviroCare"}),(0,i.jsx)("span",{className:"sc-num",children:c})]})]}),(0,i.jsx)("button",{className:"sc-zip-btn",onClick:()=>a(!e),"aria-label":"Find local office by zip code",children:o?"⟳":"📍"})]})]})]})}])},18503,e=>{"use strict";var i=e.i(43476),n=e.i(71645);let r={role:"assistant",content:"Hi! I'm the EnviroCare assistant. I can help with pricing, scheduling, and pest questions for our Birmingham, Lake Martin, and Huntsville offices. What can I help you with?"},t=`
.cw-bubble {
  position: fixed;
  bottom: 90px;
  right: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #0E8E40;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(14,142,64,0.45), 0 2px 6px rgba(0,0,0,0.15);
  z-index: 9998;
  transition: transform 0.15s ease, background 0.15s ease;
  color: #fff;
}
.cw-bubble:hover { background: #0A7935; transform: scale(1.06); }
.cw-bubble:active { transform: scale(0.96); }

.cw-panel {
  position: fixed;
  bottom: 158px;
  right: 16px;
  width: min(360px, calc(100vw - 32px));
  height: min(480px, calc(100vh - 200px));
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(14,26,15,0.18), 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  z-index: 9997;
  overflow: hidden;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.cw-header {
  background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
  color: #fff;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.cw-header-info { display: flex; align-items: center; gap: 10px; }
.cw-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}
.cw-name { font-weight: 700; font-size: 14px; line-height: 1.2; }
.cw-status { font-size: 11px; opacity: 0.85; margin-top: 1px; }
.cw-close {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  opacity: 0.8;
  line-height: 1;
}
.cw-close:hover { opacity: 1; }

.cw-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #FAFAFA;
}
.cw-msg {
  max-width: 82%;
  padding: 10px 13px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
}
.cw-msg--user {
  background: #0E8E40;
  color: #fff;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}
.cw-msg--assistant {
  background: #fff;
  color: #1A1A1A;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.cw-typing {
  display: inline-flex;
  gap: 4px;
  padding: 2px 0;
}
.cw-typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0E8E40;
  animation: cw-bounce 1.2s infinite;
}
.cw-typing span:nth-child(2) { animation-delay: 0.2s; }
.cw-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes cw-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-5px); opacity: 1; }
}

.cw-form {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #E8E2D8;
  background: #fff;
  flex-shrink: 0;
}
.cw-input {
  flex: 1;
  padding: 10px 13px;
  font-size: 14px;
  border: 1.5px solid #E8E2D8;
  border-radius: 24px;
  background: #FEFDF8;
  outline: none;
  font-family: inherit;
  min-width: 0;
}
.cw-input:focus { border-color: #0E8E40; }
.cw-input:disabled { opacity: 0.6; }
.cw-send {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #0E8E40;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
  align-self: flex-end;
}
.cw-send:hover:not(:disabled) { background: #0A7935; }
.cw-send:disabled { background: #C4C4C4; cursor: not-allowed; }

@media (min-width: 900px) {
  .cw-bubble { bottom: 24px; right: 24px; }
  .cw-panel { bottom: 92px; right: 24px; }
}
`;e.s(["default",0,function(){let[e,a]=(0,n.useState)(!1),[s,l]=(0,n.useState)([r]),[o,m]=(0,n.useState)(""),[c,h]=(0,n.useState)(!1),u=(0,n.useRef)(null),d=(0,n.useRef)(null);(0,n.useEffect)(()=>{u.current?.scrollIntoView({behavior:"smooth"})},[s]),(0,n.useEffect)(()=>{e&&setTimeout(()=>d.current?.focus(),100)},[e]);let p=(0,n.useCallback)(async e=>{e.preventDefault();let i=o.trim();if(!i||c)return;let n=[...s,{role:"user",content:i}];l([...n,{role:"assistant",content:""}]),m(""),h(!0);try{let e=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:n})});if(!e.ok||!e.body)throw Error("Request failed");let i=e.body.getReader(),r=new TextDecoder,t="";for(;;){let{done:e,value:a}=await i.read();if(e)break;t+=r.decode(a,{stream:!0}),l([...n,{role:"assistant",content:t}])}}catch{l([...n,{role:"assistant",content:"Sorry, something went wrong. Please call us at (205) 649-5278."}])}finally{h(!1)}},[o,s,c]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("style",{dangerouslySetInnerHTML:{__html:t}}),e&&(0,i.jsxs)("div",{className:"cw-panel",role:"dialog","aria-label":"EnviroCare chat assistant",children:[(0,i.jsxs)("div",{className:"cw-header",children:[(0,i.jsxs)("div",{className:"cw-header-info",children:[(0,i.jsx)("div",{className:"cw-avatar",children:"EC"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"cw-name",children:"EnviroCare Assistant"}),(0,i.jsx)("div",{className:"cw-status",children:"● Online · Mon–Fri 8am–5pm"})]})]}),(0,i.jsx)("button",{className:"cw-close",onClick:()=>a(!1),"aria-label":"Close chat",children:"✕"})]}),(0,i.jsxs)("div",{className:"cw-messages",children:[s.map((e,n)=>(0,i.jsx)("div",{className:`cw-msg cw-msg--${e.role}`,children:e.content||(c&&n===s.length-1?(0,i.jsxs)("span",{className:"cw-typing",children:[(0,i.jsx)("span",{}),(0,i.jsx)("span",{}),(0,i.jsx)("span",{})]}):null)},n)),(0,i.jsx)("div",{ref:u})]}),(0,i.jsxs)("form",{className:"cw-form",onSubmit:p,children:[(0,i.jsx)("input",{ref:d,className:"cw-input",type:"text",placeholder:"Ask about pricing, scheduling, pests…",value:o,onChange:e=>m(e.target.value),disabled:c,maxLength:500,"aria-label":"Chat message"}),(0,i.jsx)("button",{className:"cw-send",type:"submit",disabled:!o.trim()||c,"aria-label":"Send message",children:"↑"})]})]}),(0,i.jsx)("button",{className:"cw-bubble",onClick:()=>a(e=>!e),"aria-label":e?"Close chat":"Open chat with EnviroCare assistant","aria-expanded":e,children:e?(0,i.jsx)("span",{style:{fontSize:22},children:"✕"}):(0,i.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",fill:"none","aria-hidden":"true",children:(0,i.jsx)("path",{d:"M4 6C4 4.895 4.895 4 6 4H22C23.105 4 24 4.895 24 6V18C24 19.105 23.105 20 22 20H15L9 24V20H6C4.895 20 4 19.105 4 18V6Z",fill:"white"})})})]})}])}]);