import _ from "lodash";
import "./styles.css";
import { link } from "./functions";
import { createGameboardDOM } from "./DOM";
import { player1, player2 } from "./functions";
import { initialiseDOM, initialiseEventListeners } from "./controller";

initialiseDOM();
initialiseEventListeners();

function checkIfArrayLegal(coordinates) {
  let sortedArray = coordinates
    .slice()
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  return sortedArray;
}
// let testArray = [
//   [1, 2],
//   [1, 1],
//   [1, 3],
// ];
// let testArray = [
//   [0, 1],
//   [0, 0],
//   [0, 2],
// ];
// let testArray2 = [
//   [3, 5],
//   [3, 3],
//   [3, 4],
// ];
// let testArray3 = [
//   [5, 3],
//   [3, 3],
//   [4, 3],
// ];
// let testFunction = checkIfArrayLegal(testArray);
// let testFunction2 = checkIfArrayLegal(testArray2);
// let testFunction3 = checkIfArrayLegal(testArray3);

// console.log(testFunction);
// console.log(testFunction2);
// console.log(testFunction3);

// export { capitalise };
