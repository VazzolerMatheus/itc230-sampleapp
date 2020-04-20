const data = require("./data");

const http = require("http");

http.createServer((req,res) => {
	const path = req.url.toLowerCase();

	switch(path){

		case '/':
			res.writeHead(200, {'Content-type' : 'text/plain'});
			res.end('This is the home page \nNumber of items in array: ' + data.getAll().length);

			break;

		case '/about':
			const fs = require("fs");

			fs.readFile("home.html", (err, data) => {
				if (err) return console.error(err);
				res.writeHead(200, {'Content-type' : 'text/plain'});
				res.end('Hello! \nMy name is Matheus. I am a student at Seattle Central College aiming to become a web developer! :)');
			});
			break;

		default:
			res.writeHead(200, {'Content-type' : 'text/plain'});
			res.end('Page Not Found');
			break;

	}

}).listen(process.env.PORT || 3000);