import { Ship, Gameboard, Player } from "./classes";

let player1Board = new Gameboard();
let player2Board = new Gameboard();

let carrier = new Ship("carrier", 5);
let battleship = new Ship("battleship", 4);
let destroyer = new Ship("destroyer", 3);
let submarine = new Ship("submarin", 3);
let patrolBoart = new Ship("patrol boat", 2);

player1Board.shipsArray.push(
  carrier,
  battleship,
  destroyer,
  submarine,
  patrolBoart
);
let player1 = new Player(player1Board, "player1", true);
player1.board.createGameboard();

player2Board.shipsArray.push(
  carrier,
  battleship,
  destroyer,
  submarine,
  patrolBoart
);
let player2 = new Player(player2Board, "player2", false);
player2.board.createGameboard();

function link() {}

export { player1, player2, link };
