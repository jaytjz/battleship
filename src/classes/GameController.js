export class GameController {
    constructor(human, computer) {
        this.human = human;
        this.computer = computer;
        this.currentPlayer = 'human'; 
        this.handleHumanAttack = this.handleHumanAttack.bind(this);
    }

    startGame() {
        this.human.gameboard.populateBoard();
        this.computer.gameboard.populateBoard();
        this.updateUI();
        this.nextTurn();
    }

    updateUI() {
        const humanBoardElement = document.getElementById('humanBoard');
        const computerBoardElement = document.getElementById('computerBoard');

        this.human.gameboard.render(humanBoardElement, true); 
        this.computer.gameboard.render(computerBoardElement);   
    }

    nextTurn() {
        if (this.currentPlayer === 'human') {
            this.humanTurn();
        } else {
            this.computerTurn();
        }
    }

    humanTurn() {
        const computerBoardElement = document.getElementById('computerBoard');

        computerBoardElement.removeEventListener('click', this.handleHumanAttack);
        computerBoardElement.addEventListener('click',this.handleHumanAttack);
    }

    handleHumanAttack(e) {
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);

        if (this.computer.gameboard.receiveAttack([x, y])) {
            e.target.classList.add('hit');
        } else {
            e.target.classList.add('miss');
        }

        if (this.computer.gameboard.allShipsSunk()) {
            alert('Human wins!');
            return;
        }

        this.currentPlayer = 'computer';
        this.nextTurn(); 
    }

    computerTurn() {
        const { x, y } = this.getRandomCoordinates();
        const humanBoardElement = document.getElementById('humanBoard');
        const cell = humanBoardElement.querySelector(`[data-x='${x}'][data-y='${y}']`);

        if (this.human.gameboard.receiveAttack([x, y])) {
            cell.classList.add('hit');
        } else {
            cell.classList.add('miss');
        }

        if (this.human.gameboard.allShipsSunk()) {
            alert('Computer wins!');
            return;
        }

        this.currentPlayer = 'human';
        this.nextTurn(); 
    }

    getRandomCoordinates() {
        const x = Math.floor(Math.random() * this.human.gameboard.size);
        const y = Math.floor(Math.random() * this.human.gameboard.size);
        return { x, y };
    }
}
