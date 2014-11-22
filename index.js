// Hi! Welcome to the Monkey Music Challenge JavaScript starter kit!

// You control your monkey by sending POST requests to the Monkey Music server
var serverUrl = 'http://warmup.monkeymusicchallenge.com';

// You identify yourselves by your team name and your API key
var teamName = process.argv[2];
var apiKey = process.argv[3];
var gameId = process.argv[4];
var bet = process.argv[5] ;

// Don't forget to provide the right command line arguments
if (!teamName || !apiKey || !gameId || bet === undefined) {
  console.log('Usage: node index.js <your-team-name> <your-api-key>\n');
  if (!teamName) {
    console.log('  Missing argument: <your-team-name>');
  }
  if (!apiKey) {
    console.log('  Missing argument: <your-api-key>');
  }
  if (!gameId) {
    console.log('  Missing argument: <game id>');
  }
  if (bet === undefined) {
    console.log('  Missing argument: <bet amount>');
  }
  process.exit(1);
}

// In this starter kit, we use the request-json library to send POST requests
var request = require('request-json');
var client = request.newClient(serverUrl);

// You POST to a team-specific URL:
// warmup.monkeymusicchallenge.com/team/<your-team-name>
// Surf to this URL and watch your monkey carry out your commands!
var teamUrl = '/game';

// We've put the AI-code in a separate module
var ai = require('./ai');

// Every time we POST a command to the server, we get a reply back
function handleReplyFromServer(error, response, responseBody) {
  // Hopefully, our server will always be able to handle your requests
  // but you never know...
  if (error || response.statusCode !== 200) {
    console.log('Error! We seem to have trouble talking to the server...\n');
    if (error) {
      console.log('  ' + error.name + ': ' + error.message);
    }
    if (response.statusCode !== 200) {
      console.log('  The server replied with status code: ' + response.statusCode);
    }
    if (responseBody.message) {
      console.log('  ' + responseBody.message);
    }
    process.exit(1);
  }

  // The server replies with the current state of the game
  var currentGameState = responseBody;

  // The current game state tells you if you have any turns left
  if (currentGameState.remainingTurns <= 0) {
    // If the game is over, our server will tell you how you did
    // Go to warmup.monkeymusicchallenge.com/team/<your-team-name> for more details
    console.log('\nGame over!\n');
    console.log('  ' + currentGameState.message);
    return;
  }

  console.log('Remaining turns: ' + currentGameState.turns);

  // Use your AI to decide in which direction to move...
  var nextMoveDirection = ai.move(currentGameState);

  // ...and send a new move command to the server
  var nextMoveCommand = {
    command: 'move',
    team: teamName,
    gameId: gameId,
    apiKey: apiKey,
    direction: nextMoveDirection
  };

  // After sending your next move, you'll get a new reply,
  // and this function will run again
  client.post(teamUrl, nextMoveCommand, handleReplyFromServer);
}

// Allright, time to get started!

// To join a game, we send a 'join game' command to the server
var joinGameCommand = {
  command: 'join game',
  team: teamName,
  gameId: gameId,
  apiKey: apiKey,
  bet: bet
};

// Here we go!
client.post(teamUrl, joinGameCommand, handleReplyFromServer);

// If you have any questions, don't hesitate to drop us an email at
// mmc@spotify.com
