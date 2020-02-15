import { AoNode } from "./AoNode";
import { AoTree } from "./AoTree";

const and = "and";
const or = "or";

function AoQuery(query) {
  this.query = query;
  // can be both
  this.isAnd = this.exists(and);
  this.isOr = this.exists(or);
}
AoQuery.prototype.exists = function(pattern) {
  return this.query.indexOf(pattern) > -1;
};
AoQuery.prototype.buildNode = function() {
  let node;
  if (!this.isAnd && !this.isOr) {
    node = new AoNode(null, this.query);
    return node;
  }
  if (this.isAnd) {
    node = new AoNode(and, this.query);
    node.left = new AoQuery(
      this.query.slice(0, this.query.indexOf(and) - 1)
    ).buildNode();
    node.right = new AoQuery(
      this.query.slice(this.query.indexOf(and) + and.length + 1)
    ).buildNode();
  } else if (this.isOr) {
    node = new AoNode(or, this.query);
    node.left = new AoQuery(
      this.query.slice(0, this.query.indexOf(or) - 1)
    ).buildNode();
    node.right = new AoQuery(
      this.query.slice(this.query.indexOf(or) + or.length + 1)
    ).buildNode();
  }
  return node;
};
AoQuery.prototype.tree = function() {
  return new AoTree(this.buildNode());
};

export { AoQuery };
