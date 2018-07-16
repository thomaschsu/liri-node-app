// Read and set environment variables
require("dotenv").config();

// Require Keys
var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

// Accesses keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Sets variable command to user input
var command = process.argv[2];
var commandArgs = process.argv;

// Grabs query from user
var query = "";
for (var i = 3; i < commandArgs.length; i++) {
    if (i > 3 && i < commandArgs.length) {
        query = query + " " + commandArgs[i];
    } else {
        query += commandArgs[i];
    }
}

// Function calls from command
if (command === "my-tweets") {
    myTweet();
} else if (command === "spotify-this-song") {
    spotifySong(query);
} else if (command == "movie-this") {
    omdbFunc(query);
} else if (command == "do-what-it-says") {
    doSays();
}

// If command is 'my-tweets', grab last 20 tweets and display them
function myTweet() {
    client.get("statuses/user_timeline", {
        user_id: "thomashsu13"
    }, function(error, tweets, response) {
        for (var i = 0; i < 20; i++) {
            console.log("\n Tweet #" + i + " Created: " + tweets[i].created_at);
            console.log("================================================");
            console.log(tweets[i].text);
        }
    });
}

// Spotify command
function spotifySong(query) {
    // Grab all words in process.argv for the query
    var song;
    // If there is no search, automatically search for 'the sign'
    if (query === "") {
        song = "The Sign Ace of Base";
    } else {
        song = query;
    }
    // Spotify search function
    spotify.search({
        type: "track",
        query: song,
        limit: 1
    }, function(err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        } else {
            console.log("================================================");
            console.log("|              Spotify Command                 |");
            console.log("================================================");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Track: " + data.tracks.items[0].name);
            console.log("Spotify URL: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("================================================");
        }
    });
}

// OMDB command
function omdbFunc(query) {
    var search;
    // If no query then search for Mr. Nobody
    if (query === "") {
        search = "Mr. Nobody";
    } else {
        search = query;
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=8506adc6";
    request(queryUrl, function(error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log("================================================");
            console.log("|               OMDB Command                   |");
            console.log("================================================");
            console.log("\n Title: " + JSON.parse(body).Title);
            console.log("\n Release Year: " + JSON.parse(body).Year);
            console.log("\n IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("\n Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("\n Country: " + JSON.parse(body).Country);
            console.log("\n Language: " + JSON.parse(body).Language);
            console.log("\n Plot: " + JSON.parse(body).Plot);
            console.log("\n Actors: " + JSON.parse(body).Actors);
            console.log("================================================");
        }
    })
};

// Do what it says command
function doSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // Logs Errors.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        var action = dataArr[0];
        var search = dataArr[1];

        // Switch depending on what the text file says
        switch (action) {
            case "spotify-this-song":
                spotifySong(search);
                break;
            case "my-tweets":
                myTweet();
                break;
            case "movie-this":
                omdbFunc(search);
                break;
        }
    });
}