"use strict";(globalThis["webpackChunkmomentum_fw_dev"]=globalThis["webpackChunkmomentum_fw_dev"]||[]).push([[387],{3387:(t,e,s)=>{s.r(e),s.d(e,{default:()=>X});var a=s(1758),i=s(8790);const l={class:"flex-center column align-items-center"},n=(0,a.Lk)("p",null,"Loading Asset Packs...",-1),r={key:1},o={class:"q-mt-xs q-ml-md q-mr-sm flex flex-col items-center justify-between",style:{"flex-wrap":"nowrap"}},c={class:"text-left text-bold"},g={class:"text-h5"},p={class:"text-h7"},d={class:"q-mt-sm q-mx-md"},h={key:0,class:"text-h7 q-mt-sm q-mx-md"};function m(t,e,s,m,f,u){const k=(0,a.g2)("q-spinner"),v=(0,a.g2)("q-carousel-slide"),w=(0,a.g2)("q-carousel"),y=(0,a.g2)("q-btn"),_=(0,a.g2)("q-tooltip"),b=(0,a.g2)("q-icon"),x=(0,a.g2)("q-card-actions"),$=(0,a.g2)("q-card"),E=(0,a.g2)("q-list"),R=(0,a.g2)("q-page");return(0,a.uX)(),(0,a.Wv)(R,{class:"flex-center column full-width"},{default:(0,a.k6)((()=>[(0,a.Lk)("div",l,[null===t.packs?((0,a.uX)(),(0,a.CE)(a.FK,{key:0},[(0,a.bF)(k,{color:"primary",size:"3em",class:"q-mb-md"}),n],64)):t.packs.length<1?((0,a.uX)(),(0,a.CE)("h5",r,"Nothing to see here 🤔")):((0,a.uX)(),(0,a.Wv)(E,{key:2,class:"packs-grid"},{default:(0,a.k6)((()=>[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(t.packs,(s=>((0,a.uX)(),(0,a.Wv)($,(0,a.v6)({key:s.id},s,{class:"flex justify-between",style:{"flex-direction":"column"},dark:""}),{default:(0,a.k6)((()=>[(0,a.bF)(w,{animated:"",modelValue:t.slides[s.id],"onUpdate:modelValue":e=>t.slides[s.id]=e,arrows:s.preview_urls.length>1,navigation:s.preview_urls.length>1,"transition-prev":"slide-right","transition-next":"slide-left",infinite:""},{default:(0,a.k6)((()=>[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(s.preview_urls,((t,e)=>((0,a.uX)(),(0,a.Wv)(v,{key:e,name:e+1,"img-src":t},null,8,["name","img-src"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue","arrows","navigation"]),(0,a.Lk)("div",o,[(0,a.Lk)("div",c,[(0,a.Lk)("div",g,(0,i.v_)(s.name),1),(0,a.Lk)("div",p,"by "+(0,i.v_)(s.author),1)]),s.source_url?((0,a.uX)(),(0,a.Wv)(y,{key:0,href:s.source_url,target:"_blank",icon:"open_in_new",class:"main-btn",style:{border:"none",padding:"0",margin:"0",width:"50px",height:"50px"},flat:""},null,8,["href"])):(0,a.Q3)("",!0)]),(0,a.Lk)("div",d,[s.stats.packs>1?((0,a.uX)(),(0,a.Wv)(b,{key:0,size:"1.5em",left:"",name:"category"},{default:(0,a.k6)((()=>[(0,a.bF)(_,{style:{"font-size":"1.2em",padding:"0.1em 0.3em"}},{default:(0,a.k6)((()=>[(0,a.eW)(" Contains "+(0,i.v_)(s.stats.packs)+" Asset Packs ",1)])),_:2},1024)])),_:2},1024)):(0,a.Q3)("",!0),s.stats.anims>0?((0,a.uX)(),(0,a.Wv)(b,{key:1,size:"1.5em",left:"",name:"ondemand_video"},{default:(0,a.k6)((()=>[(0,a.bF)(_,{style:{"font-size":"1.2em",padding:"0.1em 0.3em"}},{default:(0,a.k6)((()=>[(0,a.eW)((0,i.v_)(s.stats.anims)+" Animation"+(0,i.v_)(s.stats.anims>1?"s":""),1)])),_:2},1024)])),_:2},1024)):(0,a.Q3)("",!0),s.stats.passport.length>0?((0,a.uX)(),(0,a.Wv)(b,{key:2,size:"1.5em",left:"",name:"portrait"},{default:(0,a.k6)((()=>[(0,a.bF)(_,{style:{"font-size":"1.2em",padding:"0.1em 0.3em"}},{default:(0,a.k6)((()=>[(0,a.eW)((0,i.v_)(s.stats.passport.includes("Background")?"Passport Background"+(s.stats.passport.length>1?` and ${s.stats.passport.slice(1).join(", ")} Mood${s.stats.passport.length>2?"s":""}`:""):"")+" "+(0,i.v_)(s.stats.passport.includes("Background")?"":`${s.stats.passport.join(", ")} Passport Mood${s.stats.passport.length>1?"s":""}`),1)])),_:2},1024)])),_:2},1024)):(0,a.Q3)("",!0),s.stats.icons>0?((0,a.uX)(),(0,a.Wv)(b,{key:3,size:"1.5em",left:"",name:"wallpaper"},{default:(0,a.k6)((()=>[(0,a.bF)(_,{style:{"font-size":"1.2em",padding:"0.1em 0.3em"}},{default:(0,a.k6)((()=>[(0,a.eW)((0,i.v_)(s.stats.icons)+" Icon"+(0,i.v_)(s.stats.icons>1?"s":""),1)])),_:2},1024)])),_:2},1024)):(0,a.Q3)("",!0),s.stats.fonts.length>0?((0,a.uX)(),(0,a.Wv)(b,{key:4,size:"1.5em",left:"",name:"text_fields"},{default:(0,a.k6)((()=>[(0,a.bF)(_,{style:{"font-size":"1.2em",padding:"0.1em 0.3em"}},{default:(0,a.k6)((()=>[(0,a.eW)((0,i.v_)(s.stats.fonts.join(", "))+" Font"+(0,i.v_)(s.stats.fonts.length>1?"s":""),1)])),_:2},1024)])),_:2},1024)):(0,a.Q3)("",!0)]),s.description?((0,a.uX)(),(0,a.CE)("div",h,(0,i.v_)(s.description),1)):(0,a.Q3)("",!0),(0,a.bF)(x,{align:"stretch"},{default:(0,a.k6)((()=>[(0,a.bF)(y,{href:s.url_zip,class:"main-btn",style:{flex:"1"},flat:""},{default:(0,a.k6)((()=>[(0,a.eW)("Download")])),_:2},1032,["href"]),!1===t.flags.ableToExtract?((0,a.uX)(),(0,a.Wv)(y,{key:0,onClick:e[0]||(e[0]=e=>t.updateFw()),class:"main-btn",style:{flex:"1"},flat:""},{default:(0,a.k6)((()=>[(0,a.eW)("Update FW")])),_:1})):t.installing.includes(s)?0===t.installing.indexOf(s)?((0,a.uX)(),(0,a.Wv)(y,{key:2,class:"main-btn",style:(0,i.Tr)(`flex: 1; background-image: linear-gradient(to right, #a883e9 ${100*t.progress}%, transparent ${100*t.progress}%);`),disable:"",flat:""},{default:(0,a.k6)((()=>[(0,a.eW)((0,i.v_)(t.installStatus),1)])),_:1},8,["style"])):((0,a.uX)(),(0,a.Wv)(y,{key:3,class:"main-btn",style:{flex:"1"},disable:"",flat:""},{default:(0,a.k6)((()=>[(0,a.eW)("Queued")])),_:1})):((0,a.uX)(),(0,a.Wv)(y,{key:1,disable:!t.serialSupported||t.rpcToggling||t.connected&&null===t.flags.ableToExtract,onClick:e=>t.install(s),class:"main-btn",style:{flex:"1"},flat:""},{default:(0,a.k6)((()=>[(0,a.eW)((0,i.v_)(t.serialSupported?t.rpcToggling?"Connecting":t.connected?null===t.flags.ableToExtract?"Loading":"Install":"Connect":"Unsupported"),1)])),_:2},1032,["disable","onClick"]))])),_:2},1024)])),_:2},1040)))),128))])),_:1}))])])),_:1})}s(4748),s(5584);var f=s(7360),u=s(8734),k=s(2314),v=s(8736),w=s.n(v);const y=(0,a.pM)({name:"PagePacks",props:{flipper:Object,connected:Boolean,rpcActive:Boolean,rpcToggling:Boolean,serialSupported:Boolean,info:Object},setup(){return{packs:(0,u.KR)(null),slides:(0,u.KR)({}),flags:(0,u.KR)({restarting:!1,rpcActive:!1,rpcToggling:!1,ableToExtract:null}),progress:(0,u.KR)(0),installStatus:(0,u.KR)(null),installing:(0,u.KR)([]),fakeExtractProgress:(0,u.KR)(null)}},watch:{async info(t,e){null!==t&&t.storage_databases_present&&this.connected&&(this.flags.ableToExtract=!w().lt(this.info.protobuf_version_major+"."+this.info.protobuf_version_minor+".0","0.23.0"),await this.start())}},methods:{async updateFw(){window.top.location.href="/update"},async install(t){if(this.serialSupported)if(this.connected&&null!=this.info&&this.rpcActive){if(this.installing.push(t),!(this.installing.length>1))while(this.installing.length>0)try{const e=3;let s=-1;const a=t=>{this.progress=t/e+1/e*s};this.progress=0,this.installStatus="Loading",s++,t=this.installing[0];const i=t.url_tar,l=await fetch(i).then((async t=>{if(t.status>=400)throw new Error("Pack returned "+t.status);const e=Number(t.headers.get("content-length")),s=t.body.getReader();let i=0;const l=[];while(1){const{done:t,value:n}=await s.read();if(t)break;l.push(n),i+=n.length,a(i/e)}const n=new Uint8Array(i);let r=0;for(const a of l)n.set(a,r),r+=a.length;return n})).catch((t=>{throw this.$emit("showNotif",{message:"Failed to fetch pack: "+t.toString(),color:"negative"}),this.$emit("log",{level:"error",message:"Packs: Failed to fetch pack: "+t.toString()}),t})).finally((()=>{this.$emit("log",{level:"debug",message:"Packs: Downloaded pack from "+i})})),n=async t=>{t.endsWith("/")&&(t=t.slice(0,-1));let e="";for(const s of t.split("/"))"/"!==e&&(e+="/"),e+=s,e.length<6||await this.flipper.commands.storage.mkdir(e).catch((t=>this.rpcErrorHandler(t,"storage.mkdir"))).finally((()=>{this.$emit("log",{level:"debug",message:"Packs: storage.mkdir: "+e})}))},r="/ext/asset_packs",o="/ext/.tmp/mntm",c=`${o}/${t.id}.tar.gz`;await n(r),await n(o),this.installStatus="Copying",s++;const g=this.flipper.emitter.on("storageWriteRequest/progress",(t=>{a(t.progress/t.total)}));let p=performance.now(),d=0;await this.flipper.commands.storage.write(c,l).catch((t=>{throw this.rpcErrorHandler(t,"storage.write"),t})).finally((()=>{d=performance.now()-p,this.$emit("log",{level:"debug",message:`Packs: storage.write: ${c} took ${Math.round(d)}ms`})})),g(),this.installStatus="Extracting",s++,p=performance.now();const h=10*d;this.fakeExtractProgress=setInterval((()=>{a((performance.now()-p)/h)}),250),await this.flipper.commands.storage.tarExtract(c,r).catch((t=>{throw this.rpcErrorHandler(t,"storage.tarExtract"),t})).finally((()=>{null!==this.fakeExtractProgress&&(clearInterval(this.fakeExtractProgress),this.fakeExtractProgress=null),d=performance.now()-p,this.$emit("log",{level:"debug",message:`Packs: storage.tarExtract: ${c} to ${r} took ${Math.round(d)}ms`})})),a(1),this.installStatus="Cleanup",await this.flipper.commands.storage.remove(c,!1).catch((t=>this.rpcErrorHandler(t,"storage.remove"))).finally((()=>{this.$emit("log",{level:"debug",message:"Packs: storage.remove: "+c})}))}finally{this.installing.shift(),this.installStatus=null,this.progress=0}}else this.rpcToggling||this.$emit("selectPort")},async startRpc(){this.flags.rpcToggling=!0;const t=await this.flipper.commands.startRpcSession(this.flipper);if(!t.resolved||t.error)throw this.$emit("showNotif",{message:"Unable to start RPC session. Reload the page or reconnect Flipper manually.",color:"negative",reloadBtn:!0}),this.$emit("log",{level:"error",message:"Device: Couldn't start rpc session"}),new Error("Couldn't start rpc session");this.flags.rpcActive=!0,this.flags.rpcToggling=!1,this.$emit("setRpcStatus",!0),this.$emit("log",{level:"info",message:"Device: RPC started"})},async stopRpc(){this.flags.rpcToggling=!0,await this.flipper.commands.stopRpcSession(),this.flags.rpcActive=!1,this.flags.rpcToggling=!1,this.$emit("setRpcStatus",!1),this.$emit("log",{level:"info",message:"Device: RPC stopped"})},async restartRpc(t){(this.connected&&this.flags.rpcActive&&!this.flags.restarting||t)&&(this.flags.restarting=!0,await this.flipper.closeReader(),await(0,k.A)(300),await this.flipper.disconnect(),await(0,k.A)(300),await this.flipper.connect(),await this.startRpc(),this.$emit("log",{level:"info",message:"Device: Restarted RPC"}))},passNotif(t){this.$emit("showNotif",t)},passLog(t){this.$emit("log",t)},rpcErrorHandler(t,e){t=t.toString(),this.$emit("showNotif",{message:`RPC error in command '${e}': ${t}`,color:"negative"}),this.$emit("log",{level:"error",message:`Device: RPC error in command '${e}': ${t}`})},async start(){this.serialSupported&&(this.flags.rpcActive=this.rpcActive,this.rpcActive||(setTimeout((()=>{if(!this.rpcActive)return this.restartRpc(!0)}),1e3),await this.startRpc()),navigator.serial.addEventListener("disconnect",(t=>{null!==this.fakeExtractProgress&&(clearInterval(this.fakeExtractProgress),this.fakeExtractProgress=null),this.flags.ableToExtract=null,this.flags.rpcActive=!1,this.flags.rpcToggling=!1,this.$emit("setRpcStatus",!1)})))}},async mounted(){const t=await(0,f.vy)().catch((t=>{throw this.$emit("showNotif",{message:"Unable to load asset packs from the server. Reload the page and try again.",color:"negative",reloadBtn:!0}),this.$emit("log",{level:"error",message:"Packs: Failed to fetch pack list"}),t}));for(const e of t)this.slides[e.id]=1;this.packs=t,this.connected&&null!==this.info&&this.info.storage_databases_present&&await this.start()},async beforeUnmount(){this.unbindRestart(),await(0,k.A)(3e3)}});var _=s(2807),b=s(7716),x=s(564),$=s(3999),E=s(3316),R=s(3454),A=s(8951),P=s(1693),C=s(492),W=s(7410),S=s(2669),T=s(8582),F=s.n(T);const q=(0,_.A)(y,[["render",m]]),X=q;F()(y,"components",{QPage:b.A,QSpinner:x.A,QList:$.A,QCard:E.A,QCarousel:R.A,QCarouselSlide:A.A,QBtn:P.A,QIcon:C.A,QTooltip:W.A,QCardActions:S.A})}}]);