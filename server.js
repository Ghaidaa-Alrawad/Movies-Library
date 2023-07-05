"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const movieRoutes = require("./routes/movies.routes");
const generalRoutes = require("./routes/general.routes");
const client = require("./client");
const norFoundeHandler = require("./error_handlers/404");
const InternalErrorsHandler = require("./error_handlers/500");
const { PORT } = require("./configs");

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use(generalRoutes);
app.use('/movies', movieRoutes);

// Error handlers
app.use(norFoundeHandler);
app.use(InternalErrorsHandler);

// Database connection and server listening
client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
  });
});