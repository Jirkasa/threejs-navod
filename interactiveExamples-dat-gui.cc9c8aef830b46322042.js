(()=>{"use strict";var e,n={876:(e,n,o)=>{var t=o(9477);const i=document.createElement("canvas");i.classList.add("webgl-canvas");const a=new t.CP7({canvas:i});a.setPixelRatio(window.devicePixelRatio);const s=a,l=new class{constructor(){this.initialized=!1,this._activeExample=null,this._clock=new t.SUY(!1),this._tick=this._tick.bind(this),window.addEventListener("resize",this._resize.bind(this))}init(){s.setAnimationLoop(this._tick),this.initialized=!0}playExample(e){this.initialized&&(e.playButton.style.display="none",e.resetButton.style.display="flex",this.resetExample(),this._clock.start(),e.canvasContainer.appendChild(i),this._activeExample=e,this._resize(),e.initialized||(e.initialized=!0,e.onInit?.()),e.onPlay?.())}resetExample(){this._activeExample&&(this._clock.stop(),this._activeExample.playButton.style.display="flex",this._activeExample.resetButton.style.display="none",this._activeExample.canvasContainer.removeChild(i),this._activeExample.onReset?.(),this._activeExample=null)}_tick(){if(this._activeExample){const e=this._clock.getDelta(),n=this._clock.getElapsedTime();this._activeExample.onTick?.(e,n)}}_resize(){this._activeExample&&(this._activeExample.camera&&(this._activeExample.camera.aspect=this._activeExample.canvasContainer.clientWidth/this._activeExample.canvasContainer.clientHeight,this._activeExample.camera.updateProjectionMatrix()),s.setSize(this._activeExample.canvasContainer.clientWidth,this._activeExample.canvasContainer.clientHeight),s.setPixelRatio(Math.min(window.devicePixelRatio,2)),this._activeExample.onResize?.(this._activeExample.canvasContainer.clientWidth,this._activeExample.canvasContainer.clientHeight))}},r=class{constructor(e,n){this.initialized=!1,this.camera=n;const o=document.querySelector(`[data-example-id="${e}"]`);if(!o)throw new Error("Example element wasn't found");o.classList.add("interactive-example");const t=document.createElement("div");t.classList.add("interactive-example__header"),o.appendChild(t);const i=document.createElement("div");i.classList.add("interactive-example__icon"),i.innerHTML='\n            <svg>\n                <use xlink:href="../../static/img/icon-sprite.svg#icon-embed2"></use>\n            </svg>\n        ',t.appendChild(i);const a=document.createElement("button");a.classList.add("interactive-example__button"),a.innerHTML='\n            <svg>\n                <use xlink:href="../../static/img/icon-sprite.svg#icon-play"></use>\n            </svg>\n            <span>Spustit</span>\n        ',t.appendChild(a);const s=document.createElement("button");s.classList.add("interactive-example__button"),s.innerHTML='\n            <svg>\n                <use xlink:href="../../static/img/icon-sprite.svg#icon-spinner11"></use>\n            </svg>\n            <span>Resetovat</span>\n        ',s.style.display="none",t.appendChild(s);const r=document.createElement("div");r.classList.add("interactive-example__canvas-container"),o.appendChild(r),a.addEventListener("click",(()=>l.playExample(this))),s.addEventListener("click",(()=>l.resetExample())),this.playButton=a,this.resetButton=s,this.canvasContainer=r}get renderer(){return s}get canvas(){return i}};let c;const d=new t.cPb(45,1,.1,1e3),p=new r(1,d);p.onInit=()=>{c=new t.xsS;const e=new t.Kj0(new t._12(10,10),new t.vBJ({color:14606046}));e.rotation.x=.5*-Math.PI,c.add(e);const n=new t.Kj0(new t.DvJ(1,1,1),new t.vBJ({color:7923962}));n.position.y=.5,c.add(n);const o=new t.Kj0(new t.xo$(.5,12,8),new t.vBJ({color:16429688}));o.position.y=.5,o.position.z=-1.5,o.position.x=-1.5,c.add(o),d.position.y=2,d.position.z=3,d.lookAt(0,0,-1),c.add(d)},p.onTick=()=>{p.renderer.render(c,d)};var v=o(4376);let w,m;const h=new t.cPb(45,1,.1,1e3),x=new r(2,h);let u,_;x.onInit=()=>{w=new t.xsS;const e=new t.Kj0(new t._12(10,10),new t.vBJ({color:14606046}));e.rotation.x=.5*-Math.PI,w.add(e);const n=new t.Kj0(new t.DvJ(1,1,1),new t.vBJ({color:7923962}));n.position.y=.5,w.add(n);const o=new t.Kj0(new t.xo$(.5,12,8),new t.vBJ({color:16429688}));o.position.y=.5,o.position.z=-1.5,o.position.x=-1.5,w.add(o),h.position.y=2,h.position.z=3,h.lookAt(0,0,-1),w.add(h),m=new v.XS,x.canvasContainer.appendChild(m.domElement),m.domElement.classList.add("dat-gui")},x.onPlay=()=>{m.show(),m.open()},x.onReset=()=>{m.hide()},x.onTick=()=>{x.renderer.render(w,h)};const y=new t.cPb(45,1,.1,1e3);let C;const E=new r(3,y);let b,g;E.onInit=()=>{u=new t.xsS;const e=new t.Kj0(new t._12(10,10),new t.vBJ({color:14606046}));e.rotation.x=.5*-Math.PI,u.add(e),C=new t.Kj0(new t.DvJ(1,1,1),new t.vBJ({color:7923962})),C.position.y=.5,u.add(C);const n=new t.Kj0(new t.xo$(.5,12,8),new t.vBJ({color:16429688}));n.position.y=.5,n.position.z=-1.5,n.position.x=-1.5,u.add(n),y.position.y=2,y.position.z=3,y.lookAt(0,0,-1),u.add(y),_=new v.XS,E.canvasContainer.appendChild(_.domElement),_.domElement.classList.add("dat-gui"),_.add(C.position,"x").min(-4.5).max(4.5).step(.01)},E.onPlay=()=>{_.show(),_.open()},E.onReset=()=>{_.hide(),C.position.x=0;for(let e in _.__controllers)_.__controllers[e].updateDisplay()},E.onTick=()=>{E.renderer.render(u,y)};const k=new t.cPb(45,1,.1,1e3);let f,P;const j=new r(4,k);let J,z;j.onInit=()=>{b=new t.xsS;const e=new t.Kj0(new t._12(10,10),new t.vBJ({color:14606046}));e.rotation.x=.5*-Math.PI,b.add(e),f=new t.Kj0(new t.DvJ(1,1,1),new t.vBJ({color:7923962})),f.position.y=.5,b.add(f);const n=new t.Kj0(new t.xo$(.5,12,8),new t.vBJ({color:16429688}));n.position.y=.5,n.position.z=-1.5,n.position.x=-1.5,b.add(n),k.position.y=2,k.position.z=3,k.lookAt(0,0,-1),b.add(k),g=new v.XS,j.canvasContainer.appendChild(g.domElement),g.domElement.classList.add("dat-gui"),g.add(f.position,"x").min(-4.5).max(4.5).step(.01),P={cubeColor:7923962},g.addColor(P,"cubeColor").onChange((()=>{f.material.color.set(P.cubeColor)}))},j.onPlay=()=>{g.show(),g.open()},j.onReset=()=>{g.hide(),f.position.x=0,f.material.color.set(7923962),P.cubeColor=7923962;for(let e in g.__controllers)g.__controllers[e].updateDisplay()},j.onTick=()=>{j.renderer.render(b,k)};const B=new t.cPb(45,1,.1,1e3);let K,L;const S=new r(5,B);let I,D;S.onInit=()=>{J=new t.xsS;const e=new t.Kj0(new t._12(10,10),new t.vBJ({color:14606046}));e.rotation.x=.5*-Math.PI,J.add(e),K=new t.Kj0(new t.DvJ(1,1,1),new t.vBJ({color:7923962})),K.position.y=.5,J.add(K);const n=new t.Kj0(new t.xo$(.5,12,8),new t.vBJ({color:16429688}));n.position.y=.5,n.position.z=-1.5,n.position.x=-1.5,J.add(n),B.position.y=2,B.position.z=3,B.lookAt(0,0,-1),J.add(B),z=new v.XS,S.canvasContainer.appendChild(z.domElement),z.domElement.classList.add("dat-gui"),z.add(K.position,"x").min(-4.5).max(4.5).step(.01),L={cubeColor:7923962},z.addColor(L,"cubeColor").onChange((()=>{K.material.color.set(L.cubeColor)})),z.add(K,"visible")},S.onPlay=()=>{z.show(),z.open()},S.onReset=()=>{z.hide(),K.position.x=0,K.material.color.set(7923962),L.cubeColor=7923962,K.visible=!0;for(let e in z.__controllers)z.__controllers[e].updateDisplay()},S.onTick=()=>{S.renderer.render(J,B)};const R=new t.cPb(45,1,.1,1e3);let M,T,O;const A=new r(6,R);let $,H;A.onInit=()=>{I=new t.xsS;const e=new t.Kj0(new t._12(10,10),new t.vBJ({color:14606046}));e.rotation.x=.5*-Math.PI,I.add(e),M=new t.Kj0(new t.DvJ(1,1,1),new t.vBJ({color:7923962})),M.position.y=.5,I.add(M),O=new t.Kj0(new t.xo$(.5,12,8),new t.vBJ({color:16429688})),O.position.y=.5,O.position.z=-1.5,O.position.x=-1.5,I.add(O),R.position.y=2,R.position.z=3,R.lookAt(0,0,-1),I.add(R),D=new v.XS,A.canvasContainer.appendChild(D.domElement),D.domElement.classList.add("dat-gui"),D.add(M.position,"x").min(-4.5).max(4.5).step(.01),T={cubeColor:7923962},D.addColor(T,"cubeColor").onChange((()=>{M.material.color.set(T.cubeColor)})),D.add(M,"visible"),D.add(O.position,"x",[-1.5,0,1.5])},A.onPlay=()=>{D.show(),D.open()},A.onReset=()=>{D.hide(),M.position.x=0,M.material.color.set(7923962),T.cubeColor=7923962,M.visible=!0,O.position.x=-1.5;for(let e in D.__controllers)D.__controllers[e].updateDisplay()},A.onTick=()=>{A.renderer.render(I,R)};const X=new t.cPb(45,1,.1,1e3);let W,q,U;const Y=new r(7,X);Y.onInit=()=>{$=new t.xsS;const e=new t.Kj0(new t._12(10,10),new t.vBJ({color:14606046}));e.rotation.x=.5*-Math.PI,$.add(e),W=new t.Kj0(new t.DvJ(1,1,1),new t.vBJ({color:7923962})),W.position.y=.5,$.add(W),U=new t.Kj0(new t.xo$(.5,12,8),new t.vBJ({color:16429688})),U.position.y=.5,U.position.z=-1.5,U.position.x=-1.5,$.add(U),X.position.y=2,X.position.z=3,X.lookAt(0,0,-1),$.add(X),H=new v.XS,Y.canvasContainer.appendChild(H.domElement),H.domElement.classList.add("dat-gui"),H.add(W.position,"x").min(-4.5).max(4.5).step(.01),q={cubeColor:7923962},H.addColor(q,"cubeColor").onChange((()=>{W.material.color.set(q.cubeColor)})),H.add(W,"visible"),H.add(U.position,"x",[-1.5,0,1.5]).name("x pozice koule")},Y.onPlay=()=>{H.show(),H.open()},Y.onReset=()=>{H.hide(),W.position.x=0,W.material.color.set(7923962),q.cubeColor=7923962,W.visible=!0,U.position.x=-1.5;for(let e in H.__controllers)H.__controllers[e].updateDisplay()},Y.onTick=()=>{Y.renderer.render($,X)},l.init()}},o={};function t(e){var i=o[e];if(void 0!==i)return i.exports;var a=o[e]={exports:{}};return n[e](a,a.exports,t),a.exports}t.m=n,e=[],t.O=(n,o,i,a)=>{if(!o){var s=1/0;for(d=0;d<e.length;d++){for(var[o,i,a]=e[d],l=!0,r=0;r<o.length;r++)(!1&a||s>=a)&&Object.keys(t.O).every((e=>t.O[e](o[r])))?o.splice(r--,1):(l=!1,a<s&&(s=a));if(l){e.splice(d--,1);var c=i();void 0!==c&&(n=c)}}return n}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[o,i,a]},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={7063:0};t.O.j=n=>0===e[n];var n=(n,o)=>{var i,a,[s,l,r]=o,c=0;if(s.some((n=>0!==e[n]))){for(i in l)t.o(l,i)&&(t.m[i]=l[i]);if(r)var d=r(t)}for(n&&n(o);c<s.length;c++)a=s[c],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(d)},o=self.webpackChunkthreejs_navod=self.webpackChunkthreejs_navod||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))})();var i=t.O(void 0,[4376,9506],(()=>t(876)));i=t.O(i)})();