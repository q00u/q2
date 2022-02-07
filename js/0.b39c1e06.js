"use strict";(self["webpackChunkq2"]=self["webpackChunkq2"]||[]).push([[0],{5326:(e,t,a)=>{a.d(t,{W:()=>n});var s=a(321);const n=(0,s.Q_)("Gif",{state:()=>({activeIds:[],showGif:!1,gifSrcFull:""}),actions:{activate(e){this.activeIds.includes(e)||this.activeIds.push(e)},deactivate(e){this.activeIds.includes(e)&&this.activeIds.splice(this.activeIds.indexOf(e),1)},clear(){this.activeIds.length=0}}})},7509:(e,t,a)=>{a.d(t,{R:()=>u});var s=a(321),n=a(3113),i=a.n(n),r=a(8825),c=a(5326),o=a(536);const h=i()({https:!0,apiKey:"WMIdvGJ5aSuz5MObCdP06QxJRWtAy06z"}),l=(0,r.Z)(),u=(0,s.Q_)("Search",{state:()=>({activeResults:null,searchHistory:{},searchOptions:{rating:"g",q:"",limit:24}}),actions:{newTrending(){const e=(0,o.v)(),{activeSearch:t,showHistory:a,showSettings:n}=(0,s.Jk)(e);""===t.value&&(console.debug("action: trending"),t.value="Trending",this.searchHistory.Trending||(console.debug("action: trending: calling giphy with",this.searchOptions),h.trending(this.searchOptions).then((e=>{console.debug("action: trending: results:",e),this.activeResults=e,this.searchHistory.Trending=e})).catch((e=>{console.error("Broke while trying to get Trending from Giphy\n",e),l.notify({group:!1,progress:!0,type:"negative",message:"Something went wrong trying to get trending..."})}))),a.value=!1,n.value=!1)},newSearch(e,t=!0){if(console.debug("action: newSearch",e,t),!e)return;const a=(0,o.v)(),{activeSearch:n,showHistory:i,showSettings:r}=(0,s.Jk)(a);n.value=e,t&&this.searchHistory[e]?(console.debug("action: newSearch: OLD search!"),this.activeResults=this.searchHistory[e]):(console.debug("action: newSearch: New search!"),this.searchOptions.q=n.value,console.debug("action: newSearch: calling giphy with",this.searchOptions),h.search(this.searchOptions).then((e=>{console.debug("action: runSearch: results:",e),this.activeResults=e,this.searchHistory[this.searchOptions.q]=e})).catch((e=>{console.error("Broke while trying to search Giphy\n",e),l.notify({group:!1,progress:!0,type:"negative",message:"Something went wrong trying to search Giphy..."})})));const u=(0,c.W)();u.clear(),console.debug("gifStore",u.activeIds),i.value=!1,r.value=!1}}})},536:(e,t,a)=>{a.d(t,{v:()=>n});var s=a(321);const n=(0,s.Q_)("Title",{state:()=>({activeSearch:"",showSettings:!1,showHistory:!1})})},3e3:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var s=a(3673),n=a(8880),i=a(2323);const r=(0,s.Uk)("for"),c=(0,s._)("img",{src:"icons/logo_padding_64x64.png"},null,-1),o={class:"text-caption"};function h(e,t,a,h,l,u){const g=(0,s.up)("q-img"),d=(0,s.up)("q-toolbar-title"),v=(0,s.up)("q-avatar"),p=(0,s.up)("q-icon"),w=(0,s.up)("q-input"),y=(0,s.up)("q-btn"),S=(0,s.up)("q-space"),m=(0,s.up)("q-toolbar"),f=(0,s.up)("q-header"),b=(0,s.up)("router-view"),k=(0,s.up)("q-page-container"),q=(0,s.up)("q-layout");return(0,s.wg)(),(0,s.j4)(q,{view:"lHh Lpr lFf"},{default:(0,s.w5)((()=>[(0,s.Wm)(f,{elevated:""},{default:(0,s.w5)((()=>[(0,s.Wm)(m,null,{default:(0,s.w5)((()=>[(0,s.Wm)(g,{src:"icons/favicon-32x32.png",style:{height:"32px",width:"32px"}}),(0,s.Wm)(d,{shrink:"",style:{"min-width":"51px"}},{default:(0,s.w5)((()=>[r])),_:1}),(0,s.Wm)(v,{size:"32px"},{default:(0,s.w5)((()=>[c])),_:1}),(0,s.Wm)(w,{modelValue:e.activeSearch,"onUpdate:modelValue":t[2]||(t[2]=t=>e.activeSearch=t),type:"search",class:"q-ml-md",label:"Search",maxlength:"50",dark:"",dense:"",standout:"",style:{width:"80%"},onFocus:t[3]||(t[3]=t=>{e.showHistory=!0;try{t.target.select()}catch(a){e.console.error(e.err)}}),onKeydown:t[4]||(t[4]=(0,n.D2)((t=>e.runSearch(e.activeSearch)),["enter"]))},{append:(0,s.w5)((()=>[""===e.activeSearch?((0,s.wg)(),(0,s.j4)(p,{key:0,name:"search"})):((0,s.wg)(),(0,s.j4)(p,{key:1,name:"clear",class:"cursor-pointer",onClick:t[0]||(t[0]=t=>e.activeSearch="")}))])),after:(0,s.w5)((()=>[""!==e.activeSearch?((0,s.wg)(),(0,s.j4)(p,{key:0,onClick:t[1]||(t[1]=t=>e.runSearch(e.activeSearch)),class:"cursor-pointer",name:"search"})):(0,s.kq)("",!0),(0,s._)("span",o,(0,i.zw)(e.activeSearch.length)+"/50 ",1)])),_:1},8,["modelValue"]),(0,s.Wm)(y,{flat:"",onClick:t[5]||(t[5]=t=>e.showSettings=!0)},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{name:"settings"})])),_:1}),(0,s.Wm)(S),(0,s._)("div",null,"v"+(0,i.zw)(e.version),1)])),_:1})])),_:1}),(0,s.Wm)(k,null,{default:(0,s.w5)((()=>[(0,s.Wm)(b)])),_:1})])),_:1})}var l=a(7509),u=a(536),g=a(1959),d=a(321);const v=(0,s.aZ)({name:"MainLayout",setup(){const e="0.0.6",t=(0,g.iH)(null),a=(0,l.R)(),s=(0,u.v)(),{activeSearch:n,showSettings:i,showHistory:r}=(0,d.Jk)(s),c=(e,s=!0)=>{console.debug("activeSearch",e,s),a.newSearch(e,s),t.value&&t.value.blur()};return{version:e,activeSearch:n,runSearch:c,showSettings:i,showHistory:r}}});var p=a(4260),w=a(3066),y=a(3812),S=a(9570),m=a(4027),f=a(3747),b=a(5096),k=a(5509),q=a(4554),_=a(522),H=a(2025),Q=a(2652),W=a(7518),Z=a.n(W);const I=(0,p.Z)(v,[["render",h]]),x=I;Z()(v,"components",{QLayout:w.Z,QHeader:y.Z,QToolbar:S.Z,QImg:m.Z,QToolbarTitle:f.Z,QAvatar:b.Z,QInput:k.Z,QIcon:q.Z,QBtn:_.Z,QSpace:H.Z,QPageContainer:Q.Z})}}]);