const and = "and";
const or = "or";

function AoNode(data, type = null) {
  this.data = data;
  this.type = type;
  this.left = null;
  this.right = null;
  this.parent = null;
}
AoNode.prototype.balanced = function() {
  return this.left !== null && this.right !== null;
};
AoNode.prototype.points = function() {
  let points;
  if (!this.balanced()) return [this.data];
  const l = this.left.points();
  const r = this.right.points();
  if (this.type === and) {
    points = cartesian(l, r);
  } else if (this.type === or) {
    points = l.concat(r);
  }
  return points;
};

const cartesian = (left, right) => {
  const cartesian = [];
  left.forEach(l => {
    right.forEach(r => {
      cartesian.push(l + r);
    });
  });
  return cartesian;
};

export { AoNode };
