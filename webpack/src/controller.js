import { player1, player2 } from "./functions";

import {
  createGameboardDOM,
  addEventOnNewShipButton,
  addEventOnGridClickAddShip,
  addEventOnGridClickAttack,
  addEventStartGameButton,
  addEventComputerButton,
} from "./DOM";

let player1BoardState = undefined;
let player2BoardState = undefined;

function initialiseDOM() {
  // runs the createGameboardDOM function for both players to make the DOM
  // uses the function from DOM.js
  createGameboardDOM(player1);
  player1BoardState = document.getElementById("player1-gameboard").innerHTML;
  createGameboardDOM(player2);
  player2BoardState = document.getElementById("player2-gameboard").innerHTML;
}

function initialiseEventListeners() {
  // addEventListenersToDOM();
  addEventOnNewShipButton();
  addEventOnGridClickAddShip();
  addEventOnGridClickAttack();
  addEventStartGameButton();
  addEventComputerButton();
}

export {
  initialiseDOM,
  initialiseEventListeners,
  player1BoardState,
  player2BoardState,
};
