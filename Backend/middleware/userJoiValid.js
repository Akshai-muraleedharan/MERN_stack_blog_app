import Joi from "joi"


 const userValidationSchema = Joi.object({
    username:Joi.string().min(4).required().messages({
        'string.base': 'Username should be string',
        'string.min': 'Username should have at least 3 characters',
        'any.required': 'Username is required',
    }),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.email': '"Email" must be a valid email address',
        'any.required': '"Email" is required',
    }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required().messages({
            'string.pattern.base': 'Password should only contain letters  and digits (no special characters)',
            'string.min': '"Password" should be at least 6 characters long',
            'any.required': '"Password" is required',
        }),
 })


 export default userValidationSchema