const nanoid = require("../config/nanoid");
const databaseInstance = require("../dependencies/databaseInstance");
const Controller = require("./Controller");

class DeviceController extends Controller {
  async index(req, res, next) {
    try {
      const { data, error } = await databaseInstance.findAll('devices');

      if (error) throw new Error(error.message);

      return res.status(200).json({
        success: true,
        message: 'all devices grabbed',
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;

    try {
      const { data, error } = await databaseInstance.findByPk('devices', id);

      if (error) throw new Error(error.message);

      return res.status(200).json({
        success: true,
        message: 'one device grabbed',
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const {
      name, thingerUrl, thingerBearer
    } = req.body;

    try {
      const id = nanoid();

      const { data, error } = await databaseInstance.create('devices', {
        id, name, thingerUrl, thingerBearer
      })

      if (error) throw new Error(error.message);

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
      name, thingerUrl, thingerBearer
    } = req.body;

    try {
      await super.getDeviceData(id);

      const { data, error } = await databaseInstance.update('devices', {
        name, thingerUrl, thingerBearer
      }, { id })

      if (error) throw new Error(error.message);

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
      await super.getDeviceData(id);

      const { error } = await databaseInstance.destroy('devices', { id });

      if (error) throw new Error(error.message);

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