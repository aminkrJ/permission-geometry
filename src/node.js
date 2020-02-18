import { Dimension } from "./dimension";

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
AoNode.prototype.isOperator = function() {
  return this.type === "and" || this.type === "or";
};
export { AoNode };
