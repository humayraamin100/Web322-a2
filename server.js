
/*************************************************************************
* WEB322– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Humayra Amin Student ID: 123088213 Date: 02/10/2022
*
* Your app’s URL (from Cyclic) :_______________________________________________
*
*************************************************************************/ 
var express = require("express");
const { resolve } = require("path");
var app = express();
var path = require("path");
var data = require("./data-service.js");


var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public')); 


function onHTTPStart() {
  console.log("Express http server listening on port " + HTTP_PORT);
}


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/about.html"));
});

app.get("/employees", (req, res) => {
  data
    .getAllEmployees()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ Message: "Error" });
    });
});

app.get("/managers", (req, res) => {
  data
    .getManagers()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ Message: "Error" });
    });
});

app.get("/departments", (req, res) => {
  data
    .getDepartments()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ Message: "Error" });
    });
});

app.use((req, res) => {
  res
    .status(404)
    .send(
      "<h1>Error 404. Page Not Found.</h1>"
    );
});


data
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, onHTTPStart);
  })
  .catch((err) => {
    console.log("Error.");
  });