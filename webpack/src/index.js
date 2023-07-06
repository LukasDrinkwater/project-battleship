import _ from "lodash";
import "./styles.css";
import { link } from "./functions";
import { createGameboardDOM } from "./DOM";
import { player1, player2 } from "./functions";
import { initialiseDOM, initialiseEventListeners } from "./controller";

initialiseDOM();
initialiseEventListeners();

function checkIfArrayLegal(coordinates) {
  let sortedArray = coordinates.sort((a, b) => a[1] - b[1]);
  return sortedArray;
}
let testArray = [
  [1, 2],
  [1, 1],
  [1, 3],
];
let testFunction = checkIfArrayLegal(testArray);

console.log(testFunction);

// export { capitalise };
