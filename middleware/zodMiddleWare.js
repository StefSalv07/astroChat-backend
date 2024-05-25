const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
    });
    return next();
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
};

module.exports = validate;
