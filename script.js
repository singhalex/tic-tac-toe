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

  return {
    getSymbol, updateSquares, getOwnedSquares, updatePlayerName, getPlayerName,
  };
};

const playerX = Player('X');
const playerO = Player('O');

const gameLogic = (() => {
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
      console.log(`${_activePlayer.getPlayerName()} is the winner!`);
      gameEnd();
    } else if (_activePlayer.getOwnedSquares().length === 5) {
      console.log("It's a tie!");
      gameEnd();
    }
  };

  const isGameOver = () => gameOver;

  return {
    getActivePlayer, changeActivePlayer, checkWinner, isGameOver,
  };
})();

const board = (() => {
  const _squares = Array.from(Array(9).keys());

  const getBoardArray = () => _squares;

  const init = (() => {
    const boardContainer = document.getElementById('board-container');

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

  return { getBoardArray, init };
})();

const startButton = document.getElementById('start_button');
const playerXInput = document.getElementById('player_x_name');
const playerOInput = document.getElementById('player_o_name');
const playerNameArea = document.getElementById('player_names');
const inputError = document.getElementById('input_error');

startButton.addEventListener('click', () => {
  if (playerXInput.value !== '' && playerOInput.value !== '') {
    playerX.updatePlayerName(playerXInput.value);
    playerO.updatePlayerName(playerOInput.value);
    playerXInput.value = '';
    playerOInput.value = '';
    playerNameArea.classList.add('hidden');
    board.init();
  }
});
