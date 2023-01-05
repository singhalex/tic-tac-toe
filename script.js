/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

const Player = (symbol) => {
  const getSymbol = () => symbol;

  return { getSymbol };
};

const playerX = Player('X');
const playerO = Player('O');

const gameLogic = (() => {
  let activePlayer = playerX;

  const getActivePlayer = () => activePlayer;

  const changeActivePlayer = () => {
    if (activePlayer === playerX) {
      activePlayer = playerO;
    } else if (activePlayer === playerO) {
      activePlayer = playerX;
    }
  };

  return { getActivePlayer, changeActivePlayer };
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
          gameLogic.changeActivePlayer();
        }
      });

      // Add squares to page
      boardContainer.appendChild(square);
    });
  })();

  return { getBoardArray };
})();
