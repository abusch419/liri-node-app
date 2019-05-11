
require("dotenv").config();


var keys = require("./keys.js");
var axios = require("axios");
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");

// var spotify = new Spotify(keys.spotify);


// allow an input via node and do something depending on that input
// we can use inquire for this




inquirer
  .prompt([
    {
      type: "input",
      message: "Hello! Please input 'concert-this' and then an artist or band name!",
      name: "input"
    }
  ]).then(function (inquirerResponse) {
    const response = inquirerResponse.input.split(" ")
    const action = response[0].toString();
    const querry = response.slice(1).join(" ")
    if (action === "concert-this") {
      const queryUrl =
    "https://rest.bandsintown.com/artists/" +
    querry +
    "/events?app_id=db4cdbfd2bad1b7a3e4cdc51a42f15b9";
    axios.get(queryUrl)
    .then(function (response) {
      console.log(`Showing next event for ${querry}`)
      console.log(response.data[0].venue.name)
      console.log(response.data[0].venue.city)
      console.log(response.data[0].venue.region)
      console.log(moment(response.data[0].datetime).format('YYYY MM DD'));
    })
    .catch(function (error) {
      console.log(error);
    }); 
    }
  });



  
  
