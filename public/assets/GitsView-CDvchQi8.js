import{u as p,V as _}from"./useVueListData-Bs9FOAWS.js";import{i as f,j as g,h,e as k,o as L}from"./index-CJeNF4k2.js";import"./PreLoader-B77qGjXj.js";function V(){const{getList:r,deleteRecord:a,table:e,data:s,search:u,sort_column:t,sort_order:i,isLoading:n,isError:l,message:c,pagination:d}=p(),m=f(()=>({headers:[{name:g.global.t("parameters.url"),code:"url",filterCode:"url"}],rows:s.value.map(o=>({id:o.id,url:o.url}))}));return e.value="gits",t.value="url",{getList:r,deleteRecord:a,table:e,tableData:m,search:u,sort_column:t,sort_order:i,isLoading:n,isError:l,message:c,pagination:d}}const B={__name:"GitsView",setup(r){return(a,e)=>(L(),h(_,{hook:k(V),addBtn:{name:"GitForm"}},null,8,["hook"]))}};export{B as default};
