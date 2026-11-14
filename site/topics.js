// Single Source of Truth for SDET Explainer
// Tracks: Manual | Java | Selenium | TypeScript | Playwright | Interview

const TRACKS = [
  { id: "All",        label: "All" },
  { id: "Manual",     label: "Manual" },
  { id: "Java",       label: "Java" },
  { id: "Selenium",   label: "Selenium" },
  { id: "TypeScript", label: "TypeScript" },
  { id: "Playwright", label: "Playwright" },
  { id: "Interview",  label: "Interview" }
];

// Complete Zero-to-Hero Syllabus across all 6 Tracks
const TOPICS = [
  // ==================== TRACK 1: MANUAL TESTING (M1 - M5) ====================
  {
    track: "Manual",
    section: "M1. SDLC, STLC & Testing Fundamentals",
    order: 1,
    title: "1.1 Verification vs Validation (Static vs Dynamic Testing)",
    file: "manual-m1-1-static-dynamic.html",
    summary: "Base classification of testing, Static (Reviews, SonarQube) vs Dynamic (Unit, API, System, UAT), flow & code trace.",
    keywords: "verification, validation, static testing, dynamic testing, walkthrough, inspection, technical review, SonarQube, QA vs QC",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M1. SDLC, STLC & Testing Fundamentals",
    order: 2,
    title: "1.2 SDLC Models: Waterfall, V-Model, Iterative, Spiral & Agile",
    file: "manual-m1-2-sdlc-models.html",
    summary: "The 6 universal SDLC phases, Sequential vs Incremental families, V-Model pairing, Spiral risk loops, and Agile In-Sprint QA.",
    keywords: "SDLC, Waterfall, V-Model, Spiral, Agile, iterative, incremental, BRS, SRS, HLD, LLD, In-Sprint automation",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M1. SDLC, STLC & Testing Fundamentals",
    order: 3,
    title: "1.3 STLC: All 6 Phases, Entry & Exit Criteria",
    file: "manual-m1-3-stlc-phases.html",
    summary: "Requirement Analysis, Test Planning, Test Case Design, Environment Setup (Smoke Gate), Test Execution, Test Closure & RTM.",
    keywords: "STLC, entry criteria, exit criteria, deliverables, RTM, requirement traceability matrix, test plan, test summary report, smoke gate",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M1. SDLC, STLC & Testing Fundamentals",
    order: 4,
    title: "1.4 The 7 Testing Principles & Shift-Left Testing",
    file: "manual-m1-4-testing-principles.html",
    summary: "Presence vs absence, exhaustive testing math, Shift-Left vs Shift-Right, Defect Clustering (80/20), Pesticide Paradox & Context.",
    keywords: "7 principles of testing, pesticide paradox, defect clustering, Pareto 80/20, exhaustive testing, shift left, shift right, absence of errors fallacy",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M2. Test Levels & Testing Types",
    order: 1,
    title: "2.1 Levels of Testing: Unit, Integration, System & UAT",
    file: "manual-m2-1-test-levels.html",
    summary: "Component testing, Top-Down vs Bottom-Up Integration (Stubs vs Drivers), End-to-End System testing, and Alpha vs Beta UAT.",
    keywords: "unit testing, integration testing, stubs, drivers, sandwich integration, big bang, system testing, UAT, alpha, beta, test pyramid",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M2. Test Levels & Testing Types",
    order: 2,
    title: "2.2 Functional Testing: Smoke vs Sanity & Regression vs Retesting",
    file: "manual-m2-2-functional-testing-types.html",
    summary: "Build verification (Smoke), narrow deep check (Sanity), confirming a bug fix (Retesting), guarding existing features (Regression), Exploratory & Ad-Hoc.",
    keywords: "smoke testing, sanity testing, regression testing, retesting, confirmation testing, unit regional full regression, exploratory, ad-hoc, monkey",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M2. Test Levels & Testing Types",
    order: 3,
    title: "2.3 Non-Functional Testing: Performance, Security, Usability & Compatibility",
    file: "manual-m2-3-non-functional-testing.html",
    summary: "Load vs Stress vs Spike vs Endurance (Soak) vs Volume testing, Security (401/403/IDOR/SQLi), Accessibility (a11y), Compatibility & I18n/L10n.",
    keywords: "non-functional, load testing, stress testing, spike, endurance, soak, volume testing, security, IDOR, compatibility, usability, accessibility, I18n, L10n",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M3. Test Design Techniques & Artifacts",
    order: 1,
    title: "3.1 Black-Box Techniques: Equivalence Partitioning & Boundary Value Analysis",
    file: "manual-m3-1-ep-bva.html",
    summary: "Reducing infinite inputs into valid/invalid partitions (EP) and testing exact min/max edges (BVA: min-1, min, min+1, max-1, max, max+1).",
    keywords: "black box, equivalence partitioning, boundary value analysis, BVA, EP, 2-value BVA, 3-value BVA",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M3. Test Design Techniques & Artifacts",
    order: 2,
    title: "3.2 Decision Table, State Transition & Use Case Testing",
    file: "manual-m3-2-decision-table-state-transition.html",
    summary: "Combinatorial business rules (Decision Tables 2^n), valid/invalid state flows (State Transition), Use Case, Error Guessing & Statement/Branch coverage.",
    keywords: "decision table, state transition, use case testing, error guessing, white box, branch coverage, statement coverage, cyclomatic complexity",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M3. Test Design Techniques & Artifacts",
    order: 3,
    title: "3.3 Test Strategy vs Test Plan, Test Scenario vs Test Case & RTM",
    file: "manual-m3-3-strategy-plan-scenario-case-rtm.html",
    summary: "Organization-level Strategy vs project-level Plan (IEEE 829), high-level Scenario vs step-by-step Test Case, and Forward/Backward RTM.",
    keywords: "test strategy, test plan, test scenario, test case, RTM, requirement traceability matrix, IEEE 829, suspension criteria",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M4. Defect Management & Bug Lifecycle",
    order: 1,
    title: "4.1 Complete Bug Life Cycle & Defect States",
    file: "manual-m4-1-bug-lifecycle.html",
    summary: "Error vs Defect vs Failure, states from New -> Assigned -> Open -> Fixed -> Pending Retest -> Verified/Reopened -> Closed, plus Deferred/Rejected/Duplicate.",
    keywords: "bug life cycle, defect life cycle, reopened, deferred, rejected, duplicate, cannot reproduce, error vs defect vs failure",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M4. Defect Management & Bug Lifecycle",
    order: 2,
    title: "4.2 Severity vs Priority (4x4 Matrix with Real Examples)",
    file: "manual-m4-2-severity-priority.html",
    summary: "Technical impact (Severity) vs business urgency (Priority), with real examples of High Severity/Low Priority and Low Severity/High Priority bugs.",
    keywords: "severity, priority, high severity low priority, low severity high priority, bug triage, showstopper, blocker",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M4. Defect Management & Bug Lifecycle",
    order: 3,
    title: "4.3 Defect Leakage, Defect Escape & Root Cause Analysis (RCA)",
    file: "manual-m4-3-defect-leakage-rca.html",
    summary: "Formulas for Defect Removal Efficiency (DRE), Defect Leakage, Defect Density, and 5-Whys / Fishbone RCA.",
    keywords: "defect leakage, defect escape, DRE, defect density, root cause analysis, RCA, 5-whys, fishbone",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M5. Agile, Scrum, Jira & QA Metrics",
    order: 1,
    title: "5.1 Agile & Scrum Framework: Roles, Ceremonies & Artifacts",
    file: "manual-m5-1-agile-scrum.html",
    summary: "PO, Scrum Master & Developers (including QA), Sprint Planning, Daily Standup, Sprint Review, Retrospective, Backlogs & Increment.",
    keywords: "Agile, Scrum, sprint, product owner, scrum master, standup, retrospective, backlog, increment, in-sprint automation",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Manual",
    section: "M5. Agile, Scrum, Jira & QA Metrics",
    order: 2,
    title: "5.2 User Stories (INVEST), Acceptance Criteria, DoR vs DoD & Velocity",
    file: "manual-m5-2-stories-metrics-kanban.html",
    summary: "Writing Given-When-Then criteria, Definition of Ready vs Definition of Done, Story Points, Velocity, Burndown Chart, and Scrum vs Kanban.",
    keywords: "user story, INVEST, acceptance criteria, DoR, DoD, story points, velocity, burndown, Kanban, Jira, WIP limit",
    status: "done",
    date: "2026-11-13"
  },

  // ==================== TRACK 2: JAVA (J1 - J6) ====================
  {
    track: "Java",
    section: "J1. JVM Architecture & Memory Internals",
    order: 1,
    title: "1.1 JDK vs JRE vs JVM & Bytecode Portability",
    file: "java-jdk-jre-jvm.html",
    summary: "How javac compiles .java to .class bytecode and the JVM executes it across OS.",
    keywords: "javac, java, jar, bytecode, .class, write once run anywhere, JAVA_HOME, UnsupportedClassVersionError, ClassNotFoundException",
    status: "done",
    date: "2026-11-12"
  },
  {
    track: "Java",
    section: "J1. JVM Architecture & Memory Internals",
    order: 2,
    title: "1.2 JVM Architecture & Class Loader Subsystem",
    file: "java-jvm-architecture.html",
    summary: "Bootstrap, Platform & Application ClassLoaders, Linking (Verify, Prepare, Resolve) & Initialization.",
    keywords: "classloader, bootstrap, application, parent delegation, linking, verify, NoClassDefFoundError, ClassNotFoundException",
    status: "done",
    date: "2026-11-12"
  },
  {
    track: "Java",
    section: "J1. JVM Architecture & Memory Internals",
    order: 3,
    title: "1.3 Stack vs Heap Memory & Pass-by-Value",
    file: "",
    summary: "Stack frames, local variable slots, object allocation on Heap, and how Java passes references by value.",
    keywords: "stack, heap, frame, reference, pass by value, StackOverflowError, OutOfMemoryError",
    status: "planned"
  },
  {
    track: "Java",
    section: "J1. JVM Architecture & Memory Internals",
    order: 4,
    title: "1.4 Metaspace, static Memory & Execution Engine (JIT + GC)",
    file: "",
    summary: "Where class metadata and static variables live, Interpreter vs JIT compiler, and Garbage Collection (Young/Old Gen).",
    keywords: "metaspace, static, interpreter, jit compiler, hot code, garbage collector, young generation, old generation, reachability",
    status: "planned"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 1,
    title: "2.1 Program Structure & main() Method Decoded",
    file: "",
    summary: "package, import, class, why main is public static void main(String[] args), and System.out.println internals.",
    keywords: "public static void main, String[] args, System.out.println, entry point, package, import",
    status: "planned"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 2,
    title: "2.2 Variables, Primitive vs Reference Types & Type Casting",
    file: "",
    summary: "8 primitive types, default values, local vs instance vs static variables, widening vs narrowing casts.",
    keywords: "int, long, double, boolean, char, byte, short, float, primitive, reference, type casting, default values",
    status: "planned"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 3,
    title: "2.3 Wrapper Classes, Autoboxing & Integer Cache (-128 to 127)",
    file: "",
    summary: "Why collections require Integer/Boolean objects, autoboxing/unboxing, parseInt vs valueOf, and the == cache trap.",
    keywords: "Integer, Double, Boolean, wrapper class, autoboxing, unboxing, Integer cache, valueOf, parseInt",
    status: "planned"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 4,
    title: "2.4 Operators, Control Flow & Loops",
    file: "",
    summary: "Short-circuit && vs &, ternary operator, if-else, switch expressions, for / enhanced-for / while, break & continue.",
    keywords: "operators, short circuit, ternary, switch, for loop, foreach, while, break, continue",
    status: "planned"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 5,
    title: "2.5 Arrays (1D & 2D Object[][])",
    file: "",
    summary: "Fixed-size Heap arrays, indexing, ArrayIndexOutOfBoundsException, and 2D Object[][] arrays for TestNG @DataProvider.",
    keywords: "array, Object[][], DataProvider, ArrayIndexOutOfBoundsException, Arrays.sort, Arrays.asList",
    status: "planned"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 6,
    title: "2.6 Methods, Parameters, Return Types & Varargs",
    file: "",
    summary: "Method signatures, call stack execution, return values, static vs instance methods, and varargs (String...).",
    keywords: "method, signature, parameter, argument, return, void, varargs",
    status: "planned"
  },
  {
    track: "Java",
    section: "J3. Strings & Text Manipulation",
    order: 1,
    title: "3.1 String Immutability & String Constant Pool",
    file: "",
    summary: "Why String is immutable and final, literal vs new String(), intern(), hash caching, and security.",
    keywords: "String, immutable, String pool, literal, new String, intern, == vs equals",
    status: "planned"
  },
  {
    track: "Java",
    section: "J3. Strings & Text Manipulation",
    order: 2,
    title: "3.2 String vs StringBuilder vs StringBuffer",
    file: "",
    summary: "Why + in a loop creates garbage objects, mutable StringBuilder for single-thread speed, synchronized StringBuffer.",
    keywords: "StringBuilder, StringBuffer, mutable, thread safe, append, reverse",
    status: "planned"
  },
  {
    track: "Java",
    section: "J3. Strings & Text Manipulation",
    order: 3,
    title: "3.3 Essential String Methods & Regex for SDETs",
    file: "",
    summary: "trim, strip, split, substring, replace vs replaceAll (regex), contains, format, and extracting dynamic UI text.",
    keywords: "trim, split, substring, replaceAll, regex, contains, equalsIgnoreCase, getText",
    status: "planned"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 1,
    title: "4.1 Class & Object (Selenium + Interview Edition)",
    file: "java-object.html",
    summary: "Runtime instance on the Heap bundling state (fields) and behavior (methods), 5 creation ways, == vs equals, null.",
    keywords: "new, reference, heap, stack, state, behavior, identity, ==, equals, null, NullPointerException, ChromeDriver, WebElement, By, PageFactory, reflection, clone, deserialization, factory method, LoginPage",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 2,
    title: "4.2 Constructors: Default, Parameterized, Chaining & Singleton",
    file: "",
    summary: "Constructor vs method, compiler default constructor rule, this() vs super() chaining, and private constructors.",
    keywords: "constructor, this(), super(), constructor overloading, private constructor, singleton, Page Object constructor",
    status: "planned"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 3,
    title: "4.3 Access Modifiers & Encapsulation",
    file: "",
    summary: "private < default < protected < public scope matrix, getter/setter validation, and hiding private By locators in POM.",
    keywords: "private, default, protected, public, access modifiers, encapsulation, getter, setter, Page Object",
    status: "planned"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 4,
    title: "4.4 Core Keywords: static, final, this, super & instanceof",
    file: "",
    summary: "Why static WebDriver breaks parallel runs, final variable/method/class, final vs finally vs finalize, this vs super.",
    keywords: "static, final, finally, finalize, this, super, instanceof, ClassCastException",
    status: "planned"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 5,
    title: "4.5 Inheritance (IS-A) vs Composition (HAS-A)",
    file: "",
    summary: "extends keyword, BaseTest / BasePage inheritance, the Diamond Problem, and why Page Objects use Composition for driver.",
    keywords: "inheritance, extends, super, diamond problem, multiple inheritance, composition, IS-A, HAS-A, BaseTest",
    status: "planned"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 6,
    title: "4.6 Polymorphism: Overloading vs Overriding & Upcasting",
    file: "",
    summary: "Compile-time overloading (switchTo().frame) vs runtime overriding, covariant return, and WebDriver driver = new ChromeDriver().",
    keywords: "polymorphism, overloading, overriding, compile time, runtime, dynamic binding, upcasting, downcasting, WebDriver",
    status: "planned"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 7,
    title: "4.7 Abstraction: Abstract Class vs Interface",
    file: "",
    summary: "Contract design, Java 8 default/static methods, Functional & Marker interfaces, and Selenium's WebDriver/TakesScreenshot interfaces.",
    keywords: "abstraction, abstract class, interface, implements, default method, functional interface, marker interface, TakesScreenshot, JavascriptExecutor",
    status: "planned"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 1,
    title: "5.1 Collections Hierarchy & Generics (Type Safety)",
    file: "",
    summary: "Iterable -> Collection -> List/Set/Queue + Map, Collection vs Collections, Generics <T>, and Type Erasure.",
    keywords: "Collection, Collections, Iterable, Generics, type erasure, List<WebElement>",
    status: "planned"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 2,
    title: "5.2 List: ArrayList vs LinkedList",
    file: "",
    summary: "Dynamic array resizing (1.5x), O(1) index access vs doubly-linked nodes, and handling List<WebElement> from findElements().",
    keywords: "List, ArrayList, LinkedList, findElements, dynamic array, time complexity",
    status: "planned"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 3,
    title: "5.3 Set: HashSet vs LinkedHashSet vs TreeSet",
    file: "",
    summary: "How HashSet uses HashMap internally for uniqueness, insertion-ordered LinkedHashSet, sorted TreeSet, and getWindowHandles().",
    keywords: "Set, HashSet, LinkedHashSet, TreeSet, remove duplicates, getWindowHandles",
    status: "planned"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 4,
    title: "5.4 Map: HashMap Internal Working & equals/hashCode Contract",
    file: "",
    summary: "Hashing, bucket index, load factor 0.75, collision chaining, Java 8 Red-Black Tree at 8 nodes, and ConcurrentHashMap.",
    keywords: "Map, HashMap, hashCode, equals, collision, load factor, red-black tree, Hashtable, ConcurrentHashMap, TreeMap",
    status: "planned"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 5,
    title: "5.5 Sorting (Comparable vs Comparator) & Fail-Fast Iterators",
    file: "",
    summary: "Natural ordering (compareTo) vs custom Comparator, ConcurrentModificationException, and verifying UI table sorting.",
    keywords: "Comparable, Comparator, compareTo, compare, Collections.sort, Fail-Fast, Fail-Safe, ConcurrentModificationException",
    status: "planned"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 6,
    title: "5.6 Java 8+ Lambdas, Functional Interfaces, Streams & Optional",
    file: "",
    summary: "Predicate, Function, Consumer, Supplier, Stream filter/map/collect on List<WebElement>, Method References, and Optional.",
    keywords: "lambda, Stream, filter, map, collect, Predicate, Function, Consumer, Supplier, Optional, method reference",
    status: "planned"
  },
  {
    track: "Java",
    section: "J6. Exceptions, File I/O & Multithreading",
    order: 1,
    title: "6.1 Exception Hierarchy: Checked vs Unchecked & Error",
    file: "",
    summary: "Throwable -> Error vs Exception -> RuntimeException, compiler enforcement, and why WebDriverException is unchecked.",
    keywords: "Throwable, Error, Exception, RuntimeException, checked, unchecked, WebDriverException",
    status: "planned"
  },
  {
    track: "Java",
    section: "J6. Exceptions, File I/O & Multithreading",
    order: 2,
    title: "6.2 try-catch-finally, throw vs throws & try-with-resources",
    file: "",
    summary: "Multi-catch order, when finally does/doesn't run, AutoCloseable resource cleanup, and custom framework exceptions.",
    keywords: "try, catch, finally, throw, throws, try-with-resources, AutoCloseable, custom exception",
    status: "planned"
  },
  {
    track: "Java",
    section: "J6. Exceptions, File I/O & Multithreading",
    order: 3,
    title: "6.3 File I/O: Properties, JSON & Apache POI (Excel)",
    file: "",
    summary: "Reading config.properties, FileInputStream, Apache POI XSSFWorkbook for Excel data-driven testing, and JSON POJOs.",
    keywords: "Properties, FileInputStream, Apache POI, XSSFWorkbook, Excel, JSON, Jackson, data-driven",
    status: "planned"
  },
  {
    track: "Java",
    section: "J6. Exceptions, File I/O & Multithreading",
    order: 4,
    title: "6.4 Multithreading & ThreadLocal<WebDriver> for Parallel Tests",
    file: "",
    summary: "Threads, race conditions, synchronized, volatile, and how ThreadLocal isolates WebDriver & ExtentTest across parallel threads.",
    keywords: "Thread, Runnable, synchronized, volatile, ThreadLocal, get, set, remove, parallel execution, thread safety",
    status: "planned"
  },

  // ==================== TRACK 3: SELENIUM (S1 - S6) ====================
  {
    track: "Selenium",
    section: "S1. Architecture, Setup & Browser Control",
    order: 1,
    title: "1.1 Selenium 4 W3C Architecture & WebDriver Hierarchy",
    file: "selenium-s1-1-architecture-setup.html",
    summary: "W3C WebDriver protocol over HTTP client, SearchContext -> WebDriver -> RemoteWebDriver -> ChromeDriver hierarchy, built-in Selenium Manager & complete setup.",
    keywords: "Selenium 4, WebDriver, architecture, W3C protocol, JSON Wire Protocol, SearchContext, RemoteWebDriver, ChromeDriver, Selenium Manager, ThreadLocal, DriverFactory",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Selenium",
    section: "S1. Architecture, Setup & Browser Control",
    order: 2,
    title: "1.2 Environment Setup: Selenium Manager vs WebDriverManager vs System.setProperty",
    file: "selenium-s1-2-setup-managers.html",
    summary: "Built-in Selenium Manager (4.6+) Rust mechanics, ~/.cache/selenium vs ~/.m2, Chrome for Testing, proxy & air-gapped CI/CD.",
    keywords: "Selenium Manager, WebDriverManager, System.setProperty, chromedriver, environment setup, SE_PROXY, Chrome for Testing",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Selenium",
    section: "S1. Architecture, Setup & Browser Control",
    order: 3,
    title: "1.3 Browser Configuration (ChromeOptions) & close() vs quit()",
    file: "selenium-s1-3-chromeoptions-lifecycle.html",
    summary: "ChromeOptions class hierarchy, CLI flags, experimental prefs, PageLoadStrategy (NORMAL vs EAGER vs NONE), and close() vs quit() lifecycle.",
    keywords: "ChromeOptions, headless new, SSL, PageLoadStrategy, driver.close, driver.quit, NoSuchSessionException, NoSuchWindowException, Docker flags",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Selenium",
    section: "S2. Locators, XPath & CSS Mastery",
    order: 1,
    title: "2.1 All 8 Core Locators, DOM, Attributes & Uniqueness",
    file: "selenium-s2-1-locators-scorecard.html",
    summary: "LOC definition, reading DOM, stable vs dynamic attributes, 12 steps before writing, priority order, uniqueness checks, every locator syntax, and DevTools console commands.",
    keywords: "locators, By.id, By.name, By.cssSelector, By.xpath, locator priority, DOM, attributes, dynamic elements, uniqueness, console, DevTools, $x, $$",
    status: "done",
    date: "2026-11-14"
  },
  {
    track: "Selenium",
    section: "S2. Locators, XPath & CSS Mastery",
    order: 2,
    title: "2.2 XPath Complete Guide: Predicates, Functions & Indexing ()[1]",
    file: "",
    summary: "Relative // vs /, text(), contains(), starts-with(), normalize-space(), count(), and //div[4]//div[1] vs (//div[4]//div)[1].",
    keywords: "XPath, contains, starts-with, normalize-space, text(), predicates, indexing",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S2. Locators, XPath & CSS Mastery",
    order: 3,
    title: "2.3 XPath Axes: Siblings, Ancestors & Dynamic DOM Traversal",
    file: "",
    summary: "Navigating complex DOM trees with following-sibling::, preceding-sibling::, parent::, ancestor::, child::, and descendant::.",
    keywords: "XPath axes, following-sibling, preceding-sibling, ancestor, parent, child, descendant",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S2. Locators, XPath & CSS Mastery",
    order: 4,
    title: "2.4 CSS Selector Mastery & Chained Locators",
    file: "",
    summary: "Attribute prefix/suffix/substring (^=, $=, *=), combinators (>, +, ~), element.findElement() chaining, and ByChained.",
    keywords: "CSS selector, combinators, chained locators, ByChained, RelativeLocators",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S3. Synchronization, Waits & Dynamic Elements",
    order: 1,
    title: "3.1 Script Sync Issues & Polling Frequency Mechanics",
    file: "",
    summary: "Why scripts run faster than AJAX/DOM rendering, how polling intervals work (500ms default), and why Thread.sleep() is an anti-pattern.",
    keywords: "synchronization, polling frequency, polling interval, Thread.sleep, flaky tests",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S3. Synchronization, Waits & Dynamic Elements",
    order: 2,
    title: "3.2 Implicit vs Explicit (WebDriverWait) vs FluentWait",
    file: "",
    summary: "Complete comparison table, controlling polling frequency & ignored exceptions in FluentWait, and why never to mix Implicit & Explicit waits.",
    keywords: "implicitlyWait, WebDriverWait, ExpectedConditions, FluentWait, pollingEvery, ignoring, TimeoutException",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S3. Synchronization, Waits & Dynamic Elements",
    order: 3,
    title: "3.3 Custom ExpectedConditions & Handling Dynamic / Stale Elements",
    file: "",
    summary: "Implementing ExpectedCondition<T>, handling AJAX spinners, and retry wrappers for StaleElementReferenceException.",
    keywords: "ExpectedCondition, custom wait, StaleElementReferenceException, AJAX, dynamic elements",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S4. Web Actions, Multiple Elements, Tables & Contexts",
    order: 1,
    title: "4.1 Web Actions: Select Dropdowns, Actions Class & JavascriptExecutor",
    file: "",
    summary: "Select class, hover/drag-and-drop/key-chords with Actions, scrolling & clicking hidden/intercepted elements with JavascriptExecutor.",
    keywords: "Select, dropdown, Actions, moveToElement, dragAndDrop, JavascriptExecutor, scrollIntoView",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S4. Web Actions, Multiple Elements, Tables & Contexts",
    order: 2,
    title: "4.2 Multiple Elements (findElements) & Stream Validation Patterns",
    file: "",
    summary: "findElement vs findElements, empty list checks, Java 8 Stream filtering/mapping, batch actions, and stale-safe list iteration.",
    keywords: "findElements, List<WebElement>, Streams, batch operations, broken links",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S4. Web Actions, Multiple Elements, Tables & Contexts",
    order: 3,
    title: "4.3 HTML Web Tables: Extraction, Sorting Verification & Pagination",
    file: "",
    summary: "Dynamic row/column XPath lookup, verifying ascending/descending column sort with Collections.sort, and multi-page table loops.",
    keywords: "web table, pagination, sorting verification, tbody, tr, td",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S4. Web Actions, Multiple Elements, Tables & Contexts",
    order: 4,
    title: "4.4 Context Switching: Windows/Tabs, Nested Iframes, Alerts & Shadow DOM",
    file: "",
    summary: "getWindowHandles(), switchTo().window(), frame() / parentFrame() / defaultContent(), Alert accept/dismiss, and getShadowRoot().",
    keywords: "getWindowHandles, switchTo, window, iframe, parentFrame, defaultContent, Alert, Shadow DOM, getShadowRoot",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S5. Selenium Exceptions, Failure Analysis & IDE Debugging",
    order: 1,
    title: "5.1 All 24 Selenium Exceptions: Root Cause & Exact Fix Matrix",
    file: "",
    summary: "NoSuchElement, Timeout, StaleElementReference, ElementClickIntercepted, ElementNotInteractable, InvalidSelector, SessionNotCreated & more.",
    keywords: "WebDriverException, NoSuchElementException, ElementClickInterceptedException, ElementNotInteractableException, StaleElementReferenceException",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S5. Selenium Exceptions, Failure Analysis & IDE Debugging",
    order: 2,
    title: "5.2 Execution Failures, Diagnostic Info & IDE Debugging (Breakpoints & Stepping)",
    file: "",
    summary: "Capturing screenshots/logs/source on failure, Line vs Conditional vs Exception Breakpoints, and Step Over vs Step Into vs Step Out.",
    keywords: "debugging, breakpoints, conditional breakpoint, step over, step into, step out, evaluate expression, TakesScreenshot, stack trace",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S6. Enterprise Automation Framework & Clean Code",
    order: 1,
    title: "6.1 Hybrid Framework Architecture, POM & Page Factory (@FindBy)",
    file: "",
    summary: "Designing BaseTest, DriverFactory, Page Objects, PageFactory lazy proxies, AjaxElementLocatorFactory, and avoiding Code Bloat (DRY/KISS).",
    keywords: "framework design, Page Object Model, POM, PageFactory, @FindBy, AjaxElementLocatorFactory, code bloat",
    status: "planned"
  },
  {
    track: "Selenium",
    section: "S6. Enterprise Automation Framework & Clean Code",
    order: 2,
    title: "6.2 TestNG Parallel Execution, ThreadLocal<WebDriver> & ExtentReports",
    file: "",
    summary: "testng.xml parallel=methods, ThreadLocal isolation, ITestListener, ExtentReports, IRetryAnalyzer, and Maven CI/CD execution.",
    keywords: "TestNG, parallel execution, ThreadLocal, ITestListener, ExtentReports, IRetryAnalyzer, DataProvider",
    status: "planned"
  },

  // ==================== TRACK 4: TYPESCRIPT / JS (TS1 - TS3) ====================
  {
    track: "TypeScript",
    section: "TS1. JavaScript Core & Asynchronous Event Loop",
    order: 1,
    title: "1.1 JS Execution Context, Scope, Closures & Array Methods",
    file: "",
    summary: "var vs let vs const, hoisting, closures, destructuring, and map / filter / reduce / find.",
    keywords: "let, const, hoisting, closure, map, filter, reduce, destructuring, === vs ==",
    status: "planned"
  },
  {
    track: "TypeScript",
    section: "TS1. JavaScript Core & Asynchronous Event Loop",
    order: 2,
    title: "1.2 Event Loop, Promises & async / await in Automation",
    file: "",
    summary: "Call stack, microtask queue, Promise states (pending/fulfilled/rejected), Promise.all, and why missing await breaks Playwright tests.",
    keywords: "event loop, Promise, async, await, microtask, try catch",
    status: "planned"
  },
  {
    track: "TypeScript",
    section: "TS2. TypeScript Type System for Automation",
    order: 1,
    title: "2.1 Types, Interfaces, Union/Intersection, Generics & tsconfig",
    file: "",
    summary: "Static typing for Page Objects and test data, interface vs type, generics Promise<T>, utility types, and tsconfig.json.",
    keywords: "TypeScript, interface, type, union, generics, readonly, Partial, Record, tsconfig",
    status: "planned"
  },

  // ==================== TRACK 5: PLAYWRIGHT (P1 - P4) ====================
  {
    track: "Playwright",
    section: "P1. Architecture, BrowserContext & Auto-Waiting Locators",
    order: 1,
    title: "1.1 Playwright CDP/WebSocket Architecture vs Selenium W3C HTTP",
    file: "",
    summary: "Persistent bidirectional pipe vs HTTP requests, Browser vs BrowserContext (ms isolation) vs Page, and Locator recipe vs WebElement.",
    keywords: "Playwright architecture, WebSocket, BrowserContext, Page, Locator vs WebElement, strict mode",
    status: "planned"
  },
  {
    track: "Playwright",
    section: "P1. Architecture, BrowserContext & Auto-Waiting Locators",
    order: 2,
    title: "1.2 User-Facing Locators (getByRole), Chaining & Actionability Checks",
    file: "",
    summary: "getByRole, getByLabel, getByText, filter({ hasText, has }), and Playwright's automatic visibility/stability/enabled checks.",
    keywords: "getByRole, getByLabel, getByTestId, filter, chaining, auto-waiting, actionability",
    status: "planned"
  },
  {
    track: "Playwright",
    section: "P2. Assertions, Fixtures, Network Mocking & Trace Viewer",
    order: 1,
    title: "2.1 Web-First Assertions, Custom Fixtures (test.extend) & storageState",
    file: "",
    summary: "Auto-retrying expect(locator), POM with fixtures, and saving authentication state to bypass login UI.",
    keywords: "web-first assertions, expect, toBeVisible, fixtures, test.extend, storageState",
    status: "planned"
  },
  {
    track: "Playwright",
    section: "P2. Assertions, Fixtures, Network Mocking & Trace Viewer",
    order: 2,
    title: "2.2 API Testing, Network Interception (page.route) & Trace Viewer",
    file: "",
    summary: "Mocking/modifying API responses with page.route(), APIRequestContext, Trace Viewer time-travel debugging, and CI sharding.",
    keywords: "page.route, network mocking, waitForResponse, Trace Viewer, sharding, playwright.config.ts",
    status: "planned"
  },

  // ==================== TRACK 6: INTERVIEW Q&A (SERIES-WISE SYLLABUS QUESTION BANK) ====================
  {
    track: "Interview",
    section: "I-M1. Manual Testing: SDLC, STLC & Fundamentals Q&A",
    order: 1,
    title: "M1.1 Q&A: Verification vs Validation & Static vs Dynamic Testing (35 Questions)",
    file: "interview-m1-1-qa.html",
    summary: "35 questions across 5 tiers: Core Definitions, Why/Why Not, Tricky Real-World Scenarios, SDET/CI-CD & Rapid-Fire Traps.",
    keywords: "verification vs validation interview questions, static vs dynamic testing scenarios, walkthrough vs inspection, SAST vs DAST, QA vs QC",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M1. Manual Testing: SDLC, STLC & Fundamentals Q&A",
    order: 2,
    title: "M1.2 Q&A: SDLC Models — Waterfall, V-Model, Iterative, Spiral & Agile (35 Questions)",
    file: "interview-m1-2-qa.html",
    summary: "35 questions across 5 tiers: BRS/SRS/HLD/LLD, V-Model pairing, Hybrid Hardware+App scenario, In-Sprint vs N-1 Automation.",
    keywords: "SDLC interview questions, V-Model vs Waterfall, Spiral model, In-Sprint automation, N-1 automation, Water-Scrum-Fall",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M1. Manual Testing: SDLC, STLC & Fundamentals Q&A",
    order: 3,
    title: "M1.3 Q&A: STLC Phases, Entry/Exit Criteria, RTM & Test Closure (35 Questions)",
    file: "interview-m1-3-qa.html",
    summary: "35 questions across 5 tiers: All 6 STLC phases, Forward/Backward RTM, Smoke Gate pressure, Premature Closure & Blocked vs Failed.",
    keywords: "STLC interview questions, entry criteria vs exit criteria, RTM, forward backward traceability, test plan vs test strategy, test closure",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M1. Manual Testing: SDLC, STLC & Fundamentals Q&A",
    order: 4,
    title: "M1.4 Q&A: The 7 Testing Principles & Shift-Left Testing (35 Questions)",
    file: "interview-m1-4-qa.html",
    summary: "35 questions across 5 tiers: All 7 principles, Pesticide Paradox in Selenium, Defect Clustering 80/20, Shift-Left vs Shift-Right.",
    keywords: "7 testing principles interview questions, pesticide paradox, defect clustering, pairwise testing, shift left vs shift right",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M2. Manual Testing: Test Levels & Testing Types Q&A",
    order: 1,
    title: "M2.1 Q&A: Levels of Testing — Unit, Integration, System & UAT (35 Questions)",
    file: "interview-m2-1-qa.html",
    summary: "35 questions across 5 tiers: Unit vs Integration vs System vs UAT, Stub vs Driver, Top-Down vs Bottom-Up, Alpha vs Beta & Test Pyramid.",
    keywords: "levels of testing interview questions, stub vs driver, top down vs bottom up integration, alpha vs beta testing, test automation pyramid",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M2. Manual Testing: Test Levels & Testing Types Q&A",
    order: 2,
    title: "M2.2 Q&A: Functional Testing — Smoke vs Sanity & Regression vs Retesting (35 Questions)",
    file: "interview-m2-2-qa.html",
    summary: "35 questions across 5 tiers: Wide/Shallow vs Narrow/Deep, Retesting before Regression, Unit/Regional/Full Regression, Exploratory & Ad-Hoc.",
    keywords: "smoke vs sanity interview questions, regression vs retesting, confirmation testing, regional regression, impact analysis, exploratory testing",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M2. Manual Testing: Test Levels & Testing Types Q&A",
    order: 3,
    title: "M2.3 Q&A: Non-Functional Testing — Performance, Security, Usability & Compatibility (35 Questions)",
    file: "interview-m2-3-qa.html",
    summary: "35 questions across 5 tiers: Load vs Stress vs Spike vs Endurance vs Volume, p95/p99, 401 vs 403, IDOR, WCAG a11y, I18n vs L10n.",
    keywords: "non functional testing interview questions, load vs stress testing, spike vs soak endurance, volume testing, I18n vs L10n, accessibility axe-core",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M3. Manual Testing: Test Design Techniques & Artifacts Q&A",
    order: 1,
    title: "M3.1 Q&A: Equivalence Partitioning & Boundary Value Analysis (35 Questions)",
    file: "interview-m3-1-qa.html",
    summary: "35 questions: EP vs BVA, 2-Value vs 3-Value BVA, decimal precision boundaries, leading-zero OTP traps & DataProvider automation.",
    keywords: "EP BVA interview questions, boundary value analysis scenarios, equivalence partitioning examples",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M3. Manual Testing: Test Design Techniques & Artifacts Q&A",
    order: 2,
    title: "M3.2 Q&A: Decision Table, State Transition & White-Box Coverage (35 Questions)",
    file: "interview-m3-2-qa.html",
    summary: "35 questions: 2^n Decision Tables, Collapsed tables, State Diagrams vs Tables, Statement vs Branch coverage & Cyclomatic Complexity.",
    keywords: "decision table interview questions, state transition testing, statement vs branch coverage, cyclomatic complexity",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M3. Manual Testing: Test Design Techniques & Artifacts Q&A",
    order: 3,
    title: "M3.3 Q&A: Test Strategy vs Test Plan, Scenario vs Test Case & RTM (35 Questions)",
    file: "interview-m3-3-qa.html",
    summary: "35 questions: IEEE 829 Test Plan, Strategy vs Plan, Scenario vs Test Case, Forward/Backward RTM, Blocked vs Failed & Xray/Allure.",
    keywords: "test strategy vs test plan, test scenario vs test case, RTM interview questions, suspension criteria",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M4. Manual Testing: Defect Management & Bug Lifecycle Q&A",
    order: 1,
    title: "M4.1 Q&A: Complete Bug Life Cycle & Defect States (35 Questions)",
    file: "interview-m4-1-qa.html",
    summary: "35 questions: All defect states, Deferred vs Rejected vs Duplicate, Cannot Reproduce handling & Screenshot/HAR evidence.",
    keywords: "bug life cycle interview questions, defect states, deferred vs rejected, cannot reproduce",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M4. Manual Testing: Defect Management & Bug Lifecycle Q&A",
    order: 2,
    title: "M4.2 Q&A: Severity vs Priority Matrix & Triage (35 Questions)",
    file: "interview-m4-2-qa.html",
    summary: "35 questions: High Sev/Low Pri & Low Sev/High Pri examples, bug triage conflicts & Allure @Severity tags.",
    keywords: "severity vs priority interview questions, high severity low priority examples, bug triage",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M4. Manual Testing: Defect Management & Bug Lifecycle Q&A",
    order: 3,
    title: "M4.3 Q&A: Defect Leakage, DRE, Density & Root Cause Analysis (35 Questions)",
    file: "interview-m4-3-qa.html",
    summary: "35 questions: DRE & Defect Leakage formulas, Defect Density, Blameless 5-Whys & Fishbone RCA.",
    keywords: "defect leakage formula, DRE interview questions, root cause analysis 5 whys",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M5. Manual Testing: Agile, Scrum & Jira Metrics Q&A",
    order: 1,
    title: "M5.1 Q&A: Agile & Scrum Roles, Ceremonies & Artifacts (35 Questions)",
    file: "interview-m5-1-qa.html",
    summary: "35 questions: PO vs SM, Daily Standup, Review vs Retro, In-Sprint vs N-1 Automation & Water-Scrum-Fall.",
    keywords: "agile scrum interview questions, product owner vs scrum master, review vs retro, in-sprint automation",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-M5. Manual Testing: Agile, Scrum & Jira Metrics Q&A",
    order: 2,
    title: "M5.2 Q&A: User Stories (INVEST), DoR vs DoD, Velocity & Kanban (35 Questions)",
    file: "interview-m5-2-qa.html",
    summary: "35 questions: INVEST, Given-When-Then, DoR vs DoD, Story Points Fibonacci, Velocity, Lead vs Cycle Time & Kanban WIP.",
    keywords: "INVEST user story, DoR vs DoD, story points vs hours, velocity, kanban vs scrum",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-S1. Selenium: Architecture, Setup & Protocol Q&A",
    order: 1,
    title: "S1.1 Q&A: Selenium 4 W3C Architecture, Protocol & Driver Setup (35 Questions)",
    file: "interview-s1-1-qa.html",
    summary: "35 questions across 5 tiers: W3C vs JSON Wire, driver hierarchy, ThreadLocal DriverFactory, Selenium Manager vs proxy, and port/session exceptions.",
    keywords: "Selenium interview questions, W3C WebDriver, JSON Wire Protocol, ThreadLocal WebDriver, Selenium Manager, driver.close vs driver.quit, SearchContext",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-S1. Selenium: Architecture, Setup & Protocol Q&A",
    order: 2,
    title: "S1.2 Q&A: Selenium Manager vs WebDriverManager vs System.setProperty (35 Questions)",
    file: "interview-s1-2-qa.html",
    summary: "35 questions: Rust binary mechanics, ~/.cache/selenium, CfT JSON APIs, SE_PROXY firewalls, air-gapped Docker, and port/session traps.",
    keywords: "Selenium Manager interview questions, WebDriverManager vs Selenium Manager, System.setProperty, SE_PROXY, Chrome for Testing, ThreadLocal WebDriver",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I-S1. Selenium: Architecture, Setup & Protocol Q&A",
    order: 3,
    title: "S1.3 Q&A: ChromeOptions, PageLoadStrategy & close() vs quit() (35 Questions)",
    file: "interview-s1-3-qa.html",
    summary: "35 questions: Class hierarchy, CLI switches, experimental prefs, PageLoadStrategy NORMAL vs EAGER vs NONE, Docker flags, and close() vs quit() leaks.",
    keywords: "ChromeOptions interview questions, close vs quit, PageLoadStrategy, headless new, no sandbox, disable dev shm usage, NoSuchWindowException",
    status: "done",
    date: "2026-11-13"
  },
  {
    track: "Interview",
    section: "I1. Rapid Recall Cheat Sheets (Why / Why Not)",
    order: 1,
    title: "1.1 Java & OOP Rapid Recall Sheet (Why / Why Not)",
    file: "",
    summary: "One-page high-speed recall table for Modifiers, Constructors, Keywords, OOP Pillars, Collections, Strings & Exceptions.",
    keywords: "Java interview questions, why and why not, quick recall, one page cheat sheet",
    status: "planned"
  },
  {
    track: "Interview",
    section: "I1. Rapid Recall Cheat Sheets (Why / Why Not)",
    order: 2,
    title: "1.2 Selenium, Playwright & Manual Testing Rapid Recall Sheet",
    file: "",
    summary: "One-page high-speed recall for Locators, Waits, Stale Elements, Parallel ThreadLocal, Selenium vs Playwright & Agile Scrum.",
    keywords: "Selenium interview questions, Playwright vs Selenium, Agile interview questions, cheat sheet",
    status: "planned"
  },
  {
    track: "Interview",
    section: "I2. 6+ Years Senior Architecture & Coding Drills",
    order: 1,
    title: "2.1 6+ Years Senior SDET Framework & Flaky-Test Scenarios",
    file: "",
    summary: "Enterprise framework whiteboard answers, diagnosing CI flakiness, custom ExpectedConditions, and parallel execution traps.",
    keywords: "6 years experience, framework architecture, flaky tests, senior SDET interview",
    status: "planned"
  },
  {
    track: "Interview",
    section: "I2. 6+ Years Senior Architecture & Coding Drills",
    order: 2,
    title: "2.2 Top 20 Java & TypeScript Coding Programs for SDET Interviews",
    file: "",
    summary: "String reversal, char frequency with HashMap, duplicate removal, anagrams, second highest number, and stream table challenges.",
    keywords: "SDET coding questions, reverse string, character count HashMap, duplicates, anagram, streams coding",
    status: "planned"
  }
];
