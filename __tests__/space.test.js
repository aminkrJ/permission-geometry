import { Space } from "../src/space";
import { Point } from "../src/point";
import { Dimension } from "../src/dimension";

let d1, d2, d3, d4, sp1, sp2, sp3, p1, p2, p3, p4, p5, p6;

describe("space", () => {
  beforeEach(() => {
    sp1 = new Space();
    sp2 = new Space();
    sp3 = new Space();
    d1 = new Dimension("d1");
    d2 = new Dimension("d2");
    d3 = new Dimension("d3");
    d4 = new Dimension("d4");
    p1 = new Point();
    p2 = new Point();
    p3 = new Point();
    p4 = new Point();
    p5 = new Point();
    p6 = new Point();
  });
  describe(".points", () => {
    it("no dimensions", () => {
      expect(sp1.points()).toEqual([]);
    });
    it("one dimension", () => {
      p1.coordinates.set("d1", 1);
      p2.coordinates.set("d1", 2);
      d1.positions.add(1);
      d1.positions.add(2);
      sp1.dimensions.add(null, d1);
      expect(sp1.points()).toEqual([p1, p2]);
    });
    it("two dimensions with or", () => {
      p1.coordinates.set("d1", 1);
      p2.coordinates.set("d1", 2);
      p3.coordinates.set("d1", 3);
      p4.coordinates.set("d2", 1);
      p5.coordinates.set("d2", 2);
      p6.coordinates.set("d2", 3);
      d1.positions.add(1);
      d1.positions.add(2);
      d1.positions.add(3);
      d2.positions.add(1);
      d2.positions.add(2);
      d2.positions.add(3);
      sp1.dimensions.add(null, d1);
      sp1.dimensions.add("or", d2);
      expect(sp1.points()).toEqual([p1, p2, p3, p4, p5, p6]);
    });
    it("two dimensions with and", () => {
      p1.coordinates.set("d1", 1);
      p1.coordinates.set("d2", 1);
      p2.coordinates.set("d1", 1);
      p2.coordinates.set("d2", 2);
      p3.coordinates.set("d1", 2);
      p3.coordinates.set("d2", 1);
      p4.coordinates.set("d1", 2);
      p4.coordinates.set("d2", 2);
      d1.positions.add(1);
      d1.positions.add(2);
      d2.positions.add(1);
      d2.positions.add(2);
      sp1.dimensions.add(null, d1);
      sp1.dimensions.add("and", d2);
      expect(sp1.points()).toEqual([p1, p2, p3, p4]);
    });
    it("multiple dimensions but one dimension is empty", () => {
      d1.positions.add(1);
      d2.positions.add(3);
      sp1.dimensions.add(null, d1);
      sp1.dimensions.add("or", d2);
      expect(() => {
        sp1.dimensions.add("or", d3);
      }).toThrowError();
    });
    it("multiple dimensions", () => {
      p1.coordinates.set("d1", 1);
      p2.coordinates.set("d1", 2);
      p3.coordinates.set("d2", 3);
      p4.coordinates.set("d3", 4);
      d1.positions.add(1);
      d1.positions.add(2);
      d2.positions.add(3);
      d3.positions.add(4);
      sp1.dimensions.add(null, d1);
      sp1.dimensions.add("or", d2);
      sp1.dimensions.add("or", d3);
      expect(sp1.points()).toEqual([p1, p2, p3, p4]);
    });
    it("set dimensions with the same axis", () => {
      p1.coordinates.set("d1", 1);
      p2.coordinates.set("d2", 1);
      p3.coordinates.set("d2", 2);
      let d3 = new Dimension("d2");
      d1.positions.add(1);
      d2.positions.add(1);
      d3.positions.add(2);
      sp1.dimensions.add(null, d1);
      sp1.dimensions.add("or", d2);
      sp1.dimensions.add("or", d3);
      expect(sp1.dimensions.size).toEqual(2);
      expect(sp1.points()).toEqual([p1, p2, p3]);
    });
  });
  describe(".concat", () => {
    it("concat two dimensions with the same axis", () => {
      p1.coordinates.set("d1", 1);
      p2.coordinates.set("d1", 2);
      d1.positions.add(1);
      let d2 = new Dimension("d1");
      d2.positions.add(2);
      sp1.dimensions.add(null, d1);
      sp2.dimensions.add(null, d2);
      let union = sp1.concat("or", sp2);
      expect(union).toEqual([p1, p2]);
    });
    it("concat dimensions of different spaces", () => {
      p1.coordinates.set("d1", 1);
      p2.coordinates.set("d1", 2);
      p3.coordinates.set("d2", 3);
      p4.coordinates.set("d3", 4);
      p5.coordinates.set("d4", 1);
      d1.positions.add(1);
      d1.positions.add(2);
      d2.positions.add(3);
      d3.positions.add(4);
      d4.positions.add(1);
      sp1.dimensions.add(null, d1);
      sp1.dimensions.add("or", d2);
      sp2.dimensions.add(null, d3);
      sp2.dimensions.add("or", d4);
      let union = sp1.concat("or", sp2);
      expect(union).toEqual([p1, p2, p3, p4, p5]);
    });
    it("concat dimensions of different spaces, structure 2", () => {
      p1.coordinates.set("d1", 1);
      p2.coordinates.set("d1", 2);
      p3.coordinates.set("d2", 3);
      p4.coordinates.set("d3", 4);
      d1.positions.add(1);
      d1.positions.add(2);
      d2.positions.add(3);
      d3.positions.add(4);
      sp1.dimensions.add(null, d1);
      sp1.dimensions.add("or", d2);
      sp2.dimensions.add(null, d3);
      let union = sp1.concat("or", sp2);
      expect(union).toEqual([p1, p2, p3, p4]);
    });
  });
});
