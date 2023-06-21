const { default: axios } = require("axios");
const mqttInstance = require("../dependencies/mqttInstance");
const databaseInstance = require("../dependencies/databaseInstance");

class ActionController {
  async openValve(req, res, next) {
    const { id } = req.params;

    try {
      if (process.env.MODE === 'mqtt') {
        mqttInstance.sendMessage(`${id}/actuator`, 'true');

        return res.status(200).json({
          success: true,
          message: `ssr opened by mqtt`,
        })
      }

      const { data } = await databaseInstance.findByPk('devices', id);
      const { thingerUrl, thingerBearer } = data[0];

      await axios.post(thingerUrl, 'true', {
        headers: {
          Authorization: `Bearer ${thingerBearer}`,
          'Content-Type': 'application/json',
        }
      })

      return res.status(200).json({
        success: true,
        message: `ssr opened by thinger`,
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ActionController;