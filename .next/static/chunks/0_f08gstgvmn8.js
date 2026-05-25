(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,59517,e=>{"use strict";var r=e.i(43476),s=e.i(71645),a=e.i(14262);let i=["Essential — $35/mo (pest only)","Foundation — $67/mo (pest + termite)","Complete — $127/mo (pest + termite + mosquito + tick)","Not sure yet"],l=["Pest Control (bi-monthly)","Termite / Sentricon®","Mosquito Control","Tick Control","Fire Ant Control","Flea Control","Builder Pre-Treat","Real Estate / WDO Letter","Crawlspace Service","Commercial Service","Not sure yet"],n=`
.rq-page {
  min-height: 100vh;
  background: #F7F6F1;
  padding: 48px 16px 80px;
  font-family: 'DM Sans', system-ui, sans-serif;
}
.rq-card {
  max-width: 680px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  padding: 40px 36px;
  box-shadow: 0 2px 12px rgba(14,26,15,0.07);
}
.rq-eyebrow {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #0E8E40;
  margin-bottom: 8px;
}
.rq-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: #0E1A0F;
  margin: 0 0 10px;
  line-height: 1.2;
}
.rq-sub {
  font-size: 15px;
  color: #5A6660;
  margin: 0 0 28px;
  line-height: 1.6;
}
.rq-link { color: #0E8E40; text-decoration: underline; }
.rq-link:hover { color: #0A7935; }
.rq-form { display: flex; flex-direction: column; gap: 18px; }
.rq-row { display: flex; gap: 16px; flex-wrap: wrap; }
.rq-field { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 180px; }
.rq-field--grow { flex: 2; }
.rq-field--zip { flex: 1; min-width: 100px; max-width: 140px; }
.rq-label { font-size: 13px; font-weight: 600; color: #2A3328; }
.rq-req { color: #0E8E40; }
.rq-zip-hint { font-weight: 400; color: #0E8E40; font-size: 12px; }
.rq-input {
  padding: 11px 13px;
  font-size: 15px;
  border: 1.5px solid #D8D2C8;
  border-radius: 8px;
  background: #FEFDF8;
  font-family: inherit;
  color: #1A1A1A;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.rq-input:focus { border-color: #0E8E40; }
.rq-textarea { resize: vertical; min-height: 100px; }
.rq-error {
  padding: 12px 14px;
  background: #FFF0F0;
  border: 1px solid #FFCDD2;
  border-radius: 8px;
  font-size: 14px;
  color: #B71C1C;
}
.rq-btn {
  padding: 14px 24px;
  background: #0E8E40;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.rq-btn:hover:not(:disabled) { background: #0A7935; }
.rq-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.rq-btn--outline {
  background: transparent;
  color: #0E8E40;
  border: 2px solid #0E8E40;
}
.rq-btn--outline:hover { background: #F0FAF4; }
.rq-fine {
  font-size: 12px;
  color: #8A9690;
  margin: 0;
  line-height: 1.5;
}
.rq-success {
  text-align: center;
  padding: 56px 36px;
}
.rq-success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #E8F7EE;
  color: #0E8E40;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
.rq-success-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 26px;
  font-weight: 700;
  color: #0E1A0F;
  margin: 0 0 12px;
}
.rq-success-body { font-size: 15px; color: #5A6660; margin: 0 0 10px; line-height: 1.6; }
.rq-phone { color: #0E8E40; font-weight: 600; text-decoration: none; }
@media (max-width: 600px) {
  .rq-card { padding: 28px 18px; }
  .rq-field--zip { max-width: 100%; }
}
`;e.s(["default",0,function(){let[e,t]=(0,s.useState)("idle"),[o,c]=(0,s.useState)(""),[d,p]=(0,s.useState)(""),[m,h]=(0,s.useState)({name:"",phone:"",email:"",address:"",zip:"",plan:"",service:"",message:""}),u=5===m.zip.length&&/^\d{5}$/.test(m.zip)?(0,a.officeForZip)(m.zip):null;function x(e){return r=>h(s=>({...s,[e]:r.target.value}))}async function q(e){e.preventDefault(),t("submitting"),c("");try{let e=await fetch("/api/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)}),r=await e.json();if(!e.ok){c(r.error||"Something went wrong."),t("error");return}p(r.office||""),t("success")}catch{c("Network error. Please call us at (205) 649-5278."),t("error")}}return"success"===e?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("style",{dangerouslySetInnerHTML:{__html:n}}),(0,r.jsx)("main",{className:"rq-page",children:(0,r.jsxs)("div",{className:"rq-card rq-success",children:[(0,r.jsx)("div",{className:"rq-success-icon",children:"✓"}),(0,r.jsx)("h1",{className:"rq-success-title",children:"We received your request!"}),(0,r.jsxs)("p",{className:"rq-success-body",children:[d?`Your request was routed to our ${d}.`:"Your request is on its way."," ","Someone will reach out within one business day."]}),(0,r.jsxs)("p",{className:"rq-success-body",children:["Need a faster response? Call us at"," ",(0,r.jsx)("a",{href:"tel:2056495278",className:"rq-phone",children:"(205) 649-5278"}),"."]}),(0,r.jsx)("a",{href:"/",className:"rq-btn rq-btn--outline",style:{marginTop:8},children:"← Back to home"})]})})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("style",{dangerouslySetInnerHTML:{__html:n}}),(0,r.jsx)("main",{className:"rq-page",children:(0,r.jsxs)("div",{className:"rq-card",children:[(0,r.jsx)("div",{className:"rq-eyebrow",children:"Free · No Obligation"}),(0,r.jsx)("h1",{className:"rq-title",children:"Request a Personal Quote"}),(0,r.jsxs)("p",{className:"rq-sub",children:["Tell us about your home and we'll have the right local office reach out — usually same or next business day. Already know your plan?"," ",(0,r.jsx)("a",{href:"/quote",className:"rq-link",children:"Try our online estimator →"})]}),(0,r.jsxs)("form",{className:"rq-form",onSubmit:q,noValidate:!0,children:[(0,r.jsxs)("div",{className:"rq-row",children:[(0,r.jsxs)("div",{className:"rq-field",children:[(0,r.jsxs)("label",{className:"rq-label",htmlFor:"rq-name",children:["Name ",(0,r.jsx)("span",{className:"rq-req",children:"*"})]}),(0,r.jsx)("input",{id:"rq-name",className:"rq-input",type:"text",value:m.name,onChange:x("name"),required:!0,autoComplete:"name",placeholder:"First Last"})]}),(0,r.jsxs)("div",{className:"rq-field",children:[(0,r.jsxs)("label",{className:"rq-label",htmlFor:"rq-phone",children:["Phone ",(0,r.jsx)("span",{className:"rq-req",children:"*"})]}),(0,r.jsx)("input",{id:"rq-phone",className:"rq-input",type:"tel",value:m.phone,onChange:x("phone"),required:!0,autoComplete:"tel",placeholder:"(205) 555-0100"})]})]}),(0,r.jsxs)("div",{className:"rq-field",children:[(0,r.jsxs)("label",{className:"rq-label",htmlFor:"rq-email",children:["Email ",(0,r.jsx)("span",{className:"rq-req",children:"*"})]}),(0,r.jsx)("input",{id:"rq-email",className:"rq-input",type:"email",value:m.email,onChange:x("email"),required:!0,autoComplete:"email",placeholder:"you@example.com"})]}),(0,r.jsxs)("div",{className:"rq-row",children:[(0,r.jsxs)("div",{className:"rq-field rq-field--grow",children:[(0,r.jsx)("label",{className:"rq-label",htmlFor:"rq-address",children:"Street address"}),(0,r.jsx)("input",{id:"rq-address",className:"rq-input",type:"text",value:m.address,onChange:x("address"),autoComplete:"street-address",placeholder:"123 Main St"})]}),(0,r.jsxs)("div",{className:"rq-field rq-field--zip",children:[(0,r.jsxs)("label",{className:"rq-label",htmlFor:"rq-zip",children:["ZIP ",(0,r.jsx)("span",{className:"rq-req",children:"*"}),u&&(0,r.jsxs)("span",{className:"rq-zip-hint",children:[" → ",u.name]})]}),(0,r.jsx)("input",{id:"rq-zip",className:"rq-input",type:"text",inputMode:"numeric",pattern:"[0-9]{5}",maxLength:5,value:m.zip,onChange:x("zip"),required:!0,placeholder:"35007"})]})]}),(0,r.jsxs)("div",{className:"rq-row",children:[(0,r.jsxs)("div",{className:"rq-field",children:[(0,r.jsx)("label",{className:"rq-label",htmlFor:"rq-plan",children:"Plan interested in"}),(0,r.jsxs)("select",{id:"rq-plan",className:"rq-input",value:m.plan,onChange:x("plan"),children:[(0,r.jsx)("option",{value:"",children:"Select a plan…"}),i.map(e=>(0,r.jsx)("option",{value:e,children:e},e))]})]}),(0,r.jsxs)("div",{className:"rq-field",children:[(0,r.jsx)("label",{className:"rq-label",htmlFor:"rq-service",children:"Service needed"}),(0,r.jsxs)("select",{id:"rq-service",className:"rq-input",value:m.service,onChange:x("service"),children:[(0,r.jsx)("option",{value:"",children:"Select a service…"}),l.map(e=>(0,r.jsx)("option",{value:e,children:e},e))]})]})]}),(0,r.jsxs)("div",{className:"rq-field",children:[(0,r.jsx)("label",{className:"rq-label",htmlFor:"rq-message",children:"Anything else we should know?"}),(0,r.jsx)("textarea",{id:"rq-message",className:"rq-input rq-textarea",value:m.message,onChange:x("message"),rows:4,placeholder:"Describe your pest problem, home size, or any other details…",maxLength:1e3})]}),"error"===e&&(0,r.jsx)("div",{className:"rq-error",children:o}),(0,r.jsx)("button",{className:"rq-btn",type:"submit",disabled:"submitting"===e,children:"submitting"===e?"Sending…":"Request my quote →"}),(0,r.jsx)("p",{className:"rq-fine",children:"By submitting you agree to be contacted by EnviroCare. We never sell your information."})]})]})})]})}])}]);