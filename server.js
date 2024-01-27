const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const Climate = require('./model/model.js');

const app = express();
const port = 5500;

// Middleware setup
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



// Route to save weather data
app.post('/save-weather-data', (req, res) => {
    const weatherData = req.body;

    const newWeatherData = new Climate({
        location: weatherData.location.name,
        country: weatherData.location.country,
        temperature: weatherData.current.temp_c,
        humidity: weatherData.current.humidity,
        wind: weatherData.current.wind_kph,
        uvindex: weatherData.current.uv,
        precipitation: weatherData.current.precip_mm,
        weatherIcon: weatherData.current.condition.icon
    });
    newWeatherData.save()
        .then(savedData => res.json(savedData))
        .catch(err => res.status(500).json({ error: err.message }));
});

//Route to fetch weather data
app.get('/fetch-history', (req, res) => {
    Climate.find()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});



// Routes for HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/views/index.html')));
app.get('/history', (req, res) => res.sendFile(path.join(__dirname, '/public/views/history.html')));

// Start server
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
