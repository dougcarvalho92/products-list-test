const connection = require("../database/connection");
const jwt = require("./../config/jwt");

module.exports = {
  async index(request, response) {
    const [, token] = request.headers.authorization.split(" ");
    try {
      const isAuth = await jwt.verify(token);
      response.status(200).json();
    } catch (error) {
      return response.status(401).json();
    }
  },

  async create(request, response) {},
};
