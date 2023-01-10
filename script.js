/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

const userInterface = (() => {
  // Get DOM elements
  const gameOverArea = document.getElementById('game-over-container');
  const winnerAnnounce = document.getElementById('winner-announcement');

  const playerNameArea = document.getElementById('player-names');
  const playerXInput = document.getElementById('player-x-name');
  const playerOInput = document.getElementById('player-o-name');
  const startButton = document.getElementById('start-button');
  const newGameButton = document.getElementById('new-game');

  const startGame = () => {
    // Sets the player names based on input fields and creates the board
    if (playerXInput.value !== '' && playerOInput.value !== '') {
      playerX.updatePlayerName(playerXInput.value);
      playerO.updatePlayerName(playerOInput.value);
      playerXInput.value = '';
      playerOInput.value = '';
      playerNameArea.classList.add('hidden');
      board.render();
    }
  };
  startButton.addEventListener('click', () => {
    startGame();
  });

  const newGame = () => {
    // Reverts page to starting state

    playerNameArea.classList.remove('hidden');
    const boardContainer = document.getElementById('board-container');
    gameOverArea.classList.add('hidden');

    // Deletes the board
    boardContainer.remove();

    gameLogic.reset();
    playerO.reset();
    playerX.reset();
  };
  newGameButton.addEventListener('click', () => {
    newGame();
  });

  const announceWinner = (activePlayer) => {
    gameOverArea.classList.remove('hidden');
    winnerAnnounce.innerText = `${activePlayer.getPlayerName()} is the winner!`;
  };

  const announceTie = () => {
    gameOverArea.classList.remove('hidden');
    winnerAnnounce.innerText = "It's a tie!";
  };

  return {
    announceWinner, announceTie,
  };
})();

const Player = (symbol) => {
  // Initial values
  const ownedSquares = [];
  let playerName = '';

  // Returns the player's symbol
  const getSymbol = () => symbol;

  // Adds the number of the board square to the player's square array
  const updateSquares = (squareNumber) => {
    ownedSquares.push(squareNumber);
  };

  const getOwnedSquares = () => ownedSquares;

  const updatePlayerName = (inputName) => {
    playerName = inputName;
  };

  const getPlayerName = () => playerName;

  // Puts the player variables back to their initial values
  const reset = () => {
    ownedSquares.length = 0;
    playerName = '';
  };

  return {
    getSymbol, updateSquares, getOwnedSquares, updatePlayerName, getPlayerName, reset,
  };
};

// Create the 2 players
const playerX = Player('X');
const playerO = Player('O');

const gameLogic = (() => {
  // Sets the first player and game over state
  let _activePlayer = playerX;
  let gameOver = false;

  const getActivePlayer = () => _activePlayer;

  const changeActivePlayer = () => {
    if (_activePlayer === playerX) {
      _activePlayer = playerO;
    } else if (_activePlayer === playerO) {
      _activePlayer = playerX;
    }
  };

  const gameEnd = () => {
    gameOver = true;
  };

  const checkWinner = () => {
    if ((_activePlayer.getOwnedSquares().includes(1)
      && _activePlayer.getOwnedSquares().includes(2)
      && _activePlayer.getOwnedSquares().includes(3))

      || (_activePlayer.getOwnedSquares().includes(4)
      && _activePlayer.getOwnedSquares().includes(5)
      && _activePlayer.getOwnedSquares().includes(6))

      || (_activePlayer.getOwnedSquares().includes(7)
      && _activePlayer.getOwnedSquares().includes(8)
      && _activePlayer.getOwnedSquares().includes(9))

      || (_activePlayer.getOwnedSquares().includes(1)
      && _activePlayer.getOwnedSquares().includes(4)
      && _activePlayer.getOwnedSquares().includes(7))

      || (_activePlayer.getOwnedSquares().includes(2)
      && _activePlayer.getOwnedSquares().includes(5)
      && _activePlayer.getOwnedSquares().includes(8))

      || (_activePlayer.getOwnedSquares().includes(3)
      && _activePlayer.getOwnedSquares().includes(6)
      && _activePlayer.getOwnedSquares().includes(9))

      || (_activePlayer.getOwnedSquares().includes(1)
      && _activePlayer.getOwnedSquares().includes(5)
      && _activePlayer.getOwnedSquares().includes(9))

      || (_activePlayer.getOwnedSquares().includes(3)
      && _activePlayer.getOwnedSquares().includes(5)
      && _activePlayer.getOwnedSquares().includes(7))
    ) {
      userInterface.announceWinner(_activePlayer);
      gameEnd();
    } else if (_activePlayer.getOwnedSquares().length === 5) {
      userInterface.announceTie();
      gameEnd();
    }
  };

  const isGameOver = () => gameOver;

  const reset = () => {
    _activePlayer = playerX;
    gameOver = false;
  };

  return {
    getActivePlayer, changeActivePlayer, checkWinner, isGameOver, reset,
  };
})();

const board = (() => {
  const _squares = Array.from(Array(9).keys());

  const getBoardArray = () => _squares;

  const render = (() => {
    const playerNameArea = document.getElementById('player-names');
    const boardContainer = document.createElement('div');
    boardContainer.setAttribute('id', 'board-container');
    playerNameArea.insertAdjacentElement('afterend', boardContainer);

    _squares.forEach((i) => {
      // Create elements and add classes
      const square = document.createElement('li');
      square.classList.add('square');
      square.dataset.index = `${(_squares[i] + 1)}`;

      // Change text on click
      square.addEventListener('click', () => {
        if (gameLogic.isGameOver()) {
          console.log('game over');
        } else if (square.innerText === '') {
          square.innerText = gameLogic.getActivePlayer().getSymbol();
          gameLogic.getActivePlayer().updateSquares(Number(square.dataset.index));
          gameLogic.checkWinner();
          gameLogic.changeActivePlayer();
        }
      });

      // Add squares to page
      boardContainer.appendChild(square);
    });
  });

  return { getBoardArray, render };
})();
