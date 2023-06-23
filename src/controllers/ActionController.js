const { default: axios } = require("axios");
const mqttInstance = require("../dependencies/mqttInstance");
const Controller = require("./Controller");

class ActionController extends Controller {
  async openValve(req, res, next) {
    const { id } = req.params;

    try {
      const data = await super.getDeviceData(id);

      if (process.env.MODE === 'mqtt') {
        mqttInstance.sendMessage(`${id}/actuator`, 'true');

        return res.status(200).json({
          success: true,
          message: `ssr opened by mqtt`,
        })
      }

      const { thingerUrl, thingerBearer } = data;

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