// Read and set environment variables
require("dotenv").config();

// // Imports Keys
// var keys = require("keys");

// // Accesses keys
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

// // Sets variable command to user input
// var command = process.argv[2];

// if (command == "my-tweets") {
//     console.log("Here are your tweets!");
// }

console.log(process.env.TWITTER_CONSUMER_KEY);
console.log(process.env.TWITTER_CONSUMER_SECRET);