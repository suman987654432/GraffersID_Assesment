const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const companyController = require('../controllers/companyController');

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'company-logos',
        allowed_formats: ['jpeg', 'jpg', 'png', 'gif'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }
});

// Route
router.post('/add', upload.single('logo'), companyController.addCompany);
router.get('/', companyController.getCompanies);

module.exports = router;
