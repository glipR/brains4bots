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
