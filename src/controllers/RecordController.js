const databaseInstance = require("../dependencies/databaseInstance");
const TimeGroup = require("../utils/TimeGroup");

class RecordController {
  async index(req, res, next) {
    try {
      const { data, error } = await databaseInstance.findAll('records');

      if (error) throw new Error(error.message);

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
    const { time } = req.query;

    const currentTime = new Date();
    const HOUR_OPTIONS = {
      '6h': 6,
      '1d': 24,
      '1w': 168,
    };
    
    
    try {
      if (!HOUR_OPTIONS[time]) throw new Error('invalid time query');

      const hoursAgo = new Date(currentTime.getTime()  - HOUR_OPTIONS[time] * 60 * 60 * 1000).toISOString();

      const { data, error } = await databaseInstance.findWhereGreaterEqual('records', {
        deviceId,
      }, {
        createdAt: hoursAgo,
      })

      if (error) throw new Error(error.message);

      const timeGroup = new TimeGroup(data);

      if (time === '6h') {
        const results = data;
        return res.status(200).json({
          success: true,
          message: 'all records grabbed by deviceId',
          results,
        });
      }
      
      if (time === '1d') {
        const results = timeGroup.groupPerHour();
        return res.status(200).json({
          success: true,
          message: 'all records grabbed by deviceId',
          results,
        });
      }
      
      if (time === '1w') {
        const results = timeGroup.groupPerDay();
        return res.status(200).json({
          success: true,
          message: 'all records grabbed by deviceId',
          results,
        });
      }
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