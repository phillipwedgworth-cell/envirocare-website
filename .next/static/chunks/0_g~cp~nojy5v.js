(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88143,(e,i,r)=>{"use strict";function t({widthInt:e,heightInt:i,blurWidth:r,blurHeight:a,blurDataURL:s,objectFit:n}){let o=r?40*r:e,c=a?40*a:i,l=o&&c?`viewBox='0 0 ${o} ${c}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${l}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${l?"none":"contain"===n?"xMidYMid":"cover"===n?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${s}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return t}})},87690,(e,i,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t={VALID_LOADERS:function(){return s},imageConfigDefault:function(){return n}};for(var a in t)Object.defineProperty(r,a,{enumerable:!0,get:t[a]});let s=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},8927,(e,i,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return l}}),e.r(33525);let t=e.r(43369),a=e.r(88143),s=e.r(87690),n=["-moz-initial","fill","none","scale-down",void 0];function o(e){return void 0!==e.default}function c(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function l({src:e,sizes:i,unoptimized:r=!1,priority:d=!1,preload:p=!1,loading:h,className:f,quality:x,width:m,height:g,fill:u=!1,style:b,overrideSrc:j,onLoad:v,onLoadingComplete:y,placeholder:w="empty",blurDataURL:E,fetchPriority:N,decoding:A="async",layout:k,objectFit:F,objectPosition:C,lazyBoundary:S,lazyRoot:z,...P},O){var D;let L,R,T,{imgConf:I,showAltText:M,blurComplete:_,defaultLoader:H}=O,G=I||s.imageConfigDefault;if("allSizes"in G)L=G;else{let e=[...G.deviceSizes,...G.imageSizes].sort((e,i)=>e-i),i=G.deviceSizes.sort((e,i)=>e-i),r=G.qualities?.sort((e,i)=>e-i);L={...G,allSizes:e,deviceSizes:i,qualities:r}}if(void 0===H)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let B=P.loader||H;delete P.loader,delete P.srcSet;let q="__next_img_default"in B;if(q){if("custom"===L.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=B;B=i=>{let{config:r,...t}=i;return e(t)}}if(k){"fill"===k&&(u=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[k];e&&(b={...b,...e});let r={responsive:"100vw",fill:"100vw"}[k];r&&!i&&(i=r)}let $="",W=c(m),U=c(g);if((D=e)&&"object"==typeof D&&(o(D)||void 0!==D.src)){let i=o(e)?e.default:e;if(!i.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(i)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!i.height||!i.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(i)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(R=i.blurWidth,T=i.blurHeight,E=E||i.blurDataURL,$=i.src,!u)if(W||U){if(W&&!U){let e=W/i.width;U=Math.round(i.height*e)}else if(!W&&U){let e=U/i.height;W=Math.round(i.width*e)}}else W=i.width,U=i.height}let Y=!d&&!p&&("lazy"===h||void 0===h);(!(e="string"==typeof e?e:$)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,Y=!1),L.unoptimized&&(r=!0),q&&!L.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let V=c(x),X=Object.assign(u?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:F,objectPosition:C}:{},M?{}:{color:"transparent"},b),K=_||"empty"===w?null:"blur"===w?`url("data:image/svg+xml;charset=utf-8,${(0,a.getImageBlurSvg)({widthInt:W,heightInt:U,blurWidth:R,blurHeight:T,blurDataURL:E||"",objectFit:X.objectFit})}")`:`url("${w}")`,Z=n.includes(X.objectFit)?"fill"===X.objectFit?"100% 100%":"cover":X.objectFit,Q=K?{backgroundSize:Z,backgroundPosition:X.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:K}:{},J=function({config:e,src:i,unoptimized:r,width:a,quality:s,sizes:n,loader:o}){if(r){if(i.startsWith("/")&&!i.startsWith("//")){let e=(0,t.getDeploymentId)();if(e){let r=i.indexOf("?");if(-1!==r){let t=new URLSearchParams(i.slice(r+1));t.get("dpl")||(t.append("dpl",e),i=i.slice(0,r)+"?"+t.toString())}else i+=`?dpl=${e}`}}return{src:i,srcSet:void 0,sizes:void 0}}let{widths:c,kind:l}=function({deviceSizes:e,allSizes:i},r,t){if(t){let r=/(^|\s)(1?\d?\d)vw/g,a=[];for(let e;e=r.exec(t);)a.push(parseInt(e[2]));if(a.length){let r=.01*Math.min(...a);return{widths:i.filter(i=>i>=e[0]*r),kind:"w"}}return{widths:i,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>i.find(i=>i>=e)||i[i.length-1]))],kind:"x"}}(e,a,n),d=c.length-1;return{sizes:n||"w"!==l?n:"100vw",srcSet:c.map((r,t)=>`${o({config:e,src:i,quality:s,width:r})} ${"w"===l?r:t+1}${l}`).join(", "),src:o({config:e,src:i,quality:s,width:c[d]})}}({config:L,src:e,unoptimized:r,width:W,quality:V,sizes:i,loader:B}),ee=Y?"lazy":h;return{props:{...P,loading:ee,fetchPriority:N,width:W,height:U,decoding:A,className:f,style:{...X,...Q},sizes:J.sizes,srcSet:J.srcSet,src:j||J.src},meta:{unoptimized:r,preload:p||d,placeholder:w,fill:u}}}},98879,(e,i,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return o}});let t=e.r(71645),a="u"<typeof window,s=a?()=>{}:t.useLayoutEffect,n=a?()=>{}:t.useEffect;function o(e){let{headManager:i,reduceComponentsToState:r}=e;function o(){if(i&&i.mountedInstances){let e=t.Children.toArray(Array.from(i.mountedInstances).filter(Boolean));i.updateHead(r(e))}}return a&&(i?.mountedInstances?.add(e.children),o()),s(()=>(i?.mountedInstances?.add(e.children),()=>{i?.mountedInstances?.delete(e.children)})),s(()=>(i&&(i._pendingUpdate=o),()=>{i&&(i._pendingUpdate=o)})),n(()=>(i&&i._pendingUpdate&&(i._pendingUpdate(),i._pendingUpdate=null),()=>{i&&i._pendingUpdate&&(i._pendingUpdate(),i._pendingUpdate=null)})),null}},25633,(e,i,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t={default:function(){return m},defaultHead:function(){return p}};for(var a in t)Object.defineProperty(r,a,{enumerable:!0,get:t[a]});let s=e.r(55682),n=e.r(90809),o=e.r(43476),c=n._(e.r(71645)),l=s._(e.r(98879)),d=e.r(42732);function p(){return[(0,o.jsx)("meta",{charSet:"utf-8"},"charset"),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function h(e,i){return"string"==typeof i||"number"==typeof i?e:i.type===c.default.Fragment?e.concat(c.default.Children.toArray(i.props.children).reduce((e,i)=>"string"==typeof i||"number"==typeof i?e:e.concat(i),[])):e.concat(i)}e.r(33525);let f=["name","httpEquiv","charSet","itemProp"];function x(e){let i,r,t,a;return e.reduce(h,[]).reverse().concat(p().reverse()).filter((i=new Set,r=new Set,t=new Set,a={},e=>{let s=!0,n=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){n=!0;let r=e.key.slice(e.key.indexOf("$")+1);i.has(r)?s=!1:i.add(r)}switch(e.type){case"title":case"base":r.has(e.type)?s=!1:r.add(e.type);break;case"meta":for(let i=0,r=f.length;i<r;i++){let r=f[i];if(e.props.hasOwnProperty(r))if("charSet"===r)t.has(r)?s=!1:t.add(r);else{let i=e.props[r],t=a[r]||new Set;("name"!==r||!n)&&t.has(i)?s=!1:(t.add(i),a[r]=t)}}}return s})).reverse().map((e,i)=>{let r=e.key||i;return c.default.cloneElement(e,{key:r})})}let m=function({children:e}){let i=(0,c.useContext)(d.HeadManagerContext);return(0,o.jsx)(l.default,{reduceComponentsToState:x,headManager:i,children:e})};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),i.exports=r.default)},18556,(e,i,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return s}});let t=e.r(55682)._(e.r(71645)),a=e.r(87690),s=t.default.createContext(a.imageConfigDefault)},65856,(e,i,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return t}});let t=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,i,r)=>{"use strict";function t(e,i){let r=e||75;return i?.qualities?.length?i.qualities.reduce((e,i)=>Math.abs(i-r)<Math.abs(e-r)?i:e,i.qualities[0]):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return t}})},1948,(e,i,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return n}});let t=e.r(70965),a=e.r(43369);function s({config:e,src:i,width:r,quality:n}){let o=(0,a.getDeploymentId)();if(i.startsWith("/")&&!i.startsWith("//")){let e=i.indexOf("?");if(-1!==e){let r=new URLSearchParams(i.slice(e+1)),t=r.get("dpl");if(t){o=t,r.delete("dpl");let a=r.toString();i=i.slice(0,e)+(a?"?"+a:"")}}}if(i.startsWith("/")&&i.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${i}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let c=(0,t.findClosestQuality)(n,e);return`${e.path}?url=${encodeURIComponent(i)}&w=${r}&q=${c}${i.startsWith("/")&&o?`&dpl=${o}`:""}`}s.__next_img_default=!0;let n=s},5500,(e,i,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return v}});let t=e.r(55682),a=e.r(90809),s=e.r(43476),n=a._(e.r(71645)),o=t._(e.r(74080)),c=t._(e.r(25633)),l=e.r(8927),d=e.r(87690),p=e.r(18556);e.r(33525);let h=e.r(65856),f=t._(e.r(1948)),x=e.r(18581),m={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function g(e,i,r,t,a,s,n){let o=e?.src;e&&e["data-loaded-src"]!==o&&(e["data-loaded-src"]=o,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==i&&a(!0),r?.current){let i=new Event("load");Object.defineProperty(i,"target",{writable:!1,value:e});let t=!1,a=!1;r.current({...i,nativeEvent:i,currentTarget:e,target:e,isDefaultPrevented:()=>t,isPropagationStopped:()=>a,persist:()=>{},preventDefault:()=>{t=!0,i.preventDefault()},stopPropagation:()=>{a=!0,i.stopPropagation()}})}t?.current&&t.current(e)}}))}function u(e){return n.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let b=(0,n.forwardRef)(({src:e,srcSet:i,sizes:r,height:t,width:a,decoding:o,className:c,style:l,fetchPriority:d,placeholder:p,loading:h,unoptimized:f,fill:m,onLoadRef:b,onLoadingCompleteRef:j,setBlurComplete:v,setShowAltText:y,sizesInput:w,onLoad:E,onError:N,...A},k)=>{let F=(0,n.useCallback)(e=>{e&&(N&&(e.src=e.src),e.complete&&g(e,p,b,j,v,f,w))},[e,p,b,j,v,N,f,w]),C=(0,x.useMergedRef)(k,F);return(0,s.jsx)("img",{...A,...u(d),loading:h,width:a,height:t,decoding:o,"data-nimg":m?"fill":"1",className:c,style:l,sizes:r,srcSet:i,src:e,ref:C,onLoad:e=>{g(e.currentTarget,p,b,j,v,f,w)},onError:e=>{y(!0),"empty"!==p&&v(!0),N&&N(e)}})});function j({isAppRouter:e,imgAttributes:i}){let r={as:"image",imageSrcSet:i.srcSet,imageSizes:i.sizes,crossOrigin:i.crossOrigin,referrerPolicy:i.referrerPolicy,...u(i.fetchPriority)};return e&&o.default.preload?(o.default.preload(i.src,r),null):(0,s.jsx)(c.default,{children:(0,s.jsx)("link",{rel:"preload",href:i.srcSet?void 0:i.src,...r},"__nimg-"+i.src+i.srcSet+i.sizes)})}let v=(0,n.forwardRef)((e,i)=>{let r=(0,n.useContext)(h.RouterContext),t=(0,n.useContext)(p.ImageConfigContext),a=(0,n.useMemo)(()=>{let e=m||t||d.imageConfigDefault,i=[...e.deviceSizes,...e.imageSizes].sort((e,i)=>e-i),r=e.deviceSizes.sort((e,i)=>e-i),a=e.qualities?.sort((e,i)=>e-i);return{...e,allSizes:i,deviceSizes:r,qualities:a,localPatterns:"u"<typeof window?t?.localPatterns:e.localPatterns}},[t]),{onLoad:o,onLoadingComplete:c}=e,x=(0,n.useRef)(o);(0,n.useEffect)(()=>{x.current=o},[o]);let g=(0,n.useRef)(c);(0,n.useEffect)(()=>{g.current=c},[c]);let[u,v]=(0,n.useState)(!1),[y,w]=(0,n.useState)(!1),{props:E,meta:N}=(0,l.getImgProps)(e,{defaultLoader:f.default,imgConf:a,blurComplete:u,showAltText:y});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(b,{...E,unoptimized:N.unoptimized,placeholder:N.placeholder,fill:N.fill,onLoadRef:x,onLoadingCompleteRef:g,setBlurComplete:v,setShowAltText:w,sizesInput:e.sizes,ref:i}),N.preload?(0,s.jsx)(j,{isAppRouter:!r,imgAttributes:E}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),i.exports=r.default)},94909,(e,i,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t={default:function(){return d},getImageProps:function(){return l}};for(var a in t)Object.defineProperty(r,a,{enumerable:!0,get:t[a]});let s=e.r(55682),n=e.r(8927),o=e.r(5500),c=s._(e.r(1948));function l(e){let{props:i}=(0,n.getImgProps)(e,{defaultLoader:c.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(i))void 0===r&&delete i[e];return{props:i}}let d=o.Image},57688,(e,i,r)=>{i.exports=e.r(94909)},31713,e=>{"use strict";var i=e.i(43476),r=e.i(22016),t=e.i(57688),a=e.i(71645);function s(){return(0,i.jsx)("div",{className:"ec-banner",children:(0,i.jsxs)("div",{className:"ec-banner-inner",children:[(0,i.jsx)("span",{className:"ec-banner-sun",children:"🌻"}),(0,i.jsx)("span",{className:"ec-banner-gold",children:"Family-owned since 1958"}),(0,i.jsx)("span",{className:"ec-banner-dot",children:"·"}),(0,i.jsx)("span",{className:"ec-banner-text",children:"Three generations of the Wedgworth family"}),(0,i.jsx)("span",{className:"ec-banner-dot",children:"·"}),(0,i.jsx)("span",{className:"ec-banner-text",children:"Sentricon® up to $1M coverage"}),(0,i.jsx)("a",{href:"tel:2056495278",className:"ec-banner-call",children:"Call (205) 649-5278 →"})]})})}function n(){let[e,s]=(0,a.useState)(!1);return(0,i.jsxs)("header",{className:"ec-header",children:[(0,i.jsxs)("div",{className:"ec-header-inner",children:[(0,i.jsx)(r.default,{href:"/",className:"ec-brand","aria-label":"EnviroCare home",children:(0,i.jsx)(t.default,{src:"/logo.png",alt:"EnviroCare Pest & Termite Services",width:280,height:72,className:"ec-brand-logo",priority:!0})}),(0,i.jsxs)("nav",{className:"ec-nav","aria-label":"Main navigation",children:[(0,i.jsx)(r.default,{href:"/services/pest-control",children:"Services"}),(0,i.jsx)(r.default,{href:"/lake-martin",children:(0,i.jsx)("em",{children:"Lake Martin"})}),(0,i.jsx)(r.default,{href:"/quote",children:"Pricing"}),(0,i.jsx)(r.default,{href:"/about-us",children:"About"}),(0,i.jsx)(r.default,{href:"/contact-us",children:"Contact"})]}),(0,i.jsxs)("div",{className:"ec-header-cta",children:[(0,i.jsx)("a",{href:"https://payenvirocare.key7app.com/User/Login",target:"_blank",rel:"noopener noreferrer",className:"ec-header-pay",children:"Pay Bill"}),(0,i.jsxs)("a",{href:"tel:2059406360",className:"ec-header-phone",children:[(0,i.jsx)("span",{className:"ec-phone-icon",children:"📞"}),(0,i.jsx)("span",{children:"(205) 940-6360"})]}),(0,i.jsx)(r.default,{href:"/quote",className:"ec-header-quote",children:"Get Free Quote"})]}),(0,i.jsx)("button",{className:"ec-mobile-toggle",onClick:()=>s(!e),"aria-label":"Toggle menu","aria-expanded":e,children:e?"×":"☰"})]}),e&&(0,i.jsxs)("div",{className:"ec-mobile-menu",children:[(0,i.jsx)(r.default,{href:"/services/pest-control",onClick:()=>s(!1),children:"Services"}),(0,i.jsx)(r.default,{href:"/lake-martin",onClick:()=>s(!1),children:"Lake Martin"}),(0,i.jsx)(r.default,{href:"/quote",onClick:()=>s(!1),children:"Pricing"}),(0,i.jsx)(r.default,{href:"/about-us",onClick:()=>s(!1),children:"About"}),(0,i.jsx)(r.default,{href:"/contact-us",onClick:()=>s(!1),children:"Contact"}),(0,i.jsx)("a",{href:"https://payenvirocare.key7app.com/User/Login",target:"_blank",rel:"noopener noreferrer",onClick:()=>s(!1),children:"Pay Bill"}),(0,i.jsx)("a",{href:"tel:2059406360",onClick:()=>s(!1),children:"📞 (205) 940-6360"}),(0,i.jsx)(r.default,{href:"/quote",className:"ec-mobile-cta",onClick:()=>s(!1),children:"Get Free Quote →"})]})]})}function o(){return(0,i.jsxs)("section",{className:"ec-hero",children:[(0,i.jsxs)("div",{className:"ec-hero-bg","aria-hidden":"true",children:[(0,i.jsx)("div",{className:"ec-orb ec-orb-1"}),(0,i.jsx)("div",{className:"ec-orb ec-orb-2"}),(0,i.jsx)("div",{className:"ec-orb ec-orb-3"})]}),(0,i.jsxs)("div",{className:"ec-hero-inner",children:[(0,i.jsxs)("div",{className:"ec-hero-content",children:[(0,i.jsxs)("div",{className:"ec-eyebrow",children:[(0,i.jsx)("span",{className:"ec-eyebrow-dot",children:"●"}),"FAMILY OWNED · ALABAMA SINCE 1958"]}),(0,i.jsxs)("h1",{className:"ec-hero-h1",children:["Protecting Alabama Homes",(0,i.jsx)("br",{}),(0,i.jsx)("em",{className:"ec-h1-italic",children:"Three Generations"}),(0,i.jsx)("br",{}),(0,i.jsx)("span",{className:"ec-h1-gold",children:"Strong."})]}),(0,i.jsx)("p",{className:"ec-hero-sub",children:"The Wedgworth family has kept Alabama homes pest-free for 68 years. Termites, mosquitoes, ticks — handled with the care only a family business delivers."}),(0,i.jsxs)("div",{className:"ec-hero-ctas",children:[(0,i.jsxs)(r.default,{href:"/quote",className:"ec-cta-primary",children:[(0,i.jsx)("span",{children:"Get a Free Quote"}),(0,i.jsx)("span",{className:"ec-arrow",children:"→"})]}),(0,i.jsxs)("a",{href:"tel:2059406360",className:"ec-cta-secondary",children:[(0,i.jsx)("span",{children:"📞"}),(0,i.jsx)("span",{children:"(205) 940-6360"})]})]}),(0,i.jsxs)("div",{className:"ec-hero-stats",children:[(0,i.jsxs)("div",{className:"ec-stat",children:[(0,i.jsx)("div",{className:"ec-stat-num",children:"68+"}),(0,i.jsx)("div",{className:"ec-stat-label",children:"YEARS IN AL"})]}),(0,i.jsxs)("div",{className:"ec-stat",children:[(0,i.jsx)("div",{className:"ec-stat-num",children:"4.9★"}),(0,i.jsx)("div",{className:"ec-stat-label",children:"GOOGLE RATING"})]}),(0,i.jsxs)("div",{className:"ec-stat",children:[(0,i.jsx)("div",{className:"ec-stat-num",children:"$1M"}),(0,i.jsx)("div",{className:"ec-stat-label",children:"SENTRICON® COVERAGE"})]}),(0,i.jsxs)("div",{className:"ec-stat",children:[(0,i.jsx)("div",{className:"ec-stat-num",children:"500+"}),(0,i.jsx)("div",{className:"ec-stat-label",children:"VERIFIED REVIEWS"})]})]}),(0,i.jsxs)("div",{className:"ec-hero-checks",children:[(0,i.jsx)("span",{children:"✓ Licensed & Insured"}),(0,i.jsx)("span",{children:"✓ Sentricon® Certified"}),(0,i.jsx)("span",{children:"✓ Same-Day Available"}),(0,i.jsx)("span",{children:"✓ Family Owned Since 1958"})]})]}),(0,i.jsxs)("div",{className:"ec-hero-visual",children:[(0,i.jsxs)("div",{className:"ec-floating-card ec-card-price",children:[(0,i.jsx)("div",{className:"ec-card-eyebrow",children:"FREE INSPECTION"}),(0,i.jsx)("div",{className:"ec-card-price-num",children:"$0"})]}),(0,i.jsxs)("div",{className:"ec-floating-card ec-card-same-day",children:[(0,i.jsx)("div",{className:"ec-card-icon-circle",children:"⚡"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"ec-card-title",children:"Same-Day Service"}),(0,i.jsx)("div",{className:"ec-card-sub",children:"Call before noon — there today"}),(0,i.jsx)("div",{className:"ec-card-tag",children:"AVAILABLE NOW"})]})]}),(0,i.jsxs)("div",{className:"ec-floating-card ec-card-google",children:[(0,i.jsx)("div",{className:"ec-card-stars",children:"★★★★★"}),(0,i.jsx)("div",{className:"ec-card-google-num",children:"4.9"}),(0,i.jsxs)("div",{className:"ec-card-google-text",children:[(0,i.jsx)("strong",{children:"Google Rating"}),(0,i.jsx)("span",{children:"500+ verified reviews"})]})]}),(0,i.jsx)("div",{className:"ec-hero-sunflower","aria-hidden":"true",children:"🌻"})]})]}),(0,i.jsx)("div",{className:"ec-pest-strip","aria-hidden":"true",children:(0,i.jsxs)("div",{className:"ec-pest-strip-inner",children:[(0,i.jsx)("span",{children:"Cockroaches"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Mosquitoes"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Argentine Ants"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Carpenter Ants"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Spiders"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Stink Bugs"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Fleas & Ticks"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Pillbugs"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Silverfish"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Crickets"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Fire Ants"}),(0,i.jsx)("span",{children:"·"}),(0,i.jsx)("span",{children:"Beetles"})]})})]})}function c(){return(0,i.jsx)("section",{className:"ec-trust",children:(0,i.jsxs)("div",{className:"ec-trust-inner",children:[(0,i.jsxs)("span",{className:"ec-trust-item",children:[(0,i.jsx)("span",{className:"ec-trust-icon",children:"★"}),(0,i.jsxs)("span",{children:[(0,i.jsx)("strong",{children:"4.9 Google"})," · 500+ Reviews"]})]}),(0,i.jsx)("span",{className:"ec-trust-divider"}),(0,i.jsxs)("span",{className:"ec-trust-item",children:[(0,i.jsx)("span",{className:"ec-trust-icon",children:"✓"}),"Sentricon® Certified Specialist"]}),(0,i.jsx)("span",{className:"ec-trust-divider"}),(0,i.jsxs)("span",{className:"ec-trust-item",children:[(0,i.jsx)("span",{className:"ec-trust-icon",children:"✓"}),"Alabama Dept. of Ag. Licensed"]}),(0,i.jsx)("span",{className:"ec-trust-divider"}),(0,i.jsxs)("span",{className:"ec-trust-item",children:[(0,i.jsx)("span",{className:"ec-trust-icon",children:"✓"}),"AL Pest Control Association"]}),(0,i.jsx)("span",{className:"ec-trust-divider"}),(0,i.jsxs)("span",{className:"ec-trust-item",children:[(0,i.jsx)("span",{className:"ec-trust-icon",children:"✓"}),"3rd-Generation Wedgworth Family"]})]})})}function l(){return(0,i.jsx)("section",{className:"ec-services",children:(0,i.jsxs)("div",{className:"ec-section-inner",children:[(0,i.jsx)("div",{className:"ec-section-eyebrow",children:"OUR CORE SERVICES"}),(0,i.jsxs)("h2",{className:"ec-section-h2",children:["Four Pillars of ",(0,i.jsx)("em",{children:"Total Protection"})]}),(0,i.jsx)("p",{className:"ec-section-sub",children:"Every Alabama home needs these four. We've perfected each over 68 years across Birmingham, Lake Martin and Huntsville."}),(0,i.jsxs)("div",{className:"ec-services-grid",children:[(0,i.jsx)(d,{badge:"MOST POPULAR",title:"Pest Control",description:"Year-round defense against ants, roaches, spiders & 30+ pests. Bi-monthly service keeps homes pest-free.",bullets:["Interior + exterior perimeter","Unlimited free re-treatments","$50 off initial service"],href:"/services/pest-control",cornerIcon:"🛡️",featured:!0}),(0,i.jsx)(d,{badge:"SENTRICON® CERTIFIED",title:"Termite Control",description:"Sentricon® Always Active™ system. Continuous protection backed by up to $1M damage warranty.",bullets:["Free full-home inspection","Annual inspection included","Crawlspace + dock + pier"],href:"/services/termite-control",cornerIcon:"🪵",highlight:"$1M COVERAGE"}),(0,i.jsx)(d,{badge:"LAKE MARTIN SPECIALTY",title:"Mosquito Control",description:"21-day yard barrier April–October. Reclaim your deck, dock and outdoor living spaces all season.",bullets:["Up to 12 seasonal applications","Pet- & kid-safe once dry","50% off first application"],href:"/services/mosquito-control",cornerIcon:"🦟",highlight:"21 DAYS"}),(0,i.jsx)(d,{badge:"PET & FAMILY SAFE",title:"Tick Control",description:"Targeted yard treatments to break the tick lifecycle. Critical for waterfront and wooded properties.",bullets:["Lone Star, Dog & Deer ticks","Harborage-zone targeting","Bundled free with mosquito"],href:"/services/tick-control",cornerIcon:"🐾"})]})]})})}function d({badge:e,title:t,description:a,bullets:s,href:n,cornerIcon:o,featured:c,highlight:l}){return(0,i.jsxs)(r.default,{href:n,className:`ec-service-card ${c?"ec-service-featured":""}`,children:[(0,i.jsxs)("div",{className:"ec-service-icon-wrap",children:[(0,i.jsx)("span",{className:"ec-service-icon",children:o}),l&&(0,i.jsx)("span",{className:"ec-service-highlight",children:l})]}),(0,i.jsx)("div",{className:"ec-service-badge",children:e}),(0,i.jsx)("h3",{className:"ec-service-title",children:t}),(0,i.jsx)("p",{className:"ec-service-desc",children:a}),(0,i.jsx)("ul",{className:"ec-service-bullets",children:s.map(e=>(0,i.jsxs)("li",{children:[(0,i.jsx)("span",{className:"ec-check",children:"✓"})," ",e]},e))}),(0,i.jsx)("span",{className:"ec-service-arrow",children:"Learn more →"})]})}function p(){return(0,i.jsx)("section",{className:"ec-specialty",children:(0,i.jsxs)("div",{className:"ec-section-inner",children:[(0,i.jsx)("div",{className:"ec-section-eyebrow",children:"SPECIALTY & ADD-ON SERVICES"}),(0,i.jsxs)("h2",{className:"ec-section-h2",children:["Built for ",(0,i.jsx)("em",{children:"Alabama Properties"})]}),(0,i.jsx)("p",{className:"ec-section-sub",children:"Add any of these to your core service — one invoice, one technician, no juggling vendors."}),(0,i.jsx)("div",{className:"ec-specialty-grid",children:[{icon:"🌻",title:"Fire Ant Control",desc:"Yard-wide elimination & mound treatment. Critical for lake homes and barefoot families.",tag:"ADD-ON",href:"/services/fire-ant"},{icon:"🪲",title:"Flea Control",desc:"Yard barrier treatments to break the flea lifecycle. Bundles seamlessly with mosquito & tick service.",tag:"PET-FRIENDLY",href:"/services/flea"},{icon:"🏠",title:"Builder Pre-Treat",desc:"Pre-construction termite treatment for new builds. The right time to start Sentricon® protection.",tag:"NEW CONSTRUCTION",href:"/services/builder-pre-treat"},{icon:"📋",title:"Real Estate / WDO Letters",desc:"Wood-destroying organism inspection letters for closings. Fast turnaround, lender-ready format.",tag:"CLOSINGS",href:"/services/wdo-letters"},{icon:"🏗️",title:"Crawlspace Service",desc:"Moisture control, vapor barriers & targeted treatments for the most vulnerable part of your home.",tag:"FOUNDATION CARE",href:"/services/crawlspace"},{icon:"🏢",title:"Commercial Service",desc:"Restaurants, offices, warehouses. Discrete scheduling & full compliance documentation.",tag:"IPM & HACCP",href:"/services/commercial"}].map(e=>(0,i.jsxs)(r.default,{href:e.href,className:"ec-specialty-card",children:[(0,i.jsx)("span",{className:"ec-specialty-icon",children:e.icon}),(0,i.jsx)("h3",{className:"ec-specialty-title",children:e.title}),(0,i.jsx)("p",{className:"ec-specialty-desc",children:e.desc}),(0,i.jsx)("span",{className:"ec-specialty-tag",children:e.tag})]},e.title))})]})})}function h(){return(0,i.jsx)("section",{className:"ec-offices",children:(0,i.jsxs)("div",{className:"ec-section-inner",children:[(0,i.jsx)("div",{className:"ec-section-eyebrow",children:"THREE ALABAMA OFFICES"}),(0,i.jsxs)("h2",{className:"ec-section-h2",children:["Local Technicians, ",(0,i.jsx)("em",{children:"Statewide Reach"})]}),(0,i.jsx)("p",{className:"ec-section-sub",children:"Three offices across Alabama — Birmingham, Lake Martin, and Huntsville. Your technician is always a neighbor, never dispatched out of state."}),(0,i.jsxs)("div",{className:"ec-offices-grid",children:[(0,i.jsx)(f,{art:(0,i.jsx)(m,{}),city:"Birmingham",label:"BIRMINGHAM OFFICE",address:"2025 Butler Rd, Alabaster, AL 35007",areas:"Birmingham · Hoover · Chelsea · Pelham · Alabaster · Vestavia Hills · Mountain Brook · Homewood · Helena · Calera",phone:"(205) 940-6360",phoneHref:"tel:2059406360",link:"/birmingham"}),(0,i.jsx)(f,{art:(0,i.jsx)(g,{}),city:"Alex City / Lake Martin",label:"ALEXANDER CITY — EST. 1958",address:"1785 Tallapoosa St, Alexander City, AL 35010",areas:"Lake Martin · Alexander City · Dadeville · Eclectic · Auburn · Opelika · Wetumpka",phone:"(256) 234-6162",phoneHref:"tel:2562346162",link:"/lake-martin",featured:!0}),(0,i.jsx)(f,{art:(0,i.jsx)(u,{}),city:"Huntsville",label:"HUNTSVILLE OFFICE",address:"7027 Old Madison Pike, Ste 108, Huntsville, AL 35806",areas:"Huntsville · Madison · Athens · Decatur · Hartselle · Hampton Cove · Harvest · North Alabama",phone:"(256) 937-7676",phoneHref:"tel:2569377676",link:"/huntsville"})]})]})})}function f({art:e,city:t,label:a,address:s,areas:n,phone:o,phoneHref:c,link:l,featured:d}){return(0,i.jsxs)("div",{className:`ec-office-card ${d?"ec-office-featured":""}`,children:[(0,i.jsx)("div",{className:"ec-office-art",children:e}),(0,i.jsx)("h3",{className:"ec-office-city",children:t}),(0,i.jsx)("div",{className:"ec-office-label",children:a}),(0,i.jsx)("div",{className:"ec-office-addr",children:s}),(0,i.jsx)("div",{className:"ec-office-areas",children:n}),(0,i.jsxs)("a",{href:c,className:"ec-office-phone",children:[(0,i.jsx)("span",{children:"📞"})," ",o]}),(0,i.jsxs)(r.default,{href:l,className:"ec-office-link",children:["View ",t," →"]})]})}function x(){return(0,i.jsx)("section",{className:"ec-areas",children:(0,i.jsxs)("div",{className:"ec-section-inner",children:[(0,i.jsx)("div",{className:"ec-section-eyebrow",children:"ALL SERVICE AREAS"}),(0,i.jsxs)("h2",{className:"ec-section-h2",children:["27 Cities Across ",(0,i.jsx)("em",{children:"Alabama"})]}),(0,i.jsx)("p",{className:"ec-section-sub",children:"Whether you're in downtown Birmingham, on the lake in Dadeville, or near Bridge Street in Huntsville — we have a local technician for you. Tap your city for local pricing and same-day scheduling."}),(0,i.jsxs)("div",{className:"ec-areas-grid",children:[(0,i.jsxs)("div",{className:"ec-areas-col",children:[(0,i.jsxs)("div",{className:"ec-areas-head",children:[(0,i.jsx)("span",{className:"ec-areas-icon",children:"🏙️"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"ec-areas-office",children:"BIRMINGHAM OFFICE"}),(0,i.jsx)("a",{href:"tel:2059406360",className:"ec-areas-phone",children:"(205) 940-6360"})]})]}),(0,i.jsx)("div",{className:"ec-areas-cities",children:[{name:"Birmingham",slug:"birmingham"},{name:"Hoover",slug:"hoover"},{name:"Vestavia Hills",slug:"vestavia-hills"},{name:"Mountain Brook",slug:"mountain-brook"},{name:"Homewood",slug:"homewood"},{name:"Alabaster",slug:"alabaster"},{name:"Chelsea",slug:"chelsea"},{name:"Pelham",slug:"pelham"},{name:"Helena",slug:"helena"},{name:"Calera",slug:"calera"},{name:"Trussville",slug:"trussville"},{name:"Greystone",slug:"greystone"},{name:"Mt Laurel",slug:"mt-laurel"},{name:"Tuscaloosa",slug:"tuscaloosa"}].map(e=>(0,i.jsxs)(r.default,{href:`/${e.slug}`,className:"ec-areas-city",children:[e.name," ",(0,i.jsx)("span",{className:"ec-areas-arrow",children:"→"})]},e.slug))})]}),(0,i.jsxs)("div",{className:"ec-areas-col ec-areas-featured",children:[(0,i.jsxs)("div",{className:"ec-areas-head",children:[(0,i.jsx)("span",{className:"ec-areas-icon",children:"🏞️"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"ec-areas-office",children:"ALEX CITY / LAKE MARTIN · EST. 1958"}),(0,i.jsx)("a",{href:"tel:2562346162",className:"ec-areas-phone",children:"(256) 234-6162"})]})]}),(0,i.jsx)("div",{className:"ec-areas-cities",children:[{name:"Alexander City",slug:"alexander-city"},{name:"Lake Martin",slug:"lake-martin"},{name:"Dadeville",slug:"dadeville"},{name:"Eclectic",slug:"eclectic"},{name:"Auburn",slug:"auburn"},{name:"Opelika",slug:"opelika"}].map(e=>(0,i.jsxs)(r.default,{href:`/${e.slug}`,className:"ec-areas-city",children:[e.name," ",(0,i.jsx)("span",{className:"ec-areas-arrow",children:"→"})]},e.slug))}),(0,i.jsxs)("div",{className:"ec-areas-auburn-note",children:[(0,i.jsx)("span",{className:"ec-areas-auburn-icon",children:"📞"}),"Auburn direct line: ",(0,i.jsx)("a",{href:"tel:3343323321",children:(0,i.jsx)("strong",{children:"(334) 332-3321"})})]})]}),(0,i.jsxs)("div",{className:"ec-areas-col",children:[(0,i.jsxs)("div",{className:"ec-areas-head",children:[(0,i.jsx)("span",{className:"ec-areas-icon",children:"🚀"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"ec-areas-office",children:"HUNTSVILLE OFFICE"}),(0,i.jsx)("a",{href:"tel:2569377676",className:"ec-areas-phone",children:"(256) 937-7676"})]})]}),(0,i.jsx)("div",{className:"ec-areas-cities",children:[{name:"Huntsville",slug:"huntsville"},{name:"Madison",slug:"madison"},{name:"Athens",slug:"athens"},{name:"Decatur",slug:"decatur"},{name:"Hartselle",slug:"hartselle"},{name:"Harvest",slug:"harvest"},{name:"Hampton Cove",slug:"hampton-cove"}].map(e=>(0,i.jsxs)(r.default,{href:`/${e.slug}`,className:"ec-areas-city",children:[e.name," ",(0,i.jsx)("span",{className:"ec-areas-arrow",children:"→"})]},e.slug))})]})]}),(0,i.jsxs)("div",{className:"ec-areas-cta",children:[(0,i.jsx)("p",{children:"Don't see your city? Type your zip to find your local office:"}),(0,i.jsx)(r.default,{href:"/find-office",className:"ec-cta-primary",children:"Find My Office →"})]})]})})}function m(){return(0,i.jsxs)("svg",{viewBox:"0 0 120 100",xmlns:"http://www.w3.org/2000/svg",className:"ec-svg-art",children:[(0,i.jsx)("rect",{width:"120",height:"100",fill:"url(#vulcanSky)"}),(0,i.jsx)("defs",{children:(0,i.jsxs)("linearGradient",{id:"vulcanSky",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,i.jsx)("stop",{offset:"0",stopColor:"#E8F5EE"}),(0,i.jsx)("stop",{offset:"1",stopColor:"#FEFDF8"})]})}),(0,i.jsx)("path",{d:"M 0 80 L 30 50 L 50 65 L 70 40 L 95 55 L 120 70 L 120 100 L 0 100 Z",fill:"#0A7935",opacity:"0.3"}),(0,i.jsx)("path",{d:"M 0 85 L 25 65 L 50 75 L 75 60 L 100 70 L 120 80 L 120 100 L 0 100 Z",fill:"#0E8E40",opacity:"0.5"}),(0,i.jsx)("rect",{x:"55",y:"55",width:"10",height:"30",fill:"#5A6660"}),(0,i.jsx)("rect",{x:"52",y:"82",width:"16",height:"6",fill:"#0E1A0F"}),(0,i.jsx)("circle",{cx:"60",cy:"48",r:"4",fill:"#5A6660"}),(0,i.jsx)("rect",{x:"56",y:"50",width:"8",height:"10",fill:"#5A6660"}),(0,i.jsx)("line",{x1:"60",y1:"52",x2:"60",y2:"38",stroke:"#5A6660",strokeWidth:"2",strokeLinecap:"round"}),(0,i.jsx)("circle",{cx:"60",cy:"34",r:"3",fill:"#F5A800"}),(0,i.jsx)("circle",{cx:"60",cy:"32",r:"2",fill:"#FFE082",opacity:"0.9"}),(0,i.jsx)("rect",{x:"10",y:"70",width:"6",height:"20",fill:"#0E1A0F",opacity:"0.7"}),(0,i.jsx)("rect",{x:"18",y:"74",width:"5",height:"16",fill:"#0E1A0F",opacity:"0.7"}),(0,i.jsx)("rect",{x:"25",y:"68",width:"4",height:"22",fill:"#0E1A0F",opacity:"0.7"}),(0,i.jsx)("rect",{x:"85",y:"70",width:"5",height:"20",fill:"#0E1A0F",opacity:"0.7"}),(0,i.jsx)("rect",{x:"92",y:"65",width:"4",height:"25",fill:"#0E1A0F",opacity:"0.7"}),(0,i.jsx)("rect",{x:"98",y:"72",width:"6",height:"18",fill:"#0E1A0F",opacity:"0.7"}),(0,i.jsx)("rect",{x:"106",y:"68",width:"4",height:"22",fill:"#0E1A0F",opacity:"0.7"})]})}function g(){return(0,i.jsxs)("div",{className:"ec-photo-art",children:[(0,i.jsx)("img",{src:"/lake-martin-aerial.jpg",alt:"Aerial view of Lake Martin, Alabama",className:"ec-photo-art-img"}),(0,i.jsx)("div",{className:"ec-photo-art-overlay"}),(0,i.jsx)("div",{className:"ec-photo-art-badge",children:"EST. 1958"})]})}function u(){return(0,i.jsxs)("svg",{viewBox:"0 0 120 100",xmlns:"http://www.w3.org/2000/svg",className:"ec-svg-art",children:[(0,i.jsx)("rect",{width:"120",height:"100",fill:"url(#rocketSky)"}),(0,i.jsxs)("defs",{children:[(0,i.jsxs)("linearGradient",{id:"rocketSky",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,i.jsx)("stop",{offset:"0",stopColor:"#1A2620"}),(0,i.jsx)("stop",{offset:"0.5",stopColor:"#0E8E40",stopOpacity:"0.3"}),(0,i.jsx)("stop",{offset:"1",stopColor:"#FFE082",stopOpacity:"0.6"})]}),(0,i.jsxs)("linearGradient",{id:"flames",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,i.jsx)("stop",{offset:"0",stopColor:"#F5A800"}),(0,i.jsx)("stop",{offset:"0.5",stopColor:"#FF6B00"}),(0,i.jsx)("stop",{offset:"1",stopColor:"#FFE082",stopOpacity:"0.3"})]})]}),(0,i.jsx)("circle",{cx:"20",cy:"15",r:"0.8",fill:"#fff"}),(0,i.jsx)("circle",{cx:"105",cy:"10",r:"0.8",fill:"#fff"}),(0,i.jsx)("circle",{cx:"35",cy:"8",r:"0.6",fill:"#fff"}),(0,i.jsx)("circle",{cx:"95",cy:"25",r:"0.6",fill:"#fff"}),(0,i.jsx)("circle",{cx:"15",cy:"30",r:"0.6",fill:"#fff"}),(0,i.jsx)("rect",{x:"0",y:"92",width:"120",height:"8",fill:"#0E1A0F"}),(0,i.jsx)("rect",{x:"56",y:"30",width:"8",height:"55",fill:"#FEFDF8"}),(0,i.jsx)("rect",{x:"56",y:"30",width:"8",height:"3",fill:"#DC2626"}),(0,i.jsx)("rect",{x:"56",y:"45",width:"8",height:"2",fill:"#0E1A0F"}),(0,i.jsx)("rect",{x:"56",y:"60",width:"8",height:"2",fill:"#0E1A0F"}),(0,i.jsx)("path",{d:"M 56 30 L 60 18 L 64 30 Z",fill:"#FEFDF8"}),(0,i.jsx)("path",{d:"M 60 18 L 60 12",stroke:"#DC2626",strokeWidth:"1"}),(0,i.jsx)("path",{d:"M 56 75 L 50 88 L 56 85 Z",fill:"#DC2626"}),(0,i.jsx)("path",{d:"M 64 75 L 70 88 L 64 85 Z",fill:"#DC2626"}),(0,i.jsx)("rect",{x:"57",y:"50",width:"3",height:"2",fill:"#fff"}),(0,i.jsx)("rect",{x:"57",y:"50",width:"1",height:"1",fill:"#1E3A8A"}),(0,i.jsx)("text",{x:"58",y:"58",fontSize:"3",fill:"#0E1A0F",fontFamily:"Arial",children:"USA"}),(0,i.jsx)("path",{d:"M 56 85 L 53 100 L 60 95 L 67 100 L 64 85 Z",fill:"url(#flames)",opacity:"0.9"}),(0,i.jsx)("ellipse",{cx:"60",cy:"93",rx:"3",ry:"6",fill:"#fff",opacity:"0.6"})]})}function b(){return(0,i.jsx)("section",{className:"ec-heritage",children:(0,i.jsxs)("div",{className:"ec-section-inner",children:[(0,i.jsx)("div",{className:"ec-section-eyebrow",children:"OUR STORY"}),(0,i.jsxs)("h2",{className:"ec-section-h2",children:["Three Generations. ",(0,i.jsx)("em",{children:"One Family."})," One Promise."]}),(0,i.jsxs)("div",{className:"ec-heritage-grid",children:[(0,i.jsxs)("div",{className:"ec-heritage-text",children:[(0,i.jsxs)("p",{children:["In ",(0,i.jsx)("strong",{children:"1958, Phillip M. Wedgworth"})," started EnviroCare with one truck and one belief — that families deserved an Alabama pest control company that actually answers the phone and stands behind the work."]}),(0,i.jsxs)("p",{children:["Sixty-eight years later, his grandsons"," ",(0,i.jsx)("strong",{children:"Phillip, Kevin, and Lex Wedgworth"})," run the company. Three Alabama offices. Same family. Same answer to your pest problem."]}),(0,i.jsx)("blockquote",{className:"ec-heritage-quote",children:"“No One Cares Like EnviroCare.”"}),(0,i.jsxs)("div",{className:"ec-heritage-stats",children:[(0,i.jsxs)("div",{className:"ec-h-stat",children:[(0,i.jsx)("div",{className:"ec-h-stat-num",children:"1958"}),(0,i.jsx)("div",{className:"ec-h-stat-label",children:"FOUNDED"})]}),(0,i.jsxs)("div",{className:"ec-h-stat",children:[(0,i.jsx)("div",{className:"ec-h-stat-num",children:"3"}),(0,i.jsx)("div",{className:"ec-h-stat-label",children:"GENERATIONS"})]}),(0,i.jsxs)("div",{className:"ec-h-stat",children:[(0,i.jsx)("div",{className:"ec-h-stat-num",children:"100%"}),(0,i.jsx)("div",{className:"ec-h-stat-label",children:"FAMILY OWNED"})]})]})]}),(0,i.jsxs)("div",{className:"ec-heritage-photos",children:[(0,i.jsxs)("div",{className:"ec-photo-frame ec-photo-kevin",children:[(0,i.jsx)("img",{src:"/kevin-headshot.jpg",alt:"Kevin Wedgworth, third-generation owner",className:"ec-photo-img",onError:e=>{let i=e.target;i.style.display="none",i.parentElement?.classList.add("ec-photo-fallback")}}),(0,i.jsxs)("div",{className:"ec-photo-caption",children:[(0,i.jsx)("strong",{children:"Kevin Wedgworth"}),(0,i.jsx)("span",{children:"3rd-Generation Owner"})]})]}),(0,i.jsxs)("div",{className:"ec-photo-frame ec-photo-ribbon-1",children:[(0,i.jsx)("img",{src:"/ribbon-cutting-1.jpg",alt:"Birmingham office ribbon cutting",className:"ec-photo-img",onError:e=>{let i=e.target;i.style.display="none",i.parentElement?.classList.add("ec-photo-fallback")}}),(0,i.jsx)("div",{className:"ec-photo-caption ec-caption-small",children:(0,i.jsx)("strong",{children:"Birmingham Office Opening"})})]}),(0,i.jsxs)("div",{className:"ec-photo-frame ec-photo-ribbon-2",children:[(0,i.jsx)("img",{src:"/ribbon-cutting-2.jpg",alt:"Huntsville office ribbon cutting",className:"ec-photo-img",onError:e=>{let i=e.target;i.style.display="none",i.parentElement?.classList.add("ec-photo-fallback")}}),(0,i.jsx)("div",{className:"ec-photo-caption ec-caption-small",children:(0,i.jsx)("strong",{children:"Huntsville Office Opening"})})]})]})]})]})})}function j(){return(0,i.jsx)("section",{className:"ec-reviews",children:(0,i.jsxs)("div",{className:"ec-section-inner",children:[(0,i.jsxs)("div",{className:"ec-reviews-badge",children:[(0,i.jsx)("span",{className:"ec-reviews-g",children:"Verified by Google"}),(0,i.jsxs)("span",{className:"ec-reviews-rating",children:[(0,i.jsx)("span",{className:"ec-reviews-num",children:"4.9"}),(0,i.jsx)("span",{className:"ec-reviews-stars",children:"★★★★★"}),(0,i.jsx)("span",{className:"ec-reviews-count",children:"· 500+ reviews"})]})]}),(0,i.jsx)("div",{className:"ec-section-eyebrow",children:"CUSTOMER REVIEWS"}),(0,i.jsxs)("h2",{className:"ec-section-h2",children:["What Alabama Families ",(0,i.jsx)("em",{children:"Are Saying"})]}),(0,i.jsx)("p",{className:"ec-section-sub",children:"Real Google reviews from real Alabama homes. Not hand-picked — this is what customers say every week."}),(0,i.jsx)("div",{className:"ec-reviews-grid",children:[{name:"Jessica M.",city:"Huntsville, AL",text:"My husband and I love the service and technicians. Could not recommend more!"},{name:"Ann S.",city:"Hoover, AL",text:"Very professional, schedules with us, and is always on time."},{name:"Dariel S.",city:"Madison, AL",text:"No other pest control company can top the service from EnviroCare!!!"},{name:"Janet H.",city:"Birmingham, AL",text:"The technician was friendly and careful of our things. Five stars without hesitation."}].map(e=>(0,i.jsxs)("div",{className:"ec-review-card",children:[(0,i.jsx)("span",{className:"ec-review-quote",children:"“"}),(0,i.jsx)("div",{className:"ec-review-stars",children:"★★★★★"}),(0,i.jsx)("p",{className:"ec-review-text",children:e.text}),(0,i.jsxs)("div",{className:"ec-review-author",children:[(0,i.jsx)("div",{className:"ec-review-avatar",children:e.name.charAt(0)}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"ec-review-name",children:e.name}),(0,i.jsx)("div",{className:"ec-review-city",children:e.city})]})]})]},e.name))}),(0,i.jsx)(r.default,{href:"/reviews",className:"ec-reviews-link",children:"See all 500+ reviews →"})]})})}function v(){return(0,i.jsx)("section",{className:"ec-pricing",children:(0,i.jsxs)("div",{className:"ec-section-inner",children:[(0,i.jsx)("div",{className:"ec-section-eyebrow",children:"PLANS & PRICING"}),(0,i.jsxs)("h2",{className:"ec-section-h2",children:["Pick Your ",(0,i.jsx)("em",{children:"Protection Plan"})]}),(0,i.jsx)("p",{className:"ec-section-sub",children:"Honest, straightforward pricing. No contracts, no hidden fees — pay monthly on ACH, cancel anytime."}),(0,i.jsxs)("div",{className:"ec-pricing-grid",children:[(0,i.jsx)(y,{title:"Essential",tags:["Pest"],tagline:"Year-round pest control for the everyday Alabama home.",price:"35",unit:"/mo",terms:"ACH · or $70 bi-monthly",bullets:["Bi-monthly exterior treatment","30+ common pests covered","Unlimited free re-services","Same-week scheduling","Family- & pet-safe applications"],cta:"Start Essential",href:"/quote?plan=essential"}),(0,i.jsx)(y,{title:"Foundation",tags:["Pest","Termite"],tagline:"Pest control + Sentricon® termite protection. The right baseline for any Alabama home.",price:"67",unit:"/mo",terms:"ACH · one invoice, one tech",bullets:["Everything in Essential, plus:","Sentricon® Always Active™ system","Annual termite inspection","$1M damage repair coverage","WDO inspection letter (1/yr)","No drilling, no tank trucks"],cta:"Start Foundation",href:"/quote?plan=foundation",badge:"MOST POPULAR",featured:!0}),(0,i.jsx)(y,{title:"Complete",tags:["Pest","Termite","Mosquito","Tick"],tagline:"All four programs — pest, termite, mosquito & tick — under one plan.",price:"127",unit:"/mo",terms:"ACH · everything in one invoice",bullets:["Everything in Foundation, plus:","Mosquito barrier (Apr–Oct, every 21 days)","Tick yard treatments included","Flea yard treatment included","Dedicated account technician","Priority same-week response"],cta:"Start Complete",href:"/quote?plan=complete"})]}),(0,i.jsxs)("div",{className:"ec-offers",children:[(0,i.jsxs)("div",{className:"ec-offer",children:[(0,i.jsx)("div",{className:"ec-offer-icon",children:"🏷️"}),(0,i.jsx)("div",{className:"ec-offer-title",children:"$50 Off Initial Service"}),(0,i.jsx)("div",{className:"ec-offer-desc",children:"New full-service program customers. Mention when calling."})]}),(0,i.jsxs)("div",{className:"ec-offer",children:[(0,i.jsx)("div",{className:"ec-offer-icon",children:"✦"}),(0,i.jsx)("div",{className:"ec-offer-title",children:"50% Off First Mosquito App"}),(0,i.jsx)("div",{className:"ec-offer-desc",children:"New mosquito program customers. Mention when calling."})]}),(0,i.jsxs)("div",{className:"ec-offer",children:[(0,i.jsx)("div",{className:"ec-offer-icon",children:"🔍"}),(0,i.jsx)("div",{className:"ec-offer-title",children:"Free Termite Inspection"}),(0,i.jsx)("div",{className:"ec-offer-desc",children:"No obligation. Schedule today at any AL office."})]})]})]})})}function y({title:e,tags:t,tagline:a,price:s,unit:n,terms:o,bullets:c,cta:l,href:d,badge:p,featured:h}){return(0,i.jsxs)("div",{className:`ec-price-card ${h?"ec-price-featured":""}`,children:[p&&(0,i.jsx)("div",{className:"ec-price-badge",children:p}),(0,i.jsx)("h3",{className:"ec-price-title",children:e}),(0,i.jsx)("div",{className:"ec-price-tags",children:t.map(e=>(0,i.jsx)("span",{className:"ec-price-tag",children:e},e))}),(0,i.jsx)("p",{className:"ec-price-tagline",children:a}),(0,i.jsxs)("div",{className:"ec-price-row",children:[(0,i.jsx)("span",{className:"ec-price-dollar",children:"$"}),(0,i.jsx)("span",{className:"ec-price-num",children:s}),(0,i.jsx)("span",{className:"ec-price-unit",children:n})]}),(0,i.jsx)("div",{className:"ec-price-terms",children:o}),(0,i.jsx)("ul",{className:"ec-price-bullets",children:c.map(e=>(0,i.jsxs)("li",{children:[(0,i.jsx)("span",{className:"ec-check",children:"✓"})," ",e]},e))}),(0,i.jsx)(r.default,{href:d,className:`ec-price-cta ${h?"ec-price-cta-featured":""}`,children:l})]})}function w(){return(0,i.jsxs)("section",{className:"ec-bundle",children:[(0,i.jsxs)("div",{className:"ec-bundle-truck-wrap",children:[(0,i.jsx)("img",{src:"/truck.jpg",alt:"EnviroCare green service truck with sunflower wrap",className:"ec-bundle-truck",onError:e=>{e.target.style.display="none"}}),(0,i.jsx)("div",{className:"ec-bundle-truck-overlay"})]}),(0,i.jsxs)("div",{className:"ec-section-inner ec-bundle-inner",children:[(0,i.jsx)("div",{className:"ec-bundle-truck-eyebrow",children:"You'll Recognize Us"}),(0,i.jsxs)("h2",{className:"ec-bundle-h2",children:["The green truck ",(0,i.jsx)("em",{children:"with the sunflower."})]}),(0,i.jsx)("p",{className:"ec-bundle-truck-text",children:"When you see it in your neighborhood, you know EnviroCare is protecting a home nearby. A familiar face across Alabama for over 68 years."}),(0,i.jsx)("div",{className:"ec-bundle-divider"}),(0,i.jsxs)("h3",{className:"ec-bundle-h3",children:["🌻 One Invoice. One Tech. ",(0,i.jsx)("em",{children:"One Trusted Team."})]}),(0,i.jsx)("p",{className:"ec-bundle-sub",children:"Combine Pest + Termite + Mosquito + Tick on a single plan. Same competitive pricing as standalone — just simpler to manage."}),(0,i.jsxs)("div",{className:"ec-bundle-prices",children:[(0,i.jsxs)("div",{className:"ec-bundle-line",children:["Pest + Termite ",(0,i.jsx)("span",{className:"ec-bundle-price",children:"$67/mo"})]}),(0,i.jsxs)("div",{className:"ec-bundle-line",children:["Outdoor Bundle (Mosquito + Tick + Flea) ",(0,i.jsx)("span",{className:"ec-bundle-price",children:"$60/mo"})]}),(0,i.jsxs)("div",{className:"ec-bundle-line",children:["All Four Programs ",(0,i.jsx)("span",{className:"ec-bundle-price",children:"$127/mo"})]})]}),(0,i.jsxs)("div",{className:"ec-bundle-ctas",children:[(0,i.jsx)("a",{href:"tel:2056495278",className:"ec-cta-primary",children:"Call (205) 649-5278"}),(0,i.jsx)(r.default,{href:"/quote",className:"ec-cta-secondary-light",children:"See Plans →"})]})]})]})}function E(){return(0,i.jsxs)("footer",{className:"ec-footer",children:[(0,i.jsxs)("div",{className:"ec-footer-inner",children:[(0,i.jsxs)("div",{className:"ec-footer-brand-col",children:[(0,i.jsx)(r.default,{href:"/",className:"ec-footer-brand",children:(0,i.jsx)(t.default,{src:"/logo.png",alt:"EnviroCare",width:180,height:48,className:"ec-footer-logo"})}),(0,i.jsx)("p",{className:"ec-footer-tag",children:"Family-owned and operated since 1958 — now in its third generation of the Wedgworth family. Serving Alabama from three offices: Birmingham, Lake Martin, and Huntsville."}),(0,i.jsxs)("div",{className:"ec-footer-phones",children:[(0,i.jsxs)("a",{href:"tel:2056495278",className:"ec-footer-phone",children:["📞 ",(0,i.jsx)("span",{children:"(205) 649-5278"})," — ",(0,i.jsx)("em",{children:"Main Line"})]}),(0,i.jsxs)("a",{href:"tel:2059406360",className:"ec-footer-phone",children:["📞 ",(0,i.jsx)("span",{children:"(205) 940-6360"})," — ",(0,i.jsx)("em",{children:"Birmingham"})]}),(0,i.jsxs)("a",{href:"tel:2562346162",className:"ec-footer-phone",children:["📞 ",(0,i.jsx)("span",{children:"(256) 234-6162"})," — ",(0,i.jsx)("em",{children:"Lake Martin / Alex City"})]}),(0,i.jsxs)("a",{href:"tel:2569377676",className:"ec-footer-phone",children:["📞 ",(0,i.jsx)("span",{children:"(256) 937-7676"})," — ",(0,i.jsx)("em",{children:"Huntsville"})]})]})]}),(0,i.jsxs)("div",{className:"ec-footer-col",children:[(0,i.jsx)("h4",{className:"ec-footer-h4",children:"CORE SERVICES"}),(0,i.jsx)(r.default,{href:"/services/pest-control",children:"Pest Control"}),(0,i.jsx)(r.default,{href:"/services/termite-control",children:"Termite Control"}),(0,i.jsx)(r.default,{href:"/services/mosquito-control",children:"Mosquito Control"}),(0,i.jsx)(r.default,{href:"/services/tick-control",children:"Tick Control"}),(0,i.jsx)(r.default,{href:"/bundle-services",children:"Bundle & Save"})]}),(0,i.jsxs)("div",{className:"ec-footer-col",children:[(0,i.jsx)("h4",{className:"ec-footer-h4",children:"SPECIALTY"}),(0,i.jsx)(r.default,{href:"/services/fire-ant",children:"Fire Ant Control"}),(0,i.jsx)(r.default,{href:"/services/flea",children:"Flea Control"}),(0,i.jsx)(r.default,{href:"/services/builder-pre-treat",children:"Builder Pre-Treat"}),(0,i.jsx)(r.default,{href:"/services/wdo-letters",children:"Real Estate / WDO Letters"}),(0,i.jsx)(r.default,{href:"/services/crawlspace",children:"Crawlspace Service"}),(0,i.jsx)(r.default,{href:"/services/commercial",children:"Commercial Service"})]}),(0,i.jsxs)("div",{className:"ec-footer-col ec-footer-col-areas",children:[(0,i.jsx)("h4",{className:"ec-footer-h4",children:"SERVICE AREAS"}),(0,i.jsxs)("div",{className:"ec-footer-areas-group",children:[(0,i.jsx)("div",{className:"ec-footer-areas-label",children:"Birmingham Metro"}),(0,i.jsx)(r.default,{href:"/birmingham",children:"Birmingham"}),(0,i.jsx)(r.default,{href:"/hoover",children:"Hoover"}),(0,i.jsx)(r.default,{href:"/vestavia-hills",children:"Vestavia Hills"}),(0,i.jsx)(r.default,{href:"/mountain-brook",children:"Mountain Brook"}),(0,i.jsx)(r.default,{href:"/homewood",children:"Homewood"}),(0,i.jsx)(r.default,{href:"/alabaster",children:"Alabaster"}),(0,i.jsx)(r.default,{href:"/chelsea",children:"Chelsea"}),(0,i.jsx)(r.default,{href:"/pelham",children:"Pelham"}),(0,i.jsx)(r.default,{href:"/helena",children:"Helena"}),(0,i.jsx)(r.default,{href:"/calera",children:"Calera"}),(0,i.jsx)(r.default,{href:"/trussville",children:"Trussville"}),(0,i.jsx)(r.default,{href:"/greystone",children:"Greystone"}),(0,i.jsx)(r.default,{href:"/mt-laurel",children:"Mt Laurel"}),(0,i.jsx)(r.default,{href:"/tuscaloosa",children:"Tuscaloosa"})]}),(0,i.jsxs)("div",{className:"ec-footer-areas-group",children:[(0,i.jsx)("div",{className:"ec-footer-areas-label",children:"Lake Martin / Alex City"}),(0,i.jsx)(r.default,{href:"/alexander-city",children:"Alexander City"}),(0,i.jsx)(r.default,{href:"/lake-martin",children:"Lake Martin"}),(0,i.jsx)(r.default,{href:"/dadeville",children:"Dadeville"}),(0,i.jsx)(r.default,{href:"/eclectic",children:"Eclectic"}),(0,i.jsx)(r.default,{href:"/auburn",children:"Auburn"}),(0,i.jsx)(r.default,{href:"/opelika",children:"Opelika"})]}),(0,i.jsxs)("div",{className:"ec-footer-areas-group",children:[(0,i.jsx)("div",{className:"ec-footer-areas-label",children:"North Alabama"}),(0,i.jsx)(r.default,{href:"/huntsville",children:"Huntsville"}),(0,i.jsx)(r.default,{href:"/madison",children:"Madison"}),(0,i.jsx)(r.default,{href:"/athens",children:"Athens"}),(0,i.jsx)(r.default,{href:"/decatur",children:"Decatur"}),(0,i.jsx)(r.default,{href:"/hartselle",children:"Hartselle"}),(0,i.jsx)(r.default,{href:"/harvest",children:"Harvest"}),(0,i.jsx)(r.default,{href:"/hampton-cove",children:"Hampton Cove"})]}),(0,i.jsx)(r.default,{href:"/find-office",className:"ec-footer-find",children:"Find My Office →"})]})]}),(0,i.jsxs)("div",{className:"ec-footer-bottom",children:[(0,i.jsx)("span",{children:"© 2026 EnviroCare Pest & Termite Services LLC. All rights reserved."}),(0,i.jsx)("span",{children:"Licensed in Alabama · Sentricon® Certified Specialist"}),(0,i.jsxs)("div",{className:"ec-footer-bottom-links",children:[(0,i.jsx)(r.default,{href:"/privacy",children:"Privacy Policy"}),(0,i.jsx)(r.default,{href:"/terms",children:"Terms of Service"}),(0,i.jsx)(r.default,{href:"/sitemap.xml",children:"Sitemap"})]})]})]})}let N=`
  .ec-main {
    font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
    color: #0E1A0F;
    background: #FEFDF8;
    min-height: 100vh;
    line-height: 1.55;
  }
  .ec-main * { box-sizing: border-box; }
  .ec-main a { color: inherit; text-decoration: none; }

  /* TOP BANNER */
  .ec-banner {
    background: linear-gradient(90deg, #0A7935 0%, #0E8E40 50%, #0A7935 100%);
    color: #fff;
    padding: 8px 16px;
    font-size: 13px;
    overflow: hidden;
  }
  .ec-banner-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .ec-banner-sun { font-size: 14px; }
  .ec-banner-gold { color: #F5A800; font-weight: 600; }
  .ec-banner-dot { opacity: 0.5; }
  .ec-banner-text { opacity: 0.92; }
  .ec-banner-call {
    margin-left: 12px;
    background: #F5A800;
    color: #0E1A0F !important;
    padding: 4px 12px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 12px;
  }
  @media (max-width: 720px) {
    .ec-banner-text:nth-of-type(2),
    .ec-banner-dot:nth-of-type(3),
    .ec-banner-dot:nth-of-type(4) { display: none; }
  }

  /* HEADER - LOGO IMAGE ONLY */
  .ec-header {
    background: #fff;
    border-bottom: 1px solid #E8E2D8;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 0 rgba(14,26,15,0.04);
    max-width: 100vw;
    overflow-x: hidden;
  }
  .ec-header-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .ec-brand {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    max-height: 72px;
  }
  .ec-brand-logo {
    height: 64px !important;
    width: auto !important;
    max-width: 240px !important;
    object-fit: contain !important;
    display: block !important;
    /* Zoom-in entrance animation: 2x → 1x over 1.2s */
    animation: ec-logo-zoom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    transform-origin: left center;
  }
  @keyframes ec-logo-zoom {
    0% {
      transform: scale(2);
      opacity: 0;
      filter: blur(4px);
    }
    50% {
      opacity: 1;
      filter: blur(1px);
    }
    100% {
      transform: scale(1);
      opacity: 1;
      filter: blur(0);
    }
  }
  /* Skip animation for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .ec-brand-logo {
      animation: none !important;
    }
  }
  @media (max-width: 480px) {
    .ec-brand {
      max-height: 60px;
    }
    .ec-brand-logo {
      height: 52px !important;
      max-width: 200px !important;
    }
    /* Smaller zoom on mobile so it doesn't feel jarring */
    @keyframes ec-logo-zoom {
      0% {
        transform: scale(1.6);
        opacity: 0;
        filter: blur(2px);
      }
      100% {
        transform: scale(1);
        opacity: 1;
        filter: blur(0);
      }
    }
  }

  .ec-nav {
    display: none;
    gap: 28px;
    font-size: 15px;
    font-weight: 500;
  }
  .ec-nav a { color: #1A2620; transition: color 0.15s; }
  .ec-nav a:hover { color: #0E8E40; }
  .ec-nav em { font-style: italic; color: #0E8E40; }

  .ec-header-cta { display: none; align-items: center; gap: 10px; }
  .ec-header-pay {
    font-size: 14px; font-weight: 600;
    color: #5A6660 !important; padding: 8px 14px;
    border-radius: 999px; border: 1px solid #E8E2D8;
    transition: all 0.15s;
  }
  .ec-header-pay:hover { color: #0E8E40 !important; border-color: #0E8E40; }
  .ec-header-phone {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 16px; border-radius: 999px;
    border: 1.5px solid #0E8E40; color: #0E8E40 !important;
    font-weight: 700; font-size: 14px;
  }
  .ec-phone-icon { font-size: 13px; }
  .ec-header-quote {
    padding: 10px 20px; background: #0E1A0F;
    color: #fff !important; border-radius: 999px;
    font-weight: 700; font-size: 14px;
    transition: background 0.15s;
  }
  .ec-header-quote:hover { background: #1A2620; }

  .ec-mobile-toggle {
    background: transparent; border: 1px solid #E8E2D8;
    border-radius: 8px; width: 40px; height: 40px;
    font-size: 22px; color: #0E1A0F; cursor: pointer;
  }
  .ec-mobile-menu {
    display: flex; flex-direction: column; gap: 4px;
    padding: 12px 20px 20px;
    border-top: 1px solid #E8E2D8; background: #fff;
  }
  .ec-mobile-menu a {
    padding: 12px 8px; font-size: 16px; font-weight: 500;
    border-bottom: 1px solid #F1F5F2;
  }
  .ec-mobile-cta {
    margin-top: 8px; padding: 14px 20px !important;
    background: #F5A800; color: #0E1A0F !important;
    border-radius: 999px; text-align: center;
    font-weight: 700 !important;
  }
  @media (min-width: 1024px) {
    .ec-nav, .ec-header-cta { display: flex; }
    .ec-mobile-toggle { display: none; }
    .ec-mobile-menu { display: none !important; }
  }

  /* HERO */
  .ec-hero {
    position: relative;
    background:
      linear-gradient(180deg, rgba(232,245,238,0.92) 0%, rgba(254,253,248,0.95) 60%, rgba(254,253,248,1) 100%),
      url('/family-yard.jpg') center 30% / cover no-repeat;
    padding: 64px 20px 0;
    overflow: hidden;
  }
  .ec-hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .ec-orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px); opacity: 0.55;
    animation: ec-float 8s ease-in-out infinite;
  }
  .ec-orb-1 { width: 320px; height: 320px; background: #0E8E40; top: -80px; left: -80px; }
  .ec-orb-2 { width: 280px; height: 280px; background: #F5A800; top: 200px; right: -60px; animation-delay: -3s; }
  .ec-orb-3 { width: 220px; height: 220px; background: #0A7935; bottom: -80px; left: 30%; animation-delay: -5s; }
  @keyframes ec-float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
  }
  .ec-hero-inner {
    max-width: 1280px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr;
    gap: 48px; position: relative; z-index: 1;
    padding-bottom: 60px;
  }
  .ec-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; background: rgba(255,255,255,0.7);
    border: 1px solid #0E8E40; border-radius: 999px;
    font-size: 11px; font-weight: 700; color: #0E8E40;
    letter-spacing: 0.08em; margin-bottom: 24px;
  }
  .ec-eyebrow-dot { color: #F5A800; font-size: 8px; }
  .ec-hero-h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(40px, 7vw, 80px); font-weight: 700;
    line-height: 1.05; margin: 0 0 24px; color: #0E1A0F;
  }
  .ec-h1-italic { font-style: italic; color: #0E8E40; font-weight: 400; }
  .ec-h1-gold { color: #F5A800; }
  .ec-hero-sub {
    font-size: 18px; line-height: 1.6; color: #5A6660;
    max-width: 520px; margin: 0 0 32px;
  }
  .ec-hero-ctas {
    display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 40px;
  }
  .ec-cta-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 28px; background: #F5A800;
    color: #0E1A0F !important; border-radius: 999px;
    font-weight: 700; font-size: 16px; transition: all 0.15s;
    box-shadow: 0 4px 12px rgba(245,168,0,0.3);
  }
  .ec-cta-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(245,168,0,0.4);
  }
  .ec-arrow { font-size: 16px; }
  .ec-cta-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 28px; background: transparent;
    color: #0E8E40 !important; border: 2px solid #0E8E40;
    border-radius: 999px; font-weight: 700; font-size: 16px;
    transition: all 0.15s;
  }
  .ec-cta-secondary:hover { background: #E8F5EE; }
  .ec-hero-stats {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 12px 24px; margin-bottom: 24px; max-width: 520px;
  }
  .ec-stat {
    padding: 4px 0 4px 16px; border-left: 3px solid #0E8E40;
  }
  .ec-stat-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px; font-weight: 700; line-height: 1; color: #0E1A0F;
  }
  .ec-stat-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
    color: #5A6660; margin-top: 2px;
  }
  .ec-hero-checks { display: flex; flex-wrap: wrap; gap: 6px; }
  .ec-hero-checks span {
    padding: 6px 12px; background: #fff;
    border: 1px solid #E8E2D8; border-radius: 999px;
    font-size: 12px; font-weight: 500; color: #5A6660;
  }

  /* Floating cards - desktop only */
  .ec-hero-visual {
    display: none;
    position: relative;
    min-height: 540px;
  }
  .ec-floating-card {
    position: absolute;
    background: #fff;
    border: 1px solid #E8E2D8;
    border-radius: 16px;
    padding: 18px 22px;
    box-shadow: 0 12px 32px rgba(14,26,15,0.1);
    display: flex; align-items: center; gap: 12px;
    z-index: 2;
  }
  .ec-card-price {
    top: 60%; left: 20px;
    flex-direction: column;
    align-items: flex-start;
    padding: 22px 26px;
  }
  .ec-card-eyebrow {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; color: #5A6660;
  }
  .ec-card-price-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 44px; font-weight: 700; color: #0E1A0F;
    line-height: 1;
  }
  .ec-card-same-day {
    top: 8%; right: 20px;
  }
  .ec-card-icon-circle {
    width: 40px; height: 40px; border-radius: 50%;
    background: #E8F5EE; color: #0E8E40;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .ec-card-title { font-weight: 700; font-size: 14px; margin-bottom: 2px; }
  .ec-card-sub { font-size: 12px; color: #5A6660; margin-bottom: 6px; }
  .ec-card-tag {
    display: inline-block; font-size: 10px; font-weight: 700;
    color: #0E8E40; background: #E8F5EE;
    padding: 3px 8px; border-radius: 999px; letter-spacing: 0.05em;
  }
  .ec-card-google {
    top: 32%; left: 40%;
    flex-direction: column; align-items: center;
    padding: 14px 18px; gap: 4px;
  }
  .ec-card-stars { color: #F5A800; font-size: 14px; letter-spacing: 1px; }
  .ec-card-google-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px; font-weight: 700; color: #0E1A0F; line-height: 1;
  }
  .ec-card-google-text {
    display: flex; flex-direction: column; align-items: center;
    font-size: 11px; color: #5A6660;
  }
  .ec-card-google-text strong { color: #0E1A0F; font-size: 12px; }

  .ec-hero-sunflower {
    position: absolute;
    bottom: 0; right: 80px;
    font-size: 200px;
    opacity: 0.08;
    pointer-events: none;
    transform: rotate(-15deg);
  }

  @media (min-width: 1024px) {
    .ec-hero-inner { grid-template-columns: 1fr 1fr; gap: 64px; }
    .ec-hero-visual { display: block; }
  }

  /* PEST STRIP */
  .ec-pest-strip {
    border-top: 1px solid #E8E2D8;
    background: #fff;
    padding: 12px 0;
    overflow: hidden;
    position: relative;
  }
  .ec-pest-strip-inner {
    display: flex;
    gap: 24px;
    font-size: 13px;
    color: #94A89A;
    white-space: nowrap;
    animation: ec-marquee 40s linear infinite;
    padding-left: 100%;
  }
  @keyframes ec-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  .ec-pest-strip-inner span:nth-child(even) {
    color: #F5A800; font-weight: 700;
  }

  /* TRUST STRIP */
  .ec-trust {
    background: #fff;
    border-top: 1px solid #F5A800;
    border-bottom: 1px solid #F5A800;
    padding: 16px 20px;
  }
  .ec-trust-inner {
    max-width: 1280px; margin: 0 auto;
    display: flex; align-items: center; justify-content: center;
    gap: 16px; flex-wrap: wrap; font-size: 13px;
  }
  .ec-trust-item { display: inline-flex; align-items: center; gap: 6px; color: #5A6660; }
  .ec-trust-item strong { color: #0E1A0F; }
  .ec-trust-icon { color: #F5A800; font-weight: 700; }
  .ec-trust-divider { width: 1px; height: 16px; background: #E8E2D8; }
  @media (max-width: 720px) {
    .ec-trust-divider { display: none; }
  }

  /* SECTION SHARED */
  .ec-section-inner {
    max-width: 1280px; margin: 0 auto;
    padding: 80px 20px;
  }
  .ec-section-eyebrow {
    display: inline-block; font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; color: #0E8E40;
    padding: 6px 14px; background: #E8F5EE; border-radius: 999px;
    margin-bottom: 16px;
  }
  .ec-section-h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(34px, 5vw, 56px); font-weight: 700;
    line-height: 1.1; margin: 0 0 16px; color: #0E1A0F;
  }
  .ec-section-h2 em { font-style: italic; color: #0E8E40; font-weight: 600; }
  .ec-section-sub {
    font-size: 18px; color: #5A6660; max-width: 680px;
    margin: 0 0 48px; line-height: 1.55;
  }

  /* CORE SERVICES */
  .ec-services { background: #fff; }
  .ec-services-grid {
    display: grid; grid-template-columns: 1fr; gap: 20px;
  }
  @media (min-width: 640px) { .ec-services-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ec-services-grid { grid-template-columns: repeat(4, 1fr); } }
  .ec-service-card {
    background: #FEFDF8; border: 1px solid #E8E2D8;
    border-radius: 16px; padding: 28px 24px;
    transition: all 0.2s; display: flex; flex-direction: column;
  }
  .ec-service-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(14,26,15,0.1);
    border-color: #0E8E40;
  }
  .ec-service-featured {
    border-color: #F5A800; background: #fff;
  }
  .ec-service-icon-wrap {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .ec-service-icon { font-size: 40px; line-height: 1; }
  .ec-service-highlight {
    font-size: 10px; font-weight: 700; color: #F5A800;
    background: #FFF8E7; padding: 4px 10px;
    border-radius: 999px; letter-spacing: 0.06em;
  }
  .ec-service-badge {
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
    color: #0E8E40; margin-bottom: 10px;
  }
  .ec-service-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px; font-weight: 700; margin: 0 0 10px; color: #0E1A0F;
  }
  .ec-service-desc {
    font-size: 14px; color: #5A6660; line-height: 1.55;
    margin: 0 0 16px; flex-grow: 1;
  }
  .ec-service-bullets {
    list-style: none; padding: 0; margin: 0 0 20px;
    font-size: 13px; color: #1A2620;
  }
  .ec-service-bullets li { padding: 4px 0; line-height: 1.4; }
  .ec-check { color: #0E8E40; font-weight: 700; }
  .ec-service-arrow {
    color: #F5A800; font-weight: 700; font-size: 14px; margin-top: auto;
  }

  /* SPECIALTY */
  .ec-specialty { background: linear-gradient(180deg, #FEFDF8 0%, #F5F1E8 100%); }
  .ec-specialty-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
  @media (min-width: 640px) { .ec-specialty-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ec-specialty-grid { grid-template-columns: repeat(3, 1fr); } }
  .ec-specialty-card {
    background: #fff; border: 1px solid #E8E2D8;
    border-radius: 14px; padding: 24px; transition: all 0.2s;
  }
  .ec-specialty-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(14,26,15,0.06);
    border-color: #0E8E40;
  }
  .ec-specialty-icon {
    font-size: 32px; display: block; margin-bottom: 12px;
  }
  .ec-specialty-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px; font-weight: 700; margin: 0 0 8px; color: #0E1A0F;
  }
  .ec-specialty-desc {
    font-size: 14px; color: #5A6660; line-height: 1.5; margin: 0 0 14px;
  }
  .ec-specialty-tag {
    display: inline-block; font-size: 11px; font-weight: 700;
    color: #0E8E40; letter-spacing: 0.06em;
  }

  /* OFFICES */
  .ec-offices { background: #fff; }
  .ec-offices-grid {
    display: grid; grid-template-columns: 1fr; gap: 20px;
  }
  @media (min-width: 1024px) { .ec-offices-grid { grid-template-columns: repeat(3, 1fr); } }
  .ec-office-card {
    background: #FEFDF8; border: 1px solid #E8E2D8;
    border-radius: 16px; padding: 0 24px 28px;
    text-align: center; transition: all 0.2s;
    overflow: hidden;
  }
  .ec-office-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(14,26,15,0.08);
  }
  .ec-office-featured {
    background: linear-gradient(180deg, #FFF8E7 0%, #FEFDF8 30%);
    border-color: #F5A800;
  }
  .ec-office-art {
    margin: 0 -24px 16px;
    background: #F5F1E8;
    height: 140px;
    overflow: hidden;
  }
  .ec-svg-art {
    width: 100%; height: 100%; display: block;
  }
  .ec-photo-art {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .ec-photo-art-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .ec-photo-art-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(14,142,64,0.15) 0%, rgba(245,168,0,0.10) 100%);
    pointer-events: none;
  }
  .ec-photo-art-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255,255,255,0.95);
    color: #0E1A0F;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    box-shadow: 0 2px 8px rgba(14,26,15,0.15);
  }
  .ec-office-city {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px; font-weight: 700; margin: 0 0 6px; color: #0E1A0F;
  }
  .ec-office-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
    color: #0E8E40; margin-bottom: 12px;
  }
  .ec-office-addr {
    font-size: 14px; color: #1A2620;
    margin-bottom: 12px; font-weight: 500;
  }
  .ec-office-areas {
    font-size: 13px; color: #5A6660;
    margin-bottom: 20px; line-height: 1.5;
  }
  .ec-office-phone {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 18px; border: 1.5px solid #0E8E40;
    color: #0E8E40 !important; border-radius: 999px;
    font-weight: 700; font-size: 14px; margin-bottom: 10px;
  }
  .ec-office-link {
    display: block; font-size: 13px; font-weight: 600; color: #F5A800 !important;
  }

  /* SERVICE AREAS - all 27 cities */
  .ec-areas {
    background: linear-gradient(180deg, #FEFDF8 0%, #F5F1E8 100%);
  }
  .ec-areas-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  @media (min-width: 900px) {
    .ec-areas-grid { grid-template-columns: repeat(3, 1fr); }
  }
  .ec-areas-col {
    background: #fff;
    border: 1px solid #E8E2D8;
    border-radius: 16px;
    padding: 24px;
    transition: all 0.2s;
  }
  .ec-areas-col:hover {
    box-shadow: 0 8px 20px rgba(14,26,15,0.06);
    border-color: #0E8E40;
  }
  .ec-areas-featured {
    background: linear-gradient(180deg, #FFF8E7 0%, #fff 30%);
    border-color: #F5A800;
    position: relative;
  }
  .ec-areas-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid #F1F5F2;
  }
  .ec-areas-icon { font-size: 36px; line-height: 1; }
  .ec-areas-office {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #0E8E40;
    margin-bottom: 4px;
  }
  .ec-areas-phone {
    color: #0E1A0F !important;
    font-weight: 700;
    font-size: 16px;
    font-family: 'Playfair Display', Georgia, serif;
  }
  .ec-areas-cities {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
  }
  .ec-areas-city {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #1A2620 !important;
    transition: all 0.15s;
    border: 1px solid transparent;
  }
  .ec-areas-city:hover {
    background: #E8F5EE;
    color: #0E8E40 !important;
    border-color: #0E8E40;
    transform: translateX(2px);
  }
  .ec-areas-arrow {
    color: #F5A800;
    font-weight: 700;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .ec-areas-city:hover .ec-areas-arrow { opacity: 1; }
  .ec-areas-auburn-note {
    margin-top: 16px;
    padding: 12px 14px;
    background: #FEFDF8;
    border: 1px dashed #F5A800;
    border-radius: 10px;
    font-size: 13px;
    color: #5A6660;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ec-areas-auburn-note a {
    color: #0E8E40 !important;
    text-decoration: none;
  }
  .ec-areas-auburn-note a:hover { text-decoration: underline; }
  .ec-areas-auburn-icon { font-size: 14px; }
  .ec-areas-cta {
    margin-top: 48px;
    text-align: center;
  }
  .ec-areas-cta p {
    font-size: 16px;
    color: #5A6660;
    margin: 0 0 16px;
  }

  /* HERITAGE */
  .ec-heritage {
    background: linear-gradient(180deg, #FEFDF8 0%, #E8F5EE 100%);
  }
  .ec-heritage-grid {
    display: grid; grid-template-columns: 1fr; gap: 48px;
    align-items: center;
  }
  @media (min-width: 1024px) {
    .ec-heritage-grid { grid-template-columns: 1fr 1fr; }
  }
  .ec-heritage-text p {
    font-size: 17px; line-height: 1.7;
    color: #1A2620; margin: 0 0 20px;
  }
  .ec-heritage-quote {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 26px; font-style: italic; color: #0E1A0F;
    border-left: 4px solid #F5A800; padding-left: 20px;
    margin: 32px 0; font-weight: 700;
  }
  .ec-heritage-stats {
    display: flex; gap: 32px; margin-top: 24px; flex-wrap: wrap;
  }
  .ec-h-stat-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 36px; font-weight: 700; color: #0E8E40; line-height: 1;
  }
  .ec-h-stat-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
    color: #5A6660; margin-top: 4px;
  }

  /* PHOTOS */
  .ec-heritage-photos {
    position: relative;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ec-photo-frame {
    position: absolute;
    background: #fff;
    padding: 12px 12px 40px;
    box-shadow: 0 12px 30px rgba(14,26,15,0.15);
    transition: transform 0.3s;
    overflow: hidden;
  }
  .ec-photo-frame:hover { transform: scale(1.02); }
  .ec-photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .ec-photo-caption {
    position: absolute;
    bottom: 6px;
    left: 12px;
    right: 12px;
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .ec-photo-caption strong {
    font-size: 13px;
    font-weight: 700;
    color: #0E1A0F;
  }
  .ec-photo-caption span {
    font-size: 11px;
    color: #5A6660;
  }
  .ec-caption-small strong { font-size: 11px; }

  .ec-photo-kevin {
    width: 260px;
    height: 340px;
    left: 0;
    top: 40px;
    transform: rotate(-3deg);
    z-index: 2;
  }
  .ec-photo-ribbon-1 {
    width: 220px;
    height: 160px;
    right: 0;
    top: 0;
    transform: rotate(4deg);
    z-index: 1;
  }
  .ec-photo-ribbon-2 {
    width: 220px;
    height: 160px;
    right: 20px;
    bottom: 0;
    transform: rotate(-2deg);
    z-index: 1;
  }

  /* Fallback styling if photos missing */
  .ec-photo-fallback {
    background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }
  .ec-photo-fallback::before {
    content: '🌻';
    font-size: 60px;
    margin-bottom: 12px;
  }
  .ec-photo-fallback .ec-photo-caption {
    position: static;
    color: #fff;
    text-align: center;
    margin-top: 12px;
  }
  .ec-photo-fallback .ec-photo-caption strong { color: #fff; }
  .ec-photo-fallback .ec-photo-caption span { color: rgba(255,255,255,0.85); }

  @media (max-width: 1023px) {
    .ec-heritage-photos {
      min-height: 360px;
    }
    .ec-photo-kevin {
      width: 200px; height: 260px;
      left: 50%;
      transform: translateX(-60%) rotate(-3deg);
    }
    .ec-photo-ribbon-1 {
      width: 170px; height: 120px;
      right: 0; top: 20px;
    }
    .ec-photo-ribbon-2 {
      width: 170px; height: 120px;
      left: 0; bottom: 0;
    }
  }
  @media (max-width: 640px) {
    .ec-heritage-photos {
      min-height: 320px;
    }
    .ec-photo-kevin {
      width: 160px; height: 210px;
    }
    .ec-photo-ribbon-1 {
      width: 140px; height: 100px;
    }
    .ec-photo-ribbon-2 {
      width: 140px; height: 100px;
    }
  }

  /* REVIEWS */
  .ec-reviews { background: #fff; }
  .ec-reviews-badge {
    display: inline-flex; align-items: center; gap: 16px;
    padding: 12px 20px; background: #FEFDF8;
    border: 1px solid #E8E2D8; border-radius: 999px;
    margin-bottom: 24px;
  }
  .ec-reviews-g { font-size: 12px; color: #5A6660; }
  .ec-reviews-rating { display: inline-flex; align-items: center; gap: 8px; }
  .ec-reviews-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 22px; font-weight: 700; color: #0E1A0F;
  }
  .ec-reviews-stars { color: #F5A800; font-size: 14px; letter-spacing: 1px; }
  .ec-reviews-count { font-size: 12px; color: #5A6660; }
  .ec-reviews-grid {
    display: grid; grid-template-columns: 1fr; gap: 16px;
  }
  @media (min-width: 640px) { .ec-reviews-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ec-reviews-grid { grid-template-columns: repeat(4, 1fr); } }
  .ec-review-card {
    position: relative; background: #FEFDF8;
    border: 1px solid #E8E2D8; border-radius: 14px;
    padding: 24px; transition: transform 0.2s;
  }
  .ec-review-card:hover { transform: translateY(-2px); }
  .ec-review-quote {
    position: absolute; top: 8px; right: 16px;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 60px; color: #F5A800; opacity: 0.3; line-height: 1;
  }
  .ec-review-stars {
    color: #F5A800; font-size: 14px;
    letter-spacing: 1px; margin-bottom: 12px;
  }
  .ec-review-text {
    font-size: 15px; line-height: 1.6;
    color: #1A2620; margin: 0 0 20px; font-style: italic;
  }
  .ec-review-author {
    display: flex; align-items: center; gap: 10px;
    padding-top: 14px; border-top: 1px solid #F1F5F2;
  }
  .ec-review-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #0E8E40, #0A7935);
    color: #fff; display: inline-flex;
    align-items: center; justify-content: center;
    font-weight: 700; font-size: 15px;
  }
  .ec-review-name { font-size: 14px; font-weight: 700; color: #0E1A0F; }
  .ec-review-city { font-size: 12px; color: #5A6660; }
  .ec-reviews-link {
    display: inline-block; margin-top: 32px;
    font-size: 15px; font-weight: 700; color: #F5A800 !important;
  }

  /* PRICING */
  .ec-pricing { background: linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%); }
  .ec-pricing-grid {
    display: grid; grid-template-columns: 1fr; gap: 20px;
  }
  @media (min-width: 1024px) {
    .ec-pricing-grid { grid-template-columns: repeat(3, 1fr); align-items: start; }
  }
  .ec-price-card {
    background: #fff; border: 1px solid #E8E2D8;
    border-radius: 20px; padding: 32px 28px;
    position: relative; display: flex; flex-direction: column;
  }
  .ec-price-featured {
    border: 2px solid #0E8E40;
    background: linear-gradient(180deg, #E8F5EE 0%, #fff 30%);
    box-shadow: 0 12px 32px rgba(14,142,64,0.12);
  }
  @media (min-width: 1024px) {
    .ec-price-featured { transform: scale(1.04); }
  }
  .ec-price-badge {
    position: absolute; top: -12px; left: 50%;
    transform: translateX(-50%); background: #F5A800;
    color: #0E1A0F; font-size: 11px; font-weight: 700;
    letter-spacing: 0.06em; padding: 6px 14px;
    border-radius: 999px; white-space: nowrap;
  }
  .ec-price-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px; font-weight: 700;
    margin: 0 0 8px; color: #0E1A0F;
  }
  .ec-price-tags { display: flex; gap: 6px; margin-bottom: 12px; }
  .ec-price-tag {
    font-size: 11px; font-weight: 700;
    color: #0E8E40; background: #E8F5EE;
    padding: 4px 10px; border-radius: 999px;
  }
  .ec-price-tagline {
    font-size: 14px; color: #5A6660;
    font-style: italic; margin: 0 0 20px; line-height: 1.5;
  }
  .ec-price-row {
    display: flex; align-items: baseline;
    gap: 4px; margin-bottom: 4px;
  }
  .ec-price-dollar {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px; color: #0E8E40; font-weight: 700;
  }
  .ec-price-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 64px; font-weight: 700;
    color: #0E8E40; line-height: 1;
  }
  .ec-price-unit { font-size: 18px; color: #5A6660; font-weight: 500; }
  .ec-price-terms {
    font-size: 13px; color: #5A6660; margin-bottom: 24px;
  }
  .ec-price-bullets {
    list-style: none; padding: 0; margin: 0 0 24px; flex-grow: 1;
  }
  .ec-price-bullets li {
    padding: 6px 0; font-size: 14px;
    color: #1A2620; line-height: 1.5;
  }
  .ec-price-cta {
    display: block; padding: 14px;
    background: #FEFDF8; border: 1.5px solid #0E8E40;
    color: #0E8E40 !important; border-radius: 999px;
    font-weight: 700; text-align: center;
    transition: all 0.15s;
  }
  .ec-price-cta:hover { background: #E8F5EE; }
  .ec-price-cta-featured {
    background: #0E8E40; color: #fff !important;
    border-color: #0E8E40;
  }
  .ec-price-cta-featured:hover { background: #0A7935; }

  .ec-offers {
    display: grid; grid-template-columns: 1fr;
    gap: 12px; margin-top: 40px;
  }
  @media (min-width: 720px) { .ec-offers { grid-template-columns: repeat(3, 1fr); } }
  .ec-offer {
    padding: 20px 24px; background: #fff;
    border: 1.5px dashed #F5A800;
    border-radius: 14px; text-align: center;
  }
  .ec-offer-icon { font-size: 24px; margin-bottom: 8px; }
  .ec-offer-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 18px; font-weight: 700;
    color: #0E1A0F; margin-bottom: 4px;
  }
  .ec-offer-desc { font-size: 13px; color: #5A6660; }

  /* BUNDLE CTA + TRUCK */
  .ec-bundle {
    background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .ec-bundle-truck-wrap {
    position: relative;
    height: 280px;
    overflow: hidden;
  }
  .ec-bundle-truck {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .ec-bundle-truck-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg,
      rgba(14,26,15,0.0) 0%,
      rgba(14,26,15,0.4) 70%,
      rgba(14,142,64,1) 100%);
  }
  .ec-bundle-inner {
    text-align: center;
    padding-top: 40px;
  }
  .ec-bundle-truck-eyebrow {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em;
    color: #F5A800;
    margin-bottom: 12px;
  }
  .ec-bundle-h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(28px, 4.5vw, 44px);
    font-weight: 700; line-height: 1.15;
    margin: 0 0 16px;
  }
  .ec-bundle-h2 em { font-style: italic; color: #F5A800; }
  .ec-bundle-truck-text {
    font-size: 17px; opacity: 0.92;
    max-width: 640px; margin: 0 auto 32px;
  }
  .ec-bundle-divider {
    width: 80px; height: 2px;
    background: #F5A800; opacity: 0.5;
    margin: 32px auto;
  }
  .ec-bundle-h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 700; line-height: 1.15;
    margin: 0 0 12px;
  }
  .ec-bundle-h3 em { font-style: italic; color: #F5A800; }
  .ec-bundle-sub {
    font-size: 16px; opacity: 0.92;
    max-width: 640px; margin: 0 auto 24px;
  }
  .ec-bundle-prices {
    display: flex; flex-direction: column; gap: 8px;
    max-width: 640px; margin: 0 auto 32px;
  }
  .ec-bundle-line {
    padding: 14px 20px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px; font-size: 15px;
    display: flex; justify-content: space-between;
    align-items: center; flex-wrap: wrap; gap: 8px;
  }
  .ec-bundle-price {
    color: #F5A800; font-weight: 700; font-size: 18px;
  }
  .ec-bundle-ctas {
    display: flex; gap: 12px;
    justify-content: center; flex-wrap: wrap;
  }
  .ec-cta-secondary-light {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 16px 28px; background: transparent;
    color: #fff !important;
    border: 2px solid rgba(255,255,255,0.5);
    border-radius: 999px; font-weight: 700;
  }
  .ec-cta-secondary-light:hover {
    background: rgba(255,255,255,0.1);
    border-color: #fff;
  }

  /* FOOTER */
  .ec-footer {
    background: #0E1A0F; color: #fff;
    padding: 60px 20px 32px;
  }
  .ec-footer-inner {
    max-width: 1280px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr; gap: 32px;
  }
  @media (min-width: 720px) {
    .ec-footer-inner { grid-template-columns: 2fr 1fr 1fr 1fr; }
  }
  .ec-footer-brand { display: inline-block; margin-bottom: 16px; }
  .ec-footer-logo {
    height: 44px !important; width: auto !important;
    object-fit: contain; filter: brightness(1.1);
  }
  .ec-footer-tag {
    font-size: 14px; line-height: 1.6;
    color: rgba(255,255,255,0.7); margin: 0 0 20px;
  }
  .ec-footer-phones {
    display: flex; flex-direction: column; gap: 6px;
  }
  .ec-footer-phone {
    color: #F5A800 !important;
    font-size: 14px; font-weight: 600;
  }
  .ec-footer-phone em {
    color: rgba(255,255,255,0.6);
    font-style: normal; font-weight: 400;
  }
  .ec-footer-col h4 {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; color: #F5A800;
    margin: 0 0 16px;
  }
  .ec-footer-col a {
    display: block; padding: 4px 0;
    font-size: 14px; color: rgba(255,255,255,0.7);
    transition: color 0.15s;
  }
  .ec-footer-col a:hover { color: #fff; }

  /* Expanded footer service areas - 3 grouped columns */
  .ec-footer-col-areas { grid-column: span 1; }
  @media (min-width: 720px) {
    .ec-footer-col-areas {
      grid-column: span 1;
    }
  }
  .ec-footer-areas-group {
    margin-bottom: 16px;
  }
  .ec-footer-areas-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.55);
    text-transform: uppercase;
    margin-bottom: 6px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 4px;
  }
  .ec-footer-areas-group a {
    padding: 2px 0;
    font-size: 13px;
  }
  .ec-footer-find {
    display: inline-block !important;
    margin-top: 12px;
    padding: 8px 14px !important;
    background: rgba(245,168,0,0.15);
    border: 1px solid #F5A800;
    border-radius: 999px;
    color: #F5A800 !important;
    font-size: 13px !important;
    font-weight: 700;
    transition: all 0.15s;
  }
  .ec-footer-find:hover {
    background: #F5A800;
    color: #0E1A0F !important;
  }
  .ec-footer-bottom {
    max-width: 1280px; margin: 40px auto 0;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.1);
    display: flex; flex-wrap: wrap; gap: 16px;
    justify-content: space-between;
    font-size: 12px; color: rgba(255,255,255,0.5);
  }
  .ec-footer-bottom-links { display: flex; gap: 16px; }
  .ec-footer-bottom-links a { color: rgba(255,255,255,0.5); }
  .ec-footer-bottom-links a:hover { color: #fff; }
`;e.s([],72569),e.i(72569),e.s(["default",0,function(){return(0,i.jsxs)("main",{className:"ec-main",children:[(0,i.jsx)("style",{dangerouslySetInnerHTML:{__html:N}}),(0,i.jsx)(s,{}),(0,i.jsx)(n,{}),(0,i.jsx)(o,{}),(0,i.jsx)(c,{}),(0,i.jsx)(l,{}),(0,i.jsx)(p,{}),(0,i.jsx)(h,{}),(0,i.jsx)(x,{}),(0,i.jsx)(b,{}),(0,i.jsx)(j,{}),(0,i.jsx)(v,{}),(0,i.jsx)(w,{}),(0,i.jsx)(E,{})]})}],31713)}]);