import Vue from 'vue';

Vue.mixin({
  methods: {
    removeNonSensorData (data) {
      if (!Array.isArray(data)) {
        // Create a clone, otherwise we will modify the actual data
        let arrClone = { ...data };

        return this.removeNonSensorDataFromObject(arrClone);
      }

      return data.map(dataObj => this.removeNonSensorDataFromObject(dataObj));
    },
    removeNonSensorDataFromObject (dataObj) {
      delete dataObj['createdTimestamp'];

      return dataObj;
    }
  }
})