import { AoNode } from "./AoNode";
import _ from "lodash";

const and = "and";
const or = "or";

function AoTree(root = null) {
  this.root = root;
}
AoTree.prototype.isEmpty = function() {
  return !Boolean(this.root);
};
AoTree.prototype.isMultiDimension = function() {
  const leaves = this.leaves();
  let dm = false;
  for (let i = 0; i < leaves.length; i++) {
    if (leaves[i].data instanceof AoTree) {
      dm = true;
      break;
    }
  }
  return dm;
};
AoTree.prototype.add = function(type, data) {
  let node = new AoNode(type, data);
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
AoTree.prototype.concat = function(type, tree) {
  let operator = new AoNode(type, "operator");
  operator.right = new AoNode(null, tree);
  operator.left = this.root;
  this.root = operator;
  return this;
};
AoTree.prototype.points = function(cur = this.root) {
  // TODO refactoring to complex, operator and simple nodes
  if (cur.isLeaf()) {
    if (cur.data instanceof AoTree) {
      if (!cur.data.root.isLeaf())
        return d1coords(
          this.points(cur.data.root.left),
          this.points(cur.data.root.right),
          cur.data.root,
          this
        );
      return [cur.data.root.data];
    }
    return [cur.data];
  } else {
    if (this.isMultiDimension()) {
      return dncoords(this.points(cur.left), this.points(cur.right), cur, this);
    } else {
      return d1coords(this.points(cur.left), this.points(cur.right), cur, this);
    }
  }
};

const d1coords = (lcoords, rcoords, node, tree) => {
  if (node.type === and) {
    return cartesian(lcoords, rcoords, (l, r) => l + r);
  } else if (node.type === or) {
    return lcoords.concat(rcoords);
  }
};
const dncoords = (lcoords, rcoords, node, tree) => {
  let points = [];
  if (node.type === and) {
    return cartesian(lcoords, rcoords, (l, r) => _.flatten([l, r]));
  } else {
    let lenOfC = tree.leaves(node).length;
    lcoords.forEach(l => {
      let lenOfL = Array.isArray(l) ? l.length : 1;
      let zeros = lenOfC - lenOfL;
      if (zeros > 0) {
        points.push(_.flatten([l, new Array(zeros).fill("0")]));
      } else {
        points.push(_.flatten([l]));
      }
    });
    rcoords.forEach(r => {
      let lenOfR = Array.isArray(r) ? r.length : 1;
      let zeros = lenOfC - lenOfR;
      if (zeros > 0) {
        points.push(_.flatten([new Array(zeros).fill("0"), r]));
      } else {
        points.push(_.flatten([r]));
      }
    });
  }
  return points;
};
const cartesian = (lcoords, rcoords, op) => {
  let cartesian = [];
  lcoords.forEach(l => {
    rcoords.forEach(r => {
      cartesian.push(op(l, r));
    });
  });
  return cartesian;
};

export { AoTree };
