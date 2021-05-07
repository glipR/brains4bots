const keys = ["note", "warning", "puzzle", "project"];
const settings = {
  "note": {
    "open": false,
    "title": (text) => `${text}`,
    "animate": null,
  },
  "puzzle": {
    "open": true,
    "title": (text) => `<b>Puzzle</b>: ${text}`,
    "animate": null,
  },
  "warning": {
    "open": true,
    "title": (text) => `<b>Warning!</b> ${text}`,
    "animate": null,
  },
  "project": {
    "open": true,
    "title": (text) => `<b>Project</b>: ${text}`,
    "animate": "fade-up",
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
      if (settings[keys[i]]["animate"] != null)
        top_block.setAttribute("data-aos", settings[keys[i]]["animate"]);
      all[j].replaceWith(top_block);
    }
  }

  const newDiv = (index) => {
    var res = document.createElement("DIV");
    res.id = `content-show-${index}`;
    return res;
  }

  const seeMore = (index) => {
    var container = document.createElement("DIV");
    container.classList.add("see-more-container");
    var res = document.createElement("BUTTON");
    res.id = `content-button-${index}`
    res.innerText = "Continue";
    res.setAttribute("data-aos", "fade-left");
    res.setAttribute("data-aos-offset", "-20");
    res.classList.add("see-more-button");
    res.addEventListener("click", function(){
      for (var i=0; i<=index+1; i++) {
        // Show content, hide buttons, unless index+1.
        var content = document.getElementById(`content-show-${i}`);
        content.classList.remove("content-hidden");
        var button = document.getElementById(`content-button-${i}`);
        if (button) {
          if (i < index+1) button.parentElement.classList.add("content-hidden");
          else button.parentElement.classList.remove("content-hidden");
        }
      }
      if (document.getElementById(`content-button-${index+1}`) === null) {
        // Final button. Show the footer and discus.
        document.getElementById("main").children[1].classList.remove("content-hidden");
        document.getElementsByClassName("post-tail-wrapper")[0].classList.remove("content-hidden");
      }
    });
    container.appendChild(res);
    return container;
  }

  // Handle see more buttons
  const reading_blocks = document.getElementsByClassName("continue");
  if (reading_blocks.length > 0) {
    const par = reading_blocks[0].parentElement;
    // Dynamically place content in divs.
    var divs = [newDiv(0)];
    var i = 0;
    const children = par.children;
    for (var j=0; j<children.length;) {
      if (children[j].classList.contains("continue")) {
        divs.push(seeMore(i++));
        divs.push(newDiv(i));
        par.removeChild(children[j]);
      } else {
        divs[divs.length-1].appendChild(children[j]);
      }
    }
    for (var j=0; j<divs.length; j++) {
      if (j >= 2) {
        divs[j].classList.add("content-hidden");
      }
      par.appendChild(divs[j]);
    }
    if (divs.length > 1) {
      // Hide discus and footer.
      document.getElementById("main").children[1].classList.add("content-hidden");
      document.getElementsByClassName("post-tail-wrapper")[0].classList.add("content-hidden");
    }
  }

  // Initialise animate on scroll
  AOS.init();

  // Handle opening post dialog
  var obj = document.getElementById("dialog_entry");
  if (obj) {
    var imgs = obj.getElementsByTagName("img");
    for (var i=0; i<imgs.length; i++) {
      // lozad doesn't work with dynamic elements.
      imgs[i].setAttribute("src", imgs[i].getAttribute("data-src"))
    }
    bootbox.dialog({
      message: obj.innerHTML,
      size: 'large',
      onEscape: true,
      backdrop: true,
      buttons: {
        ok: {
          label: 'Got it!',
          className: 'btn-primary',
          callback: function() {},
        }
      }
    })
    obj.parentElement.removeChild(obj);
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
