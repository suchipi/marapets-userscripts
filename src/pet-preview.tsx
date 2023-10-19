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

import * as jsxdom from "@suchipi/jsxdom";

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
      imgSrc,
    });
  }

  const savedJson = localStorage.__userscript_suchipi_pet_preview_1;
  if (typeof savedJson !== "string") {
    console.warn(
      "Pet Preview UserScript: Pet not cached yet. Click the 'Marapets' logo to cache it!"
    );
  }
  const { linkHref, imgSrc } = JSON.parse(savedJson);

  if (imgSrc == null) return;

  const mobileBottomBar = document.querySelector(".mobile_bottombar");
  let mobileBottomBarIsVisible: boolean = false;
  if (mobileBottomBar != null) {
    const rect = mobileBottomBar.getBoundingClientRect();
    mobileBottomBarIsVisible = rect.width > 0 && rect.height > 0;
  }

  // On mobile, put the pet preview in the smalldoll div
  if (mobileBottomBar != null && mobileBottomBarIsVisible) {
    const smallDoll = mobileBottomBar.querySelector(
      ".smalldoll"
    ) as HTMLElement;
    if (smallDoll != null) {
      smallDoll.style.position = "relative";
      smallDoll.style.borderRadius = "8px";

      const img = smallDoll.querySelector("img") as HTMLImageElement;
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
      <a href={linkHref}>
        <img
          className="defaultpet"
          style={{
            width: "75px",
            height: "75px",
            position: "fixed",
            top: "30px",
            zIndex: "1",
          }}
          src={imgSrc}
        />
      </a>
    );
  } else {
    document.body.appendChild(
      <img
        className="defaultpet"
        style={{
          width: "75px",
          height: "75px",
          position: "fixed",
          top: "30px",
          zIndex: "1",
        }}
        src={imgSrc}
      />
    );
  }
})();
