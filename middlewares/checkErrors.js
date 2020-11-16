const { validationResult } = require("express-validator");

const checkErrors = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) return next();

  res.status(400).json({ ok: false, errors: result.mapped() });
};

module.exports = checkErrors;
