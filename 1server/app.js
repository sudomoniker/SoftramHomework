const mysql = require('mysql');
const express = require('express');
const https = require('https');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('./auth.middleware');
const routes = require('./app.routes');



const jwt_key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const saltRounds = 5;



const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Distorted1!-",
  database: 'fanart'
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const app = express();
const router = express.Router();
app.use('/uploads', express.static('uploads'));

app.use(express.json());
// const options = {
//   key: fs.readFileSync("/etc/letsencrypt/live/linkeddesign.online-0001/privkey.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/linkeddesign.online-0001/fullchain.pem")
// };

//use when options become real ssl cert

// https.createServer(options, app).listen(3000, () => {
//   console.log("Server is listening on port 3000!");
// });
app.listen(3000, () => {
    console.log("server running on port 3000");
});

//cors header stuff
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.options('*', function (req,res) { res.sendStatus(200); });

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid MIME type");
      if (isValid) {
          error = null;
      }
      cb(error, 'uploads/')
  },
  filename: function(req, file, cb) {
      const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

const upload = multer({storage: storage});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'andrewlink1999@gmail.com',
      pass: 'aB9WfrqrsJF6AmE'
  }
});



//router
// router.post('/users', routes.userSignUp);
// router.post('/login', routes.userLogin);










/**
 *
 *
 * GET QUERIES
 *
 *
 *
 */
//this gets all users
app.get('/users', (req, res) => {
  con.query('SELECT * FROM users', (err, rows) => {
    if(err) throw err;

    res.send(rows);

  });
});

//this gets a specific user for purpose of loggin in
app.get('/users/:id/:password', (req, res) => {
  con.query('SELECT * FROM users WHERE username=?', req.params.id, async (err, rows) => {
    if(err) throw err;

    let bool = await bcrypt.compare(req.params.password, rows[0].password);
    if(bool) {
      const username = rows[0].username;
      const user = rows[0];
      // time to generate user's JWT
      const token = jwt.sign(
        { username, user },
        jwt_key,
        { expiresIn: '4h' }
      );
      // res.status(200).json({
      //   token: token,
      //   expiresIn: 14400,
      //   user
      // });
      res.send(user);
    }else{
      res.send("Passwords do not match!")
    }
  });
});

//this gets all art posts
app.get('/artposts', (req, res) => {
  con.query('SELECT artposts.idartposts, artposts.imgsrc, artposts.user, artposts.title, artposts.creatorid, users.username, users.email, users.instagram, users.twitter FROM artposts LEFT JOIN users ON users.idusers = artposts.user', (err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});

//this gets a specific artpost
app.get('/artpost/:id', (req, res) => {
  con.query('SELECT * FROM artposts WHERE idartposts = ?', req.params.id, (err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});

//this gets a comment chain, the replytoid is either an artpost or another comment that is being replied to
app.get('/commentchain/:replytoid', (req, res) => {
  con.query('SELECT comments.idcomments, comments.replytoid, comments.user, comments.comment, comments.replycommentid, users.username FROM comments LEFT JOIN users ON users.idusers = comments.user WHERE comments.replytoid = ?', req.params.replytoid, (err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});

//this gets a reply chain
app.get('/replychain/:replytoid', (req, res) => {
  con.query('SELECT comments.idcomments, comments.replytoid, comments.user, comments.comment, comments.replycommentid, users.username FROM comments LEFT JOIN users ON users.idusers = comments.user WHERE comments.replycommentid = ?', req.params.replytoid, (err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});

//this gets the creators table
app.get('/creators', (req, res) => {
  con.query('SELECT * FROM creators', (err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});


/**
 *
 *
 * POST QUERIES
 *
 *
 *
 */
//create user
 app.post('/users', async (req, res) => {



  let encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
  console.log(encryptedPassword);

  let user = {
    "username": req.body.username,
    "password": encryptedPassword,
    "email": req.body.email,
    "instagram": req.body.instagram,
    "twitter": req.body.twitter
  }

  con.query("INSERT INTO users SET ?", user, (err, rows) => {
    if(err) throw err;

    res.send(user);
  });
});

//create comment
app.post('/comments', (req, res) => {

  let comment = {
    "replytoid": req.body.replytoid,
    "user": req.body.user,
    "comment": req.body.comment,
    "replycommentid": req.body.replycommentid
  }

  con.query("INSERT INTO comments SET ?", comment, (err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});

//create artpost
app.post('/artposts', (req, res) => {

  let artpost = {
    "imgsrc": req.body.imgsrc,
    "user": req.body.user,
    "title": req.body.title
  }

  con.query("INSERT INTO artposts SET ?", artpost, (err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});


/**
 *
 *
 * DELETE QUERIES
 *
 *
 *
 */
//delete user
 app.delete('/users', (req, res) => {

  let deleteid = req.body.deleteid;

  con.query("DELETE FROM users WHERE idusers=?", deleteid, (err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});

//delete comment
app.delete('/comments', (req, res) => {

  let deleteid = req.body.deleteid;

  con.query("DELETE FROM comments WHERE idcomments=?", deleteid, (err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});

//delete artpost
app.delete('/artposts', (req, res) => {

  let deleteid = req.body.deleteid;

  con.query("DELETE FROM artposts WHERE idartposts=?", deleteid, (err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});

/**
 *
 *
 * PATCH QUERIES
 *
 *
 *
 */
