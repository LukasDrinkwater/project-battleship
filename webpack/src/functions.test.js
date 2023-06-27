// const { capitalise } = require("./index");
import { capitalise } from "./index";

describe("my stack", () => {
  it("capitalise works", () => {
    expect(capitalise("test")).toBe("Test");
  });
});
