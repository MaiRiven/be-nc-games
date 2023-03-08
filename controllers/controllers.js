const {
  fetchCategories,
  fetchReviewById,
  fetchReviews,
  fetchCommentsByReviewId,
  writeComment,
  updateVotes,
  fetchUsers,
  eraseComment,
} = require("../models/models.js");

const getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => next(err));
};

const getReviews = (req, res, next) => {
  const { category, sort_by = 'created_at', order = 'desc' } = req.query;
  fetchReviews(category, sort_by, order)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => next(err));
};

const getReviewById = (req, res, next) => {
  const reviewId = req.params.review_id;
  fetchReviewById(reviewId)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => next(err));
};

const getCommentsByReviewId = (req, res, next) => {
  const reviewId = req.params.review_id;
  const checkArticle = fetchReviewById(reviewId);
  const fetchingComments = fetchCommentsByReviewId(reviewId);

  Promise.all([checkArticle, fetchingComments])
    .then((commentData) => {
      res.status(200).send({ comments: commentData[1] });
    })
    .catch((err) => next(err));
};

const postComment = (req, res, next) => {
  writeComment(req.params.review_id, req.body)
    .then((comment) => {
      res.status(201).send({ comments: comment });
    })
    .catch((err) => next(err));
};

const increaseVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateVotes(review_id, inc_votes)
    .then((updatedReview) => {
      res.status(200).json({ review: updatedReview });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => next(err));
};

const deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  eraseComment(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

// const apiEndpoints = [
//   { path: "/api", method: "GET", description: "Returns a JSON describing all the available endpoints on the API" },
//   { path: "/api/categories", method: "GET", description: "Returns an array of all categories" },
//   { path: "/api/reviews/:review_id", method: "GET", description: "Returns the review by ID" },
//   { path: "/api/reviews/:review_id/comments", method: "GET", description: "Returns an array of all comments on the chosen review" },
//   { path: "/api/reviews/:review_id/comments", method: "POST", description: "Adds a comment onto a chosen review" },
//   { path: "/api/reviews/:review_id", method: "PATCH", description: "Updates the votes on a review" },
//   { path: "/api/users", method: "GET", description: "Returns an array of all users" },
//   { path: "/api/comments/:comment_id", method: "DELETE", description: "Deletes the specified comment" },
// ];

const getApi = (req, res, next) => {
  res.status(200).json({ endpoints: apiEndpoints });
};

module.exports = {
  getCategories,
  getReviews,
  getReviewById,
  postComment,
  getCommentsByReviewId,
  increaseVotes,
  getUsers,
  deleteComment,
  getApi
};
