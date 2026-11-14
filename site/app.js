// Universal SDET Explainer Engine: Theme, 3-Column DocTree, Right TOC, Volume-Dot Scroller, Search & Glossary
(function () {
  const inTopicsDir = location.pathname.replace(/\\/g, "/").includes("/topics/");
  const assetPrefix = inTopicsDir ? "../" : "";
  const currentFile = location.pathname.replace(/\\/g, "/").split("/").pop() || "index.html";

  // Theme toggle (dark/light), saved in localStorage, defaults to dark, Shortcut: Alt+L
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const sys = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

  function createThemeToggleSvg() {
    return `
      <svg class="theme-icon sun-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg class="theme-icon moon-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="17" cy="6" r="3" class="night-moon" fill="currentColor" stroke="currentColor"></circle>
        <path d="M2 19L8.5 9.5L15 19"></path>
        <path d="M12.5 19L17 12.5L22 19"></path>
        <line x1="2" y1="19" x2="22" y2="19"></line>
      </svg>
    `;
  }

  const setTheme = t => {
    root.setAttribute("data-theme", t);
    document.querySelectorAll(".theme-toggle").forEach(b => {
      b.title = t === "light" ? "Switch to Dark Mode (Alt+L)" : "Switch to Light Mode (Alt+L)";
    });
    localStorage.setItem("theme", t);
  };
  const toggleTheme = () => setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");

  const heroThemeBtn = document.getElementById("hero-theme-btn");
  if (heroThemeBtn) heroThemeBtn.onclick = toggleTheme;
  setTheme(saved || sys || "dark");

  let openCmdFn = null;
  let selectTrackFn = null;

  function initAll() {
    cleanMarkdownInArticle();
    initUniversalDocLayout();
    initSyntaxAndCopy();
    initHeaderAndShortcuts();
    initIndex();
    initTypeahead();
    initGlossary();
    initVolumeScroller();
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

  // Build Universal 3-Column DocTree + Right TOC + Aligned Top Navbar on all chapter pages
  function initUniversalDocLayout() {
    if (!inTopicsDir || typeof TOPICS === "undefined") return;
    const article = document.querySelector("article");
    if (!article) return;

    document.body.classList.add("in-chapter", "selenium-doc-page");

    // Determine current topic & track
    const currentTopic = TOPICS.find(t => t.file === currentFile);
    const tagEl = article.querySelector(".tag");
    const currentTrack = (currentTopic && currentTopic.track) ||
      (tagEl && tagEl.textContent.trim()) ||
      (currentFile.startsWith("selenium-") ? "Selenium" :
       currentFile.startsWith("java-") ? "Java" :
       currentFile.startsWith("manual-") ? "Manual" : "Selenium");

    document.body.setAttribute("data-track", currentTrack);

    // Track metadata for navbar
    const trackMeta = {
      Manual: { badge: "MANUAL QA", pill: "ISTQB + AGILE" },
      Java: { badge: "JAVA CORE", pill: "LANG: JAVA 21" },
      Selenium: { badge: "SELENIUM DOCS", pill: "SELENIUM 4 · JAVA" },
      TypeScript: { badge: "TS / JS", pill: "LANG: TYPESCRIPT" },
      Playwright: { badge: "PLAYWRIGHT", pill: "PLAYWRIGHT · TS" },
      Interview: { badge: "INTERVIEW", pill: "SDET Q&A" }
    };
    const meta = trackMeta[currentTrack] || { badge: currentTrack.toUpperCase(), pill: "SDET DOCS" };

    // Find first published file per track for quick track switching in navbar
    function firstFileForTrack(tr) {
      const found = TOPICS.find(t => t.track === tr && t.file);
      return found ? found.file : `../index.html#${tr}`;
    }

    // 1. Build or normalize Top Navbar (.se-navbar)
    let navbar = document.querySelector(".se-navbar");
    if (!navbar) {
      navbar = document.createElement("nav");
      navbar.className = "se-navbar";
      navbar.setAttribute("aria-label", "Documentation Navigation");
      document.body.insertBefore(navbar, document.body.firstChild);
    }

    const navTracks = ["Manual", "Java", "Selenium", "TypeScript", "Playwright"];
    navbar.innerHTML = `
      <div class="se-navbar-left">
        <a href="../index.html" class="se-brand" title="Back to SDET Explainer Home (Alt+H)">SDET EXPLAINER</a>
        <span class="se-brand-sub">[${esc(meta.badge)}]</span>
        <ul class="se-navbar-links">
          ${navTracks.map(tr => `
            <li><a href="${firstFileForTrack(tr)}" class="${tr === currentTrack ? "active" : ""}">${tr === "TypeScript" ? "TS / JS" : tr}</a></li>
          `).join("")}
          <li><a href="../index.html">All Tracks</a></li>
        </ul>
      </div>
      <div class="se-navbar-right">
        <button class="nav-btn" type="button" id="nav-search-btn" title="Search Syllabus (/)">SEARCH [/]</button>
        <span class="se-lang-pill">${esc(meta.pill)}</span>
        <button class="theme-toggle nav-theme-toggle" type="button" id="nav-theme-btn" aria-label="Toggle Light/Dark Theme">
          ${createThemeToggleSvg()}
        </button>
      </div>
    `;

    const navThemeBtn = document.getElementById("nav-theme-btn");
    if (navThemeBtn) {
      navThemeBtn.onclick = toggleTheme;
      setTheme(root.getAttribute("data-theme") || "dark");
    }
    const navSearchBtn = document.getElementById("nav-search-btn");
    if (navSearchBtn) {
      navSearchBtn.onclick = () => { if (openCmdFn) openCmdFn(""); };
    }

    // 2. Ensure .se-layout wrapper exists around sidebar, main article, and right TOC
    let layout = document.querySelector(".se-layout");
    if (!layout) {
      layout = document.createElement("div");
      layout.className = "se-layout";
      const oldWrap = article.closest(".wrap");
      const mainEl = document.createElement("main");
      mainEl.className = "se-main";
      mainEl.setAttribute("role", "main");
      mainEl.appendChild(article);

      const sidebarEl = document.createElement("aside");
      sidebarEl.className = "se-sidebar";
      sidebarEl.setAttribute("aria-label", "Documentation Tree");

      const tocEl = document.createElement("aside");
      tocEl.className = "se-toc";
      tocEl.setAttribute("aria-label", "On this page");

      layout.appendChild(sidebarEl);
      layout.appendChild(mainEl);
      layout.appendChild(tocEl);

      if (oldWrap) {
        oldWrap.replaceWith(layout);
      } else {
        navbar.insertAdjacentElement("afterend", layout);
      }
    }

    // 3. Populate Left Sidebar Documentation Tree (.se-sidebar) from TOPICS for currentTrack
    const sidebar = layout.querySelector(".se-sidebar");
    if (sidebar) {
      const trackTopics = TOPICS.filter(t => t.track === currentTrack);
      const secGroups = new Map();
      trackTopics.forEach(t => {
        const sec = t.section || currentTrack;
        if (!secGroups.has(sec)) secGroups.set(sec, []);
        secGroups.get(sec).push(t);
      });

      const doneCount = trackTopics.filter(t => t.file).length;
      let treeHtml = `<div class="se-sidebar-hdr"><span>${esc(currentTrack)} DocTree</span><span>${doneCount}/${trackTopics.length}</span></div><ul class="se-tree">`;
      secGroups.forEach((items, secName) => {
        items.sort((a, b) => (a.order || 99) - (b.order || 99));
        treeHtml += `<li><span class="se-sec-label">${esc(secName)}</span><ul>`;
        items.forEach(item => {
          const isActive = item.file === currentFile;
          if (item.file) {
            treeHtml += `<li><a href="${item.file}" class="${isActive ? "active" : ""}">${esc(item.title)}</a></li>`;
          } else {
            treeHtml += `<li><a href="#" class="planned">${esc(item.title)}</a></li>`;
          }
        });
        treeHtml += `</ul></li>`;
      });
      treeHtml += `</ul>`;
      sidebar.innerHTML = treeHtml;

      // Auto-scroll active item into center of sidebar
      const activeLink = sidebar.querySelector("a.active");
      if (activeLink) {
        requestAnimationFrame(() => {
          const topOffset = activeLink.offsetTop - sidebar.clientHeight / 2 + activeLink.clientHeight / 2;
          sidebar.scrollTop = Math.max(0, topOffset);
        });
      }
    }

    // 4. Populate Right Sidebar TOC (.se-toc "On this page") from article h2 headings + Scroll-Spy
    const toc = layout.querySelector(".se-toc");
    if (toc) {
      const headings = Array.from(article.querySelectorAll("h2"));
      const usedIds = new Set();
      const tocItems = headings.map((h, i) => {
        const parentSec = h.closest("section");
        let id = (parentSec && parentSec.id) || h.id;
        if (!id) {
          id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `sec-${i + 1}`;
          if (usedIds.has(id)) id += `-${i + 1}`;
          h.id = id;
        }
        usedIds.add(id);
        return { id, text: h.textContent.trim(), el: h };
      });

      toc.innerHTML = `<div class="se-toc-title">On this page</div><ul>` +
        tocItems.map(item => `<li><a href="#${item.id}" data-target="${item.id}">${esc(item.text)}</a></li>`).join("") +
        `</ul>`;

      const tocLinks = Array.from(toc.querySelectorAll("a[data-target]"));
      function updateScrollSpy() {
        const scrollY = window.scrollY + 110;
        let currentId = tocItems[0] ? tocItems[0].id : "";
        for (const item of tocItems) {
          const top = item.el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollY) {
            currentId = item.id;
          }
        }
        tocLinks.forEach(a => {
          a.classList.toggle("active", a.dataset.target === currentId);
        });
      }
      window.addEventListener("scroll", updateScrollSpy, { passive: true });
      updateScrollSpy();
    }
  }

  // Right-Side Volume-Dot Scroll Progress Indicator Across All Pages
  function initVolumeScroller() {
    if (document.querySelector(".scroll-volume-rail")) return;
    const rail = document.createElement("div");
    rail.className = "scroll-volume-rail d-print-none";
    rail.setAttribute("aria-label", "Page Scroll Progress");
    rail.innerHTML = `
      <div class="scroll-volume-line">
        <div class="scroll-volume-fill"></div>
        <div class="scroll-volume-dot"></div>
      </div>
      <div class="scroll-volume-pct">0%</div>
    `;
    document.body.appendChild(rail);

    const fill = rail.querySelector(".scroll-volume-fill");
    const dot = rail.querySelector(".scroll-volume-dot");
    const pctLabel = rail.querySelector(".scroll-volume-pct");

    function updateScroller() {
      const docEl = document.documentElement;
      const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const pct = Math.round(ratio * 100);
      fill.style.height = `${pct}%`;
      dot.style.top = `${pct}%`;
      pctLabel.style.top = `${pct}%`;
      pctLabel.textContent = `${pct}%`;
    }

    function scrubToEvent(e) {
      const rect = rail.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo({ top: ratio * maxScroll, behavior: "auto" });
    }

    let dragging = false;
    rail.addEventListener("mousedown", e => {
      dragging = true;
      rail.classList.add("dragging");
      scrubToEvent(e);
    });
    window.addEventListener("mousemove", e => {
      if (!dragging) return;
      scrubToEvent(e);
    });
    window.addEventListener("mouseup", () => {
      if (!dragging) return;
      dragging = false;
      rail.classList.remove("dragging");
    });

    window.addEventListener("scroll", updateScroller, { passive: true });
    window.addEventListener("resize", updateScroller, { passive: true });
    updateScroller();
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

  const SITE_VERSION = "v3.1.0";
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

  function initHeaderAndShortcuts() {
    const homeHref = inTopicsDir ? "../index.html" : "index.html";
    const footer = document.querySelector("footer");
    if (footer) {
      footer.innerHTML = `<a href="${homeHref}" title="Home (Alt+H)" style="font-weight:700">SDET Explainer</a> <b>${SITE_VERSION}</b> &middot; Shortcuts: <b>Alt+H</b> Home &middot; <b>Alt+L</b> Theme &middot; <b>/</b> Search &middot; <b>Alt+M</b> Manual &middot; <b>Alt+J</b> Java &middot; <b>Alt+S</b> Selenium &middot; <b>Alt+T</b> TS/JS &middot; <b>Alt+P</b> Playwright`;
    }

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

  // Homepage Index: dynamic track chips, section grouping, search & filter
  function initIndex() {
    const grid = document.getElementById("grid");
    if (!grid) return;
    const controls = document.getElementById("controls");
    const search = document.getElementById("search");
    const stats = document.getElementById("stats");
    let track = "All";

    const tracksList = typeof TRACKS !== "undefined" ? TRACKS : [
      { id: "All", label: "All" },
      { id: "Manual", label: "Manual Testing" },
      { id: "Java", label: "Java" },
      { id: "Selenium", label: "Selenium" },
      { id: "TypeScript", label: "TS / JS" },
      { id: "Playwright", label: "Playwright" },
      { id: "Interview", label: "Interview Q&A" }
    ];

    const hashTrack = (location.hash || "").replace(/^#/, "");
    if (hashTrack && tracksList.some(t => t.id.toLowerCase() === hashTrack.toLowerCase())) {
      track = tracksList.find(t => t.id.toLowerCase() === hashTrack.toLowerCase()).id;
    }

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
      if (newTrack !== "All") {
        document.body.setAttribute("data-track", newTrack);
      } else {
        document.body.removeAttribute("data-track");
      }
      controls.querySelectorAll(".chip").forEach(x => {
        x.classList.toggle("active", x.dataset.track === track);
      });
      render();
    };

    function render() {
      const q = (search ? search.value : "").trim().toLowerCase();
      const totalDone = TOPICS.filter(t => t.file).length;
      const specTotal = document.getElementById("spec-total");
      const meterFill = document.getElementById("hero-meter-fill");
      if (specTotal) specTotal.textContent = `${totalDone} / ${TOPICS.length} PUBLISHED`;
      if (meterFill) meterFill.style.width = `${TOPICS.length ? Math.round((totalDone / TOPICS.length) * 100) : 0}%`;

      const list = TOPICS.filter(t => (track === "All" || t.track === track) &&
        (t.title + " " + (t.section || "") + " " + t.summary + " " + (t.keywords || "") + " " + t.track).toLowerCase().includes(q));
      const doneCount = list.filter(t => t.file).length;
      if (stats) stats.textContent = `${list.length} syllabus topics (${doneCount} published, ${list.length - doneCount} queued)`;

      if (list.length === 0) {
        grid.innerHTML = "<p>No syllabus topics in this track yet.</p>";
        return;
      }

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
        html += `<section class="sec-card">` +
          `<div class="sec-card-hdr">` +
            `<span class="tag ${secTrack}">${secTrack}</span>` +
            `<span class="sec-card-title">${esc(sec)}</span>` +
            `<span class="sec-card-cnt">${secDone}/${items.length}</span>` +
          `</div>` +
          items.map(t => {
            if (t.file) {
              return `<a class="topic-row" href="topics/${t.file}"><span class="topic-row-title">${esc(t.title)}</span><span class="topic-row-pill">[ready]</span></a>`;
            } else {
              return `<div class="topic-row planned"><span class="topic-row-title">${esc(t.title)}</span><span class="topic-row-pill">[queued]</span></div>`;
            }
          }).join("") +
          `</section>`;
      });
      grid.innerHTML = html;
    }

    if (search) search.addEventListener("input", render);
    render();
  }

  // Global Command Search Overlay
  function initTypeahead() {
    if (typeof TOPICS === "undefined") return;
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
    openCmdFn = openCmd;

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
      }
    });

    backdrop.addEventListener("click", e => {
      if (!modal.contains(e.target)) closeCmd();
    });
  }

  // Inline Glossary Popover
  function initGlossary() {
    if (typeof GLOSSARY === "undefined") return;
    const article = document.querySelector("article");
    if (!article) return;

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

  // Context-Aware Multi-Color Syntax Highlighting (Java, XML/Maven, Gradle, TS/Playwright)
  function initSyntaxAndCopy() {
    document.querySelectorAll("pre code").forEach(c => {
      if (c.dataset.highlighted === "1") return;
      c.dataset.highlighted = "1";
      const raw = c.textContent;
      if (c.classList.contains("bash")) {
        c.innerHTML = esc(raw)
          .replace(/(#.*)/g, '<span class="t-cmt">$1</span>')
          .replace(/^(javac|java|mvn|gradle|git|cd|npm|npx|docker)\b/gm, '<span class="t-fn">$1</span>');
      } else {
        c.innerHTML = highlight(raw);
      }
    });

    document.querySelectorAll("pre").forEach(pre => {
      if (pre.querySelector(".copy")) return;
      const b = document.createElement("button");
      b.className = "copy";
      b.textContent = "copy";
      b.onclick = () => {
        const codeEl = pre.querySelector("code");
        navigator.clipboard.writeText(codeEl ? codeEl.textContent : pre.textContent).then(() => {
          b.textContent = "copied";
          setTimeout(() => (b.textContent = "copy"), 1200);
        });
      };
      pre.appendChild(b);
    });
  }
})();

const KW = new Set("class public private protected static void final new return if else for while do switch case break continue try catch finally throw throws extends implements interface abstract import package this super null true false instanceof enum default const let var async await function export from type readonly synchronized volatile".split(" "));
const TYPES = new Set("int long double float boolean char byte short String Integer Double Boolean List Map Set ArrayList HashMap WebDriver WebElement By Object ChromeDriver FirefoxDriver EdgeDriver SafariDriver RemoteWebDriver ChromeOptions FirefoxOptions EdgeOptions SafariOptions ChromeDriverService DriverService PageLoadStrategy WebDriverWait FluentWait Wait ExpectedConditions Duration Actions Select TakesScreenshot OutputType PrintOptions WindowType Cookie Alert Keys RelativeLocator PageFactory Assert Assertions Test System Thread ThreadLocal Exception RuntimeException NoSuchElementException TimeoutException StaleElementReferenceException ElementClickInterceptedException SessionNotCreatedException WebDriverException File URL URI Path Files Paths DevTools LogInspector Network BrowsingContext Promise Page Locator Browser BrowserContext Expect".split(" "));

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(src) {
  const re = /(\/\/.*|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@[A-Za-z_]\w*)|\b(\d+(?:\.\d+)?[Lfd]?)\b|\b([A-Za-z_]\w*)\b(\s*\()?|([=+\-*\/<>!&|%\[\]]+)|([{}();,.])/g;
  let out = "", last = 0, m, prev = "";
  while ((m = re.exec(src))) {
    out += esc(src.slice(last, m.index));
    last = re.lastIndex;
    if (m[1]) out += `<span class="t-cmt">${esc(m[1])}</span>`;
    else if (m[2]) out += `<span class="t-str">${esc(m[2])}</span>`;
    else if (m[3]) out += `<span class="t-ann">${esc(m[3])}</span>`;
    else if (m[4]) out += `<span class="t-num">${esc(m[4])}</span>`;
    else if (m[5]) {
      const w = m[5], call = m[6] || "";
      let cls = "";
      if (KW.has(w)) cls = "t-kw";
      else if (TYPES.has(w) || /^[A-Z][A-Za-z0-9_]*$/.test(w)) cls = "t-type";
      else if (/^(class|interface|enum|type)$/.test(prev)) cls = "t-cls";
      else if (call) cls = "t-fn";
      out += (cls ? `<span class="${cls}">${w}</span>` : w) + esc(call);
      prev = w;
    }
    else if (m[7]) out += `<span class="t-op">${esc(m[7])}</span>`;
    else if (m[8]) out += `<span class="t-punc">${m[8]}</span>`;
  }
  return out + esc(src.slice(last));
}
