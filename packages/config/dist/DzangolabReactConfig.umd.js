(function(y,R){typeof exports=="object"&&typeof module<"u"?R(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],R):(y=typeof globalThis<"u"?globalThis:y||self,R(y["@dzangolab/react-config"]={},y.React))})(this,function(y,R){"use strict";var U={exports:{}},j={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Q;function Se(){if(Q)return j;Q=1;var p=R,b=Symbol.for("react.element"),B=Symbol.for("react.fragment"),C=Object.prototype.hasOwnProperty,I=p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,W={key:!0,ref:!0,__self:!0,__source:!0};function D(_,l,P){var v,h={},T=null,Y=null;P!==void 0&&(T=""+P),l.key!==void 0&&(T=""+l.key),l.ref!==void 0&&(Y=l.ref);for(v in l)C.call(l,v)&&!W.hasOwnProperty(v)&&(h[v]=l[v]);if(_&&_.defaultProps)for(v in l=_.defaultProps,l)h[v]===void 0&&(h[v]=l[v]);return{$$typeof:b,type:_,key:T,ref:Y,props:h,_owner:I.current}}return j.Fragment=B,j.jsx=D,j.jsxs=D,j}var k={};/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ee;function we(){return ee||(ee=1,process.env.NODE_ENV!=="production"&&function(){var p=R,b=Symbol.for("react.element"),B=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),I=Symbol.for("react.strict_mode"),W=Symbol.for("react.profiler"),D=Symbol.for("react.provider"),_=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),P=Symbol.for("react.suspense"),v=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),Y=Symbol.for("react.offscreen"),te=Symbol.iterator,De="@@iterator";function Fe(e){if(e===null||typeof e!="object")return null;var r=te&&e[te]||e[De];return typeof r=="function"?r:null}var S=p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function c(e){{for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];Ae("error",e,t)}}function Ae(e,r,t){{var n=S.ReactDebugCurrentFrame,i=n.getStackAddendum();i!==""&&(r+="%s",t=t.concat([i]));var u=t.map(function(o){return String(o)});u.unshift("Warning: "+r),Function.prototype.apply.call(console[e],console,u)}}var Ie=!1,We=!1,Ye=!1,Ne=!1,$e=!1,ne;ne=Symbol.for("react.module.reference");function Le(e){return!!(typeof e=="string"||typeof e=="function"||e===C||e===W||$e||e===I||e===P||e===v||Ne||e===Y||Ie||We||Ye||typeof e=="object"&&e!==null&&(e.$$typeof===T||e.$$typeof===h||e.$$typeof===D||e.$$typeof===_||e.$$typeof===l||e.$$typeof===ne||e.getModuleId!==void 0))}function Me(e,r,t){var n=e.displayName;if(n)return n;var i=r.displayName||r.name||"";return i!==""?t+"("+i+")":t}function ae(e){return e.displayName||"Context"}function E(e){if(e==null)return null;if(typeof e.tag=="number"&&c("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case C:return"Fragment";case B:return"Portal";case W:return"Profiler";case I:return"StrictMode";case P:return"Suspense";case v:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case _:var r=e;return ae(r)+".Consumer";case D:var t=e;return ae(t._context)+".Provider";case l:return Me(e,e.render,"ForwardRef");case h:var n=e.displayName||null;return n!==null?n:E(e.type)||"Memo";case T:{var i=e,u=i._payload,o=i._init;try{return E(o(u))}catch{return null}}}return null}var O=Object.assign,F=0,oe,ie,ue,se,fe,le,ce;function de(){}de.__reactDisabledLog=!0;function Ve(){{if(F===0){oe=console.log,ie=console.info,ue=console.warn,se=console.error,fe=console.group,le=console.groupCollapsed,ce=console.groupEnd;var e={configurable:!0,enumerable:!0,value:de,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}F++}}function Ue(){{if(F--,F===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:O({},e,{value:oe}),info:O({},e,{value:ie}),warn:O({},e,{value:ue}),error:O({},e,{value:se}),group:O({},e,{value:fe}),groupCollapsed:O({},e,{value:le}),groupEnd:O({},e,{value:ce})})}F<0&&c("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var J=S.ReactCurrentDispatcher,q;function N(e,r,t){{if(q===void 0)try{throw Error()}catch(i){var n=i.stack.trim().match(/\n( *(at )?)/);q=n&&n[1]||""}return`
`+q+e}}var z=!1,$;{var Be=typeof WeakMap=="function"?WeakMap:Map;$=new Be}function ve(e,r){if(!e||z)return"";{var t=$.get(e);if(t!==void 0)return t}var n;z=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var u;u=J.current,J.current=null,Ve();try{if(r){var o=function(){throw Error()};if(Object.defineProperty(o.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(o,[])}catch(m){n=m}Reflect.construct(e,[],o)}else{try{o.call()}catch(m){n=m}e.call(o.prototype)}}else{try{throw Error()}catch(m){n=m}e()}}catch(m){if(m&&n&&typeof m.stack=="string"){for(var a=m.stack.split(`
`),d=n.stack.split(`
`),s=a.length-1,f=d.length-1;s>=1&&f>=0&&a[s]!==d[f];)f--;for(;s>=1&&f>=0;s--,f--)if(a[s]!==d[f]){if(s!==1||f!==1)do if(s--,f--,f<0||a[s]!==d[f]){var g=`
`+a[s].replace(" at new "," at ");return e.displayName&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",e.displayName)),typeof e=="function"&&$.set(e,g),g}while(s>=1&&f>=0);break}}}finally{z=!1,J.current=u,Ue(),Error.prepareStackTrace=i}var x=e?e.displayName||e.name:"",Pe=x?N(x):"";return typeof e=="function"&&$.set(e,Pe),Pe}function Je(e,r,t){return ve(e,!1)}function qe(e){var r=e.prototype;return!!(r&&r.isReactComponent)}function L(e,r,t){if(e==null)return"";if(typeof e=="function")return ve(e,qe(e));if(typeof e=="string")return N(e);switch(e){case P:return N("Suspense");case v:return N("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case l:return Je(e.render);case h:return L(e.type,r,t);case T:{var n=e,i=n._payload,u=n._init;try{return L(u(i),r,t)}catch{}}}return""}var M=Object.prototype.hasOwnProperty,pe={},ge=S.ReactDebugCurrentFrame;function V(e){if(e){var r=e._owner,t=L(e.type,e._source,r?r.type:null);ge.setExtraStackFrame(t)}else ge.setExtraStackFrame(null)}function ze(e,r,t,n,i){{var u=Function.call.bind(M);for(var o in e)if(u(e,o)){var a=void 0;try{if(typeof e[o]!="function"){var d=Error((n||"React class")+": "+t+" type `"+o+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[o]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}a=e[o](r,o,n,t,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(s){a=s}a&&!(a instanceof Error)&&(V(i),c("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",n||"React class",t,o,typeof a),V(null)),a instanceof Error&&!(a.message in pe)&&(pe[a.message]=!0,V(i),c("Failed %s type: %s",t,a.message),V(null))}}}var Ge=Array.isArray;function G(e){return Ge(e)}function Ke(e){{var r=typeof Symbol=="function"&&Symbol.toStringTag,t=r&&e[Symbol.toStringTag]||e.constructor.name||"Object";return t}}function He(e){try{return be(e),!1}catch{return!0}}function be(e){return""+e}function ye(e){if(He(e))return c("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",Ke(e)),be(e)}var A=S.ReactCurrentOwner,Xe={key:!0,ref:!0,__self:!0,__source:!0},he,Ee,K;K={};function Ze(e){if(M.call(e,"ref")){var r=Object.getOwnPropertyDescriptor(e,"ref").get;if(r&&r.isReactWarning)return!1}return e.ref!==void 0}function Qe(e){if(M.call(e,"key")){var r=Object.getOwnPropertyDescriptor(e,"key").get;if(r&&r.isReactWarning)return!1}return e.key!==void 0}function er(e,r){if(typeof e.ref=="string"&&A.current&&r&&A.current.stateNode!==r){var t=E(A.current.type);K[t]||(c('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',E(A.current.type),e.ref),K[t]=!0)}}function rr(e,r){{var t=function(){he||(he=!0,c("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"key",{get:t,configurable:!0})}}function tr(e,r){{var t=function(){Ee||(Ee=!0,c("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"ref",{get:t,configurable:!0})}}var nr=function(e,r,t,n,i,u,o){var a={$$typeof:b,type:e,key:r,ref:t,props:o,_owner:u};return a._store={},Object.defineProperty(a._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(a,"_self",{configurable:!1,enumerable:!1,writable:!1,value:n}),Object.defineProperty(a,"_source",{configurable:!1,enumerable:!1,writable:!1,value:i}),Object.freeze&&(Object.freeze(a.props),Object.freeze(a)),a};function ar(e,r,t,n,i){{var u,o={},a=null,d=null;t!==void 0&&(ye(t),a=""+t),Qe(r)&&(ye(r.key),a=""+r.key),Ze(r)&&(d=r.ref,er(r,i));for(u in r)M.call(r,u)&&!Xe.hasOwnProperty(u)&&(o[u]=r[u]);if(e&&e.defaultProps){var s=e.defaultProps;for(u in s)o[u]===void 0&&(o[u]=s[u])}if(a||d){var f=typeof e=="function"?e.displayName||e.name||"Unknown":e;a&&rr(o,f),d&&tr(o,f)}return nr(e,a,d,i,n,A.current,o)}}var H=S.ReactCurrentOwner,me=S.ReactDebugCurrentFrame;function w(e){if(e){var r=e._owner,t=L(e.type,e._source,r?r.type:null);me.setExtraStackFrame(t)}else me.setExtraStackFrame(null)}var X;X=!1;function Z(e){return typeof e=="object"&&e!==null&&e.$$typeof===b}function Re(){{if(H.current){var e=E(H.current.type);if(e)return`

Check the render method of \``+e+"`."}return""}}function or(e){{if(e!==void 0){var r=e.fileName.replace(/^.*[\\\/]/,""),t=e.lineNumber;return`

Check your code at `+r+":"+t+"."}return""}}var _e={};function ir(e){{var r=Re();if(!r){var t=typeof e=="string"?e:e.displayName||e.name;t&&(r=`

Check the top-level render call using <`+t+">.")}return r}}function Te(e,r){{if(!e._store||e._store.validated||e.key!=null)return;e._store.validated=!0;var t=ir(r);if(_e[t])return;_e[t]=!0;var n="";e&&e._owner&&e._owner!==H.current&&(n=" It was passed a child from "+E(e._owner.type)+"."),w(e),c('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',t,n),w(null)}}function Oe(e,r){{if(typeof e!="object")return;if(G(e))for(var t=0;t<e.length;t++){var n=e[t];Z(n)&&Te(n,r)}else if(Z(e))e._store&&(e._store.validated=!0);else if(e){var i=Fe(e);if(typeof i=="function"&&i!==e.entries)for(var u=i.call(e),o;!(o=u.next()).done;)Z(o.value)&&Te(o.value,r)}}}function ur(e){{var r=e.type;if(r==null||typeof r=="string")return;var t;if(typeof r=="function")t=r.propTypes;else if(typeof r=="object"&&(r.$$typeof===l||r.$$typeof===h))t=r.propTypes;else return;if(t){var n=E(r);ze(t,e.props,"prop",n,e)}else if(r.PropTypes!==void 0&&!X){X=!0;var i=E(r);c("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",i||"Unknown")}typeof r.getDefaultProps=="function"&&!r.getDefaultProps.isReactClassApproved&&c("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function sr(e){{for(var r=Object.keys(e.props),t=0;t<r.length;t++){var n=r[t];if(n!=="children"&&n!=="key"){w(e),c("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",n),w(null);break}}e.ref!==null&&(w(e),c("Invalid attribute `ref` supplied to `React.Fragment`."),w(null))}}function Ce(e,r,t,n,i,u){{var o=Le(e);if(!o){var a="";(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(a+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var d=or(i);d?a+=d:a+=Re();var s;e===null?s="null":G(e)?s="array":e!==void 0&&e.$$typeof===b?(s="<"+(E(e.type)||"Unknown")+" />",a=" Did you accidentally export a JSX literal instead of a component?"):s=typeof e,c("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",s,a)}var f=ar(e,r,t,i,u);if(f==null)return f;if(o){var g=r.children;if(g!==void 0)if(n)if(G(g)){for(var x=0;x<g.length;x++)Oe(g[x],e);Object.freeze&&Object.freeze(g)}else c("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else Oe(g,e)}return e===C?sr(f):ur(f),f}}function fr(e,r,t){return Ce(e,r,t,!0)}function lr(e,r,t){return Ce(e,r,t,!1)}var cr=lr,dr=fr;k.Fragment=C,k.jsx=cr,k.jsxs=dr}()),k}process.env.NODE_ENV==="production"?U.exports=Se():U.exports=we();var xe=U.exports;const re=R.createContext(void 0),je=({children:p,appConfig:b})=>xe.jsx(re.Provider,{value:b,children:p}),ke=(p,b)=>{if(typeof p>"u")return b;if(typeof p=="boolean")return p;switch(typeof b){case"boolean":return!!JSON.parse(p);case"number":return JSON.parse(p);default:return p}};y.ConfigProvider=je,y.configContext=re,y.parse=ke,Object.defineProperty(y,Symbol.toStringTag,{value:"Module"})});
