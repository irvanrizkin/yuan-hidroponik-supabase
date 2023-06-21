const ActionController = require('../controllers/ActionController');
const router = require('express').Router();

const actionController = new ActionController();

router.get('/valve/:id', actionController.openValve);

module.exports = router;