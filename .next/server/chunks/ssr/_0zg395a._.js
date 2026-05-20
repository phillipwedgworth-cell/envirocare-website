module.exports=[4987,(a,b,c)=>{"use strict";function d({widthInt:a,heightInt:b,blurWidth:c,blurHeight:e,blurDataURL:f,objectFit:g}){let h=c?40*c:a,i=e?40*e:b,j=h&&i?`viewBox='0 0 ${h} ${i}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${j}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${j?"none":"contain"===g?"xMidYMid":"cover"===g?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${f}'/%3E%3C/svg%3E`}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getImageBlurSvg",{enumerable:!0,get:function(){return d}})},345,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={VALID_LOADERS:function(){return f},imageConfigDefault:function(){return g}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=["default","imgix","cloudinary","akamai","custom"],g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},94915,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getImgProps",{enumerable:!0,get:function(){return j}}),a.r(92434);let d=a.r(68063),e=a.r(4987),f=a.r(345),g=["-moz-initial","fill","none","scale-down",void 0];function h(a){return void 0!==a.default}function i(a){return void 0===a?a:"number"==typeof a?Number.isFinite(a)?a:NaN:"string"==typeof a&&/^[0-9]+$/.test(a)?parseInt(a,10):NaN}function j({src:a,sizes:b,unoptimized:c=!1,priority:k=!1,preload:l=!1,loading:m,className:n,quality:o,width:p,height:q,fill:r=!1,style:s,overrideSrc:t,onLoad:u,onLoadingComplete:v,placeholder:w="empty",blurDataURL:x,fetchPriority:y,decoding:z="async",layout:A,objectFit:B,objectPosition:C,lazyBoundary:D,lazyRoot:E,...F},G){var H;let I,J,K,{imgConf:L,showAltText:M,blurComplete:N,defaultLoader:O}=G,P=L||f.imageConfigDefault;if("allSizes"in P)I=P;else{let a=[...P.deviceSizes,...P.imageSizes].sort((a,b)=>a-b),b=P.deviceSizes.sort((a,b)=>a-b),c=P.qualities?.sort((a,b)=>a-b);I={...P,allSizes:a,deviceSizes:b,qualities:c}}if(void 0===O)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let Q=F.loader||O;delete F.loader,delete F.srcSet;let R="__next_img_default"in Q;if(R){if("custom"===I.loader)throw Object.defineProperty(Error(`Image with src "${a}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let a=Q;Q=b=>{let{config:c,...d}=b;return a(d)}}if(A){"fill"===A&&(r=!0);let a={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[A];a&&(s={...s,...a});let c={responsive:"100vw",fill:"100vw"}[A];c&&!b&&(b=c)}let S="",T=i(p),U=i(q);if((H=a)&&"object"==typeof H&&(h(H)||void 0!==H.src)){let b=h(a)?a.default:a;if(!b.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(b)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!b.height||!b.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(b)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(J=b.blurWidth,K=b.blurHeight,x=x||b.blurDataURL,S=b.src,!r)if(T||U){if(T&&!U){let a=T/b.width;U=Math.round(b.height*a)}else if(!T&&U){let a=U/b.height;T=Math.round(b.width*a)}}else T=b.width,U=b.height}let V=!k&&!l&&("lazy"===m||void 0===m);(!(a="string"==typeof a?a:S)||a.startsWith("data:")||a.startsWith("blob:"))&&(c=!0,V=!1),I.unoptimized&&(c=!0),R&&!I.dangerouslyAllowSVG&&a.split("?",1)[0].endsWith(".svg")&&(c=!0);let W=i(o),X=Object.assign(r?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:B,objectPosition:C}:{},M?{}:{color:"transparent"},s),Y=N||"empty"===w?null:"blur"===w?`url("data:image/svg+xml;charset=utf-8,${(0,e.getImageBlurSvg)({widthInt:T,heightInt:U,blurWidth:J,blurHeight:K,blurDataURL:x||"",objectFit:X.objectFit})}")`:`url("${w}")`,Z=g.includes(X.objectFit)?"fill"===X.objectFit?"100% 100%":"cover":X.objectFit,$=Y?{backgroundSize:Z,backgroundPosition:X.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:Y}:{},_=function({config:a,src:b,unoptimized:c,width:e,quality:f,sizes:g,loader:h}){if(c){if(b.startsWith("/")&&!b.startsWith("//")){let a=(0,d.getDeploymentId)();if(a){let c=b.indexOf("?");if(-1!==c){let d=new URLSearchParams(b.slice(c+1));d.get("dpl")||(d.append("dpl",a),b=b.slice(0,c)+"?"+d.toString())}else b+=`?dpl=${a}`}}return{src:b,srcSet:void 0,sizes:void 0}}let{widths:i,kind:j}=function({deviceSizes:a,allSizes:b},c,d){if(d){let c=/(^|\s)(1?\d?\d)vw/g,e=[];for(let a;a=c.exec(d);)e.push(parseInt(a[2]));if(e.length){let c=.01*Math.min(...e);return{widths:b.filter(b=>b>=a[0]*c),kind:"w"}}return{widths:b,kind:"w"}}return"number"!=typeof c?{widths:a,kind:"w"}:{widths:[...new Set([c,2*c].map(a=>b.find(b=>b>=a)||b[b.length-1]))],kind:"x"}}(a,e,g),k=i.length-1;return{sizes:g||"w"!==j?g:"100vw",srcSet:i.map((c,d)=>`${h({config:a,src:b,quality:f,width:c})} ${"w"===j?c:d+1}${j}`).join(", "),src:h({config:a,src:b,quality:f,width:i[k]})}}({config:I,src:a,unoptimized:c,width:T,quality:W,sizes:b,loader:Q}),aa=V?"lazy":m;return{props:{...F,loading:aa,fetchPriority:y,width:T,height:U,decoding:z,className:n,style:{...X,...$},sizes:_.sizes,srcSet:_.srcSet,src:t||_.src},meta:{unoptimized:c,preload:l||k,placeholder:w,fill:r}}}},94613,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"default",{enumerable:!0,get:function(){return f}});let d=a.r(80826),e=()=>{};function f(a){let{headManager:b,reduceComponentsToState:c}=a;function f(){if(b&&b.mountedInstances){let a=d.Children.toArray(Array.from(b.mountedInstances).filter(Boolean));b.updateHead(c(a))}}return b?.mountedInstances?.add(a.children),f(),e(()=>(b?.mountedInstances?.add(a.children),()=>{b?.mountedInstances?.delete(a.children)})),e(()=>(b&&(b._pendingUpdate=f),()=>{b&&(b._pendingUpdate=f)})),null}},92966,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.HeadManagerContext},58018,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return p},defaultHead:function(){return l}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(33354),g=a.r(46058),h=a.r(87924),i=g._(a.r(80826)),j=f._(a.r(94613)),k=a.r(92966);function l(){return[(0,h.jsx)("meta",{charSet:"utf-8"},"charset"),(0,h.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function m(a,b){return"string"==typeof b||"number"==typeof b?a:b.type===i.default.Fragment?a.concat(i.default.Children.toArray(b.props.children).reduce((a,b)=>"string"==typeof b||"number"==typeof b?a:a.concat(b),[])):a.concat(b)}a.r(92434);let n=["name","httpEquiv","charSet","itemProp"];function o(a){let b,c,d,e;return a.reduce(m,[]).reverse().concat(l().reverse()).filter((b=new Set,c=new Set,d=new Set,e={},a=>{let f=!0,g=!1;if(a.key&&"number"!=typeof a.key&&a.key.indexOf("$")>0){g=!0;let c=a.key.slice(a.key.indexOf("$")+1);b.has(c)?f=!1:b.add(c)}switch(a.type){case"title":case"base":c.has(a.type)?f=!1:c.add(a.type);break;case"meta":for(let b=0,c=n.length;b<c;b++){let c=n[b];if(a.props.hasOwnProperty(c))if("charSet"===c)d.has(c)?f=!1:d.add(c);else{let b=a.props[c],d=e[c]||new Set;("name"!==c||!g)&&d.has(b)?f=!1:(d.add(b),e[c]=d)}}}return f})).reverse().map((a,b)=>{let c=a.key||b;return i.default.cloneElement(a,{key:c})})}let p=function({children:a}){let b=(0,i.useContext)(k.HeadManagerContext);return(0,h.jsx)(j.default,{reduceComponentsToState:o,headManager:b,children:a})};("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},4486,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.ImageConfigContext},53773,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.RouterContext},35444,(a,b,c)=>{"use strict";function d(a,b){let c=a||75;return b?.qualities?.length?b.qualities.reduce((a,b)=>Math.abs(b-c)<Math.abs(a-c)?b:a,b.qualities[0]):c}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"findClosestQuality",{enumerable:!0,get:function(){return d}})},2305,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"default",{enumerable:!0,get:function(){return g}});let d=a.r(35444),e=a.r(68063);function f({config:a,src:b,width:c,quality:g}){let h=(0,e.getDeploymentId)();if(b.startsWith("/")&&!b.startsWith("//")){let a=b.indexOf("?");if(-1!==a){let c=new URLSearchParams(b.slice(a+1)),d=c.get("dpl");if(d){h=d,c.delete("dpl");let e=c.toString();b=b.slice(0,a)+(e?"?"+e:"")}}}if(b.startsWith("/")&&b.includes("?")&&a.localPatterns?.length===1&&"**"===a.localPatterns[0].pathname&&""===a.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${b}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let i=(0,d.findClosestQuality)(g,a);return`${a.path}?url=${encodeURIComponent(b)}&w=${c}&q=${i}${b.startsWith("/")&&h?`&dpl=${h}`:""}`}f.__next_img_default=!0;let g=f},67161,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"Image",{enumerable:!0,get:function(){return u}});let d=a.r(33354),e=a.r(46058),f=a.r(87924),g=e._(a.r(80826)),h=d._(a.r(35112)),i=d._(a.r(58018)),j=a.r(94915),k=a.r(345),l=a.r(4486);a.r(92434);let m=a.r(53773),n=d._(a.r(2305)),o=a.r(8591),p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function q(a,b,c,d,e,f,g){let h=a?.src;a&&a["data-loaded-src"]!==h&&(a["data-loaded-src"]=h,("decode"in a?a.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(a.parentElement&&a.isConnected){if("empty"!==b&&e(!0),c?.current){let b=new Event("load");Object.defineProperty(b,"target",{writable:!1,value:a});let d=!1,e=!1;c.current({...b,nativeEvent:b,currentTarget:a,target:a,isDefaultPrevented:()=>d,isPropagationStopped:()=>e,persist:()=>{},preventDefault:()=>{d=!0,b.preventDefault()},stopPropagation:()=>{e=!0,b.stopPropagation()}})}d?.current&&d.current(a)}}))}function r(a){return g.use?{fetchPriority:a}:{fetchpriority:a}}globalThis.__NEXT_IMAGE_IMPORTED=!0;let s=(0,g.forwardRef)(({src:a,srcSet:b,sizes:c,height:d,width:e,decoding:h,className:i,style:j,fetchPriority:k,placeholder:l,loading:m,unoptimized:n,fill:p,onLoadRef:s,onLoadingCompleteRef:t,setBlurComplete:u,setShowAltText:v,sizesInput:w,onLoad:x,onError:y,...z},A)=>{let B=(0,g.useCallback)(a=>{a&&(y&&(a.src=a.src),a.complete&&q(a,l,s,t,u,n,w))},[a,l,s,t,u,y,n,w]),C=(0,o.useMergedRef)(A,B);return(0,f.jsx)("img",{...z,...r(k),loading:m,width:e,height:d,decoding:h,"data-nimg":p?"fill":"1",className:i,style:j,sizes:c,srcSet:b,src:a,ref:C,onLoad:a=>{q(a.currentTarget,l,s,t,u,n,w)},onError:a=>{v(!0),"empty"!==l&&u(!0),y&&y(a)}})});function t({isAppRouter:a,imgAttributes:b}){let c={as:"image",imageSrcSet:b.srcSet,imageSizes:b.sizes,crossOrigin:b.crossOrigin,referrerPolicy:b.referrerPolicy,...r(b.fetchPriority)};return a&&h.default.preload?(h.default.preload(b.src,c),null):(0,f.jsx)(i.default,{children:(0,f.jsx)("link",{rel:"preload",href:b.srcSet?void 0:b.src,...c},"__nimg-"+b.src+b.srcSet+b.sizes)})}let u=(0,g.forwardRef)((a,b)=>{let c=(0,g.useContext)(m.RouterContext),d=(0,g.useContext)(l.ImageConfigContext),e=(0,g.useMemo)(()=>{let a=p||d||k.imageConfigDefault,b=[...a.deviceSizes,...a.imageSizes].sort((a,b)=>a-b),c=a.deviceSizes.sort((a,b)=>a-b),e=a.qualities?.sort((a,b)=>a-b);return{...a,allSizes:b,deviceSizes:c,qualities:e,localPatterns:d?.localPatterns}},[d]),{onLoad:h,onLoadingComplete:i}=a,o=(0,g.useRef)(h);(0,g.useEffect)(()=>{o.current=h},[h]);let q=(0,g.useRef)(i);(0,g.useEffect)(()=>{q.current=i},[i]);let[r,u]=(0,g.useState)(!1),[v,w]=(0,g.useState)(!1),{props:x,meta:y}=(0,j.getImgProps)(a,{defaultLoader:n.default,imgConf:e,blurComplete:r,showAltText:v});return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(s,{...x,unoptimized:y.unoptimized,placeholder:y.placeholder,fill:y.fill,onLoadRef:o,onLoadingCompleteRef:q,setBlurComplete:u,setShowAltText:w,sizesInput:a.sizes,ref:b}),y.preload?(0,f.jsx)(t,{isAppRouter:!c,imgAttributes:x}):null]})});("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},33095,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return k},getImageProps:function(){return j}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(33354),g=a.r(94915),h=a.r(67161),i=f._(a.r(2305));function j(a){let{props:b}=(0,g.getImgProps)(a,{defaultLoader:i.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[a,c]of Object.entries(b))void 0===c&&delete b[a];return{props:b}}let k=h.Image},71133,(a,b,c)=>{b.exports=a.r(33095)},60350,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(71133),e=a.i(80826);function f(){return(0,b.jsx)("div",{className:"ec-banner",children:(0,b.jsxs)("div",{className:"ec-banner-inner",children:[(0,b.jsx)("span",{className:"ec-banner-sun",children:"🌻"}),(0,b.jsx)("span",{className:"ec-banner-gold",children:"Family-owned since 1958"}),(0,b.jsx)("span",{className:"ec-banner-dot",children:"·"}),(0,b.jsx)("span",{className:"ec-banner-text",children:"Three generations of the Wedgworth family"}),(0,b.jsx)("span",{className:"ec-banner-dot",children:"·"}),(0,b.jsx)("span",{className:"ec-banner-text",children:"Sentricon® up to $1M coverage"}),(0,b.jsx)("a",{href:"tel:2056495278",className:"ec-banner-call",children:"Call (205) 649-5278 →"})]})})}function g(){let[a,f]=(0,e.useState)(!1);return(0,b.jsxs)("header",{className:"ec-header",children:[(0,b.jsxs)("div",{className:"ec-header-inner",children:[(0,b.jsx)(c.default,{href:"/",className:"ec-brand","aria-label":"EnviroCare home",children:(0,b.jsx)(d.default,{src:"/logo.png",alt:"EnviroCare Pest & Termite Services",width:280,height:72,className:"ec-brand-logo",priority:!0})}),(0,b.jsxs)("nav",{className:"ec-nav","aria-label":"Main navigation",children:[(0,b.jsx)(c.default,{href:"/services/pest-control",children:"Services"}),(0,b.jsx)(c.default,{href:"/lake-martin",children:(0,b.jsx)("em",{children:"Lake Martin"})}),(0,b.jsx)(c.default,{href:"/quote",children:"Pricing"}),(0,b.jsx)(c.default,{href:"/about-us",children:"About"}),(0,b.jsx)(c.default,{href:"/contact-us",children:"Contact"})]}),(0,b.jsxs)("div",{className:"ec-header-cta",children:[(0,b.jsx)("a",{href:"https://payenvirocare.key7app.com/User/Login",target:"_blank",rel:"noopener noreferrer",className:"ec-header-pay",children:"Pay Bill"}),(0,b.jsxs)("a",{href:"tel:2059406360",className:"ec-header-phone",children:[(0,b.jsx)("span",{className:"ec-phone-icon",children:"📞"}),(0,b.jsx)("span",{children:"(205) 940-6360"})]}),(0,b.jsx)(c.default,{href:"/quote",className:"ec-header-quote",children:"Get Free Quote"})]}),(0,b.jsx)("button",{className:"ec-mobile-toggle",onClick:()=>f(!a),"aria-label":"Toggle menu","aria-expanded":a,children:a?"×":"☰"})]}),a&&(0,b.jsxs)("div",{className:"ec-mobile-menu",children:[(0,b.jsx)(c.default,{href:"/services/pest-control",onClick:()=>f(!1),children:"Services"}),(0,b.jsx)(c.default,{href:"/lake-martin",onClick:()=>f(!1),children:"Lake Martin"}),(0,b.jsx)(c.default,{href:"/quote",onClick:()=>f(!1),children:"Pricing"}),(0,b.jsx)(c.default,{href:"/about-us",onClick:()=>f(!1),children:"About"}),(0,b.jsx)(c.default,{href:"/contact-us",onClick:()=>f(!1),children:"Contact"}),(0,b.jsx)("a",{href:"https://payenvirocare.key7app.com/User/Login",target:"_blank",rel:"noopener noreferrer",onClick:()=>f(!1),children:"Pay Bill"}),(0,b.jsx)("a",{href:"tel:2059406360",onClick:()=>f(!1),children:"📞 (205) 940-6360"}),(0,b.jsx)(c.default,{href:"/quote",className:"ec-mobile-cta",onClick:()=>f(!1),children:"Get Free Quote →"})]})]})}function h(){return(0,b.jsxs)("section",{className:"ec-hero",children:[(0,b.jsxs)("div",{className:"ec-hero-bg","aria-hidden":"true",children:[(0,b.jsx)("div",{className:"ec-orb ec-orb-1"}),(0,b.jsx)("div",{className:"ec-orb ec-orb-2"}),(0,b.jsx)("div",{className:"ec-orb ec-orb-3"})]}),(0,b.jsxs)("div",{className:"ec-hero-inner",children:[(0,b.jsxs)("div",{className:"ec-hero-content",children:[(0,b.jsxs)("div",{className:"ec-eyebrow",children:[(0,b.jsx)("span",{className:"ec-eyebrow-dot",children:"●"}),"FAMILY OWNED · ALABAMA SINCE 1958"]}),(0,b.jsxs)("h1",{className:"ec-hero-h1",children:["Protecting Alabama Homes",(0,b.jsx)("br",{}),(0,b.jsx)("em",{className:"ec-h1-italic",children:"Three Generations"}),(0,b.jsx)("br",{}),(0,b.jsx)("span",{className:"ec-h1-gold",children:"Strong."})]}),(0,b.jsx)("p",{className:"ec-hero-sub",children:"The Wedgworth family has kept Alabama homes pest-free for 68 years. Termites, mosquitoes, ticks — handled with the care only a family business delivers."}),(0,b.jsxs)("div",{className:"ec-hero-ctas",children:[(0,b.jsxs)(c.default,{href:"/quote",className:"ec-cta-primary",children:[(0,b.jsx)("span",{children:"Get a Free Quote"}),(0,b.jsx)("span",{className:"ec-arrow",children:"→"})]}),(0,b.jsxs)("a",{href:"tel:2059406360",className:"ec-cta-secondary",children:[(0,b.jsx)("span",{children:"📞"}),(0,b.jsx)("span",{children:"(205) 940-6360"})]})]}),(0,b.jsxs)("div",{className:"ec-hero-stats",children:[(0,b.jsxs)("div",{className:"ec-stat",children:[(0,b.jsx)("div",{className:"ec-stat-num",children:"68+"}),(0,b.jsx)("div",{className:"ec-stat-label",children:"YEARS IN AL"})]}),(0,b.jsxs)("div",{className:"ec-stat",children:[(0,b.jsx)("div",{className:"ec-stat-num",children:"4.9★"}),(0,b.jsx)("div",{className:"ec-stat-label",children:"GOOGLE RATING"})]}),(0,b.jsxs)("div",{className:"ec-stat",children:[(0,b.jsx)("div",{className:"ec-stat-num",children:"$1M"}),(0,b.jsx)("div",{className:"ec-stat-label",children:"SENTRICON® COVERAGE"})]}),(0,b.jsxs)("div",{className:"ec-stat",children:[(0,b.jsx)("div",{className:"ec-stat-num",children:"500+"}),(0,b.jsx)("div",{className:"ec-stat-label",children:"VERIFIED REVIEWS"})]})]}),(0,b.jsxs)("div",{className:"ec-hero-checks",children:[(0,b.jsx)("span",{children:"✓ Licensed & Insured"}),(0,b.jsx)("span",{children:"✓ Sentricon® Certified"}),(0,b.jsx)("span",{children:"✓ Same-Day Available"}),(0,b.jsx)("span",{children:"✓ Family Owned Since 1958"})]})]}),(0,b.jsxs)("div",{className:"ec-hero-visual",children:[(0,b.jsxs)("div",{className:"ec-floating-card ec-card-price",children:[(0,b.jsx)("div",{className:"ec-card-eyebrow",children:"FREE INSPECTION"}),(0,b.jsx)("div",{className:"ec-card-price-num",children:"$0"})]}),(0,b.jsxs)("div",{className:"ec-floating-card ec-card-same-day",children:[(0,b.jsx)("div",{className:"ec-card-icon-circle",children:"⚡"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"ec-card-title",children:"Same-Day Service"}),(0,b.jsx)("div",{className:"ec-card-sub",children:"Call before noon — there today"}),(0,b.jsx)("div",{className:"ec-card-tag",children:"AVAILABLE NOW"})]})]}),(0,b.jsxs)("div",{className:"ec-floating-card ec-card-google",children:[(0,b.jsx)("div",{className:"ec-card-stars",children:"★★★★★"}),(0,b.jsx)("div",{className:"ec-card-google-num",children:"4.9"}),(0,b.jsxs)("div",{className:"ec-card-google-text",children:[(0,b.jsx)("strong",{children:"Google Rating"}),(0,b.jsx)("span",{children:"500+ verified reviews"})]})]}),(0,b.jsx)("div",{className:"ec-hero-sunflower","aria-hidden":"true",children:"🌻"})]})]}),(0,b.jsx)("div",{className:"ec-pest-strip","aria-hidden":"true",children:(0,b.jsxs)("div",{className:"ec-pest-strip-inner",children:[(0,b.jsx)("span",{children:"Cockroaches"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Mosquitoes"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Argentine Ants"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Carpenter Ants"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Spiders"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Stink Bugs"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Fleas & Ticks"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Pillbugs"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Silverfish"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Crickets"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Fire Ants"}),(0,b.jsx)("span",{children:"·"}),(0,b.jsx)("span",{children:"Beetles"})]})})]})}function i(){return(0,b.jsx)("section",{className:"ec-trust",children:(0,b.jsxs)("div",{className:"ec-trust-inner",children:[(0,b.jsxs)("span",{className:"ec-trust-item",children:[(0,b.jsx)("span",{className:"ec-trust-icon",children:"★"}),(0,b.jsxs)("span",{children:[(0,b.jsx)("strong",{children:"4.9 Google"})," · 500+ Reviews"]})]}),(0,b.jsx)("span",{className:"ec-trust-divider"}),(0,b.jsxs)("span",{className:"ec-trust-item",children:[(0,b.jsx)("span",{className:"ec-trust-icon",children:"✓"}),"Sentricon® Certified Specialist"]}),(0,b.jsx)("span",{className:"ec-trust-divider"}),(0,b.jsxs)("span",{className:"ec-trust-item",children:[(0,b.jsx)("span",{className:"ec-trust-icon",children:"✓"}),"Alabama Dept. of Ag. Licensed"]}),(0,b.jsx)("span",{className:"ec-trust-divider"}),(0,b.jsxs)("span",{className:"ec-trust-item",children:[(0,b.jsx)("span",{className:"ec-trust-icon",children:"✓"}),"AL Pest Control Association"]}),(0,b.jsx)("span",{className:"ec-trust-divider"}),(0,b.jsxs)("span",{className:"ec-trust-item",children:[(0,b.jsx)("span",{className:"ec-trust-icon",children:"✓"}),"3rd-Generation Wedgworth Family"]})]})})}function j(){return(0,b.jsx)("section",{className:"ec-services",children:(0,b.jsxs)("div",{className:"ec-section-inner",children:[(0,b.jsx)("div",{className:"ec-section-eyebrow",children:"OUR CORE SERVICES"}),(0,b.jsxs)("h2",{className:"ec-section-h2",children:["Four Pillars of ",(0,b.jsx)("em",{children:"Total Protection"})]}),(0,b.jsx)("p",{className:"ec-section-sub",children:"Every Alabama home needs these four. We've perfected each over 68 years across Birmingham, Lake Martin and Huntsville."}),(0,b.jsxs)("div",{className:"ec-services-grid",children:[(0,b.jsx)(k,{badge:"MOST POPULAR",title:"Pest Control",description:"Year-round defense against ants, roaches, spiders & 30+ pests. Bi-monthly service keeps homes pest-free.",bullets:["Interior + exterior perimeter","Unlimited free re-treatments","$50 off initial service"],href:"/services/pest-control",cornerIcon:"🛡️",featured:!0}),(0,b.jsx)(k,{badge:"SENTRICON® CERTIFIED",title:"Termite Control",description:"Sentricon® Always Active™ system. Continuous protection backed by up to $1M damage warranty.",bullets:["Free full-home inspection","Annual inspection included","Crawlspace + dock + pier"],href:"/services/termite-control",cornerIcon:"🪵",highlight:"$1M COVERAGE"}),(0,b.jsx)(k,{badge:"LAKE MARTIN SPECIALTY",title:"Mosquito Control",description:"21-day yard barrier April–October. Reclaim your deck, dock and outdoor living spaces all season.",bullets:["Up to 12 seasonal applications","Pet- & kid-safe once dry","50% off first application"],href:"/services/mosquito-control",cornerIcon:"🦟",highlight:"21 DAYS"}),(0,b.jsx)(k,{badge:"PET & FAMILY SAFE",title:"Tick Control",description:"Targeted yard treatments to break the tick lifecycle. Critical for waterfront and wooded properties.",bullets:["Lone Star, Dog & Deer ticks","Harborage-zone targeting","Bundled free with mosquito"],href:"/services/tick-control",cornerIcon:"🐾"})]})]})})}function k({badge:a,title:d,description:e,bullets:f,href:g,cornerIcon:h,featured:i,highlight:j}){return(0,b.jsxs)(c.default,{href:g,className:`ec-service-card ${i?"ec-service-featured":""}`,children:[(0,b.jsxs)("div",{className:"ec-service-icon-wrap",children:[(0,b.jsx)("span",{className:"ec-service-icon",children:h}),j&&(0,b.jsx)("span",{className:"ec-service-highlight",children:j})]}),(0,b.jsx)("div",{className:"ec-service-badge",children:a}),(0,b.jsx)("h3",{className:"ec-service-title",children:d}),(0,b.jsx)("p",{className:"ec-service-desc",children:e}),(0,b.jsx)("ul",{className:"ec-service-bullets",children:f.map(a=>(0,b.jsxs)("li",{children:[(0,b.jsx)("span",{className:"ec-check",children:"✓"})," ",a]},a))}),(0,b.jsx)("span",{className:"ec-service-arrow",children:"Learn more →"})]})}function l(){return(0,b.jsx)("section",{className:"ec-specialty",children:(0,b.jsxs)("div",{className:"ec-section-inner",children:[(0,b.jsx)("div",{className:"ec-section-eyebrow",children:"SPECIALTY & ADD-ON SERVICES"}),(0,b.jsxs)("h2",{className:"ec-section-h2",children:["Built for ",(0,b.jsx)("em",{children:"Alabama Properties"})]}),(0,b.jsx)("p",{className:"ec-section-sub",children:"Add any of these to your core service — one invoice, one technician, no juggling vendors."}),(0,b.jsx)("div",{className:"ec-specialty-grid",children:[{icon:"🌻",title:"Fire Ant Control",desc:"Yard-wide elimination & mound treatment. Critical for lake homes and barefoot families.",tag:"ADD-ON",href:"/services/fire-ant"},{icon:"🪲",title:"Flea Control",desc:"Yard barrier treatments to break the flea lifecycle. Bundles seamlessly with mosquito & tick service.",tag:"PET-FRIENDLY",href:"/services/flea"},{icon:"🏠",title:"Builder Pre-Treat",desc:"Pre-construction termite treatment for new builds. The right time to start Sentricon® protection.",tag:"NEW CONSTRUCTION",href:"/services/builder-pre-treat"},{icon:"📋",title:"Real Estate / WDO Letters",desc:"Wood-destroying organism inspection letters for closings. Fast turnaround, lender-ready format.",tag:"CLOSINGS",href:"/services/wdo-letters"},{icon:"🏗️",title:"Crawlspace Service",desc:"Moisture control, vapor barriers & targeted treatments for the most vulnerable part of your home.",tag:"FOUNDATION CARE",href:"/services/crawlspace"},{icon:"🏢",title:"Commercial Service",desc:"Restaurants, offices, warehouses. Discrete scheduling & full compliance documentation.",tag:"IPM & HACCP",href:"/services/commercial"}].map(a=>(0,b.jsxs)(c.default,{href:a.href,className:"ec-specialty-card",children:[(0,b.jsx)("span",{className:"ec-specialty-icon",children:a.icon}),(0,b.jsx)("h3",{className:"ec-specialty-title",children:a.title}),(0,b.jsx)("p",{className:"ec-specialty-desc",children:a.desc}),(0,b.jsx)("span",{className:"ec-specialty-tag",children:a.tag})]},a.title))})]})})}function m(){return(0,b.jsx)("section",{className:"ec-offices",children:(0,b.jsxs)("div",{className:"ec-section-inner",children:[(0,b.jsx)("div",{className:"ec-section-eyebrow",children:"THREE ALABAMA OFFICES"}),(0,b.jsxs)("h2",{className:"ec-section-h2",children:["Local Technicians, ",(0,b.jsx)("em",{children:"Statewide Reach"})]}),(0,b.jsx)("p",{className:"ec-section-sub",children:"Three offices across Alabama — Birmingham, Lake Martin, and Huntsville. Your technician is always a neighbor, never dispatched out of state."}),(0,b.jsxs)("div",{className:"ec-offices-grid",children:[(0,b.jsx)(n,{art:(0,b.jsx)(p,{}),city:"Birmingham",label:"BIRMINGHAM OFFICE",address:"2025 Butler Rd, Alabaster, AL 35007",areas:"Birmingham · Hoover · Chelsea · Pelham · Alabaster · Vestavia Hills · Mountain Brook · Homewood · Helena · Calera",phone:"(205) 940-6360",phoneHref:"tel:2059406360",link:"/birmingham"}),(0,b.jsx)(n,{art:(0,b.jsx)(q,{}),city:"Alex City / Lake Martin",label:"ALEXANDER CITY — EST. 1958",address:"1785 Tallapoosa St, Alexander City, AL 35010",areas:"Lake Martin · Alexander City · Dadeville · Eclectic · Auburn · Opelika · Wetumpka",phone:"(256) 234-6162",phoneHref:"tel:2562346162",link:"/lake-martin",featured:!0}),(0,b.jsx)(n,{art:(0,b.jsx)(r,{}),city:"Huntsville",label:"HUNTSVILLE OFFICE",address:"7027 Old Madison Pike, Ste 108, Huntsville, AL 35806",areas:"Huntsville · Madison · Athens · Decatur · Hartselle · Hampton Cove · Harvest · North Alabama",phone:"(256) 937-7676",phoneHref:"tel:2569377676",link:"/huntsville"})]})]})})}function n({art:a,city:d,label:e,address:f,areas:g,phone:h,phoneHref:i,link:j,featured:k}){return(0,b.jsxs)("div",{className:`ec-office-card ${k?"ec-office-featured":""}`,children:[(0,b.jsx)("div",{className:"ec-office-art",children:a}),(0,b.jsx)("h3",{className:"ec-office-city",children:d}),(0,b.jsx)("div",{className:"ec-office-label",children:e}),(0,b.jsx)("div",{className:"ec-office-addr",children:f}),(0,b.jsx)("div",{className:"ec-office-areas",children:g}),(0,b.jsxs)("a",{href:i,className:"ec-office-phone",children:[(0,b.jsx)("span",{children:"📞"})," ",h]}),(0,b.jsxs)(c.default,{href:j,className:"ec-office-link",children:["View ",d," →"]})]})}function o(){return(0,b.jsx)("section",{className:"ec-areas",children:(0,b.jsxs)("div",{className:"ec-section-inner",children:[(0,b.jsx)("div",{className:"ec-section-eyebrow",children:"ALL SERVICE AREAS"}),(0,b.jsxs)("h2",{className:"ec-section-h2",children:["27 Cities Across ",(0,b.jsx)("em",{children:"Alabama"})]}),(0,b.jsx)("p",{className:"ec-section-sub",children:"Whether you're in downtown Birmingham, on the lake in Dadeville, or near Bridge Street in Huntsville — we have a local technician for you. Tap your city for local pricing and same-day scheduling."}),(0,b.jsxs)("div",{className:"ec-areas-grid",children:[(0,b.jsxs)("div",{className:"ec-areas-col",children:[(0,b.jsxs)("div",{className:"ec-areas-head",children:[(0,b.jsx)("span",{className:"ec-areas-icon",children:"🏙️"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"ec-areas-office",children:"BIRMINGHAM OFFICE"}),(0,b.jsx)("a",{href:"tel:2059406360",className:"ec-areas-phone",children:"(205) 940-6360"})]})]}),(0,b.jsx)("div",{className:"ec-areas-cities",children:[{name:"Birmingham",slug:"birmingham"},{name:"Hoover",slug:"hoover"},{name:"Vestavia Hills",slug:"vestavia-hills"},{name:"Mountain Brook",slug:"mountain-brook"},{name:"Homewood",slug:"homewood"},{name:"Alabaster",slug:"alabaster"},{name:"Chelsea",slug:"chelsea"},{name:"Pelham",slug:"pelham"},{name:"Helena",slug:"helena"},{name:"Calera",slug:"calera"},{name:"Trussville",slug:"trussville"},{name:"Greystone",slug:"greystone"},{name:"Mt Laurel",slug:"mt-laurel"},{name:"Tuscaloosa",slug:"tuscaloosa"}].map(a=>(0,b.jsxs)(c.default,{href:`/${a.slug}`,className:"ec-areas-city",children:[a.name," ",(0,b.jsx)("span",{className:"ec-areas-arrow",children:"→"})]},a.slug))})]}),(0,b.jsxs)("div",{className:"ec-areas-col ec-areas-featured",children:[(0,b.jsxs)("div",{className:"ec-areas-head",children:[(0,b.jsx)("span",{className:"ec-areas-icon",children:"🏞️"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"ec-areas-office",children:"ALEX CITY / LAKE MARTIN · EST. 1958"}),(0,b.jsx)("a",{href:"tel:2562346162",className:"ec-areas-phone",children:"(256) 234-6162"})]})]}),(0,b.jsx)("div",{className:"ec-areas-cities",children:[{name:"Alexander City",slug:"alexander-city"},{name:"Lake Martin",slug:"lake-martin"},{name:"Dadeville",slug:"dadeville"},{name:"Eclectic",slug:"eclectic"},{name:"Auburn",slug:"auburn"},{name:"Opelika",slug:"opelika"}].map(a=>(0,b.jsxs)(c.default,{href:`/${a.slug}`,className:"ec-areas-city",children:[a.name," ",(0,b.jsx)("span",{className:"ec-areas-arrow",children:"→"})]},a.slug))}),(0,b.jsxs)("div",{className:"ec-areas-auburn-note",children:[(0,b.jsx)("span",{className:"ec-areas-auburn-icon",children:"📞"}),"Auburn direct line: ",(0,b.jsx)("a",{href:"tel:3343323321",children:(0,b.jsx)("strong",{children:"(334) 332-3321"})})]})]}),(0,b.jsxs)("div",{className:"ec-areas-col",children:[(0,b.jsxs)("div",{className:"ec-areas-head",children:[(0,b.jsx)("span",{className:"ec-areas-icon",children:"🚀"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"ec-areas-office",children:"HUNTSVILLE OFFICE"}),(0,b.jsx)("a",{href:"tel:2569377676",className:"ec-areas-phone",children:"(256) 937-7676"})]})]}),(0,b.jsx)("div",{className:"ec-areas-cities",children:[{name:"Huntsville",slug:"huntsville"},{name:"Madison",slug:"madison"},{name:"Athens",slug:"athens"},{name:"Decatur",slug:"decatur"},{name:"Hartselle",slug:"hartselle"},{name:"Harvest",slug:"harvest"},{name:"Hampton Cove",slug:"hampton-cove"}].map(a=>(0,b.jsxs)(c.default,{href:`/${a.slug}`,className:"ec-areas-city",children:[a.name," ",(0,b.jsx)("span",{className:"ec-areas-arrow",children:"→"})]},a.slug))})]})]}),(0,b.jsxs)("div",{className:"ec-areas-cta",children:[(0,b.jsx)("p",{children:"Don't see your city? Type your zip to find your local office:"}),(0,b.jsx)(c.default,{href:"/find-office",className:"ec-cta-primary",children:"Find My Office →"})]})]})})}function p(){return(0,b.jsxs)("svg",{viewBox:"0 0 120 100",xmlns:"http://www.w3.org/2000/svg",className:"ec-svg-art",children:[(0,b.jsx)("rect",{width:"120",height:"100",fill:"url(#vulcanSky)"}),(0,b.jsx)("defs",{children:(0,b.jsxs)("linearGradient",{id:"vulcanSky",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,b.jsx)("stop",{offset:"0",stopColor:"#E8F5EE"}),(0,b.jsx)("stop",{offset:"1",stopColor:"#FEFDF8"})]})}),(0,b.jsx)("path",{d:"M 0 80 L 30 50 L 50 65 L 70 40 L 95 55 L 120 70 L 120 100 L 0 100 Z",fill:"#0A7935",opacity:"0.3"}),(0,b.jsx)("path",{d:"M 0 85 L 25 65 L 50 75 L 75 60 L 100 70 L 120 80 L 120 100 L 0 100 Z",fill:"#0E8E40",opacity:"0.5"}),(0,b.jsx)("rect",{x:"55",y:"55",width:"10",height:"30",fill:"#5A6660"}),(0,b.jsx)("rect",{x:"52",y:"82",width:"16",height:"6",fill:"#0E1A0F"}),(0,b.jsx)("circle",{cx:"60",cy:"48",r:"4",fill:"#5A6660"}),(0,b.jsx)("rect",{x:"56",y:"50",width:"8",height:"10",fill:"#5A6660"}),(0,b.jsx)("line",{x1:"60",y1:"52",x2:"60",y2:"38",stroke:"#5A6660",strokeWidth:"2",strokeLinecap:"round"}),(0,b.jsx)("circle",{cx:"60",cy:"34",r:"3",fill:"#F5A800"}),(0,b.jsx)("circle",{cx:"60",cy:"32",r:"2",fill:"#FFE082",opacity:"0.9"}),(0,b.jsx)("rect",{x:"10",y:"70",width:"6",height:"20",fill:"#0E1A0F",opacity:"0.7"}),(0,b.jsx)("rect",{x:"18",y:"74",width:"5",height:"16",fill:"#0E1A0F",opacity:"0.7"}),(0,b.jsx)("rect",{x:"25",y:"68",width:"4",height:"22",fill:"#0E1A0F",opacity:"0.7"}),(0,b.jsx)("rect",{x:"85",y:"70",width:"5",height:"20",fill:"#0E1A0F",opacity:"0.7"}),(0,b.jsx)("rect",{x:"92",y:"65",width:"4",height:"25",fill:"#0E1A0F",opacity:"0.7"}),(0,b.jsx)("rect",{x:"98",y:"72",width:"6",height:"18",fill:"#0E1A0F",opacity:"0.7"}),(0,b.jsx)("rect",{x:"106",y:"68",width:"4",height:"22",fill:"#0E1A0F",opacity:"0.7"})]})}function q(){return(0,b.jsxs)("div",{className:"ec-photo-art",children:[(0,b.jsx)("img",{src:"/lake-martin-aerial.jpg",alt:"Aerial view of Lake Martin, Alabama",className:"ec-photo-art-img"}),(0,b.jsx)("div",{className:"ec-photo-art-overlay"}),(0,b.jsx)("div",{className:"ec-photo-art-badge",children:"EST. 1958"})]})}function r(){return(0,b.jsxs)("svg",{viewBox:"0 0 120 100",xmlns:"http://www.w3.org/2000/svg",className:"ec-svg-art",children:[(0,b.jsx)("rect",{width:"120",height:"100",fill:"url(#rocketSky)"}),(0,b.jsxs)("defs",{children:[(0,b.jsxs)("linearGradient",{id:"rocketSky",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,b.jsx)("stop",{offset:"0",stopColor:"#1A2620"}),(0,b.jsx)("stop",{offset:"0.5",stopColor:"#0E8E40",stopOpacity:"0.3"}),(0,b.jsx)("stop",{offset:"1",stopColor:"#FFE082",stopOpacity:"0.6"})]}),(0,b.jsxs)("linearGradient",{id:"flames",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,b.jsx)("stop",{offset:"0",stopColor:"#F5A800"}),(0,b.jsx)("stop",{offset:"0.5",stopColor:"#FF6B00"}),(0,b.jsx)("stop",{offset:"1",stopColor:"#FFE082",stopOpacity:"0.3"})]})]}),(0,b.jsx)("circle",{cx:"20",cy:"15",r:"0.8",fill:"#fff"}),(0,b.jsx)("circle",{cx:"105",cy:"10",r:"0.8",fill:"#fff"}),(0,b.jsx)("circle",{cx:"35",cy:"8",r:"0.6",fill:"#fff"}),(0,b.jsx)("circle",{cx:"95",cy:"25",r:"0.6",fill:"#fff"}),(0,b.jsx)("circle",{cx:"15",cy:"30",r:"0.6",fill:"#fff"}),(0,b.jsx)("rect",{x:"0",y:"92",width:"120",height:"8",fill:"#0E1A0F"}),(0,b.jsx)("rect",{x:"56",y:"30",width:"8",height:"55",fill:"#FEFDF8"}),(0,b.jsx)("rect",{x:"56",y:"30",width:"8",height:"3",fill:"#DC2626"}),(0,b.jsx)("rect",{x:"56",y:"45",width:"8",height:"2",fill:"#0E1A0F"}),(0,b.jsx)("rect",{x:"56",y:"60",width:"8",height:"2",fill:"#0E1A0F"}),(0,b.jsx)("path",{d:"M 56 30 L 60 18 L 64 30 Z",fill:"#FEFDF8"}),(0,b.jsx)("path",{d:"M 60 18 L 60 12",stroke:"#DC2626",strokeWidth:"1"}),(0,b.jsx)("path",{d:"M 56 75 L 50 88 L 56 85 Z",fill:"#DC2626"}),(0,b.jsx)("path",{d:"M 64 75 L 70 88 L 64 85 Z",fill:"#DC2626"}),(0,b.jsx)("rect",{x:"57",y:"50",width:"3",height:"2",fill:"#fff"}),(0,b.jsx)("rect",{x:"57",y:"50",width:"1",height:"1",fill:"#1E3A8A"}),(0,b.jsx)("text",{x:"58",y:"58",fontSize:"3",fill:"#0E1A0F",fontFamily:"Arial",children:"USA"}),(0,b.jsx)("path",{d:"M 56 85 L 53 100 L 60 95 L 67 100 L 64 85 Z",fill:"url(#flames)",opacity:"0.9"}),(0,b.jsx)("ellipse",{cx:"60",cy:"93",rx:"3",ry:"6",fill:"#fff",opacity:"0.6"})]})}function s(){return(0,b.jsx)("section",{className:"ec-heritage",children:(0,b.jsxs)("div",{className:"ec-section-inner",children:[(0,b.jsx)("div",{className:"ec-section-eyebrow",children:"OUR STORY"}),(0,b.jsxs)("h2",{className:"ec-section-h2",children:["Three Generations. ",(0,b.jsx)("em",{children:"One Family."})," One Promise."]}),(0,b.jsxs)("div",{className:"ec-heritage-grid",children:[(0,b.jsxs)("div",{className:"ec-heritage-text",children:[(0,b.jsxs)("p",{children:["In ",(0,b.jsx)("strong",{children:"1958, Phillip M. Wedgworth"})," started EnviroCare with one truck and one belief — that families deserved an Alabama pest control company that actually answers the phone and stands behind the work."]}),(0,b.jsxs)("p",{children:["Sixty-eight years later, his grandsons"," ",(0,b.jsx)("strong",{children:"Phillip, Kevin, and Lex Wedgworth"})," run the company. Three Alabama offices. Same family. Same answer to your pest problem."]}),(0,b.jsx)("blockquote",{className:"ec-heritage-quote",children:"“No One Cares Like EnviroCare.”"}),(0,b.jsxs)("div",{className:"ec-heritage-stats",children:[(0,b.jsxs)("div",{className:"ec-h-stat",children:[(0,b.jsx)("div",{className:"ec-h-stat-num",children:"1958"}),(0,b.jsx)("div",{className:"ec-h-stat-label",children:"FOUNDED"})]}),(0,b.jsxs)("div",{className:"ec-h-stat",children:[(0,b.jsx)("div",{className:"ec-h-stat-num",children:"3"}),(0,b.jsx)("div",{className:"ec-h-stat-label",children:"GENERATIONS"})]}),(0,b.jsxs)("div",{className:"ec-h-stat",children:[(0,b.jsx)("div",{className:"ec-h-stat-num",children:"100%"}),(0,b.jsx)("div",{className:"ec-h-stat-label",children:"FAMILY OWNED"})]})]})]}),(0,b.jsxs)("div",{className:"ec-heritage-photos",children:[(0,b.jsxs)("div",{className:"ec-photo-frame ec-photo-kevin",children:[(0,b.jsx)("img",{src:"/kevin-headshot.jpg",alt:"Kevin Wedgworth, third-generation owner",className:"ec-photo-img",onError:a=>{let b=a.target;b.style.display="none",b.parentElement?.classList.add("ec-photo-fallback")}}),(0,b.jsxs)("div",{className:"ec-photo-caption",children:[(0,b.jsx)("strong",{children:"Kevin Wedgworth"}),(0,b.jsx)("span",{children:"3rd-Generation Owner"})]})]}),(0,b.jsxs)("div",{className:"ec-photo-frame ec-photo-ribbon-1",children:[(0,b.jsx)("img",{src:"/ribbon-cutting-1.jpg",alt:"Birmingham office ribbon cutting",className:"ec-photo-img",onError:a=>{let b=a.target;b.style.display="none",b.parentElement?.classList.add("ec-photo-fallback")}}),(0,b.jsx)("div",{className:"ec-photo-caption ec-caption-small",children:(0,b.jsx)("strong",{children:"Birmingham Office Opening"})})]}),(0,b.jsxs)("div",{className:"ec-photo-frame ec-photo-ribbon-2",children:[(0,b.jsx)("img",{src:"/ribbon-cutting-2.jpg",alt:"Huntsville office ribbon cutting",className:"ec-photo-img",onError:a=>{let b=a.target;b.style.display="none",b.parentElement?.classList.add("ec-photo-fallback")}}),(0,b.jsx)("div",{className:"ec-photo-caption ec-caption-small",children:(0,b.jsx)("strong",{children:"Huntsville Office Opening"})})]})]})]})]})})}function t(){return(0,b.jsx)("section",{className:"ec-reviews",children:(0,b.jsxs)("div",{className:"ec-section-inner",children:[(0,b.jsxs)("div",{className:"ec-reviews-badge",children:[(0,b.jsx)("span",{className:"ec-reviews-g",children:"Verified by Google"}),(0,b.jsxs)("span",{className:"ec-reviews-rating",children:[(0,b.jsx)("span",{className:"ec-reviews-num",children:"4.9"}),(0,b.jsx)("span",{className:"ec-reviews-stars",children:"★★★★★"}),(0,b.jsx)("span",{className:"ec-reviews-count",children:"· 500+ reviews"})]})]}),(0,b.jsx)("div",{className:"ec-section-eyebrow",children:"CUSTOMER REVIEWS"}),(0,b.jsxs)("h2",{className:"ec-section-h2",children:["What Alabama Families ",(0,b.jsx)("em",{children:"Are Saying"})]}),(0,b.jsx)("p",{className:"ec-section-sub",children:"Real Google reviews from real Alabama homes. Not hand-picked — this is what customers say every week."}),(0,b.jsx)("div",{className:"ec-reviews-grid",children:[{name:"Jessica M.",city:"Huntsville, AL",text:"My husband and I love the service and technicians. Could not recommend more!"},{name:"Ann S.",city:"Hoover, AL",text:"Very professional, schedules with us, and is always on time."},{name:"Dariel S.",city:"Madison, AL",text:"No other pest control company can top the service from EnviroCare!!!"},{name:"Janet H.",city:"Birmingham, AL",text:"The technician was friendly and careful of our things. Five stars without hesitation."}].map(a=>(0,b.jsxs)("div",{className:"ec-review-card",children:[(0,b.jsx)("span",{className:"ec-review-quote",children:"“"}),(0,b.jsx)("div",{className:"ec-review-stars",children:"★★★★★"}),(0,b.jsx)("p",{className:"ec-review-text",children:a.text}),(0,b.jsxs)("div",{className:"ec-review-author",children:[(0,b.jsx)("div",{className:"ec-review-avatar",children:a.name.charAt(0)}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"ec-review-name",children:a.name}),(0,b.jsx)("div",{className:"ec-review-city",children:a.city})]})]})]},a.name))}),(0,b.jsx)(c.default,{href:"/reviews",className:"ec-reviews-link",children:"See all 500+ reviews →"})]})})}function u(){return(0,b.jsx)("section",{className:"ec-pricing",children:(0,b.jsxs)("div",{className:"ec-section-inner",children:[(0,b.jsx)("div",{className:"ec-section-eyebrow",children:"PLANS & PRICING"}),(0,b.jsxs)("h2",{className:"ec-section-h2",children:["Pick Your ",(0,b.jsx)("em",{children:"Protection Plan"})]}),(0,b.jsx)("p",{className:"ec-section-sub",children:"Honest, straightforward pricing. No contracts, no hidden fees — pay monthly on ACH, cancel anytime."}),(0,b.jsxs)("div",{className:"ec-pricing-grid",children:[(0,b.jsx)(v,{title:"Essential",tags:["Pest"],tagline:"Year-round pest control for the everyday Alabama home.",price:"35",unit:"/mo",terms:"ACH · or $70 bi-monthly",bullets:["Bi-monthly exterior treatment","30+ common pests covered","Unlimited free re-services","Same-week scheduling","Family- & pet-safe applications"],cta:"Start Essential",href:"/quote?plan=essential"}),(0,b.jsx)(v,{title:"Foundation",tags:["Pest","Termite"],tagline:"Pest control + Sentricon® termite protection. The right baseline for any Alabama home.",price:"67",unit:"/mo",terms:"ACH · one invoice, one tech",bullets:["Everything in Essential, plus:","Sentricon® Always Active™ system","Annual termite inspection","$1M damage repair coverage","WDO inspection letter (1/yr)","No drilling, no tank trucks"],cta:"Start Foundation",href:"/quote?plan=foundation",badge:"MOST POPULAR",featured:!0}),(0,b.jsx)(v,{title:"Complete",tags:["Pest","Termite","Mosquito","Tick"],tagline:"All four programs — pest, termite, mosquito & tick — under one plan.",price:"127",unit:"/mo",terms:"ACH · everything in one invoice",bullets:["Everything in Foundation, plus:","Mosquito barrier (Apr–Oct, every 21 days)","Tick yard treatments included","Flea yard treatment included","Dedicated account technician","Priority same-week response"],cta:"Start Complete",href:"/quote?plan=complete"})]}),(0,b.jsxs)("div",{className:"ec-offers",children:[(0,b.jsxs)("div",{className:"ec-offer",children:[(0,b.jsx)("div",{className:"ec-offer-icon",children:"🏷️"}),(0,b.jsx)("div",{className:"ec-offer-title",children:"$50 Off Initial Service"}),(0,b.jsx)("div",{className:"ec-offer-desc",children:"New full-service program customers. Mention when calling."})]}),(0,b.jsxs)("div",{className:"ec-offer",children:[(0,b.jsx)("div",{className:"ec-offer-icon",children:"✦"}),(0,b.jsx)("div",{className:"ec-offer-title",children:"50% Off First Mosquito App"}),(0,b.jsx)("div",{className:"ec-offer-desc",children:"New mosquito program customers. Mention when calling."})]}),(0,b.jsxs)("div",{className:"ec-offer",children:[(0,b.jsx)("div",{className:"ec-offer-icon",children:"🔍"}),(0,b.jsx)("div",{className:"ec-offer-title",children:"Free Termite Inspection"}),(0,b.jsx)("div",{className:"ec-offer-desc",children:"No obligation. Schedule today at any AL office."})]})]})]})})}function v({title:a,tags:d,tagline:e,price:f,unit:g,terms:h,bullets:i,cta:j,href:k,badge:l,featured:m}){return(0,b.jsxs)("div",{className:`ec-price-card ${m?"ec-price-featured":""}`,children:[l&&(0,b.jsx)("div",{className:"ec-price-badge",children:l}),(0,b.jsx)("h3",{className:"ec-price-title",children:a}),(0,b.jsx)("div",{className:"ec-price-tags",children:d.map(a=>(0,b.jsx)("span",{className:"ec-price-tag",children:a},a))}),(0,b.jsx)("p",{className:"ec-price-tagline",children:e}),(0,b.jsxs)("div",{className:"ec-price-row",children:[(0,b.jsx)("span",{className:"ec-price-dollar",children:"$"}),(0,b.jsx)("span",{className:"ec-price-num",children:f}),(0,b.jsx)("span",{className:"ec-price-unit",children:g})]}),(0,b.jsx)("div",{className:"ec-price-terms",children:h}),(0,b.jsx)("ul",{className:"ec-price-bullets",children:i.map(a=>(0,b.jsxs)("li",{children:[(0,b.jsx)("span",{className:"ec-check",children:"✓"})," ",a]},a))}),(0,b.jsx)(c.default,{href:k,className:`ec-price-cta ${m?"ec-price-cta-featured":""}`,children:j})]})}function w(){return(0,b.jsxs)("section",{className:"ec-bundle",children:[(0,b.jsxs)("div",{className:"ec-bundle-truck-wrap",children:[(0,b.jsx)("img",{src:"/truck.jpg",alt:"EnviroCare green service truck with sunflower wrap",className:"ec-bundle-truck",onError:a=>{a.target.style.display="none"}}),(0,b.jsx)("div",{className:"ec-bundle-truck-overlay"})]}),(0,b.jsxs)("div",{className:"ec-section-inner ec-bundle-inner",children:[(0,b.jsx)("div",{className:"ec-bundle-truck-eyebrow",children:"You'll Recognize Us"}),(0,b.jsxs)("h2",{className:"ec-bundle-h2",children:["The green truck ",(0,b.jsx)("em",{children:"with the sunflower."})]}),(0,b.jsx)("p",{className:"ec-bundle-truck-text",children:"When you see it in your neighborhood, you know EnviroCare is protecting a home nearby. A familiar face across Alabama for over 68 years."}),(0,b.jsx)("div",{className:"ec-bundle-divider"}),(0,b.jsxs)("h3",{className:"ec-bundle-h3",children:["🌻 One Invoice. One Tech. ",(0,b.jsx)("em",{children:"One Trusted Team."})]}),(0,b.jsx)("p",{className:"ec-bundle-sub",children:"Combine Pest + Termite + Mosquito + Tick on a single plan. Same competitive pricing as standalone — just simpler to manage."}),(0,b.jsxs)("div",{className:"ec-bundle-prices",children:[(0,b.jsxs)("div",{className:"ec-bundle-line",children:["Pest + Termite ",(0,b.jsx)("span",{className:"ec-bundle-price",children:"$67/mo"})]}),(0,b.jsxs)("div",{className:"ec-bundle-line",children:["Outdoor Bundle (Mosquito + Tick + Flea) ",(0,b.jsx)("span",{className:"ec-bundle-price",children:"$60/mo"})]}),(0,b.jsxs)("div",{className:"ec-bundle-line",children:["All Four Programs ",(0,b.jsx)("span",{className:"ec-bundle-price",children:"$127/mo"})]})]}),(0,b.jsxs)("div",{className:"ec-bundle-ctas",children:[(0,b.jsx)("a",{href:"tel:2056495278",className:"ec-cta-primary",children:"Call (205) 649-5278"}),(0,b.jsx)(c.default,{href:"/quote",className:"ec-cta-secondary-light",children:"See Plans →"})]})]})]})}function x(){return(0,b.jsxs)("footer",{className:"ec-footer",children:[(0,b.jsxs)("div",{className:"ec-footer-inner",children:[(0,b.jsxs)("div",{className:"ec-footer-brand-col",children:[(0,b.jsx)(c.default,{href:"/",className:"ec-footer-brand",children:(0,b.jsx)(d.default,{src:"/logo.png",alt:"EnviroCare",width:180,height:48,className:"ec-footer-logo"})}),(0,b.jsx)("p",{className:"ec-footer-tag",children:"Family-owned and operated since 1958 — now in its third generation of the Wedgworth family. Serving Alabama from three offices: Birmingham, Lake Martin, and Huntsville."}),(0,b.jsxs)("div",{className:"ec-footer-phones",children:[(0,b.jsxs)("a",{href:"tel:2056495278",className:"ec-footer-phone",children:["📞 ",(0,b.jsx)("span",{children:"(205) 649-5278"})," — ",(0,b.jsx)("em",{children:"Main Line"})]}),(0,b.jsxs)("a",{href:"tel:2059406360",className:"ec-footer-phone",children:["📞 ",(0,b.jsx)("span",{children:"(205) 940-6360"})," — ",(0,b.jsx)("em",{children:"Birmingham"})]}),(0,b.jsxs)("a",{href:"tel:2562346162",className:"ec-footer-phone",children:["📞 ",(0,b.jsx)("span",{children:"(256) 234-6162"})," — ",(0,b.jsx)("em",{children:"Lake Martin / Alex City"})]}),(0,b.jsxs)("a",{href:"tel:2569377676",className:"ec-footer-phone",children:["📞 ",(0,b.jsx)("span",{children:"(256) 937-7676"})," — ",(0,b.jsx)("em",{children:"Huntsville"})]})]})]}),(0,b.jsxs)("div",{className:"ec-footer-col",children:[(0,b.jsx)("h4",{className:"ec-footer-h4",children:"CORE SERVICES"}),(0,b.jsx)(c.default,{href:"/services/pest-control",children:"Pest Control"}),(0,b.jsx)(c.default,{href:"/services/termite-control",children:"Termite Control"}),(0,b.jsx)(c.default,{href:"/services/mosquito-control",children:"Mosquito Control"}),(0,b.jsx)(c.default,{href:"/services/tick-control",children:"Tick Control"}),(0,b.jsx)(c.default,{href:"/bundle-services",children:"Bundle & Save"})]}),(0,b.jsxs)("div",{className:"ec-footer-col",children:[(0,b.jsx)("h4",{className:"ec-footer-h4",children:"SPECIALTY"}),(0,b.jsx)(c.default,{href:"/services/fire-ant",children:"Fire Ant Control"}),(0,b.jsx)(c.default,{href:"/services/flea",children:"Flea Control"}),(0,b.jsx)(c.default,{href:"/services/builder-pre-treat",children:"Builder Pre-Treat"}),(0,b.jsx)(c.default,{href:"/services/wdo-letters",children:"Real Estate / WDO Letters"}),(0,b.jsx)(c.default,{href:"/services/crawlspace",children:"Crawlspace Service"}),(0,b.jsx)(c.default,{href:"/services/commercial",children:"Commercial Service"})]}),(0,b.jsxs)("div",{className:"ec-footer-col ec-footer-col-areas",children:[(0,b.jsx)("h4",{className:"ec-footer-h4",children:"SERVICE AREAS"}),(0,b.jsxs)("div",{className:"ec-footer-areas-group",children:[(0,b.jsx)("div",{className:"ec-footer-areas-label",children:"Birmingham Metro"}),(0,b.jsx)(c.default,{href:"/birmingham",children:"Birmingham"}),(0,b.jsx)(c.default,{href:"/hoover",children:"Hoover"}),(0,b.jsx)(c.default,{href:"/vestavia-hills",children:"Vestavia Hills"}),(0,b.jsx)(c.default,{href:"/mountain-brook",children:"Mountain Brook"}),(0,b.jsx)(c.default,{href:"/homewood",children:"Homewood"}),(0,b.jsx)(c.default,{href:"/alabaster",children:"Alabaster"}),(0,b.jsx)(c.default,{href:"/chelsea",children:"Chelsea"}),(0,b.jsx)(c.default,{href:"/pelham",children:"Pelham"}),(0,b.jsx)(c.default,{href:"/helena",children:"Helena"}),(0,b.jsx)(c.default,{href:"/calera",children:"Calera"}),(0,b.jsx)(c.default,{href:"/trussville",children:"Trussville"}),(0,b.jsx)(c.default,{href:"/greystone",children:"Greystone"}),(0,b.jsx)(c.default,{href:"/mt-laurel",children:"Mt Laurel"}),(0,b.jsx)(c.default,{href:"/tuscaloosa",children:"Tuscaloosa"})]}),(0,b.jsxs)("div",{className:"ec-footer-areas-group",children:[(0,b.jsx)("div",{className:"ec-footer-areas-label",children:"Lake Martin / Alex City"}),(0,b.jsx)(c.default,{href:"/alexander-city",children:"Alexander City"}),(0,b.jsx)(c.default,{href:"/lake-martin",children:"Lake Martin"}),(0,b.jsx)(c.default,{href:"/dadeville",children:"Dadeville"}),(0,b.jsx)(c.default,{href:"/eclectic",children:"Eclectic"}),(0,b.jsx)(c.default,{href:"/auburn",children:"Auburn"}),(0,b.jsx)(c.default,{href:"/opelika",children:"Opelika"})]}),(0,b.jsxs)("div",{className:"ec-footer-areas-group",children:[(0,b.jsx)("div",{className:"ec-footer-areas-label",children:"North Alabama"}),(0,b.jsx)(c.default,{href:"/huntsville",children:"Huntsville"}),(0,b.jsx)(c.default,{href:"/madison",children:"Madison"}),(0,b.jsx)(c.default,{href:"/athens",children:"Athens"}),(0,b.jsx)(c.default,{href:"/decatur",children:"Decatur"}),(0,b.jsx)(c.default,{href:"/hartselle",children:"Hartselle"}),(0,b.jsx)(c.default,{href:"/harvest",children:"Harvest"}),(0,b.jsx)(c.default,{href:"/hampton-cove",children:"Hampton Cove"})]}),(0,b.jsx)(c.default,{href:"/find-office",className:"ec-footer-find",children:"Find My Office →"})]})]}),(0,b.jsxs)("div",{className:"ec-footer-bottom",children:[(0,b.jsx)("span",{children:"© 2026 EnviroCare Pest & Termite Services LLC. All rights reserved."}),(0,b.jsx)("span",{children:"Licensed in Alabama · Sentricon® Certified Specialist"}),(0,b.jsxs)("div",{className:"ec-footer-bottom-links",children:[(0,b.jsx)(c.default,{href:"/privacy",children:"Privacy Policy"}),(0,b.jsx)(c.default,{href:"/terms",children:"Terms of Service"}),(0,b.jsx)(c.default,{href:"/sitemap.xml",children:"Sitemap"})]})]})]})}let y=`
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
`;a.s([],80617),a.i(80617),a.s(["default",0,function(){return(0,b.jsxs)("main",{className:"ec-main",children:[(0,b.jsx)("style",{dangerouslySetInnerHTML:{__html:y}}),(0,b.jsx)(f,{}),(0,b.jsx)(g,{}),(0,b.jsx)(h,{}),(0,b.jsx)(i,{}),(0,b.jsx)(j,{}),(0,b.jsx)(l,{}),(0,b.jsx)(m,{}),(0,b.jsx)(o,{}),(0,b.jsx)(s,{}),(0,b.jsx)(t,{}),(0,b.jsx)(u,{}),(0,b.jsx)(w,{}),(0,b.jsx)(x,{})]})}],60350)}];

//# sourceMappingURL=_0zg395a._.js.map