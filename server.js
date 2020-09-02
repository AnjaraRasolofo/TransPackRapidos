const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
var apiRouter = require('./appRouter').router;

//Instanciate Express Server
const app = express();

//Configurate Server
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Configurate the session 
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}
}));

app.use('/api', apiRouter);

app.listen(8080, () => {
    console.log('Server started at localhost:8080');
})



