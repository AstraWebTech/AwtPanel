import{u as p,V as _}from"./useVueListData-CbgHOBUQ.js";import{i as g,j as f,h,e as k,o as D}from"./index-BvG_Gv8q.js";import"./PreLoader-C89deYui.js";function L(){const{getList:a,deleteRecord:r,table:e,data:t,search:n,sort_column:o,sort_order:i,isLoading:u,isError:l,message:d,pagination:c}=p(),m=g(()=>({headers:[{name:"ID",code:"id",filterCode:"id"},{name:f.global.t("parameters.user"),code:"login",filterCode:"login"}],rows:t.value.map(s=>({id:s.id,login:s.login}))}));return e.value="users",o.value="id",{getList:a,deleteRecord:r,table:e,tableData:m,search:n,sort_column:o,sort_order:i,isLoading:u,isError:l,message:d,pagination:c}}const w={__name:"UsersView",setup(a){return(r,e)=>(D(),h(_,{hook:k(L),addBtn:{name:"UserForm"}},null,8,["hook"]))}};export{w as default};
