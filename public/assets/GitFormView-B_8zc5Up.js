import{b,m as v,l as k,r as n,c as M,o as c,g as V,d as q,t as L,e as t,h as w}from"./index-D95doIy-.js";import{u as B,V as F}from"./VueForm-BW-i4hzC.js";import"./PreLoader-BfunhHIS.js";const O={class:"container"},x={__name:"AddGit",setup(d){const{t:s}=b(),a=v(),{request:i,isLoading:m}=k(),{fields:u,validate:p,getFieldsDataToRequest:h,clearValues:_}=B([{key:"url",required:!0,validate:!0}],[{key:"id",name:"id",required:!0,value:a.params.id}]),r=n(!1),f=n("");a.params.id&&i({method:"get",url:"http://localhost:3000/api/element",params:{table:"gits",id:a.params.id}}).then(e=>{Object.keys(e.data).forEach(o=>{u.value.find(l=>(l.name===o&&(l.value=e.data[o]),!1))})}).catch(e=>{console.error(e)});const g=()=>{p()&&i({method:a.params.id?"put":"post",url:"http://localhost:3000/api/element",data:{table:"gits",data:h()}}).then(e=>{_(),r.value=!0,setTimeout(()=>{r.value=!1},3e3)}).catch(e=>{console.error(e)})};return(e,o)=>(c(),M("div",O,[V("h2",null,L(t(s)("subtitles.add_git")),1),q(F,{fields:t(u),isLoading:t(m),errorMessage:f.value,showOkMessage:r.value,onSubmit:g,buttonLabel:t(s)("functional_phrases.add")},null,8,["fields","isLoading","errorMessage","showOkMessage","buttonLabel"])]))}},E={__name:"GitFormView",setup(d){return(s,a)=>(c(),w(x))}};export{E as default};
