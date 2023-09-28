// ==UserScript==
// @name         Pet Preview
// @namespace    https://www.marapets.com/
// @version      0.1
// @description  Show a picture of your default pet on all pages
// @author       Lily Skye
// @match        *://*.marapets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=marapets.com
// @grant        none
// ==/UserScript==
(function(global) {

function factory() {
var modules = {
/* --- src/pet-preview.tsx --- */
"src/pet-preview.tsx": (function (exports, _kame_require_, module, __filename, __dirname, _kame_dynamic_import_) {
// ==UserScript==
// @name         Pet Preview
// @namespace    https://www.marapets.com/
// @version      0.1
// @description  Show a picture of your default pet on all pages
// @author       Lily Skye
// @match        *://*.marapets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=marapets.com
// @grant        none
// ==/UserScript==
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const _interop_require_wildcard = _kame_require_("node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs");
const _jsxdom = /*#__PURE__*/_interop_require_wildcard._(_kame_require_("node_modules/@suchipi/jsxdom/dist/jsxdom.umd.js"));
// Our compiler is configured to output 'React.createElement', so aliasing this
// to 'React' makes everything work properly
const React = _jsxdom;
(async function () {
  if (location.href.match(/index\.php/)) {
    console.info("Pet Preview UserScript: Caching pet image and link...");
    // We're on the homepage! Scrape the default pet and save it to localStorage.
    const defaultPetLink = document.querySelector(`a[href^="pets.php?id="]`);
    const defaultPetImg = document.querySelector("img.defaultpet");
    const linkHref = defaultPetLink?.getAttribute("href");
    const imgSrc = defaultPetImg?.getAttribute("src");
    if (linkHref == null) {
      console.error("Pet Preview UserScript: Could not find default pet link");
    }
    if (imgSrc == null) {
      console.error("Pet Preview UserScript: Could not find default pet image");
    }
    // the '1' is the schema version
    localStorage.__userscript_suchipi_pet_preview_1 = JSON.stringify({
      linkHref,
      imgSrc
    });
  }
  const savedJson = localStorage.__userscript_suchipi_pet_preview_1;
  if (typeof savedJson !== "string") {
    console.warn("Pet Preview UserScript: Pet not cached yet. Click the 'Marapets' logo to cache it!");
  }
  const {
    linkHref,
    imgSrc
  } = JSON.parse(savedJson);
  let eltoAppend = null;
  if (linkHref != null && imgSrc != null) {
    eltoAppend = /*#__PURE__*/React.createElement("a", {
      href: linkHref
    }, /*#__PURE__*/React.createElement("img", {
      className: "defaultpet",
      style: {
        width: "75px",
        height: "75px",
        position: "fixed",
        top: "30px",
        zIndex: "1"
      },
      src: imgSrc
    }));
  } else if (imgSrc != null) {
    eltoAppend = /*#__PURE__*/React.createElement("img", {
      className: "defaultpet",
      style: {
        width: "75px",
        height: "75px",
        position: "fixed",
        top: "30px",
        zIndex: "1"
      },
      src: imgSrc
    });
  }
  if (eltoAppend != null) {
    document.body.appendChild(eltoAppend);
  }
})();
}),
/* --- node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs --- */
"node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs": (function (exports, _kame_require_, module, __filename, __dirname, _kame_dynamic_import_) {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
exports._ = exports._interop_require_wildcard = _interop_require_wildcard;
function _interop_require_wildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) return obj;
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
    default: obj
  };
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) return cache.get(obj);
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);else newObj[key] = obj[key];
    }
  }
  newObj.default = obj;
  if (cache) cache.set(obj, newObj);
  return newObj;
}
}),
/* --- node_modules/@suchipi/jsxdom/dist/jsxdom.umd.js --- */
"node_modules/@suchipi/jsxdom/dist/jsxdom.umd.js": (function (exports, _kame_require_, module, __filename, __dirname, _kame_dynamic_import_) {
(function (e, l) {
  typeof exports == "object" && typeof module != "undefined" ? l(exports) : typeof define == "function" && define.amd ? define(["exports"], l) : (e = typeof globalThis != "undefined" ? globalThis : e || self, l(e.JSXDOM = {}));
})(this, function (e) {
  "use strict";

  var h = Object.getOwnPropertySymbols;
  var g = Object.prototype.hasOwnProperty,
    E = Object.prototype.propertyIsEnumerable;
  var p = (e, l) => {
    var f = {};
    for (var n in e) g.call(e, n) && l.indexOf(n) < 0 && (f[n] = e[n]);
    if (e != null && h) for (var n of h(e)) l.indexOf(n) < 0 && E.call(e, n) && (f[n] = e[n]);
    return f;
  };
  const l = Symbol("REF"),
    f = (...t) => ({
      [l]: !0,
      current: t.length > 0 ? t[0] : null
    }),
    n = (t, c) => {
      if (typeof t != "string") return document.createDocumentFragment();
      const F = c,
        {
          style: u,
          ref: o,
          namespaceURI: r,
          children: s,
          tagName: d
        } = F,
        a = p(F, ["style", "ref", "namespaceURI", "children", "tagName"]);
      let i;
      return r ? i = document.createElementNS(r, t) : i = document.createElement(t), u != null && Object.assign(i.style, u), o != null && (typeof o == "function" ? o(i) : o.current = i), Object.assign(i, a), i;
    };
  let m = n;
  const N = t => {
      m = t;
    },
    y = (t, ...c) => {
      let u = null,
        o = null;
      typeof c[0] == "object" && c[0] != null ? c[0] instanceof Node ? o = c : (u = c[0], o = c.slice(1)) : o = c, o = o.flat(1 / 0);
      const r = u || {};
      if (r.children = o, t === DocumentFragment || typeof t == "string") {
        const s = m(t, r);
        for (const d of o) if (d != null) if (typeof d == "object") s.appendChild(d);else {
          const a = document.createTextNode(String(d));
          s.appendChild(a);
        }
        return s;
      } else return t(r);
    },
    b = y,
    j = DocumentFragment;
  e.Fragment = j, e.createElement = b, e.defaultNodeFactory = n, e.jsx = y, e.ref = f, e.setNodeFactory = N, Object.defineProperties(e, {
    __esModule: {
      value: !0
    },
    [Symbol.toStringTag]: {
      value: "Module"
    }
  });
});
})
/* --- end of modules --- */};

var __kame__ = {
	basedir: typeof __dirname === 'string' ? __dirname : "",
	cache: {},
	runModule: function runModule(name, isMain) {
		var exports = {};
		var module = {
			id: name,
			exports: exports,
		};

		__kame__.cache[name] = module;

		var _kame_require_ = function require(id) {
			if (__kame__.cache[id]) {
				return __kame__.cache[id].exports;
			} else {
				__kame__.runModule(id, false);
				return __kame__.cache[id].exports;
			}
		};
		_kame_require_.cache = __kame__.cache;

		if (isMain) {
			_kame_require_.main = module;
		}

		var __filename = __kame__.basedir + "/" + name;
		var __dirname = __kame__.basedir + "/" + name.split("/").slice(0, -1).join("/");

		

		__kame__.modules[name](exports, _kame_require_, module, __filename, __dirname );
		return module.exports;
	},
	
	modules: modules,
};



return __kame__.runModule("src/pet-preview.tsx", true);
}

if (typeof exports === 'object' && typeof module !== 'undefined') {
	module.exports = factory();
} else if (typeof define === 'function' && define.amd) {
	define([], factory);
} else {
	factory()
}

})(
	typeof global !== "undefined" ? global :
	typeof window !== "undefined" ? window :
	typeof self !== "undefined" ? self :
	typeof this === "object" ? this :
	new Function("return this")()
);
