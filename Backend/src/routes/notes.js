var express = require('express');
var router = express.Router();
router.use(require('../middlewares/withAuthentication'))
var controller = require('../controllers/noteController')
/* GET home page. */
router.get('/create', controller.createNote);

module.exports = router;