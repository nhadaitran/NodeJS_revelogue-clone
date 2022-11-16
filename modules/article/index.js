const router = require('express').Router();
const controller = require('./controller')
const jwt = require('../jwt_service');
const fileUploader = require('../../configs/cloudinary.config');

router.get('/', controller.getAll);
router.get('/status', jwt.verifyAdmin, controller.getStatusFalse);
router.get('/writer/:id', controller.getByWriter);
router.get('/category/:id', controller.getByCategory);
router.get('/category/slug/:slug', controller.getByCategorySlug);
router.get('/:slug', controller.getOne);

router.post('/', jwt.verifyStaff, fileUploader.single('file'), controller.insert);

router.put('/:id', jwt.verifyStaff, fileUploader.single('file'), controller.update);

router.put('/status/:id', jwt.verifyAdmin, fileUploader.none(), controller.updateStatus);

router.delete('/:id', jwt.verifyStaff, controller.delete);

module.exports = router;