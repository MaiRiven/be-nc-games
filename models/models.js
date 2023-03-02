const db = require("../db/connection.js");

const fetchCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((res) => {
    const categoriesRows = res.rows;
    return categoriesRows;
  });
};

const fetchReviews = (category, sort_by, order) => {
  const validColumns = [
    'owner', 'title', 'review_id', 'category', 'created_at',
    'votes', 'designer', 'comment_count'
  ];

  if (!validColumns.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request",
    });
  };

  const query = {
    text: `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, 
      reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, 
      COUNT(comments.comment_id) AS comment_count FROM reviews 
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      WHERE ($1::text IS NULL OR reviews.category = $1)
      GROUP BY reviews.review_id
      ORDER BY ${sort_by} ${order};`,
    values: [category],
  };

  return db.query(query)
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
      const reviewWithCommentCount = Object.assign({}, review[0]); // make a copy of the review object
      return db.query(`SELECT COUNT(*) FROM comments WHERE review_id = $1`, [reviewId])
        .then((res) => {
          reviewWithCommentCount.comment_count = parseInt(res.rows[0].count) || 0; // add the comment count to the review object
          return reviewWithCommentCount;
    });
  })
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

const updateVotes = (review_id, inc_votes) => {
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1
        WHERE review_id = $2 RETURNING *`,
        [inc_votes, review_id]
        )
    .then((res) => {
      const updatedReview = res.rows;
      if (updatedReview.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Review not found",
        });
      } else {
        return updatedReview;
      }
    });
};

const fetchUsers = () => {
  return db.query(`SELECT * FROM users;`).then((res) => {
    const usersRows = res.rows;
    return usersRows;
  });
};

module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewById,
  writeComment,
  fetchCommentsByReviewId,
  updateVotes,
  fetchUsers,
};
