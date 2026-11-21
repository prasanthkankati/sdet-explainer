// Universal SDET Explainer Engine: Theme, 3-Column DocTree, Right TOC, Volume-Dot Scroller, Search & Glossary
(function () {
  const inTopicsDir = location.pathname.replace(/\\/g, "/").includes("/topics/");
  const assetPrefix = inTopicsDir ? "../" : "";
  const currentFile = location.pathname.replace(/\\/g, "/").split("/").pop() || "index.html";

  // Helper: Find first published file per track
  function firstFileForTrack(tr) {
    if (typeof TOPICS === "undefined") {
      return inTopicsDir ? "java-jdk-jre-jvm.html" : "topics/java-jdk-jre-jvm.html";
    }
    const found = TOPICS.find(t => t.track === tr && t.file);
    const prefix = inTopicsDir ? "" : "topics/";
    return found ? prefix + found.file : (inTopicsDir ? "../index.html" : "index.html");
  }

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

  const updateMetaThemeColor = (theme) => {
    const isHome = document.body.classList.contains("home-page");
    const color = theme === "light" ? "#ffffff" : (isHome ? "#000000" : "#09090b");
    let meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  };

  const setTheme = t => {
    root.setAttribute("data-theme", t);
    document.querySelectorAll(".theme-toggle").forEach(b => {
      b.title = t === "light" ? "Switch to Dark Mode (Alt+L)" : "Switch to Light Mode (Alt+L)";
    });
    localStorage.setItem("theme", t);
    updateMetaThemeColor(t);
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
    initMobileDrawerEvents();
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

    // Ensure edge-to-edge viewport and status-bar tags exist on every topic page
    let vp = document.querySelector('meta[name="viewport"]');
    if (!vp) {
      vp = document.createElement("meta");
      vp.name = "viewport";
      document.head.appendChild(vp);
    }
    vp.setAttribute("content", "width=device-width,initial-scale=1,viewport-fit=cover");

    if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
      const cap = document.createElement("meta");
      cap.name = "apple-mobile-web-app-capable";
      cap.content = "yes";
      document.head.appendChild(cap);
    }
    if (!document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')) {
      const bar = document.createElement("meta");
      bar.name = "apple-mobile-web-app-status-bar-style";
      bar.content = "black-translucent";
      document.head.appendChild(bar);
    }

    document.body.classList.add("in-chapter", "selenium-doc-page");

    // Determine current topic & track
    const currentTopic = TOPICS.find(t => t.file === currentFile);
    const tagEl = article.querySelector(".tag");
    const rawTag = tagEl ? tagEl.textContent.replace(/[\[\]]/g, "").trim() : "";
    const currentTrack = (currentTopic && currentTopic.track) ||
      rawTag ||
      (currentFile.startsWith("selenium-") ? "Selenium" :
       currentFile.startsWith("java-") ? "Java" :
       currentFile.startsWith("manual-") ? "Manual" :
       currentFile.startsWith("interview-") ? "Interview" : "Selenium");

    document.body.setAttribute("data-track", currentTrack);

    // Record last read doc for Homepage "Resume" button
    try {
      const h1El = article.querySelector("h1");
      const docTitle = (currentTopic && currentTopic.title) || (h1El && h1El.textContent.trim()) || currentFile;
      localStorage.setItem("sdet_last_read", JSON.stringify({
        file: currentFile,
        title: docTitle,
        track: currentTrack
      }));
    } catch (e) {}

    // Track metadata for navbar
    const trackMeta = {
      Manual: { badge: "MANUAL QA", pill: "ISTQB + AGILE" },
      Java: { badge: "JAVA CORE", pill: "LANG: JAVA 21" },
      Selenium: { badge: "SELENIUM DOCS", pill: "SELENIUM 4 · JAVA" },
      TestNG: { badge: "TESTNG AUTOMATION", pill: "FRAMEWORK: TESTNG 7.10" },
      TypeScript: { badge: "TS / JS", pill: "LANG: TYPESCRIPT" },
      Playwright: { badge: "PLAYWRIGHT", pill: "PLAYWRIGHT · TS" },
      Interview: { badge: "INTERVIEW", pill: "SDET Q&A" }
    };
    const meta = trackMeta[currentTrack] || { badge: currentTrack.toUpperCase(), pill: "SDET DOCS" };

    // 1. Build or normalize Top Navbar (.se-navbar)
    let navbar = document.querySelector(".se-navbar");
    if (!navbar) {
      navbar = document.createElement("nav");
      navbar.className = "se-navbar";
      navbar.setAttribute("aria-label", "Documentation Navigation");
      document.body.insertBefore(navbar, document.body.firstChild);
    }

    const navTracks = ["Manual", "Java", "Selenium", "TestNG", "TypeScript", "Playwright", "Interview"];
    navbar.innerHTML = `
      <div class="se-navbar-left">
        <button class="se-mob-tree-btn" type="button" id="se-mob-tree-btn" aria-label="Toggle Documentation Tree" title="Toggle Documentation Tree">&#9776;</button>
        <a href="../index.html" class="se-nav-home-btn" title="Back to Syllabus Hub (Alt+H)" aria-label="Home">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </a>
      </div>
      <div class="se-navbar-center">
        <ul class="se-navbar-links">
          ${navTracks.map(tr => `
            <li>
              <a href="${firstFileForTrack(tr)}" class="se-track-chip ${tr === currentTrack ? "active" : ""}" data-track="${tr}">
                <span class="chip-label">${tr === "TypeScript" ? "TS / JS" : tr}</span>
              </a>
            </li>
          `).join("")}
        </ul>
      </div>
      <div class="se-navbar-right">
        <button class="icon-btn theme-toggle nav-theme-toggle" type="button" id="nav-theme-btn" aria-label="Toggle Light/Dark Theme">
          ${createThemeToggleSvg()}
        </button>
      </div>
    `;

    const navThemeBtn = document.getElementById("nav-theme-btn");
    if (navThemeBtn) {
      navThemeBtn.onclick = toggleTheme;
      setTheme(root.getAttribute("data-theme") || "dark");
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

      // Shared stacking context: backdrop sits inside layout right before sidebar
      let backdropEl = document.querySelector(".se-sidebar-backdrop");
      if (!backdropEl) {
        backdropEl = document.createElement("div");
        backdropEl.className = "se-sidebar-backdrop";
      }
      layout.appendChild(backdropEl);
      layout.appendChild(sidebarEl);
      layout.appendChild(mainEl);
      layout.appendChild(tocEl);

      const closeMobTree = () => document.body.classList.remove("mob-tree-open");
      const toggleMobTree = () => document.body.classList.toggle("mob-tree-open");
      backdropEl.onclick = closeMobTree;
      const mobTreeBtn = document.getElementById("se-mob-tree-btn");
      if (mobTreeBtn) {
        mobTreeBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMobTree();
        };
      }

      if (oldWrap) {
        oldWrap.replaceWith(layout);
      } else {
        navbar.insertAdjacentElement("afterend", layout);
      }

      // Clean up stray legacy footers on chapter pages and add clean doc footer
      document.querySelectorAll("body.in-chapter > footer").forEach(f => f.remove());
      if (!mainEl.querySelector(".se-doc-footer")) {
        const docFoot = document.createElement("div");
        docFoot.className = "se-doc-footer";
        docFoot.innerHTML = `
          <div class="se-doc-footer-inner">
            <span>SDET Explainer &middot; Engineering Knowledge Base</span>
            <a href="../index.html">&larr; Back to Syllabus Hub (Alt+H)</a>
          </div>
        `;
        mainEl.appendChild(docFoot);
      }
    }

    // 3. Populate Left Sidebar Documentation Tree (.se-sidebar)
    const sidebar = layout.querySelector(".se-sidebar");
    if (sidebar) {
      renderSidebarTree(sidebar, currentTrack, currentFile);
    }

    // 4. Populate Right Sidebar TOC (.se-toc)
    rebuildTocForArticle(article, layout);

    // 5. Build Previous / Next Chapter Navigation & Mobile Chapter Selector
    buildChapterNav(article, currentTrack, currentFile);

    // 6. Update last read
    try {
      const h1El = article.querySelector("h1");
      const currentTopic = (typeof TOPICS !== "undefined") ? TOPICS.find(t => t.file === currentFile) : null;
      const docTitle = (currentTopic && currentTopic.title) || (h1El && h1El.textContent.trim()) || currentFile;
      localStorage.setItem("sdet_last_read", JSON.stringify({
        file: currentFile,
        title: docTitle,
        track: currentTrack
      }));
    } catch (e) {}
  }

  // Chapter Navigation Bar (Prev / Next) & Mobile Chapter Selector
  function buildChapterNav(article, track, filename) {
    if (!article || typeof TOPICS === "undefined") return;
    const trackTopics = TOPICS.filter(t => t.track === track && t.file);
    if (!trackTopics.length) return;
    const idx = trackTopics.findIndex(t => t.file === filename);

    // 1. Mobile top chapter selector bar
    const mainContainer = article.closest(".se-main") || article.parentElement;
    if (mainContainer) {
      let mobBar = mainContainer.querySelector(".se-mob-chapter-bar");
      if (!mobBar) {
        mobBar = document.createElement("div");
        mobBar.className = "se-mob-chapter-bar";
        mainContainer.insertBefore(mobBar, article);
      }
      const currentNum = idx >= 0 ? `${idx + 1}/${trackTopics.length}` : "";
      mobBar.innerHTML = `
        <div class="se-mob-chapter-inner">
          <span class="se-mob-chapter-badge">${esc(track)} (${currentNum})</span>
          <select class="se-mob-chapter-select" aria-label="Switch Chapter">
            ${trackTopics.map((t, i) => `<option value="${t.file}" ${t.file === filename ? "selected" : ""}>${i + 1}. ${esc(t.title)}</option>`).join("")}
          </select>
        </div>
      `;
      const sel = mobBar.querySelector("select");
      if (sel) {
        sel.onchange = (e) => {
          const target = e.target.value;
          if (target && target !== filename) {
            location.href = target;
          }
        };
      }
    }

    // 2. Bottom Previous / Next Chapter Buttons
    let navBox = article.querySelector(".se-chapter-nav");
    if (!navBox) {
      navBox = document.createElement("nav");
      navBox.className = "se-chapter-nav";
      navBox.setAttribute("aria-label", "Previous and Next Chapter");
      article.appendChild(navBox);
    }
    const prevTopic = idx > 0 ? trackTopics[idx - 1] : null;
    const nextTopic = idx >= 0 && idx < trackTopics.length - 1 ? trackTopics[idx + 1] : null;

    navBox.innerHTML = `
      ${prevTopic ? `
        <a href="${prevTopic.file}" class="se-chapter-btn prev" title="Previous: ${esc(prevTopic.title)}">
          <span class="btn-sub">&larr; PREVIOUS CHAPTER</span>
          <span class="btn-title">${esc(prevTopic.title)}</span>
        </a>
      ` : `<div class="se-chapter-btn disabled"></div>`}
      ${nextTopic ? `
        <a href="${nextTopic.file}" class="se-chapter-btn next" title="Next: ${esc(nextTopic.title)}">
          <span class="btn-sub">NEXT CHAPTER &rarr;</span>
          <span class="btn-title">${esc(nextTopic.title)}</span>
        </a>
      ` : `<div class="se-chapter-btn disabled"></div>`}
    `;
  }

  // Modular Sidebar Tree Renderer
  function renderSidebarTree(sidebar, targetTrack, activeFile) {
    if (!sidebar || typeof TOPICS === "undefined") return;
    const trackTopics = TOPICS.filter(t => t.track === targetTrack);
    const secGroups = new Map();
    trackTopics.forEach(t => {
      const sec = t.section || targetTrack;
      if (!secGroups.has(sec)) secGroups.set(sec, []);
      secGroups.get(sec).push(t);
    });

    const doneCount = trackTopics.filter(t => t.file).length;
    const navTracks = ["Manual", "Java", "Selenium", "TestNG", "TypeScript", "Playwright", "Interview"];
    const trackPillsHtml = `<div class="se-sidebar-track-selector" aria-label="Switch Track">` +
      navTracks.map(tr => `<a href="${firstFileForTrack(tr)}" class="se-side-track-pill ${tr === targetTrack ? "active" : ""}" data-track="${tr}">${tr === "TypeScript" ? "TS / JS" : tr}</a>`).join("") +
      `</div>`;

    let treeHtml = `<div class="se-sidebar-hdr"><span>${esc(targetTrack)} DocTree (${doneCount}/${trackTopics.length})</span><button type="button" class="se-sidebar-close" id="se-sidebar-close-btn" aria-label="Close Navigation Drawer">&times;</button></div>${trackPillsHtml}<ul class="se-tree">`;
    secGroups.forEach((items, secName) => {
      items.sort((a, b) => (a.order || 99) - (b.order || 99));
      treeHtml += `<li><span class="se-sec-label">${esc(secName)}</span><ul>`;
      items.forEach(item => {
        const isActive = item.file === activeFile;
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

    const closeBtn = document.getElementById("se-sidebar-close-btn");
    if (closeBtn) {
      closeBtn.onclick = () => document.body.classList.remove("mob-tree-open");
    }

    // Immediate, bulletproof navigation on mobile and desktop
    sidebar.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (href && href !== "#" && !href.startsWith("javascript:")) {
          e.preventDefault();
          e.stopPropagation();
          location.href = href;
        }
      });
    });

    // Auto-scroll active item into center of sidebar
    const activeLink = sidebar.querySelector("a.active");
    if (activeLink) {
      requestAnimationFrame(() => {
        const topOffset = activeLink.offsetTop - sidebar.clientHeight / 2 + activeLink.clientHeight / 2;
        sidebar.scrollTop = Math.max(0, topOffset);
      });
    }
  }

  // Modular Right TOC & ScrollSpy Builder
  function rebuildTocForArticle(article, layout) {
    if (!article) return;
    layout = layout || document.querySelector(".se-layout");
    if (!layout) return;

    const toc = layout.querySelector(".se-toc");
    const mainContainer = layout.querySelector(".se-main");
    if (!toc) return;

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

    const tocLinksHtml = tocItems.map(item => `<li><a href="#${item.id}" data-target="${item.id}">${esc(item.text)}</a></li>`).join("");
    toc.innerHTML = `<div class="se-toc-title">On this page</div><ul>${tocLinksHtml}</ul>`;

    const oldMobToc = mainContainer ? mainContainer.querySelector(".se-mob-toc") : null;
    if (oldMobToc) oldMobToc.remove();

    if (mainContainer && tocItems.length > 0) {
      const mobToc = document.createElement("details");
      mobToc.className = "se-mob-toc";
      mobToc.innerHTML = `<summary>On this page (${tocItems.length})</summary><ul>${tocLinksHtml}</ul>`;
      mobToc.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => { mobToc.removeAttribute("open"); });
      });
      mainContainer.insertBefore(mobToc, article);
    }

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

    if (window._seScrollSpy) {
      window.removeEventListener("scroll", window._seScrollSpy);
    }
    window._seScrollSpy = updateScrollSpy;
    window.addEventListener("scroll", updateScrollSpy, { passive: true });
    updateScrollSpy();
  }

  // Mobile Drawer & Page Lifecycle Management (Native, 100% reliable navigation)
  function initMobileDrawerEvents() {
    window.addEventListener("pageshow", () => {
      document.body.classList.remove("mob-tree-open");
      const mainEl = document.querySelector(".se-main");
      if (mainEl) {
        mainEl.style.opacity = "1";
        mainEl.style.transform = "none";
      }
    });

    // Close mobile drawer when pressing Escape
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && document.body.classList.contains("mob-tree-open")) {
        document.body.classList.remove("mob-tree-open");
      }
    });
  }

  // Minimalist Floating Scroll-Dot Indicator Across All Pages (No lines/rails; fades when idle)
  function initVolumeScroller() {
    if (document.querySelector(".scroll-dot-indicator")) return;
    const dot = document.createElement("div");
    dot.className = "scroll-dot-indicator d-print-none";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);

    let hideTimeout = null;

    function updateScroller() {
      const docEl = document.documentElement;
      const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const topPx = Math.round((window.innerHeight * 0.08) + ratio * (window.innerHeight * 0.84));
      dot.style.top = `${topPx}px`;

      dot.classList.add("is-scrolling");
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        dot.classList.remove("is-scrolling");
      }, 650);
    }

    window.addEventListener("scroll", updateScroller, { passive: true });
    window.addEventListener("resize", updateScroller, { passive: true });
  }

  function loadGlossaryAsync() {
    if (typeof GLOSSARY === "undefined") {
      const g = document.createElement("script");
      g.src = assetPrefix + "glossary.js";
      g.onload = () => { if (typeof initGlossary === "function") initGlossary(); };
      document.head.appendChild(g);
    } else {
      if (typeof initGlossary === "function") initGlossary();
    }
  }

  if (typeof TOPICS === "undefined") {
    const s = document.createElement("script");
    s.src = assetPrefix + "topics.js";
    s.onload = () => {
      initAll();
      loadGlossaryAsync();
    };
    document.head.appendChild(s);
  } else {
    initAll();
    loadGlossaryAsync();
  }

  const SITE_VERSION = "v3.9.4";
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
    // Footer on reading pages is dynamically injected by the doc layout builder; home footer is static HTML.

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

      if (targetTrack === "HOME" || targetTrack === "All") {
        location.href = homeHref;
        return;
      }

      const dest = firstFileForTrack(targetTrack);
      if (dest) location.href = dest;
    });
  }

  // Homepage Minimalist Engine: Resume, Random, Search Trigger & Published Stats
  function initIndex() {
    if (inTopicsDir) return;

    // 1. Resume Last Read Chapter
    const resumeBtn = document.getElementById("hero-resume-btn");
    if (resumeBtn) {
      try {
        const rawLast = localStorage.getItem("sdet_last_read");
        if (rawLast) {
          const last = JSON.parse(rawLast);
          if (last && last.file) {
            const shortTitle = (last.title || "").length > 28
              ? last.title.slice(0, 26).trim() + "…"
              : (last.title || "Last Read");
            resumeBtn.href = "topics/" + last.file;
            const textEl = resumeBtn.querySelector(".btn-text");
            if (textEl) textEl.textContent = `Resume: ${shortTitle}`;
            resumeBtn.title = `Resume last read (${last.track || "Topic"}): ${last.title}`;
          }
        }
      } catch (e) {}
    }

    // 2. Random Chapter Button
    const randomBtn = document.getElementById("hero-random-btn");
    if (randomBtn && typeof TOPICS !== "undefined") {
      const published = TOPICS.filter(t => t.file);
      if (published.length > 0) {
        const randTopic = published[Math.floor(Math.random() * published.length)];
        randomBtn.href = "topics/" + randTopic.file;
        const textEl = randomBtn.querySelector(".btn-text");
        const randTitle = randTopic.title.length > 22 ? randTopic.title.slice(0, 20).trim() + "…" : randTopic.title;
        if (textEl) textEl.textContent = `Random: ${randTitle}`;
        randomBtn.title = `Open random published chapter: ${randTopic.title} (${randTopic.track})`;
      }
    }

    // 3. Hero Search Trigger
    const searchTrigger = document.getElementById("hero-search-trigger");
    if (searchTrigger) {
      searchTrigger.addEventListener("click", () => {
        if (openCmdFn) openCmdFn("");
      });
      searchTrigger.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (openCmdFn) openCmdFn("");
        }
      });
    }

    // 4. Update Published Count Stat
    const specTotal = document.getElementById("spec-total");
    if (specTotal && typeof TOPICS !== "undefined") {
      const doneCount = TOPICS.filter(t => t.file).length;
      specTotal.textContent = String(doneCount);
    }
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
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCmd("");
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
