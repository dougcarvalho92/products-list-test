const express = require("express");

const { celebrate, Segments, Joi } = require("celebrate");

const UsersController = require("./controllers/UsersController");
const ProductController = require("./controllers/ProductController");
const { join } = require("./database/connection");
const multer = require("multer");
const multerConfig = require("./config/multer");
const TokenController = require("./controllers/TokenController");
const routes = express.Router();
/*user*/
routes.get(
  "/login",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  UsersController.index
);
routes.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      level: Joi.number().required(),
    }),
  }),
  UsersController.create
);

routes.get(
  "/product",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProductController.index_admin
);
routes.get(
  "/products",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProductController.index
);
routes.post(
  "/product",
  multer(multerConfig).single("file"),
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      status: Joi.number().required(),
      product_id: Joi.number(),
      image_name: Joi.string(),
    }),
  }),
  ProductController.create
);
routes.get(
  "/token",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  TokenController.index
);

routes.delete(
  "/product/:id",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  ProductController.delete
);

module.exports = routes;
