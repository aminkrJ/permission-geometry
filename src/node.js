import { Dimension } from "./dimension";

function Node(type, data) {
  this.data = data;
  this.type = type;
}
Node.prototype.isLeaf = function() {
  return !this.left || !this.right;
};
Node.prototype.isSimple = function() {
  return typeof this.data === "string" || this.data instanceof String;
};
Node.prototype.isOperator = function() {
  return this.type === "and" || this.type === "or";
};
export { Node };
