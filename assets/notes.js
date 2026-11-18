/*
  Renders Craft Notes from window.CRAFT_NOTES (assets/notes-data.js).
  Each page includes notes-data.js, then this file, before its inline reveal script,
  so the rendered rows exist when the reveal observer starts.
  Containers: [data-notes="hero"], [data-notes="home"], [data-notes="all"].
*/
(function(){
  // Newest first: used to pick the hero's featured note
  var notes = (window.CRAFT_NOTES || []).slice().sort(function(a, b){
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return Number(b.number) - Number(a.number);
  });
  // Number order (01 first): used for every list
  var ordered = notes.slice().sort(function(a, b){ return Number(a.number) - Number(b.number); });
  var arcs = window.CRAFT_NOTES_ARCS || {};
  var hero = window.CRAFT_NOTES_HERO || {};

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

  function newLabel(n){
    return n.isNew ? ' <span class="cn-new">New</span>' : '';
  }

  function heroCard(n, label){
    return '<a class="cn-card" href="' + esc(n.url) + '">' +
      '<span class="cn-card-label">' + esc(label) + '</span>' +
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

  // Second hero card: describes an arc and links to the Craft Notes page
  function seriesCard(a){
    return '<a class="cn-next" href="' + esc(a.url || "/notes.html") + '">' +
      '<span class="cn-card-label cn-next-label">' + (a.isNew ? 'New series' : 'Series') + ' &middot; ' + esc(a.parts) + ' parts</span>' +
      '<span class="cn-next-title">' + esc(a.title || a.name) + '</span>' +
      '<span class="cn-card-dek">' + esc(a.dek) + '</span>' +
      '<span class="cn-next-read">See all ' + esc(a.parts) + ' parts &rarr;</span>' +
    '</a>';
  }

  function homeRow(n){
    return '<a class="s-row reveal" href="' + esc(n.url) + '">' +
      '<span class="s-row-num">' + esc(n.number) + '</span>' +
      '<div class="s-row-body">' +
        '<p class="s-row-title">' + esc(n.title) + newLabel(n) + '</p>' +
        '<p class="cn-row-dek">' + esc(n.dek) + '</p>' +
      '</div>' +
      '<div class="s-row-status">' + badge(n.topic) + '</div>' +
    '</a>';
  }

  function listRow(n){
    return '<a class="series-row cn-row reveal" href="' + esc(n.url) + '" data-topic="' + esc(n.topic) + '">' +
      '<div class="series-row-num">' + esc(n.number) + '</div>' +
      '<div class="series-row-body">' +
        '<p class="series-row-title">' + esc(n.title) + newLabel(n) + '</p>' +
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
    var featured = notes.filter(function(n){ return n.topic === hero.featureTopic; })[0];
    var series = hero.series && arcs[hero.series];
    render('[data-notes="hero"]',
      (featured ? heroCard(featured, "Latest on " + featured.topic) : heroCard(notes[0], "Latest Craft Note")) +
      (series ? seriesCard(series) : "") +
      (hasUpcoming ? upcomingCard(upcoming) : ""));
    render('[data-notes="home"]', ordered.map(homeRow).join(""));
    render('[data-notes="all"]', ordered.map(listRow).join(""));
  }

  // Previous / Next links between parts of an arc, on note pages with <nav class="arc-nav" data-arc data-part>
  function arcLink(side, dir, title, url, soon){
    return '<a class="arc-link' + (side === "right" ? " right" : "") + (soon ? " soon" : "") + '" href="' + esc(url) + '">' +
      '<p class="arc-dir">' + dir + '</p><p class="arc-title">' + esc(title) + '</p></a>';
  }

  document.querySelectorAll(".arc-nav[data-arc]").forEach(function(el){
    var key = el.getAttribute("data-arc");
    var part = Number(el.getAttribute("data-part"));
    var arc = (window.CRAFT_NOTES_ARCS || {})[key] || { parts: 0 };
    var inArc = function(p){
      return notes.filter(function(n){ return n.arc === key && n.part === p; })[0];
    };
    var prev = inArc(part - 1), next = inArc(part + 1);
    var html = "";
    if (prev) html += arcLink("left", "&larr; Part " + prev.part + " of " + arc.parts, prev.title, prev.url);
    else if (part === 1) html += arcLink("left", "&larr; All Craft Notes", "Back to the full list", "/notes.html");
    if (next) {
      html += arcLink("right", "Part " + next.part + " of " + arc.parts + " &rarr;", next.title, next.url);
    } else if (upcoming && upcoming.arc === key && upcoming.part === part + 1) {
      html += arcLink("right", "Part " + upcoming.part + " &middot; Coming soon", upcoming.title,
        (upcoming.cta && upcoming.cta.url) || "/notes/coming-soon.html", true);
    } else if (part === arc.parts) {
      html += arcLink("right", "All Craft Notes &rarr;", "Back to the full list", "/notes.html");
    }
    el.innerHTML = html;
  });

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
