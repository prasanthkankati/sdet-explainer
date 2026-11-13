// Centralized Inline Glossary Dictionary for SDET Explainer
// Hovering or clicking any highlighted term opens an instant in-page card with Definition, Properties & Example.
const GLOSSARY = {
  "build": {
    title: "Software Build",
    aliases: ["Software Build", "QA Build", "Deployable Build"],
    def: "A compiled, packaged, and version-tagged executable bundle of source code deployed to an environment for testing or release.",
    props: [
      "Build ID / Version Tag: Unique identifier (e.g., v2.4.1-b108 or Git SHA 9f3a2c)",
      "Artifact Format: Compiled binary (.jar, .war, Docker image, or static JS bundle)",
      "Target Environment: Local, Dev, QA, Staging, or Production",
      "Build Status: Healthy (passes Smoke Test) vs Broken Build (rejected by QA)"
    ],
    example: "Jenkins compiles Java code via 'mvn clean package' to produce 'payment-service-1.2.0.jar' and deploys it to https://qa.app.internal."
  },
  "broken-build": {
    title: "Broken Build",
    aliases: ["Broken Build", "broken builds", "broken build"],
    def: "A software build that fails compilation, fails deployment/startup, or fails core Smoke Tests, making full QA execution impossible.",
    props: [
      "1. Compilation / Packaging Failure: Code does not compile or Maven dependencies fail",
      "2. Startup / Env Crash: Server throws 500/502 error, DB migration fails, or blank UI screen",
      "3. Core Flow Blocker: Login, Home page, or primary API fails immediately",
      "4. QA Protocol: Immediately reject the build at STLC Phase 4 (Smoke Gate) and return to Dev"
    ],
    example: "Dev deploys build #142 to QA, but clicking 'Login' returns HTTP 500 NullPointerException. QA marks Build #142 as a Broken Build and halts Phase 5 execution."
  },
  "rtm": {
    title: "RTM (Requirement Traceability Matrix)",
    aliases: ["Requirement Traceability Matrix", "Traceability Matrix", "traceability matrix", "RTM"],
    def: "A formal mapping table that links every business/system Requirement ID to its corresponding Test Case IDs, execution status, and logged Defect IDs to prove 100% test coverage.",
    props: [
      "Column 1 — Req ID & Description: e.g., REQ-101 (User login with valid OTP)",
      "Column 2 — Design / Story Ref: Jira Story ID or SRS section number",
      "Column 3 — Test Case IDs: TC_01, TC_02, TC_03 mapped to that requirement",
      "Column 4 — Execution Status & Automation Script: PASS / FAIL / BLOCKED + TestNG method name",
      "Column 5 — Defect ID: Linked Jira bug (e.g., BUG-409) if any mapped test failed",
      "3 Types: Forward (Req -> Test), Backward (Test -> Req), Bi-Directional (Both ways)"
    ],
    example: "REQ-105 ('Apply SAVE20 coupon') -> Mapped to TC_201, TC_202 -> Automated in CheckoutTest#verifyCoupon -> Status: PASS."
  },
  "sign-off": {
    title: "Release Sign-Off Criteria",
    aliases: ["Release Sign-Off", "sign-off criteria", "QA Release Sign-Off", "QA Sign-Off"],
    def: "The formal, measurable quality approval issued by QA at STLC Phase 6 confirming the software build meets all Exit Criteria and is safe to deploy to Production.",
    props: [
      "1. Requirement Coverage: 100% of in-scope requirements mapped and tested in RTM",
      "2. Test Execution Rate: 100% of planned manual & automated test cases executed",
      "3. Pass Rate Threshold: Typically >= 95% pass rate (remaining 5% non-blocking/waived)",
      "4. Zero Critical/Blocker Bugs: 0 Open Severity-1 (Blocker) or Severity-2 (Critical) defects",
      "5. Formal Deliverable: Signed Test Summary Report + Go/No-Go email or Jira approval"
    ],
    example: "QA Lead sends Release Sign-Off for v3.1 after 240/240 tests execute with 0 Critical/High bugs and 2 cosmetic Low bugs waived by Product."
  },
  "entry-criteria": {
    title: "Entry Criteria",
    aliases: ["Entry Criteria", "entry criteria"],
    def: "The mandatory prerequisite conditions, documents, and environment states that MUST be satisfied before a specific STLC phase is allowed to start.",
    props: [
      "Purpose: Prevents starting a phase prematurely on incomplete specs or broken builds",
      "Phase 1 Entry: Signed-off BRS/SRS or refined Jira User Stories available",
      "Phase 3 Entry: Approved Test Plan + frozen UI wireframes/API contracts",
      "Phase 5 Entry: QA Environment live + Smoke Test 100% PASSED + Approved Test Cases"
    ],
    example: "QA refuses to start Phase 5 (Test Execution) because the Entry Criterion 'Smoke Test = PASSED' failed when the staging database was unreachable."
  },
  "exit-criteria": {
    title: "Exit Criteria",
    aliases: ["Exit Criteria", "exit criteria"],
    def: "The mandatory quality conditions, deliverables, and sign-offs that MUST be completed before an STLC phase can be declared finished.",
    props: [
      "Purpose: Ensures no phase is closed with unfinished test cases or unverified critical bugs",
      "Chaining Rule: The Exit Criteria of Phase N become the Entry Criteria of Phase N+1",
      "Phase 4 Exit: QA Environment operational AND Smoke Test Report = 100% Passed",
      "Phase 5 Exit: 100% tests executed, all Blocker/Critical defects fixed & retested"
    ],
    example: "Phase 3 (Test Case Development) cannot exit until 100% of written test cases pass peer review and are mapped in the RTM."
  },
  "smoke-test": {
    title: "Smoke Testing (Build Verification Test)",
    aliases: ["Smoke Testing", "Smoke Test", "Smoke Gate", "Build Verification Test"],
    def: "A shallow, wide health-check suite executed immediately when a new build is deployed to verify core critical workflows work before starting deep QA testing.",
    props: [
      "When Executed: STLC Phase 4 (Environment Setup gate) & CI/CD PR/deployment gate",
      "Scope: End-to-end happy paths only (App launches, DB connects, Login, Core page loads)",
      "Duration & Size: Typically 10–25 fast automated tests running in < 5 minutes",
      "Outcome: PASS = Accept build into Phase 5; FAIL = Reject as Broken Build immediately"
    ],
    example: "Running 'mvn test -Dgroups=smoke' (15 Selenium + API tests) as soon as Jenkins deploys Build #88 to QA."
  },
  "brs": {
    title: "BRS (Business Requirement Specification)",
    aliases: ["Business Requirement Specification", "BRS"],
    def: "A high-level document written by the Business Analyst capturing WHAT the business/client wants to achieve and WHY, from a business & customer perspective.",
    props: [
      "Author: Business Analyst (BA) / Product Owner / Client Stakeholders",
      "Audience: Business leadership, Product Managers, Architects",
      "Content: Business goals, scope, target users, compliance rules, revenue workflows",
      "V-Model Mapping: Pairs directly with User Acceptance Testing (UAT)"
    ],
    example: "BRS states: 'Customers in the EU must be able to complete checkout using Apple Pay and SEPA Instant Transfer.'"
  },
  "srs": {
    title: "SRS (System Requirement Specification)",
    aliases: ["System Requirement Specification", "SRS"],
    def: "A detailed functional and non-functional specification translating business needs (BRS) into exact system behavior, inputs, validations, outputs, and error messages.",
    props: [
      "Author: System Analyst / Business Analyst + Technical Lead",
      "Audience: Developers, Manual QA, SDETs, Architects",
      "Content: Exact field validations, API rules, error codes, performance SLAs",
      "V-Model Mapping: Pairs directly with System Testing (End-to-End QA)"
    ],
    example: "SRS Section 4.2 specifies: 'Password field must accept 8–20 chars, require 1 uppercase & 1 digit, and return HTTP 400 ERR_WEAK_PWD if invalid.'"
  },
  "hld": {
    title: "HLD (High-Level Design)",
    aliases: ["High-Level Design", "HLD"],
    def: "The macro-level architectural blueprint showing how the entire system is divided into services, databases, queues, and external integrations.",
    props: [
      "Author: Solution / System Architect",
      "Content: Microservice topology, cloud infra (AWS/K8s), DB choices, service-to-service communication",
      "V-Model Mapping: Pairs directly with Integration Testing (API & Service interaction)"
    ],
    example: "HLD diagram showing API Gateway -> Auth Service -> Order Service -> Kafka Queue -> PostgreSQL Database."
  },
  "lld": {
    title: "LLD (Low-Level Design)",
    aliases: ["Low-Level Design", "LLD"],
    def: "The micro-level component blueprint detailing exact Java classes, method signatures, algorithms, database table columns/indexes, and Swagger JSON schemas.",
    props: [
      "Author: Senior Developers / Tech Lead",
      "Content: Class diagrams, method parameters/return types, SQL DDL schemas, exact API payloads",
      "V-Model Mapping: Pairs directly with Unit Testing (JUnit / TestNG class-level tests)"
    ],
    example: "LLD specifies class 'TaxCalculator' with method 'BigDecimal calculateGst(BigDecimal amount, String stateCode)'."
  },
  "defect": {
    title: "Error vs Defect (Bug) vs Failure",
    aliases: ["Error vs Defect", "Defect", "Runtime Bug"],
    def: "The 3-stage causal chain of software flaws: a human Error in thought/typing creates a Defect (Bug) in the code/doc, which causes a Failure when the code executes.",
    props: [
      "1. Error (Mistake): Human mistake made by BA or Developer (e.g., misunderstanding tax formula)",
      "2. Defect (Bug / Fault): Flaw written inside the artifact/code (e.g., writing '+' instead of '-')",
      "3. Failure: Observable incorrect output when the program runs (e.g., Cart charges $120 instead of $80)",
      "Key Rule: Static Testing finds Defects directly; Dynamic Testing observes Failures to locate Defects"
    ],
    example: "Developer makes an Error -> writes 'price + discount' (Defect in Cart.java) -> Selenium test sees $120 on checkout screen (Failure)."
  },
  "dre": {
    title: "DRE (Defect Removal Efficiency)",
    aliases: ["Defect Removal Efficiency", "DRE"],
    def: "A core STLC Phase 6 quality metric measuring the percentage of total defects caught by QA before release versus defects that leaked to Production.",
    props: [
      "Formula: DRE = (Defects found by QA / (Defects found by QA + Defects found in Production)) * 100",
      "Target Benchmark: World-class SDET teams target DRE >= 95%",
      "Complement Metric: Defect Leakage % = 100% - DRE"
    ],
    example: "If QA caught 96 bugs during STLC and customers reported 4 bugs in Production after release: DRE = (96 / (96 + 4)) * 100 = 96%."
  },
  "bva": {
    title: "BVA (Boundary Value Analysis) & EP (Equivalence Partitioning)",
    aliases: ["Boundary Value Analysis", "Equivalence Partitioning", "BVA"],
    def: "Black-box test design techniques that minimize test cases while maximizing bug detection by dividing inputs into valid/invalid partitions (EP) and testing exact edges (BVA).",
    props: [
      "Equivalence Partitioning (EP): Pick 1 representative value from each valid/invalid range",
      "Boundary Value Analysis (BVA): Test the 6 edge points: min-1, min, min+1, max-1, max, max+1",
      "Why Used: Solves Principle #2 (Exhaustive testing is impossible) because bugs cluster at `<` vs `<=` boundaries"
    ],
    example: "For age field (18 to 60): BVA tests {17, 18, 19, 59, 60, 61} in a TestNG @DataProvider instead of testing all numbers 1 to 100."
  },
  "pesticide-paradox": {
    title: "Pesticide Paradox (Principle #5)",
    aliases: ["Pesticide Paradox"],
    def: "ISTQB Principle #5 stating that running the exact same test cases with the same static test data repeatedly will eventually stop finding new defects.",
    props: [
      "Root Cause: Developers fix bugs on the exact code paths covered by old tests, while new bugs emerge in new features or untested data permutations",
      "Fix 1: Continuously add new edge-case scenarios to Selenium/API regression suites every sprint",
      "Fix 2: Use dynamic/randomized test data (Faker / DataProvider) + Exploratory Testing"
    ],
    example: "A login regression script using 'user1@test.com' passes for 6 months but misses a bug where emails containing '+' (user+tag@test.com) crash the parser."
  },
  "ast": {
    title: "AST (Abstract Syntax Tree)",
    aliases: ["Abstract Syntax Tree", "AST"],
    def: "A tree representation of the syntactic structure of source code generated by static analysis tools (SonarQube, Checkstyle, ESLint) to inspect code without running it.",
    props: [
      "Used In: Automated Static Testing (STLC Phase 1/3 & Git Pull Request gates)",
      "Detects: NullPointer dereferences, unclosed streams, Thread.sleep() calls, SQL injection, dead code",
      "Execution Required: Zero — parses source text directly"
    ],
    example: "SonarQube parses the AST of LoginPage.java during a PR check and flags a blocker because Thread.sleep(5000) was used instead of WebDriverWait."
  },
  "stub": {
    title: "Stub (Top-Down Test Double)",
    aliases: ["Stubs", "Stub"],
    def: "A passive dummy component used in Top-Down Integration Testing to replace a missing lower-level (called) child module and return hardcoded responses.",
    props: [
      "Integration Approach: Top-Down Integration",
      "Replaces: Missing lower-level called child module (e.g., PaymentGateway or EmailService)",
      "Control Flow: Passive — gets invoked by the parent module under test and returns canned data"
    ],
    example: "PaymentGatewayStub returns 'true' when OrderService calls chargeCard(), allowing OrderService to be tested before the real bank integration exists."
  },
  "driver": {
    title: "Driver (Bottom-Up Test Harness)",
    aliases: ["Drivers", "Driver"],
    def: "An active test harness or caller program used in Bottom-Up Integration Testing to invoke a lower-level child module when the top-level parent UI/Controller is not built yet.",
    props: [
      "Integration Approach: Bottom-Up Integration",
      "Replaces: Missing higher-level calling parent module",
      "Control Flow: Active — initiates calls into the child module, passes test inputs, and asserts outputs"
    ],
    example: "A TestNG @Test class or main() method that calls TaxCalculationDao.computeGst(1000) before the Checkout UI exists."
  },
  "sanity-test": {
    title: "Sanity Testing",
    aliases: ["Sanity Testing", "Sanity Test"],
    def: "A narrow and deep functional check focused on 1–2 recently modified or bug-fixed modules on a stable build to verify the new logic works rationally before full regression.",
    props: [
      "Coverage Shape: Narrow & Deep (tests positive, negative & boundary rules of only the changed module)",
      "When Executed: On stable builds after minor code changes or bug fixes",
      "Relationship: Subset of Regression Testing; strictly performed by QA"
    ],
    example: "Running 18 deep coupon test cases ('mvn test -Dgroups=sanity-coupon') right after a developer updates the discount rounding formula."
  },
  "retesting": {
    title: "Retesting (Confirmation Testing)",
    aliases: ["Confirmation Testing", "Retesting"],
    def: "Re-executing a previously failed test case using the exact same steps and input data on a new build to verify that a reported defect has been fixed.",
    props: [
      "Target Cases: Only previously FAILED test cases linked to fixed defects",
      "Execution Order: Always runs BEFORE Regression Testing on a bug-fix build",
      "Outcome: Marks the Jira bug as CLOSED (if pass) or REOPENED (if still failing)"
    ],
    example: "Re-running TC_44 with input '$99.99' on Build #15 to confirm Jira BUG-409 is fixed."
  },
  "regression-testing": {
    title: "Regression Testing",
    aliases: ["Regression Testing", "Full Regression", "Regional Regression"],
    def: "Re-executing previously passing test cases across existing modules after a code change or bug fix to ensure old working features did not break as a side effect.",
    props: [
      "Target Cases: Previously PASSED test cases covering existing features",
      "3 Sub-Types: 1. Unit Regression, 2. Regional (Partial) Regression, 3. Full Regression",
      "Automation Priority: #1 candidate for Selenium / Playwright / RestAssured CI/CD automation"
    ],
    example: "Running 600 automated Selenium + API tests overnight via Jenkins after merging a new Checkout feature."
  },
  "endurance-testing": {
    title: "Endurance / Soak Testing",
    aliases: ["Endurance Testing", "Soak Testing", "Endurance (Soak) Testing"],
    def: "A non-functional performance test where the system is subjected to a continuous moderate load for an extended duration (12 to 72 hours) to uncover memory leaks and resource exhaustion.",
    props: [
      "Duration: 12 to 72+ hours continuous execution",
      "Primary Target Bugs: JVM Heap Memory Leaks (OutOfMemoryError), unclosed DB connections, disk log saturation",
      "Tools: Apache JMeter, Grafana k6, Gatling + Prometheus/JVM heap profiler"
    ],
    example: "Running 1,500 concurrent users for 36 hours in k6 reveals JVM heap usage climbing from 2GB to 8GB due to unclosed HTTP client streams."
  },
  "i18n-l10n": {
    title: "I18n (Internationalization) vs L10n (Localization)",
    aliases: ["Internationalization", "Localization", "I18n", "L10n"],
    def: "I18n is engineering the software architecture to support multiple locales without code changes; L10n is adapting and testing the UI, currency, and dates for one specific target region.",
    props: [
      "Why '18' and '10': 18 letters between I and n in Internationalization; 10 letters between L and n in Localization",
      "I18n Checks: Externalized resource bundles, UTF-8 encoding, no hardcoded English text",
      "L10n Checks: Translated strings, currency symbols (₹, €, ¥), date formats, Right-to-Left (RTL) layout"
    ],
    example: "Testing the app in Japanese (ja-JP) with '¥' prices and in Arabic (ar-SA) with mirrored Right-to-Left navigation."
  }
};
