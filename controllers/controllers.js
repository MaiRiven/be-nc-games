const { fetchCategories, fetchReviewById, fetchReviews } = require('../models/models.js');

const getCategories = (req, res, next) => {
    fetchCategories()
    .then(categories => {
        res.status(200).send({ categories });
    })
    .catch((err) => console.log(err));
};

const getReviews = (req, res, next) => {
    fetchReviews()
    .then(reviews => {
        res.status(200).send({ reviews });
    })
    .catch((err) => console.log(err));
};

const getReviewById = (req, res, next) => { 
    const reviewId = req.params.review_id;
    fetchReviewById(reviewId)
    .then(review => {
        res.status(200).send({ review });
    })
    .catch((err) => next(err));
    };

module.exports = { getCategories, getReviews, getReviewById };