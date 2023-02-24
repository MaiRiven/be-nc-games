const express = require("express");
const {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReviewId,
  postComment,
  increaseVotes
} = require("./controllers/controllers.js");
const {
  handleCustomeErrors,
  handlePsqlErrors,
  handle500Statuses,
} = require("./controllers/error-handling");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);

app.post("/api/reviews/:review_id/comments", postComment);

app.patch('/api/reviews/:review_id', increaseVotes);

app.use(handleCustomeErrors);
app.use(handlePsqlErrors);
app.use(handle500Statuses);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Path not found! >:(" });
});

module.exports = app;
