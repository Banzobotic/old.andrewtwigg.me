import{w as c}from"./index.6e332c4a.mjs";const k="",h=__sveltekit_nnxotb.assets,b="1679339777863",m="sveltekit:snapshot",w="sveltekit:scroll",A="sveltekit:index",f={tap:1,hover:2,viewport:3,eager:4,off:-1};function R(t){let e=t.baseURI;if(!e){const n=t.getElementsByTagName("base");e=n.length?n[0].href:t.URL}return e}function I(){return{x:pageXOffset,y:pageYOffset}}function l(t,e){return t.getAttribute(`data-sveltekit-${e}`)}const d={...f,"":f.hover};function _(t){let e=t.assignedSlot??t.parentNode;return(e==null?void 0:e.nodeType)===11&&(e=e.host),e}function S(t,e){for(;t&&t!==e;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=_(t)}}function x(t,e){let n;try{n=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI)}catch{}const a=t instanceof SVGAElement?t.target.baseVal:t.target,o=!n||!!a||v(n,e)||(t.getAttribute("rel")||"").split(/\s+/).includes("external")||t.hasAttribute("download");return{url:n,external:o,target:a}}function y(t){let e=null,n=null,a=null,o=null,s=t;for(;s&&s!==document.documentElement;)n===null&&(n=l(s,"preload-code")),a===null&&(a=l(s,"preload-data")),e===null&&(e=l(s,"noscroll")),o===null&&(o=l(s,"reload")),s=_(s);return{preload_code:d[n??"off"],preload_data:d[a??"off"],noscroll:e==="off"?!1:e===""?!0:null,reload:o==="off"?!1:o===""?!0:null}}function p(t){const e=c(t);let n=!0;function a(){n=!0,e.update(r=>r)}function o(r){n=!1,e.set(r)}function s(r){let i;return e.subscribe(u=>{(i===void 0||n&&u!==i)&&r(i=u)})}return{notify:a,set:o,subscribe:s}}function g(){const{set:t,subscribe:e}=c(!1);let n;async function a(){clearTimeout(n);const o=await fetch(`${h}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(o.ok){const r=(await o.json()).version!==b;return r&&(t(!0),clearTimeout(n)),r}else throw new Error(`Version check failed: ${o.status}`)}return{subscribe:e,check:a}}function v(t,e){return t.origin!==location.origin||!t.pathname.startsWith(e)}function T(t){t.client}const O={url:p({}),page:p({}),navigating:c(null),updated:g()};export{A as I,f as P,w as S,m as a,x as b,y as c,I as d,k as e,S as f,R as g,T as h,v as i,O as s};
