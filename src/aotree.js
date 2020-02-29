import { Node } from "./node";
import { Point } from "./point";

const and = "and";
const or = "or";
const origin = 0;

function AoTree(root = null) {
  this.root = root;
}
AoTree.prototype.hasOperands = function(node = this.root) {
  return node.left && node.right;
};
AoTree.prototype.isEmpty = function() {
  return !Boolean(this.root);
};
AoTree.prototype.insert = function(operator, data) {
  if (this.isEmpty()) {
    this.root = new Node(null, data);
  } else {
    this.concat(operator, data);
  }
  return this;
};
AoTree.prototype.leaves = function(node = this.root) {
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
AoTree.prototype.concat = function(operator, data) {
  let opNode = new Node(operator, "operator");
  opNode.right = new Node(null, data);
  opNode.left = this.root;
  this.root = opNode;
  return this;
};
AoTree.prototype.merge = function(operator, data) {
  let opNode = new Node(operator, "operator");
  opNode.right = data;
  opNode.left = this.root;
  this.root = opNode;
  return this;
};
AoTree.prototype.operate = function(andOp, orOp, sOp, cur = this.root) {
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
AoTree.prototype.includes = function(value) {
  return this.leaves()
    .map(l => l.data)
    .includes(value);
};
AoTree.prototype.search = function(value) {
  let leaves = this.leaves();
  for (let i = 0; i < leaves.length; i++) {
    if (leaves[i].data === value) return leaves[i];
  }
  return null;
};
export { AoTree };
