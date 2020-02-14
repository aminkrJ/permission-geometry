import { AoTree } from "./AoTree";
import _ from "lodash";

const and = "and";
const or = "or";

function AoNode(data, type = null, tree = null) {
  this.data = data;
  this.type = type;
  // highest level tree
  this.tree = tree;
  this.left = null;
  this.right = null;
  this.parent = null;
}
AoNode.prototype.balanced = function() {
  return this.left !== null && this.right !== null;
};
AoNode.prototype.points = function() {
  if (!this.balanced()) {
    if (typeof this.data === "string") {
      return [this.data];
    } else {
      return this.data.points();
    }
  }
  const leftPoints = this.left.points();
  const rightPoints = this.right.points();
  if (this.type === and) {
    if (this.tree.isComplex()) {
      return cartesian(leftPoints, rightPoints, (l, r) => _.flatten([l, r]));
    } else {
      return cartesian(leftPoints, rightPoints, (l, r) => l + r);
    }
  } else if (this.type === or) {
    if (this.tree.isComplex()) {
      return multiDimensionCoordinates(leftPoints, rightPoints, this);
    } else {
      return leftPoints.concat(rightPoints);
    }
  }
};

const multiDimensionCoordinates = (left, right, node) => {
  let points = [];
  let lenOfC = this.tree.leaves(node).length;
  left.forEach(l => {
    let lenOfL = Array.isArray(l) ? l.length : 1;
    let zeros = lenOfC - lenOfL;
    if (zeros > 0) {
      points.push(_.flatten([l, new Array(zeros).fill("0")]));
    } else {
      points.push(_.flatten([l]));
    }
  });
  right.forEach(r => {
    let lenOfR = Array.isArray(r) ? r.length : 1;
    let zeros = lenOfC - lenOfR;
    if (zeros > 0) {
      points.push(_.flatten([new Array(zeros).fill("0"), r]));
    } else {
      points.push(_.flatten([r]));
    }
  });
  return points;
};

const cartesian = (left, right, op) => {
  let cartesian = [];
  left.forEach(l => {
    right.forEach(r => {
      cartesian.push(op(l, r));
    });
  });
  return cartesian;
};

export { AoNode };
