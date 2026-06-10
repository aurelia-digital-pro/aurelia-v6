"use strict";(()=>{var e={};e.id=274,e.ids=[274],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},6209:(e,t,n)=>{n.r(t),n.d(t,{config:()=>s,default:()=>d,routeModule:()=>l});var r={};n.r(r),n.d(r,{default:()=>u});var i=n(1802),o=n(7153),a=n(6249);async function u(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let{type:n,context:r}=e.body;return t.status(200).json({ideas:`
1. Build a private AI knowledge system
2. Create premium digital archives
3. Launch founder-only intelligence tools

Type: ${n}

Context:
${r||"No context"}
      `})}catch(e){return t.status(500).json({error:"Ideas engine failed"})}}let d=(0,a.l)(r,"default"),s=(0,a.l)(r,"config"),l=new i.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/ideas",pathname:"/api/ideas",bundlePath:"",filename:""},userland:r})},7153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},1802:(e,t,n)=>{e.exports=n(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var n=t(t.s=6209);module.exports=n})();