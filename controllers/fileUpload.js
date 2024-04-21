const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for the uploaded file
        cb(null, file.originalname);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Controller function for file upload
const uploadFile = (req, res) => {
    // 'file' in upload.single('file') should match the name attribute in your form input
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Multer error occurred
            return res.status(400).json({ error: 'Multer error', message: err.message });
        } else if (err) {
            // Other errors occurred
            return res.status(500).json({ error: 'Internal server error', message: err.message });
        }

        res.status(200).json({ message: 'File uploaded successfully' });
    });
};

module.exports = { uploadFile };
