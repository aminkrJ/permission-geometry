import { AoNode, AoTree } from "./aoTree";
import _ from "lodash";

const and = "and";
const or = "or";

function Plane() {
  this.dimentions = [];
  this.tree = new AoTree();
}
Plane.prototype.addDim = function(key, type, tree) {
  this.dimentions.push(key);
  let newNode = new AoNode(tree);

  if (this.tree.isEmpty()) {
    this.tree.add(newNode);
  } else {
    let aoNode = new AoNode(this.dimentions.join(" "), type);
    aoNode.left = this.tree.root;
    aoNode.right = newNode;
    this.tree.root = aoNode;
  }
  return this.tree;
};
Plane.prototype.points = function(node = null, curDim = 0) {
  ++curDim;
  node = node || this.tree.root;
  if (!node.balanced()) {
    return node.data.points();
  }

  return cartesian(
    this.points(node.left, curDim),
    this.points(node.right, curDim),
    node.type,
    this.dimentions.length - curDim
  );
};

const cartesian = function(left, right, type, curDim) {
  const cartesian = [];
  if (type === and) {
    left.forEach(l => {
      right.forEach(r => {
        cartesian.push(_.flatten([l, r]));
      });
    });
  } else {
    left.forEach(l => {
      let numOfZeros = curDim - (Array.isArray(l) ? l.length - 1 : 0);
      cartesian.push(_.flatten([l, new Array(numOfZeros).fill("0")]));
    });

    right.forEach(r => {
      let numOfZeros = curDim - (Array.isArray(r) ? r.length - 1 : 0);
      cartesian.push(_.flatten([new Array(numOfZeros).fill("0"), r]));
    });
  }
  return cartesian;
};

export { Plane };
