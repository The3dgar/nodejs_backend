const jwt = require("jsonwebtoken");

const generateJwt = (uid, name) => {
  return new Promise((res, rej) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          rej("Error in JWT generation");
        }

        res(token);
      }
    );
  });
};

module.exports = {
  generateJwt,
};
