import { aoNode, queryToAoTree } from "../src/aoTree";

describe(".queryToAoTree", () => {
  it("returns value node", () => {
    const tree = queryToAoTree("1");
    expect(tree.root.data).toBe("1");
  });

  it("one and data", () => {
    const tree = queryToAoTree("1 and 2");
    const root = tree.root;
    expect(root.data).toBe("1 and 2");
    expect(root.type).toBe("and");
    expect(root.left.data).toBe("1");
    expect(root.right.data).toBe("2");
    expect(root.right.type).toBe(null);
  });

  it("one or data", () => {
    const tree = queryToAoTree("1 or 2");
    const root = tree.root;
    expect(root.data).toBe("1 or 2");
    expect(root.left.data).toBe("1");
    expect(root.right.data).toBe("2");
    expect(root.right.type).toBe(null);
    expect(root.type).toBe("or");
  });

  it("multiple and/or", () => {
    const tree = queryToAoTree("1 or 2 and 3 and 4 or 5 and 6");
    const root = tree.root;
    expect(root.left.data).toBe("1 or 2");
    expect(root.right.data).toBe("3 and 4 or 5 and 6");
    expect(root.left.left.data).toBe("1");
    expect(root.left.right.data).toBe("2");
    expect(root.right.left.data).toBe("3");
    expect(root.right.right.data).toBe("4 or 5 and 6");
    expect(root.right.right.right.data).toBe("6");
  });
});

describe("Node", () => {
  describe(".points", () => {
    it("node is a leaf", () => {
      const tree = queryToAoTree("1");
      expect(tree.points()).toEqual(["1"]);
    });

    it("OR points", () => {
      const tree = queryToAoTree("1 or 2");
      expect(tree.points()).toEqual(["1", "2"]);
    });

    it("multiple OR points", () => {
      const tree = queryToAoTree("1 or 2 or 3 or 4");
      expect(tree.points()).toEqual(["1", "2", "3", "4"]);
    });

    it("AND points", () => {
      const tree = queryToAoTree("1 and 2");
      expect(tree.points()).toEqual(["12"]);
    });

    it("multiple AND points", () => {
      const tree = queryToAoTree("1 and 2 and 3 and 4");
      expect(tree.points()).toEqual(["1234"]);
    });

    it("multiple and/or", () => {
      const tree = queryToAoTree("1 or 2 and 3");
      expect(tree.points()).toEqual(["13", "23"]);
    });

    it("multiple and/or 2", () => {
      const tree = queryToAoTree("1 or 2 and 3 or 4");
      expect(tree.points()).toEqual(["13", "14", "23", "24"]);
    });
  });
});
