// ==========================================
// UI & DOM CONTROLLER MODULE (navigation.js)
// ==========================================

const UI = {
  // ----------------------------------------
  // 1. DOM ELEMENT REFERENCES
  // ----------------------------------------
  screens: {
    home: document.getElementById("home-screen"),
    setup: document.getElementById("setup-screen"),
    passPhone: document.getElementById("pass-phone-screen"),
    reveal: document.getElementById("reveal-screen"),
    roundInit: document.getElementById("round-initialization-screen"),
    clueTurn: document.getElementById("clue-turn-screen"),
    votingInit: document.getElementById("voting-initialization-screen"),
    voting: document.getElementById("voting-screen"),
    result: document.getElementById("result-screen"),
    leaderboard: document.getElementById("leaderboard-screen"),
  },

  modal: {
    rules: document.getElementById("rules-modal"),
  },

  setup: {
    playersList: document.getElementById("players-list"),
    addBtn: document.getElementById("add-player-btn"),
    startBtn: document.getElementById("start-game-btn"),
    keepScoresContainer: null,
    keepScoresCheckbox: null,
  },

  passPhone: {
    playerName: document.getElementById("current-player-name"),
    readyBtn: document.getElementById("ready-btn"),
  },

  reveal: {
    cardRegular: document.getElementById("card-regular"),
    cardSpy: document.getElementById("card-spy"),
    secretWordText: document.getElementById("secret-word-text"),
    doneBtn: document.getElementById("done-turn-btn"),
  },

  roundInit: {
    startBtn: document.getElementById("round-start-btn"),
  },

  clueTurn: {
    currentRoundNum: document.getElementById("current-round-num"),
    totalRoundsNum: document.getElementById("total-rounds-num"),
    activePlayerName: document.getElementById("active-player-name"),
    cluePlayerCount: document.getElementById("clue-player-count"),
    nextBtn: document.getElementById("next-turn-btn"),
  },

  votingInit: {
    startBtn: document.getElementById("start-voting-btn"),
  },

  voting: {
    voterName: document.getElementById("voter-name"),
    votingGrid: document.getElementById("voting-grid"),
    submitBtn: document.getElementById("submit-vote-btn"),
  },

  result: {
    winnerBadge: document.getElementById("winner-badge"),
    winnerTitleText: document.getElementById("winner-title-text"),
    secretWord: document.getElementById("result-secret-word"),
    imposterName: document.getElementById("result-imposter-name"),
    tableBody: document.getElementById("scores-table-body"),
    replayBtn: document.getElementById("replay-btn"),
    editPlayersBtn: document.getElementById("edit-players-btn"),
    toLeaderboardBtn: document.getElementById("to-leaderboard-btn"),
  },

  leaderboard: {
    homeBtn: document.getElementById("lb-home-btn"),
    newGameBtn: document.getElementById("lb-new-game-btn"),
    standingsList: document.getElementById("standings-list"),
  },

  selectedVotePlayerId: null,

  // ----------------------------------------
  // 2. NAVIGATION HELPERS
  // ----------------------------------------
  navigateTo(targetScreen) {
    Object.values(this.screens).forEach((screen) => {
      if (screen) screen.classList.add("hidden");
    });
    if (targetScreen) targetScreen.classList.remove("hidden");
  },

  openModal(modalElement) {
    if (modalElement) modalElement.classList.remove("hidden");
  },

  closeModal(modalElement) {
    if (modalElement) modalElement.classList.add("hidden");
  },

  // ----------------------------------------
  // 3. SETUP SCREEN DOM LOGIC
  // ----------------------------------------
  updateInputPlaceholders() {
    const rows = this.setup.playersList.querySelectorAll(".player-input-row");
    rows.forEach((row, index) => {
      const input = row.querySelector(".player-name-input");
      if (input) {
        input.placeholder = `اسم اللاعب ${index + 1}`;
      }
    });
  },

  addPlayerRow(nameValue = "") {
    const currentRows = this.setup.playersList.querySelectorAll(".player-input-row");
    if (currentRows.length >= 15) {
      alert("الحد الأقصى للاعبين هو 15 لاعب!");
      return;
    }

    const newRow = document.createElement("div");
    newRow.className = "player-input-row";
    newRow.innerHTML = `
      <input type="text" class="player-name-input" placeholder="اسم اللاعب ${currentRows.length + 1}" value="${nameValue}" required />
      <button type="button" class="btn-delete-player" aria-label="حذف اللاعب">
        <span class="material-symbols-rounded">delete</span>
      </button>
    `;

    this.setup.playersList.appendChild(newRow);
  },

  deletePlayerRow(deleteBtn) {
    const currentRows = this.setup.playersList.querySelectorAll(".player-input-row");
    if (currentRows.length <= 3) {
      alert("يجب أن يكون هناك 3 لاعبين على الأقل!");
      return;
    }

    const rowToDelete = deleteBtn.closest(".player-input-row");
    if (rowToDelete) {
      rowToDelete.remove();
      this.updateInputPlaceholders();
    }
  },

  getEnteredPlayerNames() {
    const nameInputs = this.setup.playersList.querySelectorAll(".player-name-input");
    const names = [];
    nameInputs.forEach((input) => {
      const trimmed = input.value.trim();
      if (trimmed !== "") names.push(trimmed);
    });
    return names;
  },

  ensureKeepScoresCheckbox() {
    if (this.setup.keepScoresContainer) return;

    const container = document.createElement("div");
    container.className = "keep-scores-option hidden";
    container.id = "keep-scores-container";
    container.style.margin = "15px 0";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";

    container.innerHTML = `
      <input type="checkbox" id="keep-scores-checkbox" checked />
      <label for="keep-scores-checkbox" style="font-size: 0.95rem; cursor: pointer;">
        الاحتفاظ بالنقاط الحالية للاعبين المسجلين سابقاً
      </label>
    `;

    this.setup.startBtn.parentNode.insertBefore(container, this.setup.startBtn);
    this.setup.keepScoresContainer = container;
    this.setup.keepScoresCheckbox = container.querySelector("#keep-scores-checkbox");
  },

  showKeepScoresOption(show = true) {
    this.ensureKeepScoresCheckbox();
    if (show) {
      this.setup.keepScoresContainer.classList.remove("hidden");
    } else {
      this.setup.keepScoresContainer.classList.add("hidden");
    }
  },

  shouldKeepScores() {
    return this.setup.keepScoresCheckbox ? this.setup.keepScoresCheckbox.checked : false;
  },

  populateSetupForEdit(existingPlayers) {
    this.setup.playersList.innerHTML = "";
    existingPlayers.forEach((player) => {
      this.addPlayerRow(player.name);
    });
    this.showKeepScoresOption(true);
    this.navigateTo(this.screens.setup);
  },

  // ----------------------------------------
  // 4. SCREEN RENDER METHODS
  // ----------------------------------------
  renderPassPhone(playerName) {
    this.passPhone.playerName.textContent = playerName;
    this.navigateTo(this.screens.passPhone);
  },

  renderRevealCard(isImposter, secretWord) {
    if (isImposter) {
      this.reveal.cardRegular.classList.add("hidden");
      this.reveal.cardSpy.classList.remove("hidden");
    } else {
      this.reveal.cardSpy.classList.add("hidden");
      this.reveal.cardRegular.classList.remove("hidden");
      this.reveal.secretWordText.textContent = secretWord;
    }
    this.navigateTo(this.screens.reveal);
  },

  renderRoundInit() {
    this.navigateTo(this.screens.roundInit);
  },

  renderClueTurn(playerName, currentTurnNum, totalPlayersNum, currentRound, totalRounds) {
    this.clueTurn.activePlayerName.textContent = playerName;
    this.clueTurn.currentRoundNum.textContent = currentRound;
    this.clueTurn.totalRoundsNum.textContent = totalRounds;
    this.clueTurn.cluePlayerCount.textContent = `${currentTurnNum} / ${totalPlayersNum}`;
    this.navigateTo(this.screens.clueTurn);
  },

  renderVotingInit() {
    this.navigateTo(this.screens.votingInit);
  },

  renderVotingTurn(voterPlayer, eligibleTargetPlayers) {
    this.voting.voterName.textContent = voterPlayer.name;
    this.voting.votingGrid.innerHTML = "";
    this.selectedVotePlayerId = null;

    eligibleTargetPlayers.forEach((target) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "vote-option-btn";
      btn.dataset.playerId = target.id;
      btn.innerHTML = `
        <span class="material-symbols-rounded vote-icon">person</span>
        <span class="player-name">${target.name}</span>
      `;

      btn.addEventListener("click", () => {
        const allBtns = this.voting.votingGrid.querySelectorAll(".vote-option-btn");
        allBtns.forEach((b) => {
          b.classList.remove("selected");
          b.style.borderColor = "";
          b.style.backgroundColor = "";
        });

        // Add visual highlight when player selects an option
        btn.classList.add("selected");
        btn.style.borderColor = "#ff4d4d";
        btn.style.backgroundColor = "rgba(255, 77, 77, 0.15)";
        this.selectedVotePlayerId = target.id;
      });

      this.voting.votingGrid.appendChild(btn);
    });

    this.navigateTo(this.screens.voting);
  },

  renderResult(sessionData) {
    const { isTeamWin, secretWord, imposterName, players } = sessionData;

    this.result.secretWord.textContent = secretWord;
    this.result.imposterName.textContent = imposterName;

    if (isTeamWin) {
      this.result.winnerBadge.className = "winner-badge status-team-win";
      this.result.winnerTitleText.textContent = "فوز الفريق!";
    } else {
      this.result.winnerBadge.className = "winner-badge status-imposter-win";
      this.result.winnerTitleText.textContent = "فوز الجاسوس!";
    }

    this.result.tableBody.innerHTML = "";
    players.forEach((player) => {
      const tr = document.createElement("tr");
      if (player.id === sessionData.imposterId) {
        tr.className = "highlight-imposter";
      }

      tr.innerHTML = `
        <td>
          <div class="player-cell">
            <span class="material-symbols-rounded">${player.id === sessionData.imposterId ? "visibility_off" : "person"}</span>
            <span>${player.name}</span>
          </div>
        </td>
        <td class="session-score">+${player.sessionScore}</td>
        <td class="total-score">${player.totalScore}</td>
      `;
      this.result.tableBody.appendChild(tr);
    });

    this.navigateTo(this.screens.result);
  },

  renderLeaderboard(players) {
    const sorted = [...players].sort((a, b) => b.totalScore - a.totalScore);

    const rank1 = sorted[0];
    const rank2 = sorted[1];
    const rank3 = sorted[2];

    const rank1El = this.screens.leaderboard.querySelector(".podium-place.rank-1");
    const rank2El = this.screens.leaderboard.querySelector(".podium-place.rank-2");
    const rank3El = this.screens.leaderboard.querySelector(".podium-place.rank-3");

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

    this.leaderboard.standingsList.innerHTML = "";
    const remaining = sorted.slice(3);

    if (remaining.length === 0) {
      this.leaderboard.standingsList.innerHTML = `
        <li class="standing-item">
          <span style="width:100%; text-align:center;">لا يوجد لاعبين آخرين في القائمة</span>
        </li>`;
    } else {
      remaining.forEach((player, idx) => {
        const li = document.createElement("li");
        li.className = "standing-item";
        li.innerHTML = `
          <span class="standing-rank">${idx + 4}</span>
          <div class="standing-player">
            <span class="material-symbols-rounded player-icon">person</span>
            <span class="player-name">${player.name}</span>
          </div>
          <span class="standing-score">${player.totalScore} نقطة</span>
        `;
        this.leaderboard.standingsList.appendChild(li);
      });
    }

    this.navigateTo(this.screens.leaderboard);
  },

  // ----------------------------------------
  // 5. EVENT BINDINGS (BRIDGING TO GAME LOGIC)
  // ----------------------------------------
  initEventListeners() {
    this.ensureKeepScoresCheckbox();

    // Home Navigation
    const homeStartBtn = document.querySelector(".home-buttons .btn-primary");
    const openRulesBtn = document.querySelector(".home-buttons .btn-secondary");
    const closeRulesBtn = document.getElementById("close-rules-btn");

    if (homeStartBtn) {
      homeStartBtn.addEventListener("click", () => {
        this.showKeepScoresOption(false);
        this.navigateTo(this.screens.setup);
      });
    }
    if (openRulesBtn) {
      openRulesBtn.addEventListener("click", () => this.openModal(this.modal.rules));
    }
    if (closeRulesBtn) {
      closeRulesBtn.addEventListener("click", () => this.closeModal(this.modal.rules));
    }

    // Setup Actions
    if (this.setup.addBtn) {
      this.setup.addBtn.addEventListener("click", () => this.addPlayerRow());
    }
    if (this.setup.playersList) {
      this.setup.playersList.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest(".btn-delete-player");
        if (deleteBtn) this.deletePlayerRow(deleteBtn);
      });
    }

    // Game Start
    if (this.setup.startBtn) {
      this.setup.startBtn.addEventListener("click", () => {
        const names = this.getEnteredPlayerNames();
        if (names.length < 3) {
          alert("يرجى إدخال أسماء 3 لاعبين على الأقل لبدء اللعبة!");
          return;
        }
        const keepScores = this.shouldKeepScores();
        if (window.GameLogic) {
          window.GameLogic.startMatch(names, keepScores);
        }
      });
    }

    // Pass Phone -> Reveal
    if (this.passPhone.readyBtn) {
      this.passPhone.readyBtn.addEventListener("click", () => {
        if (window.GameLogic) window.GameLogic.handleReadyToReveal();
      });
    }

    // Reveal -> Pass Phone / Round Init
    if (this.reveal.doneBtn) {
      this.reveal.doneBtn.addEventListener("click", () => {
        if (window.GameLogic) window.GameLogic.handleDoneRevealTurn();
      });
    }

    // Round Init -> Clue Phase
    if (this.roundInit.startBtn) {
      this.roundInit.startBtn.addEventListener("click", () => {
        if (window.GameLogic) window.GameLogic.startCluePhase();
      });
    }

    // Clue Turn -> Next
    if (this.clueTurn.nextBtn) {
      this.clueTurn.nextBtn.addEventListener("click", () => {
        if (window.GameLogic) window.GameLogic.handleNextClueTurn();
      });
    }

    // Voting Init -> Voting Turn Loop
    if (this.votingInit.startBtn) {
      this.votingInit.startBtn.addEventListener("click", () => {
        if (window.GameLogic) window.GameLogic.startVotingPhase();
      });
    }

    // Submit Vote
    if (this.voting.submitBtn) {
      this.voting.submitBtn.addEventListener("click", () => {
        if (!this.selectedVotePlayerId) {
          alert("يرجى اختيار شخص للتصويت ضده قبل المتابعة!");
          return;
        }
        if (window.GameLogic) {
          window.GameLogic.handleVoteSubmit(this.selectedVotePlayerId);
        }
      });
    }

    // Results Actions
    if (this.result.replayBtn) {
      this.result.replayBtn.addEventListener("click", () => {
        if (window.GameLogic) window.GameLogic.replayMatch();
      });
    }

    if (this.result.editPlayersBtn) {
      this.result.editPlayersBtn.addEventListener("click", () => {
        if (window.GameLogic) window.GameLogic.prepareEditPlayers();
      });
    }

    if (this.result.toLeaderboardBtn) {
      this.result.toLeaderboardBtn.addEventListener("click", () => {
        if (window.GameLogic) window.GameLogic.showLeaderboard();
      });
    }

    // Leaderboard Actions
    if (this.leaderboard.homeBtn) {
      this.leaderboard.homeBtn.addEventListener("click", () => {
        this.showKeepScoresOption(false);
        this.navigateTo(this.screens.home);
      });
    }

    if (this.leaderboard.newGameBtn) {
      this.leaderboard.newGameBtn.addEventListener("click", () => {
        if (window.GameLogic) window.GameLogic.replayMatch();
      });
    }
  }
};

// Initialize event listeners when DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  UI.initEventListeners();
});