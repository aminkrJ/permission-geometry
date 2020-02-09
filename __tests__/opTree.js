import { buildTree } from "../src/opTree";

describe(".buildTree", () => {
  it("returns value node", () => {
    const root = buildTree("1");
    expect(root.val).toBe("1");
    expect(root.parent).toBeNull();
  });

  it("one and val", () => {
    const root = buildTree("1 and 2");
    expect(root.val).toBe("1 and 2");
    expect(root.left.val).toBe("1");
    expect(root.right.val).toBe("2");
    expect(root.right.type).toBe(null);
    expect(root.type).toBe("and");
  });

  it("one or val", () => {
    const root = buildTree("1 or 2");
    expect(root.val).toBe("1 or 2");
    expect(root.left.val).toBe("1");
    expect(root.right.val).toBe("2");
    expect(root.right.type).toBe(null);
    expect(root.type).toBe("or");
  });

  it("multiple and/or", () => {
    const root = buildTree("1 or 2 and 3 and 4 or 5 and 6");
    expect(root.left.val).toBe("1 or 2");
    expect(root.right.val).toBe("3 and 4 or 5 and 6");
    expect(root.left.left.val).toBe("1");
    expect(root.left.right.val).toBe("2");
    expect(root.right.left.val).toBe("3");
    expect(root.right.right.val).toBe("4 or 5 and 6");
    expect(root.right.right.right.val).toBe("6");
  });
});
