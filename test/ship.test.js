import { Ship } from "../src/classes/Ship";

test("hit function", () => {
  let ship1 = new Ship(1);
  ship1.hit();
  expect(ship1.hitCount).toBe(1);
})

test("isSunk function for true", () => {
  let ship1 = new Ship(1);
  ship1.hit();
  expect(ship1.isSunk()).toBe(true);
})

test("isSunk function for false", () => {
  let ship1 = new Ship(1);
  expect(ship1.isSunk()).toBe(false);
})