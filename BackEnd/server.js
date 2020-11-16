
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//use cors as specified in the question. this is server side material
//allows us to use get post and other methods for example
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const myConnectionString = 'mongodb+srv://admin:Brotherhood23@cluster0.rchxg.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

const Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
});

var MovieModel = mongoose.model("movie", movieSchema);
//get method to the main page
app.get('/', (req, res) => {
    res.send('Hello World!')
})
//get method for movies api page
app.get('/api/movies', (req, res) => {
    //object with the json information
    // const mymovies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     }
    // ];
    MovieModel.find((err, data)=>{
        res.json(data);
    })
    //setting a message to the user along with displaying the json information
    // res.status(200).json({
    //     message: "Everything is good",
    //     movies: mymovies
    // });
})
//post method
//movie receives new movie that has been added to the server. 
//output is displayed on the server side( can be seen in the terminal )
app.get('/api/movies/:id', (req,res)=>{
    console.log(req.params.id);
    MovieModel.findById(req.params.id, (err, data)=>{
        res.json(data);
    })
})
app.post('/api/movies', (req, res) => {
    console.log('Movie Received!');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    })
    res.send('Item added');
})
//listening at the port 4000 for the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
