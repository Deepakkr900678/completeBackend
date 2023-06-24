const router = require('express').Router();
const { createProject } = require('../controllers/project');
const { getAllProject } = require('../controllers/project');
const { getUserProject } = require('../controllers/project');
const { verifyJwtToken } = require('../middleware/auth')

router.post('/project',verifyJwtToken, createProject);
router.get('/project', getAllProject);
router.get('/userProject',verifyJwtToken, getUserProject);
module.exports = router