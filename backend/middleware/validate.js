const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // validate all fields

    if (error) {
      // Send all errors in one response
      const errors = error.details.map((err) => err.message);
      console.log(errors);
      return res.status(400).json({ errors });
    }

    next(); // proceed if validation passes
  };
};

module.exports = validate;