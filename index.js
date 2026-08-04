document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. SELECT DOM ELEMENTS
  // ==========================================
  
  // Screens & Overlays
  const homeScreen = document.getElementById("home-screen");
  const setupScreen = document.getElementById("setup-screen");
  const passPhoneScreen = document.getElementById("pass-phone-screen");
  const revealScreen = document.getElementById("reveal-screen");
  const roundInitScreen = document.getElementById("round-initialization-screen");
  const clueTurnScreen = document.getElementById("clue-turn-screen");
  const votingInitScreen = document.getElementById("voting-initialization-screen");
  const votingScreen = document.getElementById("voting-screen");
  const resultScreen = document.getElementById("result-screen");
  const leaderboardScreen = document.getElementById("leaderboard-screen");
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

  // Round Initialization Screen Buttons
  const roundStartBtn = document.getElementById("round-start-btn");

  // Active Clue Turn Screen Buttons
  const nextTurnBtn = document.getElementById("next-turn-btn");

  // Voting Initialization Screen Buttons
  const startVotingBtn = document.getElementById("start-voting-btn");

  // Voting Screen Buttons
  const submitVoteBtn = document.getElementById("submit-vote-btn");

  // Session Result Screen Buttons
  const toLeaderboardBtn = document.getElementById("to-leaderboard-btn");
  const replayBtn = document.getElementById("replay-btn");
  const editPlayersBtn = document.getElementById("edit-players-btn");

  // Leaderboard Screen Buttons
  const lbHomeBtn = document.getElementById("lb-home-btn");
  const lbNewGameBtn = document.getElementById("lb-new-game-btn");

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

  // E. Reveal Screen -> Round Initialization Screen ("فهمت، اخفِ الشاشة")
  if (doneTurnBtn) {
    // NOTE: Loops back to passPhoneScreen in full game logic until all cards are revealed
    doneTurnBtn.addEventListener("click", () => {
      navigateTo(revealScreen, roundInitScreen);
    });
  }

  // F. Round Initialization Screen -> Active Clue Turn Screen ("ابدأ التلميحات")
  if (roundStartBtn) {
    roundStartBtn.addEventListener("click", () => {
      navigateTo(roundInitScreen, clueTurnScreen);
    });
  }

  // G. Active Clue Turn Screen -> Voting Initialization Screen ("التالي")
  if (nextTurnBtn) {
    // NOTE: Loops through all player turns in full game logic before moving forward
    nextTurnBtn.addEventListener("click", () => {
      navigateTo(clueTurnScreen, votingInitScreen);
    });
  }

  // H. Voting Initialization Screen -> Voting Turn Screen ("ابدأ التصويت")
  if (startVotingBtn) {
    startVotingBtn.addEventListener("click", () => {
      navigateTo(votingInitScreen, votingScreen);
    });
  }

  // I. Voting Screen -> Result Screen ("تأكيد التصويت")
  if (submitVoteBtn) {
    submitVoteBtn.addEventListener("click", () => {
      navigateTo(votingScreen, resultScreen);
    });
  }

  // J. Result Screen -> Leaderboard Screen (Top Left X / End Button)
  if (toLeaderboardBtn) {
    toLeaderboardBtn.addEventListener("click", () => {
      navigateTo(resultScreen, leaderboardScreen);
    });
  }

  // K. Result Screen -> Pass Phone Screen ("بدء جولة جديدة")
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      navigateTo(resultScreen, passPhoneScreen);
    });
  }

  // L. Result Screen -> Setup Screen ("تعديل اللاعبين")
  if (editPlayersBtn) {
    editPlayersBtn.addEventListener("click", () => {
      navigateTo(resultScreen, setupScreen);
    });
  }

  // M. Leaderboard Screen -> Home Screen (Home Icon Button)
  if (lbHomeBtn) {
    lbHomeBtn.addEventListener("click", () => {
      navigateTo(leaderboardScreen, homeScreen);
    });
  }

  // N. Leaderboard Screen -> Setup Screen ("بدء لعبة جديدة")
  if (lbNewGameBtn) {
    lbNewGameBtn.addEventListener("click", () => {
      navigateTo(leaderboardScreen, setupScreen);
    });
  }
});