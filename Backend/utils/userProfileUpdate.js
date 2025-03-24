import Joi from "joi"


  export const userProfileJoinValid = Joi.object({
    username:Joi.string().min(4).required().lowercase().messages({
        'string.base': 'Username should be string',
        'string.min': 'Username should have at least 3 characters',
        
    }),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required().messages({
        'string.email': '"Email" must be a valid email address',        
    }),
     password:Joi.string().allow("")

  })