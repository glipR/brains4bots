const pills = document.getElementsByClassName("pill_object");
for (var i=0; i<pills.length; i++) {
  var page = pills[i].getAttribute("page");
  if (page != null) {
    var completion = completion_tracker.getCompletionPct(page);
    if (completion > 0.95) {
      pills[i].classList.add("pill_completed");
    } else if (completion > 0) {
      pills[i].classList.add("pill_in_progress");
    } else {
      pills[i].classList.add("pill_not_started");
    }
  }
}
