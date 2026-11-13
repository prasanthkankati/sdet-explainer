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
