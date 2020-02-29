function Point() {
  this.coordinates = new coordinates();
}
Point.prototype.concat = function(point) {
  let nPoint = new Point();
  nPoint.coordinates.concat(this.coordinates);
  nPoint.coordinates.concat(point.coordinates);
  return nPoint;
};
function coordinates() {
  this._coordinates = {};
}
coordinates.prototype.set = function(key, value) {
  this._coordinates = { ...this._coordinates, ...{ [key]: value } };
};
coordinates.prototype.concat = function(coordinates) {
  this._coordinates = { ...this._coordinates, ...coordinates._coordinates };
};

export { Point };
