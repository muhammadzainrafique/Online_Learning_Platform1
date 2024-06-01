const router = require('express').Router();
const contactController = require('../controllers/contactController');

router.route('/new').post(contactController.saveMessage)
module.exports = router;