(()=>{"use strict";var e,t={7277:(e,t,i)=>{var n=i(9477);const a=document.createElement("canvas");a.classList.add("webgl-canvas");const s=new n.CP7({canvas:a});s.setPixelRatio(window.devicePixelRatio);const c=s,l=new class{constructor(){this.initialized=!1,this._activeExample=null,this._clock=new n.SUY(!1),this._tick=this._tick.bind(this),window.addEventListener("resize",this._resize.bind(this))}init(){c.setAnimationLoop(this._tick),this.initialized=!0}playExample(e){this.initialized&&(e.playButton.style.display="none",e.resetButton.style.display="flex",this.resetExample(),this._clock.start(),e.canvasContainer.appendChild(a),this._activeExample=e,this._resize(),e.initialized||(e.initialized=!0,e.onInit?.()),e.onPlay?.())}resetExample(){this._activeExample&&(this._clock.stop(),this._activeExample.playButton.style.display="flex",this._activeExample.resetButton.style.display="none",this._activeExample.canvasContainer.removeChild(a),this._activeExample.onReset?.(),this._activeExample=null)}_tick(){if(this._activeExample){const e=this._clock.getDelta(),t=this._clock.getElapsedTime();this._activeExample.onTick?.(e,t)}}_resize(){this._activeExample&&(this._activeExample.camera&&(this._activeExample.camera.aspect=this._activeExample.canvasContainer.clientWidth/this._activeExample.canvasContainer.clientHeight,this._activeExample.camera.updateProjectionMatrix()),c.setSize(this._activeExample.canvasContainer.clientWidth,this._activeExample.canvasContainer.clientHeight),c.setPixelRatio(Math.min(window.devicePixelRatio,2)),this._activeExample.onResize?.(this._activeExample.canvasContainer.clientWidth,this._activeExample.canvasContainer.clientHeight))}};let r;const o=new n.cPb(75,1),d=new class{constructor(e,t){this.initialized=!1,this.camera=t;const i=document.querySelector(`[data-example-id="${e}"]`);if(!i)throw new Error("Example element wasn't found");i.classList.add("interactive-example");const n=document.createElement("div");n.classList.add("interactive-example__header"),i.appendChild(n);const a=document.createElement("div");a.classList.add("interactive-example__icon"),a.innerHTML='\n            <svg>\n                <use xlink:href="../../static/img/icon-sprite.svg#icon-embed2"></use>\n            </svg>\n        ',n.appendChild(a);const s=document.createElement("button");s.classList.add("interactive-example__button"),s.innerHTML='\n            <svg>\n                <use xlink:href="../../static/img/icon-sprite.svg#icon-play"></use>\n            </svg>\n            <span>Spustit</span>\n        ',n.appendChild(s);const c=document.createElement("button");c.classList.add("interactive-example__button"),c.innerHTML='\n            <svg>\n                <use xlink:href="../../static/img/icon-sprite.svg#icon-spinner11"></use>\n            </svg>\n            <span>Resetovat</span>\n        ',c.style.display="none",n.appendChild(c);const r=document.createElement("div");r.classList.add("interactive-example__canvas-container"),i.appendChild(r),s.addEventListener("click",(()=>l.playExample(this))),c.addEventListener("click",(()=>l.resetExample())),this.playButton=s,this.resetButton=c,this.canvasContainer=r}get renderer(){return c}get canvas(){return a}}(1,o);d.onInit=()=>{r=new n.xsS;const e=new n.DvJ(1,1,1),t=new n.vBJ({color:7923962}),i=new n.Kj0(e,t);r.add(i),r.add(o),o.position.z=3,o.position.x=1,o.position.y=1},d.onTick=()=>{d.renderer.render(r,o)},l.init()}},i={};function n(e){var a=i[e];if(void 0!==a)return a.exports;var s=i[e]={exports:{}};return t[e](s,s.exports,n),s.exports}n.m=t,e=[],n.O=(t,i,a,s)=>{if(!i){var c=1/0;for(d=0;d<e.length;d++){for(var[i,a,s]=e[d],l=!0,r=0;r<i.length;r++)(!1&s||c>=s)&&Object.keys(n.O).every((e=>n.O[e](i[r])))?i.splice(r--,1):(l=!1,s<c&&(c=s));if(l){e.splice(d--,1);var o=a();void 0!==o&&(t=o)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[i,a,s]},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={3183:0};n.O.j=t=>0===e[t];var t=(t,i)=>{var a,s,[c,l,r]=i,o=0;if(c.some((t=>0!==e[t]))){for(a in l)n.o(l,a)&&(n.m[a]=l[a]);if(r)var d=r(n)}for(t&&t(i);o<c.length;o++)s=c[o],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(d)},i=self.webpackChunkthreejs_navod=self.webpackChunkthreejs_navod||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var a=n.O(void 0,[8718],(()=>n(7277)));a=n.O(a)})();