const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    foundedOn: {
        type: Date
    },
    city: {
        type: String,
        trim: true
    },
    description: {
        type: String
    },
    logo: {
        type: String 
    }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
