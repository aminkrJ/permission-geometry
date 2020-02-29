import { Point } from "./point";

function Dimension(axis) {
  this.positions = new positions();
  this.axis = axis;
}
Dimension.prototype.concat = function(dimension) {
  if (this.axis !== dimension.axis)
    throw new Error("cannot concat dimensions with different axis");
  this.positions = this.positions.concat(dimension.positions);
  return this;
};
Dimension.prototype.points = function() {
  if (this.positions.isEmpty()) return [];
  return this.positions.map(position => {
    let point = new Point();
    point.coordinates.set(this.axis, position);
    return point;
  });
};
Dimension.prototype.isEmpty = function() {
  return this.positions.isEmpty();
};
function positions() {
  this._positions = [];
  this.size = 0;
}
positions.prototype.add = function(position) {
  if (this._positions.includes(position)) return this;
  this._positions.push(position);
  ++this.size;
  return this;
};
positions.prototype.concat = function(positions) {
  this._positions = [...new Set([...this._positions, ...positions._positions])];
  this.size = this._positions.length;
  return this;
};
positions.prototype.isEmpty = function() {
  return !this._positions.length;
};
positions.prototype.map = function(func) {
  return this._positions.map((p, index) => {
    return func(p, index);
  });
};

export { Dimension };
