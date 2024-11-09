const characters = [
    "character1.JPG", "character2.JPG", "character3.JPG", "character4.JPG",
    "character5.JPG", "character6.JPG", "character7.JPG", "character8.jpg"
  ];
  let gridSize = 4;
  const gameBoard = document.getElementById("game-board");
  const playerTurnDisplay = document.getElementById("player-turn");
  const scoreDisplay = document.getElementById("score");
  const movesDisplay = document.getElementById("moves");
  const restartButton = document.getElementById("restart");
  
  let cards = [];
  let shuffledCards = [];
  let firstCard = null;
  let secondCard = null;
  let playerTurn = 1;
  let player1Score = 0;
  let player2Score = 0;
  let matchesFound = 0;
  let movesCount = 0;
  let isChecking = false;
  
  function generateCards() {
    const selectedCharacters = characters.slice(0, (gridSize * gridSize) / 2);
    cards = [...selectedCharacters, ...selectedCharacters];
    shuffledCards = cards.sort(() => Math.random() - 0.5);
  }
  
  function createCard(character) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.character = character;
    card.style.backgroundImage = 'url("img/card-back.JPEG")';
    card.addEventListener("click", handleCardClick);
    return card;
  }
  
  function handleCardClick(event) {
    const card = event.target;
    if (isChecking || card.classList.contains("revealed") || card.classList.contains("matched")) {
      return;
    }
  
    card.classList.add("revealed");
    card.style.backgroundImage = `url("img/${card.dataset.character}")`;
  
    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      isChecking = true;
      setTimeout(checkForMatch, 1000);
    }
  }
  
  function checkForMatch() {
    movesCount++;
    movesDisplay.textContent = `number of turns: ${movesCount}`;
  
    if (firstCard.dataset.character === secondCard.dataset.character) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      updateScore();
      matchesFound++;
      if (matchesFound === cards.length / 2) {
        endGame();
      }
    } else {
      firstCard.classList.remove("revealed");
      secondCard.classList.remove("revealed");
      firstCard.style.backgroundImage = 'url("img/card-back.JPEG")'; 
      secondCard.style.backgroundImage = 'url("img/card-back.JPEG")';
      switchPlayer();
    }
    firstCard = null;
    secondCard = null;
    isChecking = false;
  }
  
  function updateScore() {
    if (playerTurn === 1) {
      player1Score++;
    } else {
      player2Score++;
    }
    scoreDisplay.textContent = `player 1: ${player1Score} --- player 2: ${player2Score}`;
  }
  
  function switchPlayer() {
    playerTurn = playerTurn === 1 ? 2 : 1;
    playerTurnDisplay.textContent = `turn of player ${playerTurn}`;
  }
  
  function endGame() {
    const winner = player1Score === player2Score ? "draw!" : `win player ${player1Score > player2Score ? 1 : 2}`;
    alert(`Game Over! ${winner}`);
  }
  
  function resetGame() {
    gameBoard.innerHTML = "";
    player1Score = 0;
    player2Score = 0;
    playerTurn = 1;
    movesCount = 0;
    matchesFound = 0;
    firstCard = null;
    secondCard = null;
    isChecking = false;
    scoreDisplay.textContent = "player 1: 0 --- player 2: 0";
    playerTurnDisplay.textContent = "turn of player 1";
    movesDisplay.textContent = "number of turns: 0";
    generateCards();
    shuffledCards.forEach((character) => {
      const card = createCard(character);
      gameBoard.appendChild(card);
    });
  }
  
  restartButton.addEventListener("click", resetGame);
  
  generateCards();
  shuffledCards.forEach((character) => {
    const card = createCard(character);
    gameBoard.appendChild(card);
  });
  