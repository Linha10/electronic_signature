(function(){"use strict";var t={357:function(t,e,i){var s=i(7195),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},o=[],r=i(1001),a={},c=(0,r.Z)(a,n,o,!1,null,null,null),l=c.exports,u=i(4337);(0,u.z)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}});var d,h,g=i(2241),v=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"},[e("SignatureDialog"),e("router-view")],1)},m=[],p=function(){var t=this,e=t._self._c;return e("div",{staticClass:"signature"},[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleOuterDialogVisible}},[t._v(" 設定簽名 ")]),e("el-dialog",{attrs:{title:"簽名設定",visible:t.outerDialogVisible,width:"300px",center:""},on:{"update:visible":function(e){t.outerDialogVisible=e}}},[e("div",{staticClass:"signature__content"},[e("el-button",{directives:[{name:"show",rawName:"v-show",value:t.isSignatureImgEmpty,expression:"isSignatureImgEmpty"}],staticClass:"signature__content__signBtn",on:{click:t.openCanvasDialog}},[t._v(" 簽名 ")]),e("div",t._l(t.signatureImgList,(function(i){return e("el-tag",{directives:[{name:"show",rawName:"v-show",value:!t.isSignatureImgEmpty,expression:"!isSignatureImgEmpty"}],key:i.src,staticClass:"signature__content__tag",attrs:{closable:"",size:"medium"},on:{close:function(e){return t.removeTag(i.src)}}},[e("el-image",{staticClass:"signature__content__tag__image",attrs:{src:i.src}})],1)})),1),e("el-dialog",{staticClass:"signDialog",attrs:{visible:t.dialogVisible,width:t.canvasSetting.width,center:"",appendToBody:"","close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible=e}},scopedSlots:t._u([{key:"title",fn:function(){return[e("div",{staticClass:"signDialog__header"},[e("div",{staticClass:"signDialog__header__label"},[t._v("編輯我的簽名")]),e("div",[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleQRcode("socket.io")}}},[t._v("socket行動裝置簽名")]),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleQRcode("sse")}}},[t._v("SSE行動裝置簽名")]),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleWindowQRcode("socket.io")}}},[t._v("socket行動裝置簽名-新視窗")])],1)])]},proxy:!0}])},[[e("EleSignature",{ref:"signatureCanvas"})],e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.signatureConfirm}},[t._v(" 確 定 ")])],1)],2)],1),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:t.handleOuterDialogVisible}},[t._v("確定")])],1)]),e("QrcodeDialog",{ref:"qrcodeDialog",on:{update:t.getSignatureByMobile}})],1)},f=[],A=i(9771),b=i.n(A),w=i(3380),y=i.n(w),C=i(1579),S={props:{showPortrait:{type:Boolean,default:!1},colors:{type:Array,default:()=>[{name:"Black",code:"#000000"},{name:"skyblue",code:"#1890ff"},{name:"Red",code:"#FF2D2D"}]},options:{type:Object,default:()=>({scale:1,minWidth:4,maxWidth:6,color:"#000000"})}},data(){return{signature:null,width:0,isMobile:!1,isFull:!0}},created(){this.isMobile=y()({featureDetect:!0,tablet:!0})},mounted(){this.init()},computed:{currentColor:{get(){return this.signature?.color},set(t){this.handleColor(t)}},setCanvasOuterSize(){return this.isMobile&&this.isFull?{height:window.innerHeight-50+4+"px"}:{width:`${this.width+4}px`}}},methods:{setCanvasRange(){return this.isMobile&&this.isFull?(this.width=window.innerWidth-100,{width:this.width,height:window.innerHeight-50}):(this.width=this.isMobile?Math.min(window.innerWidth,300):700,{width:this.width,height:210})},init(){const t=this.$refs.canvas||document.querySelector("canvas"),e=this.setCanvasRange(),i={...e,...this.options};this.signature=new(b())(t,i)},handleReset(t){const e=this.signature.clear;(0,C.isFunction)(t)?t(e):e()},handleUndo(t){const e=this.signature.undo;(0,C.isFunction)(t)?t(e):e()},handleColor(t){this.signature.color=t},getSignature(t=null){if((0,C.isFunction)(t))return void t(this.signature);const e=this.signature.isEmpty();if(!e){this.isMobile&&this.isFull&&(this.signature=this.signature.getRotateCanvas(-90));const t=this.signature.toDataURL();return t}return{}},showFull(){this.isFull=!this.isFull,this.init()},renderCanvas(){const t=this.$createElement;return t("div",{class:"canvas-outer",style:this.setCanvasOuterSize},[t("canvas",{class:"canvas-inner",ref:"canvas"})])},renderActionBtns(){const t=this.$createElement;return t("div",{class:"canvas__actions"},[this.$scopedSlots?.leftTool?this.$scopedSlots.leftTool({reset:this.handleReset,undo:this.handleUndo}):t("div",[t("el-button",{attrs:{type:"warning",size:"mini"},on:{click:()=>{this.handleUndo()}}},["返回上一步"]),t("el-button",{attrs:{type:"danger",size:"mini"},on:{click:()=>{this.handleReset()}}},["清除"]),this.isMobile&&this.showPortrait?t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:()=>{this.showFull()}}},[this.isFull?"關閉全螢幕":"全螢幕"]):""])])},renderPenColorList(){const t=this.$createElement;return t("div",{style:"margin: 5px"},[this.$scopedSlots?.rightTool?this.$scopedSlots.rightTool({reset:this.handleReset,undo:this.handleUndo}):t("el-radio-group",{attrs:{size:"mini",fill:`${this.currentColor}`},model:{value:this.currentColor,callback:t=>{this.currentColor=t}}},[this.colors.map((e=>t("el-radio-button",{key:e.code,attrs:{label:e.code},style:{color:`${e.code}`}},[e.name])))])])},renderTool(){const t=this.$createElement;return t("div",{class:"canvas__tools actions"},[this.renderActionBtns(),this.renderPenColorList()])}},render(){const t=arguments[0];return t("div",{class:""+(this.isMobile?"is-mobile":"is-desktop")},[this.isMobile&&this.isFull?t("div",{class:"canvas--extend"},[t("div",{class:"canvas-contanier"},[" ",this.renderCanvas()," "]),t("div",{class:"actions--extend"},[this.renderTool()])]):t("div",{class:"canvas--wrap"},[t("div",{class:"canvas-contanier"},[" ",this.renderCanvas()]),this.renderTool()])])}},R=S,Q=(0,r.Z)(R,d,h,!1,null,"9cab4672",null),D=Q.exports,L=function(){var t=this,e=t._self._c;return e("el-dialog",{attrs:{title:"掃描QR CODE",visible:t.dialogVisible,width:"500px","close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible=e},close:t.handleCloseDialog}},[e("qrcode-vue",{attrs:{value:t.QRUrl,"render-as":"canvas",size:150,foreground:"#00a7f2"}}),t._v(" "+t._s(t.QRUrl)+" "),e("el-divider"),e("QrcodeDropZone",{on:{decode:t.onDecode}},[e("div",{staticClass:"scan-zone"},[e("div",{staticClass:"scan-zone--result",staticStyle:{margin:"auto"}},[t._v(" "+t._s(t.scanUrl?`QRcode網址為：${t.scanUrl}`:"請放入QRcode")+" ")])])]),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:t.handleCloseDialog}},[t._v("確定")])],1)],1)},E=[],k=i(7316),U=i(306);const I=U.Z.create({headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json"},timeout:3e4,retryDelay:1e3});class F{constructor(t={}){this.options=(0,C.merge)({},I,t),this.service=U.Z.create(this.options)}get(t,e){return e=e||{},this.service.get(t,e)}post(t,e,i){return e=e||{},i=i||{},this.service.post(t,e,i)}put(t,e,i){return e=e||{},i=i||{},this.service.put(t,e,i)}delete(t,e){return e=e||{},this.service.delete(t,e)}}var Z=F;const x=new Z,V="http://localhost:3000";var P={getQRcode({id:t,connectWith:e}){return x.post(`${V}/qrcode`,{id:t,connectWith:e})}},T={data(){return{userId:"",QRUrl:"https://cdn.discordapp.com/attachments/370937669607489546/1149644478592847902/IMG_9487.jpg",signatureImage:""}},methods:{async initConnect(t){this.$socket.connect(),this.$socket.emit("createRoom",this.userId),this.$socket.on("capture-signature",(async e=>{(0,C.isEmpty)(e)||(this.signatureImage=e,(0,C.isFunction)(t)&&t())}))},async getQrUrl(t="socket.io"){await P.getQRcode({id:this.userId,connectWith:t}).then((t=>{const{data:e}=t.data;this.QRUrl=e.qr_url})).catch((()=>{}))}}},W=i(4001);const B=new Z,O="http://localhost:3000";var N={connectServer(t){return new EventSource(`${O}/sse/get-data?userId=${t}`)},sendSignature(t){return B.post(`${O}/sse/send-data`,t)},checkPermission(t){return B.get(`${O}/sse/check?userId=${t}`)}},q={name:"QRcodeDialog",components:{QrcodeVue:k.Z,QrcodeDropZone:W.QrcodeDropZone},mixins:[T],data(){return{dialogVisible:!1,scanUrl:null,connectWith:"",sseSource:null}},computed:{transmission(){switch(this.connectWith){case"socket.io":return{connect:this.initConnect,disconnect:()=>{this.$socket.disconnect()}};case"sse":return{connect:this.setupSSE,disconnect:()=>{this.sseSource.close()}};default:return null}}},methods:{openDialog(t,e){this.userId=t,["socket.io","sse"].includes(e)&&(this.connectWith=e,this.transmission.connect(this.done),this.getQrUrl(e),this.dialogVisible=!0)},setupSSE(){this.sseSource=N.connectServer(this.userId),this.sseSource.onmessage=t=>{const{status:e,signature:i}=JSON.parse(t.data);"success"===e&&(this.signatureImage=i,this.done())}},handleCloseDialog(){this.transmission.disconnect(),this.dialogVisible=!1},done(){this.handleCloseDialog(),this.$emit("update",this.signatureImage)},onDecode(t){this.scanUrl=t}}},X=q,j=(0,r.Z)(X,L,E,!1,null,"a6a8e5c6",null),H=j.exports;const K="terminator-9000";var G={name:"SignatureDisplay",components:{EleSignature:D,QrcodeDialog:H},data(){return{outerDialogVisible:!1,dialogVisible:!1,signatureImgList:[],isMoible:!1,isFull:!0,childWindow:null}},created(){this.isMobile=y()({featureDetect:!0,tablet:!0})},computed:{isSignatureImgEmpty(){return(0,C.isEmpty)(this.signatureImgList)},canvasSetting(){return this.isMobile?{width:window.innerWidth-10+"px",height:"100%"}:{width:"800px"}}},methods:{handleOuterDialogVisible(){this.outerDialogVisible=!this.outerDialogVisible},openCanvasDialog(){this.dialogVisible=!0;const{signatureCanvas:t}=this.$refs;(0,C.isEmpty)(t)||t?.init()},signatureConfirm(){const t=this.$refs.signatureCanvas.getSignature();(0,C.isEmpty)(t)||(this.signatureImgList=[{src:t}]),this.dialogVisible=!1},removeTag(t){this.signatureImgList=this.signatureImgList.filter((({src:e})=>t!==e))},async handleQRcode(t){this.$refs.qrcodeDialog.openDialog(K,t)},getSignatureByMobile(t){this.signatureImgList=[{src:t}],this.dialogVisible=!1},handleWindowQRcode(){this.childWindow=window.open(`http://localhost:8080/window/qrcode/${K}`,"QRcode","popup,width=500,height=500"),window.addEventListener("message",this.getSignatureFromOtherWindow),(0,C.isEmpty)(this.signatureImgList)||window.removeEventListener("message",this.getSignatureFromOtherWindow)},getSignatureFromOtherWindow(t){if(!(0,C.isEmpty)(t?.data)){this.dialogVisible=!1;const e=t.data.signatureImage;this.signatureImgList=[{src:e}]}}}},z=G,Y=(0,r.Z)(z,p,f,!1,null,"7c39dcbe",null),M=Y.exports,J={name:"HomeView",components:{SignatureDialog:M}},_=J,$=(0,r.Z)(_,v,m,!1,null,null,null),tt=$.exports,et=function(){var t=this,e=t._self._c;return e("div",[t.isMobile&&!t.state.isError?e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:t.emitSignatureState,expression:"emitSignatureState"}],staticClass:"signature__confirm--success"},[e("el-result",{class:["hint",{showAnimation:t.emitSignatureState}],attrs:{icon:"success"}},[e("div",{attrs:{slot:"extra"},slot:"extra"},[e("img",{staticClass:"success-img",attrs:{src:t.imgs.success,alt:"成功送出"}}),e("div",{staticClass:"success-text"},[t._v("完成簽名，請關閉此頁。")])])])],1),e("el-drawer",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],attrs:{visible:t.drawerVisible,direction:t.direction,size:"100%"},on:{"update:visible":function(e){t.drawerVisible=e},close:t.handleClose}},[e("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],staticClass:"signature__confirm",attrs:{type:"primary",size:"mini"},on:{click:t.handleEmitSignature}},[t._v("簽名完成")]),e("EleSignature",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],ref:"signatue"})],1)],1):e("div",{staticClass:"signature--deviceWrong"},[e("el-result",{attrs:{icon:"warning",subTitle:t.state.content}},[e("div",{attrs:{slot:"extra"},slot:"extra"},[e("img",{attrs:{src:t.imgs.errorFile,alt:"錯誤 - 檔案"}}),e("img",{attrs:{src:t.imgs.errorBB,alt:"錯誤 - 雲寶"}})])])],1)])},it=[],st="data:image/png;base64,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",nt="data:image/png;base64,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",ot=i.p+"img/apply_success.db002821.svg";const rt=(t=100)=>new Promise((e=>{const i=setTimeout((()=>{e(!0),clearTimeout(i)}),t)}));var at={name:"MobileSignature",components:{EleSignature:D},data(){return{isMobile:!1,isLoading:!0,drawerVisible:!0,direction:"rtl",emitSignatureState:!1,userId:"",connectWith:"",state:{isError:!1,content:"請切換至行動裝置或重新掃描QRcode",code:"device-error"},imgs:{errorBB:st,errorFile:nt,success:ot}}},computed:{connect(){switch(this.connectWith){case"socket.io":return{checkPermission:()=>{this.$socket.connect(),this.$socket.emit("join-room",this.userId),this.$socket.on("connect-error",(t=>{this.state=t}))},sendSignature:t=>{this.$socket.emit("send-signature",{image:t,roomId:this.userId}),this.emitSignatureState=!0,this.$socket.disconnect(),this.handleClose()}};case"sse":return{checkPermission:()=>{N.checkPermission(this.userId).then((({data:t})=>{const{permission:e}=t;e||(this.state=t.feedback)})).catch((()=>{this.state.isError=!0}))},sendSignature:t=>{N.sendSignature({id:this.userId,signature:t}).then((()=>{this.emitSignatureState=!0,this.handleClose()})).catch((()=>{}))}};default:return null}}},async created(){this.isMobile=y()({featureDetect:!0,tablet:!0}),[this.userId,this.connectWith]=[this.$route.params.id,this.$route.params.connect],await rt(1e3),this.isMobile&&!(0,C.isEmpty)(this.connect)?(this.connect.checkPermission(),this.isLoading=!1):this.state.isError=!0},methods:{handleClose(){this.isLoading=!1,this.$socket.disconnect(),this.drawerVisible=!1},async handleEmitSignature(){this.isLoading=!0,await rt(1e3),this.$refs.signatue.getSignature((t=>{const e=t.isEmpty();if(!e){const e=t.getRotateCanvas(-90).toDataURL();this.connect.sendSignature(e)}})),this.isLoading=!1}}},ct=at,lt=(0,r.Z)(ct,et,it,!1,null,"a6850550",null),ut=lt.exports,dt=function(){var t=this,e=t._self._c;return e("div",[e("p",[t._v("掃描QR CODE")]),e("qrcode-vue",{attrs:{value:t.QRUrl,"render-as":"canvas",size:150,foreground:"#00a7f2"}}),t._v(" "+t._s(this.userId)+" "),e("el-divider"),e("div",[e("div",[t._v("NUEiP官網")]),e("vue-qr",{attrs:{bgSrc:t.img,text:"https://www.nueip.com/",size:200,dotScale:.3,correctLevel:3,colorDark:"#00a7f2"}})],1)],1)},ht=[],gt=i(4103),vt=i.n(gt),mt=i.p+"img/nueip_autumn_festival.f865b210.png",pt={name:"QRcodeWindow",components:{QrcodeVue:k.Z,VueQr:vt()},mixins:[T],data(){return{img:mt}},created(){this.init()},methods:{init(){this.userId=this.$route.params.id,this.initConnect(this.done),this.getQrUrl()},done(){window.opener.postMessage({signatureImage:this.signatureImage},"*"),window.close()}}},ft=pt,At=(0,r.Z)(ft,dt,ht,!1,null,null,null),bt=At.exports;s["default"].use(g.ZP);const wt=[{path:"/",name:"home",component:tt},{name:"windowQRcode",path:"/window/qrcode/:id?",component:bt},{name:"mobileSignature",path:"/mobile/signature/:id?/:connect?",component:ut}],yt=new g.ZP({mode:"history",base:"/",routes:wt});var Ct=yt,St=i(408);s["default"].use(St.ZP);var Rt=new St.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}}),Qt=i(5114),Dt=i.n(Qt),Lt=i(4509);const Et={autoConnect:!1},kt=(0,Lt.ZP)("http://localhost:3030",Et);s["default"].prototype.$socket=kt,s["default"].use(Dt()),s["default"].config.productionTip=!1,new s["default"]({router:Ct,store:Rt,render:t=>t(l)}).$mount("#app")}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={id:s,loaded:!1,exports:{}};return t[s].call(o.exports,o,o.exports,i),o.loaded=!0,o.exports}i.m=t,function(){i.amdO={}}(),function(){var t=[];i.O=function(e,s,n,o){if(!s){var r=1/0;for(u=0;u<t.length;u++){s=t[u][0],n=t[u][1],o=t[u][2];for(var a=!0,c=0;c<s.length;c++)(!1&o||r>=o)&&Object.keys(i.O).every((function(t){return i.O[t](s[c])}))?s.splice(c--,1):(a=!1,o<r&&(r=o));if(a){t.splice(u--,1);var l=n();void 0!==l&&(e=l)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[s,n,o]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){i.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){i.p="/"}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var n,o,r=s[0],a=s[1],c=s[2],l=0;if(r.some((function(e){return 0!==t[e]}))){for(n in a)i.o(a,n)&&(i.m[n]=a[n]);if(c)var u=c(i)}for(e&&e(s);l<r.length;l++)o=r[l],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return i.O(u)},s=self["webpackChunkelectronic_signature"]=self["webpackChunkelectronic_signature"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(357)}));s=i.O(s)})();
//# sourceMappingURL=app.b4441e48.js.map