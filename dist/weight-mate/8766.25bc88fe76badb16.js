"use strict";(self.webpackChunkweightMate=self.webpackChunkweightMate||[]).push([[8766],{8766:(W,m,E)=>{E.r(m),E.d(m,{startTapClick:()=>I});var u=E(5730);const I=o=>{let e,p,i,s=10*-h,r=0;const _=o.getBoolean("animated",!0)&&o.getBoolean("rippleEffect",!0),f=new WeakMap,L=t=>{s=(0,u.u)(t),w(t)},A=()=>{i&&clearTimeout(i),i=void 0,e&&(b(!1),e=void 0)},D=t=>{e||R(k(t),t)},w=t=>{R(void 0,t)},R=(t,n)=>{if(t&&t===e)return;i&&clearTimeout(i),i=void 0;const{x:d,y:a}=(0,u.p)(n);if(e){if(f.has(e))throw new Error("internal error");e.classList.contains(l)||g(e,d,a),b(!0)}if(t){const M=f.get(t);M&&(clearTimeout(M),f.delete(t)),t.classList.remove(l);const S=()=>{g(t,d,a),i=void 0};v(t)?S():i=setTimeout(S,U)}e=t},g=(t,n,d)=>{if(r=Date.now(),t.classList.add(l),!_)return;const a=P(t);null!==a&&(C(),p=a.addRipple(n,d))},C=()=>{void 0!==p&&(p.then(t=>t()),p=void 0)},b=t=>{C();const n=e;if(!n)return;const d=T-Date.now()+r;if(t&&d>0&&!v(n)){const a=setTimeout(()=>{n.classList.remove(l),f.delete(n)},T);f.set(n,a)}else n.classList.remove(l)},c=document;c.addEventListener("ionGestureCaptured",A),c.addEventListener("touchstart",t=>{s=(0,u.u)(t),D(t)},!0),c.addEventListener("touchcancel",L,!0),c.addEventListener("touchend",L,!0),c.addEventListener("pointercancel",A,!0),c.addEventListener("mousedown",t=>{if(2===t.button)return;const n=(0,u.u)(t)-h;s<n&&D(t)},!0),c.addEventListener("mouseup",t=>{const n=(0,u.u)(t)-h;s<n&&w(t)},!0)},k=o=>{if(void 0===o.composedPath)return o.target.closest(".ion-activatable");{const s=o.composedPath();for(let r=0;r<s.length-2;r++){const e=s[r];if(!(e instanceof ShadowRoot)&&e.classList.contains("ion-activatable"))return e}}},v=o=>o.classList.contains("ion-activatable-instant"),P=o=>{if(o.shadowRoot){const s=o.shadowRoot.querySelector("ion-ripple-effect");if(s)return s}return o.querySelector("ion-ripple-effect")},l="ion-activated",U=200,T=200,h=2500}}]);