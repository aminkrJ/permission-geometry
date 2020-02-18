import { Dimension } from "./Dimension";

function AoNode(type, data) {
  this.data = data;
  this.type = type;
}
AoNode.prototype.isLeaf = function() {
  return !this.left || !this.right;
};
AoNode.prototype.isSimple = function() {
  return typeof this.data === "string" || this.data instanceof String;
};
AoNode.prototype.isComplex = function() {
  return this.data instanceof Dimension;
};
AoNode.prototype.isOperator = function() {
  return this.type === "and" || this.type === "or";
};
export { AoNode };
