const express=require('express');
const router=express.Router();


const { protect } = require('../middleware/auth');
const { updateProfile, changePassword } = require('../controllers/updateProfile');

router.put('/auth/profile', protect, updateProfile);
router.put('/auth/change-password', protect, changePassword);

module.exports = router;
