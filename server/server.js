const path       = require('path');
const fs         = require('fs');
const express    = require('express');
const bodyParser = require('body-parser');
const logger     = require('morgan');

const index = require('./app/routes/index');
const blogs = require('./app/routes/blogs_routes');

const app  = express();
const port = process.env.PORT || 8050;
console.log('port: ', port);

const mongoose = require('mongoose');
const remoteDbUrl = require('./config/db').url;

mongoose.connect(remoteDbUrl)
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));
const db = mongoose.connection;

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'app/access.log'), {flags: 'a'});
app.use(logger('combined', {stream: accessLogStream}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log('We are live on ' + port);
});

app.use('/', index);
app.use('/api/blogs', blogs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    const errStatus = err.status;
    res.locals.message = err.message;
    res.locals.error = {status: errStatus};

    // render the error page
    res.status(err.status || 500);
    res.send({ status: err.status });
});

module.exports = app;
