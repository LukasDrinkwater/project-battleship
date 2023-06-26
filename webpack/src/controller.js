import { Ship, Gameboard, Player } from "./index";

let player1Board = new Gameboard();
let player2Board = new Gameboard();

let carrier = new Ship("carrier");
let battleship = new Ship("battleship");
let destroyer = new Ship("destroyer");
let submarine = new Ship("submarine");
let patrolBoart = new Ship("patrol boat");

player1Board.shipsArray.push(
  carrier,
  battleship,
  destroyer,
  submarine,
  patrolBoart
);
let player1 = new Player(player1Board);

player2Board.shipsArray.push(
  carrier,
  battleship,
  destroyer,
  submarine,
  patrolBoart
);
let player2 = new Player(player2Board);
