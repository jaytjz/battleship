import { Ship } from "./Ship";

export class Gameboard {
    constructor() {
        this.size = 10;
        this.ships = [];
        this.shotsTaken = [];
    }

    isValidPlacement(ship, x, y, orientation){
        if(x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1){
            return false;
        }

        for (let { coordinates } of this.ships) {
            for (let [cx, cy] of coordinates) {
                if (cx === x && cy === y) {
                    return false;
                }
            }
        }

        if(orientation === "horizontal"){
            if(ship.length + x > this.size - 1){
                return false;
            }

            for (let i = 0; i < ship.length; i++) {
                if (this.ships.some(({ coordinates }) => coordinates.some(([cx, cy]) => cx === x + i && cy === y))) {
                    return false;
                }
            }

            return true;
        }
        else if(orientation === "vertical"){
            if(ship.length + y > this.size - 1){
                return false;
            }

            for (let i = 0; i < ship.length; i++) {
                if (this.ships.some(({ coordinates }) => coordinates.some(([cx, cy]) => cx === x && cy === y + i))) {
                    return false;
                }
            }

            return true;
        }

        return false
    }

    placeShips(ship, x, y, orientation) {
        if(!this.isValidPlacement(ship, x, y, orientation)){
            throw new Error('Invalid placement');
        }

        const coordinates = []

        if(orientation === "horizontal"){
            for(let i = 0; i < ship.length; i++){
                coordinates.push([x + i, y]);
            }
        }
        else if(orientation === "vertical"){
            for(let i = 0; i < ship.length; i++){
                coordinates.push([x, y + i]);
            }
        }

        this.ships.push({ship, coordinates});

        return coordinates;
    }

    receiveAttack([x, y]){
        if (this.shotsTaken.some(([sx, sy]) => sx === x && sy === y)) {
            return false;
        }
        this.shotsTaken.push([x, y]);

        for (let { ship, coordinates } of this.ships) {
            for (let [cx, cy] of coordinates) {
                if (cx === x && cy === y) {
                    ship.hit();
                    return true;
                }
            }
        }
    }

    allShipsSunk(){
        return this.ships.every(shipObj => shipObj.ship.sunk);
    }

    populateBoard(){
        const array = [new Ship(2), new Ship(3), new Ship(3), new Ship(4), new Ship(5)]

        array.forEach((ship) => {
            let placed = false;
            while(!placed){
                let randomX = Math.floor(Math.random() * 10);
                let randomY = Math.floor(Math.random() * 10);
                let randomOrientation = Math.random() < 0.5 ? "horizontal" : "vertical";   
                
                if (this.isValidPlacement(ship, randomX, randomY, randomOrientation)) {
                    this.placeShips(ship, randomX, randomY, randomOrientation);
                    placed = true;
                }
            }
        })

    }

    render(boardElement, showShips = false) {
        const size = this.size;

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;

                if (showShips && this.ships.some(({ coordinates }) => coordinates.some(([cx, cy]) => cx === x && cy === y))) {
                    cell.classList.add('ship');
                }
                boardElement.appendChild(cell);
            }
        }
    }
}