const { projectSchema } = require("../db/db");
const { validationError, successResponse } = require("../helper/responseTemplate");
const { createProjectSchema } = require("../requestSchema/project");
const { generateJwtResponse } = require("../helper/jwtToken");
const { paginate } = require("../helper/paginations");

// CREATING PROJECTS IN DATABASES

const createProject = async (req, res) => {
	try {
		let { error, value } = createProjectSchema.validate(req.body, { abortEarly: false });
		if (error && error.details) {
			return res.status(422).json({ errors: error.details })
		}
		const newProject = new projectSchema({
			...value,
			user: req.user._id
		})
		const project = await newProject.save();
		res.status(201).json(await successResponse('Successfully Project created', generateJwtResponse(project)))
	} catch (err) {
		if (err.name === 'ValidationError') {
			return res.status(422).json({ errors: await validationError(err) })
		}
		res.status(500).json({ error: err })
	}
}

// GETTING ALL THE PROJECTS FROM DATABASES

const getAllProject = async (req, res) => {
	try {
		const page = req.query.page || 1;
		const limit = req.query.limit || 5;

		const projects = await projectSchema.find();
		const paginatedProjects = await paginate(
			projectSchema,
			page,
			limit
		);
		res.status(201).json(await successResponse('Getting all the Projects from Databases', generateJwtResponse(paginatedProjects)))

	} catch (err) {
		if (err.name === 'ValidationError') {
			return res.status(422).json({ errors: await validationError(err) })
		}
		res.status(500).json({ error: err.message })
	}
}

// GETTING ALL THE PROJECT FOR INDIVIDUAL USERS

const getUserProject = async (req, res) => {
	try {

		const page = req.query.page || 1;
		const limit = req.query.limit || 2;

		const totalCount = await projectSchema.countDocuments({ user: req.user._id })
		const totalPages = Math.ceil(totalCount / limit);

		const paginatedProjects = await paginate(
			projectSchema,
			page,
			limit,
			'projects', // Specify the data name
			{ user: req.user._id }, // Apply filters for the user
		);

		res.status(201).json(await successResponse('Successfully Getting all Projects for this user', generateJwtResponse(paginatedProjects)));
	} catch (err) {
		if (err.name === "ValidationError") {
			return res.status(422).json({ errors: await validationError(err) });
		}
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	createProject,
	getAllProject,
	getUserProject
}









