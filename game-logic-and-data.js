// ==========================================
// GAME LOGIC & DATA LAYER (game-logic.js)
// ==========================================

/**
 * Class representing a Player in the game.
 */
class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name.trim();
    this.sessionScore = 0; // Score earned in the current match
    this.totalScore = 0;   // Cumulative score across multiple matches
  }

  /**
   * Adds points to both the current round and total game score.
   */
  addScore(points) {
    if (typeof points === "number" && points > 0) {
      this.sessionScore += points;
      this.totalScore += points;
    }
  }

  /**
   * Resets only the current session score for a new match.
   */
  resetSessionScore() {
    this.sessionScore = 0;
  }
}

/**
 * Array of words used for game rounds.
 */
const allWords = [
  "قطة", "كلب", "تفاحة", "موز", "بيتزا", "سيارة", "حافلة", "مدرسة", "معلم", "طبيب",
  "منزل", "هاتف", "حاسوب", "كتاب", "كرسي", "طاولة", "ماء", "قهوة", "شمس", "قمر",
  "نجمة", "شجرة", "زهرة", "سمكة", "طائر", "أسد", "فيل", "كرة قدم", "كرة سلة", "جيتار",
  "بيانو", "كاميرا", "تلفاز", "مستشفى", "مطار", "شاطئ", "جبل", "نهر", "مطر", "ثلج",
  "عيد ميلاد", "عرس", "مطعم", "سوبرماركت", "شرطي", "رجل إطفاء", "ملك", "ملكة", "روبوت", "قطار",
  "بركان", "تلسكوب", "غواصة", "مروحية", "لوح تزلج", "دراجة نارية", "سيارة إسعاف", "شارع", "متحف", "مكتبة",
  "قلعة", "هرم", "شلال", "صحراء", "غابة", "جزيرة", "جواز سفر", "حقيبة سفر", "حديقة", "منظار",
  "مقلاه", "سماعات", "ساعة ذكية", "لوحة مفاتيح", "مسحبه", "طابعة", "آلة حاسبة", "مصعد", "مصباح", "ثلاجة",
  "فشار", "همبرغر", "سوشي", "فطيرة", "شوكولاتة", "جوز الهند", "أناناس", "أفوكادو", "تمساح", "بطريق",
  "كنغر", "دلفين", "أخطبوط", "فراشة", "رائد فضاء", "محقق", "مصور", "مهندس معماري", "لاعب كرة قدم", "ساحر",
  "قمامة", "كوكب", "حداد", "عالم آثار", "سُلم", "خريطة", "عظام", "طبيب بيطري", "سجن", "جمل",
  "رمل", "كيس", "طبل", "سماعة", "مسلسل", "آلة", "فلوس", "ثريا", "حزام", "سم سم",
  "شاحن", "شباك", "عسل", "شبام حضرموت", "جبال", "قلعة القاهرة", "جسر", "سفينه", "شاهي", "قمر",
  "قهوة", "ستارة", "صمغ", "صحن", "شعر", "سماء", "ذكاء صناعي", "بنت الصحن", "فأر", "قوس قزح",
  "دباسة ورق", "فرشاه اسنان", "شميز", "زعفران", "رصاصة", "كرواسون", "خبز مخمر"
];

/**
 * Manages word selection and ensures non-repeating words during game sessions.
 */
const wordManager = {
  usedWords: new Set(),

  getRandomWord() {
    if (!allWords || allWords.length === 0) return "كلمة سرية";
    
    // Reset pool if all words have been used once
    if (this.usedWords.size >= allWords.length) {
      this.usedWords.clear();
    }

    let selectedWord;
    do {
      const randomIndex = Math.floor(Math.random() * allWords.length);
      selectedWord = allWords[randomIndex];
    } while (this.usedWords.has(selectedWord));

    this.usedWords.add(selectedWord);
    return selectedWord;
  }
};

/**
 * Main state container and game logic engine exposed globally via window.GameLogic
 */
window.GameLogic = {
  players: [],
  imposterId: null,
  secretWord: "",

  // Turn Indices
  currentPassIndex: 0,
  currentRound: 1,
  totalRounds: 2,
  currentClueIndex: 0,

  // Voting Trackers
  currentVoterIndex: 0,
  votes: {},

  /**
   * Clears state for a new match while maintaining players and total scores.
   */
  resetMatchState() {
    this.imposterId = null;
    this.secretWord = "";
    this.currentPassIndex = 0;
    this.currentRound = 1;
    this.currentClueIndex = 0;
    this.currentVoterIndex = 0;
    this.votes = {};
    this.players.forEach((p) => p.resetSessionScore()); 

  
  },
    

  /**
   * Initializes a brand-new game session with player names.
   * Option to retain existing scores if setup is edited during play.
   */
  startMatch(enteredNames, keepScores = false) {
    if (keepScores) {
      // Map names to existing Player objects if present, else create new ones
      this.players = enteredNames.map((name, idx) => {
        const existing = this.players.find((p) => p.name === name);
        if (existing) {
          existing.id = idx + 1;
          return existing;
        }
        return new Player(idx + 1, name);
      });
    } else {
      this.players = enteredNames.map((name, idx) => new Player(idx + 1, name));
    }

    this.resetMatchState();

    // Select Secret Word & Imposter
    this.secretWord = wordManager.getRandomWord();
    const randomIndex = Math.floor(Math.random() * this.players.length);
    this.imposterId = this.players[randomIndex].id;

    // Trigger UI Pass Phone Phase
    const firstPlayer = this.players[this.currentPassIndex];
    UI.renderPassPhone(firstPlayer.name);
  },

  /**
   * Triggered when the current player clicks "Ready" to reveal their secret role.
   */
  handleReadyToReveal() {
    const activePlayer = this.players[this.currentPassIndex];
    const isImposter = activePlayer.id === this.imposterId;
    UI.renderRevealCard(isImposter, this.secretWord);
  },

  /**
   * Advances pass-the-phone turn to the next player or finishes the phase.
   */
  handleDoneRevealTurn() {
    this.currentPassIndex++;

    if (this.currentPassIndex < this.players.length) {
      const nextPlayer = this.players[this.currentPassIndex];
      UI.renderPassPhone(nextPlayer.name);
    } else {
      UI.renderRoundInit();
    }
  },

  /**
   * Initializes clue-giving rounds.
   */
  startCluePhase() {
    this.currentRound = 1;
    this.currentClueIndex = 0;
    this.renderCurrentClueTurn();
  },

  renderCurrentClueTurn() {
    const activePlayer = this.players[this.currentClueIndex];
    UI.renderClueTurn(
      activePlayer.name,
      this.currentClueIndex + 1,
      this.players.length,
      this.currentRound,
      this.totalRounds
    );
  },

  /**
   * Steps through players giving clues, advancing rounds when complete.
   */
  handleNextClueTurn() {
    this.currentClueIndex++;

    if (this.currentClueIndex < this.players.length) {
      this.renderCurrentClueTurn();
    } else {
      if (this.currentRound < this.totalRounds) {
        this.currentRound++;
        this.currentClueIndex = 0;
        this.renderCurrentClueTurn();
      } else {
        UI.renderVotingInit();
      }
    }
  },

  /**
   * Prepares voting state and launches voting step.
   */
  startVotingPhase() {
    this.currentVoterIndex = 0;
    this.votes = {};
    this.renderCurrentVotingTurn();
  },

  renderCurrentVotingTurn() {
    const voter = this.players[this.currentVoterIndex];
    // Filter out the voter so they cannot vote for themselves
    const targets = this.players.filter((p) => p.id !== voter.id);
    UI.renderVotingTurn(voter, targets);
  },

  /**
   * Registers a vote and triggers the next player's voting view or calculates final results.
   */
  handleVoteSubmit(targetPlayerId) {
    const voter = this.players[this.currentVoterIndex];
    this.votes[voter.id] = parseInt(targetPlayerId, 10);

    this.currentVoterIndex++;

    if (this.currentVoterIndex < this.players.length) {
      this.renderCurrentVotingTurn();
    } else {
      this.calculateResultsAndShow();
    }
  },

  /**
   * Calculates votes, awards scores according to game logic, and updates results UI.
   */
  calculateResultsAndShow() {
    const totalPlayers = this.players.length;
    let correctVotesCount = 0;

    this.players.forEach((p) => p.resetSessionScore());

    // Count how many players successfully voted for the imposter
    this.players.forEach((voter) => {
      const votedTargetId = this.votes[voter.id];
      if (votedTargetId === this.imposterId) {
        correctVotesCount++;
      }
    });

    // Team wins if majority correctly identifies the imposter
    const isTeamWin = correctVotesCount >= Math.ceil(totalPlayers / 2);

    if (isTeamWin) {
      // Team Win: Players who voted correctly receive +1 point
      this.players.forEach((player) => {
        if (this.votes[player.id] === this.imposterId) {
          player.addScore(1);
        }
      });
    } else {
      // Imposter Win: Imposter gets +2 points, correct voters still get +1 point
      this.players.forEach((player) => {
        if (player.id === this.imposterId) {
          player.addScore(2);
        } else if (this.votes[player.id] === this.imposterId) {
          player.addScore(1);
        }
      });
    }

    const imposterPlayer = this.players.find((p) => p.id === this.imposterId);

    UI.renderResult({
      isTeamWin,
      secretWord: this.secretWord,
      imposterId: this.imposterId,
      imposterName: imposterPlayer ? imposterPlayer.name : "غير معروف",
      players: this.players
    });
  },
  
  resetToNewGame() {
    this.players = [];
    this.resetMatchState();
    UI.resetSetupScreen();
  },

  /**
   * Restarts a match directly with the current active players.
   */
  replayMatch() {
    const currentNames = this.players.map((p) => p.name);
    this.startMatch(currentNames, true);
  },

  /**
   * Prepares setup UI for editing player names without losing current points.
   */
  prepareEditPlayers() {
    UI.populateSetupForEdit(this.players);
  },

  /**
   * Displays leaderboard screen populated with current total player scores.
   */
  showLeaderboard() {
    UI.renderLeaderboard(this.players);
  }
  
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Player, wordManager, GameLogic: window.GameLogic };
}