(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34623,e=>{"use strict";var l=e.i(43476),t=e.i(71645),a=e.i(14262);let r=`
.zl-card {
  background: #FEFDF8;
  border: 1px solid #E8E2D8;
  border-radius: 16px;
  padding: 32px;
  max-width: 520px;
  margin: 0 auto;
  font-family: 'DM Sans', system-ui, sans-serif;
}
.zl-eyebrow {
  font-size: 13px;
  font-weight: 600;
  color: #0E8E40;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.zl-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: #0E1A0F;
  margin: 0 0 8px;
  line-height: 1.2;
}
.zl-sub {
  font-size: 15px;
  color: #5A6660;
  margin: 0 0 20px;
  line-height: 1.5;
}
.zl-form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.zl-input {
  flex: 1;
  padding: 14px 16px;
  font-size: 16px;
  font-family: 'DM Sans', system-ui, sans-serif;
  border: 2px solid #E8E2D8;
  border-radius: 10px;
  background: #fff;
  color: #0E1A0F;
  transition: border-color 0.2s;
}
.zl-input:focus {
  outline: none;
  border-color: #0E8E40;
}
.zl-button {
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'DM Sans', system-ui, sans-serif;
  background: #0E8E40;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}
.zl-button:hover {
  background: #0A7935;
}
.zl-result {
  padding: 20px;
  border-radius: 12px;
  margin-top: 16px;
}
.zl-result-success {
  background: linear-gradient(135deg, #E8F5EE 0%, #FEFDF8 100%);
  border: 1px solid #0E8E40;
}
.zl-result-warn {
  background: #FFF8E7;
  border: 1px solid #F5A800;
}
.zl-result-eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: #0E8E40;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.zl-result-warn .zl-result-eyebrow { color: #B07A00; }
.zl-result-office {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  color: #0E1A0F;
  margin-bottom: 4px;
}
.zl-result-addr {
  font-size: 14px;
  color: #5A6660;
  margin-bottom: 12px;
}
.zl-call-btn {
  display: inline-block;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  background: #F5A800;
  color: #0E1A0F;
  text-decoration: none;
  border-radius: 999px;
  transition: transform 0.15s, box-shadow 0.15s;
}
.zl-call-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 168, 0, 0.3);
}
.zl-compact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.zl-input-compact { padding: 10px 12px; font-size: 14px; }
.zl-button-compact { padding: 10px 14px; font-size: 14px; }
.zl-call-compact { padding: 10px 14px; font-size: 14px; text-align: center; }
.zl-inline {
  font-family: 'DM Sans', system-ui, sans-serif;
}
.zl-inline-result {
  margin-top: 12px;
  font-size: 15px;
  color: #0E1A0F;
}
.zl-inline-result a {
  color: #0E8E40;
  font-weight: 600;
  text-decoration: none;
}
.zl-inline-result a:hover { text-decoration: underline; }
@media (max-width: 480px) {
  .zl-form { flex-direction: column; }
  .zl-button { width: 100%; }
  .zl-card { padding: 24px 20px; }
  .zl-title { font-size: 24px; }
}
`;e.s(["default",0,function({variant:e="card"}){let[s,n]=(0,t.useState)(""),[i,o]=(0,t.useState)(null),[c,p]=(0,t.useState)(null);function d(e){e.preventDefault();let l=s.trim().slice(0,5);if(5!==l.length||!/^\d{5}$/.test(l)){p(!1),o(null);return}p((0,a.isInServiceArea)(l)),o((0,a.officeForZip)(l))}return"card"===e?(0,l.jsxs)("div",{className:"zl-card",children:[(0,l.jsx)("style",{dangerouslySetInnerHTML:{__html:r}}),(0,l.jsx)("div",{className:"zl-eyebrow",children:"🌻 Find Your Local Office"}),(0,l.jsx)("h3",{className:"zl-title",children:"Which EnviroCare Office Serves You?"}),(0,l.jsx)("p",{className:"zl-sub",children:"Enter your Alabama zip code — we'll route you to the right local team."}),(0,l.jsxs)("form",{onSubmit:d,className:"zl-form",children:[(0,l.jsx)("input",{type:"text",inputMode:"numeric",pattern:"[0-9]{5}",maxLength:5,placeholder:"35243",value:s,onChange:e=>n(e.target.value.replace(/\D/g,"")),className:"zl-input","aria-label":"Zip code"}),(0,l.jsx)("button",{type:"submit",className:"zl-button",children:"Find My Office →"})]}),i&&c&&(0,l.jsxs)("div",{className:"zl-result zl-result-success",children:[(0,l.jsx)("div",{className:"zl-result-eyebrow",children:"✓ You're in our service area"}),(0,l.jsx)("div",{className:"zl-result-office",children:i.name}),(0,l.jsxs)("div",{className:"zl-result-addr",children:[i.address," · ",i.city,", ",i.state," ",i.zip]}),(0,l.jsxs)("a",{href:`tel:${i.phone}`,className:"zl-call-btn",children:["📞 Call ",i.phoneDisplay]})]}),i&&!1===c&&(0,l.jsxs)("div",{className:"zl-result zl-result-warn",children:[(0,l.jsx)("div",{className:"zl-result-eyebrow",children:"We may still be able to help"}),(0,l.jsx)("div",{className:"zl-result-office",children:"Try our main line: (205) 649-5278"}),(0,l.jsxs)("div",{className:"zl-result-addr",children:["Or call our nearest office — ",i.name]}),(0,l.jsxs)("a",{href:`tel:${i.phone}`,className:"zl-call-btn",children:["📞 Call ",i.phoneDisplay]})]})]}):"compact"===e?(0,l.jsxs)("div",{className:"zl-compact",children:[(0,l.jsx)("style",{dangerouslySetInnerHTML:{__html:r}}),(0,l.jsxs)("form",{onSubmit:d,className:"zl-form",children:[(0,l.jsx)("input",{type:"text",inputMode:"numeric",pattern:"[0-9]{5}",maxLength:5,placeholder:"Zip",value:s,onChange:e=>n(e.target.value.replace(/\D/g,"")),className:"zl-input zl-input-compact","aria-label":"Zip code"}),(0,l.jsx)("button",{type:"submit",className:"zl-button zl-button-compact",children:"Go"})]}),i&&(0,l.jsxs)("a",{href:`tel:${i.phone}`,className:"zl-call-btn zl-call-compact",children:["Call ",i.phoneDisplay]})]}):(0,l.jsxs)("div",{className:"zl-inline",children:[(0,l.jsx)("style",{dangerouslySetInnerHTML:{__html:r}}),(0,l.jsxs)("form",{onSubmit:d,className:"zl-form",children:[(0,l.jsx)("input",{type:"text",inputMode:"numeric",pattern:"[0-9]{5}",maxLength:5,placeholder:"Your zip code",value:s,onChange:e=>n(e.target.value.replace(/\D/g,"")),className:"zl-input","aria-label":"Zip code"}),(0,l.jsx)("button",{type:"submit",className:"zl-button",children:"Find My Office →"})]}),i&&(0,l.jsxs)("div",{className:"zl-inline-result",children:[(0,l.jsxs)("strong",{children:[i.name,":"]})," ",(0,l.jsx)("a",{href:`tel:${i.phone}`,children:i.phoneDisplay})]})]})}])}]);