// imports modules
const express = require("express");
const app = express();
const axios = require("axios");
const ejs = require("ejs");

// defines my API key and base URL for TMDB
const api = "916c26cc058b8b53e88ef50424b1efd2";
const link = "https://api.themoviedb.org/3";
const URL = `${link}/search/movie`;

// defines the port on which the server will listen
const PORT = 3000;

// middleware to parse JSON and URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sets ejs as the view engine 
app.set('view engine', 'ejs');

// handles GET requests 
app.get('/', async (req, res) => {
    try {
        // sends a GET request
        const response = await axios.get(`${URL}?query=&api_key=${api}&language=en-US`);
        const title = response.data.results;
        res.render('movies', { title });
    } catch (error) {
        
        console.error("Unable to reach API.", error);
    }
});

// handles POST requests
app.post('/search', async (req, res) => {
    const {query} = req.body;
    try {
        // sends a GET request to the TMDB API with the user's query to search for movies
        const response = await axios.get(`${URL}?query=${query}&api_key=${api}&language=en-US`);
        const movies = response.data.results;
        res.render('movies', { movies });
    } catch (error) {
        console.error('Unable to retrieve movies.', error);
    }
});

// starts the server
app.listen(PORT, () => {
    console.log('Current port:',PORT);
});

