import{b as k,m as q,l as y,r as n,c as B,o as m,g as l,d as V,t as M,e as r,q as c,h as w}from"./index-CrLdf3JQ.js";import{u as D,V as L}from"./VueForm-CKGUdw-a.js";import"./PreLoader-BKnvv8oH.js";const x={class:"container"},F={__name:"AddBD",setup(p){const{t}=k(),a=q(),{request:u,isLoading:f}=y(),{fields:i,validate:h,getFieldsDataToRequest:_,clearValues:b}=D([{key:"name",name:"name",required:!0,validate:!0},{key:"selectBDType",required:!0,validate:!1},{key:"name",name:"user",label:t("parameters.user"),required:!0,validate:!1},{key:"password",required:!1,validate:!1},{key:"selectServer",required:!0,validate:!1}],[{key:"id",name:"id",required:!0,value:a.params.id}]),o=n(!1),v=n("");a.params.id&&u({method:"get",url:"http://localhost:3000/api/element",params:{table:"databases",id:a.params.id}}).then(e=>{Object.keys(e.data).forEach(s=>{i.value.find(d=>(d.name===s&&(d.value=e.data[s]),!1))})}).catch(e=>{console.error(e)});const g=()=>{h()&&u({method:a.params.id?"put":"post",url:"http://localhost:3000/api/element",data:{table:"databases",data:_()}}).then(e=>{b(),o.value=!0,setTimeout(()=>{o.value=!1},3e3)}).catch(e=>{console.error(e)})};return(e,s)=>(m(),B("div",x,[l("h2",null,M(r(t)("subtitles.add_database")),1),s[0]||(s[0]=l("div",{class:"formAlert"},[c("Добавить базу данных вы сможете, если у вас добавлен "),l("b",null,"сервер"),c(" базы данных.")],-1)),V(L,{fields:r(i),isLoading:r(f),errorMessage:v.value,showOkMessage:o.value,onSubmit:g,buttonLabel:r(t)("functional_phrases.add")},null,8,["fields","isLoading","errorMessage","showOkMessage","buttonLabel"])]))}},R={__name:"DataBaseFormView",setup(p){return(t,a)=>(m(),w(F))}};export{R as default};
