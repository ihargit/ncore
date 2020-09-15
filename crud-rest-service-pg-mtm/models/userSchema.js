import Joi from 'joi';

const schema = Joi.object({
    id: Joi.string()
        .required(),

    login: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{3,15}$')),

    password: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{8,30}$')),

    age: Joi.number()
        .required()
        .integer()
        .min(4)
        .max(130)
});

export default schema;
