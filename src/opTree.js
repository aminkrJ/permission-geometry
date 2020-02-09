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

const buildTree = (val, parent = null) => {
  let node = new Node(val, null, parent);
  if (!node.andExists() && !node.orExists()) {
    return node;
  }
  if (node.andExists()) {
    node = new Node(val, and, parent);
    node.left = buildTree(val.slice(0, val.indexOf(and) - 1), node);
    node.right = buildTree(val.slice(val.indexOf(and) + and.length + 1), node);
  } else if (node.orExists()) {
    node = new Node(val, or, parent);
    node.left = buildTree(val.slice(0, val.indexOf(or) - 1), node);
    node.right = buildTree(val.slice(val.indexOf(or) + or.length + 1), node);
  }
  return node;
};

// 1 dimention
const points = node => {};

export { buildTree };
