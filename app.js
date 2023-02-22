const express = require('express');
const { getCategories } = require('./controllers/controllers.js');
//const { handle500Statuses } = require('./controllers/errorhandling');

const app = express();

//app.use(express.json());

app.get('/api/categories', getCategories);

// app.get('/api/restauraunt/:id', (req, res) => {
//     const { id } = req.params;
//     const filePath = `./db/data/test-data/`
// })

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Path not found! >:('})
})

module.exports = app;
