const joi = require('joi')

let createProjectSchema = joi.object({
    id: joi.string().allow(null, ''),
    projectPhase: joi.string().required(),
    evaluate: joi.array().items(joi.string().required()),
    targetAudienceLocation: joi.array().items(joi.string().required()),
    targetUserType: joi.array().items(joi.string().required()),
    targetAudience: joi.array().items(joi.string().required()),
    targetGender: joi.string().required(),
    targetLanguage: joi.string().required(),
    targetEducationLevel: joi.array().items(joi.string().required()),
    targetBudget: joi.string().required()
});

module.exports = {
	createProjectSchema
}

