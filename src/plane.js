import { AoTree } from "./AoTree";

const and = "and";
const or = "or";

function Plane() {
  this.tree = new AoTree();
}
Plane.prototype.addDimension = function(type, tree) {
  if (this.tree.isEmpty()) {
    this.tree.add(type, tree);
  } else {
    this.tree.concat(type, tree);
  }
  return this;
};
Plane.prototype.points = function() {
  return this.tree.points(this.tree.root);
};

export { Plane };
