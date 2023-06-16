const databaseInstance = require("../dependencies/databaseInstance");

class DeviceController {
  async index(req, res, next) {
    try {
      const { data, error } = await databaseInstance.findAll('devices');

      if (error) throw new Error(error);

      return res.status(200).json({
        success: true,
        message: 'all devices grabbed',
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const {
      name, topic, thingerUrl, thingerBearer
    } = req.body;

    try {
      const { data, error } = await databaseInstance.create('devices', {
        name, topic, thingerUrl, thingerBearer
      })

      if (error) throw new Error(error);

      return res.status(200).json({
        success: true,
        message: 'new device created',
        results: data,
      })
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const {
      name, topic, thingerUrl, thingerBearer
    } = req.body;

    try {
      const { data, error } = await databaseInstance.update('devices', {
        name, topic, thingerUrl, thingerBearer
      }, { id })

      if (error) throw new Error(error);

      return res.status(200).json({
        success: true,
        message: 'device updated',
        results: data,
      })
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    const { id } = req.params;

    try {
      const { error } = await databaseInstance.destroy('devices', { id });

      if (error) throw new Error(error);

      return res.status(200).json({
        success: true,
        message: 'device deleted',
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DeviceController;