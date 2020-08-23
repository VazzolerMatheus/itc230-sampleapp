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
app.use(bodyParser.json());
app.use('/api', require('cors')());

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");


//Home Page
app.get('/', (req, res, next) => {
 Data.find({}).lean()
    .then((items) => {

    console.log(JSON.stringify(items));
    res.render('home_react', {albums: JSON.stringify(items)});
   });
});

//api home
app.get('/api/v1/albums', (req, res, next) => {
 Data.find({}).lean()
    .then((items) => {
    
    if(items){
    	res.json(items);
    }else{
    	return res.status(500).send('Error occurred: database error.');
    }
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


//api from one
app.get('/api/v1/albums/:title', (req, res) => {
 Data.findOne({'title': req.params.title}).lean()
 	.then((items) => {
    
    if(items){
    	res.json(items);
    }else{
    	return res.status(500).send('Error occurred: database error.');
    }

   });
});


app.get('/delete/:title', (req, res, next) => {
  Data.deleteOne({"title": req.params.title }).lean()
    .then(() => {
      res.set('Content-Type', 'text/html')
      res.send(
    `<p>Item deleted</p>
     <p><a href = "/">Home</a></p>`);
    })
    .catch(err => next(err));
})

//api delete
app.get('/api/v1/albums/delete/:title', (req, res) => {
 Data.deleteOne({'title': req.params.title}).lean()
    .then((items) => {
    
    if(items){
    	res.json({filesDeleted: items.deletedCount});
    }else{
    	return res.status(500).send('Error occurred: database error.');
    }

   });
});

app.post('/api/v1/albums/add', (req, res) => {

  const newItem = req.body;


  Data.updateOne({ title: newItem.title }, newItem, { upsert: true }, (err, result) => {

    if (result.nModified == 0) {
    	console.log('Album added');
      	res.json({ fileChanged: result.nModified , filesFound : result.n})

      	//res.json({ fileMatched: result.n })
    } else if(result.nModified > 0) {
    	console.log('Album modifed');
     	res.json({ fileChanged: result.nModified, filesFound : result.n})
      	//res.json({ fileMatched: result.n })
    }

  })
})




//________________________________________________________________________-

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
