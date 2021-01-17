const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    message: "CONTENT FROM NODE",
    title: "Home",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "HELLOOO FUCKERS",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) return res.send("ERROR! PLEASE PROVIDE ADDRESS");

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        address: req.query.address,
        title: "Weather",
        forecast: forecastData,
        location,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("help404", {
    title: "Help",
  });
});

app.get("*", (req, res) => {
  //this line should be at the last of all routes
  res.render("404");
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
