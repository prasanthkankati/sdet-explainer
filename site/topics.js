// Single Source of Truth for SDET Explainer
// Tracks: Manual | Java | Selenium | TypeScript | Playwright | Interview

const TRACKS = [
  { id: "All",        label: "All" },
  { id: "Manual",     label: "Manual" },
  { id: "Java",       label: "Java" },
  { id: "Selenium",   label: "Selenium" },
  { id: "TestNG",     label: "TestNG" },
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
    date: "2026-11-15"
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
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J1. JVM Architecture & Memory Internals",
    order: 3,
    title: "1.3 Stack vs Heap Memory & Pass-by-Value",
    file: "java-stack-vs-heap.html",
    summary: "Stack frames, local variable slots, object allocation on Heap, and how Java passes references by value.",
    keywords: "stack, heap, frame, reference, pass by value, StackOverflowError, OutOfMemoryError",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J1. JVM Architecture & Memory Internals",
    order: 4,
    title: "1.4 Metaspace, static Memory & Execution Engine (JIT + GC)",
    file: "java-metaspace-jit-gc.html",
    summary: "Where class metadata and static variables live, Interpreter vs JIT compiler, and Garbage Collection (Young/Old Gen).",
    keywords: "metaspace, static, interpreter, jit compiler, hot code, garbage collector, young generation, old generation, reachability",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 1,
    title: "2.1 Program Structure & main() Method Decoded",
    file: "java-program-structure-main.html",
    summary: "package, import, class, why main is public static void main(String[] args), and System.out.println internals.",
    keywords: "public static void main, String[] args, System.out.println, entry point, package, import",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 2,
    title: "2.2 Variables, Primitive vs Reference Types & Type Casting",
    file: "java-variables-primitives-casting.html",
    summary: "8 primitive types, default values, local vs instance vs static variables, widening vs narrowing casts.",
    keywords: "int, long, double, boolean, char, byte, short, float, primitive, reference, type casting, default values",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 3,
    title: "2.3 Wrapper Classes, Autoboxing & Integer Cache (-128 to 127)",
    file: "java-wrapper-autoboxing-cache.html",
    summary: "Why collections require Integer/Boolean objects, autoboxing/unboxing, parseInt vs valueOf, and the == cache trap.",
    keywords: "Integer, Double, Boolean, wrapper class, autoboxing, unboxing, Integer cache, valueOf, parseInt",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 4,
    title: "2.4 Operators, Control Flow & Loops",
    file: "java-operators-control-flow-loops.html",
    summary: "Short-circuit && vs &, ternary operator, if-else, switch expressions, for / enhanced-for / while, break & continue.",
    keywords: "operators, short circuit, ternary, switch, for loop, foreach, while, break, continue",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 5,
    title: "2.5 Arrays (1D & 2D Object[][])",
    file: "java-arrays-1d-2d-dataprovider.html",
    summary: "Fixed-size Heap arrays, indexing, ArrayIndexOutOfBoundsException, and 2D Object[][] arrays for TestNG @DataProvider.",
    keywords: "array, Object[][], DataProvider, ArrayIndexOutOfBoundsException, Arrays.sort, Arrays.asList",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J2. Core Java Fundamentals",
    order: 6,
    title: "2.6 Methods, Parameters, Return Types & Varargs",
    file: "java-methods-parameters-varargs.html",
    summary: "Method signatures, call stack execution, return values, static vs instance methods, and varargs (String...).",
    keywords: "method, signature, parameter, argument, return, void, varargs",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J3. Strings & Text Manipulation",
    order: 1,
    title: "3.1 String Immutability & String Constant Pool",
    file: "java-string-immutability-pool.html",
    summary: "Why String is immutable and final, literal vs new String(), intern(), hash caching, and security.",
    keywords: "String, immutable, String pool, literal, new String, intern, == vs equals",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J3. Strings & Text Manipulation",
    order: 2,
    title: "3.2 String vs StringBuilder vs StringBuffer",
    file: "java-string-stringbuilder-stringbuffer.html",
    summary: "Why + in a loop creates garbage objects, mutable StringBuilder for single-thread speed, synchronized StringBuffer.",
    keywords: "StringBuilder, StringBuffer, mutable, thread safe, append, reverse",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J3. Strings & Text Manipulation",
    order: 3,
    title: "3.3 Essential String Methods & Regex for SDETs",
    file: "java-string-methods-regex.html",
    summary: "trim, strip, split, substring, replace vs replaceAll (regex), contains, format, and extracting dynamic UI text.",
    keywords: "trim, split, substring, replaceAll, regex, contains, equalsIgnoreCase, getText",
    status: "done",
    date: "2026-11-15"
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
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 2,
    title: "4.2 Constructors: Default, Parameterized, Chaining & Singleton",
    file: "java-constructors-chaining-singleton.html",
    summary: "Constructor vs method, compiler default constructor rule, this() vs super() chaining, and private constructors.",
    keywords: "constructor, this(), super(), constructor overloading, private constructor, singleton, Page Object constructor",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 3,
    title: "4.3 Access Modifiers & Encapsulation",
    file: "java-access-modifiers-encapsulation.html",
    summary: "private < default < protected < public scope matrix, getter/setter validation, and hiding private By locators in POM.",
    keywords: "private, default, protected, public, access modifiers, encapsulation, getter, setter, Page Object",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 4,
    title: "4.4 Core Keywords: static, final, this, super & instanceof",
    file: "java-keywords-static-final-this-super.html",
    summary: "Why static WebDriver breaks parallel runs, final variable/method/class, final vs finally vs finalize, this vs super.",
    keywords: "static, final, finally, finalize, this, super, instanceof, ClassCastException",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 5,
    title: "4.5 Inheritance (IS-A) vs Composition (HAS-A)",
    file: "java-inheritance-vs-composition.html",
    summary: "extends keyword, BaseTest / BasePage inheritance, the Diamond Problem, and why Page Objects use Composition for driver.",
    keywords: "inheritance, extends, super, diamond problem, multiple inheritance, composition, IS-A, HAS-A, BaseTest",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 6,
    title: "4.6 Polymorphism: Overloading vs Overriding & Upcasting",
    file: "java-polymorphism-overloading-overriding.html",
    summary: "Compile-time overloading (switchTo().frame) vs runtime overriding, covariant return, and WebDriver driver = new ChromeDriver().",
    keywords: "polymorphism, overloading, overriding, compile time, runtime, dynamic binding, upcasting, downcasting, WebDriver",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J4. Object-Oriented Programming (OOP)",
    order: 7,
    title: "4.7 Abstraction: Abstract Class vs Interface",
    file: "java-abstraction-abstract-interface.html",
    summary: "Contract design, Java 8 default/static methods, Functional & Marker interfaces, and Selenium's WebDriver/TakesScreenshot interfaces.",
    keywords: "abstraction, abstract class, interface, implements, default method, functional interface, marker interface, TakesScreenshot, JavascriptExecutor",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 1,
    title: "5.1 Collections Hierarchy & Generics (Type Safety)",
    file: "java-collections-hierarchy-generics.html",
    summary: "Iterable -> Collection -> List/Set/Queue + Map, Collection vs Collections, Generics <T>, and Type Erasure.",
    keywords: "Collection, Collections, Iterable, Generics, type erasure, List<WebElement>",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 2,
    title: "5.2 List: ArrayList vs LinkedList",
    file: "java-list-arraylist-linkedlist.html",
    summary: "Dynamic array resizing (1.5x), O(1) index access vs doubly-linked nodes, and handling List<WebElement> from findElements().",
    keywords: "List, ArrayList, LinkedList, findElements, dynamic array, time complexity",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 3,
    title: "5.3 Set: HashSet vs LinkedHashSet vs TreeSet",
    file: "java-set-hashset-linkedhashset-treeset.html",
    summary: "How HashSet uses HashMap internally for uniqueness, insertion-ordered LinkedHashSet, sorted TreeSet, and getWindowHandles().",
    keywords: "Set, HashSet, LinkedHashSet, TreeSet, remove duplicates, getWindowHandles",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 4,
    title: "5.4 Map: HashMap Internal Working & equals/hashCode Contract",
    file: "java-map-hashmap-internals.html",
    summary: "Hashing, bucket index, load factor 0.75, collision chaining, Java 8 Red-Black Tree at 8 nodes, and ConcurrentHashMap.",
    keywords: "Map, HashMap, hashCode, equals, collision, load factor, red-black tree, Hashtable, ConcurrentHashMap, TreeMap",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 5,
    title: "5.5 Sorting (Comparable vs Comparator) & Fail-Fast Iterators",
    file: "java-sorting-comparable-comparator-iterators.html",
    summary: "Natural ordering (compareTo) vs custom Comparator, ConcurrentModificationException, and verifying UI table sorting.",
    keywords: "Comparable, Comparator, compareTo, compare, Collections.sort, Fail-Fast, Fail-Safe, ConcurrentModificationException",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J5. Collections, Generics & Java 8+ Streams",
    order: 6,
    title: "5.6 Java 8+ Lambdas, Functional Interfaces, Streams & Optional",
    file: "java-lambdas-streams-optional.html",
    summary: "Predicate, Function, Consumer, Supplier, Stream filter/map/collect on List<WebElement>, Method References, and Optional.",
    keywords: "lambda, Stream, filter, map, collect, Predicate, Function, Consumer, Supplier, Optional, method reference",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J6. Exceptions, File I/O & Multithreading",
    order: 1,
    title: "6.1 Exception Hierarchy: Checked vs Unchecked & Error",
    file: "java-exception-hierarchy.html",
    summary: "Throwable -> Error vs Exception -> RuntimeException, compiler enforcement, and why WebDriverException is unchecked.",
    keywords: "Throwable, Error, Exception, RuntimeException, checked, unchecked, WebDriverException",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J6. Exceptions, File I/O & Multithreading",
    order: 2,
    title: "6.2 try-catch-finally, throw vs throws & try-with-resources",
    file: "java-try-catch-finally-resources.html",
    summary: "Multi-catch order, when finally does/doesn't run, AutoCloseable resource cleanup, and custom framework exceptions.",
    keywords: "try, catch, finally, throw, throws, try-with-resources, AutoCloseable, custom exception",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J6. Exceptions, File I/O & Multithreading",
    order: 3,
    title: "6.3 File I/O: Properties, JSON & Apache POI (Excel)",
    file: "java-file-io-properties-json-poi.html",
    summary: "Reading config.properties, FileInputStream, Apache POI XSSFWorkbook for Excel data-driven testing, and JSON POJOs.",
    keywords: "Properties, FileInputStream, Apache POI, XSSFWorkbook, Excel, JSON, Jackson, data-driven",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Java",
    section: "J6. Exceptions, File I/O & Multithreading",
    order: 4,
    title: "6.4 Multithreading & ThreadLocal<WebDriver> for Parallel Tests",
    file: "java-multithreading-threadlocal.html",
    summary: "Threads, race conditions, synchronized, volatile, and how ThreadLocal isolates WebDriver & ExtentTest across parallel threads.",
    keywords: "Thread, Runnable, synchronized, volatile, ThreadLocal, get, set, remove, parallel execution, thread safety",
    status: "done",
    date: "2026-11-15"
  },

  // ==================== TRACK 3: SELENIUM (OFFICIAL SELENIUM.DEV CLONE) ====================
  // Section 1: Overview
  {
    track: "Selenium",
    section: "1. Overview",
    order: 1,
    title: "1.1 About Selenium & Components",
    file: "selenium-overview.html",
    summary: "What Selenium is, browser automation scope, and core suite components: WebDriver, Grid, IDE, and Selenium Manager.",
    keywords: "Selenium, WebDriver, Selenium Grid, Selenium IDE, Selenium Manager, browser automation, overview",
    status: "done",
    date: "2026-11-15"
  },

  // Section 2: WebDriver - Getting Started
  {
    track: "Selenium",
    section: "2. WebDriver: Getting Started",
    order: 1,
    title: "2.1 Install Selenium Library",
    file: "selenium-webdriver-install.html",
    summary: "Adding selenium-java dependency in Maven pom.xml and Gradle build.gradle, transitive dependencies, and automated driver resolution.",
    keywords: "install, Maven, Gradle, pom.xml, selenium-java, dependency, setup",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "2. WebDriver: Getting Started",
    order: 2,
    title: "2.2 Write Your First Selenium Script",
    file: "selenium-webdriver-first-script.html",
    summary: "The 8 fundamental script steps: start session, take action on browser, request info, establish wait, find element, take action on element, request element info, and end session.",
    keywords: "first script, 8 steps, ChromeDriver, get, getTitle, findElement, sendKeys, quit",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "2. WebDriver: Getting Started",
    order: 3,
    title: "2.3 Using a Test Runner (TestNG & JUnit 5)",
    file: "selenium-webdriver-test-runner.html",
    summary: "Structuring automation scripts inside test runner lifecycles: @BeforeMethod, @Test, and @AfterMethod hooks with driver.quit() guarantees.",
    keywords: "test runner, TestNG, JUnit 5, @BeforeMethod, @AfterMethod, @Test, assertions",
    status: "done",
    date: "2026-11-15"
  },

  // Section 3: WebDriver - Drivers & Sessions
  {
    track: "Selenium",
    section: "3. WebDriver: Drivers",
    order: 1,
    title: "3.1 Driver Sessions & Capabilities",
    file: "selenium-webdriver-drivers-sessions.html",
    summary: "Starting and terminating driver sessions, W3C capability negotiation, alwaysMatch vs firstMatch, and browser timeouts.",
    keywords: "driver sessions, capabilities, W3C, alwaysMatch, timeouts, session lifecycle",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "3. WebDriver: Drivers",
    order: 2,
    title: "3.2 Browser Options & Page Load Strategy",
    file: "selenium-webdriver-drivers-options.html",
    summary: "ChromeOptions, FirefoxOptions, EdgeOptions, command-line arguments (--headless=new, --window-size), user preferences, and PageLoadStrategy (normal, eager, none).",
    keywords: "ChromeOptions, FirefoxOptions, PageLoadStrategy, normal, eager, none, headless, prefs",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "3. WebDriver: Drivers",
    order: 3,
    title: "3.3 RemoteWebDriver & Service Classes",
    file: "selenium-webdriver-remote-driver.html",
    summary: "RemoteWebDriver instantiation with grid URL, DriverService custom port/log controls, and network timeouts.",
    keywords: "RemoteWebDriver, DriverService, ChromeDriverService, grid URL, port binding",
    status: "done",
    date: "2026-11-15"
  },

  // Section 4: WebDriver - Elements
  {
    track: "Selenium",
    section: "4. WebDriver: Elements",
    order: 1,
    title: "4.1 Locators (All 8 Traditional Strategies)",
    file: "selenium-webdriver-elements-locators.html",
    summary: "Finding elements by id, name, className, tagName, linkText, partialLinkText, cssSelector, and xpath.",
    keywords: "locators, By.id, By.name, By.className, By.tagName, By.linkText, By.cssSelector, By.xpath",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "4. WebDriver: Elements",
    order: 2,
    title: "4.2 Relative Locators",
    file: "selenium-webdriver-elements-relative.html",
    summary: "Spatial locator strategy using with(By) with above, below, toLeftOf, toRightOf, and near based on getBoundingClientRect().",
    keywords: "RelativeLocators, with, above, below, toLeftOf, toRightOf, near",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "4. WebDriver: Elements",
    order: 3,
    title: "4.3 Element Information & State",
    file: "selenium-webdriver-elements-info.html",
    summary: "Querying element state: isDisplayed(), isEnabled(), isSelected(), getText(), getAttribute(), getDomAttribute(), getDomProperty(), and getCssValue().",
    keywords: "isDisplayed, isEnabled, isSelected, getText, getAttribute, getDomAttribute, getDomProperty, getCssValue",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "4. WebDriver: Elements",
    order: 4,
    title: "4.4 Element Interactions",
    file: "selenium-webdriver-elements-interactions.html",
    summary: "Manipulating DOM elements: click(), sendKeys(), clear(), submit(), and handling file upload inputs.",
    keywords: "click, sendKeys, clear, submit, file upload, WebElement interactions",
    status: "done",
    date: "2026-11-15"
  },

  // Section 5: WebDriver - Browser Interactions
  {
    track: "Selenium",
    section: "5. WebDriver: Browser Interactions",
    order: 1,
    title: "5.1 Navigation & Windows Management",
    file: "selenium-webdriver-navigation-windows.html",
    summary: "driver.navigate() to, back, forward, refresh; window handles, switchTo().window(), newWindow(WindowType.TAB/WINDOW), and window sizing.",
    keywords: "navigate, back, forward, refresh, window handles, newWindow, WindowType, switchTo window",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "5. WebDriver: Browser Interactions",
    order: 2,
    title: "5.2 Frames, Alerts & Cookies",
    file: "selenium-webdriver-frames-alerts-cookies.html",
    summary: "switchTo().frame(), defaultContent(), parentFrame(); switchTo().alert() accept/dismiss/sendKeys/getText; and driver.manage().cookies API.",
    keywords: "frame, iframe, defaultContent, parentFrame, alert, accept, dismiss, cookies, addCookie, getCookie",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "5. WebDriver: Browser Interactions",
    order: 3,
    title: "5.3 Screenshots & Print to PDF",
    file: "selenium-webdriver-screenshots-pdf.html",
    summary: "TakesScreenshot interface, getScreenshotAs(OutputType.FILE/BYTES), element screenshots, and driver.print(PrintOptions) to PDF.",
    keywords: "TakesScreenshot, OutputType, FILE, element screenshot, print to PDF, PrintOptions",
    status: "done",
    date: "2026-11-15"
  },

  // Section 6: WebDriver - Waits
  {
    track: "Selenium",
    section: "6. WebDriver: Waits",
    order: 1,
    title: "6.1 Waiting Strategies Overview & Implicit Waits",
    file: "selenium-webdriver-waits-implicit.html",
    summary: "The synchronization problem, why Thread.sleep is an anti-pattern, implicitlyWait(Duration), and why mixing wait types causes timeouts.",
    keywords: "waits, implicitlyWait, Duration, synchronization, Thread.sleep, polling",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "6. WebDriver: Waits",
    order: 2,
    title: "6.2 Explicit Waits & ExpectedConditions",
    file: "selenium-webdriver-waits-explicit.html",
    summary: "WebDriverWait class, until() method, and ExpectedConditions: visibilityOf, elementToBeClickable, presenceOfElementLocated, and titleContains.",
    keywords: "WebDriverWait, ExpectedConditions, elementToBeClickable, visibilityOf, presenceOfElementLocated",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "6. WebDriver: Waits",
    order: 3,
    title: "6.3 FluentWait Configuration",
    file: "selenium-webdriver-waits-fluent.html",
    summary: "FluentWait class builder: withTimeout(), pollingEvery(), ignoring(NoSuchElementException.class), and custom lambda conditions.",
    keywords: "FluentWait, withTimeout, pollingEvery, ignoring, lambda, custom condition",
    status: "done",
    date: "2026-11-15"
  },

  // Section 7: WebDriver - Actions API
  {
    track: "Selenium",
    section: "7. WebDriver: Actions API",
    order: 1,
    title: "7.1 Mouse Actions",
    file: "selenium-webdriver-actions-mouse.html",
    summary: "Actions class pointer inputs: moveToElement (hover), contextClick (right click), doubleClick, dragAndDrop, and clickAndHold.",
    keywords: "Actions, moveToElement, contextClick, doubleClick, dragAndDrop, clickAndHold, perform",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "7. WebDriver: Actions API",
    order: 2,
    title: "7.2 Keyboard & Wheel Actions",
    file: "selenium-webdriver-actions-keyboard-wheel.html",
    summary: "KeyDown, keyUp, sendKeys with modifier keys (Keys.SHIFT, Keys.CONTROL), and scrollToElement or scrollByAmount wheel actions.",
    keywords: "Actions, keyboard, keyDown, keyUp, Keys.SHIFT, Keys.CONTROL, wheel, scrollToElement, scrollByAmount",
    status: "done",
    date: "2026-11-15"
  },

  // Section 8: WebDriver - BiDi
  {
    track: "Selenium",
    section: "8. WebDriver: Bidirectional (BiDi)",
    order: 1,
    title: "8.1 WebDriver BiDi Architecture & Setup",
    file: "selenium-webdriver-bidi-overview.html",
    summary: "What WebDriver BiDi is, W3C WebSocket standard vs CDP, webSocketUrl capability, and real-time event streaming.",
    keywords: "BiDi, Bidirectional, WebSocket, W3C, webSocketUrl, event streaming, CDP",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "8. WebDriver: Bidirectional (BiDi)",
    order: 2,
    title: "8.2 Log & Network Interception with BiDi",
    file: "selenium-webdriver-bidi-features.html",
    summary: "Listening to console logs and JavaScript errors, inspecting HTTP requests, and basic network authentication interception.",
    keywords: "BiDi, console logs, JavaScript errors, network interception, basic auth, Network listener",
    status: "done",
    date: "2026-11-15"
  },

  // Section 9: Selenium Manager
  {
    track: "Selenium",
    section: "9. Selenium Manager",
    order: 1,
    title: "9.1 Automated Driver & Browser Management",
    file: "selenium-manager-guide.html",
    summary: "The built-in Rust binary tool, automated driver resolution, browser matching, local cache directory (~/.cache/selenium), and proxy configurations.",
    keywords: "Selenium Manager, Rust binary, automated driver management, cache, proxy, Chrome for Testing",
    status: "done",
    date: "2026-11-15"
  },

  // Section 10: Selenium Grid
  {
    track: "Selenium",
    section: "10. Selenium Grid",
    order: 1,
    title: "10.1 Grid Execution Modes & Architecture",
    file: "selenium-grid-modes.html",
    summary: "Standalone mode, Hub and Node mode, Distributed mode, and connecting tests using RemoteWebDriver.",
    keywords: "Selenium Grid, Standalone, Hub, Node, Distributed, Router, Distributor, RemoteWebDriver",
    status: "done",
    date: "2026-11-15"
  },

  // Section 11: Test Practices
  {
    track: "Selenium",
    section: "11. Test Practices",
    order: 1,
    title: "11.1 Page Object Models & Domain-Specific Language",
    file: "selenium-test-practices-pom.html",
    summary: "Structuring maintainable test suites with Page Object Model (POM), PageFactory @FindBy annotations, and business-focused Domain-Specific Languages (DSL).",
    keywords: "Page Object Model, POM, PageFactory, @FindBy, Domain-Specific Language, DSL, test practices",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Selenium",
    section: "11. Test Practices",
    order: 2,
    title: "11.2 Guidelines, Worst Practices & Exceptions",
    file: "selenium-test-practices-guidelines.html",
    summary: "Atomic tests, API state seeding, official Selenium anti-patterns (CAPTCHAs, link spidering, load tests), and the WebDriverException hierarchy.",
    keywords: "guidelines, worst practices, WebDriverException, StaleElementReferenceException, NoSuchElementException, TimeoutException, ElementClickInterceptedException",
    status: "done",
    date: "2026-11-15"
  },

  // ==================== TRACK 4: TESTNG (T1 - T5) ====================
  {
    track: "TestNG",
    section: "T1. Architecture & Lifecycle",
    order: 1,
    title: "1.1 Overview, Test Runner & Full 10-Annotation Lifecycle",
    file: "testng-overview-lifecycle.html",
    summary: "TestNG architecture, testng.xml runner hierarchy, the 10 core annotations execution order, and ThreadLocal WebDriver safety.",
    keywords: "TestNG, suite, test, class, method, @BeforeSuite, @AfterSuite, @BeforeTest, @BeforeClass, @BeforeMethod, lifecycle, ThreadLocal",
    status: "done",
    date: "2026-11-21"
  },
  {
    track: "TestNG",
    section: "T1. Architecture & Lifecycle",
    order: 2,
    title: "1.2 testng.xml Suite Configuration & Package Scanning",
    file: "",
    summary: "XML suite file syntax, suite/test tags, parameter passing, include/exclude groups, packages, and verbose levels.",
    keywords: "testng.xml, suite, test, packages, classes, methods, include, exclude, verbose",
    status: "planned",
    date: "2026-11-21"
  },
  {
    track: "TestNG",
    section: "T2. Assertions & Validation",
    order: 3,
    title: "2.1 Hard Assertions vs Soft Assertions (SoftAssert)",
    file: "",
    summary: "Assert.assertEquals vs SoftAssert, assertAll(), execution termination semantics, and multi-field form validation.",
    keywords: "Assert, SoftAssert, assertAll, Hard Assert, assertions, AssertionError",
    status: "planned",
    date: "2026-11-21"
  },
  {
    track: "TestNG",
    section: "T2. Assertions & Validation",
    order: 4,
    title: "2.2 Priority, dependsOnMethods & enabled Attribute",
    file: "",
    summary: "Test ordering with priority, conditional execution with dependsOnMethods and dependsOnGroups, and disabling tests with enabled=false.",
    keywords: "priority, dependsOnMethods, dependsOnGroups, enabled, ignoreMissingDependencies",
    status: "planned",
    date: "2026-11-21"
  },
  {
    track: "TestNG",
    section: "T3. Data-Driven Testing",
    order: 5,
    title: "3.1 @DataProvider & Multi-Dimensional Object Arrays",
    file: "",
    summary: "Parameterized execution via @DataProvider, Object[][], Method reflection routing, and parallel data streaming.",
    keywords: "@DataProvider, Object[][], Iterator, Method, parallel, indices, name",
    status: "planned",
    date: "2026-11-21"
  },
  {
    track: "TestNG",
    section: "T3. Data-Driven Testing",
    order: 6,
    title: "3.2 @Parameters & XML Suite Injection",
    file: "",
    summary: "Injecting browser types, URLs, and environments via @Parameters and <parameter> tags in testng.xml with @Optional fallbacks.",
    keywords: "@Parameters, parameter, @Optional, cross browser, testng.xml parameter injection",
    status: "planned",
    date: "2026-11-21"
  },
  {
    track: "TestNG",
    section: "T4. Parallel Execution & Concurrency",
    order: 7,
    title: "4.1 Parallel Execution: methods, tests & classes",
    file: "",
    summary: "Multi-threaded test execution in testng.xml, thread-count, data-provider-thread-count, and thread safety with ThreadLocal.",
    keywords: "parallel, thread-count, methods, tests, classes, thread safety, race conditions, ThreadLocal",
    status: "planned",
    date: "2026-11-21"
  },
  {
    track: "TestNG",
    section: "T4. Parallel Execution & Concurrency",
    order: 8,
    title: "4.2 Test Groups & Regression / Smoke Filtering",
    file: "",
    summary: "Categorizing tests with groups, meta-groups, regular expression group matching, and command-line execution via Maven Surefire.",
    keywords: "groups, smoke, regression, run, include, exclude, surefire, meta-groups",
    status: "planned",
    date: "2026-11-21"
  },
  {
    track: "TestNG",
    section: "T5. Listeners, Retry & Reporting",
    order: 9,
    title: "5.1 Listeners Architecture (ITestListener & ISuiteListener)",
    file: "",
    summary: "Interception with ITestListener, ISuiteListener, IInvokedMethodListener, screenshot on failure, and HTML report hooks.",
    keywords: "ITestListener, ISuiteListener, IInvokedMethodListener, onTestFailure, screenshot, ExtentReports, Allure",
    status: "planned",
    date: "2026-11-21"
  },
  {
    track: "TestNG",
    section: "T5. Listeners, Retry & Reporting",
    order: 10,
    title: "5.2 IRetryAnalyzer & Automatic Flaky Test Retries",
    file: "",
    summary: "Implementing IRetryAnalyzer, max retry count limits, IAnnotationTransformer dynamic injection, and handling test flakiness in CI/CD.",
    keywords: "IRetryAnalyzer, retry, IAnnotationTransformer, flaky tests, maxRetryCount, CI/CD",
    status: "planned",
    date: "2026-11-21"
  },

  // ==================== TRACK 5: TYPESCRIPT / JS (TS1 - TS3) ====================
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
    section: "I-J1. Java: JVM Architecture & Memory Internals Q&A",
    order: 1,
    title: "J1.1 Q&A: JDK vs JRE vs JVM & Bytecode Portability (22 Questions)",
    file: "interview-j1-1-qa.html",
    summary: "22 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J1.1 interview questions, jdk vs jre vs jvm & bytecode portability",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J1. Java: JVM Architecture & Memory Internals Q&A",
    order: 2,
    title: "J1.2 Q&A: JVM Architecture & Class Loader Subsystem (21 Questions)",
    file: "interview-j1-2-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J1.2 interview questions, jvm architecture & class loader subsystem",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J1. Java: JVM Architecture & Memory Internals Q&A",
    order: 3,
    title: "J1.3 Q&A: Stack vs Heap Memory & Pass-by-Value (21 Questions)",
    file: "interview-j1-3-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J1.3 interview questions, stack vs heap memory & pass-by-value",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J1. Java: JVM Architecture & Memory Internals Q&A",
    order: 4,
    title: "J1.4 Q&A: Metaspace, static Memory & Execution Engine (JIT + GC) (21 Questions)",
    file: "interview-j1-4-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J1.4 interview questions, metaspace, static memory & execution engine (jit + gc)",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J2. Java: Core Java Fundamentals Q&A",
    order: 1,
    title: "J2.1 Q&A: Program Structure & main() Method Decoded (21 Questions)",
    file: "interview-j2-1-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J2.1 interview questions, program structure & main() method decoded",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J2. Java: Core Java Fundamentals Q&A",
    order: 2,
    title: "J2.2 Q&A: Variables, Primitive vs Reference Types & Type Casting (35 Questions)",
    file: "interview-j2-2-qa.html",
    summary: "35 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J2.2 interview questions, variables, primitive vs reference types & type casting",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J2. Java: Core Java Fundamentals Q&A",
    order: 3,
    title: "J2.3 Q&A: Wrapper Classes, Autoboxing & Integer Cache (-128 to 127) (35 Questions)",
    file: "interview-j2-3-qa.html",
    summary: "35 questions across 5 tiers: Core definitions, bytecodes, IntegerCache mechanics, REST API POJO nullability, parsing traps & senior evaluation rubric.",
    keywords: "java J2.3 interview questions, wrapper classes, autoboxing & integer cache (-128 to 127)",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J2. Java: Core Java Fundamentals Q&A",
    order: 4,
    title: "J2.4 Q&A: Operators, Control Flow & Loops (35 Questions)",
    file: "interview-j2-4-qa.html",
    summary: "35 questions across 5 tiers: ALU branching, short-circuit bytecode, arrow switch expressions, pagination while loops, labeled breaks & senior evaluation rubrics.",
    keywords: "java J2.4 interview questions, operators, control flow & loops",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J2. Java: Core Java Fundamentals Q&A",
    order: 5,
    title: "J2.5 Q&A: Arrays (1D & 2D Object[][]), Methods & TestNG DataProviders (35 Questions)",
    file: "interview-j2-5-qa.html",
    summary: "35 questions across 5 tiers: Memory contiguity, O(1) address math, Arrays method reference, 2D jagged matrices & TestNG DataProvider rubrics.",
    keywords: "java J2.5 interview questions, arrays (1d & 2d object[][])",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J2. Java: Core Java Fundamentals Q&A",
    order: 6,
    title: "J2.6 Q&A: Methods, Parameters, Return Types & Varargs (21 Questions)",
    file: "interview-j2-6-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J2.6 interview questions, methods, parameters, return types & varargs",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J3. Java: Strings & Text Manipulation Q&A",
    order: 1,
    title: "J3.1 Q&A: String Immutability & String Constant Pool (21 Questions)",
    file: "interview-j3-1-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J3.1 interview questions, string immutability & string constant pool",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J3. Java: Strings & Text Manipulation Q&A",
    order: 2,
    title: "J3.2 Q&A: String vs StringBuilder vs StringBuffer (21 Questions)",
    file: "interview-j3-2-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J3.2 interview questions, string vs stringbuilder vs stringbuffer",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J3. Java: Strings & Text Manipulation Q&A",
    order: 3,
    title: "J3.3 Q&A: Essential String Methods & Regex for SDETs (21 Questions)",
    file: "interview-j3-3-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J3.3 interview questions, essential string methods & regex for sdets",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J4. Java: Object-Oriented Programming (OOP) Q&A",
    order: 1,
    title: "J4.1 Q&A: Class & Object (Selenium + Interview Edition) (21 Questions)",
    file: "interview-j4-1-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J4.1 interview questions, class & object (selenium + interview edition)",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J4. Java: Object-Oriented Programming (OOP) Q&A",
    order: 2,
    title: "J4.2 Q&A: Constructors: Default, Parameterized, Chaining & Singleton (21 Questions)",
    file: "interview-j4-2-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J4.2 interview questions, constructors: default, parameterized, chaining & singleton",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J4. Java: Object-Oriented Programming (OOP) Q&A",
    order: 3,
    title: "J4.3 Q&A: Access Modifiers & Encapsulation (21 Questions)",
    file: "interview-j4-3-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J4.3 interview questions, access modifiers & encapsulation",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J4. Java: Object-Oriented Programming (OOP) Q&A",
    order: 4,
    title: "J4.4 Q&A: Core Keywords: static, final, this, super & instanceof (21 Questions)",
    file: "interview-j4-4-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J4.4 interview questions, core keywords: static, final, this, super & instanceof",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J4. Java: Object-Oriented Programming (OOP) Q&A",
    order: 5,
    title: "J4.5 Q&A: Inheritance (IS-A) vs Composition (HAS-A) (21 Questions)",
    file: "interview-j4-5-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J4.5 interview questions, inheritance (is-a) vs composition (has-a)",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J4. Java: Object-Oriented Programming (OOP) Q&A",
    order: 6,
    title: "J4.6 Q&A: Polymorphism: Overloading vs Overriding & Upcasting (21 Questions)",
    file: "interview-j4-6-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J4.6 interview questions, polymorphism: overloading vs overriding & upcasting",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J4. Java: Object-Oriented Programming (OOP) Q&A",
    order: 7,
    title: "J4.7 Q&A: Abstraction: Abstract Class vs Interface (21 Questions)",
    file: "interview-j4-7-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J4.7 interview questions, abstraction: abstract class vs interface",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J5. Java: Collections, Generics & Java 8+ Streams Q&A",
    order: 1,
    title: "J5.1 Q&A: Collections Hierarchy & Generics (Type Safety) (21 Questions)",
    file: "interview-j5-1-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J5.1 interview questions, collections hierarchy & generics (type safety)",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J5. Java: Collections, Generics & Java 8+ Streams Q&A",
    order: 2,
    title: "J5.2 Q&A: List: ArrayList vs LinkedList (21 Questions)",
    file: "interview-j5-2-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J5.2 interview questions, list: arraylist vs linkedlist",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J5. Java: Collections, Generics & Java 8+ Streams Q&A",
    order: 3,
    title: "J5.3 Q&A: Set: HashSet vs LinkedHashSet vs TreeSet (21 Questions)",
    file: "interview-j5-3-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J5.3 interview questions, set: hashset vs linkedhashset vs treeset",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J5. Java: Collections, Generics & Java 8+ Streams Q&A",
    order: 4,
    title: "J5.4 Q&A: Map: HashMap Internal Working & equals/hashCode Contract (21 Questions)",
    file: "interview-j5-4-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J5.4 interview questions, map: hashmap internal working & equals/hashcode contract",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J5. Java: Collections, Generics & Java 8+ Streams Q&A",
    order: 5,
    title: "J5.5 Q&A: Sorting (Comparable vs Comparator) & Fail-Fast Iterators (21 Questions)",
    file: "interview-j5-5-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J5.5 interview questions, sorting (comparable vs comparator) & fail-fast iterators",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J5. Java: Collections, Generics & Java 8+ Streams Q&A",
    order: 6,
    title: "J5.6 Q&A: Java 8+ Lambdas, Functional Interfaces, Streams & Optional (21 Questions)",
    file: "interview-j5-6-qa.html",
    summary: "21 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J5.6 interview questions, java 8+ lambdas, functional interfaces, streams & optional",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J6. Java: Exceptions, File I/O & Multithreading Q&A",
    order: 1,
    title: "J6.1 Q&A: Exception Hierarchy (Checked vs Unchecked vs Error) (19 Questions)",
    file: "interview-j6-1-qa.html",
    summary: "19 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J6.1 interview questions, exception hierarchy (checked vs unchecked vs error)",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J6. Java: Exceptions, File I/O & Multithreading Q&A",
    order: 2,
    title: "J6.2 Q&A: try-catch-finally, try-with-resources, throw/throws & Custom Exceptions (19 Questions)",
    file: "interview-j6-2-qa.html",
    summary: "19 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J6.2 interview questions, try-catch-finally, try-with-resources, throw/throws & custom exceptions",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J6. Java: Exceptions, File I/O & Multithreading Q&A",
    order: 3,
    title: "J6.3 Q&A: File I/O: Properties, JSON (Jackson) & Excel (Apache POI) (19 Questions)",
    file: "interview-j6-3-qa.html",
    summary: "19 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J6.3 interview questions, file i/o: properties, json (jackson) & excel (apache poi)",
    status: "done",
    date: "2026-11-15"
  },
  {
    track: "Interview",
    section: "I-J6. Java: Exceptions, File I/O & Multithreading Q&A",
    order: 4,
    title: "J6.4 Q&A: Multithreading, synchronized & ThreadLocal WebDriver for Parallel TestNG (19 Questions)",
    file: "interview-j6-4-qa.html",
    summary: "19 interview questions across 5 tiers: Basics, How it works, Real situations, Troubleshooting & Design choices.",
    keywords: "java J6.4 interview questions, multithreading, synchronized & threadlocal webdriver for parallel testng",
    status: "done",
    date: "2026-11-15"
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
