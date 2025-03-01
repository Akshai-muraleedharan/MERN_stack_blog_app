    import Joi from "joi"


    const commentSchemaValid = Joi.object({
        comment:Joi.string().required().messages({
            'any.required': 'comment is required',
            'string.base': 'comment should be string',
        }),
        
        blog:Joi.string().hex().length(24),
        createdAt:Joi.date(),
        updatedAt:Joi.date(),
    })


    export default commentSchemaValid

