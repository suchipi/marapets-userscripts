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

import * as jsxdom from "@suchipi/jsxdom";

// Our compiler is configured to output 'React.createElement', so aliasing this
// to 'React' makes everything work properly
const React = jsxdom;

(async function () {
  if (location.href.match(/index\.php/)) {
    console.info("Pet Preview UserScript: Caching pet image and link...")
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
      imgSrc
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
    eltoAppend = (
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
  } else if (imgSrc != null) {
    eltoAppend = (
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

  if (eltoAppend != null) {
    document.body.appendChild(eltoAppend);
  }
})();
