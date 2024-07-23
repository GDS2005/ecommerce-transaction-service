const Joi = require('joi');

const createTransactionBody = {
  seller: Joi.string().required(),
  buyer: Joi.string().required(),
  product: Joi.string().required(),
  quantity: Joi.number().required(),
  status: Joi.string().required(),
};

const createTransaction = {
  body: Joi.object().keys(createTransactionBody),
};

const updateTransaction = {
  body: Joi.object()
    .keys({
      seller: Joi.string(),
      buyer: Joi.string(),
      product: Joi.string(),
      quantity: Joi.number(),
      status: Joi.string(),
    })
    .min(1),
};

module.exports = {
  createTransaction,
  updateTransaction,
};