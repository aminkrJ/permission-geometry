import { Node } from "./node";
import { Space } from "./space";
import { Dimension } from "./dimension";
import { Tree } from "./tree";

// TODO support for range and not

function Query(query) {
  this.query = query;
}
Query.prototype.exists = function(pattern) {
  return this.query.indexOf(pattern) > -1;
};
Query.prototype.convertToDimension = function(axis) {
  let dimension = new Dimension(axis);
  const pattern = /\b\s*(and|or)\s*\b/;
  let positions = this.query.split(pattern);
  positions.unshift(null);
  for (let i = 1; i < positions.length; i += 2) {
    dimension.addPosition(positions[i - 1], positions[i]);
  }
  return dimension;
};
Query.prototype.convertToSpace = function() {
  const spacePattern = /\b(and|or)(?=\s*\w*\s*\bis)/;
  const dimensionPattern = /\b\s*is\s*\b/;
  const spaces = this.query.split(spacePattern);
  let space = new Space();
  spaces.unshift(null);
  for (let i = 1; i < spaces.length; i += 2) {
    let dimensionQ, operator, dimension, splitted;
    splitted = spaces[i].split(dimensionPattern);
    dimensionQ = new Query(splitted[1]);
    dimension = dimensionQ.convertToDimension(splitted[0]);
    operator = spaces[i - 1];
    space.addDimension(operator, dimension);
  }
  return space;
};

/**
 * generate query from array of rule objects
 */
function buildFromObj(objs) {}

export { Query };
