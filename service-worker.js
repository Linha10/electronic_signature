if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const t=e=>n(e,r),u={module:{uri:r},exports:o,require:t};s[r]=Promise.all(i.map((e=>u[e]||t(e)))).then((e=>(l(...e),o)))}}define(["./workbox-afb8f5db"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"css/app.1cceb856.css",revision:null},{url:"css/chunk-vendors.77489a8d.css",revision:null},{url:"fonts/element-icons.f1a45d74.ttf",revision:null},{url:"fonts/element-icons.ff18efd1.woff",revision:null},{url:"img/apply_success.db002821.svg",revision:null},{url:"img/nueip_autumn_festival.f865b210.png",revision:null},{url:"index.html",revision:"d215d4674a7482f27a555eaec515f60d"},{url:"js/app.a0e6dcde.js",revision:null},{url:"js/chunk-vendors.8f9d21c2.js",revision:null},{url:"manifest.json",revision:"2aa98d96921140d8ec84c5b1304c76f5"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
