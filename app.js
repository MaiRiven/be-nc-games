const express = require('express');
const { getCategories, getReviews, getReviewById, getCommentsByReviewId } = require('./controllers/controllers.js');
const { handleCustomeErrors, handlePsqlErrors, handle500Statuses } = require('./controllers/error-handling');

const app = express();



app.get('/api/categories', getCategories);

app.get('/api/reviews', getReviews);

app.get('/api/reviews/:review_id', getReviewById);

app.get('/api/reviews/:review_id/comments', getCommentsByReviewId);

app.use(handlePsqlErrors);
app.use(handleCustomeErrors);
app.use(handle500Statuses);

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Path not found! >:('})
});

module.exports = app;
