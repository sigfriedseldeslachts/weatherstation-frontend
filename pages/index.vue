<template>
    <div>
        <QuickStats :data="actualData" />
    </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      actualData: {},
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
      const { data } = await $axios.get('http://localhost:8080/api/measurements/actual');

      return {
        actualData: data,
      }
    } catch (error) {
      console.error(error);
      return {}
    }
  }
}
</script>
