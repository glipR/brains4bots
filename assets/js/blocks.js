const keys = ["note", "warning", "puzzle", "project"];
const settings = {
  "note": {
    "open": false,
    "title": (text) => `${text}`,
    "animate": null,
    "add_completion": false,
  },
  "puzzle": {
    "open": true,
    "title": (text) => `<b>Puzzle</b>: ${text}`,
    "animate": null,
    "add_completion": true,
  },
  "warning": {
    "open": true,
    "title": (text) => `<b>Warning!</b> ${text}`,
    "animate": null,
    "add_completion": false,
  },
  "project": {
    "open": true,
    "title": (text) => `<b>Project</b>: ${text}`,
    "animate": null,
    "add_completion": true,
  },
};

window.onload = () => {
  // Find all notes, puzzles, project blocks, and apply default settings.
  for (var i=0; i<keys.length; i++) {
    var all = document.getElementsByClassName(keys[i]);
    var length = all.length;
    for (var j=0; j < length; j++) {
      var top_block = document.createElement("DETAILS");
      var bot_block = document.createElement("SUMMARY");
      bot_block.innerHTML = settings[keys[i]]["title"](all[0].attributes.title.nodeValue);
      top_block.innerHTML = all[0].innerHTML;
      top_block.insertBefore(bot_block, top_block.childNodes[0]);
      top_block.classList.add("block", `${keys[i]}-block`);
      if ((all[0].getAttribute("open") === null && settings[keys[i]]["open"]) || all[0].getAttribute("open") === "1")
        top_block.setAttribute("open", "true");
      if (settings[keys[i]]["animate"] != null)
        top_block.setAttribute("data-aos", settings[keys[i]]["animate"]);
      if ((all[0].getAttribute("add_completion") === null && settings[keys[i]]["add_completion"]) || all[0].getAttribute("add_completion") === "1") {
        var complete = document.createElement("DIV");
        complete.classList.add("completion");
        top_block.appendChild(complete);
      }
      all[0].replaceWith(top_block);
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

  // Handle completion buttons
  //  1. Find post name.
  var url = window.location.href;
  url = url.split("#")[0];
  if (url[url.length-1] === "/") {
    url = url.substr(0, url.length-1);
  }
  var post = url.split("/").pop();
  //  2. Find completion button locations and replace with correct element
  const completions = document.getElementsByClassName("completion");
  var comp_length = completions.length;
  for (var i=0; i<comp_length; i++) {
    if (window.completion_tracker.getCompletion(post, i+1, comp_length+1)) {
      completions[0].parentElement.removeChild(completions[0]);
    } else {
      var button = document.createElement("button");
      button.classList.add("completion-button");
      button.id = `completion-button-${i}`;
      button.innerHTML = "<span>Complete</span>";
      button.addEventListener("click", function(e){
        var t = e.target;
        if (t.localName != "button") {
          t = t.parentElement;
        }
        var idx = parseInt(t.id.split("-").pop());
        window.completion_tracker.setCompletion(post, idx+1, comp_length+1, true);
        $(t).fadeOut();
      });
      completions[0].replaceWith(button);
    }
  }
  // We've read the page, so mark completion 0 as done.
  completion_tracker.setCompletion(post, 0, comp_length+1, true);

  // Handle hint buttons
  const hints = document.getElementsByClassName("hint");
  var hint_length = hints.length;
  for (var i=0; i<hint_length; i++) {
    var title = hints[0].getAttribute("title")
    if (title === null) title = "Hint";
    var text = `<b>${title}</b>: ${hints[0].innerText}`;
    var key = hints[0].getAttribute("key");

    var hint_opened = document.createElement("p");
    hint_opened.innerHTML = text;

    if (hint_tracker.isUnlocked(post, key)) {
      hints[0].replaceWith(hint_opened);
    } else {
      var button = document.createElement("button");
      button.classList.add("hint-button");
      button.id = `hint-button-${key}`;
      button.setAttribute("key", key);
      button.setAttribute("hint-text", hint_opened.innerHTML);
      button.innerHTML = `<span class="coin_icon">${hint_tracker.coins}</span><span>${title}</span>`;
      button.addEventListener("click", function(e){
        var t = e.target;
        while (t.nodeName != "BUTTON") {
          t = t.parentElement;
        }
        var key = t.getAttribute("key");
        var hint_text = document.createElement("p");
        hint_text.innerHTML = t.getAttribute("hint-text");
        if (hint_tracker.unlockHint(post, key)) {
          $(t).fadeOut({ complete: () => {
            t.replaceWith(hint_text);
          }});
          const el = document.getElementsByClassName("coin_icon");
          for (var j=0; j<el.length; j++) {
            el[j].innerHTML = hint_tracker.coins;
          }
        }
      });
      hints[0].replaceWith(button);
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
