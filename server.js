'use strict';


let express = require('express');
let app = express();
let Parser = require('rss-parser');
let parser = new Parser();
let bodyParser = require('body-parser');
let mysql = require('mysql');

// Set up the template engine
app.set('views', './views');
app.set('view engine', 'pug');

// Set up middleware
app.use(express.static('public'));
app.use(bodyParser.json());

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "rss"
});
connection.connect();





/*$.ajax({
    url:'http://freegeoip.net/json/',
    type:'get',
    dataType:'json'
}).done(function(data) {
    alert(data.ip);
});


var ip =jq.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function(data) {
    console.log(JSON.stringify(data));
});*/
var bd="";

connection.query('SELECT * FROM links', function (err, result) {
bd =result;

    function GetIp(data){
        console.log(JSON.stringify(data));
        alert(data.ip);
    }


});
app.get('/', function (req, res) {
    res.render('index', {feeds: bd});
});

// POST for '/feed'
app.post('/feed', function (req, res) {
    let promise = new Promise(resolve => resolve(parser.parseURL(req.body.url)));
    promise.then(result => res.send(result));
});

// Start up the server
app.listen(3000, function () {
    console.log('Listening on http://localhost:3000');
});
