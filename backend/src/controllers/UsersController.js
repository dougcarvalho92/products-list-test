const generateUniqueId = require("../utils/generateUniqueID");
const connection = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("./../config/jwt");
module.exports = {
  async index(request, response) {
    const [hashType, hash] = request.headers.authorization.split("Basic");
    const [email, password] = Buffer.from(hash, "base64").toString().split(":");
    const user = await connection("users")
      .select("*")
      .where("email", email)
      .first();

    if (user != undefined) {
      var result = bcrypt.compareSync(password, user.password, (e) => {
        response.status(502).json({ message: e });
      });

      if (result) {
        const token = jwt.sign({ id: user.id });
        user.password = undefined;
        return response.json({ user, token });
      } else {
        return response
          .status(401)
          .json({ message: "Usuário ou password incorretos" });
      }
    } else {
      return response.status(401).json({ message: "Usuário não existe" });
    }
  },
  async create(request, response) {
    const { name, email, password, level } = request.body;
    const checkUser = await connection("users")
      .select("*")
      .where("email", email)
      .first();
    if (checkUser) {
      return response.status(401).json({ message: "Usuário já existe" });
    }
    const id = generateUniqueId();
    const hash = bcrypt.hashSync(password, 8);
    const user = { id, name, email, password: hash, level };
    await connection("users").insert(user);
    const token = jwt.sign({ id: user.id });

    return response.json({ user, token });
  },
};
