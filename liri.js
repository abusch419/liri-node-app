
require("dotenv").config();


var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);


// allow an input via node and do something depending on that input
// we can use inquire for this
var inquirer = require("inquirer");


inquirer
    .prompt([
        {
            type: "input",
            message: "What is your username",
            name: "username"
        },
        {
            type: "password",
            message: "Please create a password",
            name: "password"
        },
        {
            type: "list",
            message: "Please choose which of these type of cloud you prefer",
            choices: ["Cirrus", "Stratus", "Nimbus"],
            name: "favCloud"
        },
        {
            type: "checkbox",
            message: "Please choose the best number",
            choices: [5, 2, 4],
            name: "favNum"
        },
        {
            type: "confirm",
            message: "Are you sure these are your final answers",
            name: "confirm",
            default: true
        }
    ]).then(function (inquirerResponse) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (inquirerResponse.confirm) {
            if (inquirerResponse.password === predefinedPassword) {
                console.log("Please try a better password")
            }
            else if (inquirerResponse.password !== predefinedPassword) {
                console.log(inquirerResponse)
                console.log("\nWelcome " + inquirerResponse.username);
            }

        }
        else {
            console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
        }
    });