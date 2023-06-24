const router = require('express').Router();
const { getAllUsers, createUser, updateUserName, removeProfilePicture, profileDetails } = require('../controllers/user');
const { verifyJwtToken, verifyAdmin } = require('../middleware/auth')

router.get('/admin/users', verifyJwtToken, verifyAdmin, getAllUsers);
router.patch('/profile-name', verifyJwtToken, updateUserName);
router.patch('/remove-profile-picture', verifyJwtToken, removeProfilePicture);


router.get('/profile-details', verifyJwtToken, profileDetails);

router.post('/users', createUser);
module.exports = router