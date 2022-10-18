const router = require('express').Router();
const controller = require('./controller')
const jwt = require('../jwt_service');
const fileUploader = require('../../configs/cloudinary.config');

router.get('/', controller.getAll);
router.get('/:id', controller.getByWriter);
router.get('/category/:id', controller.getByCategory);
router.get('/:slug', controller.getOne);

router.post('/', jwt.verifyStaff, fileUploader.single('file'), controller.insert);

router.put('/:id', jwt.verifyStaff, fileUploader.single('file'), controller.update);

router.delete('/:id', jwt.verifyStaff, controller.delete);

module.exports = router;