import{b as k,m as q,l as y,r as c,c as V,o as m,g as r,d as M,t as w,e as l,q as i,h as B}from"./index--Fm6cBuS.js";import{u as L,V as S}from"./VueForm-C8m0COzx.js";import"./PreLoader-Dcz_1jB3.js";const x={class:"container"},F={__name:"AddSite",setup(f){const{t:a}=k(),s=q(),{request:u,isLoading:p}=y(),{fields:n,validate:h,getFieldsDataToRequest:v,clearValues:_}=L([{key:"name",name:"name",required:!0,validate:!0},{key:"file",name:"previewImg",label:a("parameters.img"),required:!1,validate:!1},{key:"url",label:a("parameters.url"),required:!0,validate:!1},{key:"selectServer",required:!0,validate:!1},{key:"selectBD",required:!1,validate:!1},{key:"selectGit",required:!1,validate:!1}],[{key:"id",name:"id",required:!0,value:s.params.id}]),o=c(!1),b=c("");s.params.id&&u({method:"get",url:"http://localhost:3030/api/element",params:{table:"sites",id:s.params.id}}).then(e=>{Object.keys(e.data).forEach(t=>{n.value.find(d=>(d.name===t&&(d.value=e.data[t]),!1))})}).catch(e=>{console.error(e)});const g=()=>{h()&&u({method:s.params.id?"put":"post",url:"http://localhost:3030/api/element",data:{table:"sites",data:v()}}).then(e=>{_(),o.value=!0,setTimeout(()=>{o.value=!1},3e3)}).catch(e=>{console.error(e)})};return(e,t)=>(m(),V("div",x,[r("h2",null,w(l(a)("subtitles.add_site")),1),t[0]||(t[0]=r("div",{class:"alert"},[i(" Добавить сайт вы сможете если у вас добавлен "),r("b",null,"Сервер"),i(", "),r("b",null,"GIT"),i(", "),r("b",null,"База данных"),i(". ")],-1)),M(S,{fields:l(n),isLoading:l(p),errorMessage:b.value,showOkMessage:o.value,onSubmit:g,buttonLabel:l(a)("functional_phrases.add")},null,8,["fields","isLoading","errorMessage","showOkMessage","buttonLabel"])]))}},I={__name:"SiteFormView",setup(f){return(a,s)=>(m(),B(F))}};export{I as default};
