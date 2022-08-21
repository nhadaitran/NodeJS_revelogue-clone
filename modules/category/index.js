const router = require('express').Router();
const controller = require('./controller')
const jwt = require('../jwt_service');
const fileUploader = require('../../configs/cloudinary.config');

router.get('/', controller.getAll);
router.get('/:slug', controller.getOne);
router.get('/parent', controller.getParent);

router.post('/', jwt.verifyAdmin, fileUploader.none(), controller.insert);

router.put('/:id', jwt.verifyAdmin, fileUploader.none(), controller.update);

router.delete('/:id', jwt.verifyAdmin, controller.delete);

module.exports = router;