const { Player, wordManager, GameLogic } = require('./game-logic-and-data.js');

describe('Player Class Tests', () => {
  test('creates player with trimmed name and zero initial scores', () => {
    const player = new Player(1, "  Samaa  ");
    expect(player.id).toBe(1);
    expect(player.name).toBe("Samaa");
    expect(player.sessionScore).toBe(0);
    expect(player.totalScore).toBe(0);
  });

  test('addScore increases both sessionScore and totalScore for valid positive numbers', () => {
    const player = new Player(1, "Ahmed");
    player.addScore(3);
    expect(player.sessionScore).toBe(3);
    expect(player.totalScore).toBe(3);
  });

  test('addScore ignores invalid inputs and negative numbers', () => {
    const player = new Player(1, "Ahmed");
    player.addScore(-5);
    player.addScore("invalid");
    expect(player.sessionScore).toBe(0);
    expect(player.totalScore).toBe(0);
  });
});

describe('GameLogic Module Tests', () => {
  // Mock UI object to prevent browser DOM errors during automated execution
  global.UI = {
    renderPassPhone: jest.fn(),
    renderResult: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('startMatch initializes players, picks secret word, selects imposter, and calls UI', () => {
    const playerNames = ["Player1", "Player2", "Player3"];
    GameLogic.startMatch(playerNames, false);

    expect(GameLogic.players.length).toBe(3);
    expect(typeof GameLogic.secretWord).toBe('string');
    expect(GameLogic.secretWord.length).toBeGreaterThan(0);
    expect(GameLogic.imposterId).not.toBeNull();
    expect(global.UI.renderPassPhone).toHaveBeenCalledWith("Player1");
  });

  test('calculateResultsAndShow awards 1 point to voters when Team wins (majority votes imposter)', () => {
    const playerNames = ["Player1", "Player2", "Player3"];
    GameLogic.startMatch(playerNames, false);

    const imposterId = GameLogic.imposterId;
    const teamMembers = GameLogic.players.filter((p) => p.id !== imposterId);

    // Both team members correctly vote for the imposter
    GameLogic.votes = {};
    GameLogic.votes[teamMembers[0].id] = imposterId;
    GameLogic.votes[teamMembers[1].id] = imposterId;
    GameLogic.votes[imposterId] = teamMembers[0].id;

    GameLogic.calculateResultsAndShow();

    // Majority caught the imposter -> Team members get +1 point
    expect(teamMembers[0].sessionScore).toBe(1);
    expect(teamMembers[1].sessionScore).toBe(1);

    const imposterPlayer = GameLogic.players.find((p) => p.id === imposterId);
    expect(imposterPlayer.sessionScore).toBe(0);
    expect(global.UI.renderResult).toHaveBeenCalled();
  });
});

describe('player class', () => {
  test('it should make the player session score to zero', () => {
    // 1. Arrange
    const player = new Player(2, "Galal"); 
    player.sessionScore = 5; 
    player.totalScore = 10; 

    // 2. Act
    player.resetSessionScore();
    
    // 3. Assert
    expect(player.sessionScore).toBe(0); 
    expect(player.totalScore).toBe(10); 
  });
});

describe('word manager', () => {
  test('it should get a random word from the word data', () => {
    // 1. Act
    const word = wordManager.getRandomWord(); 
    
    // 2. Assert
    expect(typeof word).toBe('string'); 
    expect(word.length).toBeGreaterThan(0);
  });
});