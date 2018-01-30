const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//mongoose.connect('mongodb://localhost/my-blog');
mongoose.connect('mongodb://heroku_mfmb8z03:r42mpfpt307o31d13vjli7dmag@ds139619.mlab.com:39619/heroku_mfmb8z03');
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send();
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;