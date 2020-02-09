/*
 * Operation tree, AO graph, generated from multi dimensional conditions
 * e.x country is AUS or USA and city is Syd
 *
 */
const and = "and";
const or = "or";

function Node(val, type, parent) {
  this.val = val;
  this.type = type;
  this.parent = parent;
}
Node.prototype.andExists = function() {
  return this.val.indexOf(and) > -1;
};
Node.prototype.orExists = function() {
  return this.val.indexOf(or) > -1;
};
Node.prototype.leaf = function() {
  return this.left === undefined || this.right === undefined;
};
Node.prototype.set = function() {
  let set;
  if (this.leaf()) return [this.val];
  const l = this.left.set();
  const r = this.right.set();
  if (this.type === and) {
    set = cartesian(l, r);
  } else if (this.type === or) {
    set = l.concat(r);
  }
  return set;
};

// 1 dimention cartesian product
const cartesian = (left, right) => {
  const cartesian = [];
  left.forEach(l => {
    right.forEach(r => {
      cartesian.push(l + r);
    });
  });
  return cartesian;
};

const aoTree = (val, parent = null) => {
  let node = new Node(val, null, parent);
  if (!node.andExists() && !node.orExists()) {
    return node;
  }
  if (node.andExists()) {
    node = new Node(val, and, parent);
    node.left = aoTree(val.slice(0, val.indexOf(and) - 1), node);
    node.right = aoTree(val.slice(val.indexOf(and) + and.length + 1), node);
  } else if (node.orExists()) {
    node = new Node(val, or, parent);
    node.left = aoTree(val.slice(0, val.indexOf(or) - 1), node);
    node.right = aoTree(val.slice(val.indexOf(or) + or.length + 1), node);
  }
  return node;
};

export { aoTree };
