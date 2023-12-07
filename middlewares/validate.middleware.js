const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  // console.log(req.body);
  // console.log("value", value);
  if (error) {
    return next({
      status: 400,
      message: error.details.map((d) => d.message),
    });
  }
  req.xop = value;
  //console.log("req.xop", req.xop);
  next();
};

module.exports = {
  validate,
};
