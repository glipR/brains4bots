class HintTracker {

  constructor() {
    this.hints = sessionStorage.getItem("hints");
    this.coins = sessionStorage.getItem("coins");
    if (this.hints === null) {
      this.hints = new Object();
    } else {
      this.hints = JSON.parse(this.hints);
    }
    if (this.coins === null) {
      // Starting value.
      this.coins = 30
    } else {
      this.coins = parseInt(this.coins);
    }
  }

  unlockHint(post, key) {
    if (!this.hints.hasOwnProperty(post))
      this.hints[post] = new Object();
    if (this.coins > 0 && !this.hints[post].hasOwnProperty(key)) {
      this.hints[post][key] = true;
      this.coins -= 1;
      sessionStorage.setItem("hints", JSON.stringify(this.hints));
      sessionStorage.setItem("coins", this.coins.toString());
      return true;
    } else {
      return false;
    }
  }

  isUnlocked(post, key) {
    if (!this.hints.hasOwnProperty(post))
      this.hints[post] = new Object();
    return this.hints[post].hasOwnProperty(key);
  }

}

window.hint_tracker = new HintTracker();
