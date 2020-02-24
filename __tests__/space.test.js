import { Space } from "../src/space";
import { Point } from "../src/point";
import { Dimension } from "../src/dimension";

let d1, d2, d3, d33;

describe("space", () => {
  describe(".points", () => {
    let space;
    beforeEach(() => {
      space = new Space();
      d1 = new Dimension("d1");
      d2 = new Dimension("d2");
      d3 = new Dimension("d3");
      d33 = new Dimension("d3");
    });
    it("no dimensions", () => {
      expect(space.points()).toEqual([]);
    });
    it("one dimension", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", "1");
      let p2 = new Point();
      p2.setCoordinate("d1", "2");
      d1.addPosition(null, "1");
      d1.addPosition("or", "2");
      space.addDimension("and", d1);
      expect(space.points()).toEqual([p1, p2]);
    });
    it("two dimensions with or", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", "1");
      p1.setCoordinate("d2", 0);
      let p2 = new Point();
      p2.setCoordinate("d1", "2");
      p2.setCoordinate("d2", 0);
      let p3 = new Point();
      p3.setCoordinate("d1", 0);
      p3.setCoordinate("d2", "3");
      d1.addPosition(null, "1");
      d1.addPosition("or", "2");
      d2.addPosition(null, "3");
      space.addDimension(null, d1);
      space.addDimension("or", d2);
      expect(space.points()).toEqual([p1, p2, p3]);
    });
    it("two dimensions with and", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", "1");
      p1.setCoordinate("d2", "3");
      let p2 = new Point();
      p2.setCoordinate("d1", "2");
      p2.setCoordinate("d2", "3");
      d1.addPosition(null, "1");
      d1.addPosition("or", "2");
      d2.addPosition(null, "3");
      space.addDimension(null, d1);
      space.addDimension("and", d2);
      expect(space.points()).toEqual([p1, p2]);
    });
    it("multiple dimensions but one dimension is empty", () => {
      d1.addPosition(null, "1");
      d1.addPosition("or", "2");
      d2.addPosition(null, "3");
      space.addDimension(null, d1);
      space.addDimension("or", d2);
      expect(() => {
        space.addDimension("or", d3);
      }).toThrowError();
    });
    it("multiple dimensions", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", "1");
      p1.setCoordinate("d2", 0);
      p1.setCoordinate("d3", 0);
      let p2 = new Point();
      p2.setCoordinate("d1", "2");
      p2.setCoordinate("d2", 0);
      p2.setCoordinate("d3", 0);
      let p3 = new Point();
      p3.setCoordinate("d2", "3");
      p3.setCoordinate("d1", 0);
      p3.setCoordinate("d3", 0);
      let p4 = new Point();
      p4.setCoordinate("d3", "4");
      p4.setCoordinate("d1", 0);
      p4.setCoordinate("d2", 0);
      d1.addPosition(null, "1");
      d1.addPosition("or", "2");
      d2.addPosition(null, "3");
      d3.addPosition(null, "4");
      space.addDimension(null, d1);
      space.addDimension("or", d2);
      space.addDimension("or", d3);
      expect(space.points()).toEqual([p1, p2, p3, p4]);
    });
    it("add dimensions with the same axis", () => {
      let p1 = new Point();
      p1.setCoordinate("d1", "1");
      p1.setCoordinate("d3", 0);
      let p2 = new Point();
      p2.setCoordinate("d3", "3");
      p2.setCoordinate("d1", 0);
      let p3 = new Point();
      p3.setCoordinate("d3", "4");
      p3.setCoordinate("d1", 0);
      d1.addPosition(null, "1");
      d3.addPosition(null, "3");
      d33.addPosition(null, "4");
      space.addDimension(null, d1);
      space.addDimension("or", d3);
      space.addDimension("or", d33);
      expect(space.points()).toEqual([p1, p2, p3]);
    });
    describe(".concat", () => {
      let space1, space2;
      beforeEach(() => {
        space1 = new Space();
        space2 = new Space();
        d1 = new Dimension("d1");
        d2 = new Dimension("d2");
        d3 = new Dimension("d3");
      });
      it("concat dimensions of different spaces", () => {
        d1 = new Dimension("d1");
        d2 = new Dimension("d2");
        d3 = new Dimension("d3");
        let p1 = new Point();
        p1.setCoordinate("d1", "1");
        p1.setCoordinate("d2", 0);
        p1.setCoordinate("d3", 0);
        let p2 = new Point();
        p2.setCoordinate("d1", "2");
        p2.setCoordinate("d2", 0);
        p2.setCoordinate("d3", 0);
        let p3 = new Point();
        p3.setCoordinate("d2", "3");
        p3.setCoordinate("d1", 0);
        p3.setCoordinate("d3", 0);
        let p4 = new Point();
        p4.setCoordinate("d3", "4");
        p4.setCoordinate("d1", 0);
        p4.setCoordinate("d2", 0);
        d1.addPosition(null, "1");
        d1.addPosition("or", "2");
        d2.addPosition(null, "3");
        d3.addPosition(null, "4");
        space1.addDimension(null, d1);
        space1.addDimension("or", d2);
        space2.addDimension(null, d3);
        space1.concat(space2);
        expect(space1.points()).toEqual([p1, p2, p3, p4]);
      });
    });
  });
});
