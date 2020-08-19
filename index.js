// const data = require("./data");
// const http = require("http");

// http.createServer((req,res) => {
// 	const path = req.url.toLowerCase();

// 	switch(path){

// 		case '/':
// 			res.writeHead(200, {'Content-type' : 'text/plain'});
// 			res.end('This is the home page \nNumber of items in array: ' + data.getAll().length);

// 			break;

// 		case '/about':
// 				res.writeHead(200, {'Content-type' : 'text/plain'});
// 				res.end('Hello! \nMy name is Matheus. I am a student at Seattle Central College aiming to become a web developer! :)');
// 			break;

// 		default:
// 			res.writeHead(200, {'Content-type' : 'text/plain'});
// 			res.end('Page Not Found');
// 			break;

// 	}

// }).listen(process.env.PORT || 3000);



'use strict'

const Data = require("./models/albums");
const express = require("express");
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars"); // should be at top of module 
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");


//Home Page
app.get('/', (req, res, next) => {

 Data.find({}).lean()
    .then((items) => {
    res.render('home', {item: items});

   });

});


//Details Page
app.get('/details', (req, res, next) => {
 let query = req.query.title;
 // res.render('details', {title: query['title']}); 
 Data.findOne({'title': query}).lean()
    .then((items) => {
    res.render('details', {item: items});

   });



});


//About Page
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('Hello! \nMy name is Matheus. I am a student at Seattle Central College aiming to become a web developer! ');
});

// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});


app.listen(app.get('port'), () => {
 console.log('Express started'); 
});
