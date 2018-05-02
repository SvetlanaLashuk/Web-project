'use strict';

let express = require('express');
let app = express();
let Parser = require('rss-parser');
let parser = new Parser();
let bodyParser = require('body-parser');

// Set up the template engine
app.set('views', './views');
app.set('view engine', 'pug');

// Set up middleware
app.use(express.static('public'));
app.use(bodyParser.json());

let mockedFeeds = [
    {
        title: 'Economics',
        url: 'https://news.tut.by/rss/economics.rss',
    },
    {
        title: 'Society',
        url: 'https://news.tut.by/rss/society.rss',
    },
    {
        title: 'World',
        url: 'https://news.tut.by/rss/world.rss',
    },
    {
        title: 'Culture',
        url: 'https://news.tut.by/rss/culture.rss',
    }
];

// GET for '/'
app.get('/', function (req, res) {
    res.render('index', {feeds: mockedFeeds});
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
