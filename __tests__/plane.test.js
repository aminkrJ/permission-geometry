import { Plane } from "../src/Plane";
import { queryToAoTree } from "../src/AoTree";

describe("plane", () => {
  describe(".addDimension", () => {
    let tree1, plane;
    beforeEach(() => {
      plane = new Plane();
    });
    it("two dimensional with and", () => {
      const tree1 = queryToAoTree("1 or 2");
      const tree2 = queryToAoTree("3 or 4");
      plane.addDimension(null, tree1);
      plane.addDimension("and", tree2);
      expect(plane.tree.root.type).toBe("and");
      expect(plane.points()).toEqual([
        ["1", "3"],
        ["1", "4"],
        ["2", "3"],
        ["2", "4"]
      ]);
    });
    it("two dimensional with or", () => {
      const tree1 = queryToAoTree("1 or 2");
      const tree2 = queryToAoTree("3 or 4");
      plane.addDimension(null, tree1);
      plane.addDimension("or", tree2);
      expect(plane.tree.root.type).toBe("or");
      expect(plane.points()).toEqual([
        ["1", "0"],
        ["2", "0"],
        ["0", "3"],
        ["0", "4"]
      ]);
    });
    it("three dimensional with or", () => {
      const tree1 = queryToAoTree("1 or 2");
      const tree2 = queryToAoTree("3 or 4");
      const tree3 = queryToAoTree("5 or 6");
      plane.addDimension(null, tree1);
      plane.addDimension("or", tree2);
      plane.addDimension("or", tree3);
      expect(plane.tree.root.type).toBe("or");
      expect(plane.points()).toEqual([
        ["1", "0", "0"],
        ["2", "0", "0"],
        ["0", "3", "0"],
        ["0", "4", "0"],
        ["0", "0", "5"],
        ["0", "0", "6"]
      ]);
    });
    it("three dimensional with and", () => {
      const tree1 = queryToAoTree("1 and 2");
      const tree2 = queryToAoTree("3 and 4");
      const tree3 = queryToAoTree("5 and 6");
      plane.addDimension(null, tree1);
      plane.addDimension("and", tree2);
      plane.addDimension("and", tree3);
      expect(plane.tree.root.type).toBe("and");
      expect(plane.points()).toEqual([["12", "34", "56"]]);
    });
    it("three dimensional with and ex 2", () => {
      const tree1 = queryToAoTree("1");
      const tree2 = queryToAoTree("2");
      const tree3 = queryToAoTree("3");
      plane.addDimension(null, tree1);
      plane.addDimension("and", tree2);
      plane.addDimension("and", tree3);
      expect(plane.points()).toEqual([["1", "2", "3"]]);
    });
    it("three dimensional with and ex 3", () => {
      const tree1 = queryToAoTree("1");
      const tree2 = queryToAoTree("2 or 4");
      const tree3 = queryToAoTree("3");
      plane.addDimension(null, tree1);
      plane.addDimension("and", tree2);
      plane.addDimension("and", tree3);
      expect(plane.points()).toEqual([
        ["1", "2", "3"],
        ["1", "4", "3"]
      ]);
    });
    it("three dimensional with and/or", () => {
      const tree1 = queryToAoTree("1 or 2");
      const tree2 = queryToAoTree("3 or 4");
      const tree3 = queryToAoTree("5");
      plane.addDimension(null, tree1);
      plane.addDimension("and", tree2);
      plane.addDimension("and", tree3);
      expect(plane.points()).toEqual([
        ["1", "3", "5"],
        ["1", "4", "5"],
        ["2", "3", "5"],
        ["2", "4", "5"]
      ]);
    });
  });
});
