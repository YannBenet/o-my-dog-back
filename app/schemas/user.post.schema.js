import Joi from 'joi';

export default Joi.object({
  firstname: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  lastname: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } }),
  password: Joi.string().min(8).max(64)
    .pattern(new RegExp('^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\\d.*\\d)(?=.*[@$!%*?&].*[@$!%*?&]).{8,}$'))
    .message('Password must contain at least two lowercase letters, two uppercase letters, two numbers and two special characters'),
  repeatPassword: Joi.string()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': 'Passwords must be the same' }),
  city: Joi.string().min(2),
  phoneNumber: Joi.string().max(13)
    .pattern(new RegExp('^[0-9+]+$'))
    .message('Incorrect phone number'),
});