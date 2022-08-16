const router = require('express').Router();
const controller = require('./controller')
const fileUploader = require('../../configs/cloudinary.config');

router.get('/',controller.getAll);
router.get('/:slug',controller.getOne);
router.post('/',fileUploader.single('file'),controller.insert);
router.put('/:id',fileUploader.single('file'),controller.update);
router.delete('/:id',controller.delete);

module.exports = router;