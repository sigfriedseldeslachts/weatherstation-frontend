<template>
    <div>
        <QuickStats :data="actualData" />
        <Charts :data="chartData" />
    </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      actualData: {},
      chartData: {},
    }
  },
  methods: {
    subscribeForMeasurementUpdates() {
      if (process.server) return;

      this.$websocket.stomp.connect({ }, (frame) => {
        this.$websocket.stomp.subscribe('/measurements/update', ({ body }) => {
          this.actualData = JSON.parse(body);
        });
      });
    }
  },
  created () {
    this.subscribeForMeasurementUpdates();
  },
  async asyncData ({ $axios }) {
    try {
      const actualReq = $axios.$get('http://localhost:8080/api/measurements/actual');
      const lastHourReq = $axios.$get('http://localhost:8080/api/measurements');
      const [ actualData, chartData ] = await Promise.all([actualReq, lastHourReq]);

      return {
        actualData,
        chartData
      }
    } catch (error) {
      console.error(error);
      return {}
    }
  }
}
</script>
