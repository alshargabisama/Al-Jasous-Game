# Al-Jasous (الجاسوس)

A web-based, local pass-the-phone social deduction game designed for groups of 3 to 15 players on a single mobile device. Built with a native Right-to-Left (RTL) Arabic interface, the application manages secret role distribution, clue rotation tracking, secret voting, and score evaluation without requiring network dependencies or third-party client installation.

---

## Project Overview

Al-Jasous digitizes traditional social deduction gameplay for physical gatherings. The game randomly selects a secret word from a categorized bank and secretively designates one player as the Imposter ("الجاسوس"). Through privacy shield modals, players view their roles privately before passing the device. After two rounds of verbal clues, players cast individual votes on the single device to uncover the Imposter.

---

## Key Features

* **Single-Device Pass-the-Phone Workflow:** Accommodates 3 to 15 dynamic players using isolated shield screens to protect confidential state transitions during physical handoffs.
* **Native Arabic Interface:** Full RTL visual layout and typography using responsive CSS layout models.
* **Non-Repeating Word Engine:** Dynamic word selection algorithm preventing duplicate secret words across rounds until the bank is fully exhausted.
* **Stateful Scoring System:** Persistent score accumulation across rounds (+2 points awarded to an uncaught Imposter; +1 point awarded to players who correctly identify the Imposter).
* **Single-Page Architecture:** Zero page reloads between screens for seamless mobile performance.

---

## Technology Stack

* **Frontend Structure:** HTML5 (Semantic markup, localized `dir="rtl"` attributes).
* **Styling & Layout:** CSS3 (Flexbox, CSS Grid, Custom Properties, Responsive Viewport Units).
* **Logic & State:** Vanilla JavaScript (ES6+ Modules, Async state management, DOM Manipulation).
* **Testing Suite:** Jest (Unit testing for pure core logic functions).

---

## System Architecture & Software Design

### Page Navigation Strategy
The application operates as a Single-Page Application (SPA) contained within a single `index.html` file. Each primary UI screen is represented by distinct `<section>` views. Transitions are managed programmatically via JavaScript by toggling an `.active` CSS class, avoiding page reloads and network overhead.

### Architectural Separation of Concerns
To maintain clean code architecture, project logic is organized into modular responsibilities:
* **State Management (`state.js`):** Centralized runtime data layer managing player lists, cumulative scores, active roles, selected words, and word history arrays.
* **Game Engine (`game.js`):** Isolated, side-effect-free algorithms for random Imposter selection, word bank filtering, and score evaluation.
* **UI Renderer (`ui.js`):** Dynamic DOM updates, event listeners, and screen visibility toggles driven by changes in state.

---

## Software Development Lifecycle & Design Steps

1. **Requirements Gathering & Specification:** Defined functional requirements (FRs) covering player limits, non-repeating word generation, privacy shield reveals, and persistent score calculations.
2. **User Experience & Wireframing:** Sketched mobile-first portrait layouts and screen flow transitions prioritized for single-handed mobile usage.
3. **Frontend Implementation:**
   * Structured semantic HTML views.
   * Established modern Arabic typography and theme variables in CSS.
   * Developed stateful JavaScript controllers for screen transitions and role allocation.
4. **Code Optimization:** Refactored DOM access patterns to eliminate layout thrashing during view updates.

---

## Testing & Quality Assurance

* **Unit Testing (Jest):** Programmatic tests validating core game functions:
  * Verification that exactly one player is assigned the Imposter role per round.
  * Validation that word bank removal prevents duplicate secret words in consecutive sessions.
  * Correct arithmetic evaluation of scores based on vote outcomes.
* **Standards Compliance:** Validated structural markup and styling rules against W3C HTML5 and CSS3 standards.
* **Cross-Device Usability Testing:** Executed manual end-to-end user scenarios on iOS Safari and Android Chrome to confirm layout integrity and viewport responsiveness.

---

## Installation & Deployment

1. **Clone the repository:** https://github.com/alshargabisama/Al-Jasous-Game.git
 
