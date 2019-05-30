
require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");
let queryUrl;
let querry;
let response;

inquirer
  .prompt([
    {
      type: "input",
      message: "Hello! Please choose from one of the four options. Option 1: Type concert-this and the artist you would like to see upcoming shows for. Option 2: Type movie-this and a movie you would like info on. Option 3: Type spotify-this-song and a song you would like info on. Option 4: Type do-what-it-says and see something random!",
      name: "input"
    }
  ]).then(function (inquirerResponse) {
    response = inquirerResponse.input.split(" ")
    let action = response[0].toString();
    if (action === "concert-this") {
      // debugger;
      querry = response.slice(1).join(" ")
      concertThis();

    }
    else if (action === "spotify-this-song") {
      querry = response.slice(1).join(" ") === "" ? "The Sign Ace Of Base" : response.slice(1).join(" ")
      spotifyThisSong();
    }
    else if (action === "movie-this") {
      querry = response.slice(1).join(" ") === "" ? "Mr. Nobody" : response.slice(1).join(" ")
      movieThis();
    }
    else if (action === "do-what-it-says") {
      fs.readFile("./random.txt", "utf8", function (error, content) {
        var dataArr = content.split(",");
        action = dataArr[0].toString();
        querry = dataArr.slice(1).join()
        if (error) {
          return console.log(error);
        }
        else if (action === "movie-this") {
          movieThis();
        }
        else if (action === "concert-this") {
          concertThis();
        }
        else if (action === "spotify-this-song") {
          spotifyThisSong();
        }
      });
    }
  });


// function declarations

function concertThis() {
  queryUrl =
    "https://rest.bandsintown.com/artists/" +
    querry +
    "/events?app_id=db4cdbfd2bad1b7a3e4cdc51a42f15b9";
  axios.get(queryUrl)
    .then(function (response) {
      console.log(
        `Showing next event for ${querry}
======================================
Venue: ${response.data[0].venue.name}
City: ${response.data[0].venue.city}
State: ${response.data[0].venue.region}
Date: ${moment(response.data[0].datetime).format('YYYY/MM/DD')}
=====================================`)
      append(`Showing next event for ${querry}
      Venue: ${response.data[0].venue.name}
      City: ${response.data[0].venue.city}
      State: ${response.data[0].venue.region}
      Date: ${moment(response.data[0].datetime).format('YYYY/MM/DD')}`);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function spotifyThisSong() {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: querry }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(
      `====================================================
Artist Name: ${data.tracks.items[0].artists[0].name}
Song Name: ${data.tracks.items[0].name}
Preview URL: ${data.tracks.items[0].preview_url}
Album Name: ${data.tracks.items[0].album.name}
=====================================================`)
    append(`Artist Name: ${data.tracks.items[0].artists[0].name}
    Song Name: ${data.tracks.items[0].name}
    Preview URL: ${data.tracks.items[0].preview_url}
    Album Name: ${data.tracks.items[0].album.name}`)
  });
}
function movieThis() {
  queryUrl = "http://www.omdbapi.com/?t=" + querry + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl)
    .then(function (response) {
      console.log(
        `=================================
Movie Title: ${response.data.Title}
Release Year: ${response.data.Year}
IMDB Rating: ${response.data.imdbRating}
Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
Country Movie Was Produced In: ${response.data.Country}
Language: ${response.data.Language}
Plot: ${response.data.Plot}
Cast: ${response.data.Actors}
==============================`);
      append(`Movie Title: ${response.data.Title}
      Release Year: ${response.data.Year} 
      IMDB Rating: ${response.data.imdbRating}
      Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
      Country Movie Was Produced In: ${response.data.Country} 
      Language: ${response.data.Language}
      Plot: ${response.data.Plot}
      Cast: ${response.data.Actors}`);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function append(output) {
  fs.appendFile("./log.txt", output + ", ", function (err) {
    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  });
}

