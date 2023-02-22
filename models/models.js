const db = require('../db/connection.js');

const fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`)
    .then((res) => {
        const categoriesRows = res.rows;
        return categoriesRows;
    })
};

//link to controllers
//return a query of reviewId from controllers
//sql stuff innit -> select from reviews where the id is same as the req
//return the review
//add error
const fetchReviewById = (reviewId) => {
    return db.query(
      `SELECT * FROM reviews WHERE review_id = $1`, [reviewId])
      .then((res) => {
      const review = res.rows[0];
      if(!review) {
        throw { status: 404, msg: 'Review not found!' };
      }
      return review;
    });
  };

module.exports = { fetchCategories, fetchReviewById };