export default ({ app }, inject) => {
  inject('sensors', {
    "temperature": {
      "prefix": "",
      "suffix": "°C",
      "color": "#F59E0B",
      "order": 0,
    },
    "windspeed": {
      "prefix": "~",
      "suffix": "m/s",
      "color": "#DC2626",
      "order": 2,
    },
    "illuminance": {
      "prefix": "",
      "suffix": "Lx",
      "moreInfo": true,
      "info": require('~/components/SensorInfo/Illuminance.vue').default,
      "maxValue": Math.pow(2, 16),
      "minValue": 0,
      "color": "#FBBF24",
      "order": 4,
      formatter (value) {
        if (value >= this.maxValue) {
          return ">" + value;
        }

        return value;
      },
    },
    "humidity": {
      "prefix": "",
      "suffix": "%",
      "color": "#3B82F6",
      "order": 1,
    },
    "pm25": {
      "prefix": "",
      "suffix": "µg/m<sup>3</sup>",
      "page": "",
      "color": "#1F2937",
      "order": 5,
    },
    "pm10": {
      "prefix": "",
      "suffix": "µg/m<sup>3</sup>",
      "page": "",
      "color": "#6B7280",
      "order": 6,
    },
    "pressure": {
      "prefix": "",
      "suffix": "hPa",
      "color": "#7C3AED",
      "order": 3,
      "defaultHidden": true,
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
      if (typeof value === 'object' && value.hasOwnProperty('value')) {
        value = value.value;
      }

      if (!this.sensorExists(sensor) || typeof this[sensor].formatter === 'undefined') {
        return value;
      }

      return this[sensor].formatter(value);
    },

    /**
     * Checks if the value of the sensor exceeds the maximum value
     * @return true if overload, otherwise false
     */
    isSensorOverload(sensor, value) {
      if (!this.attributeExists(sensor, 'maxValue')) return false;

      if (typeof value === 'object' && value.hasOwnProperty('value')) {
        value = value.value;
      }

      return value >= this[sensor]['maxValue'];
    },

    renderComponent (sensor, component) {
      if (!this.attributeExists(sensor, component)) return "";

      return this[sensor][component];
    },

    /**
     * Check if sensor exists
     * @return true if exists otherwise false
     */
    sensorExists(sensor) {
      return typeof this[sensor] !== 'undefined';
    },

    /**
     * Checks if the attribute exists on the sensor
     * @param {String} sensor
     * @param {String} attr
     * @returns true if it exists, otherwise false, and also false if sensor does not exist
     */
    attributeExists(sensor, attr) {
      return this.sensorExists(sensor) && typeof this[sensor][attr] !== 'undefined';
    }
  });
}
