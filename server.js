"use strict";

const express = require("express");

const movieData = require("./MovieData/data.json");

const cors = require("cors");

const app = express();

//this is the local host 3000, home
app.get("/", handleHome);

//this for the favorite
app.get("/favorite", favoriteHandeler);

//this to handel the errors 
app.get("*", errorHandeler);

//crating the constructor to git the data for the movies
function Movie(title, posterPath, overview) {
    this.title = title;
    this.posterPath = posterPath;
    this.overview = overview;
}
  
function handleHome(req, res) {
    const movies = new Movie(
    movieData.title,
    movieData.poster_path,
    movieData.overview
    );
    res.send(movies);
}


function favoriteHandeler(req, res){
    console.log("Welcome to Favorite Page");
    res.send("Welcome to Favorite Page");
}


function errorHandeler(req, res){
    res.send({
    "status": 500,
    "responseText": "Sorry, something went wrong"
    })
}


// starting the server handler
app.listen(3000, startingLog);

function startingLog(req, res) {
  console.log("Running at 3000");
}