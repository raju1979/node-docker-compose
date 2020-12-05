const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const winston = require('./config/winston');

const app = express();
app.use(express.json());

global.tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));
global.users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`));

app.use(morgan('combined', { stream: winston.stream }));
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

const toursRoute = require('./routes/tours.route');
const usersRoute = require('./routes/users.route');

app.use('/api/v1/tours', toursRoute);
app.use('/api/v1/users', usersRoute);

module.exports = app;