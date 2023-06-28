import _ from "lodash";
import "./styles.css";
import { link } from "./functions";
import { createGameboardDOM } from "./DOM";
import { player1, player2 } from "./functions";
import { initialiseDOM, initialiseEventListeners } from "./controller";

initialiseDOM();
initialiseEventListeners();
