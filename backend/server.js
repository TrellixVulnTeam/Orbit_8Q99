const express = require("express");
const bodyParser = require('body-parser');
const path = require('path'); 
const axios = require("axios");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/orbitDB', {useNewUrlParser: true})

const app = express();


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend//build')));


// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});
  
app.listen(3001, function(){
    console.log("Server is running on port 3001.")
    
});


app.get('/', (req, res) => {
  
  res.render(__dirname + "../frontend/build/index.html");
});

//MongoDB: 





const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model("User", userSchema)

function addUser(){
  const newUser = new User({
    username : "user",
    email: "testing@orbit.com",
    password : "pass"
  })
  
  newUser.save();
}

