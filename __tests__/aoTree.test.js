import { AoQuery } from "../src/AoQuery";
import { AoNode } from "../src/AoNode";

const simple = new AoQuery("1").tree();
const andOp = new AoQuery("1 and 2").tree();
const orOp = new AoQuery("1 or 2").tree();
const andOpOdd = new AoQuery("1 and 2 and 3").tree();
const andOpEven = new AoQuery("1 and 2 and 3 and 4").tree();
const orOpEven = new AoQuery("1 or 2 or 3 or 4").tree();
const orOpOdd = new AoQuery("1 or 2 or 3").tree();
const complex1 = new AoQuery("1 or 2 and 3 or 4 and 5").tree();
const complex2 = new AoQuery("1 and 2 or 3 and 4 or 5").tree();

describe("AoQuery", () => {
  describe("new query", () => {
    it("returns value node", () => {
      expect(simple.root.data).toBe("1");
    });

    it("one and data", () => {
      const root = andOp.root;
      expect(root.data).toBe("1 and 2");
      expect(root.type).toBe("and");
      expect(root.left.data).toBe("1");
      expect(root.right.data).toBe("2");
      expect(root.right.type).toBe(null);
    });

    it("one or data", () => {
      const root = orOp.root;
      expect(root.data).toBe("1 or 2");
      expect(root.left.data).toBe("1");
      expect(root.right.data).toBe("2");
      expect(root.right.type).toBe(null);
      expect(root.type).toBe("or");
    });

    it("multiple and/or", () => {
      const root = complex1.root;
      expect(root.left.data).toBe("1 or 2");
      expect(root.right.data).toBe("3 or 4 and 5");
      expect(root.left.left.data).toBe("1");
      expect(root.left.right.data).toBe("2");
      expect(root.right.left.data).toBe("3 or 4");
      expect(root.right.right.data).toBe("5");
    });
  });
  describe("points", () => {
    describe(".points", () => {
      it("node is a leaf", () => {
        expect(simple.points()).toEqual(["1"]);
      });

      it("OR points", () => {
        expect(orOp.points()).toEqual(["1", "2"]);
      });

      it("multiple OR points", () => {
        expect(orOpEven.points()).toEqual(["1", "2", "3", "4"]);
      });

      it("AND points", () => {
        expect(andOp.points()).toEqual(["12"]);
      });

      it("multiple AND points", () => {
        expect(andOpEven.points()).toEqual(["1234"]);
      });

      it("multiple and/or", () => {
        expect(complex1.points()).toEqual(["135", "145", "235", "245"]);
      });
    });
  });
});
