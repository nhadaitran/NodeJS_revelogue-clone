const router = require('express').Router();
const jwt = require('./jwt_service');
const fileUploader = require('../configs/cloudinary.config');


router.post('/', jwt.verifyStaff, fileUploader.single('file'), async (req, res) => {
    if (!req.file) {
        res.status(500).send({ error: "No image uploaded!" });
    }
    try {
        res.status(200).send({ url: req.file.path });
    } catch (err) {
        res.status(500).send({ error: { message: err.message } });
    }
});

module.exports = router;