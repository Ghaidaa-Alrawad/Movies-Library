# Movies-Library

**Author Name**: Ghaidaa Alrowad

## Overview
The Movies-Library project is a simple server application that provides endpoints for retrieving movie data and displaying a favorite page. It utilizes Express.js to handle the HTTP requests and responses. The project includes basic file structure setup, route handling, error handling, and documentation.

## Getting Started
To build and run this app on your own machine, follow these steps:

1. Clone the repository from GitHub:

2. Navigate to the project directory:

3. Install the required packages using npm

4. Start the server

5. The server will start running on http://localhost:3000. You can access the endpoints using a web browser or an HTTP client.

## Project Features
The Movies-Library app includes the following features:

- Home Page Endpoint (`/`): Retrieves movie data and returns a JSON response with the movie title, poster path, and overview.

- Favorite Page Endpoint (`/favorite`): Returns a plain text message "Welcome to Favorite Page".

- Trending Movies Endpoint (`/trending`): Fetches trending movies from the Movie DB API and returns a JSON response with the movie details, including title, release date, poster path, and overview.

- Movie Search Endpoint (`/search?query=<search-term>`): Searches for a movie by name using the Movie DB API and returns a JSON response with the search results, including movie details.

- Upcoming Movies Endpoint (`/upcoming`): Fetches upcoming movies from the Movie DB API and returns a JSON response with the movie details.

- Popular Movies Endpoint (`/popular`): Fetches popular movies from the Movie DB API and returns a JSON response with the movie details.

- Add Movie Endpoint (`/addMovie`): Accepts a POST request with movie data in the request body (title, year, and comments), and inserts the movie into the PostgreSQL database.

- Get Movies Endpoint (`/getMovies`): Retrieves movies from the PostgreSQL database and returns them as a JSON response.

- Error Handling: The server handles 404 errors (page not found) and 500 errors (server error) with appropriate status codes and response messages.

#### lab 11 pic web req-res cycle 
git ![image](assets/lac%2011%20cycle.jpeg)

#### Lab 12 pic web req-res cycle
![image](assets/lab12%20web%20request-response%20cycle.jpeg)

#### Lab 13 pic web req-res cycle
![image](assets/Lab%2013%20pic%20web%20req-res%20cycle.jpeg)
