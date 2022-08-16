const router = require('express').Router();
const controller = require('./controller')
const fileUploader = require('../../configs/cloudinary.config');

router.post('/login', fileUploader.none(), controller.login);
router.post('/register', fileUploader.none(), controller.register);
router.put('/:id', fileUploader.single('file'), controller.update);

module.exports = router;