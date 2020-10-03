import Joi from 'joi';

const schema = Joi.object({
    id: Joi.string()
        .required(),

    name: Joi.string()
        .required(),

    permissions: Joi.array()
        .items(
            Joi.string()
                .valid(
                    'read',
                    'write',
                    'delete',
                    'share',
                    'upload_files'
                )
                .required()
        )
        .required()
});

export default schema;
