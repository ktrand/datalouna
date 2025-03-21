import Joi from 'joi';

export const purchaseValidation = {
    body: Joi.object({
        userId: Joi.number().integer().positive().required(),
        productId: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().positive().required(),
    }),
};
