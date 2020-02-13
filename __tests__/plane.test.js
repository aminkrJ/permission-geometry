import { Plane } from "../src/Plane";
import { queryToAoTree } from "../src/AoTree";

describe("plane", () => {
  describe(".concat", () => {
    it("right concat two multi-dimensional planes", () => {
      let dim1 = queryToAoTree("1 or 2");
      let dim2 = queryToAoTree("3 or 4");
      let dim3 = queryToAoTree("5 or 6");
      let dim4 = queryToAoTree("7 or 8");
      let plane1 = new Plane();
      let plane2 = new Plane();
      plane1.addDim("dim1", null, dim1);
      plane1.addDim("dim2", "or", dim2);
      plane2.addDim("dim3", null, dim3);
      plane2.addDim("dim4", "or", dim4);
      plane1.concat(plane2);
      expect(plane1.points()).toEqual([
        ["1", "0", "0", "0"],
        ["2", "0", "0", "0"],
        ["0", "3", "0", "0"],
        ["0", "4", "0", "0"],
        ["0", "0", "5", "0"],
        ["0", "0", "6", "0"],
        ["0", "0", "0", "7"],
        ["0", "0", "0", "8"]
      ]);
    });
    it("right concat two multi-dimensional planes including and", () => {
      let dim1 = queryToAoTree("1 or 2");
      let dim2 = queryToAoTree("3 or 4");
      let dim3 = queryToAoTree("5 or 6");
      let dim4 = queryToAoTree("7 or 8");
      let plane1 = new Plane();
      let plane2 = new Plane();
      plane1.addDim("dim1", null, dim1);
      plane1.addDim("dim2", "and", dim2);
      plane2.addDim("dim3", null, dim3);
      plane2.addDim("dim4", "or", dim4);
      plane1.concat(plane2);
      expect(plane1.points()).toEqual([
        ["1", "3", "0", "0"],
        ["1", "4", "0", "0"],
        ["2", "3", "0", "0"],
        ["2", "4", "0", "0"],
        ["0", "0", "5", "0"],
        ["0", "0", "6", "0"],
        ["0", "0", "0", "7"],
        ["0", "0", "0", "8"]
      ]);
    });
  });
  describe(".addDim", () => {
    let dimension, plane;
    beforeEach(() => {
      dimension = queryToAoTree("1 or 2");
      plane = new Plane();
    });
    it("update root with value dimension", () => {
      plane.addDim("test", null, dimension);
      expect(plane.tree.root.data.data).toBe(dimension.data);
    });
    it("two dimensional with and", () => {
      const anotherDimension = queryToAoTree("3 or 4");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "and", anotherDimension);
      expect(plane.tree.root.type).toBe("and");
      expect(plane.tree.root.data).toBe("dim1 dim2");
      expect(plane.points()).toEqual([
        ["1", "3"],
        ["1", "4"],
        ["2", "3"],
        ["2", "4"]
      ]);
    });
    it("two dimensional with or", () => {
      const anotherDimension = queryToAoTree("3 or 4");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "or", anotherDimension);
      expect(plane.tree.root.type).toBe("or");
      expect(plane.tree.root.data).toBe("dim1 dim2");
      expect(plane.points()).toEqual([
        ["1", "0"],
        ["2", "0"],
        ["0", "3"],
        ["0", "4"]
      ]);
    });
    it("three dimensional with or", () => {
      const anotherDimension = queryToAoTree("3 or 4");
      const thirdDimension = queryToAoTree("5 or 6");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "or", anotherDimension);
      plane.addDim("dim3", "or", thirdDimension);
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
      dimension = queryToAoTree("1 and 2");
      const anotherDimension = queryToAoTree("3 and 4");
      const thirdDimension = queryToAoTree("5 and 6");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "and", anotherDimension);
      plane.addDim("dim3", "and", thirdDimension);
      expect(plane.tree.root.type).toBe("and");
      expect(plane.points()).toEqual([["12", "34", "56"]]);
    });
    it("three dimensional with and ex 2", () => {
      dimension = queryToAoTree("1");
      const anotherDimension = queryToAoTree("2");
      const thirdDimension = queryToAoTree("3");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "and", anotherDimension);
      plane.addDim("dim3", "and", thirdDimension);
      expect(plane.tree.root.type).toBe("and");
      expect(plane.points()).toEqual([["1", "2", "3"]]);
    });
    it("three dimensional with and/or", () => {
      const anotherDimension = queryToAoTree("3 or 4");
      const thirdDimension = queryToAoTree("5");
      plane.addDim("dim1", null, dimension);
      plane.addDim("dim2", "and", anotherDimension);
      plane.addDim("dim3", "and", thirdDimension);
      expect(plane.tree.root.type).toBe("and");
      expect(plane.points()).toEqual([
        ["1", "3", "5"],
        ["1", "4", "5"],
        ["2", "3", "5"],
        ["2", "4", "5"]
      ]);
    });
  });
});
