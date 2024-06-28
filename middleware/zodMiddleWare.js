const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
    });
    return next();
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Extract validation errors from Joi error object
      const errors = err.details.map((error) => ({
        field: error.path.join('.'),
        message: error.message,
      }));
      return res.status(400).json({ errors });
    }
    // For other types of errors, return a generic error message
    return res.status(400).json({ error: err.errors });
  }
};

module.exports = validate;

