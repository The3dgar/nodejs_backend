const { check } = require("express-validator");
const checkErrors = require("../middlewares/checkErrors");

const newUserValidation = () => [
  check("name", `"name" is required and must have min 4 chars`).notEmpty().isLength({min: 4}),
  check("email", `"email" is required`).isEmail(),
  check("password", `"password" is required and must have min 6 char`).isLength({min: 6})
];

const loginValidation = () => [
  check("email", `"email" is required`).isEmail(),
  check("password", `"password" is required and must have min 6 char`).isLength({min: 6})
];

module.exports = {
  validation(path) {
    let errorMiddleware = [];
    switch (path) {
      case "new":
        errorMiddleware = newUserValidation();
        break;
      case "login":
        errorMiddleware = loginValidation();
        break;
    }

    errorMiddleware.push(checkErrors);
    return errorMiddleware;
  }
};
