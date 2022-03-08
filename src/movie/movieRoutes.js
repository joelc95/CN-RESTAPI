const { Router } = require('express');
const { addMovie, listMovies } = require('./movieControllers');
const movieRouter = Router();

movieRouter.post('/movie', addMovie);
movieRouter.get('/movie', listMovies);

module.exports = movieRouter;