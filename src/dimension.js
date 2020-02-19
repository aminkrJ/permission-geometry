import { Point } from "./point";
import { Tree } from "./tree";

function Dimension(axis) {
  this.positions = new Tree();
  this.axis = axis;
}
// position type is a string
Dimension.prototype.addPosition = function(type, position) {
  if (this.positions.isEmpty()) {
    this.positions.add(null, position);
  } else {
    this.positions.concat(type, position);
  }
  return this;
};
Dimension.prototype.points = function() {
  if (this.positions.isEmpty()) return [];
  return this.positions.operate(
    (lPoints, rPoints) => {
      let points = [];
      lPoints.forEach(point1 => {
        rPoints.forEach(point2 => {
          point1.setCoordinate(
            this.axis,
            `${point1.coordinates[this.axis]}-${point2.coordinates[this.axis]}`
          );
          points.push(point1);
        });
      });
      return points;
    },
    (lPoints, rPoints) => {
      let points = [];
      lPoints.forEach(point => {
        points.push(point);
      });
      rPoints.forEach(point => {
        points.push(point);
      });
      return points;
    },
    data => {
      let point = new Point();
      point.setCoordinate(this.axis, data);
      return [point];
    }
  );
};

export { Dimension };
