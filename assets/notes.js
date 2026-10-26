/*
  Renders Craft Notes from window.CRAFT_NOTES (assets/notes-data.js).
  Each page includes notes-data.js, then this file, before its inline reveal script,
  so the rendered rows exist when the reveal observer starts.
  Containers: [data-notes="hero"], [data-notes="home"], [data-notes="all"].
*/
(function(){
  var notes = (window.CRAFT_NOTES || []).slice().sort(function(a, b){
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return Number(b.number) - Number(a.number);
  });

  var TOPIC_BADGE = {
    Evaluation: "act-i", Governance: "act-p", Cost: "act-r", Agents: "act-e", Compliance: "act-s"
  };

  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function badge(topic){
    return '<span class="act-badge ' + (TOPIC_BADGE[topic] || "act-p") + '">' + esc(topic) + '</span>';
  }

  function heroCard(n){
    return '<a class="cn-card" href="' + esc(n.url) + '">' +
      '<span class="cn-card-label">Latest Craft Note</span>' +
      '<span class="cn-card-meta">No. ' + esc(n.number) + ' &middot; ' + esc(n.topic) + '</span>' +
      '<span class="cn-card-title">' + esc(n.title) + '</span>' +
      '<span class="cn-card-dek">' + esc(n.dek) + '</span>' +
      '<span class="cn-card-read">Read &rarr;</span>' +
    '</a>';
  }

  var MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  // "2026-11" -> "November 2026"; anything unparseable is dropped rather than shown raw
  function monthYear(d){
    var m = /^(\d{4})-(\d{2})/.exec(d || "");
    return m && MONTHS[Number(m[2]) - 1] ? MONTHS[Number(m[2]) - 1] + " " + m[1] : "";
  }

  function upcomingCard(u){
    var when = monthYear(u.date);
    var cta = u.cta || {};
    // External links open in a new tab; on-site pages (e.g. the coming-soon page) open in place
    var external = /^https?:\/\//.test(cta.url || "");
    return '<a class="cn-next" href="' + esc(cta.url) + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>' +
      '<span class="cn-card-label cn-next-label">Coming next</span>' +
      '<span class="cn-card-meta">No. ' + esc(u.number) + ' &middot; ' + esc(u.topic) +
        (when ? ' &middot; ' + esc(when) : '') + '</span>' +
      '<span class="cn-next-title">' + esc(u.title) + '</span>' +
      '<span class="cn-card-dek">' + esc(u.dek) + '</span>' +
      '<span class="cn-next-read">' + esc(cta.label || "Get it first") + ' &rarr;</span>' +
    '</a>';
  }

  function homeRow(n){
    return '<a class="s-row reveal" href="' + esc(n.url) + '">' +
      '<span class="s-row-num">' + esc(n.number) + '</span>' +
      '<div class="s-row-body">' +
        '<p class="s-row-title">' + esc(n.title) + '</p>' +
        '<p class="cn-row-dek">' + esc(n.dek) + '</p>' +
      '</div>' +
      '<div class="s-row-status">' + badge(n.topic) + '</div>' +
    '</a>';
  }

  function listRow(n){
    return '<a class="series-row cn-row reveal" href="' + esc(n.url) + '" data-topic="' + esc(n.topic) + '">' +
      '<div class="series-row-num">' + esc(n.number) + '</div>' +
      '<div class="series-row-body">' +
        '<p class="series-row-title">' + esc(n.title) + '</p>' +
        '<p class="series-row-desc">' + esc(n.dek) + '</p>' +
      '</div>' +
      '<div class="series-row-act">' + badge(n.topic) + '</div>' +
    '</a>';
  }

  function render(selector, html){
    document.querySelectorAll(selector).forEach(function(el){ el.innerHTML = html; });
  }

  var upcoming = window.CRAFT_NOTES_UPCOMING;
  var hasUpcoming = !!(upcoming && upcoming.title && upcoming.cta && upcoming.cta.url);

  if (notes.length) {
    render('[data-notes="hero"]', heroCard(notes[0]) + (hasUpcoming ? upcomingCard(upcoming) : ""));
    render('[data-notes="home"]', notes.slice(0, 3).map(homeRow).join(""));
    render('[data-notes="all"]', notes.map(listRow).join(""));
  }

  // Topic filter chips on notes.html
  var chips = document.querySelectorAll(".cn-chip");
  chips.forEach(function(chip){
    chip.addEventListener("click", function(){
      var topic = chip.getAttribute("data-filter");
      chips.forEach(function(c){ c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      var shown = 0;
      document.querySelectorAll(".cn-row").forEach(function(row){
        var match = topic === "All" || row.getAttribute("data-topic") === topic;
        row.hidden = !match;
        if (match) { shown++; row.classList.add("in"); }
      });
      var empty = document.getElementById("cn-empty");
      if (empty) empty.hidden = shown > 0;
    });
  });
})();
