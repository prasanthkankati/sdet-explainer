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
    const label = (t === "light" ? "dark" : "light") + " [Alt+L]";
    btn.textContent = label;
    const heroThemeBtn = document.getElementById("hero-theme-btn");
    if (heroThemeBtn) heroThemeBtn.textContent = label.toUpperCase();
    localStorage.setItem("theme", t);
  };
  const toggleTheme = () => setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
  btn.onclick = toggleTheme;
  document.body.appendChild(btn);
  const heroThemeBtn = document.getElementById("hero-theme-btn");
  if (heroThemeBtn) heroThemeBtn.onclick = toggleTheme;
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
  const SITE_VERSION = "v2.0.3";
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

    if (inTopicsDir) {
      document.body.classList.add("in-chapter");
      // Top-left brand + '>' + <- All topics on the exact same line as top-right [light/dark] button (no full-width header bar)
      const container = document.querySelector(".wrap");
      const firstP = container ? container.querySelector(":scope > p") : null;
      const nav = document.createElement("div");
      nav.className = "chapter-nav";

      const brand = document.createElement("a");
      brand.className = "brand";
      brand.href = homeHref;
      brand.title = "Home (Alt+H)";
      brand.textContent = "SDET Explainer";
      nav.appendChild(brand);

      const sep = document.createElement("span");
      sep.className = "nav-sep";
      sep.textContent = ">";
      nav.appendChild(sep);

      if (firstP) {
        const backDiv = document.createElement("div");
        backDiv.className = "back-links";
        backDiv.innerHTML = firstP.innerHTML;
        firstP.remove();
        nav.appendChild(backDiv);
      }

      document.body.insertBefore(nav, document.body.firstChild);

      // FLIP animation when entering from Homepage
      const prevRectRaw = sessionStorage.getItem("sdet-brand-rect");
      sessionStorage.removeItem("sdet-brand-rect");
      if (prevRectRaw) {
        try {
          const prev = JSON.parse(prevRectRaw);
          const cur = brand.getBoundingClientRect();
          brand.style.transform = `translate(${prev.left - cur.left}px, ${prev.top - cur.top}px)`;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              brand.style.transition = "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)";
              brand.style.transform = "translate(0, 0)";
            });
          });
        } catch (_) {}
      }

      nav.addEventListener("click", e => {
        const a = e.target.closest("a");
        if (a && a.getAttribute("href") === homeHref) {
          const r = brand.getBoundingClientRect();
          sessionStorage.setItem("sdet-brand-rect", JSON.stringify({ left: r.left, top: r.top }));
        }
      });
    } else if (document.getElementById("home-link") || document.querySelector("header.top")) {
      const h1 = document.querySelector("header.top h1");
      if (h1 && !h1.querySelector("a")) {
        h1.innerHTML = `<a href="${homeHref}" title="Home (Alt+H)">${h1.textContent}</a>`;
      }
      const homeLink = document.getElementById("home-link") || document.querySelector("header.top h1 a");
      if (homeLink) {
        // Animate SDET Explainer back to Homepage position if returning from a chapter
        const prevRectRaw = sessionStorage.getItem("sdet-brand-rect");
        sessionStorage.removeItem("sdet-brand-rect");
        if (prevRectRaw) {
          try {
            const prev = JSON.parse(prevRectRaw);
            const cur = homeLink.getBoundingClientRect();
            const dx = prev.left - cur.left;
            const dy = prev.top - cur.top;
            homeLink.style.display = "inline-block";
            homeLink.style.transform = `translate(${dx}px, ${dy}px)`;
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                homeLink.style.transition = "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)";
                homeLink.style.transform = "translate(0, 0)";
              });
            });
          } catch (_) {}
        }

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

      // Capture Homepage SDET Explainer rect before navigating into any chapter
      document.addEventListener("click", e => {
        const a = e.target.closest("a[href*='topics/']");
        if (a && homeLink) {
          const r = homeLink.getBoundingClientRect();
          sessionStorage.setItem("sdet-brand-rect", JSON.stringify({ left: r.left, top: r.top }));
        }
      });
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
    let track = "Manual";
    let slideDir = "anim-up";

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
      const oldIdx = tracksList.findIndex(t => t.id === track);
      const newIdx = tracksList.findIndex(t => t.id === newTrack);
      slideDir = newIdx >= oldIdx ? "anim-up" : "anim-down";
      track = newTrack;
      controls.querySelectorAll(".chip").forEach(x => {
        x.classList.toggle("active", x.dataset.track === track);
      });
      render(true);
    };

    const slideOrder = tracksList.filter(t => t.id !== "All").map(t => t.id);
    let lastWheelAt = 0;
    function stepTrack(delta) {
      const idx = slideOrder.indexOf(track);
      const curIdx = idx === -1 ? 0 : idx;
      const nextIdx = curIdx + delta;
      if (nextIdx >= 0 && nextIdx < slideOrder.length) {
        selectTrackFn(slideOrder[nextIdx]);
      }
    }

    const stageEl = document.getElementById("slide-stage");
    if (stageEl) {
      stageEl.addEventListener("wheel", e => {
        const now = Date.now();
        if (now - lastWheelAt < 420) return;
        const atBottom = grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 4;
        const atTop = grid.scrollTop <= 4;
        if (e.deltaY > 24 && atBottom) {
          e.preventDefault();
          lastWheelAt = now;
          stepTrack(1);
        } else if (e.deltaY < -24 && atTop) {
          e.preventDefault();
          lastWheelAt = now;
          stepTrack(-1);
        }
      }, { passive: false });

      let touchStartY = null;
      stageEl.addEventListener("touchstart", e => {
        if (e.touches && e.touches.length === 1) touchStartY = e.touches[0].clientY;
      }, { passive: true });
      stageEl.addEventListener("touchend", e => {
        if (touchStartY === null || !e.changedTouches || !e.changedTouches.length) return;
        const dy = touchStartY - e.changedTouches[0].clientY;
        touchStartY = null;
        const atBottom = grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 4;
        const atTop = grid.scrollTop <= 4;
        if (dy > 48 && atBottom) stepTrack(1);
        else if (dy < -48 && atTop) stepTrack(-1);
      }, { passive: true });
    }

    function render(animate) {
      const q = (search ? search.value : "").trim().toLowerCase();
      const totalDone = TOPICS.filter(t => t.file).length;
      const specTotal = document.getElementById("spec-total");
      const meterFill = document.getElementById("hero-meter-fill");
      if (specTotal) specTotal.textContent = `${totalDone} / ${TOPICS.length} LIVE`;
      if (meterFill) meterFill.style.width = `${TOPICS.length ? Math.round((totalDone / TOPICS.length) * 100) : 0}%`;

      const list = TOPICS.filter(t => (track === "All" || t.track === track) &&
        (t.title + " " + (t.section || "") + " " + t.summary + " " + (t.keywords || "") + " " + t.track).toLowerCase().includes(q));
      const doneCount = list.filter(t => t.file).length;
      if (stats) stats.textContent = `${list.length} syllabus topics (${doneCount} published, ${list.length - doneCount} queued) · hover section to expand, click to pin`;

      const stageLbl = document.getElementById("stage-track-label");
      const stageCnt = document.getElementById("stage-track-count");
      const curTr = tracksList.find(t => t.id === track);
      if (stageLbl) stageLbl.textContent = curTr ? curTr.label : track;
      if (stageCnt) {
        const sIdx = slideOrder.indexOf(track);
        const nextHint = sIdx >= 0 && sIdx < slideOrder.length - 1 ? ` · SLIDE UP FOR ${slideOrder[sIdx + 1].toUpperCase()}` : "";
        stageCnt.textContent = `${doneCount}/${list.length} PUBLISHED${nextHint}`;
      }

      if (animate) {
        grid.classList.remove("anim-up", "anim-down");
        void grid.offsetWidth;
        grid.classList.add(slideDir);
      }
      grid.scrollTop = 0;

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
        const secTrack = items[0] ? items[0].track : "";
        const openCls = q ? " open" : "";
        html += `<div class="sec-group${openCls}">` +
          `<div class="sec-hdr" title="Hover to preview · Click to pin">` +
            `<span class="sec-chev">&gt;</span>` +
            `<span class="tag ${secTrack}">${secTrack}</span>` +
            `<span class="sec-title">${esc(sec)}</span>` +
            `<span class="sec-count">${secDone}/${items.length} done</span>` +
          `</div>` +
          `<div class="sec-body"><div class="sec-inner">` +
          items.map(t => {
            if (t.file) {
              return `<a class="card" href="topics/${t.file}"><div class="card-top"><span class="tag ${t.track}">${t.track}</span>` +
                `<h3>${esc(t.title)}</h3><span class="status-pill" style="color:var(--fn)">[ready]</span></div><p>${esc(t.summary)}</p></a>`;
            } else {
              return `<div class="card planned"><div class="card-top"><span class="tag ${t.track}">${t.track}</span>` +
                `<h3>${esc(t.title)}</h3><span class="status-pill">[queued]</span></div><p>${esc(t.summary)}</p></div>`;
            }
          }).join("") +
          `</div></div></div>`;
      });
      grid.innerHTML = html;

      grid.querySelectorAll(".sec-hdr").forEach(hdr => {
        hdr.addEventListener("click", () => {
          hdr.parentElement.classList.toggle("pinned");
        });
      });
    }

    if (search) search.addEventListener("input", render);
    render();
  }

  // Global Command Search Overlay (Type anywhere to open, blurs background, clears on collapse)
  function initTypeahead() {
    if (typeof TOPICS === "undefined") return;
    const inTopicsDir = location.pathname.replace(/\\/g, "/").includes("/topics/");
    const prefix = inTopicsDir ? "" : "topics/";

    const backdrop = document.createElement("div");
    backdrop.className = "cmd-backdrop";
    backdrop.innerHTML =
      `<div class="cmd-modal" role="dialog" aria-label="Search syllabus">` +
        `<div class="cmd-hdr"><span><b>&gt; SEARCH SYLLABUS</b> &middot; [Enter] open &middot; [&uarr;/&darr;] navigate</span><span>[Esc] close</span></div>` +
        `<input class="cmd-input" id="cmd-search" type="text" autocomplete="off" placeholder="Type topic, keyword, exception...">` +
        `<div class="ac-list"></div>` +
      `</div>`;
    document.body.appendChild(backdrop);

    const modal = backdrop.querySelector(".cmd-modal");
    const input = backdrop.querySelector(".cmd-input");
    const listEl = backdrop.querySelector(".ac-list");

    const triggerBtn = document.createElement("button");
    triggerBtn.className = "cmd-trigger";
    triggerBtn.type = "button";
    triggerBtn.title = "Search syllabus (/ or type anywhere)";
    triggerBtn.textContent = "search [/]";
    triggerBtn.addEventListener("click", () => openCmd(""));
    document.body.appendChild(triggerBtn);

    const heroSearchBtn = document.getElementById("hero-search-btn");
    if (heroSearchBtn) heroSearchBtn.addEventListener("click", () => openCmd(""));

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

    function openCmd(initialChar) {
      backdrop.classList.add("open");
      document.body.classList.add("cmd-open");
      input.value = initialChar || "";
      selIdx = 0;
      input.focus();
      renderDropdown();
    }

    function closeCmd() {
      backdrop.classList.remove("open");
      document.body.classList.remove("cmd-open");
      input.value = "";
      matches = [];
      selIdx = 0;
      listEl.classList.remove("open");
      listEl.innerHTML = "";
      input.blur();
    }

    input.addEventListener("input", () => {
      selIdx = 0;
      renderDropdown();
    });

    input.addEventListener("keydown", e => {
      if (e.key === "ArrowDown" && matches.length) {
        e.preventDefault();
        selIdx = (selIdx + 1) % matches.length;
        renderDropdown();
      } else if (e.key === "ArrowUp" && matches.length) {
        e.preventDefault();
        selIdx = (selIdx - 1 + matches.length) % matches.length;
        renderDropdown();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (matches[selIdx] && matches[selIdx].topic.file) {
          location.href = prefix + matches[selIdx].topic.file;
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeCmd();
      }
    });

    document.addEventListener("keydown", e => {
      if (backdrop.classList.contains("open")) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeCmd();
        }
        return;
      }
      const tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        openCmd("");
      } else if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
        e.preventDefault();
        openCmd(e.key);
      }
    });

    backdrop.addEventListener("click", e => {
      if (!modal.contains(e.target)) closeCmd();
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
