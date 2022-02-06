"use strict";(self["webpackChunkq2"]=self["webpackChunkq2"]||[]).push([[365],{5326:(e,t,s)=>{s.d(t,{W:()=>o});var i=s(321);const o=(0,i.Q_)("Gif",{state:()=>({activeIds:[],showGif:!1,gifSrcFull:""}),actions:{activate(e){this.activeIds.includes(e)||this.activeIds.push(e)},deactivate(e){this.activeIds.includes(e)&&this.activeIds.splice(this.activeIds.indexOf(e),1)},clear(){this.activeIds.length=0}}})},7509:(e,t,s)=>{s.d(t,{R:()=>h});var i=s(321),o=s(3113),c=s.n(o),n=s(8825),a=s(5326),l=s(536);const r=c()("WMIdvGJ5aSuz5MObCdP06QxJRWtAy06z"),u=(0,n.Z)(),h=(0,i.Q_)("Search",{state:()=>({activeResults:null,searchHistory:{},searchOptions:{rating:"g",q:"",limit:24}}),actions:{newTrending(){const e=(0,l.v)(),{activeSearch:t,showHistory:s,showSettings:o}=(0,i.Jk)(e);""===t.value&&(console.debug("action: trending"),t.value="Trending",this.searchHistory.Trending||(console.debug("action: trending: calling giphy with",this.searchOptions),r.trending(this.searchOptions).then((e=>{console.debug("action: trending: results:",e),this.activeResults=e,this.searchHistory.Trending=e})).catch((e=>{console.error("Broke while trying to get Trending from Giphy\n",e),u.notify({group:!1,progress:!0,type:"negative",message:"Something went wrong trying to get trending..."})}))),s.value=!1,o.value=!1)},newSearch(e,t=!0){if(console.debug("action: newSearch",e,t),!e)return;const s=(0,l.v)(),{activeSearch:o,showHistory:c,showSettings:n}=(0,i.Jk)(s);o.value=e,t&&this.searchHistory[e]?(console.debug("action: newSearch: OLD search!"),this.activeResults=this.searchHistory[e]):(console.debug("action: newSearch: New search!"),this.searchOptions.q=o.value,console.debug("action: newSearch: calling giphy with",this.searchOptions),r.search(this.searchOptions).then((e=>{console.debug("action: runSearch: results:",e),this.activeResults=e,this.searchHistory[this.searchOptions.q]=e})).catch((e=>{console.error("Broke while trying to search Giphy\n",e),u.notify({group:!1,progress:!0,type:"negative",message:"Something went wrong trying to search Giphy..."})})));const h=(0,a.W)();h.clear(),console.debug("gifStore",h.activeIds),c.value=!1,n.value=!1}}})},536:(e,t,s)=>{s.d(t,{v:()=>o});var i=s(321);const o=(0,i.Q_)("Title",{state:()=>({activeSearch:"",showSettings:!1,showHistory:!1})})},6365:(e,t,s)=>{s.r(t),s.d(t,{default:()=>T});var i=s(3673),o=s(2323);const c={class:"row"},n=(0,i._)("div",{class:"text-h5"},"Settings",-1),a=(0,i._)("div",null," TODO ",-1),l=(0,i._)("div",{class:"text-h5"},"Search History",-1),r={class:"column"},u={class:"row justify-between"},h={class:"col"},d={class:"col-1"};function g(e,t,s,g,w,f){const v=(0,i.up)("gif-object"),m=(0,i.up)("q-img"),p=(0,i.up)("q-dialog"),y=(0,i.up)("q-space"),b=(0,i.up)("q-btn"),S=(0,i.up)("q-card-section"),O=(0,i.up)("q-separator"),_=(0,i.up)("q-card"),k=(0,i.Q2)("close-popup");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",c,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.data,(e=>((0,i.wg)(),(0,i.j4)(v,{key:e.id,class:"col-xs-6 col-sm-4 col-md-3 col-lg-2",gifObject:e},null,8,["gifObject"])))),128))]),(0,i.Wm)(p,{modelValue:e.showGif,"onUpdate:modelValue":t[0]||(t[0]=t=>e.showGif=t),"no-shake":""},{default:(0,i.w5)((()=>[(0,i.Wm)(m,{src:e.gifSrcFull},null,8,["src"])])),_:1},8,["modelValue"]),(0,i.Wm)(p,{modelValue:e.showSettings,"onUpdate:modelValue":t[1]||(t[1]=t=>e.showSettings=t),"no-shake":""},{default:(0,i.w5)((()=>[(0,i.Wm)(_,{style:{"min-width":"50%"}},{default:(0,i.w5)((()=>[(0,i.Wm)(S,{class:"row items-center no-wrap"},{default:(0,i.w5)((()=>[n,(0,i.Wm)(y),(0,i.wy)((0,i.Wm)(b,{flat:"",round:"",icon:"close"},null,512),[[k]])])),_:1}),(0,i.Wm)(O),(0,i.Wm)(S,{style:{"max-height":"50vh"},class:"scroll"},{default:(0,i.w5)((()=>[a])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,i.Wm)(p,{modelValue:e.showHistory,"onUpdate:modelValue":t[2]||(t[2]=t=>e.showHistory=t),"no-focus":"","no-refocus":"","no-shake":"",seamless:""},{default:(0,i.w5)((()=>[(0,i.Wm)(_,{style:{"min-width":"50%"}},{default:(0,i.w5)((()=>[(0,i.Wm)(S,{class:"row items-center no-wrap"},{default:(0,i.w5)((()=>[l,(0,i.Wm)(y),(0,i.wy)((0,i.Wm)(b,{flat:"",round:"",icon:"close"},null,512),[[k]])])),_:1}),(0,i.Wm)(O),(0,i.Wm)(S,{style:{"max-height":"50vh"},class:"scroll"},{default:(0,i.w5)((()=>[(0,i._)("div",r,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.historyList,((t,s)=>((0,i.wg)(),(0,i.iD)("div",{key:s,class:"col"},[(0,i._)("div",u,[(0,i._)("div",h,[(0,i.Wm)(b,{flat:"",onClick:s=>e.runSearch(t)},{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(t),1)])),_:2},1032,["onClick"])]),(0,i._)("div",d,[(0,i.Wm)(b,{flat:"",round:"",icon:"autorenew",onClick:s=>e.runSearch(t,!1)},null,8,["onClick"])])])])))),128))])])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}var w=s(7509),f=s(5326),v=s(536);function m(e,t,s,c,n,a){const l=(0,i.up)("q-icon"),r=(0,i.up)("q-img");return(0,i.wg)(),(0,i.j4)(r,{ratio:1,src:e.gifSrc,class:(0,o.C_)([{dimmed:e.dimMyself},"img-responsive"]),fit:"cover",onMouseover:e.dimOthers,onMouseleave:e.undim},{default:(0,i.w5)((()=>[e.activeGif?((0,i.wg)(),(0,i.iD)("div",{key:0,class:"absolute-bottom-left",onClick:t[0]||(t[0]=(...t)=>e.copy&&e.copy(...t))},[(0,i.Wm)(l,{class:"cursor-pointer",name:"content_copy",size:"lg"})])):(0,i.kq)("",!0),e.activeGif?((0,i.wg)(),(0,i.iD)("div",{key:1,class:"absolute-bottom-right",onClick:t[1]||(t[1]=(...t)=>e.showGif&&e.showGif(...t))},[(0,i.Wm)(l,{class:"cursor-pointer",name:"open_in_full",size:"lg"})])):(0,i.kq)("",!0)])),_:1},8,["src","class","onMouseover","onMouseleave"])}var p=s(1914),y=s(8825);const b=(0,i.aZ)({name:"GifObject",props:{gifObject:{type:Object,required:!0}},setup(e){const t=(0,f.W)(),s=(0,i.Fl)((()=>{const t=parseInt(e.gifObject.images.fixed_height.width,10);return t<200?e.gifObject.images.fixed_width.url:e.gifObject.images.fixed_height.url})),o=()=>{t.gifSrcFull=e.gifObject.images.original.url,t.showGif=!0,console.debug("Showing full size original gif",t.showGif,t.gifSrcFull)},c=(0,y.Z)(),n=()=>{(0,p.Z)(e.gifObject.url).then((()=>{c.notify({group:!1,progress:!0,type:"positive",message:"Copied!",timeout:1e3})})).catch((e=>{console.error("Failed to copy to clipboard",e),c.notify({group:!1,progress:!0,type:"negative",message:"Something went wrong..."})}))},a=(0,i.Fl)((()=>t.activeIds.length>0&&t.activeIds.includes(e.gifObject.id))),l=(0,i.Fl)((()=>t.activeIds.length>0&&!t.activeIds.includes(e.gifObject.id))),r=()=>{t.activate(e.gifObject.id)},u=()=>{t.deactivate(e.gifObject.id)};return{gifSrc:s,showGif:o,copy:n,activeGif:a,dimMyself:l,dimOthers:r,undim:u}}});var S=s(4260),O=s(4027),_=s(4554),k=s(7518),W=s.n(k);const j=(0,S.Z)(b,[["render",m]]),G=j;W()(b,"components",{QImg:O.Z,QIcon:_.Z});var I=s(321);const Z=(0,i.aZ)({name:"PageIndex",setup(){const e=(0,w.R)(),t=(0,i.Fl)((()=>{var t;return null===(t=e.activeResults)||void 0===t?void 0:t.data})),s=(0,i.Fl)((()=>Object.keys(e.searchHistory))),o=(0,f.W)(),{showGif:c,gifSrcFull:n}=(0,I.Jk)(o),a=(0,v.v)(),{showSettings:l,showHistory:r}=(0,I.Jk)(a);return(0,i.bv)((()=>{e.newTrending()})),{data:t,showGif:c,gifSrcFull:n,showSettings:l,showHistory:r,historyList:s}},components:{GifObject:G}});var H=s(2134),q=s(151),Q=s(5589),C=s(2025),F=s(522),x=s(5869),D=s(7011),V=s(3414),M=s(677);const R=(0,S.Z)(Z,[["render",g]]),T=R;W()(Z,"components",{QDialog:H.Z,QImg:O.Z,QCard:q.Z,QCardSection:Q.Z,QSpace:C.Z,QBtn:F.Z,QSeparator:x.Z,QList:D.Z,QItem:V.Z}),W()(Z,"directives",{ClosePopup:M.Z})}}]);