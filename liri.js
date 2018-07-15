// Read and set environment variables
require("dotenv").config();

// // Imports Keys
var request = require("request");
var keys = require("./keys");
var Twitter = require('twitter');

// // Accesses keys
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Sets variable command to user input
var command = process.argv[2];

if (command == "my-tweets") {
    client.get('statuses/user_timeline', {user_id: 'thomashsu13'}, function(error, tweets, response) {
        for (var i = 0; i < 20; i++) {
            console.log("\n Tweet #" + i + " Created: " + tweets[i].created_at);
            console.log("------------------------------------------------");
            console.log(tweets[i].text);
        }     
    });
};