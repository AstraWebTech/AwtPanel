import{u as i,a as u,b as v,r as b,c as l,o as _,d,e as c,_ as V,f as M,g as k}from"./index-_99carhQ.js";import{u as w,V as x}from"./VueForm-Ds8ul3at.js";import"./PreLoader-Cm-zuv-4.js";const F={class:"container"},S={__name:"LoginForm",setup(m){const s=i(),t=u(),{t:o}=v(),{fields:r,validate:p,getFieldsDataToRequest:f,clearValues:h}=w([{key:"login",required:!0,validate:!0},{key:"password",required:!0,validate:!1}]),n=b(""),g=()=>{if(p()){const a=f();s.login(a.login,a.password).then(e=>{h(),t.push({name:"Main"})}).catch(e=>{n.value=e.response.data.message||e.message,console.error(e)})}};return(a,e)=>(_(),l("div",F,[d(x,{fields:c(r),errorMessage:n.value,onSubmit:g,buttonLabel:c(o)("functional_phrases.enter")},null,8,["fields","errorMessage","buttonLabel"])]))}},q={class:"container theme-light"},A={class:"auth-container"},B={__name:"AuthView",setup(m){const s=i(),t=u();return M(()=>{s.initializeUser()}),s.isAuthenticated&&t.push({name:"Main"}),(o,r)=>(_(),l("div",q,[k("div",A,[d(S)])]))}},N=V(B,[["__scopeId","data-v-12587641"]]);export{N as default};
