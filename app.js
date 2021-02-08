const express = require('express');
const app = express();

// this line is needed to parse the request body (before bodyParse packet)
// app now can handle the request body.
app.use(express.urlencoded({ extended: false }));

let accessCount = 0;
// middlewares (just functions)
const count = () => {
    return (req, res, next) => {
        accessCount++;
        console.log(accessCount);
        next(); // process as planned, action after the middleware in app.get -> (req, res) => {}
    };
};


// registering a middleware globally -> for every route
app.use(count());

app.get('/', (req, res) => {
    res.render('form');
});

app.post('/post-example', (req, res) => {
    console.log(req.body.user);
});

app.set('view engine', 'hbs');

app.listen(3000);