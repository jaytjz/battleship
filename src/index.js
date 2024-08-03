import "./styles.css"
import { Player } from "./classes/Player";
import { GameController } from "./classes/GameController";

document.addEventListener('DOMContentLoaded', () => {
    const human = new Player();
    const computer = new Player();
    const gameController = new GameController(human, computer);

    gameController.startGame(); // Start the game
});