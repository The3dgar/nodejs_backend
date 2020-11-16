/**
  Users Routes
  host+/api/auth
*/

const { Router } = require("express");
const { newUser, login, renewToken } = require("../controllers/auth");
const { jwtValidate } = require("../middlewares/jwtValidation");
const {validation} = require("../validations/users");

const router = Router();

router.post("/", validation("login"), login);
router.post("/new", validation("new") ,newUser);
router.get("/renew", jwtValidate, renewToken);

module.exports = router;
