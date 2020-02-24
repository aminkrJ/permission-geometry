import { Tree } from "./tree";
import { Dimension } from "./dimension";

function Space() {
  this.dimensions = new Tree();
}
// multiple permissions
Space.prototype.concat = function(space) {
  this.dimensions.merge("or", space.dimensions.root);
  return this;
};
Space.prototype.addDimension = function(type, dimension) {
  if (dimension.isEmpty())
    throw new Error("Dimension must contains one position");
  if (this.dimensions.isEmpty()) {
    this.dimensions.add(null, dimension);
  } else {
    if (this.includes(dimension)) {
      let d = this.search(dimension);
      d.merge(dimension);
    } else {
      this.dimensions.concat(type, dimension);
    }
  }
  return this;
};
Space.prototype.points = function() {
  if (this.dimensions.isEmpty()) return [];
  return this.dimensions.operate(
    (lPoints, rPoints) => {
      let points = [];
      lPoints.forEach(point1 => {
        rPoints.forEach(point2 => {
          point1.setCoordinates(point2.coordinates);
          points.push(point1);
        });
      });
      return points;
    },
    (lPoints, rPoints) => {
      let points = [];
      let lzero = Object.keys(rPoints[0].coordinates);
      let rzero = Object.keys(lPoints[0].coordinates);
      lPoints.forEach(point => {
        lzero.forEach(axis => {
          point.setCoordinate(axis, 0);
        });
        points.push(point);
      });
      rPoints.forEach(point => {
        rzero.forEach(axis => {
          point.setCoordinate(axis, 0);
        });
        points.push(point);
      });
      return points;
    },
    dimension => {
      return dimension.points();
    }
  );
};
Space.prototype.includes = function(dimension) {
  return this.dimensions
    .leaves()
    .map(l => l.data.axis)
    .includes(dimension.axis);
};
Space.prototype.search = function(dimension) {
  let leaves = this.dimensions.leaves();
  for (let i = 0; i < leaves.length; i++) {
    if (leaves[i].data.axis === dimension.axis) return leaves[i].data;
  }
  return null;
};
export { Space };
