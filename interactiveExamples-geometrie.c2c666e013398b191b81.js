(()=>{"use strict";var n,e={405:(n,e,o)=>{var t=o(9477);const s=document.createElement("canvas");s.classList.add("webgl-canvas");const i=new t.CP7({canvas:s});i.setPixelRatio(window.devicePixelRatio);const d=i,a=new class{constructor(){this.initialized=!1,this._activeExample=null,this._clock=new t.SUY(!1),this._tick=this._tick.bind(this),window.addEventListener("resize",this._resize.bind(this))}init(){d.setAnimationLoop(this._tick),this.initialized=!0}playExample(n){this.initialized&&(n.playButton.style.display="none",n.resetButton.style.display="flex",this.resetExample(),this._clock.start(),n.canvasContainer.appendChild(s),this._activeExample=n,this._resize(),n.initialized||(n.initialized=!0,n.onInit?.()),n.onPlay?.())}resetExample(){this._activeExample&&(this._clock.stop(),this._activeExample.playButton.style.display="flex",this._activeExample.resetButton.style.display="none",this._activeExample.canvasContainer.removeChild(s),this._activeExample.onReset?.(),this._activeExample=null)}_tick(){if(this._activeExample){const n=this._clock.getDelta(),e=this._clock.getElapsedTime();this._activeExample.onTick?.(n,e)}}_resize(){this._activeExample&&(this._activeExample.camera&&(this._activeExample.camera.aspect=this._activeExample.canvasContainer.clientWidth/this._activeExample.canvasContainer.clientHeight,this._activeExample.camera.updateProjectionMatrix()),d.setSize(this._activeExample.canvasContainer.clientWidth,this._activeExample.canvasContainer.clientHeight),d.setPixelRatio(Math.min(window.devicePixelRatio,2)),this._activeExample.onResize?.(this._activeExample.canvasContainer.clientWidth,this._activeExample.canvasContainer.clientHeight))}},w=class{constructor(n,e){this.initialized=!1,this.camera=e;const o=document.querySelector(`[data-example-id="${n}"]`);if(!o)throw new Error("Example element wasn't found");o.classList.add("interactive-example");const t=document.createElement("div");t.classList.add("interactive-example__header"),o.appendChild(t);const s=document.createElement("div");s.classList.add("interactive-example__icon"),s.innerHTML='\n            <svg>\n                <use xlink:href="../../static/img/icon-sprite.svg#icon-embed2"></use>\n            </svg>\n        ',t.appendChild(s);const i=document.createElement("button");i.classList.add("interactive-example__button"),i.innerHTML='\n            <svg>\n                <use xlink:href="../../static/img/icon-sprite.svg#icon-play"></use>\n            </svg>\n            <span>Spustit</span>\n        ',t.appendChild(i);const d=document.createElement("button");d.classList.add("interactive-example__button"),d.innerHTML='\n            <svg>\n                <use xlink:href="../../static/img/icon-sprite.svg#icon-spinner11"></use>\n            </svg>\n            <span>Resetovat</span>\n        ',d.style.display="none",t.appendChild(d);const w=document.createElement("div");w.classList.add("interactive-example__canvas-container"),o.appendChild(w),i.addEventListener("click",(()=>a.playExample(this))),d.addEventListener("click",(()=>a.resetExample())),this.playButton=i,this.resetButton=d,this.canvasContainer=w}get renderer(){return d}get canvas(){return s}};var c=o(9365);let p;const r=new t.cPb(45,1,.1,1e4);let l;const x=new w(1,r);let K;x.onInit=()=>{p=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});p.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),p.add(e),r.position.z=3,p.add(r);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);p.add(s)},x.onPlay=()=>{r.rotation.set(0,0,0),l=new c.z(r,x.canvasContainer),l.enableDamping=!0},x.onReset=()=>{l&&(l.dispose(),l=null),r.position.set(0,0,3)},x.onTick=()=>{l.update(),x.renderer.render(p,r)};const j=new t.cPb(45,1,.1,1e4);let v;const u=new w(2,j);let h;u.onInit=()=>{K=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});K.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),K.add(e),j.position.z=3,K.add(j);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);K.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,K.add(d)},u.onPlay=()=>{j.rotation.set(0,0,0),v=new c.z(j,u.canvasContainer),v.reset(),v.enableDamping=!0},u.onReset=()=>{v&&(v.dispose(),v=null),j.position.set(0,0,3)},u.onTick=()=>{v.update(),u.renderer.render(K,j)};const g=new t.cPb(45,1,.1,1e4);let m;const z=new w(3,g);let _;z.onInit=()=>{h=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});h.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),h.add(e),g.position.z=3,h.add(g);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);h.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,h.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,h.add(w)},z.onPlay=()=>{g.rotation.set(0,0,0),m=new c.z(g,z.canvasContainer),m.enableDamping=!0},z.onReset=()=>{m&&(m.dispose(),m=null),g.position.set(0,0,3)},z.onTick=()=>{m.update(),z.renderer.render(h,g)};const b=new t.cPb(45,1,.1,1e4);let M;const f=new w(4,b);let y;f.onInit=()=>{_=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});_.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),_.add(e),b.position.z=3,_.add(b);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);_.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,_.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,_.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,_.add(p)},f.onPlay=()=>{b.rotation.set(0,0,0),M=new c.z(b,f.canvasContainer),M.enableDamping=!0},f.onReset=()=>{M&&(M.dispose(),M=null),b.position.set(0,0,3)},f.onTick=()=>{M.update(),f.renderer.render(_,b)};const F=new t.cPb(45,1,.1,1e4);let P;const E=new w(5,F);let k;E.onInit=()=>{y=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});y.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),y.add(e),F.position.z=3,y.add(F);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);y.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,y.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,y.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,y.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,y.add(l)},E.onPlay=()=>{F.rotation.set(0,0,0),P=new c.z(F,E.canvasContainer),P.enableDamping=!0},E.onReset=()=>{P&&(P.dispose(),P=null),F.position.set(0,0,3)},E.onTick=()=>{P.update(),E.renderer.render(y,F)};const O=new t.cPb(45,1,.1,1e4);let C;const D=new w(6,O);let R;D.onInit=()=>{k=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});k.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),k.add(e),O.position.z=3,k.add(O);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);k.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,k.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,k.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,k.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,k.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,k.add(K)},D.onPlay=()=>{O.rotation.set(0,0,0),C=new c.z(O,D.canvasContainer),C.enableDamping=!0},D.onReset=()=>{C&&(C.dispose(),C=null),O.position.set(0,0,3)},D.onTick=()=>{C.update(),D.renderer.render(k,O)};const J=new t.cPb(45,1,.1,1e4);let I;const S=new w(7,J);let Q;S.onInit=()=>{R=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});R.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),R.add(e),J.position.z=3,R.add(J);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);R.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,R.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,R.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,R.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,R.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,R.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,R.add(v)},S.onPlay=()=>{J.rotation.set(0,0,0),I=new c.z(J,S.canvasContainer),I.enableDamping=!0},S.onReset=()=>{I&&(I.dispose(),I=null),J.position.set(0,0,3)},S.onTick=()=>{I.update(),S.renderer.render(R,J)};const B=new t.cPb(45,1,.1,1e4);let H;const T=new w(8,B);let W;T.onInit=()=>{Q=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});Q.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),Q.add(e),B.position.z=3,Q.add(B);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);Q.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,Q.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,Q.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,Q.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,Q.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,Q.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,Q.add(v);const u=new t.p7y([new t.FM8(.2,-.5),new t.FM8(.5,-.25),new t.FM8(.35,.25),new t.FM8(.2,.5)],12),h=new t.Kj0(u,n);h.position.x=10.5,Q.add(h)},T.onPlay=()=>{B.rotation.set(0,0,0),H=new c.z(B,T.canvasContainer),H.enableDamping=!0},T.onReset=()=>{H&&(H.dispose(),H=null),B.position.set(0,0,3)},T.onTick=()=>{H.update(),T.renderer.render(Q,B)};const V=new t.cPb(45,1,.1,1e4);let L;const $=new w(9,V);let U;$.onInit=()=>{W=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});W.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),W.add(e),V.position.z=3,W.add(V);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);W.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,W.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,W.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,W.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,W.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,W.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,W.add(v);const u=new t.p7y([new t.FM8(.2,-.5),new t.FM8(.5,-.25),new t.FM8(.35,.25),new t.FM8(.2,.5)],12),h=new t.Kj0(u,n);h.position.x=10.5,W.add(h);const g=new t.pQR(.5,1),m=new t.Kj0(g,n);m.position.x=12,W.add(m)},$.onPlay=()=>{V.rotation.set(0,0,0),L=new c.z(V,$.canvasContainer),L.enableDamping=!0},$.onReset=()=>{L&&(L.dispose(),L=null),V.position.set(0,0,3)},$.onTick=()=>{L.update(),$.renderer.render(W,V)};const A=new t.cPb(45,1,.1,1e4);let X;const q=new w(10,A);let Y;q.onInit=()=>{U=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});U.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),U.add(e),A.position.z=3,U.add(A);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);U.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,U.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,U.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,U.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,U.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,U.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,U.add(v);const u=new t.p7y([new t.FM8(.2,-.5),new t.FM8(.5,-.25),new t.FM8(.35,.25),new t.FM8(.2,.5)],12),h=new t.Kj0(u,n);h.position.x=10.5,U.add(h);const g=new t.pQR(.5,1),m=new t.Kj0(g,n);m.position.x=12,U.add(m);const z=new t._12(1,1),_=new t.Kj0(z,n);_.position.x=13.5,U.add(_)},q.onPlay=()=>{A.rotation.set(0,0,0),X=new c.z(A,q.canvasContainer),X.enableDamping=!0},q.onReset=()=>{X&&(X.dispose(),X=null),A.position.set(0,0,3)},q.onTick=()=>{X.update(),q.renderer.render(U,A)};const G=new t.cPb(45,1,.1,1e4);let N;const Z=new w(11,G);let nn;Z.onInit=()=>{Y=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});Y.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),Y.add(e),G.position.z=3,Y.add(G);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);Y.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,Y.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,Y.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,Y.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,Y.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,Y.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,Y.add(v);const u=new t.p7y([new t.FM8(.2,-.5),new t.FM8(.5,-.25),new t.FM8(.35,.25),new t.FM8(.2,.5)],12),h=new t.Kj0(u,n);h.position.x=10.5,Y.add(h);const g=new t.pQR(.5,1),m=new t.Kj0(g,n);m.position.x=12,Y.add(m);const z=new t._12(1,1),_=new t.Kj0(z,n);_.position.x=13.5,Y.add(_);const b=new t.Uol([-1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,1,-1,1,1,1,1,-1,1,1],[2,1,0,0,3,2,0,4,7,7,3,0,0,1,5,5,4,0,1,2,6,6,5,1,2,3,7,7,6,2,4,5,6,6,7,4],.5,1),M=new t.Kj0(b,n);M.position.x=15,Y.add(M)},Z.onPlay=()=>{G.rotation.set(0,0,0),N=new c.z(G,Z.canvasContainer),N.enableDamping=!0},Z.onReset=()=>{N&&(N.dispose(),N=null),G.position.set(0,0,3)},Z.onTick=()=>{N.update(),Z.renderer.render(Y,G)};const en=new t.cPb(45,1,.1,1e4);let on;const tn=new w(12,en);let sn;tn.onInit=()=>{nn=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});nn.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),nn.add(e),en.position.z=3,nn.add(en);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);nn.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,nn.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,nn.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,nn.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,nn.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,nn.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,nn.add(v);const u=new t.p7y([new t.FM8(.2,-.5),new t.FM8(.5,-.25),new t.FM8(.35,.25),new t.FM8(.2,.5)],12),h=new t.Kj0(u,n);h.position.x=10.5,nn.add(h);const g=new t.pQR(.5,1),m=new t.Kj0(g,n);m.position.x=12,nn.add(m);const z=new t._12(1,1),_=new t.Kj0(z,n);_.position.x=13.5,nn.add(_);const b=new t.Uol([-1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,1,-1,1,1,1,1,-1,1,1],[2,1,0,0,3,2,0,4,7,7,3,0,0,1,5,5,4,0,1,2,6,6,5,1,2,3,7,7,6,2,4,5,6,6,7,4],.5,1),M=new t.Kj0(b,n);M.position.x=15,nn.add(M);const f=new t.o8S(.3,.5,16),y=new t.Kj0(f,n);y.position.x=16.5,nn.add(y)},tn.onPlay=()=>{en.rotation.set(0,0,0),on=new c.z(en,tn.canvasContainer),on.enableDamping=!0},tn.onReset=()=>{on&&(on.dispose(),on=null),en.position.set(0,0,3)},tn.onTick=()=>{on.update(),tn.renderer.render(nn,en)};const dn=new t.cPb(45,1,.1,1e4);let an;const wn=new w(13,dn);let cn;wn.onInit=()=>{sn=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});sn.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),sn.add(e),dn.position.z=3,sn.add(dn);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);sn.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,sn.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,sn.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,sn.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,sn.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,sn.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,sn.add(v);const u=new t.p7y([new t.FM8(.2,-.5),new t.FM8(.5,-.25),new t.FM8(.35,.25),new t.FM8(.2,.5)],12),h=new t.Kj0(u,n);h.position.x=10.5,sn.add(h);const g=new t.pQR(.5,1),m=new t.Kj0(g,n);m.position.x=12,sn.add(m);const z=new t._12(1,1),_=new t.Kj0(z,n);_.position.x=13.5,sn.add(_);const b=new t.Uol([-1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,1,-1,1,1,1,1,-1,1,1],[2,1,0,0,3,2,0,4,7,7,3,0,0,1,5,5,4,0,1,2,6,6,5,1,2,3,7,7,6,2,4,5,6,6,7,4],.5,1),M=new t.Kj0(b,n);M.position.x=15,sn.add(M);const f=new t.o8S(.3,.5,16),y=new t.Kj0(f,n);y.position.x=16.5,sn.add(y);const F=new t.xo$(.5,12,8),P=new t.Kj0(F,n);P.position.x=18,sn.add(P)},wn.onPlay=()=>{dn.rotation.set(0,0,0),an=new c.z(dn,wn.canvasContainer),an.enableDamping=!0},wn.onReset=()=>{an&&(an.dispose(),an=null),dn.position.set(0,0,3)},wn.onTick=()=>{an.update(),wn.renderer.render(sn,dn)};const pn=new t.cPb(45,1,.1,1e4);let rn;const ln=new w(14,pn);let xn;ln.onInit=()=>{cn=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});cn.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),cn.add(e),pn.position.z=3,cn.add(pn);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);cn.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,cn.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,cn.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,cn.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,cn.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,cn.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,cn.add(v);const u=new t.p7y([new t.FM8(.2,-.5),new t.FM8(.5,-.25),new t.FM8(.35,.25),new t.FM8(.2,.5)],12),h=new t.Kj0(u,n);h.position.x=10.5,cn.add(h);const g=new t.pQR(.5,1),m=new t.Kj0(g,n);m.position.x=12,cn.add(m);const z=new t._12(1,1),_=new t.Kj0(z,n);_.position.x=13.5,cn.add(_);const b=new t.Uol([-1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,1,-1,1,1,1,1,-1,1,1],[2,1,0,0,3,2,0,4,7,7,3,0,0,1,5,5,4,0,1,2,6,6,5,1,2,3,7,7,6,2,4,5,6,6,7,4],.5,1),M=new t.Kj0(b,n);M.position.x=15,cn.add(M);const f=new t.o8S(.3,.5,16),y=new t.Kj0(f,n);y.position.x=16.5,cn.add(y);const F=new t.xo$(.5,12,8),P=new t.Kj0(F,n);P.position.x=18,cn.add(P);const E=new t.H$k(.5,1),k=new t.Kj0(E,n);k.position.x=19.5,cn.add(k)},ln.onPlay=()=>{pn.rotation.set(0,0,0),rn=new c.z(pn,ln.canvasContainer),rn.enableDamping=!0},ln.onReset=()=>{rn&&(rn.dispose(),rn=null),pn.position.set(0,0,3)},ln.onTick=()=>{rn.update(),ln.renderer.render(cn,pn)};const Kn=new t.cPb(45,1,.1,1e4);let jn;const vn=new w(15,Kn);let un;vn.onInit=()=>{xn=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});xn.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),xn.add(e),Kn.position.z=3,xn.add(Kn);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);xn.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,xn.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,xn.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,xn.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,xn.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,xn.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,xn.add(v);const u=new t.p7y([new t.FM8(.2,-.5),new t.FM8(.5,-.25),new t.FM8(.35,.25),new t.FM8(.2,.5)],12),h=new t.Kj0(u,n);h.position.x=10.5,xn.add(h);const g=new t.pQR(.5,1),m=new t.Kj0(g,n);m.position.x=12,xn.add(m);const z=new t._12(1,1),_=new t.Kj0(z,n);_.position.x=13.5,xn.add(_);const b=new t.Uol([-1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,1,-1,1,1,1,1,-1,1,1],[2,1,0,0,3,2,0,4,7,7,3,0,0,1,5,5,4,0,1,2,6,6,5,1,2,3,7,7,6,2,4,5,6,6,7,4],.5,1),M=new t.Kj0(b,n);M.position.x=15,xn.add(M);const f=new t.o8S(.3,.5,16),y=new t.Kj0(f,n);y.position.x=16.5,xn.add(y);const F=new t.xo$(.5,12,8),P=new t.Kj0(F,n);P.position.x=18,xn.add(P);const E=new t.H$k(.5,1),k=new t.Kj0(E,n);k.position.x=19.5,xn.add(k);const O=new t.XvJ(.5,.1,8,16),C=new t.Kj0(O,n);C.position.x=21,xn.add(C)},vn.onPlay=()=>{Kn.rotation.set(0,0,0),jn=new c.z(Kn,vn.canvasContainer),jn.enableDamping=!0},vn.onReset=()=>{jn&&(jn.dispose(),jn=null),Kn.position.set(0,0,3)},vn.onTick=()=>{jn.update(),vn.renderer.render(xn,Kn)};const hn=new t.cPb(45,1,.1,1e4);let gn;const mn=new w(16,hn);let zn;mn.onInit=()=>{un=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});un.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),un.add(e),hn.position.z=3,un.add(hn);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);un.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,un.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,un.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,un.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,un.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,un.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,un.add(v);const u=new t.p7y([new t.FM8(.2,-.5),new t.FM8(.5,-.25),new t.FM8(.35,.25),new t.FM8(.2,.5)],12),h=new t.Kj0(u,n);h.position.x=10.5,un.add(h);const g=new t.pQR(.5,1),m=new t.Kj0(g,n);m.position.x=12,un.add(m);const z=new t._12(1,1),_=new t.Kj0(z,n);_.position.x=13.5,un.add(_);const b=new t.Uol([-1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,1,-1,1,1,1,1,-1,1,1],[2,1,0,0,3,2,0,4,7,7,3,0,0,1,5,5,4,0,1,2,6,6,5,1,2,3,7,7,6,2,4,5,6,6,7,4],.5,1),M=new t.Kj0(b,n);M.position.x=15,un.add(M);const f=new t.o8S(.3,.5,16),y=new t.Kj0(f,n);y.position.x=16.5,un.add(y);const F=new t.xo$(.5,12,8),P=new t.Kj0(F,n);P.position.x=18,un.add(P);const E=new t.H$k(.5,1),k=new t.Kj0(E,n);k.position.x=19.5,un.add(k);const O=new t.XvJ(.5,.1,8,16),C=new t.Kj0(O,n);C.position.x=21,un.add(C);const D=new t.FE5(.5,.1),R=new t.Kj0(D,n);R.position.x=22.5,un.add(R)},mn.onPlay=()=>{hn.rotation.set(0,0,0),gn=new c.z(hn,mn.canvasContainer),gn.enableDamping=!0},mn.onReset=()=>{gn&&(gn.dispose(),gn=null),hn.position.set(0,0,3)},mn.onTick=()=>{gn.update(),mn.renderer.render(un,hn)};const _n=new t.cPb(45,1,.1,1e4);let bn;const Mn=new w(17,_n);Mn.onInit=()=>{zn=new t.xsS;const n=new t.Wid({color:7923962,roughness:.5});zn.add(new t.Mig(16777215,.2));const e=new t.Ox3(16777215,.8);e.position.set(.5,2,.7),zn.add(e),_n.position.z=3,zn.add(_n);const o=new t.DvJ(1,1,1),s=new t.Kj0(o,n);zn.add(s);const i=new t.BVQ(.5,2,6,18),d=new t.Kj0(i,n);d.position.x=1.5,zn.add(d);const a=new t.zf8(.5,16),w=new t.Kj0(a,n);w.position.x=3,zn.add(w);const c=new t.b_z(.5,1,12),p=new t.Kj0(c,n);p.position.x=4.5,zn.add(p);const r=new t.fHI(.4,.4,1,12),l=new t.Kj0(r,n);l.position.x=6,zn.add(l);const x=new t.Kgo(.5,0),K=new t.Kj0(x,n);K.position.x=7.5,zn.add(K);const j=new t.cJO(.5,0),v=new t.Kj0(j,n);v.position.x=9,zn.add(v);const u=new t.p7y([new t.FM8(.2,-.5),new t.FM8(.5,-.25),new t.FM8(.35,.25),new t.FM8(.2,.5)],12),h=new t.Kj0(u,n);h.position.x=10.5,zn.add(h);const g=new t.pQR(.5,1),m=new t.Kj0(g,n);m.position.x=12,zn.add(m);const z=new t._12(1,1),_=new t.Kj0(z,n);_.position.x=13.5,zn.add(_);const b=new t.Uol([-1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,1,-1,1,1,1,1,-1,1,1],[2,1,0,0,3,2,0,4,7,7,3,0,0,1,5,5,4,0,1,2,6,6,5,1,2,3,7,7,6,2,4,5,6,6,7,4],.5,1),M=new t.Kj0(b,n);M.position.x=15,zn.add(M);const f=new t.o8S(.3,.5,16),y=new t.Kj0(f,n);y.position.x=16.5,zn.add(y);const F=new t.xo$(.5,12,8),P=new t.Kj0(F,n);P.position.x=18,zn.add(P);const E=new t.H$k(.5,1),k=new t.Kj0(E,n);k.position.x=19.5,zn.add(k);const O=new t.XvJ(.5,.1,8,16),C=new t.Kj0(O,n);C.position.x=21,zn.add(C);const D=new t.FE5(.5,.1),R=new t.Kj0(D,n);R.position.x=22.5,zn.add(R);const J=new t.u9r,I=new Float32Array(300);for(let n=0;n<I.length;n++)I[n]=Math.random()-.5;const S=new t.TlE(I,3);J.setAttribute("position",S);const Q=new t.Kj0(J,new t.vBJ({wireframe:!0}));Q.position.x=-1.5,zn.add(Q)},Mn.onPlay=()=>{_n.rotation.set(0,0,0),bn=new c.z(_n,Mn.canvasContainer),bn.enableDamping=!0},Mn.onReset=()=>{bn&&(bn.dispose(),bn=null),_n.position.set(0,0,3)},Mn.onTick=()=>{bn.update(),Mn.renderer.render(zn,_n)},a.init()}},o={};function t(n){var s=o[n];if(void 0!==s)return s.exports;var i=o[n]={exports:{}};return e[n](i,i.exports,t),i.exports}t.m=e,n=[],t.O=(e,o,s,i)=>{if(!o){var d=1/0;for(p=0;p<n.length;p++){for(var[o,s,i]=n[p],a=!0,w=0;w<o.length;w++)(!1&i||d>=i)&&Object.keys(t.O).every((n=>t.O[n](o[w])))?o.splice(w--,1):(a=!1,i<d&&(d=i));if(a){n.splice(p--,1);var c=s();void 0!==c&&(e=c)}}return e}i=i||0;for(var p=n.length;p>0&&n[p-1][2]>i;p--)n[p]=n[p-1];n[p]=[o,s,i]},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n={7359:0};t.O.j=e=>0===n[e];var e=(e,o)=>{var s,i,[d,a,w]=o,c=0;if(d.some((e=>0!==n[e]))){for(s in a)t.o(a,s)&&(t.m[s]=a[s]);if(w)var p=w(t)}for(e&&e(o);c<d.length;c++)i=d[c],t.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return t.O(p)},o=self.webpackChunkthreejs_navod=self.webpackChunkthreejs_navod||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})();var s=t.O(void 0,[9365,629],(()=>t(405)));s=t.O(s)})();