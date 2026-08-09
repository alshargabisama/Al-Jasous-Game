// ==========================================
// 1. DATA STRUCTURES & DATA LAYER
// ==========================================

class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name.trim();
    this.sessionScore = 0;
    this.totalScore = 0;
  }

  addScore(points) {
    if (typeof points === "number" && points > 0) {
      this.sessionScore += points;
      this.totalScore += points;
    }
  }

  resetSessionScore() {
    this.sessionScore = 0;
  }
}

const allWords = [
  "قطة", "كلب", "تفاحة", "موز", "بيتزا", "سيارة", "حافلة", "مدرسة", "معلم", "طبيب",
  "منزل", "هاتف", "حاسوب", "كتاب", "كرسي", "طاولة", "ماء", "قهوة", "شمس", "قمر",
  "نجمة", "شجرة", "زهرة", "سمكة", "طائر", "أسد", "فيل", "كرة قدم", "كرة سلة", "جيتار",
  "بيانو", "كاميرا", "تلفاز", "مستشفى", "مطار", "شاطئ", "جبل", "نهر", "مطر", "ثلج",
  "عيد ميلاد", "عرس", "مطعم", "سوبرماركت", "شرطي", "رجل إطفاء", "ملك", "ملكة", "روبوت", "قطار",
  "بركان", "تلسكوب", "غواصة", "مروحية", "لوح تزلج", "دراجة نارية", "سيارة إسعاف", "منارة", "متحف", "مكتبة",
  "قلعة", "هرم", "شلال", "صحراء", "غابة استوائية", "جزيرة", "جواز سفر", "حقيبة سفر", "بوصلة", "منظار",
  "مقلاه", "سماعات", "ساعة ذكية", "لوحة مفاتيح", "مسحبه", "طابعة", "آلة حاسبة", "مصعد", "سلم كهربائي", "ثلاجة",
  "فشار", "همبرغر", "سوشي", "فطيرة", "شوكولاتة", "جوز الهند", "أناناس", "أفوكادو", "تمساح", "بطريق",
  "كنغر", "دلفين", "أخطبوط", "فراشة", "رائد فضاء", "محقق", "مصور", "مهندس معماري", "لاعب كرة قدم", "ساحر",
  "قمامة", "كوكب", "حداد", "عالم آثار", "سلم", "خريطة", "عظام", "طبيب بيطري", "سجن", "جمل",
  "رمل", "كيس", "طبل", "سماعة", "مسلسل", "آلة كاتبة", "غرامة مالية", "ثريا", "حزام", "سم سم",
  "شاحن", "شباك", "عسل", "شبام حضرموت", "جبال", "قلعة القاهرة", "جسر", "سفينه", "منطاد هوائي", "بدلة فضاء",
  "قمر صناعي", "ستارة", "صمغ", "صحن", "خوارزمية", "سماء", "ذكاء صناعي", "بنت الصحن", "فأر", "قوس قزح",
  "دباسة ورق", "فرشاه اسنان", "شميز", "زعفران", "رصاصة", "كرواسون", "خبز مخمر"
];

const wordManager = {
  usedWords: new Set(),

  getRandomWord() {
    if (!allWords || allWords.length === 0) return "كلمة سرية";
    if (this.usedWords.size >= allWords.length) this.usedWords.clear();

    let selectedWord;
    do {
      const randomIndex = Math.floor(Math.random() * allWords.length);
      selectedWord = allWords[randomIndex];
    } while (this.usedWords.has(selectedWord));

    this.usedWords.add(selectedWord);
    return selectedWord;
  }
};

const gameState = {
  players: [],
  imposterId: null,
  secretWord: "",
  
  // Turn Controllers
  currentPassIndex: 0,    // Pass-the-phone loop index
  currentRound: 1,        // Clue round counter
  totalRounds: 2,         // Standard 2 clue rounds
  currentClueIndex: 0,    // Active clue speaker index

  // Voting Trackers
  currentVoterIndex: 0,   // Active voting player index
  votes: {},              // Map: voterPlayerId -> votedTargetPlayerId
  selectedVoteTargetId: null,

  resetMatchState() {
    this.imposterId = null;
    this.secretWord = "";
    this.currentPassIndex = 0;
    this.currentRound = 1;
    this.currentClueIndex = 0;
    this.currentVoterIndex = 0;
    this.votes = {};
    this.selectedVoteTargetId = null;
    this.players.forEach(p => p.resetSessionScore());
  }
};

// ==========================================
// 2. DOM CONTENT LOADED & INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // --- SCREEN ELEMENTS ---
  const setupScreen = document.getElementById("setup-screen");
  const passPhoneScreen = document.getElementById("pass-phone-screen");
  const revealScreen = document.getElementById("reveal-screen");
  const roundInitScreen = document.getElementById("round-initialization-screen");
  const clueTurnScreen = document.getElementById("clue-turn-screen");
  const votingInitScreen = document.getElementById("voting-initialization-screen");
  const votingScreen = document.getElementById("voting-screen");
  const resultScreen = document.getElementById("result-screen");
  const leaderboardScreen = document.getElementById("leaderboard-screen");

  // --- SETUP SCREEN ELEMENTS ---
  const playersList = document.getElementById("players-list");
  const addPlayerBtn = document.getElementById("add-player-btn");
  const startGameBtn = document.getElementById("start-game-btn");

  // --- PASS PHONE SCREEN ELEMENTS ---
  const currentPlayerName = document.getElementById("current-player-name");
  const readyBtn = document.getElementById("ready-btn");

  // --- REVEAL ROLE SCREEN ELEMENTS ---
  const cardRegular = document.getElementById("card-regular");
  const cardSpy = document.getElementById("card-spy");
  const secretWordText = document.getElementById("secret-word-text");
  const doneTurnBtn = document.getElementById("done-turn-btn");

  // --- ROUND INIT SCREEN ELEMENTS ---
  const roundStartBtn = document.getElementById("round-start-btn");

  // --- CLUE TURN SCREEN ELEMENTS ---
  const currentRoundNum = document.getElementById("current-round-num");
  const totalRoundsNum = document.getElementById("total-rounds-num");
  const activePlayerName = document.getElementById("active-player-name");
  const cluePlayerCount = document.getElementById("clue-player-count");
  const nextTurnBtn = document.getElementById("next-turn-btn");

  // --- VOTING INIT & VOTING SCREEN ELEMENTS ---
  const startVotingBtn = document.getElementById("start-voting-btn");
  const voterName = document.getElementById("voter-name");
  const votingGrid = document.getElementById("voting-grid");
  const submitVoteBtn = document.getElementById("submit-vote-btn");

  // --- SESSION RESULT SCREEN ELEMENTS ---
  const winnerBadge = document.getElementById("winner-badge");
  const winnerTitleText = document.getElementById("winner-title-text");
  const resultSecretWord = document.getElementById("result-secret-word");
  const resultImposterName = document.getElementById("result-imposter-name");
  const scoresTableBody = document.getElementById("scores-table-body");
  const replayBtn = document.getElementById("replay-btn");
  const editPlayersBtn = document.getElementById("edit-players-btn");
  const toLeaderboardBtn = document.getElementById("to-leaderboard-btn");

  // --- LEADERBOARD SCREEN ELEMENTS ---
  const standingsList = document.getElementById("standings-list");
  const lbHomeBtn = document.getElementById("lb-home-btn");
  const lbNewGameBtn = document.getElementById("lb-new-game-btn");

  // ==========================================
  // 3. NAVIGATION & UI HELPER FUNCTIONS
  // ==========================================

  function navigateTo(currentScreen, nextScreen) {
    if (currentScreen && nextScreen) {
      currentScreen.classList.add("hidden");
      nextScreen.classList.remove("hidden");
    }
  }

  function updateInputPlaceholders() {
    const rows = playersList.querySelectorAll(".player-input-row");
    rows.forEach((row, index) => {
      const input = row.querySelector(".player-name-input");
      if (input) {
        input.placeholder = `اسم اللاعب ${index + 1}`;
      }
    });
  }

  // ==========================================
  // 4. SETUP SCREEN: PLAYER ROW MANAGEMENT
  // ==========================================

  addPlayerBtn.addEventListener("click", () => {
    const currentRows = playersList.querySelectorAll(".player-input-row");

    if (currentRows.length >= 15) {
      alert("الحد الأقصى للاعبين هو 15 لاعب!");
      return;
    }

    const newRow = document.createElement("div");
    newRow.className = "player-input-row";
    newRow.innerHTML = `
      <input type="text" class="player-name-input" placeholder="اسم اللاعب ${currentRows.length + 1}" required />
      <button type="button" class="btn-delete-player" aria-label="حذف اللاعب">
        <span class="material-symbols-rounded">delete</span>
      </button>
    `;

    playersList.appendChild(newRow);
  });

  playersList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".btn-delete-player");
    if (!deleteBtn) return;

    const currentRows = playersList.querySelectorAll(".player-input-row");

    if (currentRows.length <= 3) {
      alert("يجب أن يكون هناك 3 لاعبين على الأقل!");
      return;
    }

    const rowToDelete = deleteBtn.closest(".player-input-row");
    if (rowToDelete) {
      rowToDelete.remove();
      updateInputPlaceholders();
    }
  });

  // ==========================================
  // 5. GAME START & MATCH INITIALIZATION
  // ==========================================

  startGameBtn.addEventListener("click", () => {
    const nameInputs = playersList.querySelectorAll(".player-name-input");
    const enteredNames = [];

    nameInputs.forEach((input) => {
      const trimmed = input.value.trim();
      if (trimmed !== "") {
        enteredNames.push(trimmed);
      }
    });

    if (enteredNames.length < 3) {
      alert("يرجى إدخال أسماء 3 لاعبين على الأقل لبدء اللعبة!");
      return;
    }

    gameState.players = enteredNames.map((name, idx) => new Player(idx + 1, name));
    gameState.resetMatchState();

    gameState.secretWord = wordManager.getRandomWord();
    const randomImposterIndex = Math.floor(Math.random() * gameState.players.length);
    gameState.imposterId = gameState.players[randomImposterIndex].id;

    updatePassPhoneScreen();
    navigateTo(setupScreen, passPhoneScreen);
  });

  // ==========================================
  // 6. PASS THE PHONE & REVEAL ROLE FLOW
  // ==========================================

  function updatePassPhoneScreen() {
    const activePlayer = gameState.players[gameState.currentPassIndex];
    if (activePlayer) {
      currentPlayerName.textContent = activePlayer.name;
    }
  }

  readyBtn.addEventListener("click", () => {
    const activePlayer = gameState.players[gameState.currentPassIndex];

    if (activePlayer.id === gameState.imposterId) {
      cardRegular.classList.add("hidden");
      cardSpy.classList.remove("hidden");
    } else {
      cardSpy.classList.add("hidden");
      cardRegular.classList.remove("hidden");
      secretWordText.textContent = gameState.secretWord;
    }

    navigateTo(passPhoneScreen, revealScreen);
  });

  doneTurnBtn.addEventListener("click", () => {
    gameState.currentPassIndex++;

    if (gameState.currentPassIndex < gameState.players.length) {
      updatePassPhoneScreen();
      navigateTo(revealScreen, passPhoneScreen);
    } else {
      navigateTo(revealScreen, roundInitScreen);
    }
  });

  // ==========================================
  // 7. CLUE ROUNDS LOGIC & FLOW
  // ==========================================

  roundStartBtn.addEventListener("click", () => {
    gameState.currentRound = 1;
    gameState.currentClueIndex = 0;
    updateClueTurnScreen();
    navigateTo(roundInitScreen, clueTurnScreen);
  });

  function updateClueTurnScreen() {
    const activePlayer = gameState.players[gameState.currentClueIndex];

    currentRoundNum.textContent = gameState.currentRound;
    totalRoundsNum.textContent = gameState.totalRounds;
    activePlayerName.textContent = activePlayer.name;
    cluePlayerCount.textContent = `${gameState.currentClueIndex + 1} / ${gameState.players.length}`;
  }

  nextTurnBtn.addEventListener("click", () => {
    gameState.currentClueIndex++;

    if (gameState.currentClueIndex < gameState.players.length) {
      updateClueTurnScreen();
    } else {
      if (gameState.currentRound < gameState.totalRounds) {
        gameState.currentRound++;
        gameState.currentClueIndex = 0;
        updateClueTurnScreen();
      } else {
        navigateTo(clueTurnScreen, votingInitScreen);
      }
    }
  });

  // ==========================================
  // 8. VOTING LOGIC & FLOW
  // ==========================================

  startVotingBtn.addEventListener("click", () => {
    gameState.currentVoterIndex = 0;
    gameState.votes = {};
    renderVotingTurn();
    navigateTo(votingInitScreen, votingScreen);
  });

  function renderVotingTurn() {
    const voter = gameState.players[gameState.currentVoterIndex];
    voterName.textContent = voter.name;
    gameState.selectedVoteTargetId = null;
    votingGrid.innerHTML = "";

    // Generate selectable cards for all other players
    gameState.players.forEach((targetPlayer) => {
      if (targetPlayer.id === voter.id) return; // Cannot vote for oneself

      const optionBtn = document.createElement("button");
      optionBtn.type = "button";
      optionBtn.className = "vote-option-btn";
      optionBtn.dataset.playerId = targetPlayer.id;
      optionBtn.innerHTML = `
        <span class="material-symbols-rounded vote-icon">person</span>
        <span class="player-name">${targetPlayer.name}</span>
      `;

      optionBtn.addEventListener("click", () => {
        const currentSelected = votingGrid.querySelector(".vote-option-btn.selected");
        if (currentSelected) currentSelected.classList.remove("selected");

        optionBtn.classList.add("selected");
        gameState.selectedVoteTargetId = targetPlayer.id;
      });

      votingGrid.appendChild(optionBtn);
    });
  }

  submitVoteBtn.addEventListener("click", () => {
    if (!gameState.selectedVoteTargetId) {
      alert("يرجى اختيار شخص للتصويت ضده قبل المتابعة!");
      return;
    }

    const voter = gameState.players[gameState.currentVoterIndex];
    gameState.votes[voter.id] = gameState.selectedVoteTargetId;

    gameState.currentVoterIndex++;

    if (gameState.currentVoterIndex < gameState.players.length) {
      renderVotingTurn();
    } else {
      calculateAndShowResults();
    }
  });

  // ==========================================
  // 9. SCORE CALCULATION & SESSION RESULT
  // ==========================================

  function calculateAndShowResults() {
    const totalPlayers = gameState.players.length;
    let correctVotesCount = 0;

    // Reset session scores before calculating
    gameState.players.forEach((p) => p.resetSessionScore());

    // Count how many voted correctly for the imposter
    gameState.players.forEach((voter) => {
      const votedId = gameState.votes[voter.id];
      if (votedId === gameState.imposterId) {
        correctVotesCount++;
      }
    });

    const isTeamWin = correctVotesCount >= Math.ceil(totalPlayers / 2);

    if (isTeamWin) {
      // Team Win Logic:
      // Members who voted correctly get +1 point. All others (including imposter) get 0.
      gameState.players.forEach((player) => {
        const votedTarget = gameState.votes[player.id];
        if (votedTarget === gameState.imposterId) {
          player.addScore(1);
        }
      });
    } else {
      // Imposter Win Logic:
      // Imposter gets +2 points. Anyone who guessed correctly gets +1 point.
      gameState.players.forEach((player) => {
        if (player.id === gameState.imposterId) {
          player.addScore(2);
        } else {
          const votedTarget = gameState.votes[player.id];
          if (votedTarget === gameState.imposterId) {
            player.addScore(1);
          }
        }
      });
    }

    // Update Result UI
    const imposterPlayer = gameState.players.find((p) => p.id === gameState.imposterId);
    resultSecretWord.textContent = gameState.secretWord;
    resultImposterName.textContent = imposterPlayer ? imposterPlayer.name : "غير معروف";

    if (isTeamWin) {
      winnerBadge.className = "winner-badge status-team-win";
      winnerTitleText.textContent = "فوز الفريق!";
    } else {
      winnerBadge.className = "winner-badge status-imposter-win";
      winnerTitleText.textContent = "فوز الجاسوس!";
    }

    // Render Scores Table
    scoresTableBody.innerHTML = "";
    gameState.players.forEach((player) => {
      const isImposter = player.id === gameState.imposterId;
      const tr = document.createElement("tr");
      if (isImposter) tr.className = "highlight-imposter";

      tr.innerHTML = `
        <td>
          <div class="player-cell">
            <span class="material-symbols-rounded">${isImposter ? "visibility_off" : "person"}</span>
            <span>${player.name}</span>
          </div>
        </td>
        <td class="session-score">+${player.sessionScore}</td>
        <td class="total-score">${player.totalScore}</td>
      `;
      scoresTableBody.appendChild(tr);
    });

    navigateTo(votingScreen, resultScreen);
  }

  // Session Result Navigation
  replayBtn.addEventListener("click", () => {
    // Replay with current players
    gameState.resetMatchState();
    gameState.secretWord = wordManager.getRandomWord();
    const randomImposterIndex = Math.floor(Math.random() * gameState.players.length);
    gameState.imposterId = gameState.players[randomImposterIndex].id;

    updatePassPhoneScreen();
    navigateTo(resultScreen, passPhoneScreen);
  });

  editPlayersBtn.addEventListener("click", () => {
    navigateTo(resultScreen, setupScreen);
  });

  toLeaderboardBtn.addEventListener("click", () => {
    renderLeaderboard();
    navigateTo(resultScreen, leaderboardScreen);
  });

  // ==========================================
  // 10. LEADERBOARD SCREEN LOGIC
  // ==========================================

  function renderLeaderboard() {
    // Sort players descending by totalScore
    const sortedPlayers = [...gameState.players].sort((a, b) => b.totalScore - a.totalScore);

    const rank1 = sortedPlayers[0];
    const rank2 = sortedPlayers[1];
    const rank3 = sortedPlayers[2];

    const rank1El = leaderboardScreen.querySelector(".podium-place.rank-1");
    const rank2El = leaderboardScreen.querySelector(".podium-place.rank-2");
    const rank3El = leaderboardScreen.querySelector(".podium-place.rank-3");

    if (rank1 && rank1El) {
      rank1El.querySelector(".podium-name").textContent = rank1.name;
      rank1El.querySelector(".podium-score").textContent = rank1.totalScore;
    }
    if (rank2 && rank2El) {
      rank2El.querySelector(".podium-name").textContent = rank2.name;
      rank2El.querySelector(".podium-score").textContent = rank2.totalScore;
    }
    if (rank3 && rank3El) {
      rank3El.querySelector(".podium-name").textContent = rank3.name;
      rank3El.querySelector(".podium-score").textContent = rank3.totalScore;
    }

    // Render Ranks 4+
    standingsList.innerHTML = "";
    const remainingPlayers = sortedPlayers.slice(3);

    if (remainingPlayers.length === 0) {
      standingsList.innerHTML = `<li class="standing-item"><span style="width: 100%; text-align: center;">لا يوجد أفراد آخرين في القائمة</span></li>`;
    } else {
      remainingPlayers.forEach((player, index) => {
        const li = document.createElement("li");
        li.className = "standing-item";
        li.innerHTML = `
          <span class="standing-rank">${index + 4}</span>
          <div class="standing-player">
            <span class="material-symbols-rounded player-icon">person</span>
            <span class="player-name">${player.name}</span>
          </div>
          <span class="standing-score">${player.totalScore} نقطة</span>
        `;
        standingsList.appendChild(li);
      });
    }
  }

  // Leaderboard Navigation
  lbHomeBtn.addEventListener("click", () => {
    // Return to first setup screen
    navigateTo(leaderboardScreen, setupScreen);
  });

  lbNewGameBtn.addEventListener("click", () => {
    // Start fresh session reset
    gameState.resetMatchState();
    gameState.secretWord = wordManager.getRandomWord();
    const randomImposterIndex = Math.floor(Math.random() * gameState.players.length);
    gameState.imposterId = gameState.players[randomImposterIndex].id;

    updatePassPhoneScreen();
    navigateTo(leaderboardScreen, passPhoneScreen);
  });

});