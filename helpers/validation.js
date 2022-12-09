const joi = require('joi')

module.exports = {
    loginValidate: (data) =>{
        const userSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(8).required()
        });
        return userSchema.validate(data);
    },
    registerValidate: (data) =>{
        const userSchema = joi.object({
            fullname: joi.string().required(),
            username: joi.string().min(8).max(32).required(),
            email: joi.string().email().required(),
            sex: joi.number().required(),
            password: joi.string().min(8).required()
        });
        return userSchema.validate(data);
    }
}