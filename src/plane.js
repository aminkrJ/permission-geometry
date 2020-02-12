import { AoNode, AoTree } from "./aoTree";
import _ from "lodash";

const and = "and";
const or = "or";

function Plane() {
  this.dimension = [];
  this.tree = new AoTree();
}
Plane.prototype.addDim = function(key, type, tree) {
  this.dimension.push(key);
  let newNode = new AoNode(tree);
  if (this.tree.isEmpty()) {
    this.tree.root = newNode;
  } else {
    let node = new AoNode(this.dimension.join(" "), type);
    node.left = this.tree.root;
    node.right = newNode;
    this.tree.root = node;
  }
  return this;
};
Plane.prototype.concat = function(plane) {
  this.dimension.push(...plane.dimension);
  let orNode = new AoNode(this.dimension.join(" "), or);
  orNode.left = this.tree.root;
  orNode.right = plane.tree.root;
  this.tree.root = orNode;
};
Plane.prototype.points = function(node = null, count = 0) {
  node = node || this.tree.root;
  if (!node.balanced()) {
    return node.data.points();
  }

  return this.coordinates(
    this.points(node.left),
    this.points(node.right),
    node
  );
};
Plane.prototype.coordinates = function(left, right, cur) {
  const coordinates = [];
  if (cur.type === and) {
    left.forEach(l => {
      right.forEach(r => {
        coordinates.push(_.flatten([l, r]));
      });
    });
  } else {
    let lenOfC = this.tree.balancedNodes(cur) + 1;
    left.forEach(l => {
      let lenOfL = Array.isArray(l) ? l.length : 1;
      let zeros = Math.abs(lenOfC - lenOfL);
      if (zeros > 0) {
        coordinates.push(_.flatten([l, new Array(zeros).fill("0")]));
      } else {
        coordinates.push(_.flatten([l]));
      }
    });
    right.forEach(r => {
      let lenOfR = Array.isArray(r) ? r.length : 1;
      let zeros = Math.abs(lenOfC - lenOfR);
      if (zeros > 0) {
        coordinates.push(_.flatten([new Array(zeros).fill("0"), r]));
      } else {
        coordinates.push(_.flatten([r]));
      }
    });
  }
  return coordinates;
};

export { Plane };
