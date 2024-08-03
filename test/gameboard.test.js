import { Gameboard } from "../src/classes/Gameboard";
import { Ship } from "../src/classes/Ship"

test("isValidPlacement, True", () => {
    let ship5 = new Ship(5);
    let gameboard = new Gameboard;

    expect(gameboard.isValidPlacement(ship5, 0, 0, "horizontal")).toBe(true);
    expect(gameboard.isValidPlacement(ship5, -2, -3, "horizontal")).toBe(false);
    expect(gameboard.isValidPlacement(ship5, 5, 0, "horizontal")).toBe(false);
    expect(gameboard.isValidPlacement(ship5, 0, 5, "vertical")).toBe(false);
})

test("placeShips", () => {
    let ship3 = new Ship(3);
    let ship2 = new Ship(2);
    let gameboard = new Gameboard;

    expect(gameboard.placeShips(ship3, 0, 0, "horizontal")).toEqual([[0, 0],[1, 0],[2, 0]]);
    expect(gameboard.placeShips(ship2, 1, 1, "vertical")).toEqual([[1, 1],[1, 2]]);
})

test("isValidPlacement if ship is already there", () => {
    let gameboard = new Gameboard;
    let ship5 = new Ship(5);
    let ship3 = new Ship(3);
    gameboard.placeShips(ship5, 0, 0, "horizontal");
    expect(gameboard.isValidPlacement(ship3, 0, 0, "horizontal")).toBe(false);
})

test("receiveAttack", () => {
    let ship3 = new Ship(3);
    let gameboard = new Gameboard;

    gameboard.placeShips(ship3, 0, 0, "vertical");

    expect(gameboard.receiveAttack([0,0])).toBe(true);
    expect(gameboard.receiveAttack([0,0])).toBe(false);
})

test('allShipsSunk', () => {
    let gameboard = new Gameboard;
    let ship3 = new Ship(3);
    let ship2 = new Ship(2);

    gameboard.placeShips(ship3, 0, 0, 'horizontal');
    gameboard.placeShips(ship2, 1, 1, 'vertical');

    gameboard.receiveAttack([0, 0]); 
    gameboard.receiveAttack([1, 0]); 
    gameboard.receiveAttack([2, 0]); 

    expect(gameboard.allShipsSunk()).toBe(false);

    gameboard.receiveAttack([1, 1]); 
    gameboard.receiveAttack([1, 2]); 
    
    expect(gameboard.allShipsSunk()).toBe(true);
});