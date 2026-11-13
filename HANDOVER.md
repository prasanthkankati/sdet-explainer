# Handover

Last updated: 2026-11-13. Read this first when resuming.

## Project
Learning Java + Selenium to become an SDET. Root: `C:\Users\Prasa\explainer`.
- Static site: `site\index.html` (open directly; dark/light toggle, search, Java/Selenium filter).
- Tracker: `PROGRESS.md`. Backlog: `FUTURE_TOPICS.md`.
- Skill: `C:\Users\Prasa\.gemini\config\skills\explain\SKILL.md` (NEW story format, no analogies, UI rules, workflow).
- Rule: `C:\Users\Prasa\.gemini\config\rules\explainer-project.md`.

## Published on the site (3)
1. Java: Object (Republished in new Selenium + Interview story format)
2. Java: JDK vs JRE vs JVM (OLD format, to be republished next)
3. Java: JVM Architecture and Memory Areas (OLD format, to be split & republished)

## Teaching rules (user, mandatory; full text in SKILL.md)
- No real-life analogies ever. One simple runnable code example, run it, trace line by line with real output (and bytecode/memory evidence).
- One connected story; answer every question the reader would ask at each sentence (what, why, how, where, when, limits, types, differences, errors, interview and SDET angle). No separate FAQ sections.
- Types: list all first, then explain each in order.
- Define every term at first use; stay on topic; search web for Java/SDET interview coverage when unsure.
- Show in chat first with alert tone; publish only after "post it".

## Pending
- Republish plan (awaiting user confirmation): Object, JDK/JRE/JVM, then split JVM memory into Stack, Heap, Metaspace/static, plus Class Loader and Execution Engine pages, all in the new format.
- Program structure draft (old format, discarded; redo in new format).
- Earlier real-code memory trace (Demo.java in the conversation scratch dir) can be reused: `C:\Users\Prasa\.gemini\antigravity-cli\brain\ce2f265d-cbf5-4612-9da5-409e6a3d8b68\scratch\Demo.java`.

## Environment notes
- `C:\WINDOWS\System32` is write-protected. Use `C:\Users\Prasa\explainer`.
- Shell cannot write in the explainer folder; use `write_file`/`edit_file`.
- Java installed: OpenJDK 25.0.3 Temurin (javac, java, javap work).

## Next steps
1. User confirms republish plan/order.
2. Per topic: draft in chat (new format) -> "post it" -> publish, update topics.js, PROGRESS.md, HANDOVER.md.
3. Then Program structure, Variables and data types; backlog in `FUTURE_TOPICS.md`.
