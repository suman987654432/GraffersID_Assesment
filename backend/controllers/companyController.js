const Company = require('../models/Company');

//add company
const addCompany = async (req, res) => {
    try {
        const { name, location, foundedOn, city, description } = req.body;
        let logo = null;
        if (req.file) {
            logo = req.file.path.replace(/\\\\/g, "/");
        }
        const newCompany = new Company({
            name,
            location,
            foundedOn,
            city,
            description,
            logo
        });
        await newCompany.save();
        res.status(201).json({ message: 'Company added successfully', company: newCompany });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// Get all companies
const getCompanies = async (req, res) => {
    try {
        const { search, sort } = req.query;
        let matchStage = {};
        if (search) {
            matchStage = {
                $or: [
                    { city: { $regex: search, $options: 'i' } },
                    { location: { $regex: search, $options: 'i' } }
                ]
            };
        }
        let sortStage = { createdAt: -1 };
        if (sort === 'rating') {
            sortStage = { averageRating: -1 };
        } else if (sort === 'name') {
            sortStage = { name: 1 };
        } else if (sort === 'location') {
            sortStage = { location: 1 };
        }
        const companies = await Company.aggregate([
            { $match: matchStage },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'company',
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    reviewCount: { $size: '$reviews' },
                    averageRating: {
                        $cond: {
                            if: { $eq: [{ $size: '$reviews' }, 0] },
                            then: 0,
                            else: { $avg: '$reviews.rating' }
                        }
                    }
                }
            },
            {
                $project: {
                    reviews: 0
                }
            },
            { $sort: sortStage }
        ]);
        console.log("Fetched companies with stats:", companies.length);
        res.status(200).json(companies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    addCompany,
    getCompanies
}
