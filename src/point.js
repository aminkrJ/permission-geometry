function Point() {
  this.coordinates = {};
}
Point.prototype.setCoordinates = function(axis, position) {
  this.coordinates = { ...this.coordinates, ...{ axis: position } };
  return this.coordinates;
};
export { Point };
