const Joi = require("joi");
const addToCartSchema = Joi.object({
  item_id: Joi.string().required(),
  user_id: Joi.string().required(),
});
module.exports = {
  addToCartSchema,
};
