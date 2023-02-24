exports.handleCustomeErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else next(err);
};

exports.handle500Statuses = (error, req, res, next) => {
  console.log(error);
  res.status(500).send({ msg: "500 error" });
};
