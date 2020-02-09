import { aoTree } from "../src/aoTree";

describe(".aoTree", () => {
  it("returns value node", () => {
    const root = aoTree("1");
    expect(root.val).toBe("1");
    expect(root.parent).toBeNull();
  });

  it("one and val", () => {
    const root = aoTree("1 and 2");
    expect(root.val).toBe("1 and 2");
    expect(root.left.val).toBe("1");
    expect(root.right.val).toBe("2");
    expect(root.right.type).toBe(null);
    expect(root.type).toBe("and");
  });

  it("one or val", () => {
    const root = aoTree("1 or 2");
    expect(root.val).toBe("1 or 2");
    expect(root.left.val).toBe("1");
    expect(root.right.val).toBe("2");
    expect(root.right.type).toBe(null);
    expect(root.type).toBe("or");
  });

  it("multiple and/or", () => {
    const root = aoTree("1 or 2 and 3 and 4 or 5 and 6");
    expect(root.left.val).toBe("1 or 2");
    expect(root.right.val).toBe("3 and 4 or 5 and 6");
    expect(root.left.left.val).toBe("1");
    expect(root.left.right.val).toBe("2");
    expect(root.right.left.val).toBe("3");
    expect(root.right.right.val).toBe("4 or 5 and 6");
    expect(root.right.right.right.val).toBe("6");
  });
});
describe("Node", () => {
  describe(".set", () => {
    it("node is a leaf", () => {
      const root = aoTree("1");
      expect(root.set()).toEqual(["1"]);
    });

    it("OR set", () => {
      const root = aoTree("1 or 2");
      expect(root.set()).toEqual(["1", "2"]);
    });

    it("multiple OR set", () => {
      const root = aoTree("1 or 2 or 3 or 4");
      expect(root.set()).toEqual(["1", "2", "3", "4"]);
    });

    it("AND set", () => {
      const root = aoTree("1 and 2");
      expect(root.set()).toEqual(["12"]);
    });

    it("multiple AND set", () => {
      const root = aoTree("1 and 2 and 3 and 4");
      expect(root.set()).toEqual(["1234"]);
    });

    it("multiple and/or", () => {
      const root = aoTree("1 or 2 and 3");
      expect(root.set()).toEqual(["13", "23"]);
    });

    it("multiple and/or 2", () => {
      const root = aoTree("1 or 2 and 3 or 4");
      expect(root.set()).toEqual(["13", "14", "23", "24"]);
    });
  });
});
