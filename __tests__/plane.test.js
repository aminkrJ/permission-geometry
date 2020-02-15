import { Plane } from "../src/Plane";
import { AoQuery } from "../src/AoQuery";

const tree1 = new AoQuery("1 or 2").tree();
const tree2 = new AoQuery("3 or 4").tree();
const tree3 = new AoQuery("5 or 6").tree();
const tree4 = new AoQuery("1 and 2").tree();
const tree5 = new AoQuery("3 and 4").tree();
const tree6 = new AoQuery("5 and 6").tree();
const tree7 = new AoQuery("1").tree();

describe("plane", () => {
  describe(".addDimension", () => {
    let plane;
    beforeEach(() => {
      plane = new Plane();
    });
    it("two dimensional with and", () => {
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
      plane.addDimension(null, tree4);
      plane.addDimension("and", tree5);
      plane.addDimension("and", tree6);
      expect(plane.tree.root.type).toBe("and");
      expect(plane.points()).toEqual([["12", "34", "56"]]);
    });
    it("three dimensional with and ex 2", () => {
      plane.addDimension(null, tree7);
      plane.addDimension("and", tree7);
      plane.addDimension("and", tree7);
      expect(plane.points()).toEqual([["1", "1", "1"]]);
    });
    it("three dimensional with and/or", () => {
      plane.addDimension(null, tree1);
      plane.addDimension("and", tree2);
      plane.addDimension("and", tree7);
      expect(plane.points()).toEqual([
        ["1", "3", "1"],
        ["1", "4", "1"],
        ["2", "3", "1"],
        ["2", "4", "1"]
      ]);
    });
  });
});
