import { AoNode } from "./AoNode";

const and = "and";
const or = "or";

function AoRule(query) {
  this.query = query;
  // can be both
  this.isAnd = this.exists(and);
  this.isOr = this.exists(or);
}
AoRule.prototype.exists = function(pattern) {
  return this.query.indexOf(pattern) > -1;
};

function AoTree() {
  this.root = null;
}
AoTree.prototype.make = function(data, type) {
  return new AoNode(data, type, tree);
};
AoTree.prototype.points = function() {
  return this.root.points();
};
AoTree.prototype.isComplex = function() {
  const leaves = this.leaves();
  let complex = false;
  for (let i = 0; i < leaves.length; i++) {
    if (typeof leaves[i].data !== "string") {
      complex = true;
      break;
    }
  }
  return complex;
};
AoTree.prototype.isEmpty = function() {
  return this.root === null;
};
AoTree.prototype.add = function(node, cur) {
  node.tree = this;
  if (this.root === null) {
    this.root = node;
  } else {
    this.insert(node, cur || this.root);
  }
  return node;
};
AoTree.prototype.leaves = function(node) {
  const queue = [node || this.root];
  let leaves = [];
  while (queue.length > 0) {
    let cur = queue.pop();
    if (cur.left) queue.unshift(cur.left);
    if (cur.right) queue.unshift(cur.right);
    if (!cur.balanced()) {
      leaves.push(cur);
    }
  }
  return leaves;
};
AoTree.prototype.insert = function(node, cur) {
  const stack = [cur];
  while (stack.length > 0) {
    let cur = stack.pop();
    if (cur.balanced()) {
      stack.push(cur.right);
      stack.push(cur.left);
    } else {
      node.parent = cur;
      if (cur.left === null) {
        cur.left = node;
      } else {
        cur.right = node;
      }
      return node;
    }
  }
};
AoTree.prototype.concat = function(tree, type = or) {
  let node = tree.make("concat", type);
  node.left = this.root;
  node.right = tree.root;
  this.root = node;
};
const queryToAoTree = query => {
  const tree = new AoTree();
  const rule = new AoRule(query);
  if (!rule.isAnd && !rule.isOr) {
    tree.add(new AoNode(query));
    return tree;
  }
  let node, leftT, rightT;
  if (rule.isAnd) {
    node = tree.add(new AoNode(query, and));
    leftT = queryToAoTree(query.slice(0, query.indexOf(and) - 1));
    rightT = queryToAoTree(query.slice(query.indexOf(and) + and.length + 1));
  } else if (rule.isOr) {
    node = tree.add(new AoNode(query, or));
    leftT = queryToAoTree(query.slice(0, query.indexOf(or) - 1));
    rightT = queryToAoTree(query.slice(query.indexOf(or) + or.length + 1));
  }
  tree.add(leftT.root, node);
  tree.add(rightT.root, node);
  return tree;
};

export { AoTree, queryToAoTree };
