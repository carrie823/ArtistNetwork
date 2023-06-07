//import required modules
//const { request, response } = require("express");
const path = require('path');
const express = require("express");
const multer = require('multer');
const bcrypt = require('bcrypt');
// const express = require('express');
const session = require('express-session');

let upload = multer({ dest: path.join(__dirname, 'uploads') });
const { MongoClient, ObjectId } = require("mongodb")
// const path = require('path');

// app.use(express.static('frontend'));
// const cookie = require('cookie')

// app.use(session({
//   secret: 'I am tired',
//   resave: false,
//   saveUninitialized: true,
// }));

// var authenticated = function(req, res, next) {
//   if (!req.username) return res.status(401).end("access denied");
//   next();
// };

// app.use(function (req, res, next){
//   var cookies = cookie.parse(req.headers.cookie || '');
//   req.username =(req.session.user)? req.session.user._id : ''
//   console.log("HTTP request", req.username, req.method, req.url, req.body);
//   next();
// });


//Mongo
const dbUrl = "mongodb://localhost:27017/artistnetworkdb";
const client = new MongoClient(dbUrl);
//client.connect();
//var users = setUpDb()
//set up Express App
const app = express();
const port = process.env.PORT || 3001;

const http = require("http");
var cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
//app.use(express.static('frontend'));
// const server = http.createServer(function (request, response){
//   response.writeHeader(200, {"Content-Type": 'text/html'});
//   response.write(html);
//   response.end();
// })
// }

// fs.readFile('/index.html', function (err, html) {

//   if (err) throw err;    

//   http.createServer(function(request, response) {  
//       response.writeHeader(200, {"Content-Type": "text/html"});  
//       response.write(html);  
//       response.end();  
//   }).listen(PORT);
// });

//test Express App
app.get("/", async (request, response) => {
  response.status(200).send("Test page1");
  await getUsers();
})

app.get("/artistalley", async (request, response) => {
  response.status(200).send("Test page2");
  await getSales();
})

// app.get("/comments", async (request, response) => {
//   response.status(200).send("Test page3");
//   await getComments();
// })

app.get("/studiospace", async (request, response) => {
  response.status(200).send("Test page4");
  await getArtworks();
})

// app.post("/signup", function (request, response) {
//   console.log("hi")
//   // console.log(request.body)=
//   storeUserData(request.body);
//   response.status(200)
//   return response.json("you did it");

// })

app.post("/signup", function (request, res) {

  let username = request.body.username;
  let password = request.body.password;
  let name = request.body.name;
  let copyright = request.body.copyright;
  // })

  // async function hashPassword(password) { 
  const saltRound = 10;

  //   const salt = await bcrypt.genSalt(saltRounds);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   return hashedPassword;

  // }

  // async function passPassword() {
  //   const password = 'mypass';
  //   const hashedPassword = await hashPassword(password);
  // } passPassword();
  // console.log()


  bcrypt.hash(password, saltRound, function (err, hash) {
    client.connect().then(() => {

      db = client.db("artistnetworkdb");
      var collection = db.collection("users");
      let b = { "password": hash, "name": name, "username": username, "copyright": copyright }

      collection.insertOne(b).then((r) => {

        if (r) {
          res.status(200)
          return res.json("");
        } else {
          res.status(400)
          return res.json("access denied")
        }
      });

    })

  })
})


app.get('/api/sale/', function (req, res, next) {
  console.log("FAEFFWF")
  db = client.db("artistnetworkdb");
  let collection = db.collection("sales");
  collection.find({}).sort([['_id', -1]]).limit(1).toArray().then((r) => {
    console.log(r)
    res.status(200)
    return res.json(r)
  })

})

app.get("/api/sale/:id/", function (req, res, next) {
  db = client.db("artistnetworkdb");
  let collection = db.collection("sales");

  collection.find({ _id: new ObjectId(req.params.id) }).toArray().then((r) => {
    console.log(r)

    res.setHeader('Content-Type', r[0].image.mimetype);
    res.sendFile(r[0].image.path);

  })
})

app.post('/api/images/sales/', upload.single('image'), function (req, res, next) {

  let image = { title: req.body.title, "description": req.body.description, "link": req.body.link, "image": req.file };
  

  client.connect().then(() => {

    db = client.db("artistnetworkdb");
    var collection = db.collection("sales");

    collection.insertOne(image).then((r) => {

      if (r) {
        res.status(200)
        return res.json("");
      } else {
        res.status(400)
        return res.json("access denied")
      }
    });

    //return res.json(image);
  })


});

// app.post('/api/images/', upload.single('image'), function (req, res, next) {

//   let image = { title: req.body.title, "description": req.body.description, "link": req.body.link, "image": req.file };


//   client.connect().then(() => {

//     db = client.db("artistnetworkdb");
//     var collection = db.collection("sales");

//     collection.insertOne(image).then((r) => {

//       if (r) {
//         res.status(200)
//         return res.json("");
//       } else {
//         res.status(400)
//         return res.json("access denied")
//       }
//     });

//     // return res.json(image);
//   })


// });


app.get('/api/art/', function (req, res, next) {
  console.log("FAEFFWF")
  db = client.db("artistnetworkdb");
  let collection = db.collection("artworks");
  collection.find({}).sort([['_id', -1]]).limit(1).toArray().then((r) => {
    console.log(r)
    res.status(200)
    return res.json(r)
  })

})


app.get("/api/art/:id/", function (req, res, next) {
  db = client.db("artistnetworkdb");
  let collection = db.collection("artworks");


  collection.find({ _id: new ObjectId(req.params.id) }).toArray().then((r) => {
    console.log(r)

    res.setHeader('Content-Type', r[0].image.mimetype);
    res.sendFile(r[0].image.path);

  })
})


app.post('/api/images/arts/', upload.single('image'), function (req, res, next) {

  let image = { title: req.body.title, "description": req.body.description, "image": req.file };


  client.connect().then(() => {

    db = client.db("artistnetworkdb");
    var collection = db.collection("artworks");

    collection.insertOne(image).then((r) => {

      if (r) {
        res.status(200)
        return res.json("");
      } else {
        res.status(400)
        return res.json("access denied")
      }
    });

    //return res.json(image);
  })


});


// app.post("/login", function (request, response) {
//   console.log("hi")
//   console.log(request.body)
//   // b = request.body;
//   console.log("checkpoint 1");
//   let body = request.body;
//   let password = body.password
//   let user = body.username;
//   console.log(password)
//   //console.log(formData);
//   client.connect().then(() => {
//     console.log("test")
//     db = client.db("artistnetworkdb");
//     var collection = db.collection("users");
//     collection.findOne({ "username": user, "password": password }).then((res) => {
//       console.log("done")
//       console.log(res)
//       if (res) {
//         response.status(200)
//         return response.json("you did it");
//       } else {
//         response.status(400)
//         return response.json("access denied")
//       }
//     });
//   });

// })


app.delete('/api/items/:id/', (req, res) => {
  let itemId = req.params.id;

  let db = client.db('artistnetworkdb'); // Replace with your database name
  let collection = db.collection('artworks'); // Replace with your collection name

  collection.deleteOne({ _id: new ObjectId(itemId) }).then((result) => {

    if (result.deletedCount === 1) {
      console.log('Item deleted successfully');
      res.sendStatus(200); // Success
    } else {
      console.log('Item not found');
      res.sendStatus(404); // Item not found
    }
  })

});

app.delete('/api/items/sale/:id/', (req, res) => {
  let itemId = req.params.id;

  let db = client.db('artistnetworkdb'); // Replace with your database name
  let collection = db.collection('sales'); // Replace with your collection name

  collection.deleteOne({ _id: new ObjectId(itemId) }).then((result) => {

    if (result.deletedCount === 1) {
      console.log('Item deleted successfully');
      res.sendStatus(200); // Success
    } else {
      console.log('Item not found');
      res.sendStatus(404); // Item not found
    }
  })

});

app.put('/api/items/updateart/:id/', (req, res) => {
  let itemId = req.params.id;
  console.log(itemId)
  let db = client.db('artistnetworkdb'); // Replace with your database name
  let collection = db.collection('artworks'); // Replace with your collection name
  console.log(req.body)
  collection.updateOne({ _id: new ObjectId(itemId) }, { $set: req.body }).then((result) => {
    console.log(result)
    if (result.matchedCount === 1) {
      console.log('Item deleted successfully');
      res.sendStatus(200); // Success
    } else {
      console.log('Item not found');
      res.sendStatus(404); // Item not found
    }
  })

});

app.put('/api/items/updatesale/:id/', (req, res) => {
  let itemId = req.params.id;
  console.log(itemId)
  let db = client.db('artistnetworkdb'); // Replace with your database name
  let collection = db.collection('sales'); // Replace with your collection name
  console.log(req.body)
  collection.updateOne({ _id: new ObjectId(itemId) }, { $set: req.body }).then((result) => {
    console.log(result)
    if (result.matchedCount === 1) {
      console.log('Item deleted successfully');
      res.sendStatus(200); // Success
    } else {
      console.log('Item not found');
      res.sendStatus(404); // Item not found
    }
  })

});


app.post("/login", function (request, response) {

  // b = request.body;

  let body = request.body;
  let password = body.password
  let user = body.username;

  //console.log(formData);
  client.connect().then(() => {

    db = client.db("artistnetworkdb");
    var collections = db.collection("users");

    // let x = { "username": user }
    // console.log(x)
    collections.findOne({ "username": user }).then((username) => {
      // console.log("FFFF")
      if (!username) return response.status(401).end("access denied");

      bcrypt.compare(password, username.password, function (err, res) {
        if (res) {
          response.status(200)
          console.log(res);
          return response.json(username);
        } else {
          response.status(400)
          return response.json("access denied")
        }
      })
    })
  })
})

// app.post("/login", function (request, response) {
//   console.log("hi")
//   console.log(request.body)
//   // b = request.body;
//   console.log("checkpoint 1");
//   let body = request.body;
//   let password = body.password
//   let user = body.username;
//   console.log(password)
//   //console.log(formData);
//   client.connect().then(() => {
//     console.log("test")
//     db = client.db("artistnetworkdb");
//     var collections = db.collection("users");
//     console.log(user)
//     // let x = { "username": user }
//     // console.log(x)
//     collections.findOne({ "username": user }).then((username) => {
//       // console.log("FFFF")
//       if (!username) return res.status(401).end("access denied");
//       console.log("done")
//       bcrypt.compare(password, username.password, function (err, res) {
//         if (res) {
//           response.status(200)
//           // console.log(res);
//           return response.json(username);
//         } else {
//           response.status(400)
//           return response.json("access denied")
//         }

//       })
//       req.session.user = user;
//       res.setHeader('Set-Cookie', cookie.serialize('username', username, {
//         path: '/studiospace',
//         maxAge: 3600000
//       }));
//       return res.json(username);
//     })
//   })
// })


//set up server listening
app.listen(port, () => {

  console.log(`Listening on http://localhost:${port}`);
});

//Mongo Functions
async function conntection() {
  await client.connect();
  db = client.db("artistnetworkdb"); // selecting the artistnetworkdb database
  return db;
}

// Route to serve the HTML file
// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.listen(8888, () => {
//   console.log('Server at port 8888');
// });

// Express route handler for handling form submissions
// app.post('/submit', storeUserData);

//********maybe need to uncomment this later***********
// // Async function to create a user document in users collection
// async function storeUserData(formData) {
//   await client.connect();
//   db = client.db("artistnetworkdb");
//   var collection = db.collection("users");
//   var result = await collection.insertOne(formData);
//   console.log("form data submitted")
//   return result;

// };



// async function setUpDb() {
//   await client.connect();
//   db = client.db("artistnetworkdb");
//   var collection = db.collection("users");
//   return collection;
// }

// function confirmUserData(formData) {
//   users.find(formData, function (err, res) {
//     console.log("hiXZZZZ")
//     if (res) return res;
//   })
//   // console.log("form data submitted")


// };

//testing html form
// document.getElementById('submit-form').addEventListener('click', async (event) => {
//   event.preventDefault();

//   const nameInput = document.getElementById('name');
//   const userInput = document.getElementById('username');
//   const passInput = document.getElementById('password');

//   var formData = {
//     name: nameInput.value,
//     username: userInput.value,
//     password: passInput.value,
//   };

//   console.log(nameInput.value);

// await storeUserData(formData);

// });

// const formData = {
//   name: 'Anna',
//   username: 'anna123',
//   password: 'password',
//   userID: '2',
//   admin: 'false'
// };

// storeUserData(formData)
//   .then(() => {
//     console.log('Form data stored successfully!');
//   })
//   .catch((error) => {
//     console.error('An error occurred:', error);
//   });

// Async function to display user document from users collection 
async function getUsers() {
  var db = await conntection();
  var results = db.collection("users").find({});
  console.log(await results.toArray());
  // var res = await results.toArray();
  // return res;
}

// Async function to display artwork document from artworks collection 
async function getArtworks() {
  var db = await conntection();
  var results = db.collection("artworks").find({});
  console.log(await results.toArray());
  // var res = await results.toArray();
  // return res;
}

// Async function to display sale document from sales collection 
async function getSales() {
  var db = await conntection();
  var results = db.collection("sales").find({});
  console.log(await results.toArray());
  // var res = await results.toArray();
  // return res;
}

// Async function to display comment document from comments collection 
// async function getComments() {
//   var db = await conntection();
//   var results = db.collection("comments").find({});
//   console.log(await results.toArray());
//   // var res = await results.toArray();
//   // return res;
// }

// Meeting Notes
// Work on error/success messaages
// Copyright - statement in the sign up
// Statment:
// Radio Button for "we agree to the copyright"
// Search bar considerations 
// Changes: 
// Wireframes (redo) - better labels
// change wireframe layout 
// include it all in the same wirefames
// No comments sectons anymore! 

