const Review = require('../models/Review');
const Company = require('../models/Company');

// Add a review
const addReview = async (req, res) => {
    try {
        const { companyId, fullName, subject, review, rating } = req.body;

        const newReview = new Review({
            company: companyId,
            fullName,
            subject,
            review,
            rating
        });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get reviews for a company
const getReviews = async (req, res) => {
    try {
        const { companyId } = req.params;
        const reviews = await Review.find({ company: companyId }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    addReview,
    getReviews
}
