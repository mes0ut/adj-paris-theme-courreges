!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).EmblaCarousel=t()}(this,(function(){"use strict";function n(n){return"number"==typeof n}function t(n){return"string"==typeof n}function e(n){return"boolean"==typeof n}function r(n){return"[object Object]"===Object.prototype.toString.call(n)}function o(n){return Math.abs(n)}function i(n){return Math.sign(n)}function c(n,t){return o(n-t)}function u(n){return l(n).map(Number)}function s(n){return n[a(n)]}function a(n){return Math.max(0,n.length-1)}function l(n){return Object.keys(n)}function d(n,t){return[n,t].reduce(((n,t)=>(l(t).forEach((e=>{const o=n[e],i=t[e],c=r(o)&&r(i);n[e]=c?d(o,i):i})),n)),{})}function f(n,t){return void 0!==t.MouseEvent&&n instanceof t.MouseEvent}function p(t,e){const r={start:function(){return 0},center:function(n){return o(n)/2},end:o};function o(n){return e-n}return{measure:function(o){return n(t)?e*Number(t):r[t](o)}}}function m(n,t){const e=o(n-t);function r(t){return t<n}function i(n){return n>t}function c(n){return r(n)||i(n)}return{length:e,max:t,min:n,constrain:function(e){return c(e)?r(e)?n:t:e},reachedAny:c,reachedMax:i,reachedMin:r,removeOffset:function(n){return e?n-e*Math.ceil((n-t)/e):n}}}function g(n,t,e){const{constrain:r}=m(0,n),i=n+1;let c=u(t);function u(n){return e?o((i+n)%i):r(n)}function s(){return c}function a(){return g(n,s(),e)}const l={get:s,set:function(n){return c=u(n),l},add:function(n){return a().set(s()+n)},clone:a};return l}function h(){let n=[];const t={add:function(e,r,o,i={passive:!0}){return e.addEventListener(r,o,i),n.push((()=>e.removeEventListener(r,o,i))),t},clear:function(){n=n.filter((n=>n()))}};return t}function x(n,t,r,u,s,a,l,d,p,g,x,y,v,b,S,w,E,D,M){const{cross:A}=n,I=["INPUT","SELECT","TEXTAREA"],O={passive:!1},P=h(),T=h(),F=m(50,225).constrain(S.measure(20)),z={mouse:300,touch:400},B={mouse:500,touch:600},L=w?43:25;let k=!1,H=0,R=0,N=!1,C=!1,V=!1,j=!1;function q(n){const e=l.readPoint(n),r=l.readPoint(n,A),o=c(e,H),i=c(r,R);if(!C&&!j){if(!n.cancelable)return U(n);if(C=o>i,!C)return U(n)}const u=l.pointerMove(n);o>E&&(V=!0),x.useFriction(.3).useDuration(1),p.start(),a.add(t.apply(u)),n.preventDefault()}function U(n){const e=y.byDistance(0,!1).index!==v.get(),r=l.pointerUp(n)*(w?B:z)[j?"mouse":"touch"],u=function(n,t){const e=v.add(-1*i(n)),r=y.byDistance(n,!w).distance;return w||o(n)<F?r:D&&t?.5*r:y.byIndex(e.get(),0).distance}(t.apply(r),e),s=function(n,t){if(0===n||0===t)return 0;if(o(n)<=o(t))return 0;const e=c(o(n),o(t));return o(e/n)}(r,u),a=L-10*s,d=M+s/50;C=!1,N=!1,T.clear(),x.useDuration(a).useFriction(d),g.distance(u,!w),j=!1,b.emit("pointerUp")}function W(n){V&&(n.stopPropagation(),n.preventDefault())}return{init:function(n,t){if(!t)return;function o(o){(e(t)||t(n,o))&&function(n){const t=f(n,s);if(j=t,t&&0!==n.button)return;if(function(n){const t=n.nodeName||"";return I.includes(t)}(n.target))return;V=w&&t&&!n.buttons&&k,k=c(a.get(),d.get())>=2,N=!0,l.pointerDown(n),x.useFriction(0).useDuration(0),a.set(d),function(){const n=j?u:r;T.add(n,"touchmove",q,O).add(n,"touchend",U).add(n,"mousemove",q,O).add(n,"mouseup",U)}(),H=l.readPoint(n),R=l.readPoint(n,A),b.emit("pointerDown")}(o)}const i=r;P.add(i,"dragstart",(n=>n.preventDefault()),O).add(i,"touchmove",(()=>{}),O).add(i,"touchend",(()=>{})).add(i,"touchstart",o).add(i,"mousedown",o).add(i,"touchcancel",U).add(i,"contextmenu",U).add(i,"click",W,!0)},pointerDown:function(){return N},destroy:function(){P.clear(),T.clear()}}}function y(n,t){let e,r;function i(n){return n.timeStamp}function c(e,r){const o="client"+("x"===(r||n.scroll)?"X":"Y");return(f(e,t)?e:e.touches[0])[o]}return{pointerDown:function(n){return e=n,r=n,c(n)},pointerMove:function(n){const t=c(n)-c(r),o=i(n)-i(e)>170;return r=n,o&&(e=n),t},pointerUp:function(n){if(!e||!r)return 0;const t=c(r)-c(e),u=i(n)-i(e),s=i(n)-i(r)>170,a=t/u;return u&&!s&&o(a)>.1?a:0},readPoint:c}}function v(n,t,r,o,i){let c,u,s=[],a=!1;function l(n){return i.measureSize(n.getBoundingClientRect())}return{init:function(i,d){if(!d)return;u=l(n),s=o.map(l),c=new ResizeObserver((c=>{a||(e(d)||d(i,c))&&function(e){for(const c of e){const e=c.target===n,a=o.indexOf(c.target);if((e?u:s[a])!==l(e?n:o[a])){r.requestAnimationFrame((()=>{i.reInit(),t.emit("resize")}));break}}}(c)})),[n].concat(o).forEach((n=>c.observe(n)))},destroy:function(){c&&c.disconnect(),a=!0}}}function b(n,t,e,r,i){const c=i.measure(10),u=i.measure(50),s=m(.1,.99);let a=!1;return{constrain:function(i){if(a||!n.reachedAny(e.get())||!n.reachedAny(t.get()))return;const l=n.reachedMin(t.get())?"min":"max",d=o(n[l]-t.get()),f=e.get()-t.get(),p=s.constrain(d/u);e.subtract(f*p),!i&&o(f)<c&&(e.set(n.constrain(e.get())),r.useDuration(25).useBaseFriction())},toggleActive:function(n){a=!n}}}function S(n,t,e,r){const o=m(-t+n,e[0]),i=e.map(o.constrain).map((n=>parseFloat(n.toFixed(3))));return{snapsContained:function(){if(t<=n)return[o.max];if("keepSnaps"===r)return i;const{min:e,max:c}=function(){const n=i[0],t=s(i),e=i.lastIndexOf(n),r=i.indexOf(t)+1;return m(e,r)}();return i.slice(e,c)}()}}function w(n,t,e,r){const o=t.min+.1,i=t.max+.1,{reachedMin:c,reachedMax:u}=m(o,i);return{loop:function(t){if(!function(n){return 1===n?u(e.get()):-1===n&&c(e.get())}(t))return;const o=n*(-1*t);r.forEach((n=>n.add(o)))}}}function E(n){const{max:t,length:e}=n;return{get:function(n){return(n-t)/-e}}}function D(n,t,e,r,c){const{reachedAny:u,removeOffset:s,constrain:a}=r;function l(n){return n.concat().sort(((n,t)=>o(n)-o(t)))[0]}function d(t,r){const o=[t,t+e,t-e];if(!n)return o[0];if(!r)return l(o);return l(o.filter((n=>i(n)===r)))}return{byDistance:function(e,r){const i=c.get()+e,{index:l,distance:f}=function(e){const r=n?s(e):a(e),i=t.map((n=>n-r)).map((n=>d(n,0))).map(((n,t)=>({diff:n,index:t}))).sort(((n,t)=>o(n.diff)-o(t.diff))),{index:c}=i[0];return{index:c,distance:r}}(i),p=!n&&u(i);return!r||p?{index:l,distance:e}:{index:l,distance:e+d(t[l]-f,0)}},byIndex:function(n,e){return{index:n,distance:d(t[n]-c.get(),e)}},shortcut:d}}function M(t){let e=t;function r(t){return n(t)?t:t.get()}return{get:function(){return e},set:function(n){e=r(n)},add:function(n){e+=r(n)},subtract:function(n){e-=r(n)}}}function A(n,t,e){const r="x"===n.scroll?function(n){return`translate3d(${n}px,0px,0px)`}:function(n){return`translate3d(0px,${n}px,0px)`},o=e.style;let i=!1;return{clear:function(){i||(o.transform="",e.getAttribute("style")||e.removeAttribute("style"))},to:function(n){i||(o.transform=r(t.apply(n)))},toggleActive:function(n){i=!n}}}function I(n,t,e,r,o,i,c,s,a){const l=u(o),d=u(o).reverse(),f=function(){const n=i[0]-1;return g(m(d,n),"end")}().concat(function(){const n=e-i[0]-1;return g(m(l,n),"start")}());function p(n,t){return n.reduce(((n,t)=>n-o[t]),t)}function m(n,t){return n.reduce(((n,e)=>p(n,t)>0?n.concat([e]):n),[])}function g(e,o){const i="start"===o,u=i?-r:r,l=c.findSlideBounds([u]);return e.map((e=>{const o=i?0:-r,c=i?r:0,u=l.filter((n=>n.index===e))[0][i?"end":"start"],d=M(-1),f=A(n,t,a[e]);return{index:e,location:d,translate:f,target:()=>s.get()>u?o:c}}))}return{canLoop:function(){return f.every((({index:n})=>p(l.filter((t=>t!==n)),e)<=.1))},clear:function(){f.forEach((n=>n.translate.clear()))},loop:function(){f.forEach((n=>{const{target:t,translate:e,location:r}=n,o=t();o!==r.get()&&(e.to(o),r.set(o))}))},loopPoints:f}}function O(n,t){let r,o=!1;return{init:function(i,c){c&&(r=new MutationObserver((n=>{o||(e(c)||c(i,n))&&function(n){for(const e of n)if("childList"===e.type){i.reInit(),t.emit("slidesChanged");break}}(n)})),r.observe(n,{childList:!0}))},destroy:function(){r&&r.disconnect(),o=!0}}}function P(n,t,e,r,o,i,c){const{removeOffset:u,constrain:s}=o,a=i?[0,t,-t]:[0],l=d(a,c);function d(t,o){const i=t||a,c=function(n){const t=n||0;return e.map((n=>m(.5,n-.5).constrain(n*t)))}(o);return i.reduce(((t,o)=>{const i=r.map(((t,r)=>({start:t-e[r]+c[r]+o,end:t+n-c[r]+o,index:r})));return t.concat(i)}),[])}return{check:function(n,t){const e=i?u(n):s(n);return(t||l).reduce(((n,t)=>{const{index:r,start:o,end:i}=t;return!n.includes(r)&&(o<e&&i>e)?n.concat([r]):n}),[])},findSlideBounds:d}}function T(t,e,r){const o=n(r);return{groupSlides:function(n){return o?function(n,t){return u(n).filter((n=>n%t==0)).map((e=>n.slice(e,e+t)))}(n,r):function(n){return u(n).reduce(((n,r)=>{const o=e.slice(s(n),r+1).reduce(((n,t)=>n+t),0);return!r||o>t?n.concat(r):n}),[]).map(((t,e,r)=>n.slice(t,r[e+1])))}(n)}}}function F(n,t,e,r,c,l,d,f){const{align:F,axis:z,direction:B,startIndex:L,inViewThreshold:k,loop:H,duration:R,dragFree:N,dragThreshold:C,slidesToScroll:V,skipSnaps:j,containScroll:q}=l,U=t.getBoundingClientRect(),W=e.map((n=>n.getBoundingClientRect())),$=function(n){const t="rtl"===n?-1:1;return{apply:function(n){return n*t}}}(B),G=function(n,t){const e="y"===n?"y":"x";return{scroll:e,cross:"y"===n?"x":"y",startEdge:"y"===e?"top":"rtl"===t?"right":"left",endEdge:"y"===e?"bottom":"rtl"===t?"left":"right",measureSize:function(n){const{width:t,height:r}=n;return"x"===e?t:r}}}(z,B),Q=G.measureSize(U),X=function(n){return{measure:function(t){return n*(t/100)}}}(Q),Y=p(F,Q),J=!H&&!!q,K=H||!!q,{slideSizes:Z,slideSizesWithGaps:_}=function(n,t,e,r,i,c){const{measureSize:u,startEdge:l,endEdge:d}=n,f=e[0]&&i,p=function(){if(!f)return 0;const n=e[0];return o(t[l]-n[l])}(),m=function(){if(!f)return 0;const n=c.getComputedStyle(s(r));return parseFloat(n.getPropertyValue(`margin-${d}`))}(),g=e.map(u),h=e.map(((n,t,e)=>{const r=!t,o=t===a(e);return r?g[t]+p:o?g[t]+m:e[t+1][l]-n[l]})).map(o);return{slideSizes:g,slideSizesWithGaps:h}}(G,U,W,e,K,c),nn=T(Q,_,V),{snaps:tn,snapsAligned:en}=function(n,t,e,r,i,c,u){const{startEdge:l,endEdge:d}=n,{groupSlides:f}=c,p=f(r).map((n=>s(n)[d]-n[0][l])).map(o).map(t.measure),m=r.map((n=>e[l]-n[l])).map((n=>-o(n))),g=function(){const n=s(m)-s(i);return f(m).map((n=>n[0])).map(((t,e,r)=>{const o=!e,i=e===a(r);return u&&o?0:u&&i?n:t+p[e]}))}();return{snaps:m,snapsAligned:g}}(G,Y,U,W,_,nn,J),rn=-s(tn)+s(_),{snapsContained:on}=S(Q,rn,en,q),cn=J?on:en,{limit:un}=function(n,t,e){const r=t[0];return{limit:m(e?r-n:s(t),r)}}(rn,cn,H),sn=g(a(cn),L,H),an=sn.clone(),ln=u(e),dn={update:()=>(({dragHandler:n,scrollBody:t,scrollBounds:e,scrollLooper:r,slideLooper:o,eventHandler:i,animation:c,options:{loop:u}})=>{const s=n.pointerDown();u||e.constrain(s);const a=t.seek().settled();a&&!s&&(c.stop(),i.emit("settle")),a||i.emit("scroll"),u&&(r.loop(t.direction()),o.loop())})(vn),render:n=>(({scrollBody:n,translate:t,location:e},r)=>{const o=n.velocity(),i=e.get()-o+o*r;t.to(i)})(vn,n),start:()=>f.start(vn),stop:()=>f.stop(vn)},fn=cn[sn.get()],pn=M(fn),mn=M(fn),gn=function(n,t,e,r){let c=!0,u=0,s=0,a=e,l=r;function d(n){return a=n,p}function f(n){return l=n,p}const p={direction:function(){return s},seek:function(){const e=t.get()-n.get();return l&&a?(u+=e/a,u*=l,n.add(u)):(u=0,n.set(t)),s=i(u||e),c=o(e)<.001,p},settled:function(){return c&&n.set(t),c},useBaseFriction:function(){return f(r)},useBaseDuration:function(){return d(e)},useFriction:f,useDuration:d,velocity:function(){return u}};return p}(pn,mn,R,.68),hn=D(H,cn,rn,un,mn),xn=function(n,t,e,r,o,i){function c(r){const c=r.distance,u=r.index!==t.get();c&&(n.start(),o.add(c)),u&&(e.set(t.get()),t.set(r.index),i.emit("select"))}return{distance:function(n,t){c(r.byDistance(n,t))},index:function(n,e){const o=t.clone().set(n);c(r.byIndex(o.get(),e))}}}(dn,sn,an,hn,mn,d),yn=P(Q,rn,Z,tn,un,H,k),vn={ownerDocument:r,ownerWindow:c,eventHandler:d,containerRect:U,slideRects:W,animation:dn,axis:G,direction:$,dragHandler:x(G,$,n,r,c,mn,y(G,c),pn,dn,xn,gn,hn,sn,d,X,N,C,j,.68),eventStore:h(),percentOfView:X,index:sn,indexPrevious:an,limit:un,location:pn,options:l,resizeHandler:v(t,d,c,e,G),scrollBody:gn,scrollBounds:b(un,pn,mn,gn,X),scrollLooper:w(rn,un,pn,[pn,mn]),scrollProgress:E(un),scrollSnaps:cn,scrollTarget:hn,scrollTo:xn,slideLooper:I(G,$,Q,rn,_,cn,yn,pn,e),slidesHandler:O(t,d),slidesInView:yn,slideIndexes:ln,slidesToScroll:nn,target:mn,translate:A(G,$,t)};return vn}const z={align:"center",axis:"x",container:null,slides:null,containScroll:null,direction:"ltr",slidesToScroll:1,breakpoints:{},dragFree:!1,dragThreshold:10,inViewThreshold:0,loop:!1,skipSnaps:!1,duration:25,startIndex:0,active:!0,watchDrag:!0,watchResize:!0,watchSlides:!0};function B(n){function t(n,t){return d(n,t||{})}const e={mergeOptions:t,optionsAtMedia:function(e){const r=e.breakpoints||{},o=l(r).filter((t=>n.matchMedia(t).matches)).map((n=>r[n])).reduce(((n,e)=>t(n,e)),{});return t(e,o)},optionsMediaQueries:function(t){return t.map((n=>l(n.breakpoints||{}))).reduce(((n,t)=>n.concat(t)),[]).map(n.matchMedia)}};return e}function L(n,e,r){const i=n.ownerDocument,c=i.defaultView,u=B(c),s=function(n){let t=[];return{init:function(e,r){return t=e.filter((({options:t})=>!1!==n.optionsAtMedia(t).active)),t.forEach((t=>t.init(r,n))),e.reduce(((n,t)=>Object.assign(n,{[t.name]:t})),{})},destroy:function(){t=t.filter((n=>n.destroy()))}}}(u),a=h(),l=h(),d=function(){const n={};let t;function e(t){return n[t]||[]}const r={init:function(n){t=n},emit:function(n){return e(n).forEach((e=>e(t,n))),r},off:function(t,o){return n[t]=e(t).filter((n=>n!==o)),r},on:function(t,o){return n[t]=e(t).concat([o]),r}};return r}(),{animationRealms:f}=L,{mergeOptions:p,optionsAtMedia:m,optionsMediaQueries:g}=u,{on:x,off:y,emit:v}=d,b=T;let S,w,E,D,M=!1,A=p(z,L.globalOptions),I=p(A),O=[];function P(e,r){if(M)return;const u=f.find((n=>n.window===c)),h=u||function(n){const t=1e3/60;let e=[],r=null,i=0,c=0;function u(s){r||(r=s);const a=s-r;for(r=s,i+=a;i>=t;)e.forEach((({animation:n})=>n.update())),i-=t;const l=o(i/t);e.forEach((({animation:n})=>n.render(l))),c&&n.requestAnimationFrame(u)}return{start:function(t){e.includes(t)||e.push(t),c||(c=n.requestAnimationFrame(u))},stop:function(t){e=e.filter((n=>n!==t)),e.length||(n.cancelAnimationFrame(c),r=null,i=0,c=0)},reset:function(){r=null,i=0},window:n}}(c);if(u||f.push(h),A=p(A,e),I=m(A),O=r||O,function(){const{container:e,slides:r}=I,o=t(e)?n.querySelector(e):e;E=o||n.children[0];const i=t(r)?E.querySelectorAll(r):r;D=[].slice.call(i||E.children)}(),S=F(n,E,D,i,c,I,d,h),g([A,...O.map((({options:n})=>n))]).forEach((n=>a.add(n,"change",T))),I.active){if(S.translate.to(S.location.get()),S.eventHandler.init(C),S.resizeHandler.init(C,I.watchResize),S.slidesHandler.init(C,I.watchSlides),l.add(i,"visibilitychange",(()=>{i.hidden&&h.reset()})),I.loop){if(!S.slideLooper.canLoop())return k(),P({loop:!1},r),void(A=p(A,{loop:!0}));S.slideLooper.loop()}E.offsetParent&&D.length&&S.dragHandler.init(C,I.watchDrag),w=s.init(O,C)}}function T(n,t){const e=N();k(),P(p({startIndex:e},n),t),d.emit("reInit")}function k(){S.dragHandler.destroy(),S.animation.stop(),S.eventStore.clear(),S.translate.clear(),S.slideLooper.clear(),S.resizeHandler.destroy(),S.slidesHandler.destroy(),s.destroy(),a.clear(),l.clear()}function H(n){const t=S[n?"target":"location"].get(),e=I.loop?"removeOffset":"constrain";return S.slidesInView.check(S.limit[e](t))}function R(n,t,e){I.active&&!M&&(S.scrollBody.useBaseFriction().useDuration(t?0:I.duration),S.scrollTo.index(n,e||0))}function N(){return S.index.get()}const C={canScrollNext:function(){return S.index.add(1).get()!==N()},canScrollPrev:function(){return S.index.add(-1).get()!==N()},containerNode:function(){return E},internalEngine:function(){return S},destroy:function(){M||(M=!0,a.clear(),k(),d.emit("destroy"))},off:y,on:x,emit:v,plugins:function(){return w},previousScrollSnap:function(){return S.indexPrevious.get()},reInit:b,rootNode:function(){return n},scrollNext:function(n){R(S.index.add(1).get(),!0===n,-1)},scrollPrev:function(n){R(S.index.add(-1).get(),!0===n,1)},scrollProgress:function(){return S.scrollProgress.get(S.location.get())},scrollSnapList:function(){return S.scrollSnaps.map(S.scrollProgress.get)},scrollTo:R,selectedScrollSnap:N,slideNodes:function(){return D},slidesInView:H,slidesNotInView:function(n){const t=H(n);return S.slideIndexes.filter((n=>!t.includes(n)))}};return P(e,r),setTimeout((()=>d.emit("init")),0),C}return L.animationRealms=[],L.globalOptions=void 0,L}));

!function(n,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o():"function"==typeof define&&define.amd?define(o):(n="undefined"!=typeof globalThis?globalThis:n||self).EmblaCarouselAutoplay=o()}(this,(function(){"use strict";const n={active:!0,breakpoints:{},delay:4e3,jump:!1,playOnInit:!0,stopOnInteraction:!0,stopOnMouseEnter:!1,stopOnLastSnap:!1,rootNode:null};function o(t={}){let e,i,s,r=0,a=!1;function p(){i.off("pointerDown",s),e.stopOnInteraction||i.off("pointerUp",u),d(),r=0}function l(n){d(),void 0!==n&&(a=n),r=window.setTimeout(c,e.delay)}function d(){r&&window.clearTimeout(r)}function u(){r&&(d(),l())}function c(){const{index:n}=i.internalEngine(),o=i.scrollSnapList().length-1;if(e.stopOnLastSnap&&n.get()===o)return p();i.canScrollNext()?i.scrollNext(a):i.scrollTo(0,a),l()}return{name:"autoplay",options:t,init:function(r,c){i=r;const{mergeOptions:f,optionsAtMedia:y}=c,O=f(n,o.globalOptions),m=f(O,t);e=y(m),a=e.jump,s=e.stopOnInteraction?p:d;const{eventStore:g,ownerDocument:b,ownerWindow:w}=i.internalEngine(),h=i.rootNode(),v=e.rootNode&&e.rootNode(h)||h;i.on("pointerDown",s),e.stopOnInteraction||i.on("pointerUp",u),e.stopOnMouseEnter&&(g.add(v,"mouseenter",s),e.stopOnInteraction||g.add(v,"mouseleave",u)),g.add(b,"visibilitychange",(()=>{if("hidden"===b.visibilityState)return d();u()})),g.add(w,"pagehide",(n=>{n.persisted&&d()})),e.playOnInit&&l()},destroy:p,play:l,stop:d,reset:u}}return o.globalOptions=void 0,o}));

/**
 * Utils: Animate
 * ------------------------------------------------------------------------------
 *
 * @namespace animate
 */

function animate() {
  function scrollTrigger(selector, options = {}) {
    let els = document.querySelectorAll(selector)
    els = Array.from(els)
    els.forEach(el => {
      // Passing the options object to the addObserver function
      addObserver(el, options)
    })
  }

  // Receiving options passed from the scrollTrigger function
  function addObserver(el, options) {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          let delay = parseInt(entry.target.dataset.animateDelay) || 0;
          if(document.querySelector('body').classList.contains('animate--none')){
            delay = 0;
          }
          setTimeout(() => {
            entry.target.classList.add('animated')
            observer.unobserve(entry.target)
          }, delay);
        }
      })
    }, options) // Passing the options object to the observer
    observer.observe(el)
  }

  function init() {
    scrollTrigger('.animate', {
      rootMargin: '-100px'
    })
  }

  if (window.designMode.enabled === 'true') {
    document.addEventListener('shopify:section:load', () => {
      init()
    })
  }

  /**
 * Expose public interface
 */
    return Object.freeze({
    init,
  });
};

document.addEventListener('DOMContentLoaded', function () {
  animate().init();
});

/**
 * Utilss: Cookies
 * ------------------------------------------------------------------------------
 *
 * @namespace cookies
 */

/**
 * Set a cookie.
 * @param {cname} string - Cookie name.
 * @param {cvalue} string - Cookie value.
 * @param {exdays} Int - Number of days until Cookie expires.
 */


function cookies() {

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

    /**
   * Check is a cookie exists.
   * @param {cname} string - Cookie name.
   */
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

}

document.addEventListener('DOMContentLoaded', function () {
  cookies();
});

/**
 * Set a cookie.
 * @param {cname} string - Cookie name.
 * @param {cvalue} string - Cookie value.
 * @param {exdays} Int - Number of days until Cookie expires.
 */
 function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

  /**
 * Check is a cookie exists.
 * @param {cname} string - Cookie name.
 */
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
class CustomDrawer extends HTMLElement {
  constructor() {
    super();

    this.closeButton = this.querySelector('.drawer__close');
    this.overlay = this.querySelector('.drawer__overlay');

    this.addEventListener('keyup', (evt) => {
      if (evt.code === 'Escape') {
        this.close();
      }
    });

    this.overlay?.addEventListener('click', this.close.bind(this));
    this.closeButton?.addEventListener('click', this.close.bind(this));
  }

  connectedCallback() {
    if (this.hasAttribute('data-move-to-body')) {
      const existingDrawers = document.querySelectorAll(`[id="${this.id}"]:not([data-move-to-body])`);
      
      existingDrawers.forEach((modal) => {
        modal.remove();
      });

      this.removeAttribute('data-move-to-body');
      
      document.body.appendChild(this);
    }
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(() => {
      this.classList.add('animate', 'active');
    });

    this.addEventListener(
      'transitionend',
      () => {
        const containerToTrapFocusOn = this.classList.contains('is-empty')
          ? this.querySelector('.drawer__inner-empty')
          : document.getElementById('CartDrawer');
        const focusElement =
          this.querySelector('.drawer__inner') ||
          this.querySelector('.drawer__close');
        trapFocus(containerToTrapFocusOn, focusElement);
      },
      {once: true},
    );

    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

if (!customElements.get('custom-drawer')) {
  customElements.define('custom-drawer', CustomDrawer);
}
class CustomDrawerTrigger extends HTMLButtonElement {
  constructor() {
    super();

    this.drawer = document.querySelector(this.dataset.drawerTarget);

    this.addEventListener('click', (event) => {
      event.preventDefault();

      this.drawer?.open(this);
    });

    this.addEventListener('keydown', (event) => {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();

        this.drawer?.open(this);
      }
    });
  }
}

if (!customElements.get('custom-drawer-trigger')) {
  customElements.define('custom-drawer-trigger', CustomDrawerTrigger, { extends: 'button' });
}
class HeaderDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector('details');
    this.menuDrawer = this.querySelector('#menu-drawer');
    this.menuDrawerBackdrop = this.querySelector('#menu-drawer-backdrop');
    this.container = document.querySelector('.header-wrapper');

    if (navigator.platform === 'iPhone')
      document.documentElement.style.setProperty(
        '--viewport-height',
        `${window.innerHeight}px`,
      );

    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();

    if (this.querySelector('.closer')) {
      this.querySelector('.closer').addEventListener('click', (e) => {
        this.closeMenuDrawer(e);
      });
    }

    if (this.querySelector('.closer-desktop')) {
      this.querySelector('.closer-desktop').addEventListener('click', (e) => {
        this.closeMenuDrawer(e);
      });
    }

    this.menuDrawerBackdrop.addEventListener('click', (event) => {
      this.closeMenuDrawer(event);
    });
  }

  bindEvents() {
    this.querySelectorAll('summary').forEach((summary) => {
      summary.addEventListener('click', this.onSummaryClick.bind(this));
    });
    this.querySelectorAll('button').forEach((button) =>
      button.addEventListener('click', this.onCloseButtonClick.bind(this)),
    );
  }

  onKeyUp(event) {
    if (event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if (!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle
      ? this.closeMenuDrawer(
          event,
          this.mainDetailsToggle.querySelector('summary'),
        )
      : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event) {
    const summaryElement = event.currentTarget;
    const detailsElement = summaryElement.parentNode;
    const parentMenuElement = detailsElement.closest('.has-submenu');
    const isOpen = detailsElement.hasAttribute('open');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function addTrapFocus() {
      trapFocus(
        summaryElement.nextElementSibling,
        detailsElement.querySelector('button'),
      );
      summaryElement.nextElementSibling.removeEventListener(
        'transitionend',
        addTrapFocus,
      );
    }

    if (detailsElement === this.mainDetailsToggle) {
      if (isOpen) {
        event.preventDefault();
      }
      isOpen
        ? this.closeMenuDrawer(event, summaryElement)
        : this.openMenuDrawer(summaryElement);
    } else {
      setTimeout(() => {
        detailsElement.classList.add('menu-opening');
        summaryElement.setAttribute('aria-expanded', true);
        parentMenuElement && parentMenuElement.classList.add('submenu-open');
        !reducedMotion || reducedMotion.matches
          ? addTrapFocus()
          : summaryElement.nextElementSibling.addEventListener(
              'transitionend',
              addTrapFocus,
            );
      }, 100);
    }
  }

  updateHeaderElements() {
    const headerPosition = this.container.getBoundingClientRect();
    this.menuDrawer.style.marginTop = `-${headerPosition.top}px`;
    this.menuDrawerBackdrop.style.marginTop = `-${headerPosition.top}px`;
  }

  openMenuDrawer(summaryElement) {
    this.updateHeaderElements();
    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });
    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden`);
  }

  closeMenuDrawer(event, elementToFocus = false) {
    if (event === undefined) return;

    this.mainDetailsToggle.classList.remove('menu-opening');
    this.mainDetailsToggle.querySelectorAll('details').forEach((details) => {
      details.removeAttribute('open');
      details.classList.remove('menu-opening');
    });
    this.mainDetailsToggle
      .querySelectorAll('.submenu-open')
      .forEach((submenu) => {
        submenu.classList.remove('submenu-open');
      });
    document.body.classList.remove(`overflow-hidden`);
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);
  }

  onFocusOut(event) {
    setTimeout(() => {
      if (
        this.mainDetailsToggle.hasAttribute('open') &&
        !this.mainDetailsToggle.contains(document.activeElement)
      ) {
        this.closeMenuDrawer();
      }
    });
  }

  onCloseButtonClick(event) {
    const detailsElement = event.currentTarget.closest('details');
    this.closeSubmenu(detailsElement);
  }

  closeSubmenu(detailsElement) {
    const parentMenuElement = detailsElement.closest('.submenu-open');
    parentMenuElement && parentMenuElement.classList.remove('submenu-open');
    detailsElement.classList.remove('menu-opening');
    detailsElement
      .querySelector('summary')
      .setAttribute('aria-expanded', false);
    removeTrapFocus(detailsElement.querySelector('summary'));
    this.closeAnimation(detailsElement);
  }

  closeAnimation(detailsElement) {
    let animationStart;

    const handleAnimation = (time) => {
      if (animationStart === undefined) {
        animationStart = time;
      }

      const elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement.removeAttribute('open');
        if (detailsElement.closest('details[open]')) {
          trapFocus(
            detailsElement.closest('details[open]'),
            detailsElement.querySelector('summary'),
          );
        }
      }
    };

    window.requestAnimationFrame(handleAnimation);
  }
}

customElements.define('header-drawer', HeaderDrawer);

class MenuDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector('details');

    if (navigator.platform === 'iPhone')
      document.documentElement.style.setProperty(
        '--viewport-height',
        `${window.innerHeight}px`,
      );

    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();

    if (this.querySelector('.closer')) {
      this.querySelector('.closer').addEventListener('click', (e) => {
        this.closeMenuDrawer(e);
      });
    }

    if (this.querySelector('.closer-desktop')) {
      this.querySelector('.closer-desktop').addEventListener('click', (e) => {
        this.closeMenuDrawer(e);
      });
    }
  }

  bindEvents() {
    this.querySelectorAll('summary').forEach((summary) => {
      summary.addEventListener('click', this.onSummaryClick.bind(this));
    });
    this.querySelectorAll('button').forEach((button) =>
      button.addEventListener('click', this.onCloseButtonClick.bind(this)),
    );
  }

  onKeyUp(event) {
    if (event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if (!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle
      ? this.closeMenuDrawer(
          event,
          this.mainDetailsToggle.querySelector('summary'),
        )
      : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event) {
    const summaryElement = event.currentTarget;
    const detailsElement = summaryElement.parentNode;
    const parentMenuElement = detailsElement.closest('.has-submenu');
    const isOpen = detailsElement.hasAttribute('open');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function addTrapFocus() {
      trapFocus(
        summaryElement.nextElementSibling,
        detailsElement.querySelector('button'),
      );
      summaryElement.nextElementSibling.removeEventListener(
        'transitionend',
        addTrapFocus,
      );
    }

    if (detailsElement === this.mainDetailsToggle) {
      if (isOpen) {
        event.preventDefault();
      }
      isOpen
        ? this.closeMenuDrawer(event, summaryElement)
        : this.openMenuDrawer(summaryElement);
    } else {
      setTimeout(() => {
        detailsElement.classList.add('menu-opening');
        summaryElement.setAttribute('aria-expanded', true);
        parentMenuElement && parentMenuElement.classList.add('submenu-open');
        !reducedMotion || reducedMotion.matches
          ? addTrapFocus()
          : summaryElement.nextElementSibling.addEventListener(
              'transitionend',
              addTrapFocus,
            );
      }, 100);
    }
  }

  openMenuDrawer(summaryElement) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });
    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden`);
  }

  closeMenuDrawer(event, elementToFocus = false) {
    if (event === undefined) return;

    this.mainDetailsToggle.classList.remove('menu-opening');
    this.mainDetailsToggle.querySelectorAll('details').forEach((details) => {
      details.removeAttribute('open');
      details.classList.remove('menu-opening');
    });
    this.mainDetailsToggle
      .querySelectorAll('.submenu-open')
      .forEach((submenu) => {
        submenu.classList.remove('submenu-open');
      });
    document.body.classList.remove(`overflow-hidden`);
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);
  }

  onFocusOut(event) {
    setTimeout(() => {
      if (
        this.mainDetailsToggle.hasAttribute('open') &&
        !this.mainDetailsToggle.contains(document.activeElement)
      ) {
        this.closeMenuDrawer();
      }
    });
  }

  onCloseButtonClick(event) {
    const detailsElement = event.currentTarget.closest('details');
    this.closeSubmenu(detailsElement);
  }

  closeSubmenu(detailsElement) {
    const parentMenuElement = detailsElement.closest('.submenu-open');
    parentMenuElement && parentMenuElement.classList.remove('submenu-open');
    detailsElement.classList.remove('menu-opening');
    detailsElement
      .querySelector('summary')
      .setAttribute('aria-expanded', false);
    removeTrapFocus(detailsElement.querySelector('summary'));
    this.closeAnimation(detailsElement);
  }

  closeAnimation(detailsElement) {
    let animationStart;

    const handleAnimation = (time) => {
      if (animationStart === undefined) {
        animationStart = time;
      }

      const elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement.removeAttribute('open');
        if (detailsElement.closest('details[open]')) {
          trapFocus(
            detailsElement.closest('details[open]'),
            detailsElement.querySelector('summary'),
          );
        }
      }
    };

    window.requestAnimationFrame(handleAnimation);
  }
}

customElements.define('menu-drawer', MenuDrawer);

class ModalDialog extends HTMLElement {
  constructor() {
    super();

    if (this.querySelectorAll('[id^="ModalClose-"]').length > 0) {
      this.querySelectorAll('[id^="ModalClose-"]').forEach((closeBtn) => {
        closeBtn.addEventListener('click', this.hide.bind(this, false));
      });
    }

    if (this.querySelector('[id^="ModalCloseNoThanks-"]')) {
      this.querySelector('[id^="ModalCloseNoThanks-"]').addEventListener(
        'click',
        this.hide.bind(this, false),
      );
    }

    this.addEventListener('keyup', this.onKeyUp.bind(this));


    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (
          event.pointerType === 'mouse' &&
          !event.target.closest('deferred-media, product-model')
        ) {
          this.hide();
        }
      });
    } else {
      this.addEventListener('click', (event) => {
        if (event.target === this) this.hide();
      });
    }
  }

  connectedCallback() {
    if (this.hasAttribute('data-move-to-body')) {
      const existingModals = document.querySelectorAll(`[id="${this.id}"]:not([data-move-to-body])`);
      
      existingModals.forEach((modal) => {
        modal.remove();
      });

      this.removeAttribute('data-move-to-body');
      
      document.body.appendChild(this);
    }
  }

  onKeyUp(event) {
    if (event.code.toUpperCase() === 'ESCAPE') {
      this.hide();
    }
  }

  show(opener) {
    this.openedBy = opener;
    const popup = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    if (popup) popup.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
    window.pauseAllMedia();
    VideoAutoplay?.muteAllMedia();
  }

  hide() {
    this.openedBy = opener;
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    this.removeAttribute('open');
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
    VideoAutoplay?.muteAllMedia();

    if (typeof this.removeForm === 'function') {
      this.removeForm();
    }
  }
}
customElements.define('modal-dialog', ModalDialog);

/* ============================================================================
  Social Feed Modal - Extends default Popup
============================================================================== */
class SocialFeedPopup extends ModalDialog {
  constructor() {
    super();
    this.activePost;
    this.videoPlaying = false;

    this.addEventListener('click', (e) => {
      if (e.target.closest('.js-sm-feed-popup-left-arrow'))
        this.switchSlides('left');
      if (e.target.closest('.js-sm-feed-popup-right-arrow'))
        this.switchSlides('right');
    });
  }

  show(opener) {
    // Temporarily disable pauseAllMedia
    const originalPauseAllMedia = window.pauseAllMedia;
    window.pauseAllMedia = () => {};

    super.show(opener);
    const postId = opener.getAttribute('data-post-id');
    if (postId === 'post-placeholder') return;
    this.setActivePost(postId);

    // Restore pauseAllMedia after a short delay
    setTimeout(() => {
      window.pauseAllMedia = originalPauseAllMedia;
    }, 100);
  }

  hide() {
    this.pauseVideo();
    super.hide();
  }

  setActivePost(postId) {
    const relevantPost = this.querySelector(`[data-post-id="${postId}"]`);
    if (!relevantPost) return;
    if (this.activePost) this.activePost.classList.remove('is-active');
    relevantPost.classList.add('is-active');
    this.activePost = relevantPost;
    this.playVideo();
  }

  playVideo() {
    const video = this.activePost.querySelector('video');
    if (!video) return;

    // Set video properties to ensure continuous playback
    video.loop = true;
    video.muted = false;
    video.playsInline = true;

    // Add event listeners to handle playback issues
    video.addEventListener('pause', () => {
      if (this.videoPlaying) {
        video.play();
      }
    });

    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play();
    });

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.videoPlaying = true;
        })
        .catch(error => {
          // If autoplay fails, try playing muted
          video.muted = true;
          video.play().then(() => {
            this.videoPlaying = true;
          });
        });
    }
  }

  pauseVideo() {
    const video = this.activePost.querySelector('video');
    if (!video) return;
    this.videoPlaying = false;
    video.pause();
  }

  switchSlides(direction = 'right') {
    const newPost =
      direction === 'left'
        ? this.activePost.previousElementSibling
        : this.activePost.nextElementSibling;

    this.pauseVideo();

    this.activePost.classList.remove('is-active');
    newPost.classList.add('is-active');
    this.activePost = newPost;

    this.playVideo();
  }
}

customElements.define('social-feed-popup', SocialFeedPopup);

/* ============================================================================
  Gallery Viewer Modal - Extends default Popup
============================================================================== */
class GalleryViewer extends ModalDialog {
  constructor() {
    super();
    this.carousel = this.querySelector('embla-component');
  }

  setActiveImage(position) {
    setTimeout(() => {
      this.carousel.slideToIndex(position);
    }, 100);
  }
}

customElements.define('gallery-viewer', GalleryViewer);

/* ============================================================================
  Quick view modal - Extends default Popup
============================================================================== */
class ProductPopup extends ModalDialog {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['data-id'];
  }

  getForm(_handle, _url, _id) {
    const shopifyProductUrl = _url;
    fetch(shopifyProductUrl)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(res, 'text/html');
        let productForm = doc.querySelector('.product-popup-inner');
        const productPopup = document.querySelector('product-popup');
        productPopup.setAttribute('data-id', _id);
        const quickViewCard = document.querySelector(
          'product-popup .quick-view-card',
        );
        if (quickViewCard) quickViewCard.appendChild(productForm);
        quickViewCard.focus();

        quickViewCard
          .querySelector('[id^="popup-closer-"]')
          .addEventListener('click', () => {
            productPopup.hide();
          });
      })
      .catch((err) => {});
  }

  removeForm() {
    const quickViewCard = document.querySelector(
      'product-popup .quick-view-card',
    );
    if (quickViewCard) quickViewCard.lastElementChild.remove();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    let _id = this.getAttribute('data-id');
  }
}

customElements.define('product-popup', ProductPopup);

/* ============================================================================
  Modal Opener
============================================================================== */
class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('[id^="ModalOpenerBtn-"]');

    if (!button) return;

    // if keybaord has focused on the modal trigger
    button.addEventListener('keydown', (e) => {
      if(e.code == "Enter") {
        document.activeElement.click();
      }
    })

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.querySelector(this.getAttribute('data-modal'));
      if (!modal) return;

      // checking for the social feed popup that needs to show correct content
      if (modal.classList.contains('social-feed-popup')) {
        const postId = button.getAttribute('data-post-id');
        if (button.getAttribute('data-post-id') === 'post-placeholder') return;
        modal.setActivePost(postId);
      }

      // checking for the PDP gallery viewer that needs to show correct content
      if (modal.classList.contains('gallery-viewer')) {
        const imagePosition = +button.getAttribute('data-index');
        modal.setActiveImage(imagePosition);
      }

      // checking for the product quick view that needs to render correct form
      if (modal.classList.contains('product-popup')) {
        e.preventDefault();
        modal.getForm(
          this.getAttribute('data-handle'),
          this.getAttribute('data-quick-view-url'),
          this.getAttribute('data-id'),
        );
      }

      modal.show(button);
    });
  }
}
customElements.define('modal-opener', ModalOpener);

/* ============================================================================
  Deferred Media
============================================================================== */
class DeferredMedia extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return;
    poster.addEventListener('click', this.loadContent.bind(this));
  }

  loadContent(focus = true) {
    window.pauseAllMedia();
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      this.setAttribute('loaded', true);
      this.classList.add('is-active');
      const deferredElement = this.appendChild(
        content.querySelector('video, model-viewer, iframe'),
      );
      if (focus) deferredElement.focus();
      if (
        deferredElement.nodeName == 'VIDEO' &&
        deferredElement.getAttribute('autoplay')
      ) {
        // force autoplay for safari
        deferredElement.play();
      }

      this.addEventListeners();
    } else {
      this.toggleVideoStateHandler('PLAY');
      this.playVideo();
    }
  }

  addEventListeners() {
    const video = this.querySelector('video');
    video?.addEventListener('pause', (e) => {
      this.toggleVideoStateHandler('PAUSE', video);
    });

    video?.addEventListener('ended', (e) => {
      this.toggleVideoStateHandler('END', video);
    });
  }

  toggleVideoStateHandler(action, video) {
    if (action === 'PLAY') {
      this.classList.add('is-active');
    } else if (action === 'PAUSE' || action === 'END') {
      this.classList.remove('is-active');
    }
  }

  playVideo() {
    const type = this.getAttribute('data-type');
    if (type === 'youtube') {
      this.querySelector('.js-youtube')?.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*',);
    } else if (type == 'video') {
      this.querySelector('video')?.play();
    } else if (type == 'vimeo') {
      this.querySelector('.js-vimeo')?.contentWindow.postMessage('{"method":"play"}', '*');
    } else {
      console.error('No video type specified');
    }
  }
}

customElements.define('deferred-media', DeferredMedia);


/* ============================================================================
  Video Delay
============================================================================== */
class VideoDelayLoader extends HTMLElement {
  constructor() {
    super();
    this.loaded = false;
  }

  connectedCallback() {
    if (window.designMode.enabled === 'true') {
      this.loadContent();
    } else {
      this.scrollHandler = () => {
        if (this.loaded === false) {
          this.loadContent();
        }
        window.removeEventListener('scroll', this.scrollHandler);
      };
    }
    window.addEventListener('scroll', this.scrollHandler);
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', this.scrollHandler);

    document.addEventListener('DOMContentLoaded', () => {
      this.checkForceLoad();
    });
  }

  scrollHandler() {
    if (this.loaded === false) {
      this.loaded = true;
      this.loadContent();
    }
    window.removeEventListener('scroll', this.scrollHandler);
  }

  checkForceLoad() {
    setTimeout(() => {
      if (this.loaded === false) {
        this.loaded = true;
        this.loadContent();
      }
    }, 2400);
  }

  loadContent() {
    const template = this.querySelector('template');
    if (!template) return;

    const content = document.createElement('div');
    const videoElement = template.content.firstElementChild.cloneNode(true);

    if (videoElement) {
      this.addVideo(content, videoElement);
    }
  }

  addVideo(content, video) {
    this.appendChild(video);
    content.remove();
    video.play();
    this.loaded = true;
  }
}

customElements.define('video-delay-loader', VideoDelayLoader);

/* ============================================================================
  Video Delay
============================================================================== */
class VideoAutoplay extends HTMLElement {
  constructor() {
    super();
    this.video = this.querySelector('video');
    if (!this.video) return;

    this.sound = this.querySelector('.js-sound');
    if (!this.sound) return;

    this.sound.addEventListener('click', this.toggleSound.bind(this));

    this.play = this.querySelector('.js-play');
    if (!this.play) return;

    this.play.addEventListener('click', this.togglePlay.bind(this));
  }

  static muteAllMedia() {
    document.querySelectorAll('video-autoplay video').forEach((video) => {
      video.muted = true;
      video.classList.remove('is-active');
    });

    document.querySelectorAll('.js-sound').forEach((sound) => {
      sound.classList.remove('is-active');
    });
  }

  toggleSound() {
    this.muteOtherVideos();
    this.classList.toggle('is-active');
    this.video.muted = !this.video.muted;
    this.sound.classList.toggle('is-active');
  }

  togglePlay() {
    this.play.classList.toggle('is-active');
    this.video.paused ? this.video.play() : this.video.pause();
  }

  muteOtherVideos() {
    window.muteAllMedia();

    document.querySelectorAll('video-autoplay video').forEach((video) => {
      if (video !== this.video) {
        video.muted = true;
      }
    });

    document.querySelectorAll('.js-sound').forEach((sound) => {
      if (sound !== this.sound) {
        sound.classList.remove('is-active');
      }
    });
  }
}

customElements.define('video-autoplay', VideoAutoplay);


class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.swatches = this.querySelectorAll('.product-card-swatches .swatch');
    this.isTransitioning = false;
  }

  connectedCallback() {
    if (this.swatches) {
      this.swatches.forEach(swatch => {
        swatch.addEventListener('mouseover', (event) => {
          this.updateImage(event);
        });

        swatch.addEventListener('touchstart', (event) => {
          this.updateImage(event);
        });
      });
    }
  }

  updateImage(event) {
    if (this.isTransitioning) return;

    const template = event.target.querySelector('template');
    if (!template) return;

    const newImageElement = template.content.cloneNode(true).querySelector('img');
    if (!newImageElement) return;

    const currentImage = this.querySelector('.media > img:first-child');
    if (!currentImage) return;

    // Check if this is the same image as currently displayed
    if (currentImage.src === newImageElement.src) return;

    this.isTransitioning = true;

    // Update image source attributes
    currentImage.src = newImageElement.src;
    if (newImageElement.srcset) {
      currentImage.srcset = newImageElement.srcset;
    }

    this.isTransitioning = false;
  }
}

customElements.define('product-card', ProductCard);

if (!customElements.get('product-details-scroll-down')) {
  customElements.define(
    'product-details-scroll-down',
    class ProductDetailsScrollDown extends HTMLElement {
      constructor() {
        super();
        this.productInfo = document.querySelector('product-info');
      }

      connectedCallback() {
        this.addEventListener('click', this.handleClick.bind(this));
      }

      handleClick() {
        if (!this.productInfo) {
          return;
        }

        // Scroll to bottom of product info
        const productInfoTop = this.productInfo.getBoundingClientRect().top + window.pageYOffset;
        const scrollTarget = productInfoTop + this.productInfo.offsetHeight;

        window.scrollTo({
          top: scrollTarget,
          behavior: 'smooth'
        });
      }
    }
  );
}

if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.variantIdInput.disabled = false;
        this.form.querySelector('[name=id]').disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');
        this.submitButtonText = this.querySelector('[name="add"] > span');

        if (document.querySelector('cart-drawer'))
          this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id),
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this.handleErrorMessage(response.description);

              const soldOutMessage =
                this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButton.querySelector('span').classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
              window.location = window.routes.cart_url;
              return;
            }

            if (!this.error)
              publish(PUB_SUB_EVENTS.cartUpdate, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                cartData: response,
              });
            this.error = false;
            this.cart.renderContents(response);
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty'))
              this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
          });
      }

      toggleSubmitButton(disable = true, text) {
        if (disable) {
          this.submitButton.setAttribute('disabled', 'disabled');
          if (text) this.submitButtonText.textContent = window.variantStrings.soldOut;
        } else {
          this.submitButton.removeAttribute('disabled');
          this.submitButtonText.textContent = window.variantStrings.addToCart;
        }
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper ||
          this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage =
          this.errorMessage ||
          this.errorMessageWrapper.querySelector(
            '.product-form__error-message',
          );

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }

      get variantIdInput() {
        return this.form.querySelector('[name=id]');
      }
    },
  );
}

if (!customElements.get('product-info')) {
  customElements.define(
    'product-info',
    class ProductInfo extends HTMLElement {
      quantityInput = undefined;
      quantityForm = undefined;
      onVariantChangeUnsubscriber = undefined;
      cartUpdateUnsubscriber = undefined;
      abortController = undefined;
      pendingRequestUrl = null;
      preProcessHtmlCallbacks = [];
      postProcessHtmlCallbacks = [];

      constructor() {
        super();

        this.quantityInput = this.querySelector('.quantity__input');
      }

      connectedCallback() {
        this.initializeProductSwapUtility();

        this.onVariantChangeUnsubscriber = subscribe(
          PUB_SUB_EVENTS.optionValueSelectionChange,
          this.handleOptionValueChange.bind(this)
        );

        this.dispatchEvent(new CustomEvent('product-info:loaded', { bubbles: true }));
      }

      addPreProcessCallback(callback) {
        this.preProcessHtmlCallbacks.push(callback);
      }

      disconnectedCallback() {
        this.onVariantChangeUnsubscriber();
        this.cartUpdateUnsubscriber?.();
      }

      initializeProductSwapUtility() {
        this.postProcessHtmlCallbacks.push((newNode) => {
          window?.Shopify?.PaymentButton?.init();
          window?.ProductModel?.loadShopifyXR();
        });
      }

      handleOptionValueChange({ data: { event, target, selectedOptionValues, type, sectionId } }) {
        // Only handle events from variant selectors that belong to this product-info component
        if (sectionId !== this.dataset.section) return;
        const mediaGroup = this.getMediaGroupData(target);

        this.resetProductFormState();

        const productUrl = target.dataset.productUrl || this.pendingRequestUrl || this.dataset.url;
        this.pendingRequestUrl = productUrl;
        const shouldSwapProduct = this.dataset.url !== productUrl;
        const shouldFetchFullPage = this.dataset.updateUrl === 'true' && shouldSwapProduct;

        this.renderProductInfo({
          requestUrl: this.buildRequestUrlWithParams(productUrl, selectedOptionValues, shouldFetchFullPage),
          targetId: target.id,
          callback: shouldSwapProduct
            ? this.handleSwapProduct(productUrl, shouldFetchFullPage)
            : this.handleUpdateProductInfo(productUrl, type, mediaGroup),
        });
      }

      getMediaGroupData(target) {
        const mediaGroupData = target.dataset.mediaGroup;
        if (mediaGroupData === 'true' || mediaGroupData === true) {
          return true;
        }
        return false;
      }

      resetProductFormState() {
        const productForm = this.productForm;
        productForm?.toggleSubmitButton(true);
        productForm?.handleErrorMessage();
      }

      handleSwapProduct(productUrl, updateFullPage) {
        return (html) => {
          this.productModal?.remove();

          const selector = updateFullPage ? "product-info[id^='MainProduct']" : 'product-info';
          const variant = this.getSelectedVariant(html.querySelector(selector));
          this.updateURL(productUrl, variant?.id);

          if (updateFullPage) {
            document.querySelector('head title').innerHTML = html.querySelector('head title').innerHTML;

            HTMLUpdateUtility.viewTransition(
              document.querySelector('main'),
              html.querySelector('main'),
              this.preProcessHtmlCallbacks,
              this.postProcessHtmlCallbacks
            );
          } else {
            HTMLUpdateUtility.viewTransition(
              this,
              html.querySelector('product-info'),
              this.preProcessHtmlCallbacks,
              this.postProcessHtmlCallbacks
            );
          }
        };
      }

      renderProductInfo({ requestUrl, targetId, callback }) {
        this.abortController?.abort();
        this.abortController = new AbortController();

        fetch(requestUrl, { signal: this.abortController.signal })
          .then((response) => response.text())
          .then((responseText) => {
            this.pendingRequestUrl = null;
            const html = new DOMParser().parseFromString(responseText, 'text/html');
            callback(html);
          })
          .then(() => {
            // set focus to last clicked option value
            document.querySelector(`#${targetId}`)?.focus();
          })
          .catch((error) => {
            if (error.name === 'AbortError') {
              console.log('Fetch aborted by user');
            } else {
              console.error(error);
            }
          });
      }

      getSelectedVariant(productInfoNode) {
        const selectedVariant = productInfoNode.querySelector('variant-selects [data-selected-variant]')?.innerHTML;
        return !!selectedVariant ? JSON.parse(selectedVariant) : null;
      }

      buildRequestUrlWithParams(url, optionValues, shouldFetchFullPage = false) {
        const params = [];

        !shouldFetchFullPage && params.push(`section_id=${this.sectionId}`);

        if (optionValues.length) {
          params.push(`option_values=${optionValues.join(',')}`);
        }

        return `${url}?${params.join('&')}`;
      }

      updateOptionValues(html) {
        const variantSelects = html.querySelector('variant-selects');
        const variantRadios = html.querySelector('variant-radios');

        if (variantSelects) {
          HTMLUpdateUtility.viewTransition(this.variantSelectors, variantSelects, this.preProcessHtmlCallbacks);
        } else if (variantRadios) {
          HTMLUpdateUtility.viewTransition(this.variantSelectors, variantRadios, this.preProcessHtmlCallbacks);
        }
      }

      handleUpdateProductInfo(productUrl, type, mediaGroup) {
        return (html) => {
          const variant = this.getSelectedVariant(html);
          this.updateOptionValues(html);
          this.updateURL(productUrl, variant?.id);
          this.updateVariantInputs(variant?.id);
          this.updateStockMessage(variant?.id);
          this.updatePickupAvailability(variant?.id);
          if (mediaGroup) {
            this.updateMediaGroup(html);
          }

          if (!variant) {
            this.setUnavailable();
            return;
          }

          this.updateMedia(variant?.featured_media?.id, type, variant?.featured_media?.preview_image?.src);

          const updateSourceFromDestination = (id, shouldHide = (source) => false) => {
            const source = html.getElementById(`${id}-${this.sectionId}`);
            const destination = this.querySelector(`#${id}-${this.dataset.section}`);
            if (source && destination) {
              destination.innerHTML = source.innerHTML;
              destination.classList.toggle('hidden', shouldHide(source));
            }
          };

          updateSourceFromDestination('price');
          updateSourceFromDestination('StockMessage');
          updateSourceFromDestination('Sku', ({ classList }) => classList.contains('hidden'));

          this.productForm?.toggleSubmitButton(
            html.getElementById(`ProductSubmitButton-${this.sectionId}`)?.hasAttribute('disabled') ?? true,
            window.variantStrings.soldOut
          );
        };
      }

      updateVariantInputs(variantId) {
        this.querySelectorAll(
          `#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`
        ).forEach((productForm) => {
          const input = productForm.querySelector('input[name="id"]');
          input.value = variantId ?? '';
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      }

      updateURL(url, variantId) {
        this.querySelector('share-button')?.updateUrl(
          `${window.shopUrl}${url}${variantId ? `?variant=${variantId}` : ''}`
        );

        if (this.dataset.updateUrl === 'false') return;
        window.history.replaceState({}, '', `${url}${variantId ? `?variant=${variantId}` : ''}`);
      }

      setUnavailable() {
        this.productForm?.toggleSubmitButton(true, window.variantStrings.unavailable);

        const selectors = ['price', 'Inventory', 'Sku']
          .map((id) => `#${id}-${this.dataset.section}`)
          .join(', ');
        // Scope the query to this component only, not the entire document
        this.querySelectorAll(selectors).forEach(({ classList }) => classList.add('hidden'));
      }

      updateMedia(variantFeaturedMediaId, type, mediaSrc) {
        if (!variantFeaturedMediaId) return;
        let isStickyForm = false;
        if (type === 'fixed-cart') {
          isStickyForm = true;
        }

        let mediaId = `${this.sectionId}-${variantFeaturedMediaId}`;
        let mediaGroupId = `${this.sectionId}-${variantFeaturedMediaId}`;
        let mediaGallery = document.querySelector(
          `[id^="MediaGallery-${this.sectionId}"]`,
        );

        const eventSetActiveMedia = new CustomEvent('setActiveMediaTrigger', {
          bubbles: true,
          detail: {
            sectionId: this.sectionId,
            mediaId: mediaId,
            mediaGroupId: mediaGroupId,
            mediaGallery: mediaGallery,
            mediaSrc: mediaSrc,
            initialLoad: false,
            isStickyForm: isStickyForm,
          },
        });

        document.body.dispatchEvent(eventSetActiveMedia);
      }

      updateStockMessage(variantId) {
        this.StockMessage?.updateLowStockMessage(variantId);
      }

      updatePickupAvailability(variantId) {
        this.pickupAvailability?.fetchAvailability(variantId);
      }

      updateMediaGroup(html) {
        const mediaGroup = html.querySelector('media-gallery');
        this.mediaGallery.innerHTML = mediaGroup.innerHTML;
      }

      get mediaGallery() {
        return this.querySelector('media-gallery');
      }

      get StockMessage() {
        return this.querySelector('stock-message');
      }

      get productForm() {
        return this.querySelector(`product-form`);
      }

      get productModal() {
        return document.querySelector(`#ProductModal-${this.dataset.section}`);
      }

      get pickupAvailability() {
        return this.querySelector(`pickup-availability`);
      }

      get variantSelectors() {
        return this.querySelector('variant-selects') || this.querySelector('variant-radios');
      }

      get relatedProducts() {
        const relatedProductsSectionId = SectionId.getIdForSection(
          SectionId.parseId(this.sectionId),
          'related-products'
        );
        return document.querySelector(`product-recommendations[data-section-id^="${relatedProductsSectionId}"]`);
      }

      get sectionId() {
        return this.dataset.originalSection || this.dataset.section;
      }
    }
  );
}

class HTMLUpdateUtility {
  /**
   * Used to swap an HTML node with a new node.
   * The new node is inserted as a previous sibling to the old node, the old node is hidden, and then the old node is removed.
   *
   * The function currently uses a double buffer approach, but this should be replaced by a view transition once it is more widely supported https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
   */
  static viewTransition(oldNode, newContent, preProcessCallbacks = [], postProcessCallbacks = []) {
    preProcessCallbacks?.forEach((callback) => callback(newContent));

    const newNodeWrapper = document.createElement('div');
    HTMLUpdateUtility.setInnerHTML(newNodeWrapper, newContent.outerHTML);
    const newNode = newNodeWrapper.firstChild;

    // dedupe IDs
    const uniqueKey = Date.now();
    oldNode.querySelectorAll('[id], [form]').forEach((element) => {
      element.id && (element.id = `${element.id}-${uniqueKey}`);
      element.form && element.setAttribute('form', `${element.form.getAttribute('id')}-${uniqueKey}`);
    });

    oldNode.parentNode.insertBefore(newNode, oldNode);
    oldNode.style.display = 'none';

    postProcessCallbacks?.forEach((callback) => callback(newNode));

    setTimeout(() => oldNode.remove(), 500);
  }

  // Sets inner HTML and reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
  static setInnerHTML(element, html) {
    element.innerHTML = html;
    element.querySelectorAll('script').forEach((oldScriptTag) => {
      const newScriptTag = document.createElement('script');
      Array.from(oldScriptTag.attributes).forEach((attribute) => {
        newScriptTag.setAttribute(attribute.name, attribute.value);
      });
      newScriptTag.appendChild(document.createTextNode(oldScriptTag.innerHTML));
      oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
    });
  }
}

class StockMessage extends HTMLElement {
  constructor() {
    super();
    this.lowStockThreshold = +this.getAttribute('data-low-stock');
    this.lowStockWrapper = this.querySelector('.js-stock-message');
    this.variantsInventories;

    this.getVariantInventories();
  }

  getVariantInventories() {
    const variantsData = this.getAttribute('data-variants-inventory');
    if (!variantsData) return;
    this.variantsInventories = variantsData
      .split('/')
      .map((variant) => variant.split(','));
  }

  updateLowStockMessage(variantId) {
    const foundVariant = this.variantsInventories
      .filter((variant) => Number(variant[0]) === variantId)
      .flat();
    if (!foundVariant) return;
    const foundVariantInventory = Number(foundVariant[1]);

    if (
      foundVariantInventory < this.lowStockThreshold &&
      foundVariantInventory > 0
    ) {
      this.setAttribute('low-stock', '');
    } else {
      this.removeAttribute('low-stock');
    }
  }
}

customElements.define('stock-message', StockMessage);

class VariantSelects extends HTMLElement {
  constructor() {
    super();

    this.isStickyForm =
      this.getAttribute('data-is-sticky-cart') === 'true' ? true : false;

    this.mainFormRef = document.querySelector('[data-product-details]');
    if (this.mainFormRef)
      this.mainFormVariantsRef =
        this.mainFormRef.querySelector('variant-radios') ||
        this.mainFormRef.querySelector('variant-selects') ||
        null;
  }

  connectedCallback() {
    this.addEventListener('change', (event) => {
      const target = this.getInputForEventTarget(event.target);

      // Only proceed if the target belongs to this component instance
      if (!target) return;

      this.updateSelectionMetadata(event);

      publish(PUB_SUB_EVENTS.optionValueSelectionChange, {
        data: {
          event,
          target,
          selectedOptionValues: this.selectedOptionValues,
          type: this.formType,
          sectionId: this.dataset.section,
        },
      });
    });
  }

  updateSelectionMetadata({target}) {
    const {value, tagName} = target;

    if (tagName === 'SELECT' && target.selectedOptions.length) {
      Array.from(target.options)
        .find((option) => option.getAttribute('selected'))
        .removeAttribute('selected');
      target.selectedOptions[0].setAttribute('selected', 'selected');

      const swatchValue = target.selectedOptions[0].dataset.optionSwatchValue;
      const selectedDropdownSwatchValue = target
        .closest('.product-form__input')
        .querySelector('[data-selected-value] > .swatch');
      if (!selectedDropdownSwatchValue) return;
      if (swatchValue) {
        selectedDropdownSwatchValue.style.setProperty(
          '--swatch--background',
          swatchValue,
        );
        selectedDropdownSwatchValue.classList.remove('swatch--unavailable');
      } else {
        selectedDropdownSwatchValue.style.setProperty(
          '--swatch--background',
          'unset',
        );
        selectedDropdownSwatchValue.classList.add('swatch--unavailable');
      }

      selectedDropdownSwatchValue.style.setProperty(
        '--swatch-focal-point',
        target.selectedOptions[0].dataset.optionSwatchFocalPoint || 'unset',
      );
    } else if (tagName === 'INPUT' && target.type === 'radio') {
      const selectedSwatchValue = target
        .closest(`.product-form__input`)
        .querySelector('[data-selected-value]');
      if (selectedSwatchValue) selectedSwatchValue.innerHTML = value;
    }
  }

  getInputForEventTarget(target) {
    // Ensure the target element belongs to this component instance
    if (!this.contains(target)) {
      return null;
    }

    return target.tagName === 'SELECT' ? target.selectedOptions[0] : target;
  }

  get formType() {
    return this.getAttribute('data-form-type') || 'main';
  }

  get selectedOptionValues() {
    return Array.from(
      this.querySelectorAll('select option[selected], fieldset input:checked'),
    ).map(({dataset}) => dataset.optionValueId);
  }
}

customElements.define('variant-selects', VariantSelects);

function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'));

  if(summary.nextElementSibling.getAttribute('id')) {
    summary.setAttribute('aria-controls', summary.nextElementSibling.id);
  }

  summary.addEventListener('click', (event) => {
    event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  });

  if (summary.closest('header-drawer')) return;
  summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  if (elementToFocus) elementToFocus.focus();
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(":focus-visible");
} catch(e) {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  const navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN']
  let currentFocusedElement = null;
  let mouseClick = null;

  window.addEventListener('keydown', (event) => {
    if(navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });

  window.addEventListener('mousedown', (event) => {
    mouseClick = true;
  });

  window.addEventListener('focus', () => {
    if (currentFocusedElement) currentFocusedElement.classList.remove('focused');

    if (mouseClick) return;

    currentFocusedElement = document.activeElement;
    currentFocusedElement.classList.add('focused');

  }, true);
}

function loadInVideos() {
  const videos = document.querySelectorAll(".js-autoplay");

  if (videos.length === 0) return;

  videos.forEach(video => {
    video.addEventListener("timeupdate", () => {
      setTimeout(() => {
        video.classList.add("loaded");
      }, 50);
    }, { once: true });
  });
}

loadInVideos();

function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach((video) => {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach((video) => {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video:not(.js-autoplay)').forEach((video) => {
    video.pause();
  });
  document.querySelectorAll('product-model').forEach((model) => {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}

function muteAllMedia() {
  document.querySelectorAll('video-autoplay').forEach((video) => {
    video.muted = true;
  });
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;

  const openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;

  const summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.setAttribute('aria-expanded', false);
  summaryElement.focus();
}

class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true })

    this.isStickyForm = this.closest('sticky-cart') ? true : false;

    if(this.isStickyForm) {
      this.mainFormRef = document.querySelector('[data-product-details]');
      if(this.mainFormRef) this.mainFormQuantityRef = this.mainFormRef.querySelector('quantity-input input');
    } else {
      this.stickyFormRef = document.querySelector('sticky-cart');
      if(this.stickyFormRef) this.stickyFormQuantityRef = this.stickyFormRef.querySelector('quantity-input input');
    }

    this.querySelectorAll('button').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.value;

    if(event.target.name === 'plus') {
      this.input.stepUp()
      if(this.stickyFormQuantityRef) this.stickyFormQuantityRef.stepUp()
      if(this.mainFormQuantityRef) this.mainFormQuantityRef.stepUp()
    } else {
      this.input.stepDown()
      if(this.stickyFormQuantityRef) this.stickyFormQuantityRef.stepDown()
      if(this.mainFormQuantityRef) this.mainFormQuantityRef.stepDown()
    }

    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
  }
}

customElements.define('quantity-input', QuantityInput);

window.debounce = window.debounce || function(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
  };
}

/*
 * Shopify Common JS
 *
 */
if ((typeof window.Shopify) == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function(fn, scope) {
  return function() {
    return fn.apply(scope, arguments);
  }
};

Shopify.setSelectorByValue = function(selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function(target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on'+eventName, callback);
};

Shopify.postLink = function(path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function(country_domid, province_domid, options) {
  this.countryEl         = document.getElementById(country_domid);
  this.provinceEl        = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler,this));

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function() {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function(e) {
    var opt       = this.countryEl.options[this.countryEl.selectedIndex];
    var raw       = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },

  clearOptions: function(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};



function handleMenuStates() {
  const links = document.querySelectorAll('.js-menu-item-container');
  if(links.length < 1) return;

  links.forEach(link => link.addEventListener('mouseleave', e => {
    const activeEl = document.activeElement;
    if(activeEl && activeEl.closest('.js-list-menu')) activeEl.blur();
  }))
}

handleMenuStates();

/* ============================================================================
  Embla Extras
============================================================================== */
const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
  const scrollPrev = () => emblaApi.scrollPrev()
  const scrollNext = () => emblaApi.scrollNext()
  prevBtn.addEventListener('click', scrollPrev, false)
  nextBtn.addEventListener('click', scrollNext, false)

  return () => {
    prevBtn.removeEventListener('click', scrollPrev, false)
    nextBtn.removeEventListener('click', scrollNext, false)
  }
}

const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
  const togglePrevNextBtnsState = () => {
    if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled')
    else prevBtn.setAttribute('disabled', 'disabled')

    if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled')
    else nextBtn.setAttribute('disabled', 'disabled')
  }

  emblaApi
    .on('select', togglePrevNextBtnsState)
    .on('init', togglePrevNextBtnsState)
    .on('reInit', togglePrevNextBtnsState)

  return () => {
    prevBtn.removeAttribute('disabled')
    nextBtn.setAttribute('disabled', 'disabled')
  }
}

const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
  let dotNodes = []

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button aria-label="carousel pagination button" class="embla__dot" type="button"></button>')
      .join('')

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => emblaApi.scrollTo(index), false)
    })
  }

  const toggleDotBtnsActive = () => {
    const previous = emblaApi.previousScrollSnap()
    const selected = emblaApi.selectedScrollSnap()
    dotNodes[previous].classList.remove('embla__dot--selected')
    dotNodes[selected].classList.add('embla__dot--selected')
  }

  emblaApi
    .on('init', addDotBtnsWithClickHandlers)
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reInit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive)

  return () => {
    dotsNode.innerHTML = ''
  }
}

const addFactions = (emblaApi, fractions) => {
  // Function to update fractions text
  const updateFractionsText = () => {
    const selectedIndex = emblaApi.selectedScrollSnap() + 1; // +1 for 1-based index
    const totalSlides = emblaApi.slideNodes().length;
    if (fractions) {
      fractions.innerText = `${selectedIndex}/${totalSlides}`;
    }
  };

  if (emblaApi) {
    // Update fractions text initially
    updateFractionsText();

    // Listen for slide change events
    emblaApi.on('select', () => {
      updateFractionsText();
    });
  }
}

const addThumbBtnsClickHandlers = (emblaApiMain, emblaApiThumb) => {
  const slidesThumbs = emblaApiThumb.slideNodes()

  const scrollToIndex = slidesThumbs.map(
    (_, index) => () => emblaApiMain.scrollTo(index),
  )

  slidesThumbs.forEach((slideNode, index) => {
    slideNode.addEventListener('click', scrollToIndex[index], false)
  })

  return () => {
    slidesThumbs.forEach((slideNode, index) => {
      slideNode.removeEventListener('click', scrollToIndex[index], false)
    })
  }
}

const addToggleThumbBtnsActive = (emblaApiMain, emblaApiThumb) => {
  const slidesThumbs = emblaApiThumb.slideNodes()

  const toggleThumbBtnsState = () => {
    emblaApiThumb.scrollTo(emblaApiMain.selectedScrollSnap())
    const previous = emblaApiMain.previousScrollSnap()
    const selected = emblaApiMain.selectedScrollSnap()
    slidesThumbs[previous]?.classList.remove('embla-thumbs__slide--selected')
    slidesThumbs[selected]?.classList.add('embla-thumbs__slide--selected')
  }

  emblaApiMain.on('select', toggleThumbBtnsState)
  emblaApiThumb.on('init', toggleThumbBtnsState)

  return () => {
    const selected = emblaApiMain.selectedScrollSnap()
    slidesThumbs[selected].classList.remove('embla-thumbs__slide--selected')
  }
}

const setupProgressBar = (emblaApi, progressNode) => {
  const applyProgress = () => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    progressNode.style.transform = `translate3d(${progress * 100}%,0px,0px)`
  }

  const removeProgress = () => {
    progressNode.removeAttribute('style')
  }

  return {
    applyProgress,
    removeProgress,
  }
}

/* ============================================================================
  Embla Component
============================================================================== */

class EmblaComponent extends HTMLElement {
  constructor() {
    super();
    this.emblaApi;
    this.emblaApiThumbs;
    this.emblaNode = this.querySelector('.embla')
    this.emblaSlide = this.querySelectorAll('.embla__slide')
    this.emblaThumbs = this.querySelector('.embla-thumbs')
    this.viewportNode = this.querySelector('.embla__viewport')
    this.viewportNodeThumbs = this.querySelector('.embla-thumbs__viewport')
    this.prevBtn = this.querySelector('.embla__button--prev')
    this.nextBtn = this.querySelector('.embla__button--next')
    this.prevBtnThumbs = this.querySelector('.embla__button-thumb--prev')
    this.nextBtnThumbs = this.querySelector('.embla__button-thumb--next')
    this.dotsNode = this.querySelector('.embla__dots')
    this.fractions = this.querySelector('.embla-custom-fractions')
    this.progressNode = this.querySelector('.embla__progress__bar')
    this.options = this.returnConfig();
    this.optionsThumbs = this.returnThumbsConfig();
    this.pendingSlideIndex = undefined;

    if(this.emblaNode.getAttribute('data-active-on-click') == 'true') {
      this.activeOnClick();
    }

    if (window.designMode.enabled === 'true') {
      document.addEventListener('shopify:section:load', (event) => {
        this.init();
      })
    }
  }

  connectedCallback() {
    if (!this.emblaApi) {
      this.init();
    }
  }

  init() {
    this.initEmbla();
    this.handleSelect();
    this.emblaApi.on('select', () => this.handleSelect());
  }


  initEmbla() {
    const autoplay = this.emblaNode.getAttribute('data-autoplay') === 'true' ? [EmblaCarouselAutoplay(this.returnAutoplayConfig())] : null;

    this.emblaApi = EmblaCarousel(this.viewportNode, this.options, autoplay)

    if (this.viewportNodeThumbs) {
      this.emblaApiThumbs = EmblaCarousel(this.viewportNodeThumbs, this.optionsThumbs);
    }

    if(this.progressNode) {
      const { applyProgress, removeProgress } = setupProgressBar(
        this.emblaApi,
        this.progressNode,
      )

      this.emblaApi
        .on('init', applyProgress)
        .on('reInit', applyProgress)
        .on('scroll', applyProgress)
        .on('destroy', removeProgress)
    }

    if (this.prevBtn && this.nextBtn) {
      addPrevNextBtnsClickHandlers(
        this.emblaApi,
        this.prevBtn,
        this.nextBtn
      )

      addTogglePrevNextBtnsActive(
        this.emblaApi,
        this.prevBtn,
        this.nextBtn
      )
    }

    if (this.dotsNode) {
      addDotBtnsAndClickHandlers(
        this.emblaApi,
        this.dotsNode,
      )
    }

    if (this.fractions) {
      addFactions(
        this.emblaApi,
        this.fractions
      )
    }

    if (this.emblaApiThumbs) {
      addThumbBtnsClickHandlers(
        this.emblaApi,
        this.emblaApiThumbs
      )

      addToggleThumbBtnsActive(
        this.emblaApi,
        this.emblaApiThumbs
      )

      if (this.prevBtnThumbs && this.nextBtnThumbs) {
        addPrevNextBtnsClickHandlers(
          this.emblaApiThumbs,
          this.prevBtnThumbs,
          this.nextBtnThumbs
        )

        addTogglePrevNextBtnsActive(
          this.emblaApiThumbs,
          this.prevBtnThumbs,
          this.nextBtnThumbs
        )
      }

      if(this.emblaThumbs.getAttribute('data-change-slides-on-hover') === 'true') {
        const thumbSlides = this.querySelectorAll('.embla-thumbs__slide');

        if(thumbSlides.length > 0) thumbSlides.forEach(slide => {
          slide.addEventListener('mouseenter', e => {
            this.emblaApi.scrollTo(+slide.getAttribute('data-slide-index'))}
          )
        })
      }
    }

    if (this.pendingSlideIndex !== undefined) {
      this.emblaApi.scrollTo(this.pendingSlideIndex);
      this.pendingSlideIndex = undefined;
    }
  }

  returnConfig() {
    return {
      align: this.emblaNode.getAttribute('data-align') || 'center',
      loop: this.emblaNode.getAttribute('data-loop') === 'true' ? true : false,
      slidesToScroll: +this.emblaNode.getAttribute('data-slides-to-scroll') || 'auto',
      startIndex: +this.emblaNode.getAttribute('data-start-index') || 0,
      containScroll: 'trimSnaps',
      axis: this.emblaNode.getAttribute('data-axis') || 'x',
      duration: +this.emblaNode.getAttribute('data-duration') || 25,
      inViewThreshold: 1,
      watchDrag: this.emblaNode.getAttribute('data-enable-drag') === 'false' ? false : true,
      breakpoints: {
        ...this.returnBreakpoints()
      }
    }
  }

  returnAutoplayConfig() {
    return {
      delay: +this.emblaNode.getAttribute('data-autoplay-speed') || 4000
    }
  }

  returnThumbsConfig() {
    if(!this.viewportNodeThumbs) return;
    return {
      containScroll: 'keepSnaps',
      axis: this.emblaThumbs.getAttribute('data-axis') || 'x',
      dragFree: false,
      align: 'center'
    }
  }

  returnBreakpoints() {
    return {
      '(min-width: 990px)': this.emblaNode.getAttribute('data-desktop-vertical') === 'true' ? { axis: 'y' } : null,
    }
  }

  handleSelect() {
    this.setActiveSlide();
    this.emblaNode.setAttribute('data-active-slide', this.emblaApi.slidesInView(true))
    if(this.extraSlideEls) this.extraSlideEls.showExtraSlideEl(this.emblaApi.slidesInView(true))
    window.pauseAllMedia();
  }

  setActiveSlide() {
    this.emblaNode.querySelectorAll('.is-active')?.forEach(el => el.classList.remove('is-active'));
    this.emblaNode.querySelector(`[data-slide-index="${this.emblaApi.selectedScrollSnap()}"]`)?.classList.add('is-active');
  }

  restart() {
    this.initEmbla()
  }

  slideToIndex(index) {
    if (this.emblaApi) {
      this.emblaApi.scrollTo(index);
    }
  }

  activeOnClick() {
    this.emblaSlide.forEach(element => {
      element.addEventListener('click', () => {
        this.slideToIndex(element.dataset.slideIndex)
      })
    });
  }
}

customElements.define('embla-component', EmblaComponent);

class FreeShippingBar extends HTMLElement {
  constructor() {
    super();
    this.selectors = {
      wrapper: '.free-shipping__wrapper',
      bar: '.free-shipping__bar',
      fill: '.free-shipping__fill',
      diff: '.free-shipping__diff',
      diffTxt: '.free-shipping__inactive',
      successTxt: '.free-shipping__active',
    };

    this.load();

    if (window.designMode.enabled === 'true') {
      this.addEventListeners();
    }
  }

  load() {
    const nodeSelectors = {
      wrapper: this.querySelector(this.selectors.wrapper),
      bar: this.querySelector(this.selectors.bar),
      fill: this.querySelector(this.selectors.fill),
      diff: this.querySelector(this.selectors.diff),
      diffTxt: this.querySelector(this.selectors.diffTxt),
      successTxt: this.querySelector(this.selectors.successTxt),
    };

    if (!nodeSelectors.wrapper) {
      return;
    }

    // Get threshold
    let threshold = nodeSelectors.bar.dataset.threshold;
    threshold = threshold * 100;
    threshold = Math.round(threshold * (Shopify.currency.rate || 1));

    // Get current cart total
    let cartTotal = nodeSelectors.bar.dataset.total;
    cartTotal = Number(cartTotal);

    // Calculate percentage
    let percentage = Math.ceil((cartTotal / threshold) * 100);

    if (percentage > 100) {
      percentage = 100;
    }

    // Set bar width
    nodeSelectors.fill.style.width = percentage + '%';

    // Get the currency symbol
    const currency = this.querySelector(this.selectors.diff).dataset.currency;

    // Difference text
    let difference = threshold - cartTotal;
    difference = difference / 100;

    nodeSelectors.diffTxt.style.display = 'block';
    nodeSelectors.successTxt.style.display = 'none';

    let diffText = nodeSelectors.diffTxt.innerHTML;

    if (percentage >= 100) {
      nodeSelectors.successTxt.style.display = 'block';
      nodeSelectors.diffTxt.style.display = 'none';
    } else {
      diffText = diffText.replace('{diff}', currency + difference);
    }

    nodeSelectors.diffTxt.innerHTML = diffText;
    nodeSelectors.diff.style.opacity = '1';
  }

  addEventListeners() {
    document.addEventListener('shopify:section:load', (event) => {
      this.load();
    });

    document.addEventListener('shopify:cart:update', (event) => {
      this.load();
    });
  }
}

customElements.define('free-shipping-bar', FreeShippingBar);

class ProductRecommendations extends HTMLElement {
  observer = undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    this.initializeRecommendations();
  }

  initializeRecommendations() {
    this.observer?.unobserve(this);
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        // if (!entries[0].isIntersecting) return;
        observer.unobserve(this);
        this.loadRecommendations();
      },
      { rootMargin: '0px 0px 400px 0px' }
    );
    this.observer.observe(this);
  }

  loadRecommendations() {
    fetch(`${this.dataset.url}`)
      .then(response => response.text())
      .then(text => {
        const html = document.createElement('div');
        html.innerHTML = text;
        const recommendations = html.querySelector('product-recommendations');
        const carousel = this.querySelector('embla-component');

        if (recommendations?.innerHTML.trim().length) {
          this.innerHTML = recommendations.innerHTML;
        }

        if(carousel) {
          carousel.restart();
        }
      })
      .catch(e => {
        console.error(e);
      });
  }
}

customElements.define('product-recommendations', ProductRecommendations);
class RecentlyViewed extends HTMLElement {
  constructor() {
    super();

    this.container = this.querySelector('[data-recently-viewed-container]');
    this.sectionId = this.dataset.sectionId;
    this.maxItems = parseInt(this.dataset.maxItems) || 10;
    this.currentId = parseInt(this.dataset.currentId);
    this.storageKey = 'recently-viewed-ids';
  }

  async connectedCallback() {
    const stored = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    if (this.currentId) {
      const updated = [this.currentId, ...stored.filter(id => id !== this.currentId)];

      localStorage.setItem(this.storageKey, JSON.stringify(updated.slice(0, this.maxItems + 1)));
    }

    const idsToLoad = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
      .filter(id => id !== this.currentId)
      .slice(0, this.maxItems);

    if (idsToLoad.length === 0) {
      this.style.display = 'none';

      return;
    }

    const searchQuery = idsToLoad.map((id) => {
      return `id:${id}`;
    }).join(' OR ');

    const url = `${window.Shopify.routes.root}search?type=product&q=${encodeURIComponent(searchQuery)}&section_id=${this.sectionId}`;

    try {
      const response = await fetch(url);
      const html = await response.text();

      if (html && html.trim().length > 0) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const slides = doc.querySelectorAll('.embla__slide');

        if (slides.length > 0) {
          this.container.append(...slides);

          this.dispatchEvent(new CustomEvent('recently-viewed:ready'));
        } else {
          this.style.display = 'none';
        }
      }
    } catch (e) {
      console.error('Recently Viewed error:', e);

      this.style.display = 'none';
    }
  }
}

if (!customElements.get('recently-viewed')) {
  customElements.define('recently-viewed', RecentlyViewed);
}
class SideMenu extends HTMLElement {
  constructor() {
    super();
    const button = this.querySelector('.js-show-all');
    const menu = this.querySelector('.js-side-menu-links');

    if (!button) return;
    button.addEventListener('click', () => {
      this.classList.toggle('is-active');
    });
  }
}

customElements.define('side-menu', SideMenu);
class StickyCart extends HTMLElement {
  constructor() {
    super();
    this.initialLoad = true;
    this.stickyCartTrigger = document.querySelector('sticky-cart-trigger');
    this.body = document.querySelector('body');
    this.listReference = this.querySelector(`[js-sticky-cart="list-ref"]`);

    if (this.listReference) {
      this.listReference.addEventListener('click', (e) => {
        this.renderOptions();
      })
    }

    if(!this.stickyCartTrigger) return;

    this.addEventListener('transitionend', () => {
      if(!this.classList.contains('is-visible')) this.classList.remove('is-sticky')
    })

    this.initObserver();
  }

  static get observedAttributes() {
    return ['data-open'];
  }

  initObserver() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }

    const observer = new IntersectionObserver(this.handleStickyCart.bind(this), options)
    observer.observe(this.stickyCartTrigger)
  }

  handleStickyCart() {
    const triggerCoordsY = this.stickyCartTrigger.getBoundingClientRect().top

    if(triggerCoordsY < 0) {
      this.classList.add('is-sticky')
      this.classList.add('is-visible')
      this.body.style.paddingBottom = this.getBoundingClientRect().height + 'px';
    } else {
      this.classList.remove('is-visible')
      this.body.style.paddingBottom = '0px';
    }
  }

  renderOptions() {
    this.toggleAttribute('data-open');
    this.classList.toggle('is-open');
  }
}

customElements.define('sticky-cart', StickyCart);

class StickyCartTrigger extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('sticky-cart-trigger', StickyCartTrigger);
