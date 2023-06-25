const ActionController = require('../controllers/ActionController');
const router = require('express').Router();

const actionController = new ActionController();

router.get('/valve/:id/flow/:flow', actionController.openValve);

module.exports = router;