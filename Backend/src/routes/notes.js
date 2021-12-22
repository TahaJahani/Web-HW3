var express = require('express');
var router = express.Router();
router.use(require('../middlewares/withAuthentication'))
var controller = require('../controllers/noteController')

router.get('/', controller.getAllNotes);
router.post('/new', controller.createNote);
router.put('/:id', controller.editNote);
router.delete('/:id', controller.deleteNote);
router.get('/:id', controller.getNote);

module.exports = router;