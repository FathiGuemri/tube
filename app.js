var express = require('express'),
    fileUplode = require('express-fileupload'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    path = require('path'),
    app = express(),
    port = 8081;

const { indexRouter } = require('./routes/index.js');
const { dashboard, admin, addVideo, deleteVideo } = require('./routes/dashboard');

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// view engine setup

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUplode()); // configure fil upload

app.get('/', indexRouter);
app.get('/admin', admin);
app.get('/dashboard', dashboard);
app.post('/dashboard', addVideo);
app.get('/delede/:id', deleteVideo);

// create connection to mysql database
const db = mysql.createConnection({
    host: 'bwzwgvlz9y6of5f6rdfm-mysql.services.clever-cloud.com',
    user: 'uyvkykp7ux0r5azi',
    password: '79RNPi3HCEKw3wDtcEwo',
    database: 'bwzwgvlz9y6of5f6rdfm'
});

db.connect((err) => {
    if (err)
        throw err;
    console.log('Connection to database successed.')
});

global.db = db;

app.listen(port, function() {
    console.log(`Server started on port: ${port}`);
});