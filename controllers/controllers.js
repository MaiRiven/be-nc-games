const { fetchCategories, fetchReviewById } = require('../models/models.js');

const getCategories = (req, res, next) => {
    fetchCategories()
    .then(categories => {
        res.status(200).send({ categories });
    })
    .catch((err) => console.log(err));
};

//link to app and models
//use review id with new function 
//send back body of review
//catch errors
const getReviewById = (req, res, next) => {
    const reviewId = req.params.review_id;
    fetchReviewById(reviewId)
    .then(review => {
        res.status(200).send({ review });
    })
    .catch((err) => console.log(err));
};

module.exports = { getCategories, getReviewById };