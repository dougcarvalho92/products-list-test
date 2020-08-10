const connection = require("../database/connection");
const jwt = require("./../config/jwt");

module.exports = {
  async index(request, response) {
    const [, token] = request.headers.authorization.split(" ");

    try {
      const isAuth = await jwt.verify(token);
      if (isAuth) {
        const products = await connection("products")
          .select("*")
          .where("status", 2)
          .then((data) => {
            return data.map((e) => ({
              ...e,
              image_url: process.env.APP_URL + "/images/" + e.image_url,
            }));
          });

        return response.status(200).json(products);
      } else {
        return response.status(404).json({
          error: "Usuário não autenticado",
        });
      }
    } catch (error) {
      response.status(404).send(error);
    }
  },
  async index_admin(request, response) {
    const [, token] = request.headers.authorization.split(" ");

    try {
      const isAuth = await jwt.verify(token);
      const user = await connection("users")
        .select("level")
        .where("id", isAuth.id)
        .first();

      var products;
      if (user.level == 0) {
        products = await connection("products")
          .select("*")
          .then((data) => {
            return data.map((e) => ({
              ...e,
              image_url: process.env.APP_URL + "/images/" + e.image_url,
            }));
          });
      } else {
        products = await connection("products")
          .select("*")
          .where("user_id", isAuth.id)
          .then((data) => {
            return data.map((e) => ({
              ...e,
              image_url: process.env.APP_URL + "/images/" + e.image_url,
            }));
          });
      }

      return response.status(200).json(products);
    } catch (error) {
      response.status(404).send(error);
    }
  },
  async create(request, response) {
    const { name, description, price, status, product_id } = request.body;
    const [, token] = request.headers.authorization.split(" ");

    if (product_id) {
      try {
        const isAuth = await jwt.verify(token);
        await connection("products")
          .update({
            name,
            description,
            price,
            image_url: request.file.filename,
            status,
          })
          .where("id", product_id);

        return response.status(202).json({ id: product_id });
      } catch (error) {
        return response.status(404).send(error);
      }
    } else {
      try {
        const isAuth = await jwt.verify(token);
        const [id] = await connection("products").insert({
          name,
          user_id: isAuth.id,
          description,
          price,
          image_url: request.file.filename,
          status,
        });

        return response.status(202).json({ id });
      } catch (error) {
        return response.status(404).send(error);
      }
    }
  },
  async update(request, response) {
    const { name, description, price, status, product_id } = request.body;
    const [, token] = request.headers.authorization.split(" ");
    try {
      const isAuth = await jwt.verify(token);
      const [id] = await connection("products")
        .update({
          name,
          description,
          price,
          image_url: request.file.filename,
          status,
        })
        .where("id", product_id);

      return response.status(202).json({ id });
    } catch (error) {
      response.status(404).send(error);
    }
  },
  async delete(request, response) {
    const { id } = request.params;
    const [, token] = request.headers.authorization.split(" ");
    const isAuth = await jwt.verify(token);

    await connection("products").where("id", id).delete();

    return response.status(204).send();
  },
};
