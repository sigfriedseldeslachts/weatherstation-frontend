<template>
  <div>
    <QuickStats :data="sortActualData" />

    <client-only>

      <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-8" v-t="'charts.title'" />
      <p class="text-sm text-gray-700 dark:text-gray-300 mb-2" v-t="'charts.description'" />

      <!-- Tabs -->
      <NavigationTabs :options="$charts.getChartTypes()" :custom-label="(name) => this.$t('charts.' + name)" track-by="code" class="mt-3">
        <template #default>

          <NavigationTab v-for="chart in $charts.getChartTypes()" :key="chart" v-slot="{ active }">
            <Charts :data="charts[chart]" :type="chart" :active="active" />
          </NavigationTab>

        </template>
      </NavigationTabs>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      actualData: {},
      charts: {
        hour: {},
        day: {},
        last24: {},
        week: {},
        month: {},
      }
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
        const { data } = await this.$axios.$get('/api/history/hour');

        this.$set(this.charts, 'hour', data);
        this.$root.$emit('chart:update');
      } catch (error) {}
    }
  },
  mounted () {
    this.subscribeForMeasurementUpdates();

    setInterval(() => {
      this.updateChart();
    }, 30000); // Update the chart every 30 seconds
  },
  async asyncData ({ $axios }) {
    try {
      const latest = $axios.$get('/api/measurements/actual');
      const allHistory = $axios.$get('/api/history/all');
      const [ actualData, allHistoryData ] = await Promise.all([latest, allHistory]);

      return {
        actualData: actualData.data,
        charts: {
          ...allHistoryData.data
        },
      }
    } catch (error) {
      console.error(error);
      return {}
    }
  }
}
</script>
