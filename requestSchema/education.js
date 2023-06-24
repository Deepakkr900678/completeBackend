const joi = require('joi')

let createEducationSchema = joi.object({
    id: joi.string().allow(null, ''),
    name: joi.string().required()
});

module.exports = {
    createEducationSchema
}