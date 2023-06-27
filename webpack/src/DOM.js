import { doc } from "prettier";
import { player1, player2 } from "./functions";

const domElements = {
  player1Container: document.getElementById("player1-container"),
  player1Misses: document.getElementById("player1-misses"),
  player1Gameboard: document.getElementById("player1-gameboard"),

  player2Container: document.getElementById("player2-container"),
  player2Misses: document.getElementById("player2-misses"),
  player2Gameboard: document.getElementById("player2-gameboard"),
};

// from the gameboard do a for loop to create the divs for each set of coordinates
// and for each one assign the data-coordinates property of the div to the coordinates
// that are being made.

function createGameboardDOM(player) {
  console.log(player1.board.boardArray);

  const playerBoard = player.board.boardArray;

  for (let i = 0; i < 10; i++) {
    let boardString = "";
    for (let j = 0; j < 10; j++) {
      boardString += `[${playerBoard[i][j]}] `;
      const gridSquare = document.createElement("div");
      gridSquare.classList.add("grid-square");
    }
    console.log(boardString);
  }
}

export { createGameboardDOM, domElements };
