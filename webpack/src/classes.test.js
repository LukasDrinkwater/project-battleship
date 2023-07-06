// const { capitalise } = require("./index");
// import { capitalise } from "./index";
import { Gameboard, capitalise, checkIfArrayLegal } from "./classes";
// import { capitalise } from "./index";

console.log(Gameboard);

describe("my stack", () => {
  it("capitalise works", () => {
    expect(capitalise("test")).toBe("Test");
  });

  it("check if array legal test", () => {
    // const input = [
    //   [1, 2],
    //   [1, 1],
    //   [1, 3],
    // ];
    // const expectedOutput = [
    //   [1, 1],
    //   [1, 2],
    //   [1, 3],
    // ];
    // // expect(checkIfArrayLegal(input)).toEqual(expectedOutput);
    // expect(checkIfArrayLegal(input)).toEqual(expectedOutput);
    //
    const input = [
      [1, 2],
      [1, 1],
      [1, 3],
    ];
    const expectedOutput = [
      [1, 1],
      [1, 2],
      [1, 3],
    ];

    expect(checkIfArrayLegal(input)).toEqual(expectedOutput);
  });
});
