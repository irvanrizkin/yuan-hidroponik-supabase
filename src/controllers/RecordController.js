const databaseInstance = require("../dependencies/databaseInstance");

class RecordController {
  async index(req, res, next) {
    try {
      const { data, error } = await databaseInstance.findAll('records');

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

  async getByDevice(req, res, next) {
    const { name } = req.params;

    try {
      const {
        data: deviceData,
        error: deviceError
      } = await databaseInstance.findOne('devices', {
        name
      });

      if (deviceError) throw new Error(deviceError);
      if (deviceData === null) throw new Error('device not found');

      const deviceId = deviceData.id;

      const { data, error } = await databaseInstance.findWhere('records', {
        deviceId,
      })

      if (error) throw new Error(error);

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
      ppm, temperature, name
    } = req.body;

    try {
      const {
        data: deviceData,
        error: deviceError
      } = await databaseInstance.findOne('devices', {
        name
      });

      if (deviceError) throw new Error(deviceError);
      if (deviceData === null) throw new Error('device not found');

      const deviceId = deviceData.id;

      const { data, error } = await databaseInstance.create('records', {
        ppm, temperature, deviceId, source: 'thinger'
      })

      if (error) throw new Error(error);

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