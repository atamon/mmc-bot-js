var Util = require('./Util');
var PF = require('./PathFinding');

/**
 * [chooseDirection description]
 * @param  {[type]} layout
 * @param  {[type]} position
 * @param  {[type]} pickedUpItems
 * @return {[type]}
 */
exports.chooseDirection = function chooseDirection(layout, position, inventory) {

  var pfIndex = Util.indexLayout(layout);
  var matrix = pfIndex.matrix;
  var tileTypes = pfIndex.types;

  // Prepare all music tiles
  var music = [].concat(
    tileTypes.song || [],
    tileTypes.album || [],
    tileTypes.playlist || []
    );

  // Find paths to them
  var paths = music.map(function (tile) {
    return PF.takeStep(position, tile, matrix);
  });

  // CHOOSE DIRECTION
  var nextStep = null; // To become object with keys 'x' and 'y'
  var direction = '';

  // Head for more music if we can
  if (paths.length > 0) {
    // Choose closest target's first move
    nextStep = paths[0];
	  var length = paths.length;
	  for (var i = 1; i < length; i++) {
	  	if (paths[i].distance < nextStep.distance) {
	  		nextStep = paths[i];
	  	}
	  }
  } else if (inventory.length > 0) {
    // ... or move towards user to drop off music

    // All players deliver music to the same user
    // so we can safely assume it's the first element
    var userPos = tileTypes.user[0];
    nextStep = PF.takeStep(position, userPos, matrix);
  }

  // Convert to string direction
  if (nextStep) {
  	direction = Util.calculateDirection(position, nextStep);
  }

  return direction;
};