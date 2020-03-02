import { Space } from "./space";
import { Dimension } from "./dimension";

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
  positions.unshift("");
  for (let i = 1; i < positions.length; i += 2) {
    dimension.positions.add(positions[i].trim());
  }
  return dimension;
};
Query.prototype.convertToSpace = function() {
  const spacePattern = /\b(and|or)(?=\s*\w*\s*\bis)/;
  const dimensionPattern = /\b\s*is\s*\b/;
  const spaces = this.query.split(spacePattern);
  let space = new Space();
  spaces.unshift("");
  for (let i = 1; i < spaces.length; i += 2) {
    let dimensionQ, operator, dimension, splitted;
    splitted = spaces[i].split(dimensionPattern);
    dimensionQ = new Query(splitted[1].trim());
    dimension = dimensionQ.convertToDimension(splitted[0].trim());
    operator = spaces[i - 1];
    space.dimensions.add(operator, dimension);
  }
  return space;
};
Query.prototype.fromObject = function(obj) {
  let query = "";
  let i = 0;
  const dimensionsToQuery = val => {
    return Array.isArray(val) ? val.join(" or ") : val.toString();
  };
  for (let [key, value] of Object.entries(obj)) {
    query =
      query +
      (i === 0 ? "" : " and ") +
      `${key} is ${dimensionsToQuery(value)}`;
    ++i;
  }
  return query;
};

export { Query };
