import{b as h,m as v,l as b,r as n,c as k,o as d,g as q,d as M,t as V,e as s,h as w}from"./index-ZFF9-d2x.js";import{u as L,V as y}from"./VueForm-psW7i3bf.js";import"./PreLoader-DVVuFmys.js";const B={class:"container"},F={__name:"AddUser",setup(c){const{t}=h(),a=v(),{request:l,isLoading:m}=b(),{fields:i,validate:p,getFieldsDataToRequest:g,clearValues:f}=L([{key:"login",required:!0,validate:!0},{key:"password",required:!0,validate:!1}],[{key:"id",name:"id",required:!0,value:a.params.id}]),r=n(!1),o=n("");a.params.id&&l({method:"get",url:"http://localhost:3000/api/element",params:{table:"users",id:a.params.id}}).then(e=>{e.data.login&&i.value.find(u=>(u.name==="login"&&(u.value=e.data.login),!1))}).catch(e=>{o.value=e.response.data.message||e.message});const _=()=>{p()&&l({method:a.params.id?"put":"post",url:"http://localhost:3000/api/element",data:{table:"users",data:g()}}).then(e=>{f(),r.value=!0,setTimeout(()=>{r.value=!1},3e3)}).catch(e=>{o.value=e.response.data.message||e.message})};return(e,u)=>(d(),k("div",B,[q("h2",null,V(s(t)("subtitles.add_user")),1),M(y,{fields:s(i),isLoading:s(m),errorMessage:o.value,showOkMessage:r.value,onSubmit:_,buttonLabel:s(t)("functional_phrases.add")},null,8,["fields","isLoading","errorMessage","showOkMessage","buttonLabel"])]))}},D={__name:"UserFormView",setup(c){return(t,a)=>(d(),w(F))}};export{D as default};
