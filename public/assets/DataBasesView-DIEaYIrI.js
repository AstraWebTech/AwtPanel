import{u as _,V as f}from"./useVueListData-BSv4gi96.js";import{i as h,j as a,h as b,e as g,o as D}from"./index-xR8ls4Er.js";import"./PreLoader-B0MkPfwg.js";function y(){const{getList:r,deleteRecord:s,table:t,data:o,search:n,sort_column:m,sort_order:l,isLoading:u,isError:d,message:i,pagination:p}=_(),c=h(()=>({headers:[{name:a.global.t("parameters.name"),code:"name",filterCode:"name"},{name:a.global.t("parameters.type"),code:"type",filterCode:"type_name"},{name:a.global.t("parameters.user"),code:"user",filterCode:"user"},{name:a.global.t("parameters.host"),code:"host",filterCode:"server_id"}],rows:o.value.map(e=>({id:e.id,name:e.name,type:e.type.name,user:e.user,host:e.host}))}));return t.value="databases",{getList:r,deleteRecord:s,table:t,tableData:c,search:n,sort_column:m,sort_order:l,isLoading:u,isError:d,message:i,pagination:p}}const L={__name:"DataBasesView",setup(r){return(s,t)=>(D(),b(f,{hook:g(y),addBtn:{name:"DatabasesForm"}},null,8,["hook"]))}};export{L as default};
