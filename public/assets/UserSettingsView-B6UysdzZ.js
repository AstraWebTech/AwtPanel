import{_ as T,b,u as x,c as r,o as c,g as e,t as l,e as n,F as p,v as U,w as V,x as f,q as _,d as m,p as S,B as k,r as w,i as y,f as L,y as N,C as $}from"./index--Fm6cBuS.js";const I={class:"list"},M=["onClick"],A={class:"main"},D={__name:"ThemeSelect",setup(C){const{t:o}=b(),i=x(),d=["theme-light","theme-dark"];return(g,s)=>(c(),r("section",null,[e("h2",null,l(n(o)("subtitles.app_theme")),1),e("div",I,[(c(),r(p,null,U(d,t=>e("div",{class:f(["card",{active:n(i).getUserAppTheme===t}]),onClick:V(v=>n(i).setUserAppTheme(t),["prevent","stop"])},[e("div",{class:f(["preview",t])},[s[0]||(s[0]=e("aside",null,null,-1)),e("div",A,[m(k,null,{default:S(()=>[_(l(n(o)("misc_words.button")),1)]),_:1}),m(k,{class:"accent"},{default:S(()=>[_(l(n(o)("misc_words.button")),1)]),_:1}),e("a",null,l(n(o)("misc_words.link")),1)]),s[1]||(s[1]=e("footer",null,null,-1))],2),_(" "+l(t),1)],10,M)),64))])]))}},F=T(D,[["__scopeId","data-v-608d3954"]]),j={for:"language-select"},q=["value"],E={__name:"UserSettingsView",setup(C){const{t:o,locale:i,messages:d}=b(),g=x(),s=w(localStorage.getItem("lang")||"en"),t=w([]),v=y({get:()=>g.getUserLanguage,set:a=>{g.setUserLanguage(a),i.value=a}}),B=()=>{v.value=s.value};return L(()=>{t.value=Object.keys(d.value).map(a=>({name:d.value[a]?.languageName||a,code:a}))}),(a,h)=>(c(),r(p,null,[m(F),e("h2",null,l(n(o)("subtitles.language")),1),e("label",j,[N(e("select",{id:"language-select",onChange:B,"onUpdate:modelValue":h[0]||(h[0]=u=>s.value=u)},[(c(!0),r(p,null,U(t.value,u=>(c(),r("option",{key:u.code,value:u.code},l(u.name),9,q))),128))],544),[[$,s.value]])])],64))}};export{E as default};
