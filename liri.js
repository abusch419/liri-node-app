
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
      message: "Hello! Please input 'concert-this' and then an artist or band name!",
      name: "input"
    }
  ]).then(function (inquirerResponse) {
    response = inquirerResponse.input.split(" ")
    let action = response[0].toString();
    if (action === "concert-this") {
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
      append(movieThis);
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
      console.log(`Showing next event for ${querry}`)
      console.log(`Venue: ${response.data[0].venue.name}`)
      console.log(`City: ${response.data[0].venue.city}`)
      console.log(`State: ${response.data[0].venue.region}`)
      console.log(`Date: ${moment(response.data[0].datetime).format('YYYY/MM/DD')}`);
      append(`Showing next event for ${querry}`)
      append(`Venue: ${response.data[0].venue.name}`)
      append(`City: ${response.data[0].venue.city}`)
      append(`State: ${response.data[0].venue.region}`)
      append(`Date: ${moment(response.data[0].datetime).format('YYYY/MM/DD')}`);
      
      
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
      console.log(`Artist Name: ${data.tracks.items[0].artists[0].name}`);
      console.log(`Song Name: ${data.tracks.items[0].name}`);
      console.log(`Preview URL: ${data.tracks.items[0].preview_url}`);
      console.log(`Album Name: ${data.tracks.items[0].album.name}`);
      append(`Artist Name: ${data.tracks.items[0].artists[0].name}`);
      append(`Song Name: ${data.tracks.items[0].name}`);
      append(`Preview URL: ${data.tracks.items[0].preview_url}`);
      append(`Album Name: ${data.tracks.items[0].album.name}`);
    });
    }



function movieThis() {
  queryUrl = "http://www.omdbapi.com/?t=" + querry + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl)
        .then(function (response) {
          
          console.log("Movie Title: " + response.data.Title)
          console.log("Release Year: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("Country Movie Was Produced In: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Cast: " + response.data.Actors);
          append("Movie Title: " + response.data.Title)
          append("Release Year: " + response.data.Year);
          append("IMDB Rating: " + response.data.imdbRating);
          append("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          append("Country Movie Was Produced In: " + response.data.Country);
          append("Language: " + response.data.Language);
          append("Plot: " + response.data.Plot);
          append("Cast: " + response.data.Actors);



        })
        .catch(function (error) {
          console.log(error);
        });
}


function append(output) {
  fs.appendFile("./log.txt", output + ", ", function(err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
  
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    
  
  });
}

