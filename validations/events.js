const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const checkErrors = require("../middlewares/checkErrors");

const newEventValidation = () => [
  check("title", `"title" is required and must have min 4 chars`).notEmpty(),
  check("start", `"start" is required`).custom(isDate),
  check("end", `"end" is required`).custom(isDate),
  check("notes", `"notes" must be a string`).optional().isString()
];

module.exports = {
  validation(path) {
    let errorMiddleware = [];
    switch (path) {
      case "new":
        errorMiddleware = newEventValidation();
        break;
    }

    errorMiddleware.push(checkErrors);
    return errorMiddleware;
  }
};
