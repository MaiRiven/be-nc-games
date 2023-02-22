const express = require('express');
const { getCategories, getReviews } = require('./controllers/controllers.js');
//const { handle500Statuses } = require('./controllers/errorhandling');

const app = express();

app.get('/api/categories', getCategories);

app.get('/api/reviews', getReviews);
// app.all('*', (req, res) => {
//     res.status(404).send({ msg: 'Path not found! >:('})
// });


app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Path not found! >:('})
});
module.exports = app;