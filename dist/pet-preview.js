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
(function () {
  "use strict";

  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  const defaultNodeFactory = (type, props) => {
    if (typeof type !== "string") {
      return document.createDocumentFragment();
    }
    const _a = props,
      { style, ref: ref2, namespaceURI, children, tagName } = _a,
      otherProps = __objRest(_a, [
        "style",
        "ref",
        "namespaceURI",
        "children",
        "tagName",
      ]);
    let node;
    if (namespaceURI) {
      node = document.createElementNS(namespaceURI, type);
    } else {
      node = document.createElement(type);
    }
    if (style != null) {
      Object.assign(node.style, style);
    }
    if (ref2 != null) {
      if (typeof ref2 === "function") {
        ref2(node);
      } else {
        ref2.current = node;
      }
    }
    Object.assign(node, otherProps);
    return node;
  };
  let nodeFactory = defaultNodeFactory;
  const jsx = (type, ...args) => {
    let rawProps = null;
    let children = null;
    if (typeof args[0] === "object" && args[0] != null) {
      if (args[0] instanceof Node) {
        children = args;
      } else {
        rawProps = args[0];
        children = args.slice(1);
      }
    } else {
      children = args;
    }
    children = children.flat(Infinity);
    const props = rawProps || {};
    props.children = children;
    if (type === DocumentFragment || typeof type === "string") {
      const node = nodeFactory(type, props);
      for (const child of children) {
        if (child == null) continue;
        if (typeof child === "object") {
          node.appendChild(child);
        } else {
          const textNode = document.createTextNode(String(child));
          node.appendChild(textNode);
        }
      }
      return node;
    } else {
      return type(props);
    }
  };

  (async function () {
    if (location.href.match(/index\.php/)) {
      console.info("Pet Preview UserScript: Caching pet image and link...");
      // We're on the homepage! Scrape the default pet and save it to localStorage.
      const defaultPetLink = document.querySelector(`a[href^="pets.php?id="]`);
      const defaultPetImg = document.querySelector("img.defaultpet");
      const linkHref = defaultPetLink?.getAttribute("href");
      const imgSrc = defaultPetImg?.getAttribute("src");
      if (linkHref == null) {
        console.error(
          "Pet Preview UserScript: Could not find default pet link",
        );
      }
      if (imgSrc == null) {
        console.error(
          "Pet Preview UserScript: Could not find default pet image",
        );
      }
      // the '1' is the schema version
      localStorage.__userscript_suchipi_pet_preview_1 = JSON.stringify({
        linkHref,
        imgSrc,
      });
    }
    const savedJson = localStorage.__userscript_suchipi_pet_preview_1;
    if (typeof savedJson !== "string") {
      console.warn(
        "Pet Preview UserScript: Pet not cached yet. Click the 'Marapets' logo to cache it!",
      );
    }
    const { linkHref, imgSrc } = JSON.parse(savedJson);
    let eltoAppend = null;
    if (linkHref != null && imgSrc != null) {
      eltoAppend = jsx(
        "a",
        { href: linkHref },
        jsx("img", {
          className: "defaultpet",
          style: {
            width: "75px",
            height: "75px",
            position: "fixed",
            top: "30px",
            zIndex: "1",
          },
          src: imgSrc,
        }),
      );
    } else if (imgSrc != null) {
      eltoAppend = jsx("img", {
        className: "defaultpet",
        style: {
          width: "75px",
          height: "75px",
          position: "fixed",
          top: "30px",
          zIndex: "1",
        },
        src: imgSrc,
      });
    }
    if (eltoAppend != null) {
      document.body.appendChild(eltoAppend);
    }
  })();
})();
