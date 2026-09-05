/* AIP-C01 Study Hub — app logic. Vanilla JS, no build. State in localStorage. */
(function () {
  "use strict";
  var D = window.DATA;
  var KEY = "aip_hub_v1";
  var DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  /* ---------- state ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(S)); }
  var S = load();
  S.plan = S.plan || {};
  S.card = S.card || {};
  S.q = S.q || { answered: 0, correct: 0, dom: {} };
  S.missed = S.missed || {};

  /* ---------- date helpers ---------- */
  function parseD(s) { var p = s.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function today() { var t = new Date(); t.setHours(0, 0, 0, 0); return t; }
  function daysBetween(a, b) { return Math.round((b - a) / 86400000); }
  function examCountdown() { return daysBetween(today(), parseD(D.exam.date)); }
  function currentWeek() {
    var t = today();
    for (var i = 0; i < D.weeks.length; i++) {
      if (t >= parseD(D.weeks[i].start) && t <= parseD(D.weeks[i].end)) return D.weeks[i];
    }
    if (t < parseD(D.weeks[0].start)) return D.weeks[0];
    return null; // after exam window
  }
  function weekDomain(n) { return ({ 0: 1, 1: 1, 2: 1, 3: 2, 4: 3, 5: 4, 6: 0 })[n]; }

  /* ---------- utils ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function el(id) { return document.getElementById(id); }

  /* ---------- progress ---------- */
  function planTotal() { var n = 0; D.weeks.forEach(function (w) { n += Object.keys(w.days).length; }); return n; }
  function planDone() { return Object.keys(S.plan).filter(function (k) { return S.plan[k]; }).length; }
  function overallPct() {
    var plan = planTotal() ? planDone() / planTotal() : 0;
    var acc = S.q.answered ? S.q.correct / S.q.answered : 0;
    // weight plan progress 70%, quiz accuracy 30%
    return Math.round((plan * 0.7 + acc * 0.3) * 100);
  }
  function refreshChrome() {
    var cd = examCountdown();
    el("countdown").innerHTML = cd > 0 ? "Exam in <strong>" + cd + "</strong> days" : (cd === 0 ? "<strong>Exam today</strong>" : "Exam passed");
    el("overallProgress").style.width = overallPct() + "%";
  }

  /* ---------- router ---------- */
  var views = { home: renderHome, plan: renderPlan, cheats: renderCheats, cards: renderCards, quiz: renderQuiz, weak: renderWeak };
  function route() {
    var v = (location.hash || "#home").slice(1).split("?")[0];
    if (!views[v]) v = "home";
    document.querySelectorAll(".tab").forEach(function (t) { t.classList.toggle("active", t.dataset.view === v); });
    el("view").innerHTML = views[v]();
    if (afterRender[v]) afterRender[v]();
    refreshChrome();
    window.scrollTo(0, 0);
  }
  var afterRender = {};

  /* ---------- HOME ---------- */
  function renderHome() {
    var w = currentWeek();
    var pct = overallPct();
    var taskHtml, sub;
    if (!w) { taskHtml = "You're past the exam window. Keep the streak — review anything you flagged."; sub = ""; }
    else {
      var dow = DOW[new Date().getDay()];
      var task = w.days[dow] || "Light day — do a 5-question quiz and drill your weak areas.";
      taskHtml = esc(task);
      sub = "Week " + w.n + " · " + esc(w.label) + " · " + esc(w.focus);
    }
    var acc = S.q.answered ? Math.round(S.q.correct / S.q.answered * 100) : 0;
    return (
      section("Today",
        '<div class="hero">' +
          '<div class="ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
          '<div style="flex:1;min-width:220px">' +
            '<div class="muted small">' + sub + '</div>' +
            '<div class="today-task">' + taskHtml + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="actions">' +
          '<button class="btn-primary" onclick="location.hash=\'#quiz?weak\'">Warm up: drill weak areas</button>' +
          '<button class="btn" onclick="location.hash=\'#quiz\'">Today\'s quiz</button>' +
          '<button class="btn" onclick="location.hash=\'#cards\'">Flashcards</button>' +
        '</div>'
      ) +
      section("The daily ritual",
        '<ol class="small" style="margin:0;padding-left:18px">' +
          '<li><b>Warm up (5 min):</b> drill weak areas above.</li>' +
          '<li><b>Learn:</b> today\'s Udemy videos or the week\'s lab, then read the cheat sheet.</li>' +
          '<li><b>Prove it (10 min):</b> today\'s quiz, then tell Kiro "log my misses."</li>' +
        '</ol>') +
      section("Where you are",
        '<div class="small">Plan: <b>' + planDone() + "/" + planTotal() + "</b> tasks done · " +
        'Quiz accuracy: <b>' + acc + "%</b> (" + S.q.correct + "/" + S.q.answered + ") · " +
        'Weak topics: <b>' + Object.keys(S.missed).length + "</b></div>" +
        '<div class="btn-row"><button class="btn" onclick="location.hash=\'#plan\'">Open the plan</button>' +
        '<button class="btn" onclick="location.hash=\'#weak\'">See weak areas</button></div>')
    );
  }

  /* ---------- PLAN ---------- */
  function renderPlan() {
    var html = section("6-Week Plan",
      '<div class="small muted">Tick tasks as you finish them. Off Sun + Mon = your heavy lab days.</div>');
    D.weeks.forEach(function (w) {
      var order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      var lis = order.filter(function (d) { return w.days[d]; }).map(function (d) {
        var k = w.n + ":" + d;
        var done = !!S.plan[k];
        return '<li><span class="dow">' + d + '</span>' +
          '<input type="checkbox" class="chk" data-k="' + k + '"' + (done ? " checked" : "") + '>' +
          '<span class="' + (done ? "done" : "") + '">' + esc(w.days[d]) + "</span></li>";
      }).join("");
      html += '<div class="card"><div class="week"><div class="week-head">' +
        "<strong>Week " + w.n + " · " + esc(w.label) + '</strong><span class="dates">' + esc(w.start) + " → " + esc(w.end) + "</span></div>" +
        '<div class="small muted">Udemy: ' + esc(w.udemy) + " · Lab: " + esc(w.lab) + "</div>" +
        '<ul class="daylist">' + lis + "</ul></div></div>";
    });
    return html;
  }
  afterRender.plan = function () {
    document.querySelectorAll(".chk").forEach(function (c) {
      c.addEventListener("change", function () { S.plan[c.dataset.k] = c.checked; save(); route(); });
    });
  };

  /* ---------- CHEAT SHEETS ---------- */
  function renderCheats() {
    var html = section("Cheat Sheets", '<div class="small muted">The must-knows per domain. Full versions in /cheatsheets.</div>');
    D.cheatsheets.forEach(function (c) {
      var rem = c.remember.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("");
      var pts = c.points.map(function (p) { return '<div class="term"><b>' + esc(p[0]) + "</b> — " + esc(p[1]) + "</div>"; }).join("");
      var traps = c.traps.map(function (t) { return '<li class="trap">' + esc(t) + "</li>"; }).join("");
      html += '<details class="acc"><summary>Domain ' + c.domain + ": " + esc(c.title) + '<span class="pill">' + c.weight + "%</span></summary>" +
        '<div class="acc-body">' +
        '<div class="remember"><b>Remember:</b><ul style="margin:4px 0 0;padding-left:18px">' + rem + "</ul></div>" +
        pts +
        "<h3>Exam traps</h3><ul style=\"margin:0;padding-left:18px\">" + traps + "</ul>" +
        "</div></details>";
    });
    return html;
  }

  /* ---------- FLASHCARDS ---------- */
  var cardSession = null;
  function buildCardOrder() {
    // unknown cards first, then known; keep original index
    var idx = D.flashcards.map(function (_, i) { return i; });
    idx.sort(function (a, b) { return (S.card[a] ? 1 : 0) - (S.card[b] ? 1 : 0); });
    return idx;
  }
  function renderCards() {
    if (!cardSession) cardSession = { order: buildCardOrder(), pos: 0, flipped: false };
    var total = D.flashcards.length;
    var known = Object.keys(S.card).filter(function (k) { return S.card[k]; }).length;
    if (cardSession.pos >= cardSession.order.length) cardSession.pos = 0;
    var ci = cardSession.order[cardSession.pos];
    var c = D.flashcards[ci];
    var body = cardSession.flipped
      ? '<div class="qn">Answer · Domain ' + c.d + "</div><div>" + esc(c.a) + "</div>"
      : '<div class="qn">Question · Domain ' + c.d + "</div><div>" + esc(c.q) + "</div>";
    return section("Flashcards",
      '<div class="small muted">Known: ' + known + "/" + total + " · tap the card to flip.</div>" +
      '<div class="flash" id="flashCard"><div class="flash-inner">' + body + "</div></div>" +
      '<div class="btn-row">' +
        (cardSession.flipped
          ? '<button class="btn-good" id="cardKnown">Got it</button><button class="btn" id="cardAgain">Again</button>'
          : '<button class="btn-primary" id="cardFlip">Flip</button>') +
        '<button class="btn" id="cardNext">Skip →</button>' +
      "</div>");
  }
  afterRender.cards = function () {
    var fc = el("flashCard"); if (fc) fc.addEventListener("click", function () { cardSession.flipped = !cardSession.flipped; route(); });
    var f = el("cardFlip"); if (f) f.addEventListener("click", function () { cardSession.flipped = true; route(); });
    var nx = el("cardNext"); if (nx) nx.addEventListener("click", function () { cardSession.pos++; cardSession.flipped = false; route(); });
    var kn = el("cardKnown"); if (kn) kn.addEventListener("click", function () { var ci = cardSession.order[cardSession.pos]; S.card[ci] = true; save(); cardSession.pos++; cardSession.flipped = false; route(); });
    var ag = el("cardAgain"); if (ag) ag.addEventListener("click", function () { var ci = cardSession.order[cardSession.pos]; S.card[ci] = false; save(); cardSession.pos++; cardSession.flipped = false; route(); });
  };

  /* ---------- QUIZ ---------- */
  var quiz = null; // {items, idx, submitted, sel}
  function domMiss(d) { var n = 0; Object.keys(S.missed).forEach(function (id) { var q = byId(id); if (q && q.d === d) n += S.missed[id].miss; }); return n; }
  function byId(id) { for (var i = 0; i < D.quiz.length; i++) if (D.quiz[i].id === id) return D.quiz[i]; return null; }
  function domWeight(d) { for (var i = 0; i < D.domains.length; i++) if (D.domains[i].id === d) return D.domains[i].weight; return 10; }

  function buildQuiz(mode) {
    if (mode === "weak") {
      var ids = Object.keys(S.missed);
      var qs = D.quiz.filter(function (q) { return ids.indexOf(q.id) >= 0; });
      if (qs.length < 5) {
        var extra = shuffle(D.quiz.filter(function (q) { return ids.indexOf(q.id) < 0; })).slice(0, 5 - qs.length);
        qs = qs.concat(extra);
      }
      return shuffle(qs).slice(0, Math.min(8, Math.max(5, qs.length)));
    }
    if (typeof mode === "number") { return shuffle(D.quiz.filter(function (q) { return q.d === mode; })).slice(0, 5); }
    // mixed: weight by exam weight + weak-area boost + randomness
    var scored = D.quiz.map(function (q) { return { q: q, w: domWeight(q.d) + domMiss(q.d) * 15 + Math.random() * 12 }; });
    scored.sort(function (a, b) { return b.w - a.w; });
    return scored.slice(0, 15).map(function (s) { return s.q; });
  }

  function renderQuiz() {
    var q = (location.hash.split("?")[1] || "");
    if (!quiz) {
      if (q === "weak") quiz = startQuiz("weak");
      else if (/^d[1-5]$/.test(q)) quiz = startQuiz(Number(q[1]));
      else if (q === "mixed") quiz = startQuiz("mixed");
    }
    if (!quiz) {
      return section("Quiz",
        '<div class="small muted">Pick a mode. Questions weighted to the real exam and your weak areas.</div>' +
        '<div class="btn-row"><button class="btn-primary" onclick="location.hash=\'#quiz?mixed\'">Mixed mock (15, exam-weighted)</button>' +
        '<button class="btn" onclick="location.hash=\'#quiz?weak\'">Drill weak areas</button></div>' +
        '<h3>By domain (5 questions)</h3><div class="btn-row">' +
        D.domains.map(function (d) { return '<button class="btn" onclick="location.hash=\'#quiz?d' + d.id + '\'">D' + d.id + " · " + d.weight + "%</button>"; }).join("") +
        "</div>");
    }
    if (quiz.idx >= quiz.items.length) return renderQuizResult();
    return renderQuestion();
  }
  function startQuiz(mode) { var items = buildQuiz(mode); return { items: items, idx: 0, submitted: false, sel: [] }; }

  function renderQuestion() {
    var item = quiz.items[quiz.idx];
    var head = '<div class="qmeta">Question ' + (quiz.idx + 1) + " of " + quiz.items.length + " · Domain " + item.d +
      (item.type === "mrq" ? " · choose all that apply (no partial credit)" : item.type === "self" ? " · self-graded" : "") + "</div>";
    var body = "<div><b>" + esc(item.q) + "</b></div>";
    var opts = "";
    if (item.type === "mcq" || item.type === "mrq") {
      opts = item.options.map(function (o, i) {
        var cls = "opt btn";
        if (quiz.submitted) {
          var isAns = item.type === "mcq" ? i === item.answer : item.answer.indexOf(i) >= 0;
          var chosen = quiz.sel.indexOf(i) >= 0;
          if (isAns) cls += " correct"; else if (chosen) cls += " wrong";
        } else if (quiz.sel.indexOf(i) >= 0) cls += " chosen";
        return '<button class="' + cls + '" data-i="' + i + '"' + (quiz.submitted ? " disabled" : "") + ">" + esc(o) + "</button>";
      }).join("");
    } else { // self
      opts = quiz.submitted
        ? '<div class="explain"><b>Answer:</b> ' + esc(item.answer) + "</div>"
        : '<div class="small muted">Think it through, then reveal.</div>';
    }
    var controls;
    if (!quiz.submitted) {
      controls = item.type === "self"
        ? '<button class="btn-primary" id="reveal">Reveal answer</button>'
        : '<button class="btn-primary" id="submit">Submit</button>';
    } else if (item.type === "self") {
      controls = '<div class="small">Did you get it right?</div><div class="btn-row"><button class="btn-good" id="selfRight">Yes</button><button class="btn" id="selfWrong">No</button></div>';
    } else {
      controls = '<div class="explain">' + esc(item.explain) + "</div><button class=\"btn-primary\" id=\"next\">" + (quiz.idx + 1 >= quiz.items.length ? "See score" : "Next →") + "</button>";
    }
    return section("Quiz", head + '<div class="card">' + body + opts + "</div>" + controls);
  }

  afterRender.quiz = function () {
    var ag = el("againBtn"); if (ag) ag.addEventListener("click", function () { quiz = null; location.hash = "#quiz"; route(); });
    if (!quiz || quiz.idx >= quiz.items.length) return;
    var item = quiz.items[quiz.idx];
    document.querySelectorAll(".opt").forEach(function (b) {
      b.addEventListener("click", function () {
        if (quiz.submitted) return;
        var i = Number(b.dataset.i);
        if (item.type === "mcq") quiz.sel = [i];
        else { var p = quiz.sel.indexOf(i); if (p >= 0) quiz.sel.splice(p, 1); else quiz.sel.push(i); }
        route();
      });
    });
    var sub = el("submit"); if (sub) sub.addEventListener("click", function () { if (!quiz.sel.length) return; gradeCurrent(); });
    var rev = el("reveal"); if (rev) rev.addEventListener("click", function () { quiz.submitted = true; route(); });
    var sr = el("selfRight"); if (sr) sr.addEventListener("click", function () { record(item, true); advance(); });
    var sw = el("selfWrong"); if (sw) sw.addEventListener("click", function () { record(item, false); advance(); });
    var nx = el("next"); if (nx) nx.addEventListener("click", advance);
  };

  function gradeCurrent() {
    var item = quiz.items[quiz.idx];
    var correct;
    if (item.type === "mcq") correct = quiz.sel.length === 1 && quiz.sel[0] === item.answer;
    else { var a = item.answer.slice().sort().join(","); var s = quiz.sel.slice().sort().join(","); correct = a === s; }
    record(item, correct);
    quiz.submitted = true; route();
  }
  function record(item, correct) {
    if (quiz) quiz.correctCount = (quiz.correctCount || 0) + (correct ? 1 : 0);
    S.q.answered++; if (correct) S.q.correct++;
    S.q.dom[item.d] = S.q.dom[item.d] || { s: 0, c: 0 };
    S.q.dom[item.d].s++; if (correct) S.q.dom[item.d].c++;
    if (correct) {
      if (S.missed[item.id]) { S.missed[item.id].streak++; if (S.missed[item.id].streak >= 2) delete S.missed[item.id]; }
    } else {
      S.missed[item.id] = S.missed[item.id] || { miss: 0, streak: 0 };
      S.missed[item.id].miss++; S.missed[item.id].streak = 0;
    }
    save();
  }
  function advance() { quiz.idx++; quiz.submitted = false; quiz.sel = []; route(); }

  function renderQuizResult() {
    var n = quiz.items.length;
    var c = quiz.correctCount || 0;
    var pct = n ? Math.round(c / n * 100) : 0;
    var msg = pct >= 80 ? "Strong — exam-ready range." : pct >= 60 ? "Getting there — drill the misses." : "Early days — re-read the cheat sheet, then retry.";
    return section("Result",
      '<div class="scorebig">' + pct + "%</div>" +
      '<div class="small muted">' + c + " / " + n + " correct · " + esc(msg) + "</div>" +
      '<div class="btn-row">' +
        '<button class="btn-primary" onclick="location.hash=\'#quiz?weak\'">Drill your misses</button>' +
        '<button class="btn" id="againBtn">New quiz</button>' +
        '<button class="btn" onclick="location.hash=\'#weak\'">Weak areas</button>' +
      "</div>");
  }

  /* ---------- WEAK AREAS ---------- */
  function renderWeak() {
    var ids = Object.keys(S.missed);
    if (!ids.length) {
      return section("Weak Areas",
        '<div class="small muted">Nothing logged yet. Take a quiz — anything you miss lands here and gets re-tested first.</div>' +
        '<div class="btn-row"><button class="btn-primary" onclick="location.hash=\'#quiz\'">Take a quiz</button></div>');
    }
    var tally = {};
    ids.forEach(function (id) { var q = byId(id); if (q) tally[q.d] = (tally[q.d] || 0) + S.missed[id].miss; });
    var tallyHtml = Object.keys(tally).sort(function (a, b) { return tally[b] - tally[a]; })
      .map(function (d) { return '<span class="pill">D' + d + ": " + tally[d] + " miss</span>"; }).join(" ");
    var items = ids.map(function (id) {
      var q = byId(id); if (!q) return "";
      return '<div class="weak-item"><div><span class="badge">D' + q.d + "</span> " + esc(q.q.slice(0, 90)) + (q.q.length > 90 ? "…" : "") +
        '</div><div class="muted small">×' + S.missed[id].miss + "</div></div>";
    }).join("");
    return section("Weak Areas",
      '<div class="small">' + tallyHtml + "</div>" +
      '<div class="btn-row"><button class="btn-primary" onclick="location.hash=\'#quiz?weak\'">Drill these now</button></div>') +
      '<div class="card">' + items + "</div>";
  }

  /* ---------- helpers ---------- */
  function section(title, inner) { return '<section class="card"><h2>' + esc(title) + "</h2>" + inner + "</section>"; }

  /* ---------- boot ---------- */
  el("resetBtn").addEventListener("click", function () {
    if (confirm("Reset all progress on this device? This can't be undone.")) { localStorage.removeItem(KEY); location.reload(); }
  });
  window.addEventListener("hashchange", function () {
    // leaving quiz clears the session unless we're inside the quiz flow
    if ((location.hash || "").indexOf("#quiz") !== 0) quiz = null;
    if ((location.hash || "").indexOf("#cards") !== 0) cardSession = null;
    route();
  });
  route();
})();
