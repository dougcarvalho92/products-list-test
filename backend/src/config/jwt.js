const jwt = require("jsonwebtoken");
const authConfig = require("./../config/auth");

module.exports = {
  sign: (payload) => {
    return jwt.sign(payload, authConfig.secret, {
      expiresIn: 86400,
    });
  },
  verify: (token) => jwt.verify(token, authConfig.secret),
};
