const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth"));
router.use("/events", require("./events"));

module.exports = router;
