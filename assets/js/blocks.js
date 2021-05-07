const keys = ["note", "warning", "puzzle", "project"];
const settings = {
  "note": {
    "open": false,
    "title": (text) => `${text}`
  },
  "puzzle": {
    "open": true,
    "title": (text) => `<b>Puzzle</b>: ${text}`
  },
  "warning": {
    "open": true,
    "title": (text) => `<b>Warning!</b> ${text}`
  },
  "project": {
    "open": true,
    "title": (text) => `<b>Project</b>: ${text}`
  },
};

window.onload = () => {
  // Find all notes, puzzles, project blocks, and apply default settings.
  for (var i=0; i<keys.length; i++) {
    var all = document.getElementsByClassName(keys[i]);
    for (var j=0; j < all.length; j++) {
      var top_block = document.createElement("DETAILS");
      var bot_block = document.createElement("SUMMARY");
      bot_block.innerHTML = settings[keys[i]]["title"](all[j].attributes.title.nodeValue);
      top_block.innerHTML = all[j].innerHTML;
      top_block.insertBefore(bot_block, top_block.childNodes[0]);
      top_block.classList.add("block", `${keys[i]}-block`);
      if (settings[keys[i]]["open"])
        top_block.setAttribute("open", "true");
      all[j].replaceWith(top_block);
    }
  }
};

(function () {
  'use strict';
  /**
   * Converts details/summary tags into working elements in browsers that don't yet support them.
   * https://facelessuser.github.io/pymdown-extensions/extensions/details/
   */
  var details = (function () {

    var isDetailsSupported = function () {
      // https://mathiasbynens.be/notes/html5-details-jquery#comment-35
      // Detect if details is supported in the browser
      var el = document.createElement("details");
      var fake = false;

      if (!("open" in el)) {
        return false;
      }

      var root = document.body || function () {
        var de = document.documentElement;
        fake = true;
        return de.insertBefore(document.createElement("body"), de.firstElementChild || de.firstChild);
      }();

      el.innerHTML = "<summary>a</summary>b";
      el.style.display = "block";
      root.appendChild(el);
      var diff = el.offsetHeight;
      el.open = true;
      diff = diff !== el.offsetHeight;
      root.removeChild(el);

      if (fake) {
        root.parentNode.removeChild(root);
      }

      return diff;
    }();

    if (!isDetailsSupported) {
      var blocks = document.querySelectorAll("details>summary");
      for (var i = 0; i < blocks.length; i++) {
        var summary = blocks[i];
        var details = summary.parentNode;

        // Apply "no-details" to for unsupported details tags
        if (!details.className.match(new RegExp("(\\s|^)no-details(\\s|$)"))) {
          details.className += " no-details";
        }

        summary.addEventListener("click", function (e) {
          var node = e.target.parentNode;
          if (node.hasAttribute("open")) {
            node.removeAttribute("open");
          } else {
            node.setAttribute("open", "open");
          }
        });
      }
    }
  });

  (function () {
    var onReady = function onReady(fn) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", fn);
      } else {
        document.attachEvent("onreadystatechange", function () {
          if (document.readyState === "interactive") {
            fn();
          }
        });
      }
    };

    onReady(function () {
      details();
    });
  })();

}());
