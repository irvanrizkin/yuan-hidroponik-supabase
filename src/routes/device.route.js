const DeviceController = require('../controllers/DeviceController');
const router = require('express').Router();

const deviceController = new DeviceController();

router.get('/', deviceController.index);

router.get('/:id', deviceController.getById);

router.post('/', deviceController.create);

router.put('/:id', deviceController.update);

router.delete('/:id', deviceController.destroy);

module.exports = router;