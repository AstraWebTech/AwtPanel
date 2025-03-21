import{_ as F,c as d,o as l,d as P,p as m,q as k,e,B as L,F as D,v as w,h as q,t as y,x as U,b as j,s as A,g as a,y as R,z as H,A as I,n as S,w as G,C as J,D as K,r as B,i as $,l as O,E as T}from"./index-CJeNF4k2.js";import{P as Q}from"./PreLoader-B77qGjXj.js";const W={class:"pagination"},X={__name:"PaginationButtons",props:{hook:{required:!0}},setup(v){const n=v,{totalPages:t,currentPage:r,visiblePages:i,prev:p,next:g,first:V,last:z,changePage:x}=n.hook;return(b,u)=>(l(),d("div",W,[P(L,{class:"first",onClick:e(V),disabled:e(r)<=3},{default:m(()=>u[0]||(u[0]=[k("<<")])),_:1},8,["onClick","disabled"]),P(L,{class:"prev",onClick:e(p),disabled:e(r)===1},{default:m(()=>u[1]||(u[1]=[k("<")])),_:1},8,["onClick","disabled"]),(l(!0),d(D,null,w(e(i),(f,h)=>(l(),q(L,{key:h,class:U(["page",{accent:e(r)===f}]),onClick:c=>e(x)(f)},{default:m(()=>[k(y(f),1)]),_:2},1032,["class","onClick"]))),128)),P(L,{class:"next",onClick:e(g),disabled:e(r)===e(t)},{default:m(()=>u[2]||(u[2]=[k(">")])),_:1},8,["onClick","disabled"]),P(L,{class:"last",onClick:e(z),disabled:e(r)>=e(t)-2},{default:m(()=>u[3]||(u[3]=[k(">>")])),_:1},8,["onClick","disabled"])]))}},Y=F(X,[["__scopeId","data-v-7d0a83f8"]]),Z=["placeholder"],ee={class:"tools"},te={class:"content"},ae=["onClick"],oe={key:0},se={class:"btns"},le={__name:"ViewListData",props:{hook:{},addBtn:{}},setup(v){const n=v,{t}=j(),{getList:r,deleteRecord:i,table:p,tableData:g,search:V,sort_column:z,sort_order:x,isLoading:b,isError:u,message:f,pagination:h}=n.hook(),{size:c}=h;r();const o=E=>{z.value===E.filterCode?x.value=x.value==="asc"?"desc":"asc":(z.value=E.filterCode,x.value="asc")},C=E=>{i(E).then(_=>{r()}).catch(_=>{console.error("e",_)})};return(E,_)=>{const N=A("router-link");return l(),d("section",null,[a("section",null,[a("header",null,[R(a("input",{type:"search",placeholder:e(t)("functional_phrases.search"),"onUpdate:modelValue":_[0]||(_[0]=s=>I(V)?V.value=s:null)},null,8,Z),[[H,e(V)]]),a("section",ee,[P(N,{to:v.addBtn},{default:m(()=>[P(L,{class:"accent icon"},{default:m(()=>[_[2]||(_[2]=a("i",null,"+",-1)),a("span",null,y(e(t)("functional_phrases.add_record")),1)]),_:1})]),_:1},8,["to"])])]),k(" "+y(n.hook.sort_column)+" ",1),a("section",te,[a("table",null,[a("thead",null,[a("tr",null,[(l(!0),d(D,null,w(e(g).headers,s=>(l(),d("th",{key:s.code,onClick:G(M=>o(s),["prevent","stop"])},[e(z)===s.filterCode?(l(),d("i",oe,[e(x)==="asc"?(l(),d(D,{key:0},[k("▲")],64)):(l(),d(D,{key:1},[k("▼")],64))])):S("",!0),k(" "+y(s.name),1)],8,ae))),128))])]),a("tbody",null,[(l(!0),d(D,null,w(e(g).rows,s=>(l(),d("tr",null,[(l(!0),d(D,null,w(e(g).headers,M=>(l(),d("td",null,[typeof s[M.code]=="object"&&s[M.code]?.router?(l(),q(N,{key:0,to:s[M.code].router},{default:m(()=>[k(y(s[M.code].title),1)]),_:2},1032,["to"])):(l(),d(D,{key:1},[k(y(s[M.code]),1)],64))]))),256)),a("td",null,[a("div",se,[P(L,{class:"icon",onClick:M=>C(s.id)},{default:m(()=>[a("span",null,y(e(t)("functional_phrases.delete")),1)]),_:2},1032,["onClick"]),P(N,{to:{name:v.addBtn.name,params:{id:s.id}}},{default:m(()=>[P(L,{class:"icon"},{default:m(()=>[a("span",null,y(e(t)("functional_phrases.edit")),1)]),_:1})]),_:2},1032,["to"])])])]))),256))])]),e(b)?(l(),q(Q,{key:0})):S("",!0)]),a("footer",null,[P(Y,{hook:e(h)},null,8,["hook"]),a("div",null,[a("span",null,y(e(t)("functional_phrases.show_by"))+": ",1),R(a("select",{"onUpdate:modelValue":_[1]||(_[1]=s=>I(c)?c.value=s:null)},_[3]||(_[3]=[K('<option value="10" data-v-cb6102a2>10</option><option value="20" data-v-cb6102a2>20</option><option value="30" data-v-cb6102a2>30</option><option value="40" data-v-cb6102a2>40</option><option value="50" data-v-cb6102a2>50</option><option value="70" data-v-cb6102a2>70</option><option value="100" data-v-cb6102a2>100</option>',7)]),512),[[J,e(c)]])])])])])}}},ce=F(le,[["__scopeId","data-v-cb6102a2"]]);function ne(v){const n=B(0),t=B(v.size),r=B(0),i=$(()=>Math.ceil(r.value/t.value)),p=$(()=>Math.floor(n.value/t.value)+1),g=$(()=>{const f=[];let c=Math.max(1,p.value-2),o=Math.min(i.value,p.value+2);o-c<4&&(c===1?o=Math.min(i.value,c+4):o===i.value&&(c=Math.max(1,o-4)));for(let C=c;C<=o;C++)f.push(C);return f});return{from:n,size:t,total:r,totalPages:i,currentPage:p,visiblePages:g,prev:()=>{n.value=p.value*t.value-t.value-t.value},next:()=>{n.value=p.value*t.value},first:()=>{n.value=0},last:()=>{n.value=(i.value-1)*t.value},changePage:f=>{n.value=f*t.value-t.value}}}function ie(){const v=B(""),n=B([]),t=B(""),r=B("name"),i=B("asc"),p=B(!0),{request:g,isLoading:V,isError:z,message:x}=O(),b=ne({size:10}),u=()=>new Promise((h,c)=>{g({method:"get",url:"http://localhost:3000/api/list",params:{table:v.value,sort_column:r.value,sort_order:i.value,...t.value&&{search:t.value},from:b.from.value,...b.size.value&&{size:b.size.value},enrich:p.value}}).then(o=>{n.value=o.data.data,b.total.value=o.data.total,h(o.data)}).catch(o=>{console.error("Error:",o),c(o)})}),f=h=>new Promise((c,o)=>{g({method:"delete",url:"http://localhost:3000/api/element",params:{table:v.value,id:h}}).then(C=>{c(C.data)}).catch(C=>{console.error("Error:",C),o(C)})});return T(()=>r.value+i.value+t.value,h=>{u()}),T(()=>b.from.value,h=>{u()}),{getList:u,deleteRecord:f,data:n,table:v,search:t,sort_column:r,sort_order:i,enrich:p,isLoading:V,isError:z,message:x,pagination:b}}export{ce as V,ie as u};
