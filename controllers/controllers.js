const { fetchCategories } = require('../models/models.js');

const getCategories = (req, res, next) => {
    fetchCategories()
    .then(categories => {
        res.status(200).send({ categories });
    })
    .catch((err) => console.log(err));
};

module.exports = { getCategories };