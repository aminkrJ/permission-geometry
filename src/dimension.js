import { Point } from "./point";

function Dimension(axis) {
  this.positions = new AoTree();
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
  let points = [];
  this.positions.operate(
    (l, r) => {
      let point = new Point();
      point.setCoordinate(this.axis, `${l}-${r}`);
      points.push(point);
    },
    (l, r) => {
      let point1 = new Point();
      let point2 = new Point();
      point1.setCoordinate(this.axis, l);
      point2.setCoordinate(this.axis, r);
      point.push(point1, point2);
    }
  );
  return points;
};

export { Dimension };
