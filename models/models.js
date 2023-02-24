const db = require("../db/connection.js");

const fetchCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((res) => {
    const categoriesRows = res.rows;
    return categoriesRows;
  });
};

const fetchReviews = () => {
  return db
    .query(
      `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, 
    reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, 
    COUNT(comments.comment_id) AS comment_count FROM reviews 
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at;`
    )
    .then((res) => {
      const reviewRows = res.rows;
      return reviewRows;
    });
};

const fetchReviewById = (reviewId) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [reviewId])
    .then((res) => {
      const review = res.rows;
      if (review.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Review not found!",
        });
      }
      return review[0];
    });
};
const fetchCommentsByReviewId = (reviewId) => {
  return db
    .query(
      `SELECT * FROM comments WHERE comments.review_id = $1
      ORDER BY comments.created_at DESC;`,
      [reviewId]
    )
    .then((res) => {
      const comments = res.rows;
      return comments;
    });
};

const writeComment = (id, body) => {
  const username = body.username;
  const comment = body.body;
  return db
    .query(
      `INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *`,
      [id, username, comment]
    )
    .then((res) => {
      return res.rows[0].body;
    });
};

module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewById,
  writeComment,
  fetchCommentsByReviewId,
};
