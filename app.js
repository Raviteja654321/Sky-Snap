const express = require("express");

const https = require("https");
const bodyparser = require("body-parser");

const app = express();


app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/index.html', function (req, res) {
    const city = req.body.cityName;
    console.log(city);
    const apikey = "a23795ac9e0075261667c58602b65274";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apikey + "&units=" + units;
    https.get(url, function (response) {
        // console.log(response.statusCode); This is to check the status code weather 200 or 404 or any other thing

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The Temperature in " + city + " is currently " + temperature + " degrees Celcius <h1>");
            res.write("<img src=" + imageurl + " alt=weather_icon>");
            res.send();
        })
    });
})




app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})
