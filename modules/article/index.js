const router = require('express').Router();
const controller = require('./controller')
const multer = require('multer');
var upload = multer();

router.get('/',controller.getAll);
router.get('/:id',controller.getOne);
router.post('/',upload.none(),controller.insert);
router.put('/:id',upload.none(),controller.update);
router.delete('/:id',controller.delete);

module.exports = router;