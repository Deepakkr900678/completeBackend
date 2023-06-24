const { educationSchema } = require("../db/db");
const { generateJwtResponse } = require("../helper/jwtToken");
const { validationError, successResponse } = require("../helper/responseTemplate");
const { createEducationSchema } = require("../requestSchema/education");

// CREATING EDUCATIONLEVEL IN DATABASES

const createEducation = async (req, res) => {
	try {
		let { error, value } = createEducationSchema.validate(req.body, { abortEarly: false });
		if (error && error.details) {
			return res.status(422).json({ errors: error.details })
		}
		const newEducation = new educationSchema({
			...value,
			user: req.user._id
		})
		const education = await newEducation.save();
		res.status(201).json(await successResponse('Creating Education Level in Database', generateJwtResponse(education)))
	} catch (err) {
		if (err.name === 'ValidationError') {
			return res.status(422).json({ errors: await validationError(err) })
		}
		res.status(500).json({ error: err })
	}
}

// GETTIING EDUCATIONLEVEL FROM DATABASES

const getEducation = async (req, res) => {
    try {
        const educationLevel = await educationSchema.find({ user: req.user._id });
        res.status(201).json(await successResponse('Getting Education Level from Databases', generateJwtResponse(educationLevel)))

    } catch (e) {
        if (err.name === 'ValidationError') {
            return res.status(422).json({ errors: await validationError(err) })
        }
        res.status(500).json({ error: e.message })
    }
}

module.exports = {
    getEducation,
    createEducation
}