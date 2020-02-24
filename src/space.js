import { Tree } from "./tree";
import { Dimension } from "./dimension";

function Space() {
  this.dimensions = new Tree();
}
// multiple permissions
Space.prototype.concat = function(space) {
  this.dimensions.concat("or", space.dimensions);
  return this;
};
Space.prototype.addDimension = function(type, dimension) {
  if (dimension.isEmpty())
    throw new Error("Dimension must contains one position");
  if (this.dimensions.isEmpty()) {
    this.dimensions.add(null, dimension);
  } else {
    if (this.dimensions.includes(dimension)) {
      let dimension = this.dimensions.get(dimension);
      // TODO this adds or between positions - can break the order of AND/OR
      dimension.addPosition("or", dimension.positions);
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

export { Space };
