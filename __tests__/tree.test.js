import { Query } from "../src/query";

const simple = new Query("1").dimension("simple");
const andOp = new Query("1 and 2").dimension("andOp");
const orOp = new Query("1 or 2").dimension("orOp");
const andOpOdd = new Query("1 and 2 and 3").dimension("andOpOdd");
const andOpEven = new Query("1 and 2 and 3 and 4").dimension("andOpEven");
const orOpEven = new Query("1 or 2 or 3 or 4").dimension("orOpEven");
const orOpOdd = new Query("1 or 2 or 3").dimension("orOpOdd");
const complex1 = new Query("1 or 2 and 3 or 4 and 5").dimension("complex1");
const complex2 = new Query("1 and 2 or 3 and 4 or 5").dimension("complex2");

describe("Query", () => {
  describe("new query", () => {
    it("returns value node", () => {
      expect(simple.tree.root.data).toBe("1");
    });

    it("one and data", () => {
      const root = andOp.tree.root;
      expect(root.data).toBe("1 and 2");
      expect(root.type).toBe("and");
      expect(root.left.data).toBe("1");
      expect(root.right.data).toBe("2");
      expect(root.right.type).toBe(null);
    });

    it("one or data", () => {
      const root = orOp.tree.root;
      expect(root.data).toBe("1 or 2");
      expect(root.left.data).toBe("1");
      expect(root.right.data).toBe("2");
      expect(root.right.type).toBe(null);
      expect(root.type).toBe("or");
    });

    it("multiple and/or", () => {
      const root = complex1.tree.root;
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
        expect(simple.points()).toEqual([{ simple: "1" }]);
      });

      it("OR points", () => {
        expect(orOp.points()).toEqual([{ orOp: "1" }, { orOp: "2" }]);
      });

      it("multiple OR points", () => {
        expect(orOpEven.points()).toEqual([
          { orOpEven: "1" },
          { orOpEven: "2" },
          { orOpEven: "3" },
          { orOpEven: "4" }
        ]);
      });

      it("AND points", () => {
        expect(andOp.points()).toEqual([{ andOp: "12" }]);
      });

      it("multiple AND points", () => {
        expect(andOpEven.points()).toEqual([{ andOpEven: "1234" }]);
      });

      it("multiple and/or", () => {
        expect(complex1.points()).toEqual([
          { complex1: "135" },
          { complex1: "145" },
          { complex1: "235" },
          { complex1: "245" }
        ]);
      });
    });
  });
});
