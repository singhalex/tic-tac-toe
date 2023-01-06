/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

const Player = (symbol) => {
  const getSymbol = () => symbol;
  const ownedSquares = [];

  const updateSquares = (squareNumber) => {
    ownedSquares.push(squareNumber);
  };

  const getOwnedSquares = () => ownedSquares;

  return { getSymbol, updateSquares, getOwnedSquares };
};

const playerX = Player('X');
const playerO = Player('O');

const gameLogic = (() => {
  let _activePlayer = playerX;

  const getActivePlayer = () => _activePlayer;

  const changeActivePlayer = () => {
    if (_activePlayer === playerX) {
      _activePlayer = playerO;
    } else if (_activePlayer === playerO) {
      _activePlayer = playerX;
    }
  };

  const checkWinner = () => {
    if (_activePlayer.getOwnedSquares().includes(1)
      && _activePlayer.getOwnedSquares().includes(2)
      && _activePlayer.getOwnedSquares().includes(3)) {
      console.log('Winner!');
    }
    if (_activePlayer.getOwnedSquares().includes(4)
      && _activePlayer.getOwnedSquares().includes(5)
      && _activePlayer.getOwnedSquares().includes(6)) {
      console.log('Winner!');
    }
    if (_activePlayer.getOwnedSquares().includes(7)
      && _activePlayer.getOwnedSquares().includes(8)
      && _activePlayer.getOwnedSquares().includes(9)) {
      console.log('Winner!');
    }
    if (_activePlayer.getOwnedSquares().includes(1)
      && _activePlayer.getOwnedSquares().includes(4)
      && _activePlayer.getOwnedSquares().includes(7)) {
      console.log('Winner!');
    }
    if (_activePlayer.getOwnedSquares().includes(2)
      && _activePlayer.getOwnedSquares().includes(5)
      && _activePlayer.getOwnedSquares().includes(8)) {
      console.log('Winner!');
    }
    if (_activePlayer.getOwnedSquares().includes(3)
      && _activePlayer.getOwnedSquares().includes(6)
      && _activePlayer.getOwnedSquares().includes(9)) {
      console.log('Winner!');
    }
    if (_activePlayer.getOwnedSquares().includes(1)
      && _activePlayer.getOwnedSquares().includes(5)
      && _activePlayer.getOwnedSquares().includes(9)) {
      console.log('Winner!');
    }
    if (_activePlayer.getOwnedSquares().includes(3)
      && _activePlayer.getOwnedSquares().includes(5)
      && _activePlayer.getOwnedSquares().includes(7)) {
      console.log('Winner!');
    }
  };

  return { getActivePlayer, changeActivePlayer, checkWinner };
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
        if (square.innerText === '') {
          square.innerText = gameLogic.getActivePlayer().getSymbol();
          gameLogic.getActivePlayer().updateSquares(Number(square.dataset.index));
          gameLogic.checkWinner();
          gameLogic.changeActivePlayer();
        }
      });

      // Add squares to page
      boardContainer.appendChild(square);
    });
  })();

  return { getBoardArray };
})();
