// This is where you put your AI code!
//
// The AI code looks at the current game state and decides
// the monkey's next move.
function move(gameState) {

  // Every game has a limited number of turns. Use every turn wisely!
  var remainingNumberOfTurns = gameState.turns;

  // The level layout is a 2D-matrix (an array of arrays).
  // Every element is a string, telling you what's located at the
  // corresponding position on the level.
  //
  // In the warmup challenge, your objective is to find all music items
  // and deliver them to the eagerly waiting Spotify user.
  //
  // "empty": an empty tile, you can move here
  // "monkey": your monkey, this is where you're currently at
  // "song" / "album" / "playlist": a music item, go get them!
  // "user": go here once you've picked up all music items
  //
  // Too easy for you? Good...
  // The real fun begins when the warmup is over and the competition begins!
  var currentLevelLayout = gameState.layout;

  // This is an array of all music items you've currently picked up
  var pickedUpMusicItems = gameState.pickedUp;

  // The position attribute tells you where your monkey is
  var currentPositionOfMonkey = gameState.position;

  // Speaking of positions...
  //
  // X and Y coordinates can be confusing.
  // Which way is up and which way is down?
  //
  // Here is an example explaining how coordinates work in
  // Monkey Music Challenge:
  //
  // {
  //   "layout": [["empty", "monkey"]
  //              ["song",  "empty"]]
  //   "position": [0, 1],
  //   ...
  // }
  //
  // The "position" attribute tells you the location of your monkey
  // in the "layout" matrix. In this example, you're at layout[0][1].
  //
  // If you send { "command": "move", "direction": "down", ... }
  // to the server, you'll get back:
  //
  // {
  //   "layout": [["empty", "empty"]
  //              ["song",  "monkey"]]
  //   "position": [1, 1]
  // }
  //
  // If you instead send { "command": "move", "direction": "left", ... }
  // to the server, you'll get back:
  //
  // {
  //   "layout": [["monkey", "empty"]
  //              ["song",   "empty"]]
  //   "position": [0, 0]
  // }
  //
  // Say you want to pick up the song below us.
  // We send down { "command": "move", "direction": "left", ... }
  // to the server, you'll get back:
  //
  // {
  //   "layout": [["monkey", "empty"]
  //              ["empty",   "empty"]]
  //   "position": [0, 0]
  // }
  //
  // Notice that the monkey did not move to the songs tile. But the song is gone!
  //
  // Got it? Sweet! This message will self destruct in five seconds...

  // TODO: You may want to do something smarter here
  return randomDirection();
}

function randomDirection() {
  return ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 3)];
}

exports.move = move;
