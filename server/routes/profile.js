const express = require('express');

const router = express.Router();
const profileCtrl = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');

// Attach middleware to attempt token parsing; controllers will use token id if provided
router.use(authMiddleware);

router.get('/:userId?', profileCtrl.getProfile);
router.put('/:userId?', profileCtrl.updateProfile);

module.exports = router;
