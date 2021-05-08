class CompletionTracker {

  constructor() {
    this.completion = sessionStorage.getItem("completion");
    if (this.completion === null) {
      this.completion = new Object();
    } else {
      this.completion = JSON.parse(this.completion);
    }
  }

  setCompletion(post, index, max_completions, value) {
    if (!this.completion.hasOwnProperty(post))
      this.completion[post] = [];
    if (this.completion[post].length != max_completions) {
      this.completion[post] = [];
      for (var i = 0; i < max_completions; i++) {
        this.completion[post].push(false);
      }
    }
    this.completion[post][index] = value;
    sessionStorage.setItem("completion", JSON.stringify(this.completion));
  }

  getCompletion(post, index, max_completions) {
    var changed = false;
    if (!this.completion.hasOwnProperty(post)) {
      this.completion[post] = [];
      changed = true;
    }
    if (this.completion[post].length != max_completions) {
      this.completion[post] = [];
      for (var i = 0; i < max_completions; i++) {
        this.completion[post].push(false);
      }
      changed = true;
    }
    if (changed) {
      sessionStorage.setItem("completion", JSON.stringify(this.completion));
    }
    return this.completion[post][index];
  }

  getCompletionPct(post) {
    if (!this.completion.hasOwnProperty(post)) {
      this.completion[post] = [];
      sessionStorage.setItem("completion", JSON.stringify(this.completion));
      // This doesn't count.
      return 0;
    }
    return this.completion[post].reduce((a, b) => {
      return a + b;
    }, 0) / this.completion[post].length;
  }

}

window.completion_tracker = new CompletionTracker();
