(function(h,_){typeof exports=="object"&&typeof module<"u"?_(exports,require("react"),require("@dzangolab/react-config"),require("react-router-dom"),require("@dzangolab/react-i18n"),require("@dzangolab/react-ui")):typeof define=="function"&&define.amd?define(["exports","react","@dzangolab/react-config","react-router-dom","@dzangolab/react-i18n","@dzangolab/react-ui"],_):(h=typeof globalThis<"u"?globalThis:h||self,_(h["@dzangolab/react-layout"]={},h.React,h.DzangolabReactConfig,h.ReactRouterDom,h.DzangolabReactI18n,h.DzangolabReactUi))})(this,function(h,_,Xe,z,V,K){"use strict";var X={exports:{}},L={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var he;function Ze(){if(he)return L;he=1;var t=_,o=Symbol.for("react.element"),i=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,l=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function m(d,f,x){var y,R={},C=null,k=null;x!==void 0&&(C=""+x),f.key!==void 0&&(C=""+f.key),f.ref!==void 0&&(k=f.ref);for(y in f)s.call(f,y)&&!c.hasOwnProperty(y)&&(R[y]=f[y]);if(d&&d.defaultProps)for(y in f=d.defaultProps,f)R[y]===void 0&&(R[y]=f[y]);return{$$typeof:o,type:d,key:C,ref:k,props:R,_owner:l.current}}return L.Fragment=i,L.jsx=m,L.jsxs=m,L}var D={};/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var me;function Qe(){return me||(me=1,process.env.NODE_ENV!=="production"&&function(){var t=_,o=Symbol.for("react.element"),i=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),m=Symbol.for("react.provider"),d=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),x=Symbol.for("react.suspense"),y=Symbol.for("react.suspense_list"),R=Symbol.for("react.memo"),C=Symbol.for("react.lazy"),k=Symbol.for("react.offscreen"),H=Symbol.iterator,sr="@@iterator";function ur(e){if(e===null||typeof e!="object")return null;var n=H&&e[H]||e[sr];return typeof n=="function"?n:null}var M=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function S(e){{for(var n=arguments.length,a=new Array(n>1?n-1:0),u=1;u<n;u++)a[u-1]=arguments[u];lr("error",e,a)}}function lr(e,n,a){{var u=M.ReactDebugCurrentFrame,g=u.getStackAddendum();g!==""&&(n+="%s",a=a.concat([g]));var b=a.map(function(p){return String(p)});b.unshift("Warning: "+n),Function.prototype.apply.call(console[e],console,b)}}var cr=!1,fr=!1,dr=!1,vr=!1,pr=!1,Te;Te=Symbol.for("react.module.reference");function hr(e){return!!(typeof e=="string"||typeof e=="function"||e===s||e===c||pr||e===l||e===x||e===y||vr||e===k||cr||fr||dr||typeof e=="object"&&e!==null&&(e.$$typeof===C||e.$$typeof===R||e.$$typeof===m||e.$$typeof===d||e.$$typeof===f||e.$$typeof===Te||e.getModuleId!==void 0))}function mr(e,n,a){var u=e.displayName;if(u)return u;var g=n.displayName||n.name||"";return g!==""?a+"("+g+")":a}function Oe(e){return e.displayName||"Context"}function w(e){if(e==null)return null;if(typeof e.tag=="number"&&S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case s:return"Fragment";case i:return"Portal";case c:return"Profiler";case l:return"StrictMode";case x:return"Suspense";case y:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case d:var n=e;return Oe(n)+".Consumer";case m:var a=e;return Oe(a._context)+".Provider";case f:return mr(e,e.render,"ForwardRef");case R:var u=e.displayName||null;return u!==null?u:w(e.type)||"Memo";case C:{var g=e,b=g._payload,p=g._init;try{return w(p(b))}catch{return null}}}return null}var N=Object.assign,W=0,we,Pe,Ne,ke,Me,Fe,Ae;function Le(){}Le.__reactDisabledLog=!0;function gr(){{if(W===0){we=console.log,Pe=console.info,Ne=console.warn,ke=console.error,Me=console.group,Fe=console.groupCollapsed,Ae=console.groupEnd;var e={configurable:!0,enumerable:!0,value:Le,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}W++}}function yr(){{if(W--,W===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:N({},e,{value:we}),info:N({},e,{value:Pe}),warn:N({},e,{value:Ne}),error:N({},e,{value:ke}),group:N({},e,{value:Me}),groupCollapsed:N({},e,{value:Fe}),groupEnd:N({},e,{value:Ae})})}W<0&&S("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var se=M.ReactCurrentDispatcher,ue;function B(e,n,a){{if(ue===void 0)try{throw Error()}catch(g){var u=g.stack.trim().match(/\n( *(at )?)/);ue=u&&u[1]||""}return`
`+ue+e}}var le=!1,$;{var br=typeof WeakMap=="function"?WeakMap:Map;$=new br}function De(e,n){if(!e||le)return"";{var a=$.get(e);if(a!==void 0)return a}var u;le=!0;var g=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var b;b=se.current,se.current=null,gr();try{if(n){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(P){u=P}Reflect.construct(e,[],p)}else{try{p.call()}catch(P){u=P}e.call(p.prototype)}}else{try{throw Error()}catch(P){u=P}e()}}catch(P){if(P&&u&&typeof P.stack=="string"){for(var v=P.stack.split(`
`),T=u.stack.split(`
`),j=v.length-1,E=T.length-1;j>=1&&E>=0&&v[j]!==T[E];)E--;for(;j>=1&&E>=0;j--,E--)if(v[j]!==T[E]){if(j!==1||E!==1)do if(j--,E--,E<0||v[j]!==T[E]){var O=`
`+v[j].replace(" at new "," at ");return e.displayName&&O.includes("<anonymous>")&&(O=O.replace("<anonymous>",e.displayName)),typeof e=="function"&&$.set(e,O),O}while(j>=1&&E>=0);break}}}finally{le=!1,se.current=b,yr(),Error.prepareStackTrace=g}var A=e?e.displayName||e.name:"",Ke=A?B(A):"";return typeof e=="function"&&$.set(e,Ke),Ke}function xr(e,n,a){return De(e,!1)}function jr(e){var n=e.prototype;return!!(n&&n.isReactComponent)}function J(e,n,a){if(e==null)return"";if(typeof e=="function")return De(e,jr(e));if(typeof e=="string")return B(e);switch(e){case x:return B("Suspense");case y:return B("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case f:return xr(e.render);case R:return J(e.type,n,a);case C:{var u=e,g=u._payload,b=u._init;try{return J(b(g),n,a)}catch{}}}return""}var G=Object.prototype.hasOwnProperty,We={},Ye=M.ReactDebugCurrentFrame;function q(e){if(e){var n=e._owner,a=J(e.type,e._source,n?n.type:null);Ye.setExtraStackFrame(a)}else Ye.setExtraStackFrame(null)}function Rr(e,n,a,u,g){{var b=Function.call.bind(G);for(var p in e)if(b(e,p)){var v=void 0;try{if(typeof e[p]!="function"){var T=Error((u||"React class")+": "+a+" type `"+p+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[p]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw T.name="Invariant Violation",T}v=e[p](n,p,u,a,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(j){v=j}v&&!(v instanceof Error)&&(q(g),S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",u||"React class",a,p,typeof v),q(null)),v instanceof Error&&!(v.message in We)&&(We[v.message]=!0,q(g),S("Failed %s type: %s",a,v.message),q(null))}}}var Er=Array.isArray;function ce(e){return Er(e)}function _r(e){{var n=typeof Symbol=="function"&&Symbol.toStringTag,a=n&&e[Symbol.toStringTag]||e.constructor.name||"Object";return a}}function Cr(e){try{return ze(e),!1}catch{return!0}}function ze(e){return""+e}function Ve(e){if(Cr(e))return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",_r(e)),ze(e)}var Y=M.ReactCurrentOwner,Sr={key:!0,ref:!0,__self:!0,__source:!0},Ie,Ue,fe;fe={};function Tr(e){if(G.call(e,"ref")){var n=Object.getOwnPropertyDescriptor(e,"ref").get;if(n&&n.isReactWarning)return!1}return e.ref!==void 0}function Or(e){if(G.call(e,"key")){var n=Object.getOwnPropertyDescriptor(e,"key").get;if(n&&n.isReactWarning)return!1}return e.key!==void 0}function wr(e,n){if(typeof e.ref=="string"&&Y.current&&n&&Y.current.stateNode!==n){var a=w(Y.current.type);fe[a]||(S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',w(Y.current.type),e.ref),fe[a]=!0)}}function Pr(e,n){{var a=function(){Ie||(Ie=!0,S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",n))};a.isReactWarning=!0,Object.defineProperty(e,"key",{get:a,configurable:!0})}}function Nr(e,n){{var a=function(){Ue||(Ue=!0,S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",n))};a.isReactWarning=!0,Object.defineProperty(e,"ref",{get:a,configurable:!0})}}var kr=function(e,n,a,u,g,b,p){var v={$$typeof:o,type:e,key:n,ref:a,props:p,_owner:b};return v._store={},Object.defineProperty(v._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(v,"_self",{configurable:!1,enumerable:!1,writable:!1,value:u}),Object.defineProperty(v,"_source",{configurable:!1,enumerable:!1,writable:!1,value:g}),Object.freeze&&(Object.freeze(v.props),Object.freeze(v)),v};function Mr(e,n,a,u,g){{var b,p={},v=null,T=null;a!==void 0&&(Ve(a),v=""+a),Or(n)&&(Ve(n.key),v=""+n.key),Tr(n)&&(T=n.ref,wr(n,g));for(b in n)G.call(n,b)&&!Sr.hasOwnProperty(b)&&(p[b]=n[b]);if(e&&e.defaultProps){var j=e.defaultProps;for(b in j)p[b]===void 0&&(p[b]=j[b])}if(v||T){var E=typeof e=="function"?e.displayName||e.name||"Unknown":e;v&&Pr(p,E),T&&Nr(p,E)}return kr(e,v,T,g,u,Y.current,p)}}var de=M.ReactCurrentOwner,He=M.ReactDebugCurrentFrame;function F(e){if(e){var n=e._owner,a=J(e.type,e._source,n?n.type:null);He.setExtraStackFrame(a)}else He.setExtraStackFrame(null)}var ve;ve=!1;function pe(e){return typeof e=="object"&&e!==null&&e.$$typeof===o}function Be(){{if(de.current){var e=w(de.current.type);if(e)return`

Check the render method of \``+e+"`."}return""}}function Fr(e){{if(e!==void 0){var n=e.fileName.replace(/^.*[\\\/]/,""),a=e.lineNumber;return`

Check your code at `+n+":"+a+"."}return""}}var $e={};function Ar(e){{var n=Be();if(!n){var a=typeof e=="string"?e:e.displayName||e.name;a&&(n=`

Check the top-level render call using <`+a+">.")}return n}}function Je(e,n){{if(!e._store||e._store.validated||e.key!=null)return;e._store.validated=!0;var a=Ar(n);if($e[a])return;$e[a]=!0;var u="";e&&e._owner&&e._owner!==de.current&&(u=" It was passed a child from "+w(e._owner.type)+"."),F(e),S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',a,u),F(null)}}function Ge(e,n){{if(typeof e!="object")return;if(ce(e))for(var a=0;a<e.length;a++){var u=e[a];pe(u)&&Je(u,n)}else if(pe(e))e._store&&(e._store.validated=!0);else if(e){var g=ur(e);if(typeof g=="function"&&g!==e.entries)for(var b=g.call(e),p;!(p=b.next()).done;)pe(p.value)&&Je(p.value,n)}}}function Lr(e){{var n=e.type;if(n==null||typeof n=="string")return;var a;if(typeof n=="function")a=n.propTypes;else if(typeof n=="object"&&(n.$$typeof===f||n.$$typeof===R))a=n.propTypes;else return;if(a){var u=w(n);Rr(a,e.props,"prop",u,e)}else if(n.PropTypes!==void 0&&!ve){ve=!0;var g=w(n);S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",g||"Unknown")}typeof n.getDefaultProps=="function"&&!n.getDefaultProps.isReactClassApproved&&S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function Dr(e){{for(var n=Object.keys(e.props),a=0;a<n.length;a++){var u=n[a];if(u!=="children"&&u!=="key"){F(e),S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",u),F(null);break}}e.ref!==null&&(F(e),S("Invalid attribute `ref` supplied to `React.Fragment`."),F(null))}}function qe(e,n,a,u,g,b){{var p=hr(e);if(!p){var v="";(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(v+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var T=Fr(g);T?v+=T:v+=Be();var j;e===null?j="null":ce(e)?j="array":e!==void 0&&e.$$typeof===o?(j="<"+(w(e.type)||"Unknown")+" />",v=" Did you accidentally export a JSX literal instead of a component?"):j=typeof e,S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",j,v)}var E=Mr(e,n,a,g,b);if(E==null)return E;if(p){var O=n.children;if(O!==void 0)if(u)if(ce(O)){for(var A=0;A<O.length;A++)Ge(O[A],e);Object.freeze&&Object.freeze(O)}else S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else Ge(O,e)}return e===s?Dr(E):Lr(E),E}}function Wr(e,n,a){return qe(e,n,a,!0)}function Yr(e,n,a){return qe(e,n,a,!1)}var zr=Yr,Vr=Wr;D.Fragment=s,D.jsx=zr,D.jsxs=Vr}()),D}process.env.NODE_ENV==="production"?X.exports=Ze():X.exports=Qe();var r=X.exports;const Z=_.createContext(null),ge=({children:t})=>{const[o,i]=_.useState(!0),[s,l]=_.useState(!1);return r.jsx(Z.Provider,{value:{menuDesktopOpen:o,menuMobileOpen:s,setMenuDesktopOpen:i,setMenuMobileOpen:l},children:t})},Q=()=>{const t=_.useContext(Z);if(t===null)throw new Error("LayoutProvider is required!");return t},I=()=>{const t=_.useContext(Xe.configContext);if(t===void 0)throw new Error("UserProvider is required!");return t},ee=({children:t,defaultMessage:o="All rights reserved",holder:i,url:s,year:l})=>{const c=I(),m=()=>{const d=i||c?.copyright?.holder,f=s||c?.copyright?.url,x=l||new Date().getFullYear();if(d){const y=f?r.jsx("a",{href:f,target:"_blank",rel:"noreferrer",children:d}):d;return r.jsxs("div",{className:"copyright",children:["© ",x," ",y]})}return r.jsxs(r.Fragment,{children:["© ",x," ",o]})};return r.jsx("div",{className:"copyright",children:t||m()})},U=({alt:t,children:o,route:i,src:s})=>{const{appName:l,layout:c}=I(),m=z.useInRouterContext(),d=_.useMemo(()=>{if(l)return l.replace("@","").replace("/"," ")},[l]),f=i||c?.logoRoute||"/",x=s||c?.logo,y=t||c?.logoAlt||d||"My app",R=()=>x?r.jsx("img",{src:x,alt:y}):r.jsxs("span",{className:"logo-default",children:[r.jsx("span",{children:y[0]}),r.jsx("span",{children:y})]}),C=()=>r.jsx(r.Fragment,{children:m?r.jsx(z.Link,{to:f,children:R()}):r.jsx("a",{href:f,children:R()})});return r.jsx("div",{className:"logo",children:o||C()})},re=({navItem:t,displayIcon:o=!0,isGroupHeader:i})=>{const s=z.useInRouterContext();if("display"in t&&!t.display)return null;if("onClick"in t)return r.jsxs("div",{className:"nav-item",onClick:t.onClick,children:[o&&t.icon&&r.jsx("i",{className:t.icon}),t.label,i&&r.jsx("i",{className:"pi pi-angle-down nav-group-toggle"})]});const l=m=>{{const d=window.location.pathname.split("/");return window.location.pathname.startsWith(m)||d.length&&d.includes(m)}};if(s)return r.jsxs(z.NavLink,{to:t.route||"",end:t.route==="/",className:"nav-item",children:[o&&t.icon&&r.jsx("i",{className:t.icon}),r.jsx("span",{children:t.label})]});const c=l(t.route||"");return r.jsxs("a",{href:t.route,className:c?"nav-item active":"nav-item","aria-current":c?"page":void 0,children:[o&&t.icon&&r.jsx("i",{className:t.icon}),t.label]})},er=({navGroup:t,displayIcon:o=!0})=>{const[i,s]=_.useState(!1),l=()=>r.jsx("ul",{children:t.submenu&&t.submenu.map((c,m)=>r.jsx("li",{children:r.jsx(re,{navItem:c,displayIcon:o})},m))});return r.jsxs("div",{className:"nav-group","aria-expanded":i,children:[r.jsx(re,{navItem:{label:t.label,icon:t.icon,onClick:()=>s(!i)},displayIcon:o,isGroupHeader:!0}),l()]})},ye=({displayIcons:t=!0,horizontal:o=!1,navigationMenu:i})=>{const s=d=>r.jsx(er,{navGroup:d,displayIcon:t}),l=d=>"submenu"in d?s(d):r.jsx(re,{navItem:d,displayIcon:t}),c=({id:d,label:f,menu:x},y)=>r.jsxs("div",{className:"nav-menu-item","data-nav-menu-id":d,children:[f&&r.jsx("span",{children:f}),r.jsx("ul",{children:x.map((R,C)=>r.jsx("li",{children:l(R)},C))})]},y),m=()=>i?Array.isArray(i)?i.map((d,f)=>c(d,f)):c(i):null;return r.jsx("nav",{className:"navigation-menu","data-horizontal":o,children:m()})},ne=()=>{const{menuMobileOpen:t,setMenuMobileOpen:o}=Q();return r.jsx("span",{className:"toggle-menu",onClick:()=>o(!t),children:r.jsx("i",{className:t?"pi pi-times":"pi pi-bars"})})},te=({children:t,version:o})=>{const i=I(),s=o||i?.appVersion||"[App version]";return r.jsx("div",{className:"version",children:t||s})},be=({children:t,menu:o,noLocaleSwitcher:i})=>{const s=()=>r.jsxs(r.Fragment,{children:[o,!i&&r.jsx(V.LocaleSwitcher,{})]});return r.jsx("div",{className:"header-menu",children:t||s()})},xe=({children:t,title:o})=>{const i=()=>r.jsx("span",{children:o});return r.jsx("div",{className:"header-title",children:t||i()})},je=({children:t,displayNavIcons:o,title:i,navigationMenu:s,menu:l,noLocaleSwitcher:c,noLogo:m,noToggle:d})=>{const f=()=>r.jsxs(r.Fragment,{children:[!m&&r.jsx(U,{}),i&&r.jsx(xe,{title:i}),s&&r.jsx(ye,{navigationMenu:s,displayIcons:o,horizontal:!0}),(l||!c)&&r.jsx(be,{menu:l,noLocaleSwitcher:c}),!d&&r.jsx(ne,{})]});return r.jsx("header",{"data-nav":!!s,children:r.jsx("div",{className:"header-container",children:t||f()})})},rr=({children:t,className:o,fixed:i})=>{const{menuMobileOpen:s}=Q();return r.jsx("div",{className:`dz-layout ${o||""} ${i?"fixed":""}`.trimEnd(),"aria-expanded":s,children:t})},ae=({children:t,className:o,fixed:i})=>r.jsx(ge,{children:r.jsx(rr,{className:o,fixed:i,children:t})}),Re=({children:t,noLocaleSwitcher:o})=>{const i=()=>r.jsxs(r.Fragment,{children:[!o&&r.jsx(V.LocaleSwitcher,{}),r.jsx(ee,{}),r.jsx(te,{})]});return r.jsx("div",{className:"sidebar-footer",children:t||i()})},Ee=({children:t})=>{const o=()=>r.jsxs(r.Fragment,{children:[r.jsx(U,{}),r.jsx(ne,{})]});return r.jsx("div",{className:"sidebar-header",children:t||o()})},_e=({children:t,displayNavIcons:o=!1,navigationMenu:i,noHeader:s=!1,noFooter:l=!1,noLocaleSwitcher:c=!1})=>{const m=()=>r.jsxs(r.Fragment,{children:[!s&&r.jsx(Ee,{}),r.jsx(ye,{displayIcons:o,navigationMenu:i||[]}),!l&&r.jsx(Re,{noLocaleSwitcher:c})]});return r.jsx("aside",{children:t||m()})},oe=t=>{const{copyright:o=r.jsx(ee,{}),version:i=r.jsx(te,{})}=t;return r.jsxs("footer",{children:[o,i]})},nr=[{name:"header.menu.home",route:"/"},{name:"header.menu.about",route:"/about"}],Ce=t=>{const{t:o}=V.useTranslation("app"),{routes:i=nr,orientation:s="horizontal"}=t,l=()=>i.map(({name:c,route:m})=>({name:o(c),route:m}));return r.jsx(K.ResponsiveMenu,{className:"main-menu",routes:l(),orientation:s})},ie=t=>{const[o,i]=_.useState(!1),{layout:s}=I(),{localeSwitcher:l,logoRoute:c,logo:m,mainMenuOrientation:d,mainMenu:f,navStyle:x="dropdown",toggle:y=r.jsx("i",{className:"pi pi-align-justify"}),userMenu:R,mainMenuRoutes:C}=t;return r.jsxs("header",{children:[m||r.jsx(U,{route:c}),r.jsxs("nav",{className:`menu ${x}`,"data-expanded":o,children:[f||r.jsx(Ce,{routes:C||s?.mainMenu,orientation:d}),R,l||r.jsx(V.LocaleSwitcher,{})]}),r.jsx("div",{className:"toggle",onClick:()=>i(!o),children:y})]})},Se=({children:t,expandIcon:o=r.jsx("i",{className:"pi pi-angle-double-right"}),collapseIcon:i=r.jsx("i",{className:"pi pi-angle-double-left"})})=>{const[s,l]=_.useState(!0);return r.jsxs("div",{className:"sidebar","aria-expanded":s,children:[r.jsx("div",{className:"toggle-button",children:r.jsx(K.Button,{onClick:()=>l(!s),iconLeft:s?i:o,variant:"textOnly",severity:"secondary",size:"small"})}),t]})},tr=t=>{const{children:o,localSwitcher:i,logoRoute:s,menuToggle:l,mainMenuRoutes:c,userMenu:m,mainMenu:d,mainMenuOrientation:f,footer:x,header:y,fixed:R=!0}=t;return r.jsxs("div",{className:`layout basic ${R?"fixed":""}`.trimEnd(),children:[y||r.jsx(ie,{navStyle:"left-slider",userMenu:m,mainMenuRoutes:c,mainMenu:d,toggle:l,localeSwitcher:i,logoRoute:s,mainMenuOrientation:f}),r.jsx("main",{children:o}),x||r.jsx(oe,{})]})},ar=t=>{const{sidebar:o,children:i,footer:s,header:l,mainMenuRoutes:c,displaySidebarMenuIcon:m,displaySidebar:d=!0,localSwitcher:f,logoRoute:x,mainMenu:y,mainMenuOrientation:R,menuToggle:C,userMenu:k,fixed:H=!0}=t;return r.jsxs("div",{className:`layout collapsible ${H?"fixed":""}`.trimEnd(),children:[l||r.jsx(ie,{navStyle:"left-slider",mainMenuRoutes:c,localeSwitcher:f,logoRoute:x,mainMenu:y,mainMenuOrientation:R,toggle:C,userMenu:k}),d?r.jsx(r.Fragment,{children:o||r.jsx(Se,{children:r.jsx(K.ResponsiveMenu,{routes:c||[],orientation:"vertical",displayIcon:m})})}):null,r.jsx("main",{children:i}),s||r.jsx(oe,{})]})},or=({className:t,children:o,displayNavIcons:i,navigationMenu:s,title:l,menu:c,noLogo:m,noLocaleSwitcher:d,noToggle:f,customHeader:x,fixed:y=!0})=>r.jsxs(ae,{className:`header-only ${t||""}`.trimEnd(),fixed:y,children:[x||r.jsx(je,{displayNavIcons:i,navigationMenu:s,title:l,menu:c,noLogo:m,noLocaleSwitcher:d,noToggle:f}),r.jsx("main",{children:o})]}),ir=({className:t,children:o,displayNavIcons:i,navigationMenu:s,customSidebar:l,noSidebarHeader:c,noSidebarFooter:m})=>r.jsxs(ae,{className:`sidebar-only ${t||""}`.trimEnd(),children:[l||r.jsx(_e,{displayNavIcons:i,navigationMenu:s,noHeader:c,noFooter:m}),r.jsx("main",{children:o})]});h.AppFooter=oe,h.AppHeader=ie,h.BasicLayout=tr,h.CollapsibleSidebarLayout=ar,h.Copyright=ee,h.Header=je,h.HeaderLayout=or,h.HeaderMenu=be,h.HeaderTitle=xe,h.Layout=ae,h.LayoutContext=Z,h.LayoutProvider=ge,h.Logo=U,h.MainMenu=Ce,h.Sidebar=_e,h.SidebarFooter=Re,h.SidebarHeader=Ee,h.SidebarLegacy=Se,h.SidebarOnlyLayout=ir,h.ToggleMenuMobile=ne,h.Version=te,h.useLayoutContext=Q,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});
