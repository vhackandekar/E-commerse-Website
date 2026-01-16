const joi = require('joi');

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  role: joi.string().required(),
  address: joi.string().required(),

});
module.exports = { registerSchema };