const Joi = require('joi');

const createProductBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
};

const createProduct = {
  body: Joi.object().keys(createProductBody),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    imagen: Joi.string(),
    price: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateProduct = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      image: Joi.string(),
      price: Joi.number(),
    })
    .min(1),
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
};