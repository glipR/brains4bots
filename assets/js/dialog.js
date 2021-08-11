class DialogTracker {

  constructor() {
    // 120 minutes to refresh
    this.refresh_ms = 1000 * 60 * 120;
    this.dialog_timers = localStorage.getItem("dialog_timers");
    if (this.dialog_timers === null) {
      this.dialog_timers = new Object();
    } else {
      this.dialog_timers = JSON.parse(this.dialog_timers);
    }
  }

  shouldOpen(post) {
    if (!this.dialog_timers.hasOwnProperty(post)) {
      this.dialog_timers[post] = new Date().toString();
      localStorage.setItem("dialog_timers", JSON.stringify(this.dialog_timers));
      return true;
    }
    var d = Date.parse(this.dialog_timers[post]);
    var n = new Date();
    if (n - d > this.refresh_ms) {
      this.dialog_timers[post] = n.toString();
      localStorage.setItem("dialog_timers", JSON.stringify(this.dialog_timers));
      return true;
    }
    return false;
  }

}

window.dialog_tracker = new DialogTracker();
