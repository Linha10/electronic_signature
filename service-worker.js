if(!self.define){let e,n={};const i=(i,s)=>(i=new URL(i+".js",s).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(n[t])return;let c={};const l=e=>i(e,t),o={module:{uri:t},exports:c,require:l};n[t]=Promise.all(s.map((e=>o[e]||l(e)))).then((e=>(r(...e),c)))}}define(["./workbox-5b385ed2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"electronic_signature"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/electronic_signature/css/app.1cceb856.css",revision:null},{url:"/electronic_signature/css/chunk-vendors.c7cea27a.css",revision:null},{url:"/electronic_signature/fonts/element-icons.f1a45d74.ttf",revision:null},{url:"/electronic_signature/fonts/element-icons.ff18efd1.woff",revision:null},{url:"/electronic_signature/img/apply_success.db002821.svg",revision:null},{url:"/electronic_signature/img/nueip_autumn_festival.f865b210.png",revision:null},{url:"/electronic_signature/index.html",revision:"8340aee4b79e4835924b65c2307e2d68"},{url:"/electronic_signature/js/app.0db4ecd5.js",revision:null},{url:"/electronic_signature/js/chunk-vendors.59c45cc9.js",revision:null},{url:"/electronic_signature/manifest.json",revision:"ba5801b77902d890b65e67f4e7073a32"},{url:"/electronic_signature/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
