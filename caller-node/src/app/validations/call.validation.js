const { Joi } = require('express-validation');

module.exports = {
  //GET /v1/orders
  connectValidate: {
    body: Joi.object({
      name: Joi.string().required(),
      duration: Joi.number(),
      from: Joi.string().min(13).max(13).required(),
      to: Joi.string().min(13).max(13).required(),
    }),
  },
  disconnectValidate: {
    body: Joi.object({
      requestId: Joi.string().required(),
    }),
  },
};