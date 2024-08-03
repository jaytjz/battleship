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

            return true;
        }
        else if(orientation === "vertical"){
            if(ship.length + y > this.size - 1){
                return false;
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
        for(let [sx, sy] of this.shotsTaken){
            if (sx === x && sy === y) {
                return false;
            }
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
}