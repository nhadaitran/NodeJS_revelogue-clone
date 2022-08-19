const router = require('express').Router();
const controller = require('./controller')
const fileUploader = require('../../configs/cloudinary.config');
const jwt = require('../jwt_service');

router.get('/',jwt.verifyAdmin, controller.getAll);

router.post('/login', fileUploader.none(), controller.login);
router.post('/register', fileUploader.none(), controller.register);

router.delete('/logout', controller.logout);

router.put('/:id', fileUploader.single('file'), controller.update);

module.exports = router;