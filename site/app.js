// Dynamically load topics.js and glossary.js on pages if not already loaded
(function () {
  const inTopicsDir = location.pathname.replace(/\\/g, "/").includes("/topics/");
  const assetPrefix = inTopicsDir ? "../" : "";

  // Theme toggle (dark/light), saved in localStorage, defaults to system setting, Shortcut: Alt+L
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const sys = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  const btn = document.createElement("button");
  btn.className = "theme";
  btn.title = "Toggle Light/Dark Mode (Alt+L)";
  const setTheme = t => {
    root.setAttribute("data-theme", t);
    btn.textContent = (t === "light" ? "dark" : "light") + " [Alt+L]";
    localStorage.setItem("theme", t);
  };
  const toggleTheme = () => setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
  btn.onclick = toggleTheme;
  document.body.appendChild(btn);
  setTheme(saved || sys);

  function initAll() {
    cleanMarkdownInArticle();
    initHeaderAndShortcuts();
    initIndex();
    initTypeahead();
    initGlossary();
  }

  // Convert any residual **bold** or `code` in article HTML into proper <b> and <code> tags
  function cleanMarkdownInArticle() {
    const article = document.querySelector("article");
    if (!article) return;
    article.querySelectorAll("p, li, td").forEach(el => {
      if (el.querySelector("pre")) return;
      const html = el.innerHTML;
      if (html.includes("**") || html.includes("`")) {
        el.innerHTML = html
          .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
          .replace(/`([^`]+)`/g, "<code>$1</code>");
      }
    });
  }

  function loadGlossaryThenInit() {
    if (typeof GLOSSARY === "undefined") {
      const g = document.createElement("script");
      g.src = assetPrefix + "glossary.js";
      g.onload = initAll;
      g.onerror = initAll;
      document.head.appendChild(g);
    } else {
      initAll();
    }
  }

  if (typeof TOPICS === "undefined") {
    const s = document.createElement("script");
    s.src = assetPrefix + "topics.js";
    s.onload = loadGlossaryThenInit;
    document.head.appendChild(s);
  } else {
    loadGlossaryThenInit();
  }

  // Global Header Brand Link + Alt+<Letter> Track, Home & Light/Dark Theme Shortcuts
  const SITE_VERSION = "v1.5.0";
  const SHORTCUT_MAP = {
    h: "HOME",
    l: "THEME",
    a: "All",
    m: "Manual",
    j: "Java",
    s: "Selenium",
    t: "TypeScript",
    p: "Playwright",
    i: "Interview"
  };

  let selectTrackFn = null;

  function initHeaderAndShortcuts() {
    const homeHref = inTopicsDir ? "../index.html" : "index.html";

    // Ensure a clickable '> SDET Explainer' header exists on topic pages too
    if (!document.querySelector("header.top")) {
      const hdr = document.createElement("header");
      hdr.className = "top";
      hdr.innerHTML = `<h1><a href="${homeHref}" title="Home (Alt+H)">SDET Explainer</a></h1>`;
      document.body.insertBefore(hdr, document.body.firstChild);
    } else {
      const h1 = document.querySelector("header.top h1");
      if (h1 && !h1.querySelector("a")) {
        h1.innerHTML = `<a href="${homeHref}" title="Home (Alt+H)">${h1.textContent}</a>`;
      }
      const homeLink = document.querySelector("header.top h1 a");
      if (homeLink && !inTopicsDir) {
        homeLink.addEventListener("click", e => {
          if (selectTrackFn) {
            e.preventDefault();
            history.replaceState(null, "", "index.html");
            const search = document.getElementById("search");
            if (search) search.value = "";
            selectTrackFn("All");
          }
        });
      }
    }

    // Make footer 'SDET Explainer' clickable to navigate Home + show version & shortcuts
    const footer = document.querySelector("footer");
    if (footer && inTopicsDir) {
      footer.innerHTML = `<a href="${homeHref}" title="Home (Alt+H)" style="font-weight:700">SDET Explainer</a> <b>${SITE_VERSION}</b> &middot; Shortcuts: <b>Alt+H</b> Home &middot; <b>Alt+L</b> Theme &middot; <b>Alt+A</b> All &middot; <b>Alt+M</b> Manual &middot; <b>Alt+J</b> Java &middot; <b>Alt+S</b> Selenium &middot; <b>Alt+T</b> TS/JS &middot; <b>Alt+P</b> Playwright &middot; <b>Alt+I</b> Interview`;
    }

    // Global Alt+<Key> listener across all pages
    document.addEventListener("keydown", e => {
      if (!e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const key = (e.key || "").toLowerCase();
      const targetTrack = SHORTCUT_MAP[key];
      if (!targetTrack) return;
      e.preventDefault();

      if (targetTrack === "THEME") {
        toggleTheme();
        return;
      }

      if (targetTrack === "HOME") {
        if (!inTopicsDir && selectTrackFn) {
          history.replaceState(null, "", "index.html");
          const search = document.getElementById("search");
          if (search) search.value = "";
          selectTrackFn("All");
          window.scrollTo(0, 0);
        } else {
          location.href = homeHref;
        }
        return;
      }

      if (!inTopicsDir && selectTrackFn) {
        history.replaceState(null, "", targetTrack === "All" ? "index.html" : `#${targetTrack}`);
        selectTrackFn(targetTrack);
      } else {
        location.href = targetTrack === "All" ? homeHref : `${homeHref}#${targetTrack}`;
      }
    });
  }

  // Index page: dynamic track chips, section grouping, search & filter
  function initIndex() {
    const grid = document.getElementById("grid");
    if (!grid) return;
    const controls = document.getElementById("controls");
    const search = document.getElementById("search");
    const stats = document.getElementById("stats");
    let track = "All";

    // Build track filter chips dynamically from TRACKS
    const tracksList = typeof TRACKS !== "undefined" ? TRACKS : [
      { id: "All", label: "All" },
      { id: "Manual", label: "Manual Testing" },
      { id: "Java", label: "Java" },
      { id: "Selenium", label: "Selenium" },
      { id: "TypeScript", label: "TS / JS" },
      { id: "Playwright", label: "Playwright" },
      { id: "Interview", label: "Interview Q&A" }
    ];

    // Check URL hash for initial track (e.g. index.html#Manual from Alt+M on a topic page)
    const hashTrack = (location.hash || "").replace(/^#/, "");
    if (hashTrack && tracksList.some(t => t.id.toLowerCase() === hashTrack.toLowerCase())) {
      track = tracksList.find(t => t.id.toLowerCase() === hashTrack.toLowerCase()).id;
    }

    // Remove any static chips if present and render dynamic ones
    controls.querySelectorAll(".chip").forEach(c => c.remove());
    tracksList.forEach(tr => {
      const b = document.createElement("button");
      b.className = "chip" + (tr.id === track ? " active" : "");
      b.dataset.track = tr.id;
      const shortcutKey = tr.id.charAt(0).toUpperCase();
      b.title = `Shortcut: Alt+${shortcutKey}`;
      const countDone = tr.id === "All" ? TOPICS.filter(t => t.file).length : TOPICS.filter(t => t.track === tr.id && t.file).length;
      const countTotal = tr.id === "All" ? TOPICS.length : TOPICS.filter(t => t.track === tr.id).length;
      b.textContent = countTotal > 0 ? `${tr.label} (${countDone}/${countTotal})` : tr.label;
      b.onclick = () => selectTrackFn(tr.id);
      controls.appendChild(b);
    });

    selectTrackFn = function (newTrack) {
      track = newTrack;
      controls.querySelectorAll(".chip").forEach(x => {
        x.classList.toggle("active", x.dataset.track === track);
      });
      render();
    };

    function render() {
      const q = search.value.trim().toLowerCase();
      const list = TOPICS.filter(t => (track === "All" || t.track === track) &&
        (t.title + " " + (t.section || "") + " " + t.summary + " " + (t.keywords || "") + " " + t.track).toLowerCase().includes(q));
      const doneCount = list.filter(t => t.file).length;
      stats.textContent = `${list.length} syllabus topics (${doneCount} published, ${list.length - doneCount} queued)`;

      if (list.length === 0) {
        grid.innerHTML = "<p>No syllabus topics in this track yet.</p>";
        return;
      }

      // Group by section
      const groups = new Map();
      list.forEach(t => {
        const sec = t.section || t.track;
        if (!groups.has(sec)) groups.set(sec, []);
        groups.get(sec).push(t);
      });

      let html = "";
      groups.forEach((items, sec) => {
        items.sort((a, b) => (a.order || 99) - (b.order || 99));
        const secDone = items.filter(x => x.file).length;
        html += `<div class="sec-hdr">${esc(sec)}<span>${secDone}/${items.length} done</span></div>`;
        html += items.map(t => {
          if (t.file) {
            return `<a class="card" href="topics/${t.file}"><div class="card-top"><span class="tag ${t.track}">${t.track}</span>` +
              `<h3>${esc(t.title)}</h3><span class="status-pill" style="color:var(--fn)">[ready]</span></div><p>${esc(t.summary)}</p></a>`;
          } else {
            return `<div class="card planned"><div class="card-top"><span class="tag ${t.track}">${t.track}</span>` +
              `<h3>${esc(t.title)}</h3><span class="status-pill">[queued]</span></div><p>${esc(t.summary)}</p></div>`;
          }
        }).join("");
      });
      grid.innerHTML = html;
    }

    search.addEventListener("input", render);
    render();
  }

  // Typeahead / Autocomplete + Global Key-Capture Quick Switcher
  function initTypeahead() {
    if (typeof TOPICS === "undefined") return;
    const inTopicsDir = location.pathname.replace(/\\/g, "/").includes("/topics/");
    const prefix = inTopicsDir ? "" : "topics/";

    let input = document.getElementById("search");
    let wrap;

    if (!input) {
      const container = document.querySelector(".wrap");
      if (!container) return;
      const firstP = container.querySelector("p");
      const bar = document.createElement("div");
      bar.className = "top-search";
      if (firstP) bar.appendChild(firstP);
      wrap = document.createElement("div");
      wrap.className = "search-wrap";
      input = document.createElement("input");
      input.id = "search";
      input.placeholder = "Type anywhere to jump (e.g. heap, null, jdk)...";
      wrap.appendChild(input);
      bar.appendChild(wrap);
      container.insertBefore(bar, container.firstChild);
    } else {
      wrap = document.createElement("div");
      wrap.className = "search-wrap";
      input.parentNode.insertBefore(wrap, input);
      wrap.appendChild(input);
    }

    const listEl = document.createElement("div");
    listEl.className = "ac-list";
    wrap.appendChild(listEl);

    let matches = [];
    let selIdx = 0;

    function hi(text, q) {
      if (!q) return esc(text);
      const idx = text.toLowerCase().indexOf(q.toLowerCase());
      if (idx === -1) return esc(text);
      return esc(text.slice(0, idx)) + "<mark>" + esc(text.slice(idx, idx + q.length)) + "</mark>" + esc(text.slice(idx + q.length));
    }

    function findMatches(q) {
      if (!q) return [];
      const ql = q.toLowerCase();
      const res = [];
      TOPICS.forEach(t => {
        const titleMatch = t.title.toLowerCase().includes(ql);
        const secMatch = (t.section || "").toLowerCase().includes(ql);
        const sumMatch = t.summary.toLowerCase().includes(ql);
        const kws = (t.keywords || "").split(",").map(s => s.trim()).filter(Boolean);
        const matchedKw = kws.find(k => k.toLowerCase().includes(ql));
        if (titleMatch || secMatch || sumMatch || matchedKw) {
          res.push({ topic: t, matchedKw: matchedKw || (secMatch ? t.section : "") });
        }
      });
      return res;
    }

    function renderDropdown() {
      const q = input.value.trim();
      matches = findMatches(q);
      if (!q || matches.length === 0) {
        listEl.classList.remove("open");
        listEl.innerHTML = "";
        return;
      }
      if (selIdx >= matches.length) selIdx = 0;
      listEl.innerHTML = matches.map((m, i) => {
        const t = m.topic;
        const kwHtml = m.matchedKw ? `<span class="ac-kw">match: ${hi(m.matchedKw, q)}</span>` : "";
        const href = t.file ? `href="${prefix + t.file}"` : "";
        const stateTag = t.file ? "" : ` <span style="color:var(--muted);font-size:.8em">[queued]</span>`;
        return `<a class="ac-item${i === selIdx ? " sel" : ""}" ${href} data-idx="${i}">` +
          `<div class="ac-item-top"><span class="tag ${t.track}">${t.track}</span>` +
          `<b>${hi(t.title, q)}</b>${stateTag}${kwHtml}</div>` +
          `<div class="ac-item-sub">${hi(t.summary, q)}</div></a>`;
      }).join("");
      listEl.classList.add("open");
    }

    input.addEventListener("input", () => {
      selIdx = 0;
      renderDropdown();
    });

    input.addEventListener("keydown", e => {
      if (!listEl.classList.contains("open")) {
        if (e.key === "Escape") { input.value = ""; input.dispatchEvent(new Event("input")); input.blur(); }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selIdx = (selIdx + 1) % matches.length;
        renderDropdown();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selIdx = (selIdx - 1 + matches.length) % matches.length;
        renderDropdown();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (matches[selIdx] && matches[selIdx].topic.file) {
          location.href = prefix + matches[selIdx].topic.file;
        }
      } else if (e.key === "Escape") {
        listEl.classList.remove("open");
      }
    });

    document.addEventListener("keydown", e => {
      const tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "/" || (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key))) {
        input.focus();
        if (e.key === "/") e.preventDefault();
      }
    });

    document.addEventListener("click", e => {
      if (!wrap.contains(e.target)) listEl.classList.remove("open");
    });
  }

  // Inline Glossary Popover (Definition + Properties + Real Example on Hover/Click)
  function initGlossary() {
    if (typeof GLOSSARY === "undefined") return;
    const article = document.querySelector("article");
    if (!article) return;

    // Build alias -> key lookup sorted longest-first
    const pairs = [];
    Object.keys(GLOSSARY).forEach(k => {
      (GLOSSARY[k].aliases || []).forEach(a => pairs.push({ alias: a, key: k }));
    });
    pairs.sort((a, b) => b.alias.length - a.alias.length);

    if (pairs.length > 0) {
      const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp("\\b(" + pairs.map(p => escRe(p.alias)).join("|") + ")\\b", "g");
      const aliasMap = new Map();
      pairs.forEach(p => aliasMap.set(p.alias.toLowerCase(), p.key));

      // Auto-annotate first occurrence of each term per section in text nodes
      article.querySelectorAll("section").forEach(sec => {
        const seenInSec = new Set();
        const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT, {
          acceptNode(node) {
            const p = node.parentElement;
            if (!p) return NodeFilter.FILTER_REJECT;
            if (p.closest("pre, code, a, h1, h2, h3, th, .term, .lbl, .phase-num, .v-hdr")) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        nodes.forEach(textNode => {
          const val = textNode.nodeValue;
          if (!pattern.test(val)) return;
          pattern.lastIndex = 0;
          let lastIdx = 0, m, changed = false;
          const frag = document.createDocumentFragment();
          while ((m = pattern.exec(val)) !== null) {
            const matchedText = m[1];
            const key = aliasMap.get(matchedText.toLowerCase());
            if (!key || seenInSec.has(key)) continue;
            seenInSec.add(key);
            changed = true;
            if (m.index > lastIdx) {
              frag.appendChild(document.createTextNode(val.slice(lastIdx, m.index)));
            }
            const span = document.createElement("span");
            span.className = "term";
            span.dataset.term = key;
            span.textContent = matchedText;
            frag.appendChild(span);
            lastIdx = pattern.lastIndex;
          }
          if (changed) {
            if (lastIdx < val.length) {
              frag.appendChild(document.createTextNode(val.slice(lastIdx)));
            }
            textNode.parentNode.replaceChild(frag, textNode);
          }
        });
      });
    }

    // Create shared floating popover element
    const pop = document.createElement("div");
    pop.className = "term-pop";
    document.body.appendChild(pop);
    let activeSpan = null;
    let hideTimer = null;

    function showTerm(span) {
      const key = span.dataset.term;
      const item = GLOSSARY[key];
      if (!item) return;
      clearTimeout(hideTimer);
      if (activeSpan && activeSpan !== span) activeSpan.classList.remove("active");
      activeSpan = span;
      span.classList.add("active");

      const propsHtml = (item.props || []).map(p => `<li>${esc(p)}</li>`).join("");
      pop.innerHTML =
        `<div class="term-pop-hdr"><b>[TERM] ${esc(item.title)}</b><button class="term-pop-close" title="Close">&times;</button></div>` +
        `<div class="term-pop-def">${esc(item.def)}</div>` +
        (propsHtml ? `<div class="term-pop-lbl">Properties &amp; Structure:</div><ul class="term-pop-props">${propsHtml}</ul>` : "") +
        (item.example ? `<div class="term-pop-lbl">Real Example:</div><div class="term-pop-ex">${esc(item.example)}</div>` : "");

      pop.classList.add("open");
      const rect = span.getBoundingClientRect();
      const popRect = pop.getBoundingClientRect();
      let top = rect.bottom + 6;
      if (top + popRect.height > window.innerHeight - 12) {
        top = Math.max(12, rect.top - popRect.height - 6);
      }
      let left = rect.left;
      if (left + popRect.width > window.innerWidth - 12) {
        left = Math.max(12, window.innerWidth - popRect.width - 12);
      }
      pop.style.top = top + "px";
      pop.style.left = left + "px";

      const closeBtn = pop.querySelector(".term-pop-close");
      if (closeBtn) closeBtn.onclick = hideTerm;
    }

    function hideTerm() {
      pop.classList.remove("open");
      if (activeSpan) { activeSpan.classList.remove("active"); activeSpan = null; }
    }

    article.addEventListener("mouseover", e => {
      const span = e.target.closest(".term");
      if (span) showTerm(span);
    });
    article.addEventListener("mouseout", e => {
      const span = e.target.closest(".term");
      if (span) hideTimer = setTimeout(hideTerm, 220);
    });
    article.addEventListener("click", e => {
      const span = e.target.closest(".term");
      if (span) { e.stopPropagation(); showTerm(span); }
    });
    pop.addEventListener("mouseenter", () => clearTimeout(hideTimer));
    pop.addEventListener("mouseleave", () => { hideTimer = setTimeout(hideTerm, 200); });
    document.addEventListener("click", e => {
      if (!pop.contains(e.target) && !e.target.closest(".term")) hideTerm();
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") hideTerm();
    });
  }
})();

// Terminal-style syntax highlighting for code blocks (Java + TS/Playwright)
const KW = new Set("class public private protected static void final new return if else for while do switch case break continue try catch finally throw throws extends implements interface abstract import package this super null true false instanceof enum default const let var async await function export from type readonly".split(" "));
const TYPES = new Set("int long double float boolean char byte short String Integer List Map Set ArrayList HashMap WebDriver WebElement By Object ChromeDriver ChromeOptions LoginPage Promise Page Locator Browser BrowserContext Expect".split(" "));
function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function highlight(src) {
  const re = /(\/\/.*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b([A-Za-z_]\w*)\b(\s*\()?|([=+\-*\/<>!&|%\[\]]+)|([{}();,.])/g;
  let out = "", last = 0, m, prev = "";
  while ((m = re.exec(src))) {
    out += esc(src.slice(last, m.index)); last = re.lastIndex;
    if (m[1]) out += `<span class="t-cmt">${esc(m[1])}</span>`;
    else if (m[2]) out += `<span class="t-str">${esc(m[2])}</span>`;
    else if (m[3]) {
      const w = m[3], call = m[4] || "";
      let cls = "";
      if (KW.has(w)) cls = "t-kw";
      else if (TYPES.has(w)) cls = "t-type";
      else if (/^(class|interface|enum|type)$/.test(prev)) cls = "t-cls";
      else if (call) cls = "t-fn";
      out += (cls ? `<span class="${cls}">${w}</span>` : w) + esc(call);
      prev = w;
    }
    else if (m[5]) out += `<span class="t-op">${esc(m[5])}</span>`;
    else if (m[6]) out += `<span class="t-punc">${m[6]}</span>`;
  }
  return out + esc(src.slice(last));
}
document.querySelectorAll("pre code").forEach(c => {
  if (c.classList.contains("bash")) {
    c.innerHTML = esc(c.textContent).replace(/(#.*)/g, '<span class="t-cmt">$1</span>')
      .replace(/^(javac|java|mvn|git|cd|npm|npx)\b/gm, '<span class="t-fn">$1</span>');
  } else c.innerHTML = highlight(c.textContent);
});

// Copy buttons on code blocks
document.querySelectorAll("pre").forEach(pre => {
  const b = document.createElement("button");
  b.className = "copy"; b.textContent = "copy";
  b.onclick = () => navigator.clipboard.writeText(pre.querySelector("code").textContent).then(() => {
    b.textContent = "copied"; setTimeout(() => b.textContent = "copy", 1200);
  });
  pre.appendChild(b);
});
