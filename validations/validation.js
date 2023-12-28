const joi = require('joi')

const registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8),
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8),
})


module.exports = {registerSchema,loginSchema}