export default ({ app }, inject) => {
  inject('charts', {
    "hour": {
      "type": "line"
    },
    "day": {
      "type": "bar"
    },
    "week": {
      "type": "bar"
    },
    "month": {
      "type": "bar",
      disabled: true,
    },
    "year": {
      "type": "bar",
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
