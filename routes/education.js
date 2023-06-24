const router = require('express').Router();
const { getEducation } = require('../controllers/education');
const { createEducation } = require('../controllers/education');
const { verifyJwtToken } = require('../middleware/auth')

router.get('/educationLevel', verifyJwtToken, getEducation);
router.post('/educationLevel', verifyJwtToken, createEducation);
module.exports = router