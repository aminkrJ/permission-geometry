import { Space } from "../src/space";
import { Query } from "../src/query";

const d1 = new Dimension("d1");
const d2 = new Dimension("d2");
const d3 = new Dimension("d3");

describe("space", () => {
  describe(".addDimension", () => {
    let space;
    beforeEach(() => {
      space = new Space();
    });
    it("two dimensional with and", () => {
      space.addDimension(null, d1);
      space.addDimension("and", d2);
      expect(space.points()).toEqual([]);
    });
    it("two dimensional with or", () => {
      space.addDimension(null, dim1);
      space.addDimension("or", dim2);
      expect(space.tree.root.type).toBe("or");
      expect(space.points()).toEqual([
        ["1", "0"],
        ["2", "0"],
        ["0", "3"],
        ["0", "4"]
      ]);
    });
    it("three dimensional with or", () => {
      space.addDimension(null, dim1);
      space.addDimension("or", dim2);
      space.addDimension("or", dim3);
      expect(space.tree.root.type).toBe("or");
      expect(space.points()).toEqual([
        ["1", "0", "0"],
        ["2", "0", "0"],
        ["0", "3", "0"],
        ["0", "4", "0"],
        ["0", "0", "5"],
        ["0", "0", "6"]
      ]);
    });
    it("three dimensional with and", () => {
      space.addDimension(null, dim4);
      space.addDimension("and", dim5);
      space.addDimension("and", dim6);
      expect(space.tree.root.type).toBe("and");
      expect(space.points()).toEqual([["12", "34", "56"]]);
    });
    it("three dimensional with and ex 2", () => {
      space.addDimension(null, dim7);
      space.addDimension("and", dim7);
      space.addDimension("and", dim7);
      expect(space.points()).toEqual([["1", "1", "1"]]);
    });
    it("three dimensional with and/or", () => {
      space.addDimension(null, dim1);
      space.addDimension("and", dim2);
      space.addDimension("and", dim7);
      expect(space.points()).toEqual([
        ["1", "3", "1"],
        ["1", "4", "1"],
        ["2", "3", "1"],
        ["2", "4", "1"]
      ]);
    });
  });
  describe(".points", () => {});
});
