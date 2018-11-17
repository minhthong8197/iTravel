
// Include js file
const config = require('./_config');
const database = require('./app/database.js');

// Include library
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var Q = require('q');

const app = express();

app.listen(config.APP_PORT, () => {
    console.log('Server is running at http://localhost:' + config.APP_PORT + '/');
});

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/',function(req, res) {
    res.send('http://localhost:7979/');
});

app.get('/db/provinces', function(req, res) {
    database.GetCollection('Provinces')
        .then(function(colection) {
            var result = colection.find().toArray(function(err, result) {
                if (err) {
                    console.log('Error find data from collection Provinces');
                    res.send(null);
                }

                res.send(result);
            });
        });
});

app.get('/db/menu', function(req, res) {
    database.GetCollection('Menu')
        .then(function(colection) {
            var menu = colection.find().toArray(function(err, result) {
                if (err) {
                    console.log('Error find data from collection Menu');
                    res.send(null);
                }
                res.send(result);
            });
        });
});

app.get('/db/posts', function(req, res) {
    database.GetCollection('Mokup_Posts')
        .then(function(colection) {
            var posts = colection.find().toArray(function(err, result) {
                res.send(result);
            });
        });
});
