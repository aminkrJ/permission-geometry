import { Node } from "./aoTree";
import _ from "lodash";

const and = "and";
const or = "or";

function Plane() {
  this.root = null;
  this.dimentions = [];
}
Plane.prototype.addDim = function(key, type, tree) {
  this.dimentions.push(key);
  const newNode = new Node(tree, type);
  if (!this.root) {
    if (type) throw new Error("this must be a value node");
    this.root = new Node(tree, type);
  } else {
    let newRoot = new Node(
      `${this.dimentions[this.dimentions.length - 2]} ${type} ${key}`,
      type
    );
    let tmp = this.root;
    newRoot.left = tmp;
    newRoot.right = newNode;
    this.root = newRoot;
  }

  return this.root;
};
// multiple dimention cartesian product
Plane.prototype.set = function(cur = null, curDim = 0) {
  ++curDim;
  cur = cur || this.root;
  if (cur.left === undefined || cur.right === undefined) {
    return cur.val.set();
  }

  return cartesian(
    this.set(cur.left, curDim),
    this.set(cur.right, curDim),
    cur.type,
    this.dimentions.length - curDim
  );
};

Plane.prototype.balanced = function() {
  return this.root.left !== undefined && this.root.right !== undefined;
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
