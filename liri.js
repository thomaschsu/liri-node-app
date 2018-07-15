// Read and set environment variables
require("dotenv").config();

// Require Keys
var keys = require("./keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// Accesses keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Sets variable command to user input
var command = process.argv[2];
var commandArgs = process.argv;

// If command is 'my-tweets', grab last 20 tweets and display them
if (command == "my-tweets") {
    client.get('statuses/user_timeline', {
        user_id: 'thomashsu13'
    }, function(error, tweets, response) {
        for (var i = 0; i < 20; i++) {
            console.log("\n Tweet #" + i + " Created: " + tweets[i].created_at);
            console.log("================================================");
            console.log(tweets[i].text);
        }
    });
};

// Grab all words in process.argv for the song name
var search;
var song = "";
for (var i = 3; i < commandArgs.length; i++) {
    if (i > 3 && i < commandArgs.length) {
        song = song + " " + commandArgs[i];
    } else {
        song += commandArgs[i];
    }
}

if (song === "") {
    search = "The Sign Ace of Base";
} else {
    search = song;
}

// Spotify command
if (command == "spotify-this-song") {
    spotify.search({
        type: 'track',
        query: search,
        limit: 1
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("================================================");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Track: " + data.tracks.items[0].name);
            console.log("Spotify URL: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("================================================");
        }
    });
}