// ==UserScript==
// @name         Pet Preview
// @namespace    https://www.marapets.com/
// @version      0.2
// @description  Show a picture of your default pet on all pages
// @author       Lily Skye
// @match        *://*.marapets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=marapets.com
// @grant        none
// ==/UserScript==
(function () {
  "use strict";

  const nodeFactory = (type, props) => {
    if (typeof type !== "string") {
      return document.createDocumentFragment();
    }
    const otherProps = Object.assign({}, props);
    {
      delete otherProps.style;
      delete otherProps.ref;
      delete otherProps.namespaceURI;
      delete otherProps.children;
      delete otherProps.tagName;
    }
    let node;
    if (props.namespaceURI) {
      node = document.createElementNS(props.namespaceURI, type);
    } else {
      node = document.createElement(type);
    }
    if (props.style != null) {
      Object.assign(node.style, props.style);
    }
    if (props.ref != null) {
      if (typeof props.ref === "function") {
        props.ref.call(null, node);
      } else {
        props.ref.current = node;
      }
    }
    Object.assign(node, otherProps);
    return node;
  };
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
    if (imgSrc == null) return;
    const mobileBottomBar = document.querySelector(".mobile_bottombar");
    let mobileBottomBarIsVisible = false;
    if (mobileBottomBar != null) {
      const rect = mobileBottomBar.getBoundingClientRect();
      mobileBottomBarIsVisible = rect.width > 0 && rect.height > 0;
    }
    // On mobile, put the pet preview in the smalldoll div
    if (mobileBottomBar != null && mobileBottomBarIsVisible) {
      const smallDoll = mobileBottomBar.querySelector(".smalldoll");
      if (smallDoll != null) {
        smallDoll.style.position = "relative";
        smallDoll.style.borderRadius = "8px";
        const img = smallDoll.querySelector("img");
        if (img != null) {
          img.setAttribute("style", "");
          img.src = imgSrc;
          img.style.margin = "0";
          img.style.width = "100%";
          img.style.height = "100%";
        }
      }
      // on desktop, add an element to put the pet preview in
    } else if (linkHref != null) {
      document.body.appendChild(
        jsx(
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
        ),
      );
    } else {
      document.body.appendChild(
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
    }
  })();
})();
