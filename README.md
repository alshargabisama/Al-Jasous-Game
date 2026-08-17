# 🕵️‍♂️ Al-Jasous | لعبة الجاسوس

[![Language: JavaScript](https://img.shields.io/badge/Language-Vanilla%20JS-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Style: CSS3](https://img.shields.io/badge/Style-CSS3%20%2F%20RTL-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Platform: Web Mobile](https://img.shields.io/badge/Platform-Mobile%20Web-brightgreen.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)

A web-based, local pass-the-phone social deduction game tailored for families and groups of friends (3–15 players). Designed with a **mobile-first, Right-to-Left (RTL) Arabic interface**, players work together to uncover the hidden Imposter (*الجاسوس*) among them through subtle clues and secret voting.

---

## 📸 Overview & Wireframes

> Paper wireframes and initial design concepts are located in the [`/design/wireframes`](./design/wireframes) directory.

### Game Flow Overview

```mermaid
flowchart TD
    A[Home Screen / الرئيسية] -->|ابدأ اللعبة| B(Setup Screen / إعداد اللاعبين)
    B -->|إضافة/حذف لاعبين| B
    B -->|ابدأ اللعبة| C(Pass Phone Shield / تمرير الهاتف)
    
    C -->|أنا جاهز| D(Secret Role / دور اللاعب)
    D -->|إخفاء وتمرير| E{الكل شاهد دوره؟}
    E -->|لا| C
    E -->|نعم| F(Clue Round / جولة التلميحات)
    
    F -->|لفتين كاملتين| G(Voting Shield / تمرير للتصويت)
    G -->|أنا جاهز| H(Secret Vote / التصويت السري)
    H -->|حفظ الصوت| I{الكل قام بالتصويت؟}
    I -->|لا| G
    I -->|نعم| J(Results & Points / النتائج والنقاط)
    
    J -->|جولة جديدة| C
    J -->|تعديل اللاعبين| B
    J -->|اللوحة النهائية| K[Final Leaderboard / اللوحة النهائية]
    K -->|العودة| A
