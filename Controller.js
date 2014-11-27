var Util = require('./Util');
var PF = require('./PathFinding');
var choice = require('mout/random/choice');

var goalPosition = null;
var goalItem = null;

function shortestPathToPosition(toPosition, toItem, gameState) {
  var currentPosition = {
    x: gameState.position[1],
    y: gameState.position[0]
  };

  var pfIndex = Util.indexLayout(gameState.layout);
  var matrix = pfIndex.matrix;
  return PF.takeStep(currentPosition, toPosition, matrix);
}

function shortestPathToItems(interestingItems, gameState, stupidness) {
  var position = {
    x: gameState.position[1],
    y: gameState.position[0]
  };

  var pfIndex = null;
  if (interestingItems[0] === 'user') {
    pfIndex = Util.indexLayout(gameState.layout, true);
  } else {
    pfIndex = Util.indexLayout(gameState.layout);
  }

  var matrix = pfIndex.matrix;
  var tileTypes = pfIndex.types;

  var paths = interestingItems.reduce(function (paths, tileType) {
    (tileTypes[tileType] || []).forEach(function (tilePosition) {
      paths.push(PF.takeStep(position, tilePosition, matrix));
    });

    return paths;
  }, []);

  var shortest = null;
  if (Math.random() < stupidness) {
    shortest = choice(paths);
  } else {
    paths.forEach(function (path) {
      // For some reason we store undefined paths
      if (!path) return;

      if (!shortest || path.distance < shortest.distance) {
        shortest = path;
      }
    });
  }

  return shortest;
}

function isMusicItem(tile) {
  return tile === 'song' || tile === 'album' || tile === 'playlist';
}

function shouldFindNewGoal(gameState, goalPosition) {
  if (!goalPosition) return true;

  var layout = gameState.layout;
  var inventory = gameState.inventory;

  var goalTile = layout[goalPosition.y][goalPosition.x];

  var noMusicInInventory = inventory.filter(isMusicItem).length === 0;
  return goalTile === 'empty' || goalTile === 'monkey' ||
    (goalTile === 'user' && noMusicInInventory);
}

function findNewGoal(gameState, stupidness) {
  var inventorySize = gameState.inventorySize;
  var inventory = gameState.inventory;
  if (inventory.length >= inventorySize) {
    return shortestPathToItems(['user'], gameState, stupidness);
  } else {
    return shortestPathToItems(['song', 'album', 'playlist'], gameState, stupidness);
  }
}

/**
 * [chooseDirection description]
 * @param  {[type]} layout
 * @param  {[type]} position
 * @param  {[type]} pickedUpItems
 * @return {[type]}
 */
exports.chooseDirection = function chooseDirection(gameState, stupidness) {
  var monkeyPosition = {
    x: gameState.position[1],
    y: gameState.position[0]
  };

  // If we're very stupid
  if (Math.random() < stupidness / 5) {
    return ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 3)];
  }

  if (!shouldFindNewGoal(gameState, goalPosition)) {
    var path = shortestPathToPosition(goalPosition, goalItem, gameState);
    if (path) {
      return Util.calculateDirection(monkeyPosition, path.nextStep);
    }
  }

  var goalPath = findNewGoal(gameState, stupidness);

  goalPosition = goalPath.position;
  goalItem = gameState.layout[goalPosition.y][goalPosition.x];

  var direction = Util.calculateDirection(monkeyPosition, goalPath.nextStep);
  return direction;
};