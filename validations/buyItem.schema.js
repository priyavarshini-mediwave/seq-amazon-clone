const Joi = require("joi");

const buyItemSchema = Joi.object({
  item_id: Joi.string().required(),
  user_id: Joi.string().required(),
  // date_of_order: Joi.date().required(),
  date_of_order: Joi.date().allow(),
  //   date_of_order: Joi.date().default(() => new Date(), "current date and time"),

  status: Joi.string().required(),
  //   item_count: Joi.number().min(1).max(10).required(),
});

module.exports = { buyItemSchema };
