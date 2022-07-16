export default ({ app }, inject) => {
  inject('charts', {
    "hour": {
      "type": "line",
      "timeUnit": "minute",
    },
    "last24": {
      "type": "line",
      "timeUnit": "hour",
    },
    "day": {
      "type": "line",
      "timeUnit": "hour",
    },
    "week": {
      "type": "line",
      "timeUnit": "day",
    },
    "month": {
      "type": "bar",
      "timeUnit": "day",
    },
    "year": {
      "type": "bar",
      "timeUnit": "month",
      disabled: true,
    },
    getChartTypes() {
      // Get all chart types which are not a function and not disabled
      return Object.keys(this).filter(key => typeof this[key] !== 'function' && !this[key].disabled);
    },
    getChartAttr(type, attr, defaultValue = null) {
      if (this[type] && this[type][attr]) {
        return this[type][attr];
      }

      return defaultValue;
    }
  });
};
