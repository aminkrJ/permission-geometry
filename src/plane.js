import { AoTree } from "./AoTree";

const and = "and";
const or = "or";

function Plane() {
  this.dimension = [];
  this.tree = new AoTree();
}
Plane.prototype.addDim = function(key, type, tree) {
  this.dimension.push(key);
  if (this.tree.isEmpty()) {
    this.tree.root = tree.root;
  } else {
    this.tree.concat(tree, type);
  }
  return this;
};
Plane.prototype.concat = function(plane) {
  this.dimension.push(...plane.dimension);
  this.tree.concat(plane.tree);
};
Plane.prototype.points = function() {
  return this.tree.root.points();
};

export { Plane };
