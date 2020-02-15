function AoNode(type, data) {
  this.data = data;
  this.type = type;
}
AoNode.prototype.isLeaf = function() {
  return !this.left || !this.right;
};
export { AoNode };
