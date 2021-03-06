var express = require('express'),
    fileUplode = require('express-fileupload'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    path = require('path'),
    app = express(),
    port = 8080;

const { indexRouter, watch } = require('./routes/index.js');
const { dashboard, admin, addVideo, deleteVideo, adNewType, adNewLang } = require('./routes/dashboard');
const { getData } = require('./routes/fulter.js');

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// view engine setup

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUplode()); // configure fil upload

app.get('/', indexRouter);
app.get('/watch/:filmId', watch);
app.get('/admin', admin);
app.get('/dashboard', dashboard);
app.post('/dashboard', addVideo);
app.post('/dashboard/adNewType', adNewType);
app.post('/dashboard/adNewLang', adNewLang);
app.get('/delede/:id', deleteVideo);
app.get('/fulter/:fulter', getData);

// create connection to mysql database
const db = mysql.createConnection({
    host: 'b6hdwv6yo3biexq37s2e-mysql.services.clever-cloud.com',
    user: 'uwirc5lbkahga5lt',
    password: '3CtOUgE4frbqhFuBUE9x',
    database: 'b6hdwv6yo3biexq37s2e'
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
