// const { capitalise } = require("./index");
// import { capitalise } from "./index";
import { Gameboard, capitalise, checkIfArrayLegal } from "./classes";
// import { capitalise } from "./index";

console.log(Gameboard);

describe("my stack", () => {
  it("capitalise works", () => {
    expect(capitalise("test")).toBe("Test");
  });

  // it("check if array legal test", () => {
  //   expect(
  //     checkIfArrayLegal([
  //       [0, 2],
  //       [0, 4],
  //       [0, 1],
  //       [0, 3],
  //     ]).toBe([0, 1], [0, 2], [0, 3], [0, 4])
  //   );
  // });
});
