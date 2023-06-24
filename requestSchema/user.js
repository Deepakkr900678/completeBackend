// using joi for validation

const joi = require('joi')

const getAllUsersSchema = async (bodyObj) => {
	try {
		let schema = joi.object({
			id: joi.string().allow(null, ''),
			firstName: joi.string().required(),
			lastName: joi.string().required()
		});
		let { error, value } = schema.validate(bodyObj);
		return { error, value }
	} catch (e) {
		console.log("Error while validating getAllUsersSchema schema", e);
	}
};

const createUserSchema = joi.object({
	id: joi.string().allow(null, ''),
	firstName: joi.string().required().max(50),
	lastName: joi.string().min(1).message('welcome').max(50),
	email: joi.string().required().email({ tlds: { allow: false } }),
	mobileNumber: joi.string().required(),
	countryCode: joi.string(),
	termsAndCondition: joi.boolean().valid(true).required(),
	linkedInUser: joi.boolean().required(),
	password: joi.string()
		.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@#$%^&+=_!]{8,}$/).required()
		.messages({
			'string.pattern.base': 'Password must contain One upper case, One lower case, One Digit and One of this special characters @#$%^&+=_!'
		}),
	confirmPassword: joi.valid(joi.ref('password')).required().messages({
		'any.only': 'Confirm password should be same as password'
	})
});


const linkedInCreateUserSchema = async (bodyObj) => {
	try {
		let schema = joi.object({
			id: joi.string().allow(null, ''),
			firstName: joi.string().required().max(50),
			lastName: joi.string().min(1).max(50),
			email: joi.string().required().email({ tlds: { allow: false } }),
			mobileNumber: joi.string().required(),
			countryCode: joi.string(),
			termsAndCondition: joi.boolean().valid(true).required(),
			linkedInUser: joi.boolean().required()
		});
		let { error, value } = schema.validate(bodyObj, { abortEarly: false });
		return { error, value }
	} catch (e) {
		console.log("Error while validating getAllUsersSchema schema", e);
	}
};

const userNameUpdateSchema = joi.object({
	firstName: joi.string().required().max(50),
	lastName: joi.string().min(1).max(50)
});

const loginUser = joi.object({
	email: joi.string().required(),
	password: joi.string().required()
});



module.exports = {
	getAllUsersSchema,
	createUserSchema,
	loginUser,
	linkedInCreateUserSchema,
	userNameUpdateSchema
}