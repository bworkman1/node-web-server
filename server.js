const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// SERVER PORT NUMBER FROM HEROKU OR LOCAL
const portNumber = process.env.PORT || 3000;

var app = express();

// REGISTER PARTIAL VIEWS PATH
hbs.registerPartials(__dirname + '/views/partials');

// SETTING UP HBS TEMPLATES
app.set('view engine', 'hbs');

// MAINTENANCE MODE
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Under Maintenance',
//         message: 'Were currently working on our pages, check back later.'
//     });
// });

// STATIC TEMPLATE DIRECTORY
app.use(express.static(__dirname + '/public'));

// LOGGING REQUESTS
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server log.');
        }
    });
    next();
});

// GET CURRENT YEAR HELP FUNCTION
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// UPPER CASES ALL TEXT
hbs.registerHelper('screamIt', (text) => {
     return text.toUpperCase();
});

// INDEX PAGE
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome message paragraph'
    });
});

// ABOUT PAGE
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

// LOGGING THE SERVER IS UP
app.listen(portNumber, () => {
    console.log('Server is up on port ' + portNumber);
});