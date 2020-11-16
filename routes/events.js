/**
  Events Routes
  host+/api/events
*/

const { Router } = require("express");
const router = Router();

const { jwtValidate } = require("../middlewares/jwtValidation");
const { getEvents, newEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validation } = require("../validations/events")

router.use(jwtValidate)

router.get("/", getEvents);
router.post("/", validation("new"), newEvent);
router.put("/:id", validation("new"), updateEvent);
router.delete("/:id", deleteEvent)

module.exports = router;
