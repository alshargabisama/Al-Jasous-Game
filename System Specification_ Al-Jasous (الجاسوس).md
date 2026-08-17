# **System Specification: Al-Jasous (الجاسوس)**

## **1\. Project Overview**

**Al-Jasous** is a lightweight, web-based social deduction game designed for local pass-the-phone play among family and friends (3–15 players). Built as a single-page application (SPA) using HTML5, CSS3, and modern Vanilla JavaScript (ES6+), it features an Arabic right-to-left (RTL) interface optimized for mobile viewports.

## **2\. Target Audience & System Boundaries**

* **Primary Users:** Families and groups of friends playing together in a physical setting.  
* **Group Size:** 3 to 15 players on a single shared device.  
* **Platform Constraints:** Mobile browsers (iOS Safari, Android Chrome); single-device usage without network peer-to-peer dependencies.

## **3\. Game Mechanics & Rules Summary**

* **Game Start:** The host enters player names on the setup screen and initiates the session.  
    
* **Role Assignment:** The system randomly selects one secret word from a categorized word bank and assigns one random player as the Imposter ("الجاسوس").  
    
* **Pass-the-Phone Phase:** Each player views their role privately using a shield modal before passing the device.  
    
* **Clue Phase:** The system directs two rotations where players state verbal clues aloud.  
    
* **Voting Phase:** Players cast secret votes on the device to identify the Imposter.  
    
* **Scoring Rules:**  
  

  * **Imposter Wins (Uncaught):** Imposter earns **\+2 points**; players who voted incorrectly earn **0 points** and those voted correct earn  **1 point.**   
  *   
  * **Imposter Loses (Caught):** Players who voted correctly earn **\+1 point**; Imposter earns **0 points**.  
      
  * Scores persist in state across multiple consecutive rounds.  
    

## **4\. Functional Requirements (FR)**

| ID | Requirement Description |
| :---- | :---- |
| **FR1** | The system shall allow adding, editing, and removing player names (3–15 players). |
| **FR2** | The system shall randomly select a secret word without repetition until the word bank is exhausted. |
| **FR3** | The system shall randomly assign one player as the Imposter each round. |
| **FR4** | The system shall obscure role reveals using a pass-the-phone shield screen. |
| **FR5** | The system shall enforce a two-round clue turn tracker. |
| **FR6** | The system shall collect individual secret votes for each player. |
| **FR7** | The system shall calculate round winners and update cumulative scores according to game rules. |
| **FR8** | The system shall allow immediate replays while preserving scores and player lists. |

## **5\. Non-Functional Requirements (NFR)**

* **Usability & Accessibility:** Full Arabic RTL layout using native web typography (dir="rtl").  
    
* **Performance:** Single-page view switching under 100ms; zero external server latency.  
    
* **Responsiveness:** Mobile-first design scaled for portrait orientation across standard mobile screen widths.  
    
* **Reliability:** Pure client-side execution using JavaScript array immutability to prevent state corruption.


## 

└───────────────────────────────────────────────────**6\. System Architecture & Implementation Strategy**

### **6.1 Page Navigation Strategy (Single-Page View Management)**

To deliver instant transitions without page reloads, the project uses a single HTML file structured into logical \<section\> tags representing each screen (\#home-screen, \#setup-screen, \#pass-screen, etc.).

* **Navigation Logic:** Navigation is controlled by toggling a global .active CSS class via JavaScript.  
    
* **Performance Benefit:** Eliminates network requests between game phases, ensuring smooth performance on low-end devices or slow connections.


### **6.2 Separation of Concerns**

The project structure separates, user interface rendering, and game logic data manipulation:

* **DOM Rendering (**ui and navigation.js **/ DOM handlers):** Reads state and updates element contents, view visibilities, and input lists.  
*   
* **Game Logic (**game logic and data.js**):** Contains pure, testable functions for word selection without repetition, role assignment, and point evaluation and Holds runtime variables (players, scores, imposterIndex, currentWord, usedWords).  
* 

### **6.3 Design System & Visual Styling**

* **Color Palette:** High-contrast dark/vibrant theme designed for social gathering environments.  
    
* **Typography:** Modern IBM Plex Sans Arabic  
    
* **UI Scaffolding:** CSS Flexbox and Grid layouts using CSS Custom Properties (\--bg-color, \--primary, \--spacing-md) for quick styling updates.  
*   
  


## **7\. Quality Assurance & Testing Strategy**

### **7.1 Automated Unit Testing (Jest)**

Core game logic functions are isolated and tested using **Jest**:

* **Role Distribution:** Verifying exactly one Imposter is selected per game cycle.  
* **Word Bank Uniqueness:** Testing that words are removed from the active pool until the set is depleted.  
* **Score Calculation:** Asserting correct score updates for both Imposter win/loss scenarios.

### **7.2 Standard Validation**

* **W3C HTML5 & CSS3 Validation:** Automated linting to fix syntax issues, parsing errors, or non-conforming attributes.


### **7.3 End-to-End (E2E) & Usability Testing**

* **Device Testing:** Validating screen responsive behavior across different mobile screen sizes (iOS Safari / Android Chrome).  
* **Usability Sessions:** Practical gameplay tests conducted with small groups (3–6 players) to identify UX bottlenecks during the pass-the-phone and voting phases. 