const mongoose = require('mongoose');

mongoose.connect(process.env.Database_URL)
    .then(() => console.log('Connected to the Database'))
    .catch(error => console.error('Error connecting to Database:', error));

// Define Mongoose schema and model
const climateSchema = new mongoose.Schema({
    location: { type: String, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    wind: { type: Number, required: true },
    uvindex: { type: Number, required: true },
    precipitation: { type: Number, required: true },
    weatherCondition: { type: String, required: true }
}, { timestamps: true });

const Climate = mongoose.model('Climate', climateSchema);

module.exports = Climate;