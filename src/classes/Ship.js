export class Ship{
    constructor(length){
        this.length = length;
        this.hitCount = 0;
        this.sunk = false;
    }

    hit(){
        this.hitCount++;
        this.isSunk();
    }

    isSunk() {
        if(this.hitCount === this.length){
            this.sunk = true;
            return true;
        }

        return false;
    }
}