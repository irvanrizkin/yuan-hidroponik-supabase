const databaseInstance = require("../dependencies/databaseInstance");

class Controller {
  async getDeviceData(id) {
    const { data, error } = await databaseInstance.findByPk('devices', id);
    if (!data) throw new Error('device not found');
    if (error) throw new Error(error.message);

    return data;
  }
}

module.exports = Controller;