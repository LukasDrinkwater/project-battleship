import { player1, player2 } from "./functions";

import {
  createGameboardDOM,
  addEventOnNewShipButton,
  addEventOnGridClickAddShip,
  addEventOnGridClickAttack,
  addEventStartGameButton,
  addEventComputerButton,
} from "./DOM";

function initialiseDOM() {
  // runs the createGameboardDOM function for both players to make the DOM
  // uses the function from DOM.js
  createGameboardDOM(player1);
  createGameboardDOM(player2);
}

function initialiseEventListeners() {
  // addEventListenersToDOM();
  addEventOnNewShipButton();
  addEventOnGridClickAddShip();
  addEventOnGridClickAttack();
  addEventStartGameButton();
  addEventComputerButton();
}

export { initialiseDOM, initialiseEventListeners };
