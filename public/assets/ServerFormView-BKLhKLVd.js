import{b as g,m as b,l as k,r as i,c as q,o as d,g as y,d as M,t as V,e as t,h as w}from"./index-D95doIy-.js";import{u as L,V as B}from"./VueForm-BW-i4hzC.js";import"./PreLoader-BfunhHIS.js";const F={class:"container"},O={__name:"AddServer",setup(c){const{t:a}=g(),s=b(),{request:l,isLoading:m}=k(),{fields:n,validate:p,getFieldsDataToRequest:f,clearValues:h}=L([{key:"name",name:"name",required:!0,validate:!0},{key:"name",name:"login",label:a("parameters.user"),required:!0,validate:!1},{key:"password",required:!0,validate:!1},{key:"name",name:"host",label:a("parameters.host"),required:!0,validate:!1}],[{key:"id",name:"id",required:!0,value:s.params.id}]),r=i(!1),_=i("");s.params.id&&l({method:"get",url:"http://localhost:3000/api/element",params:{table:"servers",id:s.params.id}}).then(e=>{Object.keys(e.data).forEach(o=>{n.value.find(u=>(u.name===o&&(u.value=e.data[o]),!1))})}).catch(e=>{console.error(e)});const v=()=>{p()&&l({method:s.params.id?"put":"post",url:"http://localhost:3000/api/element",data:{table:"servers",data:f()}}).then(e=>{h(),r.value=!0,setTimeout(()=>{r.value=!1},3e3)}).catch(e=>{console.error(e)})};return(e,o)=>(d(),q("div",F,[y("h2",null,V(t(a)("subtitles.add_server")),1),M(B,{fields:t(n),isLoading:t(m),errorMessage:_.value,showOkMessage:r.value,onSubmit:v,buttonLabel:t(a)("functional_phrases.add")},null,8,["fields","isLoading","errorMessage","showOkMessage","buttonLabel"])]))}},D={__name:"ServerFormView",setup(c){return(a,s)=>(d(),w(O))}};export{D as default};
