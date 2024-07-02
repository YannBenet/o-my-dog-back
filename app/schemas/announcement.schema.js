import Joi from 'joi';

export default Joi.object({
    date_start: Joi.date().greater('now').required(),
    date_end: Joi.date().greater(Joi.ref('date_start')).required(), 
    mobility: Joi.boolean().required(),
    home : Joi.boolean().required(),
    description : Joi.string().alphanum(),
    animal : Joi.array().items(Joi.string().min(2)).min(1)
})