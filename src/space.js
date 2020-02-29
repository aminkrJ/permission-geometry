import { AoTree } from "./aotree";
import { Dimension } from "./dimension";

function Space() {
  this.dimensions = new dimensions();
}
Space.prototype.concat = function(operator, space) {
  this.dimensions.concat(operator, space.dimensions);
};
Space.prototype.points = function() {
  if (this.dimensions.isEmpty()) return [];
  return this.dimensions.points();
};
Space.prototype.includes = function(dimension) {
  return this.dimensions.includes(dimension);
};
function dimensions() {
  this._dimensions = new AoTree();
  this._hash = new Map();
  this.size = 0;
}
dimensions.prototype.concat = function(operator, dimensions) {
  this._dimensions.merge(operator, dimensions._dimensions.root);
  for (let entry of dimensions._hash) {
    if (!this._hash.has(entry[0])) {
      this._hash.set(entry[0], true);
      ++this.size;
    }
  }
};
dimensions.prototype.points = function() {
  return this._dimensions.operate(
    (left, right) => {
      let points = [];
      left.forEach(point1 => {
        right.forEach(point2 => {
          points.push(point1.concat(point2));
        });
      });
      return points;
    },
    (left, right) => {
      return [...new Set([...left, ...right])];
    },
    dimension => {
      return dimension.points();
    }
  );
};
dimensions.prototype.isEmpty = function() {
  return !this.size;
};
dimensions.prototype.includes = function(dimension) {
  return this._hash.has(dimension.axis);
};
dimensions.prototype.add = function(operator, dimension) {
  if (dimension.isEmpty()) throw new Error();
  if (!this._hash.has(dimension.axis)) ++this.size;
  this._hash.set(dimension.axis, true);
  this._dimensions.insert(operator, dimension);
};
export { Space };
