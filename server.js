const express = require('express');
const mongooose = require('mongoose');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/history.html'));
});

app.listen(port, () => console.log(`http://localhost:${port}`));
