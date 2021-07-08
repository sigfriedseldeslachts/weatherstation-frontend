export default ({ app }, inject) => {
  inject('sensors', {
    "temperature": {
      "prefix": "",
      "suffix": "°C",
    },
    "windspeed": {
      "prefix": "~",
      "suffix": "m/s",
    },
    "illuminance": {
      "prefix": "",
      "suffix": "Lx",
    },
    "humidity": {
      "prefix": "",
      "suffix": "%",
    },
    "pm2_5": {
      "prefix": "",
      "suffix": "µg/m<sup>3</sup>",
      "moreInfo": true,
      "page": "",
    },
    "pm10": {
      "prefix": "",
      "suffix": "µg/m<sup>3</sup>",
      "moreInfo": true,
      "page": "",
    },
    "pressure": {
      "prefix": "",
      "suffix": "hPa",
      formatter: (value) => {
        // Given value is in Pascal, format it to hPa
        return Math.round(value / 100);
      }
    },

    /**
     * @return attribute variable, empty if not found
     */
     getSensorAttr(sensor, attr) {
      if (!this.sensorExists(sensor)) {
        return "";
      }

      return this[sensor][attr];
    },
    /**
     * @return formatted value
     */
    getFormattedSensorValue(sensor, value) {
      if (!this.sensorExists(sensor) || typeof this[sensor].formatter === 'undefined') {
        return value;
      }

      return this[sensor].formatter(value);
    },
    /**
     * Check if sensor exists
     * @return true if exists otherwise false
     */
    sensorExists(sensor) {
      return this[sensor] !== null;
    }
  });
}