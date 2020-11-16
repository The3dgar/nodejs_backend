// for intellisence
const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJwt } = require("../helpers/jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        ok: false,
        msg: "Email dont match",
      });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(400).json({
        ok: false,
        msg: "Password invalid",
      });

    const token = await generateJwt(user._id, user.name);

    res.json({
      ok: true,
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact with admin",
    });
  }
};

const newUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Email already in use",
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJwt(user._id, user.name);

    res.status(200).json({
      ok: true,
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error.toString());
    res.status(500).json({
      ok: false,
      msg: "Please contact with admin",
    });
  }
};

const renewToken = async (req = request, res = response) => {
  const { uid, name } = req.user
  const token = await generateJwt(uid, name)
  res.json({
    ok: true,
    token
  });
};

module.exports = {
  login,
  newUser,
  renewToken,
};
