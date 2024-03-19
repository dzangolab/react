import Pe, { createContext as _r, useState as $, useContext as Ne, useMemo as Cr } from "react";
import { configContext as Sr } from "@dzangolab/react-config";
import { useInRouterContext as ke, Link as Tr, NavLink as Or } from "react-router-dom";
import { LocaleSwitcher as ne, useTranslation as wr } from "@dzangolab/react-i18n";
import { ResponsiveMenu as Fe, Button as Pr } from "@dzangolab/react-ui";
var ee = { exports: {} }, D = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function Nr() {
  if (Oe)
    return D;
  Oe = 1;
  var t = Pe, o = Symbol.for("react.element"), i = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, l = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(d, f, j) {
    var g, b = {}, R = null, P = null;
    j !== void 0 && (R = "" + j), f.key !== void 0 && (R = "" + f.key), f.ref !== void 0 && (P = f.ref);
    for (g in f)
      s.call(f, g) && !c.hasOwnProperty(g) && (b[g] = f[g]);
    if (d && d.defaultProps)
      for (g in f = d.defaultProps, f)
        b[g] === void 0 && (b[g] = f[g]);
    return { $$typeof: o, type: d, key: R, ref: P, props: b, _owner: l.current };
  }
  return D.Fragment = i, D.jsx = m, D.jsxs = m, D;
}
var L = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var we;
function kr() {
  return we || (we = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Pe, o = Symbol.for("react.element"), i = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), d = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), W = Symbol.iterator, Ve = "@@iterator";
    function Be(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = W && e[W] || e[Ve];
      return typeof n == "function" ? n : null;
    }
    var N = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var n = arguments.length, a = new Array(n > 1 ? n - 1 : 0), u = 1; u < n; u++)
          a[u - 1] = arguments[u];
        He("error", e, a);
      }
    }
    function He(e, n, a) {
      {
        var u = N.ReactDebugCurrentFrame, h = u.getStackAddendum();
        h !== "" && (n += "%s", a = a.concat([h]));
        var x = a.map(function(p) {
          return String(p);
        });
        x.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, x);
      }
    }
    var qe = !1, ze = !1, Je = !1, Ge = !1, Ke = !1, ae;
    ae = Symbol.for("react.module.reference");
    function Xe(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === s || e === c || Ke || e === l || e === j || e === g || Ge || e === P || qe || ze || Je || typeof e == "object" && e !== null && (e.$$typeof === R || e.$$typeof === b || e.$$typeof === m || e.$$typeof === d || e.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ae || e.getModuleId !== void 0));
    }
    function Ze(e, n, a) {
      var u = e.displayName;
      if (u)
        return u;
      var h = n.displayName || n.name || "";
      return h !== "" ? a + "(" + h + ")" : a;
    }
    function oe(e) {
      return e.displayName || "Context";
    }
    function T(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case s:
          return "Fragment";
        case i:
          return "Portal";
        case c:
          return "Profiler";
        case l:
          return "StrictMode";
        case j:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            var n = e;
            return oe(n) + ".Consumer";
          case m:
            var a = e;
            return oe(a._context) + ".Provider";
          case f:
            return Ze(e, e.render, "ForwardRef");
          case b:
            var u = e.displayName || null;
            return u !== null ? u : T(e.type) || "Memo";
          case R: {
            var h = e, x = h._payload, p = h._init;
            try {
              return T(p(x));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var w = Object.assign, A = 0, ie, se, ue, le, ce, fe, de;
    function ve() {
    }
    ve.__reactDisabledLog = !0;
    function Qe() {
      {
        if (A === 0) {
          ie = console.log, se = console.info, ue = console.warn, le = console.error, ce = console.group, fe = console.groupCollapsed, de = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ve,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        A++;
      }
    }
    function er() {
      {
        if (A--, A === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: w({}, e, {
              value: ie
            }),
            info: w({}, e, {
              value: se
            }),
            warn: w({}, e, {
              value: ue
            }),
            error: w({}, e, {
              value: le
            }),
            group: w({}, e, {
              value: ce
            }),
            groupCollapsed: w({}, e, {
              value: fe
            }),
            groupEnd: w({}, e, {
              value: de
            })
          });
        }
        A < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var q = N.ReactCurrentDispatcher, z;
    function Y(e, n, a) {
      {
        if (z === void 0)
          try {
            throw Error();
          } catch (h) {
            var u = h.stack.trim().match(/\n( *(at )?)/);
            z = u && u[1] || "";
          }
        return `
` + z + e;
      }
    }
    var J = !1, I;
    {
      var rr = typeof WeakMap == "function" ? WeakMap : Map;
      I = new rr();
    }
    function pe(e, n) {
      if (!e || J)
        return "";
      {
        var a = I.get(e);
        if (a !== void 0)
          return a;
      }
      var u;
      J = !0;
      var h = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var x;
      x = q.current, q.current = null, Qe();
      try {
        if (n) {
          var p = function() {
            throw Error();
          };
          if (Object.defineProperty(p.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(p, []);
            } catch (O) {
              u = O;
            }
            Reflect.construct(e, [], p);
          } else {
            try {
              p.call();
            } catch (O) {
              u = O;
            }
            e.call(p.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (O) {
            u = O;
          }
          e();
        }
      } catch (O) {
        if (O && u && typeof O.stack == "string") {
          for (var v = O.stack.split(`
`), C = u.stack.split(`
`), y = v.length - 1, E = C.length - 1; y >= 1 && E >= 0 && v[y] !== C[E]; )
            E--;
          for (; y >= 1 && E >= 0; y--, E--)
            if (v[y] !== C[E]) {
              if (y !== 1 || E !== 1)
                do
                  if (y--, E--, E < 0 || v[y] !== C[E]) {
                    var S = `
` + v[y].replace(" at new ", " at ");
                    return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && I.set(e, S), S;
                  }
                while (y >= 1 && E >= 0);
              break;
            }
        }
      } finally {
        J = !1, q.current = x, er(), Error.prepareStackTrace = h;
      }
      var F = e ? e.displayName || e.name : "", Te = F ? Y(F) : "";
      return typeof e == "function" && I.set(e, Te), Te;
    }
    function nr(e, n, a) {
      return pe(e, !1);
    }
    function tr(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function U(e, n, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return pe(e, tr(e));
      if (typeof e == "string")
        return Y(e);
      switch (e) {
        case j:
          return Y("Suspense");
        case g:
          return Y("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            return nr(e.render);
          case b:
            return U(e.type, n, a);
          case R: {
            var u = e, h = u._payload, x = u._init;
            try {
              return U(x(h), n, a);
            } catch {
            }
          }
        }
      return "";
    }
    var V = Object.prototype.hasOwnProperty, me = {}, he = N.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var n = e._owner, a = U(e.type, e._source, n ? n.type : null);
        he.setExtraStackFrame(a);
      } else
        he.setExtraStackFrame(null);
    }
    function ar(e, n, a, u, h) {
      {
        var x = Function.call.bind(V);
        for (var p in e)
          if (x(e, p)) {
            var v = void 0;
            try {
              if (typeof e[p] != "function") {
                var C = Error((u || "React class") + ": " + a + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw C.name = "Invariant Violation", C;
              }
              v = e[p](n, p, u, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              v = y;
            }
            v && !(v instanceof Error) && (B(h), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", u || "React class", a, p, typeof v), B(null)), v instanceof Error && !(v.message in me) && (me[v.message] = !0, B(h), _("Failed %s type: %s", a, v.message), B(null));
          }
      }
    }
    var or = Array.isArray;
    function G(e) {
      return or(e);
    }
    function ir(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, a = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function sr(e) {
      try {
        return ge(e), !1;
      } catch {
        return !0;
      }
    }
    function ge(e) {
      return "" + e;
    }
    function xe(e) {
      if (sr(e))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ir(e)), ge(e);
    }
    var M = N.ReactCurrentOwner, ur = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, je, ye, K;
    K = {};
    function lr(e) {
      if (V.call(e, "ref")) {
        var n = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function cr(e) {
      if (V.call(e, "key")) {
        var n = Object.getOwnPropertyDescriptor(e, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function fr(e, n) {
      if (typeof e.ref == "string" && M.current && n && M.current.stateNode !== n) {
        var a = T(M.current.type);
        K[a] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', T(M.current.type), e.ref), K[a] = !0);
      }
    }
    function dr(e, n) {
      {
        var a = function() {
          je || (je = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function vr(e, n) {
      {
        var a = function() {
          ye || (ye = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var pr = function(e, n, a, u, h, x, p) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: o,
        // Built-in properties that belong on the element
        type: e,
        key: n,
        ref: a,
        props: p,
        // Record the component responsible for creating this element.
        _owner: x
      };
      return v._store = {}, Object.defineProperty(v._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(v, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.defineProperty(v, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: h
      }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
    };
    function mr(e, n, a, u, h) {
      {
        var x, p = {}, v = null, C = null;
        a !== void 0 && (xe(a), v = "" + a), cr(n) && (xe(n.key), v = "" + n.key), lr(n) && (C = n.ref, fr(n, h));
        for (x in n)
          V.call(n, x) && !ur.hasOwnProperty(x) && (p[x] = n[x]);
        if (e && e.defaultProps) {
          var y = e.defaultProps;
          for (x in y)
            p[x] === void 0 && (p[x] = y[x]);
        }
        if (v || C) {
          var E = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && dr(p, E), C && vr(p, E);
        }
        return pr(e, v, C, h, u, M.current, p);
      }
    }
    var X = N.ReactCurrentOwner, be = N.ReactDebugCurrentFrame;
    function k(e) {
      if (e) {
        var n = e._owner, a = U(e.type, e._source, n ? n.type : null);
        be.setExtraStackFrame(a);
      } else
        be.setExtraStackFrame(null);
    }
    var Z;
    Z = !1;
    function Q(e) {
      return typeof e == "object" && e !== null && e.$$typeof === o;
    }
    function Ee() {
      {
        if (X.current) {
          var e = T(X.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function hr(e) {
      {
        if (e !== void 0) {
          var n = e.fileName.replace(/^.*[\\\/]/, ""), a = e.lineNumber;
          return `

Check your code at ` + n + ":" + a + ".";
        }
        return "";
      }
    }
    var Re = {};
    function gr(e) {
      {
        var n = Ee();
        if (!n) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (n = `

Check the top-level render call using <` + a + ">.");
        }
        return n;
      }
    }
    function _e(e, n) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var a = gr(n);
        if (Re[a])
          return;
        Re[a] = !0;
        var u = "";
        e && e._owner && e._owner !== X.current && (u = " It was passed a child from " + T(e._owner.type) + "."), k(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, u), k(null);
      }
    }
    function Ce(e, n) {
      {
        if (typeof e != "object")
          return;
        if (G(e))
          for (var a = 0; a < e.length; a++) {
            var u = e[a];
            Q(u) && _e(u, n);
          }
        else if (Q(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var h = Be(e);
          if (typeof h == "function" && h !== e.entries)
            for (var x = h.call(e), p; !(p = x.next()).done; )
              Q(p.value) && _e(p.value, n);
        }
      }
    }
    function xr(e) {
      {
        var n = e.type;
        if (n == null || typeof n == "string")
          return;
        var a;
        if (typeof n == "function")
          a = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === b))
          a = n.propTypes;
        else
          return;
        if (a) {
          var u = T(n);
          ar(a, e.props, "prop", u, e);
        } else if (n.PropTypes !== void 0 && !Z) {
          Z = !0;
          var h = T(n);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", h || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function jr(e) {
      {
        for (var n = Object.keys(e.props), a = 0; a < n.length; a++) {
          var u = n[a];
          if (u !== "children" && u !== "key") {
            k(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", u), k(null);
            break;
          }
        }
        e.ref !== null && (k(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), k(null));
      }
    }
    function Se(e, n, a, u, h, x) {
      {
        var p = Xe(e);
        if (!p) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var C = hr(h);
          C ? v += C : v += Ee();
          var y;
          e === null ? y = "null" : G(e) ? y = "array" : e !== void 0 && e.$$typeof === o ? (y = "<" + (T(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : y = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", y, v);
        }
        var E = mr(e, n, a, h, x);
        if (E == null)
          return E;
        if (p) {
          var S = n.children;
          if (S !== void 0)
            if (u)
              if (G(S)) {
                for (var F = 0; F < S.length; F++)
                  Ce(S[F], e);
                Object.freeze && Object.freeze(S);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ce(S, e);
        }
        return e === s ? jr(E) : xr(E), E;
      }
    }
    function yr(e, n, a) {
      return Se(e, n, a, !0);
    }
    function br(e, n, a) {
      return Se(e, n, a, !1);
    }
    var Er = br, Rr = yr;
    L.Fragment = s, L.jsx = Er, L.jsxs = Rr;
  }()), L;
}
process.env.NODE_ENV === "production" ? ee.exports = Nr() : ee.exports = kr();
var r = ee.exports;
const Ae = _r(null), Fr = ({ children: t }) => {
  const [o, i] = $(!0), [s, l] = $(!1);
  return /* @__PURE__ */ r.jsx(
    Ae.Provider,
    {
      value: {
        menuDesktopOpen: o,
        menuMobileOpen: s,
        setMenuDesktopOpen: i,
        setMenuMobileOpen: l
      },
      children: t
    }
  );
}, Me = () => {
  const t = Ne(Ae);
  if (t === null)
    throw new Error("LayoutProvider is required!");
  return t;
}, H = () => {
  const t = Ne(Sr);
  if (t === void 0)
    throw new Error("UserProvider is required!");
  return t;
}, De = ({
  children: t,
  defaultMessage: o = "All rights reserved",
  holder: i,
  url: s,
  year: l
}) => {
  const c = H(), m = () => {
    const d = i || c?.copyright?.holder, f = s || c?.copyright?.url, j = l || (/* @__PURE__ */ new Date()).getFullYear();
    if (d) {
      const g = f ? /* @__PURE__ */ r.jsx("a", { href: f, target: "_blank", rel: "noreferrer", children: d }) : d;
      return /* @__PURE__ */ r.jsxs("div", { className: "copyright", children: [
        "© ",
        j,
        " ",
        g
      ] });
    }
    return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      "© ",
      j,
      " ",
      o
    ] });
  };
  return /* @__PURE__ */ r.jsx("div", { className: "copyright", children: t || m() });
}, te = ({
  alt: t,
  children: o,
  route: i,
  src: s
}) => {
  const { appName: l, layout: c } = H(), m = ke(), d = Cr(() => {
    if (l)
      return l.replace("@", "").replace("/", " ");
  }, [l]), f = i || c?.logoRoute || "/", j = s || c?.logo, g = t || c?.logoAlt || d || "My app", b = () => j ? /* @__PURE__ */ r.jsx("img", { src: j, alt: g }) : /* @__PURE__ */ r.jsxs("span", { className: "logo-default", children: [
    /* @__PURE__ */ r.jsx("span", { children: g[0] }),
    /* @__PURE__ */ r.jsx("span", { children: g })
  ] }), R = () => /* @__PURE__ */ r.jsx(r.Fragment, { children: m ? /* @__PURE__ */ r.jsx(Tr, { to: f, children: b() }) : /* @__PURE__ */ r.jsx("a", { href: f, children: b() }) });
  return /* @__PURE__ */ r.jsx("div", { className: "logo", children: o || R() });
}, re = ({
  navItem: t,
  displayIcon: o = !0,
  isGroupHeader: i
}) => {
  const s = ke();
  if ("display" in t && !t.display)
    return null;
  if ("onClick" in t)
    return /* @__PURE__ */ r.jsxs("div", { className: "nav-item", onClick: t.onClick, children: [
      o && t.icon && /* @__PURE__ */ r.jsx("i", { className: t.icon }),
      t.label,
      i && /* @__PURE__ */ r.jsx("i", { className: "pi pi-angle-down nav-group-toggle" })
    ] });
  const l = (m) => {
    {
      const d = window.location.pathname.split("/");
      return window.location.pathname.startsWith(m) || d.length && d.includes(m);
    }
  };
  if (s)
    return /* @__PURE__ */ r.jsxs(
      Or,
      {
        to: t.route || "",
        end: t.route === "/",
        className: "nav-item",
        children: [
          o && t.icon && /* @__PURE__ */ r.jsx("i", { className: t.icon }),
          /* @__PURE__ */ r.jsx("span", { children: t.label })
        ]
      }
    );
  const c = l(t.route || "");
  return /* @__PURE__ */ r.jsxs(
    "a",
    {
      href: t.route,
      className: c ? "nav-item active" : "nav-item",
      "aria-current": c ? "page" : void 0,
      children: [
        o && t.icon && /* @__PURE__ */ r.jsx("i", { className: t.icon }),
        t.label
      ]
    }
  );
}, Ar = ({
  navGroup: t,
  displayIcon: o = !0
}) => {
  const [i, s] = $(!1), l = () => /* @__PURE__ */ r.jsx("ul", { children: t.submenu && t.submenu.map((c, m) => /* @__PURE__ */ r.jsx("li", { children: /* @__PURE__ */ r.jsx(re, { navItem: c, displayIcon: o }) }, m)) });
  return /* @__PURE__ */ r.jsxs("div", { className: "nav-group", "aria-expanded": i, children: [
    /* @__PURE__ */ r.jsx(
      re,
      {
        navItem: {
          label: t.label,
          icon: t.icon,
          onClick: () => s(!i)
        },
        displayIcon: o,
        isGroupHeader: !0
      }
    ),
    l()
  ] });
}, Le = ({
  displayIcons: t = !0,
  horizontal: o = !1,
  navigationMenu: i
}) => {
  const s = (d) => /* @__PURE__ */ r.jsx(Ar, { navGroup: d, displayIcon: t }), l = (d) => "submenu" in d ? s(d) : /* @__PURE__ */ r.jsx(re, { navItem: d, displayIcon: t }), c = ({ id: d, label: f, menu: j }, g) => /* @__PURE__ */ r.jsxs("div", { className: "nav-menu-item", "data-nav-menu-id": d, children: [
    f && /* @__PURE__ */ r.jsx("span", { children: f }),
    /* @__PURE__ */ r.jsx("ul", { children: j.map((b, R) => /* @__PURE__ */ r.jsx("li", { children: l(b) }, R)) })
  ] }, g), m = () => i ? Array.isArray(i) ? i.map(
    (d, f) => c(d, f)
  ) : c(i) : null;
  return /* @__PURE__ */ r.jsx("nav", { className: "navigation-menu", "data-horizontal": o, children: m() });
}, $e = () => {
  const { menuMobileOpen: t, setMenuMobileOpen: o } = Me();
  return /* @__PURE__ */ r.jsx(
    "span",
    {
      className: "toggle-menu",
      onClick: () => o(!t),
      children: /* @__PURE__ */ r.jsx("i", { className: t ? "pi pi-times" : "pi pi-bars" })
    }
  );
}, We = ({ children: t, version: o }) => {
  const i = H(), s = o || i?.appVersion || "[App version]";
  return /* @__PURE__ */ r.jsx("div", { className: "version", children: t || s });
}, Mr = ({
  children: t,
  menu: o,
  noLocaleSwitcher: i
}) => {
  const s = () => /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    o,
    !i && /* @__PURE__ */ r.jsx(ne, {})
  ] });
  return /* @__PURE__ */ r.jsx("div", { className: "header-menu", children: t || s() });
}, Dr = ({ children: t, title: o }) => {
  const i = () => /* @__PURE__ */ r.jsx("span", { children: o });
  return /* @__PURE__ */ r.jsx("div", { className: "header-title", children: t || i() });
}, Lr = ({
  children: t,
  displayNavIcons: o,
  title: i,
  navigationMenu: s,
  menu: l,
  noLocaleSwitcher: c,
  noLogo: m,
  noToggle: d
}) => {
  const f = () => /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    !m && /* @__PURE__ */ r.jsx(te, {}),
    i && /* @__PURE__ */ r.jsx(Dr, { title: i }),
    s && /* @__PURE__ */ r.jsx(
      Le,
      {
        navigationMenu: s,
        displayIcons: o,
        horizontal: !0
      }
    ),
    (l || !c) && /* @__PURE__ */ r.jsx(Mr, { menu: l, noLocaleSwitcher: c }),
    !d && /* @__PURE__ */ r.jsx($e, {})
  ] });
  return /* @__PURE__ */ r.jsx("header", { "data-nav": !!s, children: /* @__PURE__ */ r.jsx("div", { className: "header-container", children: t || f() }) });
}, $r = ({ children: t, className: o, fixed: i }) => {
  const { menuMobileOpen: s } = Me();
  return /* @__PURE__ */ r.jsx(
    "div",
    {
      className: `dz-layout ${o || ""} ${i ? "fixed" : ""}`.trimEnd(),
      "aria-expanded": s,
      children: t
    }
  );
}, Ye = ({ children: t, className: o, fixed: i }) => /* @__PURE__ */ r.jsx(Fr, { children: /* @__PURE__ */ r.jsx($r, { className: o, fixed: i, children: t }) }), Wr = ({
  children: t,
  noLocaleSwitcher: o
}) => {
  const i = () => /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    !o && /* @__PURE__ */ r.jsx(ne, {}),
    /* @__PURE__ */ r.jsx(De, {}),
    /* @__PURE__ */ r.jsx(We, {})
  ] });
  return /* @__PURE__ */ r.jsx("div", { className: "sidebar-footer", children: t || i() });
}, Yr = ({ children: t }) => {
  const o = () => /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(te, {}),
    /* @__PURE__ */ r.jsx($e, {})
  ] });
  return /* @__PURE__ */ r.jsx("div", { className: "sidebar-header", children: t || o() });
}, Ir = ({
  children: t,
  displayNavIcons: o = !1,
  navigationMenu: i,
  noHeader: s = !1,
  noFooter: l = !1,
  noLocaleSwitcher: c = !1
}) => {
  const m = () => /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    !s && /* @__PURE__ */ r.jsx(Yr, {}),
    /* @__PURE__ */ r.jsx(
      Le,
      {
        displayIcons: o,
        navigationMenu: i || []
      }
    ),
    !l && /* @__PURE__ */ r.jsx(Wr, { noLocaleSwitcher: c })
  ] });
  return /* @__PURE__ */ r.jsx("aside", { children: t || m() });
}, Ie = (t) => {
  const { copyright: o = /* @__PURE__ */ r.jsx(De, {}), version: i = /* @__PURE__ */ r.jsx(We, {}) } = t;
  return /* @__PURE__ */ r.jsxs("footer", { children: [
    o,
    i
  ] });
}, Ur = [
  {
    name: "header.menu.home",
    route: "/"
  },
  {
    name: "header.menu.about",
    route: "/about"
  }
], Vr = (t) => {
  const { t: o } = wr("app"), { routes: i = Ur, orientation: s = "horizontal" } = t, l = () => i.map(({ name: c, route: m }) => ({
    name: o(c),
    route: m
  }));
  return /* @__PURE__ */ r.jsx(
    Fe,
    {
      className: "main-menu",
      routes: l(),
      orientation: s
    }
  );
}, Ue = (t) => {
  const [o, i] = $(!1), { layout: s } = H(), {
    localeSwitcher: l,
    logoRoute: c,
    logo: m,
    mainMenuOrientation: d,
    mainMenu: f,
    navStyle: j = "dropdown",
    toggle: g = /* @__PURE__ */ r.jsx("i", { className: "pi pi-align-justify" }),
    userMenu: b,
    mainMenuRoutes: R
  } = t;
  return /* @__PURE__ */ r.jsxs("header", { children: [
    m || /* @__PURE__ */ r.jsx(te, { route: c }),
    /* @__PURE__ */ r.jsxs("nav", { className: `menu ${j}`, "data-expanded": o, children: [
      f || /* @__PURE__ */ r.jsx(
        Vr,
        {
          routes: R || s?.mainMenu,
          orientation: d
        }
      ),
      b,
      l || /* @__PURE__ */ r.jsx(ne, {})
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "toggle", onClick: () => i(!o), children: g })
  ] });
}, Br = ({
  children: t,
  expandIcon: o = /* @__PURE__ */ r.jsx("i", { className: "pi pi-angle-double-right" }),
  collapseIcon: i = /* @__PURE__ */ r.jsx("i", { className: "pi pi-angle-double-left" })
}) => {
  const [s, l] = $(!0);
  return /* @__PURE__ */ r.jsxs("div", { className: "sidebar", "aria-expanded": s, children: [
    /* @__PURE__ */ r.jsx("div", { className: "toggle-button", children: /* @__PURE__ */ r.jsx(
      Pr,
      {
        onClick: () => l(!s),
        iconLeft: s ? i : o,
        variant: "textOnly",
        severity: "secondary",
        size: "small"
      }
    ) }),
    t
  ] });
}, Kr = (t) => {
  const {
    children: o,
    localSwitcher: i,
    logoRoute: s,
    menuToggle: l,
    mainMenuRoutes: c,
    userMenu: m,
    mainMenu: d,
    mainMenuOrientation: f,
    footer: j,
    header: g,
    fixed: b = !0
  } = t;
  return /* @__PURE__ */ r.jsxs("div", { className: `layout basic ${b ? "fixed" : ""}`.trimEnd(), children: [
    g || /* @__PURE__ */ r.jsx(
      Ue,
      {
        navStyle: "left-slider",
        userMenu: m,
        mainMenuRoutes: c,
        mainMenu: d,
        toggle: l,
        localeSwitcher: i,
        logoRoute: s,
        mainMenuOrientation: f
      }
    ),
    /* @__PURE__ */ r.jsx("main", { children: o }),
    j || /* @__PURE__ */ r.jsx(Ie, {})
  ] });
}, Xr = (t) => {
  const {
    sidebar: o,
    children: i,
    footer: s,
    header: l,
    mainMenuRoutes: c,
    displaySidebarMenuIcon: m,
    displaySidebar: d = !0,
    localSwitcher: f,
    logoRoute: j,
    mainMenu: g,
    mainMenuOrientation: b,
    menuToggle: R,
    userMenu: P,
    fixed: W = !0
  } = t;
  return /* @__PURE__ */ r.jsxs("div", { className: `layout collapsible ${W ? "fixed" : ""}`.trimEnd(), children: [
    l || /* @__PURE__ */ r.jsx(
      Ue,
      {
        navStyle: "left-slider",
        mainMenuRoutes: c,
        localeSwitcher: f,
        logoRoute: j,
        mainMenu: g,
        mainMenuOrientation: b,
        toggle: R,
        userMenu: P
      }
    ),
    d ? /* @__PURE__ */ r.jsx(r.Fragment, { children: o || /* @__PURE__ */ r.jsx(Br, { children: /* @__PURE__ */ r.jsx(
      Fe,
      {
        routes: c || [],
        orientation: "vertical",
        displayIcon: m
      }
    ) }) }) : null,
    /* @__PURE__ */ r.jsx("main", { children: i }),
    s || /* @__PURE__ */ r.jsx(Ie, {})
  ] });
}, Zr = ({
  className: t,
  children: o,
  displayNavIcons: i,
  navigationMenu: s,
  title: l,
  menu: c,
  noLogo: m,
  noLocaleSwitcher: d,
  noToggle: f,
  customHeader: j,
  fixed: g = !0
}) => /* @__PURE__ */ r.jsxs(
  Ye,
  {
    className: `header-only ${t || ""}`.trimEnd(),
    fixed: g,
    children: [
      j || /* @__PURE__ */ r.jsx(
        Lr,
        {
          displayNavIcons: i,
          navigationMenu: s,
          title: l,
          menu: c,
          noLogo: m,
          noLocaleSwitcher: d,
          noToggle: f
        }
      ),
      /* @__PURE__ */ r.jsx("main", { children: o })
    ]
  }
), Qr = ({
  className: t,
  children: o,
  displayNavIcons: i,
  navigationMenu: s,
  customSidebar: l,
  noSidebarHeader: c,
  noSidebarFooter: m
}) => /* @__PURE__ */ r.jsxs(Ye, { className: `sidebar-only ${t || ""}`.trimEnd(), children: [
  l || /* @__PURE__ */ r.jsx(
    Ir,
    {
      displayNavIcons: i,
      navigationMenu: s,
      noHeader: c,
      noFooter: m
    }
  ),
  /* @__PURE__ */ r.jsx("main", { children: o })
] });
export {
  Ie as AppFooter,
  Ue as AppHeader,
  Kr as BasicLayout,
  Xr as CollapsibleSidebarLayout,
  De as Copyright,
  Lr as Header,
  Zr as HeaderLayout,
  Mr as HeaderMenu,
  Dr as HeaderTitle,
  Ye as Layout,
  Ae as LayoutContext,
  Fr as LayoutProvider,
  te as Logo,
  Vr as MainMenu,
  Ir as Sidebar,
  Wr as SidebarFooter,
  Yr as SidebarHeader,
  Br as SidebarLegacy,
  Qr as SidebarOnlyLayout,
  $e as ToggleMenuMobile,
  We as Version,
  Me as useLayoutContext
};
