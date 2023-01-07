/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

const Player = (symbol) => {
  const ownedSquares = [];
  let playerName = '';

  const getSymbol = () => symbol;

  const updateSquares = (squareNumber) => {
    ownedSquares.push(squareNumber);
  };

  const getOwnedSquares = () => ownedSquares;

  const updatePlayerName = (inputName) => {
    playerName = inputName;
  };

  const getPlayerName = () => playerName;

  const reset = () => {
    ownedSquares.length = 0;
    playerName = '';
  };

  return {
    getSymbol, updateSquares, getOwnedSquares, updatePlayerName, getPlayerName, reset,
  };
};

const playerX = Player('X');
const playerO = Player('O');

const gameLogic = (() => {
  let _activePlayer = playerX;
  let gameOver = false;

  const winnerAnnounce = document.getElementById('winner-announcement');
  const gameOverArea = document.getElementById('game-over-container');

  const startButton = document.getElementById('start-button');
  const playerXInput = document.getElementById('player-x-name');
  const playerOInput = document.getElementById('player-o-name');
  const playerNameArea = document.getElementById('player-names');

  const start = () => {
    playerNameArea.classList.remove('hidden');
    const boardContainer = document.getElementById('board-container');
    boardContainer.remove();
    gameLogic.reset();
    playerO.reset();
    playerX.reset();
  };

  const newGame = () => {
    if (playerXInput.value !== '' && playerOInput.value !== '') {
      playerX.updatePlayerName(playerXInput.value);
      playerO.updatePlayerName(playerOInput.value);
      playerXInput.value = '';
      playerOInput.value = '';
      playerNameArea.classList.add('hidden');
      board.render();
    }
  };

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
      winnerAnnounce.innerText = `${_activePlayer.getPlayerName()} is the winner!`;
      gameOverArea.classList.remove('hidden');
      gameEnd();
    } else if (_activePlayer.getOwnedSquares().length === 5) {
      winnerAnnounce.innerText = "It's a tie!";
      gameOverArea.classList.remove('hidden');
      gameEnd();
    }
  };

  const isGameOver = () => gameOver;
  const reset = () => {
    _activePlayer = playerX;
    gameOver = false;
  };

  const newGameButton = document.getElementById('new-game');
  newGameButton.addEventListener('click', () => {
    start();
  });

  startButton.addEventListener('click', () => {
    gameLogic.newGame();
  });

  return {
    getActivePlayer, changeActivePlayer, checkWinner, isGameOver, reset, newGame,
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
