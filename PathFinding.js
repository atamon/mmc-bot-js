var PF = require('pathfinding');
var finder = new PF.AStarFinder();

/**
 * Finds the shortest path, from start -> target
 * @param  {Object} start Position object with x and y key-value pairs
 * @param  {Object} target Position object with x and y key-value pairs
 * @param  {Array} matrix Matrix with rows and columns.
 *                         Values of 1 represents blocked tile
 *                         Values of 0 represents walkable tile
 * @return {Array} A list of array coordinates [x, y] to get to target
 */
var findPath = function findPath(start, target, matrix) {
  var grid = new PF.Grid(matrix.length, matrix[0].length, matrix);
  var path = finder.findPath(start.x, start.y, target.x, target.y, grid);

  if (path.length > 0) {
    return path;
  } else {
    console.warn('Unreachable target', target);
    return undefined;
  }
};

/**
 * @param  {Object} start Position object with x and y key-value pairs
 * @param  {Object} target Position object with x and y key-value pairs
 * @param  {Array} matrix Matrix with rows and columns.
 *                         Values of 1 represents blocked tile
 *                         Values of 0 represents walkable tile
 * @return {Object} Position object with x and y key-value pairs
 */
exports.takeStep = function takeStep(start, target, matrix) {
  var path = findPath(start, target, matrix);

  // Return same nullvalue as findPath does
  if (!path) return path;

  // PathFinding returns the current position as the 0th step
  var step = path[1];
  return {
    x: step[0],
    y: step[1],
    distance: path.length
  };
};