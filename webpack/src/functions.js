import { Ship, Gameboard, Player, GameController } from "./classes";

let player1Board = new Gameboard("player1");
let player2Board = new Gameboard("player2");

let p1carrier = new Ship("carrier", 5);
let p1battleship = new Ship("battleship", 4);
let p1destroyer = new Ship("destroyer", 3);
let p1submarine = new Ship("submarine", 3);
let p1patrolBoat = new Ship("patrol boat", 2);

player1Board.shipsArray.push(
  p1carrier,
  p1battleship,
  p1destroyer,
  p1submarine,
  p1patrolBoat
);
let player1 = new Player(player1Board, "player1", true);
player1.board.createGameboard();

let p2carrier = new Ship("carrier", 5);
let p2battleship = new Ship("battleship", 4);
let p2destroyer = new Ship("destroyer", 3);
let p2submarine = new Ship("submarine", 3);
let p2patrolBoat = new Ship("patrol boat", 2);

player2Board.shipsArray.push(
  p2carrier,
  p2battleship,
  p2destroyer,
  p2submarine,
  p2patrolBoat
);
let player2 = new Player(player2Board, "player2", false);
player2.board.createGameboard();

const gameController = new GameController();

function link() {}

export { player1, player2, gameController };
