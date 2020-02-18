import { Tree } from "./tree";
import { Dimension } from "./dimension";

function Space() {
  this.dimensions = new Tree();
}
Space.prototype.addDimension = function(type, dimension) {
  if (this.dimensions.isEmpty()) {
    this.dimensions.add(null, dimension);
  } else {
    this.dimensions.concat(type, dimension);
  }
  return this;
};
Space.prototype.points = function() {
  let points = [];
  return this.dimensions.operate(
    (lPoints, rPoints) => {
      lPoints.forEach(point1 => {
        rPoints.forEach(point2 => {
          point1.setCoordinate(point2.coordinates);
          points.push(point1);
        });
      });
      return points;
    },
    (lPoints, rPoints) => {
      lPoints.forEach(point => {
        Object.keys(rPoints[0]).forEach(axis => {
          point.setCoordinate(axis, 0);
        });
        points.push(point);
      });
      rPoints.forEach(point => {
        Object.keys(lPoints[0]).forEach(axis => {
          point.setCoordinate(axis, 0);
        });
        points.push(point);
      });
      return points;
    }
  );
};

export { Space };
