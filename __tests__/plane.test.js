import { Plane } from "../src/plane";
import { aoTree } from "../src/aoTree";

describe("plane", () => {
  describe(".addDim", () => {
    let dimension, plane;
    beforeEach(() => {
      dimension = aoTree("1 or 2");
      plane = new Plane();
    });
    it("update root with value dimension", () => {
      plane.addDim("test", null, dimension);
      expect(plane.root.val.val).toBe(dimension.val);
    });
    it("throw error for non value root nodes", () => {
      expect(() => {
        plane.addDim("test", "and", dimension);
      }).toThrow();
    });
    it("two dimensional with and", () => {
      const anotherDimension = aoTree("3 or 4");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "and", anotherDimension);
      expect(plane.root.type).toBe("and");
      expect(plane.root.val).toBe("dim1 and dim2");
      expect(plane.set()).toEqual([
        ["1", "3"],
        ["1", "4"],
        ["2", "3"],
        ["2", "4"]
      ]);
    });
    it("two dimensional with or", () => {
      const anotherDimension = aoTree("3 or 4");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "or", anotherDimension);
      expect(plane.root.type).toBe("or");
      expect(plane.root.val).toBe("dim1 or dim2");
      expect(plane.set()).toEqual([
        ["1", "0"],
        ["2", "0"],
        ["0", "3"],
        ["0", "4"]
      ]);
    });
    it("three dimensional with or", () => {
      const anotherDimension = aoTree("3 or 4");
      const thirdDimension = aoTree("5 or 6");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "or", anotherDimension);
      plane.addDim("dim3", "or", thirdDimension);
      expect(plane.root.type).toBe("or");
      expect(plane.set()).toEqual([
        ["1", "0", "0"],
        ["2", "0", "0"],
        ["0", "3", "0"],
        ["0", "4", "0"],
        ["0", "0", "5"],
        ["0", "0", "6"]
      ]);
    });
    it("three dimensional with and", () => {
      dimension = aoTree("1 and 2");
      const anotherDimension = aoTree("3 and 4");
      const thirdDimension = aoTree("5 and 6");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "and", anotherDimension);
      plane.addDim("dim3", "and", thirdDimension);
      expect(plane.root.type).toBe("and");
      expect(plane.set()).toEqual([["12", "34", "56"]]);
    });
    it("three dimensional with and ex 2", () => {
      dimension = aoTree("1");
      const anotherDimension = aoTree("2");
      const thirdDimension = aoTree("3");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "and", anotherDimension);
      plane.addDim("dim3", "and", thirdDimension);
      expect(plane.root.type).toBe("and");
      expect(plane.set()).toEqual([["1", "2", "3"]]);
    });
    it("three dimensional with and/or", () => {
      const anotherDimension = aoTree("3 or 4");
      const thirdDimension = aoTree("5");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "and", anotherDimension);
      plane.addDim("dim3", "and", thirdDimension);
      expect(plane.root.type).toBe("and");
      expect(plane.set()).toEqual([
        ["1", "3", "5"],
        ["1", "4", "5"],
        ["2", "3", "5"],
        ["2", "4", "5"]
      ]);
    });
  });
});
