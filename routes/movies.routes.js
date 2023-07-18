"use strict";
const express = require("express");
const client = require("../client");
const Router = express.Router();
const axios = require("axios");

// const movieData = require("./MovieData/data.json");

//this is the local host 3000, home
Router.get("/", handleHome);


//for the database git/post, and new ports
// the addMovie route 

//the getMovies route 
//Router.get("/getMovies", (req, res, next)=>{
Router.get("/", async (req, res, next)=>{
  try{
    console.log(req.method, req.url);
    let sql = "SELECT * FROM movies";

    let response = await client.query(sql);
    res.status(200).send(res.rows);
    // client.query(sql).then((movieD)=>{
    //   res.status(200).send(movieD.rows)
    // });
  } catch (e){
    next(`gelMovies handler: ${e}`);
  }
});
//Router.post("/addMovie", (req, res, next)=>{

Router.post("/", (req, res, next)=>{
  try{
  // req.body
  let title = req.body.t;
  let year = req.body.y;
  let comments = req.body.c;

  //gitting the vlaues by destructureing
  let sql = `insert into movies(title, year, comments) values($1,$2,$3)`;
  client.query(sql,[title,year,comments]).then(()=>{
    res.status(201).send(`movie ${title} added to the database`)
  })
  } catch (e){
    next.apply(`addMovies handler: ${e}`);
  }
});

Router.post("/favMovie", (req, res, next)=>{
  try{
  // req.body
  let title = req.body.t;
  // let year = req.body.y;
  let comments = req.body.c;

  //gitting the vlaues by destructureing
  let sql = `insert into fav(title, comments) values($1,$2)`;
  client.query(sql,[title,comments]).then(()=>{
    res.status(201).send(`movie ${title} added to the fav`)
  })
  } catch (e){
    next.apply(`addMovies handler: ${e}`);
  }
});

Router.get("/favMovie", (req, res, next)=>{
  let sql = `SELECT * FROM fav`;
  client.query(sql).then((data)=>{
    res.status(200).send({
      total : data.rows.length,
      data : data.rows
    })
  }).catch((e)=>{
    next.apply(`addMovies handler: ${e}`);
  })
})

Router.put("/favMovie/:id", (req, res, next) => {

  try{
      let { id } = req.params;
      let { newComment } = req.body;
      let sql = `UPDATE fav SET comments = '${newComment}' WHERE id = ${id}`;
      client.query(sql).then((data) => {
          res.status(200).send(`Updated`);
        });
  } catch (e){
      next(`updateMovie by id handler: ${e}`);
  }

});
Router.delete("/favMovie/:id", async (req, res, next) => {
  try{
    let {id} = req.params;
    let sql = `DELETE FROM fav WHERE id = ${id}`;
    await client.query(sql);
    res.status(200).send('deleted from the fav');
  } catch (e){
      next(`deleteMovie by id handler: ${e}`);
  }
});



//this for the favorite
Router.get("/favorite", favoriteHandeler);

//createing a GET request to fetch trending movies from the Movie DB API
Router.get("/trending", (req, res) => {
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
Router.get("/search", (req, res) => {
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
Router.get("/upcoming", (req, res) => {
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

Router.get("/popular", (req, res) => {
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
Router.put("/:id", (req, res, next) => {

    try{
        let { id } = req.params;
        let { newComment } = req.body;
        let sql = `UPDATE movies SET comments = '${newComment}' WHERE id = ${id}`;
        client.query(sql).then((data) => {
            res.status(200).send(`Updated`);
          });
    } catch (e){
        next(`updateMovie by id handler: ${e}`);
    }

});


//Delete request, will delete it by the id 
//there was an element in the movise table with the is 2
//i've tested this end point and it passed and deleted the element with the id 2 
Router.delete("/:id", async (req, res, next) => {
    try{
      let {id} = req.params;
      let sql = `DELETE FROM movies WHERE id = ${id}`;
      await client.query(sql);
      res.status(200).send('deleted from the database');
    } catch (e){
        next(`deleteMovie by id handler: ${e}`);
    }
});

//getMovie by id request
Router.get("/:id", (req, res, next)=>{
    try{
      let {id} = req.params;
      let sql = `SELECT * FROM movies WHERE id=${id}`;
      client.query(sql).then((data) => res.status(200).send(data.rows));
    }catch(e){
        next(`getMoviesById handler: ${e}`);   
    }
});

//this to handel the errors 
Router.get("*", errorHandeler);

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

module.exports = Router;