const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=bedf2c7f9f5f81e1d2beef8037093287&query=" + latitude + "," + longitude;

  request({ url, json: true }, (error, { body } = {}) => {
    // console.log(body);
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, body.current.weather_descriptions[0] + " It is currently " + body.current.temperature + " degress out. There is a " + body.current.humidity + "humidity.");
    }
  });
};

module.exports = forecast;
