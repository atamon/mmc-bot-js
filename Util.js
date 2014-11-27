/**
 * Returns an object with shorthand keys usable for pathfinding
 * @param  {Object} mmLayout The body.layout object from server response
 * @return {Object} a layout object with 'matrix' and 'types' keys
 */
exports.indexLayout = function toPathFindingLayout(mmLayout, isUserWalkable) {
  var layout = {
    // Shorthand to find meaningful tiles by type
    // Ex. layout.types.playlist will contain all playlists on the map
    types: {},
    // Binary matrix with 0 for walkable tiles and 1 for full tiles
    matrix: [[]]
  };

  layout.matrix = mmLayout.map(function (row, y) {
    return row.map(function (tile, x) {

      // Group all tiles by type for later reference
      if (!layout.types[tile] && tile !== 'empty') {
        layout.types[tile] = [];
      }

      // Empty tiles are not grouped
      if (tile !== 'empty') {
        layout.types[tile].push({ x: x, y: y });
      }

      return isTileWalkable(tile) || tile === 'user' && isUserWalkable ? 0 : 1;
    });
  });

  return layout;
};

/**
 * @param  {String}  type A String representation of the tile type
 * @return {Boolean} Returns true iff the tile is walkable
 */
var isTileWalkable = exports.isTileWalkable = function isTileWalkable(type) {
  var walkables = ['empty', 'song', 'album', 'playlist', 'monkey', 'tunnel'];

  return walkables.indexOf(type) !== -1;
};

/**
 * @param  {Object} userPos Position object with x and y key-value pairs
 * @param  {Object} targetPos Position object with x and y key-value pairs
 * @return {String} Returns the direction from user to target
 */
exports.calculateDirection = function calculateDirection(userPos, targetPos) {
  if (userPos.y !== targetPos.y) {
    if (userPos.y > targetPos.y) return 'up';
    else return 'down';
  }

  if (userPos.x !== targetPos.x) {
    if (userPos.x > targetPos.x) return 'left';
    else return 'right';
  }

  console.warn('userPos and targetPos are equal, DANG!', userPos, targetPos);
};