import { Node } from "./node";
import { Tree } from "./tree";

const and = "and";
const or = "or";
const is = "is";

// TODO support for range and not

function AoQuery(query) {
  this.query = query;
  // can be both
  this.isAnd = this.exists(and);
  this.isOr = this.exists(or);
  this.tree = new Tree(this.convertToAOTree());
}
AoQuery.prototype.exists = function(pattern) {
  return this.query.indexOf(pattern) > -1;
};
AoQuery.prototype.convertToAOTree = function() {
  let node;
  if (!this.isAnd && !this.isOr) {
    node = new Node(null, this.query);
    return node;
  }
  if (this.isAnd) {
    node = new Node(and, this.query);
    node.left = new AoQuery(
      this.query.slice(0, this.query.indexOf(and) - 1)
    ).convertToAOTree();
    node.right = new AoQuery(
      this.query.slice(this.query.indexOf(and) + and.length + 1)
    ).convertToAOTree();
  } else if (this.isOr) {
    node = new Node(or, this.query);
    node.left = new AoQuery(
      this.query.slice(0, this.query.indexOf(or) - 1)
    ).convertToAOTree();
    node.right = new AoQuery(
      this.query.slice(this.query.indexOf(or) + or.length + 1)
    ).convertToAOTree();
  }
  return node;
};

export { AoQuery };
