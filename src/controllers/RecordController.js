const databaseInstance = require("../dependencies/databaseInstance");

class RecordController {
  async index(req, res, next) {
    try {
      const { data, error } = await databaseInstance.findAll('records');

      if (error) throw new Error(error);

      return res.status(200).json({
        success: true,
        message: 'all records grabbed',
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByDevice(req, res, next) {
    const { deviceId } = req.params;

    try {
      const { data, error } = await databaseInstance.findWhere('records', {
        deviceId,
      })

      if (error) throw new Error(error);

      return res.status(200).json({
        success: true,
        message: 'all records grabbed by deviceId',
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const {
      ppm, temperature, deviceId
    } = req.body;

    try {
      const { data, error } = await databaseInstance.create('records', {
        ppm, temperature, deviceId, source: 'thinger'
      })

      if (error) throw new Error(error.message);

      return res.status(200).json({
        success: true,
        message: 'new record created',
        results: data,
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RecordController;