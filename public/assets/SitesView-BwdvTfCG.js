import{u as _,V as b}from"./useVueListData-Bs9FOAWS.js";import{i as f,j as a,h as g,e as h,o as v}from"./index-CJeNF4k2.js";import"./PreLoader-B77qGjXj.js";function k(){const{getList:t,deleteRecord:s,table:r,data:o,search:n,sort_column:l,sort_order:d,isLoading:i,isError:m,message:u,pagination:c}=_(),p=f(()=>({headers:[{name:a.global.t("parameters.name"),code:"name",filterCode:"name"},{name:a.global.t("parameters.url"),code:"url",filterCode:"url"},{name:a.global.t("parameters.server"),code:"server",filterCode:"server_id"},{name:a.global.t("parameters.database"),code:"database",filterCode:"database_id"}],rows:o.value.map(e=>({id:e.id,name:{title:e.name,router:{name:"SiteDetail",params:{id:e.id}}},url:e.url,server:e.server?.host||"-",database:e.database?.name||"-"}))}));return r.value="sites",{getList:t,deleteRecord:s,table:r,tableData:p,search:n,sort_column:l,sort_order:d,isLoading:i,isError:m,message:u,pagination:c}}const S={__name:"SitesView",setup(t){return(s,r)=>(v(),g(b,{hook:h(k),addBtn:{name:"SitesForm"}},null,8,["hook"]))}};export{S as default};
