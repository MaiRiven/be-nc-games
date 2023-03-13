const express = require("express");
const cors = require('cors');
const {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReviewId,
  postComment,
  increaseVotes,
  getUsers,
  deleteComment,
  getApi,
} = require("./controllers/controllers.js");
const {
  handle500Statuses,
  handleCustomErrors,
  handlePsqlErrors,
} = require("./controllers/error-handling");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);

app.post("/api/reviews/:review_id/comments", postComment);

app.patch('/api/reviews/:review_id', increaseVotes);

app.get('/api/users', getUsers);

app.delete('/api/comments/:comment_id', deleteComment);

app.get('/api', getApi);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500Statuses);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Path not found! >:(" });
});

module.exports = app;
