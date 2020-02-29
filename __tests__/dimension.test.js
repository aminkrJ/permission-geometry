import { Dimension } from "../src/dimension";
import { Point } from "../src/point";

let d1, d2, p1, p2;

describe("dimension", () => {
  beforeEach(() => {
    d1 = new Dimension("d1");
    d2 = new Dimension("d2");
    p1 = new Point();
    p2 = new Point();
  });
  describe(".points", () => {
    it("is empty", () => {
      expect(d1.points()).toEqual([]);
    });
    it("does not have operands", () => {
      p1.coordinates.set("d1", 5);
      d1.positions.add(5);
      expect(d1.points()).toEqual([p1]);
    });
    it("duplicated position", () => {
      p1.coordinates.set("d1", 5);
      d1.positions.add(5);
      d1.positions.add(5);
      expect(d1.points()).toEqual([p1]);
    });
    it("has one or operands", () => {
      p1.coordinates.set("d1", 1);
      p2.coordinates.set("d1", 2);
      d1.positions.add(1);
      d1.positions.add(2);
      expect(d1.points()).toEqual([p1, p2]);
    });
  });
  describe(".concat", () => {
    it("different axis", () => {
      d1.positions.add(1);
      d2.positions.add(1);
      expect(() => {
        d1.concat(d2);
      }).toThrowError();
    });
    it("same axis", () => {
      d2 = new Dimension("d1");
      p1.coordinates.set("d1", 1);
      p2.coordinates.set("d1", 2);
      d1.positions.add(1);
      d2.positions.add(1);
      d2.positions.add(2);
      d1.concat(d2);
      expect(d1.points()).toEqual([p1, p2]);
    });
  });
});
