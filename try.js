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

  // Setup Screen Elements
  const startMatchBtn = document.getElementById("start-game-btn");
  const playerInputs = document.querySelectorAll(".player-name-input");

  // Pass Phone Screen Elements
  const currentPlayerNameDisplay = document.getElementById("current-player-name");
  const readyBtn = document.getElementById("ready-btn");

  // Reveal Screen Elements
  const cardRegular = document.getElementById("card-regular");
  const cardSpy = document.getElementById("card-spy");
  const secretWordText = document.getElementById("secret-word-text");
  const doneTurnBtn = document.getElementById("done-turn-btn");

  // ==========================================
  // 2. GAME STATE VARIABLES
  // ==========================================
  
  let players = [];
  let currentPlayerIndex = 0;
  let spyIndex = -1;
  let secretWord = "";

  // Sample words pool (you can expand this list!)
  const wordBank = ["بيتزا", "سفرية", "مستشفى", "سيارة", "ساعة", "مطار", "قهوة", "مدرسة", "سينما"];

  // ==========================================
  // 3. HELPER FUNCTIONS
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

  function openModal(modal) {
    if (modal) modal.classList.remove("hidden");
  }

  function closeModal(modal) {
    if (modal) modal.classList.add("hidden");
  }

  /**
   * Initializes a new round
   */
  function startNewRound() {
    // 1. Get player names
    players = [];
    const inputs = document.querySelectorAll(".player-name-input");
    inputs.forEach((input, index) => {
      const name = input.value.trim();
      players.push(name !== "" ? name : `لاعب ${index + 1}`);
    });

    // 2. Select a random spy
    spyIndex = Math.floor(Math.random() * players.length);

    // 3. Select a random secret word
    const randomWordIndex = Math.floor(Math.random() * wordBank.length);
    secretWord = wordBank[randomWordIndex];

    // 4. Reset turn index & navigate to Pass Phone screen
    currentPlayerIndex = 0;
    updatePassPhoneScreen();
    navigateTo(setupScreen, passPhoneScreen);
  }

  /**
   * Updates the "Pass the Phone" screen UI for the current player
   */
  function updatePassPhoneScreen() {
    if (currentPlayerNameDisplay) {
      currentPlayerNameDisplay.textContent = players[currentPlayerIndex];
    }
  }

  /**
   * Updates the "Reveal Screen" depending on if player is spy or regular
   */
  function updateRevealScreen() {
    if (currentPlayerIndex === spyIndex) {
      // Show Spy Card
      cardSpy.classList.remove("hidden");
      cardRegular.classList.add("hidden");
    } else {
      // Show Regular Player Card
      cardRegular.classList.remove("hidden");
      cardSpy.classList.add("hidden");
      if (secretWordText) {
        secretWordText.textContent = secretWord;
      }
    }
  }

  // ==========================================
  // 4. EVENT LISTENERS
  // ==========================================

  // A. Home Screen -> Setup Screen ("ابدأ اللعبة")
  if (startGameBtn) {
    startGameBtn.addEventListener("click", () => {
      navigateTo(homeScreen, setupScreen);
    });
  }

  // B. Rules Modal Open/Close
  if (openRulesBtn) openRulesBtn.addEventListener("click", () => openModal(rulesModal));
  if (closeRulesBtn) closeRulesBtn.addEventListener("click", () => closeModal(rulesModal));
  if (rulesModal) {
    rulesModal.addEventListener("click", (event) => {
      if (event.target === rulesModal) closeModal(rulesModal);
    });
  }

  // C. Setup Screen -> Start Game ("يلا نبدأ اللعب")
  if (startMatchBtn) {
    startMatchBtn.addEventListener("click", () => {
      startNewRound();
    });
  }

  // D. Pass Phone Screen -> Reveal Screen ("أنا جاهز")
  if (readyBtn) {
    readyBtn.addEventListener("click", () => {
      updateRevealScreen();
      navigateTo(passPhoneScreen, revealScreen);
    });
  }

  // E. Reveal Screen -> Next Player Pass Phone ("فهمت، اخفِ الشاشة")
  if (doneTurnBtn) {
    doneTurnBtn.addEventListener("click", () => {
      currentPlayerIndex++;

      // If all players have seen their role:
      if (currentPlayerIndex >= players.length) {
        alert("انتهت جولة تسليم الهاتف! تبدأ الآن جولة التلميحات 🔥");
        // Here you can navigate to the hints/discussion screen in the future
        navigateTo(revealScreen, homeScreen); // Temporarily returns to home screen
      } else {
        // Move to next player
        updatePassPhoneScreen();
        navigateTo(revealScreen, passPhoneScreen);
      }
    });
  }
});