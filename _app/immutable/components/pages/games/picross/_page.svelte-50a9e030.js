var W=Object.defineProperty;var Z=(n,e,l)=>e in n?W(n,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):n[e]=l;var T=(n,e,l)=>(Z(n,typeof e!="symbol"?e+"":e,l),l);import{S as tt,i as et,s as lt,k as p,q as L,a as R,w as rt,l as g,m as b,r as $,h as c,c as B,x as ot,n as S,b as k,G as y,y as st,K as C,L as q,f as it,t as nt,z as at,M as O,N as V,O as P,e as N,p as d,u as G,B as ct}from"../../../../chunks/index-13fba489.js";import{N as ht}from"../../../../chunks/Navbar-d8336603.js";var z=(n=>(n.unClicked="unClicked",n.correct="correct",n.incorrect="incorrect",n))(z||{}),D=(n=>(n.goal="goal",n.death="death",n))(D||{});class ut{constructor(){T(this,"status");T(this,"type");this.status="unClicked",this.type=Math.random()<.5?"goal":"death"}getStatusChar(){return this.status=="incorrect"?"X":""}getStyle(){return this.status=="unClicked"?"box-unClicked":`box-${this.type}`}}class ft{constructor(e){T(this,"grid");T(this,"size");T(this,"column_positions");T(this,"row_positions");this.size=e;let l,o,r;this.grid=[];for(let t=1;t<=this.size;t++){this.grid[t]=[];for(let s=1;s<=this.size;s++)this.grid[t][s]=new ut}this.column_positions=[];for(let t=1;t<=this.size;t++)this.column_positions[t]=this.getPositionsInColumn(t);this.row_positions=[];for(let t=1;t<=this.size;t++)this.row_positions[t]=this.getPositionsInRow(t);l=0,o=0,r=0;for(let t=1;t<=10;t++)for(let s=0;s<=4;s++){let i=this.get_int(this.column_positions[t][s]),a=this.get_int(this.row_positions[t][s]);l+=i,i!==0&&(o+=1,r+=i),a!==0&&(o+=1,r+=a)}console.log(l),console.log(r/o),console.log(l*(r/o))}get_int(e){let l=parseInt(e);return isNaN(l)?0:l}at_id(e){return this.grid[e.y][e.x]}at(e,l){return this.grid[l][e]}setStatus(e,l){this.grid[e.y][e.x].status=l}getPositionsInColumn(e){let l=0,o=[];for(let r=1;r<=this.size;r++)this.grid[r][e].type==D.goal?l+=1:l!=0&&(o.push(l.toString()),l=0);for(l!=0&&o.push(l.toString()),o=o.reverse();o.length<5;)o.push("  ");return o}getPositionsInRow(e){let l=0,o=[];for(let r=1;r<=this.size;r++)this.grid[e][r].type==D.goal?l+=1:l!=0&&(o.push(l.toString()),l=0);for(l!=0&&o.push(l.toString()),o=o.reverse();o.length<5;)o.push("  ");return o}}class _t{constructor(e){T(this,"x");T(this,"y");let l=e.target.id.split("_");this.x=parseInt(l[0]),this.y=parseInt(l[1])}}function U(n,e,l){const o=n.slice();return o[8]=e[l],o[10]=l,o}function H(n,e,l){const o=n.slice();return o[8]=e[l],o[12]=l,o}function K(n,e,l){const o=n.slice();return o[8]=e[l],o[14]=l,o}function X(n,e,l){const o=n.slice();return o[8]=e[l],o[14]=l,o}function dt(n){let e,l,o=n[0].at(n[12],n[10]).getStatusChar()+"",r,t,s,i;return{c(){e=p("td"),l=p("button"),r=L(o),this.h()},l(a){e=g(a,"TD",{style:!0});var u=b(e);l=g(u,"BUTTON",{type:!0,id:!0,class:!0});var v=b(l);r=$(v,o),v.forEach(c),u.forEach(c),this.h()},h(){S(l,"type","button"),S(l,"id",n[12]+"_"+n[10]),S(l,"class",t="box "+n[0].at(n[12],n[10]).getStyle()+" svelte-1ifirk8"),d(e,"padding","0"),d(e,"border","1px solid #ccc")},m(a,u){k(a,e,u),y(e,l),y(l,r),s||(i=[C(l,"mousedown",n[1]),C(l,"mouseover",n[1]),C(l,"focus",n[5])],s=!0)},p(a,u){u&1&&o!==(o=a[0].at(a[12],a[10]).getStatusChar()+"")&&G(r,o),u&1&&t!==(t="box "+a[0].at(a[12],a[10]).getStyle()+" svelte-1ifirk8")&&S(l,"class",t)},d(a){a&&c(e),s=!1,V(i)}}}function pt(n){let e,l,o,r=Array(5),t=[];for(let s=0;s<r.length;s+=1)t[s]=Y(K(n,r,s));return{c(){e=p("td"),l=p("table"),o=p("tr");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=g(s,"TD",{style:!0});var i=b(e);l=g(i,"TABLE",{});var a=b(l);o=g(a,"TR",{});var u=b(o);for(let v=0;v<t.length;v+=1)t[v].l(u);u.forEach(c),a.forEach(c),i.forEach(c),this.h()},h(){d(e,"padding","0"),d(e,"border","1px solid #ccc"),d(e,"border-left","0px"),d(e,"border-top","0px")},m(s,i){k(s,e,i),y(e,l),y(l,o);for(let a=0;a<t.length;a+=1)t[a].m(o,null)},p(s,i){if(i&1){r=Array(5);let a;for(a=0;a<r.length;a+=1){const u=K(s,r,a);t[a]?t[a].p(u,i):(t[a]=Y(u),t[a].c(),t[a].m(o,null))}for(;a<t.length;a+=1)t[a].d(1);t.length=r.length}},d(s){s&&c(e),O(t,s)}}}function gt(n){let e;function l(t,s){return t[12]==0?mt:bt}let r=l(n)(n);return{c(){r.c(),e=N()},l(t){r.l(t),e=N()},m(t,s){r.m(t,s),k(t,e,s)},p(t,s){r.p(t,s)},d(t){r.d(t),t&&c(e)}}}function Y(n){let e,l,o=n[0].row_positions[n[10]][4-n[14]]+"",r;return{c(){e=p("td"),l=p("pre"),r=L(o),this.h()},l(t){e=g(t,"TD",{style:!0});var s=b(e);l=g(s,"PRE",{class:!0});var i=b(l);r=$(i,o),i.forEach(c),s.forEach(c),this.h()},h(){S(l,"class","svelte-1ifirk8"),d(e,"color","white"),d(e,"padding","5px"),d(e,"text-align","right")},m(t,s){k(t,e,s),y(e,l),y(l,r)},p(t,s){s&1&&o!==(o=t[0].row_positions[t[10]][4-t[14]]+"")&&G(r,o)},d(t){t&&c(e)}}}function bt(n){let e,l,o=Array(5),r=[];for(let t=0;t<o.length;t+=1)r[t]=F(X(n,o,t));return{c(){e=p("td"),l=p("table");for(let t=0;t<r.length;t+=1)r[t].c();this.h()},l(t){e=g(t,"TD",{style:!0});var s=b(e);l=g(s,"TABLE",{style:!0});var i=b(l);for(let a=0;a<r.length;a+=1)r[a].l(i);i.forEach(c),s.forEach(c),this.h()},h(){d(l,"margin","auto"),d(e,"padding","0"),d(e,"border","1px solid #ccc"),d(e,"border-left","0px"),d(e,"border-top","0px")},m(t,s){k(t,e,s),y(e,l);for(let i=0;i<r.length;i+=1)r[i].m(l,null)},p(t,s){if(s&1){o=Array(5);let i;for(i=0;i<o.length;i+=1){const a=X(t,o,i);r[i]?r[i].p(a,s):(r[i]=F(a),r[i].c(),r[i].m(l,null))}for(;i<r.length;i+=1)r[i].d(1);r.length=o.length}},d(t){t&&c(e),O(r,t)}}}function mt(n){let e;return{c(){e=p("td"),this.h()},l(l){e=g(l,"TD",{style:!0}),b(e).forEach(c),this.h()},h(){d(e,"padding","0"),d(e,"border","1px solid #ccc"),d(e,"border-left","0px"),d(e,"border-top","0px")},m(l,o){k(l,e,o)},p:ct,d(l){l&&c(e)}}}function F(n){let e,l,o,r=n[0].column_positions[n[12]][4-n[14]]+"",t;return{c(){e=p("tr"),l=p("td"),o=p("pre"),t=L(r),this.h()},l(s){e=g(s,"TR",{});var i=b(e);l=g(i,"TD",{style:!0});var a=b(l);o=g(a,"PRE",{class:!0});var u=b(o);t=$(u,r),u.forEach(c),a.forEach(c),i.forEach(c),this.h()},h(){S(o,"class","svelte-1ifirk8"),d(l,"color","white")},m(s,i){k(s,e,i),y(e,l),y(l,o),y(o,t)},p(s,i){i&1&&r!==(r=s[0].column_positions[s[12]][4-s[14]]+"")&&G(t,r)},d(s){s&&c(e)}}}function J(n){let e;function l(t,s){return t[10]==0?gt:t[12]==0?pt:dt}let r=l(n)(n);return{c(){r.c(),e=N()},l(t){r.l(t),e=N()},m(t,s){r.m(t,s),k(t,e,s)},p(t,s){r.p(t,s)},d(t){r.d(t),t&&c(e)}}}function Q(n){let e,l,o=Array(I+1),r=[];for(let t=0;t<o.length;t+=1)r[t]=J(H(n,o,t));return{c(){e=p("tr");for(let t=0;t<r.length;t+=1)r[t].c();l=R()},l(t){e=g(t,"TR",{});var s=b(e);for(let i=0;i<r.length;i+=1)r[i].l(s);l=B(s),s.forEach(c)},m(t,s){k(t,e,s);for(let i=0;i<r.length;i+=1)r[i].m(e,null);y(e,l)},p(t,s){if(s&3){o=Array(I+1);let i;for(i=0;i<o.length;i+=1){const a=H(t,o,i);r[i]?r[i].p(a,s):(r[i]=J(a),r[i].c(),r[i].m(e,l))}for(;i<r.length;i+=1)r[i].d(1);r.length=o.length}},d(t){t&&c(e),O(r,t)}}}function yt(n){let e,l,o,r,t,s,i,a,u,v,f,A;s=new ht({});let E=Array(I+1),m=[];for(let h=0;h<E.length;h+=1)m[h]=Q(U(n,E,h));return{c(){e=p("head"),l=p("title"),o=L("Picross"),r=R(),t=p("body"),rt(s.$$.fragment),i=R(),a=p("table");for(let h=0;h<m.length;h+=1)m[h].c();u=R(),this.h()},l(h){e=g(h,"HEAD",{});var w=b(e);l=g(w,"TITLE",{});var _=b(l);o=$(_,"Picross"),_.forEach(c),w.forEach(c),r=B(h),t=g(h,"BODY",{class:!0});var x=b(t);ot(s.$$.fragment,x),i=B(x),a=g(x,"TABLE",{class:!0});var M=b(a);for(let j=0;j<m.length;j+=1)m[j].l(M);M.forEach(c),x.forEach(c),u=B(h),this.h()},h(){S(a,"class","grid svelte-1ifirk8"),S(t,"class","svelte-1ifirk8")},m(h,w){k(h,e,w),y(e,l),y(l,o),k(h,r,w),k(h,t,w),st(s,t,null),y(t,i),y(t,a);for(let _=0;_<m.length;_+=1)m[_].m(a,null);k(h,u,w),v=!0,f||(A=[C(document.body,"contextmenu",q(n[2])),C(document.body,"dragstart",q(n[3])),C(document.body,"selectstart",q(n[4]))],f=!0)},p(h,[w]){if(w&3){E=Array(I+1);let _;for(_=0;_<E.length;_+=1){const x=U(h,E,_);m[_]?m[_].p(x,w):(m[_]=Q(x),m[_].c(),m[_].m(a,null))}for(;_<m.length;_+=1)m[_].d(1);m.length=E.length}},i(h){v||(it(s.$$.fragment,h),v=!0)},o(h){nt(s.$$.fragment,h),v=!1},d(h){h&&c(e),h&&c(r),h&&c(t),at(s),O(m,h),h&&c(u),f=!1,V(A)}}}let I=10;function vt(n,e,l){var o;(function(f){f[f.left=1]="left",f[f.right=2]="right"})(o||(o={}));let r=new ft(I);function t(){l(0,r)}async function s(f){let A=new _t(f),E=r.at_id(A);E.status==z.unClicked&&(f.buttons==o.left?r.setStatus(A,E.type==D.goal?z.correct:z.incorrect):f.buttons==o.right&&r.setStatus(A,E.type==D.death?z.correct:z.incorrect)),t()}function i(f){P.call(this,n,f)}function a(f){P.call(this,n,f)}function u(f){P.call(this,n,f)}function v(f){P.call(this,n,f)}return[r,s,i,a,u,v]}class Tt extends tt{constructor(e){super(),et(this,e,vt,yt,lt,{})}}export{Tt as default};
