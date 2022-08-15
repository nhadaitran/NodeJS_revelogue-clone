const router = require('express').Router();
const controller = require('./controller')
const multer = require('multer');
var upload = multer();

router.post('/login', upload.none(), controller.login);
router.post('/register', upload.none(), controller.register);

module.exports = router;