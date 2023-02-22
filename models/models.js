const db = require('../db/connection.js');

const fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`)
    .then((res) => {
        const categoriesRows = res.rows;
        return categoriesRows;
    })
};

const fetchReviews = () => {
    return db.query(`SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, 
    reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, 
    COUNT(comments.comment_id) AS comment_count FROM reviews 
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id;`)
    .then((res) => {
        const reviewRows = res.rows;
        console.log(reviewRows);
        return reviewRows;
    })
};

module.exports = { fetchCategories, fetchReviews };
