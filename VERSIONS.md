# Source Version Management (SVM) & Release History

Every feature change, UI improvement, or syllabus chapter build is tracked with a semantic version (`vMAJOR.MINOR.PATCH`) and committed/tagged in Git (`C:\Users\Prasa\explainer\.git`) so any state can be inspected or restored via `git checkout <version-tag>`.

---

## Version Ledger

| Version | Date | Category | Summary of Changes | Key Files Modified |
|---|---|---|---|---|
| **v1.0.0** | 2026-11-12 | Foundation | Initial SDET Explainer static site (`file://`), Dark/Light terminal UI, Java topics 1–3 (`Object`, `JDK/JRE/JVM`, `JVM Architecture`), global typeahead search. | `site/index.html`, `site/style.css`, `site/app.js`, `site/topics.js` |
| **v1.1.0** | 2026-11-13 | Syllabus & M1 Build | Full 6-Track Zero-to-Hero Syllabus (`Manual`, `Java`, `Selenium`, `TypeScript`, `Playwright`, `Interview`). Built Manual **Section M1 (1.1–1.4)** + **4 Connected Question Banks (140 Questions)** with `.qa-chip` routing. | `site/topics/manual-m1-*.html`, `site/topics/interview-m1-*.html`, `REQUIREMENTS.md` |
| **v1.2.0** | 2026-11-13 | Visual Diagrams | Added visual 6-phase SDLC pipeline diagram, stepped V-Model verification-to-validation diagram, and 6-phase STLC pipeline diagram with Smoke Gate highlight. | `site/style.css`, `site/topics/manual-m1-2-sdlc-models.html`, `site/topics/manual-m1-3-stlc-phases.html` |
| **v1.3.0** | 2026-11-13 | Inline Glossary & Terms | Added `site/glossary.js` + auto-detecting hover/click inline terminology popover (`.term-pop`) showing Definition, Properties & Real Example. Rewrote M1 Section 1–2 to define all prerequisite terms & properties (`Broken Build`, `RTM`, `Entry/Exit/Sign-Off Criteria`, `BRS/SRS/HLD/LLD`, `Error/Defect/Failure`, `EP/BVA`) before use. | `site/glossary.js`, `site/app.js`, `site/style.css`, `site/topics/manual-m1-*.html` |
| **v1.4.0** | 2026-11-13 | Global Shortcuts & SVM | Added clickable `> SDET Explainer` Home navigation + global `Alt+<First Letter>` shortcuts (`Alt+H` Home, `Alt+A` All, `Alt+M` Manual, `Alt+J` Java, `Alt+S` Selenium, `Alt+T` TS/JS, `Alt+P` Playwright, `Alt+I` Interview) across all pages + initialized SVM version tracking. | `site/index.html`, `site/app.js`, `site/style.css`, `VERSIONS.md`, `PROGRESS.md` |
| **v1.5.0** | 2026-11-13 | Readability & `Alt+L` Theme | Overhauled typography & layout readability: block `h2` section headers (replacing inline merged bold headers), left-bordered `.def` callout block, clean sans-serif reading prose + monospace code/tags, padded code boxes (`--code-bg`), dashed table row dividers, auto-conversion of raw `**`/`code` markdown, and `Alt+L` shortcut for Light/Dark mode toggle. | `site/style.css`, `site/app.js`, `site/index.html`, `VERSIONS.md`, `PROGRESS.md` |
| **v1.6.0** | 2026-11-13 | Manual M2 Build (3 Topics + 105 Q&As) | Published **Section M2 (`Test Levels & Testing Types`)**: `2.1 Levels of Testing (Unit, Integration, System, UAT)`, `2.2 Functional Testing (Smoke vs Sanity & Regression vs Retesting)`, and `2.3 Non-Functional Testing (Performance, Security, Usability, Compatibility)` + **3 Connected Question Banks (105 Questions; 245 Total Q&As)** + M2 glossary entries. | `site/topics/manual-m2-*.html`, `site/topics/interview-m2-*.html`, `site/topics.js`, `site/glossary.js` |
| **v1.7.0** | 2026-11-13 | Chapter Top Bar & Metallic Sheet UI | When inside a chapter (`topics/*.html`), moved `SDET Explainer` (without `>`) and `← All topics` + search bar to the far left in a sleek single-row sticky top bar (`header.chapter-top`) for maximum upper breathing room, and wrapped the reading `article` in a modern brushed-metallic sheet container with a luminous thin metallic liner border (`--sheet-border` + `--sheet-top-liner`). | `site/style.css`, `site/app.js`, `site/index.html`, `VERSIONS.md`, `PROGRESS.md` |
| **v1.7.1** | 2026-11-13 | Clean Metallic Border Liner Only | Removed inner card fill/shadow on `article`; kept clean transparent canvas with a thin metallic-steel border liner (`1px solid var(--sheet-border)`). | `site/style.css`, `site/app.js`, `site/index.html`, `VERSIONS.md`, `PROGRESS.md` |
| **v1.7.2** | 2026-11-13 | Zero-Radius Sharp Border Edge | Set `border-radius: 0` on chapter border liner (`body.in-chapter article`) for crisp 90-degree edges. | `site/style.css`, `site/app.js`, `site/index.html`, `VERSIONS.md`, `PROGRESS.md` |
| **v1.8.0** | 2026-11-13 | VS Code High Contrast Brand Kit + Complete Manual Track (M3, M4, M5) | Applied **VS Code High Contrast Dark & Light** brand palette (`#000000` / `#ffffff`, `#6fc3df` cyan-blue borders, `#f38518` amber focus) with **0-cornering everywhere (`border-radius: 0`)** + updated `SKILL.md`. Published **M3 (3.1–3.3)**, **M4 (4.1–4.3)**, and **M5 (5.1–5.2)** + **8 Connected Question Banks (280 New Q&As; 525 Total Q&As)** — **Manual Testing Track 100% Complete (15/15)**! | `site/style.css`, `SKILL.md`, `site/topics/manual-m3-*.html`, `site/topics/manual-m4-*.html`, `site/topics/manual-m5-*.html`, `site/topics/interview-m3..m5-*.html`, `site/topics.js` |

---

## How to Inspect or Roll Back Versions (Git SVM)
```powershell
# List all saved versions
git -C "C:\Users\Prasa\explainer" tag -n

# View commit history with file stats
git -C "C:\Users\Prasa\explainer" log --oneline --decorate --stat

# Diff between any two versions
git -C "C:\Users\Prasa\explainer" diff v1.3.0 v1.4.0

# Restore / checkout a specific version
git -C "C:\Users\Prasa\explainer" checkout v1.4.0
```
