import{u as g,V as h}from"./useVueListData-DBTPEKpE.js";import{i as _,j as r,h as f,e as v,o as b}from"./index-RdVIZj0H.js";import"./PreLoader-BupgTWNZ.js";function k(){const{getList:o,deleteRecord:t,table:a,data:s,search:n,sort_column:l,sort_order:i,isLoading:m,isError:u,message:c,pagination:d}=g(),p=_(()=>({headers:[{name:r.global.t("parameters.name"),code:"name",filterCode:"name"},{name:r.global.t("parameters.user"),code:"login",filterCode:"login"},{name:r.global.t("parameters.host"),code:"host",filterCode:"host"}],rows:s.value.map(e=>({id:e.id,name:e.name,login:e.login,host:e.host}))}));return a.value="servers",{getList:o,deleteRecord:t,table:a,tableData:p,search:n,sort_column:l,sort_order:i,isLoading:m,isError:u,message:c,pagination:d}}const B={__name:"ServersView",setup(o){return(t,a)=>(b(),f(h,{hook:v(k),addBtn:{name:"ServersForm"}},null,8,["hook"]))}};export{B as default};
