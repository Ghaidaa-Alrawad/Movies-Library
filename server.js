"use strict";

const express = require("express");

const movieData = require("./MovieData/data.json");

const cors = require("cors");

const axios = require("axios");

const pg = require("pg");

const app = express();

require("dotenv").config();

app.use(cors());
//for the db
app.use(express.json());// using this middleware we'll parse the body form the userRequest
//without it we can't read any thing 

// this is the best practise 
const PORT = process.env.PORT;

//this is the local host 3000, home
app.get("/", handleHome);

//connecting the DataBase
const DB_URL = process.env.DATABASE_URL;
const dbClient = new pg.Client(DB_URL);

//for the database git/post, and new ports
// the addMovie route 
app.post("/addMovie", (req, res)=>{
  // req.body
  let title = req.body.t;
  let year = req.body.y;
  let comments = req.body.c;

  //gitting the vlaues by destructureing
  let sql = `insert into movies(title, year, comments) values($1,$2,$3)`;
  dbClient.query(sql,[title,year,comments]).then(()=>{
    res.status(201).send(`movie ${title} added to the database`)
  })
});

//the getMovies route 
app.get("/getMovies", (req, res)=>{
  let sql = `SELECT * FROM movies`;
  dbClient.query(sql).then((movieD)=>{
    res.status(200).send(movieD.rows)
  });
});

//for the database
dbClient.connect().then(()=>{
  app.listen(PORT, ()=>{
    console.log(`Listening at ${PORT}`)
  })
});

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
  

// creating a request to the database 

//Update request
//in the mulan movie i've updated the comment to be " My childhood dream was to be like her"
app.put("/updateMovie/:id", (req, res) => {
  let { id } = req.params;
  let { newComment } = req.body;
  let sql = `UPDATE movies SET comments = '${newComment}' WHERE id = ${id}`;
  dbClient.query(sql)
    .then((data) => {
      res.status(200).send(`Updated`);
    });
});


//Delete request, will delete it by the id 
//there was an element in the movise table with the is 2
//i've tested this end point and it passed and deleted the element with the id 2 
app.delete("/deleteMovie/:id", async (req, res) => {
  let {id} = req.params;
  let sql = `DELETE FROM movies WHERE id = ${id}`;
  await dbClient.query(sql);
  res.status(200).send('deleted from the database');
});

//getMovie by id request
app.get("/getMoviesById/:id", (req, res)=>{
  let {id} = req.params;
  let sql = `SELECT * FROM movies WHERE id=${id}`;
  dbClient.query(sql)
  .then((data) => res.status(200).send(data.rows));
});

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

//this is the last lab 14