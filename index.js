document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. SELECT DOM ELEMENTS
  // ==========================================
  
  // Screens & Overlays
  const homeScreen = document.getElementById("home-screen");
  const setupScreen = document.getElementById("setup-screen");
  const passPhoneScreen = document.getElementById("pass-phone-screen");
  const revealScreen = document.getElementById("reveal-screen");
  const rulesModal = document.getElementById("rules-modal");

  // Home Screen Buttons
  const startGameBtn = document.querySelector(".home-buttons .btn-primary");
  const openRulesBtn = document.querySelector(".home-buttons .btn-secondary");

  // Modal Buttons
  const closeRulesBtn = document.getElementById("close-rules-btn");

  // Setup Screen Buttons
  const startMatchBtn = document.getElementById("start-game-btn");

  // Pass Phone Screen Buttons
  const readyBtn = document.getElementById("ready-btn");

  // Reveal Screen Buttons
  const doneTurnBtn = document.getElementById("done-turn-btn");

  // ==========================================
  // 2. HELPER FUNCTIONS
  // ==========================================

  /**
   * Smoothly navigates between full screens
   * @param {HTMLElement} currentScreen - Screen to hide
   * @param {HTMLElement} nextScreen - Screen to display
   */
  function navigateTo(currentScreen, nextScreen) {
    if (currentScreen && nextScreen) {
      currentScreen.classList.add("hidden");
      nextScreen.classList.remove("hidden");
    }
  }

  /**
   * Opens a modal overlay
   */
  function openModal(modal) {
    if (modal) modal.classList.remove("hidden");
  }

  /**
   * Closes a modal overlay
   */
  function closeModal(modal) {
    if (modal) modal.classList.add("hidden");
  }

  // ==========================================
  // 3. EVENT LISTENERS & SCREEN MOVEMENT
  // ==========================================

  // A. Home Screen -> Setup Screen ("ابدأ اللعبة")
  if (startGameBtn) {
    startGameBtn.addEventListener("click", () => {
      navigateTo(homeScreen, setupScreen);
    });
  }

  // B. Open & Close Rules Modal ("كيف تلعب؟")
  if (openRulesBtn) {
    openRulesBtn.addEventListener("click", () => {
      openModal(rulesModal);
    });
  }

  if (closeRulesBtn) {
    closeRulesBtn.addEventListener("click", () => {
      closeModal(rulesModal);
    });
  }

  if (rulesModal) {
    rulesModal.addEventListener("click", (event) => {
      if (event.target === rulesModal) {
        closeModal(rulesModal);
      }
    });
  }

  // C. Setup Screen -> Pass Phone Screen ("يلا نبدأ اللعب")
  if (startMatchBtn) {
    startMatchBtn.addEventListener("click", () => {
      navigateTo(setupScreen, passPhoneScreen);
    });
  }

  // D. Pass Phone Screen -> Reveal Screen ("أنا جاهز")
  if (readyBtn) {
    readyBtn.addEventListener("click", () => {
      navigateTo(passPhoneScreen, revealScreen);
    });
  }

  // E. Reveal Screen -> Next Pass Phone / Return ("فهمت، اخفِ الشاشة")
  if (doneTurnBtn) {
    doneTurnBtn.addEventListener("click", () => {
      navigateTo(revealScreen, passPhoneScreen);
    });
  }
});