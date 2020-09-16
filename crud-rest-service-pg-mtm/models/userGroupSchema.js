import Joi from 'joi';

const schema = Joi.object({
    group_id: Joi.string()
        .required(),

    user_id: Joi.string()
        .required()
});

export default schema;
