# Future Topics (backlog, not created yet)

Each topic is taught later in `explain` format: story + real code, no analogy, shown in chat first, published after "post it".

## Selenium: Waits and Synchronization
- Script synchronization issues (why tests fail when script is faster than the page)
- Polling frequency: what it is and how to control it
- WebDriver waits and their types: Implicit, Explicit (`WebDriverWait`), Fluent
- `FluentWait`: timeout, polling interval, `ignoring(...)`, custom message
- Differences between each wait (table: scope, polling, conditions, when to use)
- Handling dynamic elements (changing ids, delayed load, stale elements, AJAX)

## Selenium: Locators and DOM navigation
- Locators: id, name, className, tagName, linkText, partialLinkText, CSS, XPath
- Tags and attributes basics
- XPath axes: siblings (`following-sibling`, `preceding-sibling`), ancestors (`ancestor`), parent, child, descendant
- CSS selector equivalents of the same relationships
- Choosing stable locators

## Selenium: Environment setup
- Setup without WebDriverManager (manual driver download, `System.setProperty`, Selenium Manager built in to Selenium 4.6+)
- Setup with WebDriverManager (Maven dependency, `WebDriverManager.chromedriver().setup()`)
- Comparison: pros, cons, when to use which
- Maven/Gradle project, JDK, IDE, `JAVA_HOME` checks

## Failures and Debugging
- Handling execution failures (try/catch, retry, soft assert, listeners)
- Getting more information about a failure: stack trace, exception types (`NoSuchElementException`, `TimeoutException`, `StaleElementReferenceException`...), logs, screenshots, page source, browser console logs
- Debug approach: reproduce, isolate, inspect, fix
- Breakpoints (line, conditional, exception breakpoints)
- Stepping: step over, step into, step out, resume, run to cursor
- Watches and evaluate expression, debugging in IntelliJ / Eclipse
- Techniques: logging, reports, rerun failed tests, headed vs headless comparison

## Already queued (from PROGRESS.md)
- Java memory story (real-code version), Program structure, Variables and data types, Operators, Control flow, Methods, Arrays and String
- Java OOP and Selenium topics listed in `PROGRESS.md`
