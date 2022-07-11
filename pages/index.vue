<template>
  <div>
    <QuickStats :data="sortActualData" />
    <client-only>
      <Charts :data="chartData" />
    </client-only>
  </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      actualData: {},
      chartData: {}
    }
  },
  computed: {
    sortActualData () {
      // Sort the sensors based on the order in the config
      const sortedKeys = Object.keys(this.actualData).sort((a, b) => {
        const aIndex = this.$sensors.getSensorAttr(a, 'order');
        const bIndex = this.$sensors.getSensorAttr(b, 'order');
        return aIndex - bIndex;
      });

      // Now create a new object with the sorted keys
      const sortedData = {};
      sortedKeys.forEach((key) => {
        sortedData[key] = this.actualData[key];
      });

      return sortedData;
    }
  },
  methods: {
    subscribeForMeasurementUpdates() {
      this.$websocket.stomp.connect({}, (frame) => {
        this.$websocket.stomp.subscribe('/measurements/update', ({ body }) => {
          const data = JSON.parse(body);

          // Replace the data in actualData with the values present in the message
          Object.keys(data).forEach(sensorName => {
            this.$set(this.actualData, sensorName, data[sensorName]);
          });
        });
      });
    },
    async updateChart () {
      try {
        const { data } = await this.$axios.$get('/api/measurements');

        this.$set(this, 'chartData', data);
        this.$root.$emit('chart:update');
      } catch (error) {}
    }
  },
  created () {
    if (process.server) return;
    this.subscribeForMeasurementUpdates();
    setInterval(() => {
      this.updateChart();
    }, 30000); // Update the chart every 30 seconds
  },
  async asyncData ({ $axios }) {
    try {
      const latestReq = $axios.$get('/api/measurements/latest');
      const lastHourReq = $axios.$get('/api/measurements');
      const [ actualData, chartData ] = await Promise.all([latestReq, lastHourReq]);

      return {
        actualData: actualData.data,
        chartData: chartData.data
      }
    } catch (error) {
      console.error(error);
      return {}
    }
  }
}
</script>
