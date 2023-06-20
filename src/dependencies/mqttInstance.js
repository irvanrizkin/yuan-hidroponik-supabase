const MqttService = require("../services/MqttService");
const databaseInstance = require("./databaseInstance");

const host = process.env.MQTT_HOST;
const username = process.env.MQTT_USERNAME;
const password = process.env.MQTT_PASSWORD;

const mqttInstance = new MqttService(host, username, password);

async function subscribeAll() {
  try {
    const { 
      data: devices,
      error: topicError
    } = await databaseInstance.findAll('devices');

    if (topicError) throw new Error(topicError.message);
    
    devices.map(device => mqttInstance.setSubscription(device.topic));
  } catch (error) {
    console.log(error);
  }
};

async function addRecord(topic, message) {
  const { ppm, temperature, deviceId, source } = JSON.parse(message.toString());
  try {
    if (topic.includes('/tdstemp')) {
      await databaseInstance.create('records', {
        ppm,
        temperature,
        deviceId,
        source,
      })
    }
  } catch (error) {
    console.log(error);
  }
}

subscribeAll();

mqttInstance.setOnMessage(addRecord);

module.exports = mqttInstance;