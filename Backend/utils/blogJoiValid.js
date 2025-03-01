    import Joi from 'joi'

    const blogSchemaValidation = Joi.object({
        title:Joi.string().required().min(4).messages({
            'string.base': 'Title should be string',
            'string.min': ' Title should have at least 4 characters',
            'any.required': 'Title is required',
        }),
        content:Joi.string().min(20).required().messages({
            'string.base': 'content should be string',
            'string.min': ' content should have at least 20 characters',
            'any.required': 'content is required',
        }),
        image:Joi.string().required().messages({
            'any.required': 'image is required',
        }),
        author:Joi.string().hex().length(24),
        createdAt:Joi.date(),
        updatedAt:Joi.date(),
        published:Joi.boolean()
    })

    export default blogSchemaValidation