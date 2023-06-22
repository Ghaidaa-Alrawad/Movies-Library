"use strict";

const express = require("express");

// const movieData = require("./MovieData/data.json");

const cors = require("cors");

const axios = require("axios");

const app = express();

require("dotenv").config();

app.use(cors());

//this is the local host 3000, home
app.get("/", handleHome);

//this for the favorite
app.get("/favorite", favoriteHandeler);

//createing a GET request to fetch trending movies from the Movie DB API
app.get("/trending", (req, res) => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}&language=en-US`
      )
      .then((response) => {
        const trendingMovies = response.data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          overview: movie.overview,
        }));
  
        res.send(trendingMovies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred while fetching trending movies.");
    });
});

//create a GET request to search for a movie by name using the Movie DB API
app.get("/search", (req, res) => {
    const searchTerm = req.query.query;
  
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${searchTerm}&page=1`
      )
      .then((response) => {
        const searchResults = response.data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          overview: movie.overview,
        }));
  
        res.send(searchResults);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred while searching for movies.");
    });
});

//adding 2 routes of your choice from the Movie DB API
//1
app.get("/upcoming", (req, res) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        const upcomingMovies = response.data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          overview: movie.overview,
        }));
  
        res.send(upcomingMovies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred while fetching upcoming movies.");
    });
});

//2

app.get("/popular", (req, res) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        const popularMovies = response.data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          overview: movie.overview,
        }));
  
        res.send(popularMovies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred while fetching popular movies.");
      });
});
  

//this to handel the errors 
app.get("*", errorHandeler);

// app.use((req, res, next)=>{
//     res.status(404).send({
//     "code": 500,//it was here status, but i've change it to code
//     "responseText": "Sorry, something went wrong"
//     })
// }
// )

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