import { Node } from "./node";
import { Point } from "./point";

const and = "and";
const or = "or";
const origin = 0;

function Tree(root = null) {
  this.root = root;
}
Tree.prototype.hasOperands = function(node = this.root) {
  return node.left && node.right;
};
Tree.prototype.isEmpty = function() {
  return !Boolean(this.root);
};
Tree.prototype.add = function(type, data) {
  let node = new Node(type, data);
  if (this.root) {
    this.insert(node);
  } else {
    this.root = node;
  }
  return node;
};
Tree.prototype.leaves = function(node = this.root) {
  const queue = [node];
  let leaves = [];
  while (queue.length > 0) {
    let cur = queue.pop();
    if (cur.left) queue.unshift(cur.left);
    if (cur.right) queue.unshift(cur.right);
    if (cur.isLeaf()) {
      leaves.push(cur);
    }
  }
  return leaves;
};
Tree.prototype.insert = function(node) {
  const stack = [this.root];
  while (stack.length > 0) {
    let cur = stack.pop();
    if (!cur.isLeaf()) {
      stack.push(cur.right, cur.left);
    } else {
      cur.left ? (cur.right = node) : (cur.left = node);
      break;
    }
  }
  return node;
};
Tree.prototype.concat = function(type, data) {
  let operator = new Node(type, "operator");
  operator.right = new Node(null, data);
  operator.left = this.root;
  this.root = operator;
  return this;
};
Tree.prototype.merge = function(type, tree) {
  let operator = new Node(type, "operator");
  operator.right = tree.root;
  operator.left = this.root;
  this.root = operator;
  return this;
};
Tree.prototype.operate = function(andOp, orOp, sOp, cur = this.root) {
  if (!cur) return orgin;
  if (cur.isLeaf()) {
    return sOp(cur.data);
  }
  if (cur.type === and) {
    return andOp(
      this.operate(andOp, orOp, sOp, cur.left),
      this.operate(andOp, orOp, sOp, cur.right)
    );
  } else {
    return orOp(
      this.operate(andOp, orOp, sOp, cur.left),
      this.operate(andOp, orOp, sOp, cur.right)
    );
  }
};
Tree.prototype.includes = function(value) {
  return this.leaves()
    .map(l => l.data)
    .includes(value);
};
Tree.prototype.search = function(value) {
  let leaves = this.leaves();
  for (let i = 0; i < leaves.length; i++) {
    if (leaves[i].data === value) return leaves[i];
  }
  return null;
};
export { Tree };
