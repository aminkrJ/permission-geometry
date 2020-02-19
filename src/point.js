function Point() {
  this.coordinates = {};
}
Point.prototype.setCoordinate = function(axis, position) {
  this.coordinates = { ...this.coordinates, ...{ [axis]: position } };
  return this.coordinates;
};
Point.prototype.setCoordinates = function(newCoordinates) {
  this.coordinates = { ...this.coordinates, ...newCoordinates };
  return this.coordinates;
};
export { Point };
