import Joi from "joi";

export const ORDER_INSERT = Joi.object({
  name: Joi.string().required(),
  itemCount: Joi.number().required(),
  transaction: Joi.string().required(),
});
