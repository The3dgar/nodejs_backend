// for intellisence
const { request, response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req = request, res = response) => {
  const events = await Event.find().populate("user", "name");
  res.json({
    ok: true,
    events,
  });
};

const newEvent = async (req = request, res = response) => {
  try {
    const newEvent = new Event({
      ...req.body,
      user: req.user.uid,
    });
    const eventDB = await newEvent.save();

    res.json({
      ok: true,
      event: eventDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact with admin",
    });
  }
  console.log(req.body);
};

const updateEvent = async (req = request, res = response) => {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const event = await Event.findById(id);

    if (!event)
      return res.status(404).json({
        ok: false,
        msg: "EventId dont match",
      });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "UserId dont match with Event userId",
      });

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updateEvent = await Event.findByIdAndUpdate(
      id,
      { $set: newEvent },
      { new: true }
    );

    res.json({
      ok: true,
      event: updateEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact with admin",
    });
  }
};

const deleteEvent = async (req = request, res = response) => {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const event = await Event.findById(id);

    if (!event)
      return res.status(404).json({
        ok: false,
        msg: "EventId dont match",
      });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "UserId dont match with Event userId",
      });
    await Event.findByIdAndDelete(id)

    res.json({
      ok: true
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact with admin",
    });
  }
};

module.exports = {
  getEvents,
  newEvent,
  updateEvent,
  deleteEvent,
};
