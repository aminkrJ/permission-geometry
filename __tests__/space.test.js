import { Plane } from "../src/Plane";
import { AoQuery } from "../src/AoQuery";

const dim1 = new AoQuery("1 or 2").dimension("t1");
const dim2 = new AoQuery("3 or 4").dimension("t2");
const dim3 = new AoQuery("5 or 6").dimension("t3");
const dim4 = new AoQuery("1 and 2").dimension("t4");
const dim5 = new AoQuery("3 and 4").dimension("t5");
const dim6 = new AoQuery("5 and 6").dimension("t6");
const dim7 = new AoQuery("1").dimension("t7");

describe("plane", () => {
  describe(".addDimension", () => {
    let plane;
    beforeEach(() => {
      plane = new Plane();
    });
    it("two dimensional with and", () => {
      plane.addDimension(null, dim1);
      plane.addDimension("and", dim2);
      expect(plane.tree.root.type).toBe("and");
      expect(plane.points()).toEqual([
        ["1", "3"],
        ["1", "4"],
        ["2", "3"],
        ["2", "4"]
      ]);
    });
    it("two dimensional with or", () => {
      plane.addDimension(null, dim1);
      plane.addDimension("or", dim2);
      expect(plane.tree.root.type).toBe("or");
      expect(plane.points()).toEqual([
        ["1", "0"],
        ["2", "0"],
        ["0", "3"],
        ["0", "4"]
      ]);
    });
    it("three dimensional with or", () => {
      plane.addDimension(null, dim1);
      plane.addDimension("or", dim2);
      plane.addDimension("or", dim3);
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
      plane.addDimension(null, dim4);
      plane.addDimension("and", dim5);
      plane.addDimension("and", dim6);
      expect(plane.tree.root.type).toBe("and");
      expect(plane.points()).toEqual([["12", "34", "56"]]);
    });
    it("three dimensional with and ex 2", () => {
      plane.addDimension(null, dim7);
      plane.addDimension("and", dim7);
      plane.addDimension("and", dim7);
      expect(plane.points()).toEqual([["1", "1", "1"]]);
    });
    it("three dimensional with and/or", () => {
      plane.addDimension(null, dim1);
      plane.addDimension("and", dim2);
      plane.addDimension("and", dim7);
      expect(plane.points()).toEqual([
        ["1", "3", "1"],
        ["1", "4", "1"],
        ["2", "3", "1"],
        ["2", "4", "1"]
      ]);
    });
  });
});
