const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/add', reviewController.addReview);
router.get('/:companyId', reviewController.getReviews);

module.exports = router;
