var Controller = require('./Controller');

// This is where you put your AI code!
//
// The AI looks at the current game state and decides the monkey's next move.
function move(gameState, stupidness) {

  // Every game has a limited number of turns. Use every turn wisely!
  var remainingNumberOfTurns = gameState.remainingTurns;

  // The level layout is a 2D-matrix (an array of arrays).
  //
  // Every element in the matrix is a string. The string tells you what
  // located at the corresponding position on the level.
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
  //
  // The real fun begins when the warmup is over and the competition begins!
  var currentLevelLayout = gameState.layout;

  // This is an array of all music items you've currently picked up
  var pickedUpMusicItems = gameState.inventory;

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
  // So what about picking stuff up then?
  //
  // It's simple!
  //
  // Just stand next to something you want to pick up and move towards it.
  //
  // For example, say our current game state looks like this:
  //
  // {
  //   "layout": [["empty", "empty"]
  //              ["song",  "monkey"]]
  //   "position": [1, 1],
  //   "pickedUp": []
  // }
  //
  // When you send { "command": "move", "direction": "left", ... }
  // to the server, you'll get back:
  //
  //   "layout": [["empty",  "empty"]
  //              ["empty",  "monkey"]]
  //   "position": [1, 1],
  //   "pickedUp": ["song"],
  //   ...
  // }
  //
  // Instead of moving, your monkey successfully picked up the song!
  //
  // Got it? Sweet! This message will self destruct in five seconds...

  // TODO: You may want to do something smarter here
  return Controller.chooseDirection(gameState, stupidness);
}

exports.move = move;
