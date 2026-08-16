# Manual Test Scenarios & Test Matrix

This document outlines the manual End-to-End (E2E) and User Acceptance Testing (UAT) scenarios for **Al-Jasous (The Imposter Game)**.

---

## 1. Player Setup & Validation Scenarios

| Test ID | Feature Area | Test Scenario | Pre-conditions | Steps to Execute | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-SET-01** | Player Setup | Enforce minimum 3 players rule | Setup screen open | 1. Enter 2 player names.<br>2. Click "Start Game". | Game blocks start and displays an alert requiring at least 3 players. | Pending |
| **TC-SET-02** | Player Setup | Enforce maximum 15 players limit | Setup screen open | 1. Add 15 player names.<br>2. Attempt to add a 16th player input. | Add button is disabled or an alert limits players to 15 max. | Pending |
| **TC-SET-03** | Player Setup | Duplicate player name prevention | Setup screen open | 1. Enter "Samaa" for Player 1.<br>2. Enter "Samaa" for Player 2.<br>3. Click "Start Game". | Game blocks start with a duplicate name error warning. | Pending |
| **TC-SET-04** | Player Setup | Whitespace trimming on player names | Setup screen open | 1. Enter `"  Ahmed  "` with leading/trailing spaces.<br>2. Start match. | Name is trimmed to `"Ahmed"` on all game screens and cards. | Pending |

---

## 2. Gameplay & Role Assignment Scenarios

| Test ID | Feature Area | Test Scenario | Pre-conditions | Steps to Execute | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-PLAY-01** | Secret Role Reveal | Exact one Imposter assignment | Setup complete (3 players) | 1. Pass phone to each player.<br>2. Tap "Reveal Role" for each. | Exactly 1 player sees "You are the Imposter!", and 2 players see the secret category word. | Pending |
| **TC-PLAY-02** | Pass Phone Sequence | Privacy screen modal | Game started | 1. Player 1 views role.<br>2. Click "Next Player". | Privacy screen covers the role until Player 2 confirms readiness. | Pending |

---

## 3. Voting & Outcome Scenarios

| Test ID | Feature Area | Test Scenario | Pre-conditions | Steps to Execute | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-VOTE-01** | Voting Logic | Team Win condition (Majority vote) | Match completed (3 players) | 1. Have 2 or more players vote for the correct Imposter ID. | App announces **Team Victory** and displays vote breakdown. | Pending |
| **TC-VOTE-02** | Voting Logic | Imposter Win condition (Majority fail) | Match completed (3 players) | 1. Have players cast votes for non-imposter players or tie. | App announces **Imposter Victory** and reveals the Imposter. | Pending |

---

## 4. Scoring & Game State Persistence Scenarios

| Test ID | Feature Area | Test Scenario | Pre-conditions | Steps to Execute | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-SCORE-01** | Scoring Rules | Team Win point allocation | Voting finished (Team Won) | 1. Check score screen after Team victory. | Players who voted correctly get **+1 point**. Imposter gets **0 points**. | Pending |
| **TC-SCORE-02** | Scoring Rules | Imposter Win point allocation | Voting finished (Imposter Won) | 1. Check score screen after Imposter victory. | Imposter gets **+2 points**. Team members get **0 points**. | Pending |
| **TC-SCORE-03** | Reset & Edit | Edit players preserving total scores | Round 1 finished | 1. Click "Edit Players".<br>2. Select "Keep Scores".<br>3. Add a 4th new player.<br>4. Start Round 2. | Existing players retain total scores; new player starts at **0 points**. | Pending |
| **TC-SCORE-04** | Reset & Edit | Reset all scores for new game | Round 1 finished | 1. Click "Edit Players".<br>2. Select "Reset All Scores".<br>3. Start new game. | All player total and session scores reset to **0**. | Pending |