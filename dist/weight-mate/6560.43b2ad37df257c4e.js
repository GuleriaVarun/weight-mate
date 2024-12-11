"use strict";(self.webpackChunkweightMate=self.webpackChunkweightMate||[]).push([[6560],{6560:(f,d,o)=>{o.r(d),o.d(d,{ion_textarea:()=>e});var h=o(5861),a=o(1308),c=o(5179),s=o(5730),p=o(2854);const e=class{constructor(t){(0,a.r)(this,t),this.ionChange=(0,a.e)(this,"ionChange",7),this.ionInput=(0,a.e)(this,"ionInput",7),this.ionStyle=(0,a.e)(this,"ionStyle",7),this.ionBlur=(0,a.e)(this,"ionBlur",7),this.ionFocus=(0,a.e)(this,"ionFocus",7),this.inputId="ion-textarea-"+i++,this.didBlurAfterEdit=!1,this.inheritedAttributes={},this.fireFocusEvents=!0,this.hasFocus=!1,this.autocapitalize="none",this.autofocus=!1,this.clearOnEdit=!1,this.debounce=0,this.disabled=!1,this.name=this.inputId,this.readonly=!1,this.required=!1,this.spellcheck=!1,this.autoGrow=!1,this.value="",this.onInput=n=>{this.nativeInput&&(this.value=this.nativeInput.value),this.emitStyle(),this.ionInput.emit(n)},this.onFocus=n=>{this.hasFocus=!0,this.focusChange(),this.fireFocusEvents&&this.ionFocus.emit(n)},this.onBlur=n=>{this.hasFocus=!1,this.focusChange(),this.fireFocusEvents&&this.ionBlur.emit(n)},this.onKeyDown=()=>{this.checkClearOnEdit()}}debounceChanged(){this.ionChange=(0,s.h)(this.ionChange,this.debounce)}disabledChanged(){this.emitStyle()}valueChanged(){const t=this.nativeInput,n=this.getValue();t&&t.value!==n&&(t.value=n),this.runAutoGrow(),this.emitStyle(),this.ionChange.emit({value:n})}connectedCallback(){this.emitStyle(),this.debounceChanged(),document.dispatchEvent(new CustomEvent("ionInputDidLoad",{detail:this.el}))}disconnectedCallback(){document.dispatchEvent(new CustomEvent("ionInputDidUnload",{detail:this.el}))}componentWillLoad(){this.inheritedAttributes=Object.assign(Object.assign({},(0,s.i)(this.el)),(0,s.j)(this.el,["data-form-type","title","tabindex"]))}componentDidLoad(){this.runAutoGrow()}setFocus(){var t=this;return(0,h.Z)(function*(){t.nativeInput&&t.nativeInput.focus()})()}setBlur(){var t=this;return(0,h.Z)(function*(){t.nativeInput&&t.nativeInput.blur()})()}getInputElement(){return Promise.resolve(this.nativeInput)}emitStyle(){this.ionStyle.emit({interactive:!0,textarea:!0,input:!0,"interactive-disabled":this.disabled,"has-placeholder":void 0!==this.placeholder,"has-value":this.hasValue(),"has-focus":this.hasFocus})}runAutoGrow(){this.nativeInput&&this.autoGrow&&(0,a.c)(()=>{var t;this.textareaWrapper&&(this.textareaWrapper.dataset.replicatedValue=null!==(t=this.value)&&void 0!==t?t:"")})}checkClearOnEdit(){!this.clearOnEdit||(this.didBlurAfterEdit&&this.hasValue()&&(this.value=""),this.didBlurAfterEdit=!1)}focusChange(){this.clearOnEdit&&!this.hasFocus&&this.hasValue()&&(this.didBlurAfterEdit=!0),this.emitStyle()}hasValue(){return""!==this.getValue()}getValue(){return this.value||""}render(){const t=(0,c.b)(this),n=this.getValue(),l=this.inputId+"-lbl",r=(0,s.k)(this.el);return r&&(r.id=l),(0,a.h)(a.H,{"aria-disabled":this.disabled?"true":null,class:(0,p.c)(this.color,{[t]:!0})},(0,a.h)("div",{class:"textarea-wrapper",ref:m=>this.textareaWrapper=m},(0,a.h)("textarea",Object.assign({class:"native-textarea","aria-labelledby":r?l:null,ref:m=>this.nativeInput=m,autoCapitalize:this.autocapitalize,autoFocus:this.autofocus,enterKeyHint:this.enterkeyhint,inputMode:this.inputmode,disabled:this.disabled,maxLength:this.maxlength,minLength:this.minlength,name:this.name,placeholder:this.placeholder||"",readOnly:this.readonly,required:this.required,spellcheck:this.spellcheck,cols:this.cols,rows:this.rows,wrap:this.wrap,onInput:this.onInput,onBlur:this.onBlur,onFocus:this.onFocus,onKeyDown:this.onKeyDown},this.inheritedAttributes),n)))}get el(){return(0,a.i)(this)}static get watchers(){return{debounce:["debounceChanged"],disabled:["disabledChanged"],value:["valueChanged"]}}};let i=0;e.style={ios:'.sc-ion-textarea-ios-h{--background:initial;--color:initial;--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:0.5;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--border-radius:0;display:block;position:relative;-ms-flex:1;flex:1;width:100%;background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit);white-space:pre-wrap;z-index:2;-webkit-box-sizing:border-box;box-sizing:border-box}.ion-color.sc-ion-textarea-ios-h{background:initial}.ion-color.sc-ion-textarea-ios-h{color:var(--ion-color-base)}ion-item.sc-ion-textarea-ios-h,ion-item .sc-ion-textarea-ios-h{-ms-flex-item-align:baseline;align-self:baseline}ion-item.sc-ion-textarea-ios-h:not(.item-label),ion-item:not(.item-label) .sc-ion-textarea-ios-h{--padding-start:0}.textarea-wrapper.sc-ion-textarea-ios{display:grid;min-width:inherit;max-width:inherit;min-height:inherit;max-height:inherit}.textarea-wrapper.sc-ion-textarea-ios::after{white-space:pre-wrap;content:attr(data-replicated-value) " ";visibility:hidden}.native-textarea.sc-ion-textarea-ios,.textarea-wrapper.sc-ion-textarea-ios::after{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;grid-area:1/1/2/2;word-break:break-word}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.native-textarea.sc-ion-textarea-ios,.textarea-wrapper.sc-ion-textarea-ios::after{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.native-textarea.sc-ion-textarea-ios{border-radius:var(--border-radius);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;resize:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.native-textarea.sc-ion-textarea-ios::-webkit-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios::-moz-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios:-ms-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios::-ms-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios::placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea[disabled].sc-ion-textarea-ios:not(.cloned-input){opacity:0.4}.cloned-input.sc-ion-textarea-ios{left:0;top:0;position:absolute;pointer-events:none}[dir=rtl].sc-ion-textarea-ios .cloned-input.sc-ion-textarea-ios,[dir=rtl].sc-ion-textarea-ios-h .cloned-input.sc-ion-textarea-ios,[dir=rtl] .sc-ion-textarea-ios-h .cloned-input.sc-ion-textarea-ios{left:unset;right:unset;right:0}.cloned-input.sc-ion-textarea-ios:disabled{opacity:1}[auto-grow=true].sc-ion-textarea-ios-h .cloned-input.sc-ion-textarea-ios{height:100%}.item-label-floating.item-has-placeholder.sc-ion-textarea-ios-h:not(.item-has-value),.item-label-floating.item-has-placeholder:not(.item-has-value) .sc-ion-textarea-ios-h{opacity:0}.item-label-floating.item-has-placeholder.sc-ion-textarea-ios-h:not(.item-has-value).item-has-focus,.item-label-floating.item-has-placeholder:not(.item-has-value).item-has-focus .sc-ion-textarea-ios-h{-webkit-transition:opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);opacity:1}[auto-grow=true].sc-ion-textarea-ios-h .native-textarea.sc-ion-textarea-ios{overflow:hidden}.sc-ion-textarea-ios-h{--padding-top:10px;--padding-end:10px;--padding-bottom:10px;--padding-start:0;font-size:inherit}.item-label-stacked.sc-ion-textarea-ios-h,.item-label-stacked .sc-ion-textarea-ios-h,.item-label-floating.sc-ion-textarea-ios-h,.item-label-floating .sc-ion-textarea-ios-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0px}',md:'.sc-ion-textarea-md-h{--background:initial;--color:initial;--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:0.5;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--border-radius:0;display:block;position:relative;-ms-flex:1;flex:1;width:100%;background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit);white-space:pre-wrap;z-index:2;-webkit-box-sizing:border-box;box-sizing:border-box}.ion-color.sc-ion-textarea-md-h{background:initial}.ion-color.sc-ion-textarea-md-h{color:var(--ion-color-base)}ion-item.sc-ion-textarea-md-h,ion-item .sc-ion-textarea-md-h{-ms-flex-item-align:baseline;align-self:baseline}ion-item.sc-ion-textarea-md-h:not(.item-label),ion-item:not(.item-label) .sc-ion-textarea-md-h{--padding-start:0}.textarea-wrapper.sc-ion-textarea-md{display:grid;min-width:inherit;max-width:inherit;min-height:inherit;max-height:inherit}.textarea-wrapper.sc-ion-textarea-md::after{white-space:pre-wrap;content:attr(data-replicated-value) " ";visibility:hidden}.native-textarea.sc-ion-textarea-md,.textarea-wrapper.sc-ion-textarea-md::after{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;grid-area:1/1/2/2;word-break:break-word}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.native-textarea.sc-ion-textarea-md,.textarea-wrapper.sc-ion-textarea-md::after{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.native-textarea.sc-ion-textarea-md{border-radius:var(--border-radius);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;resize:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.native-textarea.sc-ion-textarea-md::-webkit-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md::-moz-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md:-ms-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md::-ms-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md::placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea[disabled].sc-ion-textarea-md:not(.cloned-input){opacity:0.4}.cloned-input.sc-ion-textarea-md{left:0;top:0;position:absolute;pointer-events:none}[dir=rtl].sc-ion-textarea-md .cloned-input.sc-ion-textarea-md,[dir=rtl].sc-ion-textarea-md-h .cloned-input.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h .cloned-input.sc-ion-textarea-md{left:unset;right:unset;right:0}.cloned-input.sc-ion-textarea-md:disabled{opacity:1}[auto-grow=true].sc-ion-textarea-md-h .cloned-input.sc-ion-textarea-md{height:100%}.item-label-floating.item-has-placeholder.sc-ion-textarea-md-h:not(.item-has-value),.item-label-floating.item-has-placeholder:not(.item-has-value) .sc-ion-textarea-md-h{opacity:0}.item-label-floating.item-has-placeholder.sc-ion-textarea-md-h:not(.item-has-value).item-has-focus,.item-label-floating.item-has-placeholder:not(.item-has-value).item-has-focus .sc-ion-textarea-md-h{-webkit-transition:opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);opacity:1}[auto-grow=true].sc-ion-textarea-md-h .native-textarea.sc-ion-textarea-md{overflow:hidden}.sc-ion-textarea-md-h{--padding-top:10px;--padding-end:0;--padding-bottom:11px;--padding-start:8px;margin-left:0;margin-right:0;margin-top:8px;margin-bottom:0;font-size:inherit}.item-label-stacked.sc-ion-textarea-md-h,.item-label-stacked .sc-ion-textarea-md-h,.item-label-floating.sc-ion-textarea-md-h,.item-label-floating .sc-ion-textarea-md-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0}'}},2854:(f,d,o)=>{o.d(d,{c:()=>c,g:()=>p,h:()=>a,o:()=>u});var h=o(5861);const a=(e,i)=>null!==i.closest(e),c=(e,i)=>"string"==typeof e&&e.length>0?Object.assign({"ion-color":!0,[`ion-color-${e}`]:!0},i):i,p=e=>{const i={};return(e=>void 0!==e?(Array.isArray(e)?e:e.split(" ")).filter(t=>null!=t).map(t=>t.trim()).filter(t=>""!==t):[])(e).forEach(t=>i[t]=!0),i},g=/^[a-z][a-z0-9+\-.]*:/,u=function(){var e=(0,h.Z)(function*(i,t,n,l){if(null!=i&&"#"!==i[0]&&!g.test(i)){const r=document.querySelector("ion-router");if(r)return null!=t&&t.preventDefault(),r.push(i,n,l)}return!1});return function(t,n,l,r){return e.apply(this,arguments)}}()}}]);