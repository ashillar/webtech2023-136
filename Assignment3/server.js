// ###############################################################################
// Web Technology at VU University Amsterdam
// Assignment 3
//
// The assignment description is available on Canvas. 
// Please read it carefully before you proceed.
//
// This is a template for you to quickly get started with Assignment 3.
// Read through the code and try to understand it.
//
// Have you read the zyBook chapter on Node.js?
// Have you looked at the documentation of sqlite?
// https://www.sqlitetutorial.net/sqlite-nodejs/
//
// Once you are familiar with Node.js and the assignment, start implementing
// an API according to your design by adding routes.


// ###############################################################################
//
// Database setup:
// First: Our code will open a sqlite database file for you, and create one if it not exists already.
// We are going to use the variable "db' to communicate to the database:
// If you want to start with a clean sheet, delete the file 'phones.db'.
// It will be automatically re-created and filled with one example item.

const sqlite = require('sqlite3').verbose();
let db = my_database('./gallery.db');

// ###############################################################################
// The database should be OK by now. Let's setup the Web server so we can start
// defining routes.
//
// First, create an express application `app`:

var express = require("express");
var app = express();

// We need some middleware to parse JSON data in the body of our HTTP requests:
app.use(express.json());


// ###############################################################################

// Routes

// ###############################################################################

//This spits out the data in a format: [{"id":1,"author":"Tim Berners-Lee","alt":"Image of Berners-Lee","tags":"html,http,url,cern,mit","image":"https://upload.wikimedia.org/wikipedia/commons/9/9d/Sir_Tim_Berners-Lee.jpg","description":"The internet and the Web aren't the same thing."},
//Retrieve all
app.get("/photos", (req, res) => {
  	db.all("SELECT * from gallery", (err, rows) => {
    	if (err) {
      		return console.error(err.message);
    	}
    	//res.json(rows) res is the result of getting the photos... res.json(rows)
    	res.json(rows);


  	});
});

//Retrieve data for a specific photo

app.get("/photos/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM gallery WHERE id = ?`;
  db.get(query, [id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    if (!row) {
      return res.status(404).send({ error: "Item not found" });
    }
    res.status(200).send(row);
  });
});

//add data for new photo route

app.post("/photos", (req, res) => {
	const { author, alt, tags, image, description } = req.body;
	const query = "INSERT INTO gallery (author, alt, tags, image, description) VALUES (?,?,?,?,?)";
	//const query = INSERT INTO gallery (author, alt, tags, image, description) VALUES (?,?,?,?,?); removed should be the one on above
	db.run(query, [author, alt, tags, image, description], (err) => {
		if (err) {
			return console.error(err.message);
		}
		res.sendStatus(201);
	});
});

//Update route
//Use of prepared statements(?) to avoid SQL injections
app.put("/photos/:id", (req, res) => {
  const { id } = req.params;
  const { author, alt, tags, image, description } = req.body;
  const query = `UPDATE gallery 
                 SET author = ?, alt = ?, tags = ?, image = ?, description = ? 
                 WHERE id = ?`;
  db.run(query, [author, alt, tags, image, description, id], (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.sendStatus(200);
  });
});


//Delete route
app.delete("/photos/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM gallery WHERE id = ?`;
  db.run(query, [id], (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.sendStatus(200);
  });
});


// ###############################################################################
// This should start the server, after the routes have been defined, at port 3000:

app.listen(3000);
console.log("Your Web server should be up and running, waiting for requests to come in. Try http://localhost:3000/hello");

// ###############################################################################
// Some helper functions called above
function my_database(filename) {
	// Conncect to db by opening filename, create filename if it does not exist:
	var db = new sqlite.Database(filename, (err) => {
  		if (err) {
			console.error(err.message);
  		}
  		console.log('Connected to the phones database.');
	});
	// Create our phones table if it does not exist already:
	db.serialize(() => {
		db.run(`
        	CREATE TABLE IF NOT EXISTS gallery
        	 (
                    id INTEGER PRIMARY KEY,
                    author CHAR(100) NOT NULL,
                    alt CHAR(100) NOT NULL,
                    tags CHAR(256) NOT NULL,
                    image char(2048) NOT NULL,
                    description CHAR(1024) NOT NULL
		 )
		`);
		db.all(`select count(*) as count from gallery`, function(err, result) {
			if (result[0].count == 0) {
				db.run(`INSERT INTO gallery (author, alt, tags, image, description) VALUES (?, ?, ?, ?, ?)`, [
        			"Tim Berners-Lee",
        			"Image of Berners-Lee",
        			"html,http,url,cern,mit",
        			"https://upload.wikimedia.org/wikipedia/commons/9/9d/Sir_Tim_Berners-Lee.jpg",
        			"The internet and the Web aren't the same thing."
    				]);
				db.run(`INSERT INTO gallery (author, alt, tags, image, description) VALUES (?, ?, ?, ?, ?)`, [
        			"Grace Hopper",
        			"Image of Grace Hopper at the UNIVAC I console",
        			"programming,linking,navy",
        			"https://upload.wikimedia.org/wikipedia/commons/3/37/Grace_Hopper_and_UNIVAC.jpg",
				"Grace was very curious as a child; this was a lifelong trait. At the age of seven, she decided to determine how an alarm clock worked and dismantled seven alarm clocks before her mother realized what she was doing (she was then limited to one clock)."
    				]);
				console.log('Inserted dummy photo entry into empty database');
			} else {
				console.log("Database already contains", result[0].count, " item(s) at startup.");
			}
		});
	});
	return db;
};
