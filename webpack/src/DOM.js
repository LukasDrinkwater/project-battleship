import { doc } from "prettier";
import { player1, player2 } from "./functions";

const domElements = {
  player1ContainerDOM: document.getElementById("player1-container"),
  player1MissesDOM: document.getElementById("player1-misses"),
  player1GameboardDOM: document.getElementById("player1-gameboard"),

  player2ContainerDOM: document.getElementById("player2-container"),
  player2MissesDOM: document.getElementById("player2-misses"),
  player2GameboardDOM: document.getElementById("player2-gameboard"),
};

// from the gameboard do a for loop to create the divs for each set of coordinates
// and for each one assign the data-coordinates property of the div to the coordinates
// that are being made.

function createGameboardDOM(player) {
  console.log(player1.board.boardArray);

  const playerBoard = player.board.boardArray;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let coordinatesValue = playerBoard[i][j];
      const gridSquare = document.createElement("div");
      gridSquare.classList.add("grid-square");
      gridSquare.setAttribute("data-coordinates", coordinatesValue);

      if (player.playerName === "player1") {
        gridSquare.classList.add(`${player.playerName}-grid-square`);
        gridSquare.setAttribute("data-playerName", player.playerName);
        domElements.player1GameboardDOM.appendChild(gridSquare);
      } else {
        gridSquare.classList.add(`${player.playerName}-grid-square`);
        domElements.player2GameboardDOM.appendChild(gridSquare);
        gridSquare.setAttribute("data-playerName", player.playerName);
      }
    }
  }
  domElements.gridSquares = document.getElementsByClassName("grid-square");
  // if (player.playerName === "player1") {
  //   domElements.player1GridSquares = document.getElementsByClassName(
  //     "player1-grid-square"
  //   );
  // } else {
  //   domElements.player1GridSquares = document.getElementsByClassName(
  //     "player2-grid-square"
  //   );
  // }
}

function playerAttack(player) {}

function addEventListenersToDOM() {
  const gridSquares = domElements.gridSquares;
  Array.from(gridSquares).forEach((square) => {
    square.addEventListener("click", () => {
      // Get the relevant info, player name from data attribute on DIV
      // Get grid coordinates.
      let squareCoordinates = square.getAttribute("data-coordinates");
      let playerNameFromSquare = square.getAttribute("data-playername");
      if (playerNameFromSquare == "player1") {
        player2.board.receiveAttack(squareCoordinates);
      }

      // if to assgin the correct varaible
      // Call the hit method on the correct player object.
    });
  });

  // use data-playername to run the mothods against the correct player object
}

export { createGameboardDOM, domElements, addEventListenersToDOM };
