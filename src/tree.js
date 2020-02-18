import { Node } from "./node";

const and = "and";
const or = "or";
const origin = 0;

function AoTree(root = null) {
  this.root = root;
}
AoTree.prototype.isEmpty = function() {
  return !Boolean(this.root);
};
AoTree.prototype.add = function(type, data) {
  let node = new Node(type, data);
  if (this.root) {
    this.insert(node);
  } else {
    this.root = node;
  }
  return node;
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
AoTree.prototype.insert = function(node) {
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
AoTree.prototype.concat = function(type, data) {
  let operator = new AoNode(type, "operator");
  operator.right = new AoNode(null, data);
  operator.left = this.root;
  this.root = operator;
  return this;
};
AoTree.prototype.operate = function(andOp, orOp, cur = this.root) {
  if (!cur) return orgin;
  if (cur.isEmpty()) return cur.data;
  if (cur.type === and) {
    return andOp(
      this.operate(andOp, orOp, cur.left),
      this.operate(andOp, orOp, cur.right)
    );
  } else {
    return orOp(
      this.operate(andOp, orOp, cur.left),
      this.operate(andOp, orOp, cur.right)
    );
  }
};
export { AoTree };
