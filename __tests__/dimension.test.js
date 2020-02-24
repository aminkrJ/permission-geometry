import { Dimension } from "../src/dimension";
import { Point } from "../src/point";

let d1, d2;

describe("dimension", () => {
  describe(".points", () => {
    beforeEach(() => {
      d1 = new Dimension("d1");
    });
    it("is empty", () => {
      expect(d1.points()).toEqual([]);
    });
    it("does not have operands", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", 5);
      d1.addPosition(null, 5);
      expect(d1.points()).toEqual([p1]);
    });
    it("duplicated position", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", 5);
      d1.addPosition(null, 5);
      d1.addPosition("or", 5);
      expect(d1.points()).toEqual([p1]);
    });
    it("has one and operands", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", "1-2");
      d1.addPosition(null, 1);
      d1.addPosition("and", 2);
      expect(d1.points()).toEqual([p1]);
    });
    it("has one or operands", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", "1");
      let p2 = new Point();
      p2.setCoordinate("d1", "2");
      d1.addPosition(null, "1");
      d1.addPosition("or", "2");
      expect(d1.points()).toEqual([p1, p2]);
    });
    it("has one and and or operands", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", "1-3");
      let p2 = new Point();
      p2.setCoordinate("d1", "2-3");
      d1.addPosition(null, "1");
      d1.addPosition("or", "2");
      d1.addPosition("and", "3");
      expect(d1.points()).toEqual([p1, p2]);
    });
  });
  describe(".merge", () => {
    beforeEach(() => {});
    it("concat different axis", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", "1");
      let p2 = new Point();
      p2.setCoordinate("d1", "2");
      d1 = new Dimension("d1");
      d2 = new Dimension("d2");
      d1.addPosition(null, "1");
      d2.addPosition(null, "2");
      d1.merge(d2);
      expect(d1.points()).toEqual([p1, p2]);
    });
  });
});
