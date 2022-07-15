<template>
  <div>
    <QuickStats :data="sortActualData" />

    <client-only>

      <h3 class="text-lg leading-6 font-medium text-gray-900 mt-8" v-t="'charts.title'" />
      <p class="text-sm text-gray-700 mb-2" v-t="'charts.description'" />

      <!-- Tabs -->
      <NavigationTabs :options="$charts.getChartTypes()" :custom-label="(name) => this.$t('charts.' + name)" track-by="code" class="mt-3">
        <template #default>

          <NavigationTab v-for="chart in $charts.getChartTypes()" :key="chart">
            <Charts :data="charts[chart]" :type="chart" />
          </NavigationTab>

        </template>
      </NavigationTabs>
    </client-only>

    <footer class="text-sm mt-3 text-gray-600">
      <p><span v-t="'createdBy'" /> <a href="https://sigfried.be" class="underline hover:no-underline text-green-700">Sigfried</a></p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      actualData: {},
      charts: {
        hour: null,
        day: null,
        week: null,
        month: null,
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
      const latest = $axios.$get('/api/measurements/latest');
      const lastHour = $axios.$get('/api/measurements');
      const historyDay = $axios.$get('/api/history/day');
      const historyWeek = $axios.$get('/api/history/week');
      const historyMonth = $axios.$get('/api/history/month');
      const [ actualData, lastHourData, historyDayData, historyWeekData, historyMonthData ] = await Promise.all([latest, lastHour, historyDay, historyWeek, historyMonth]);

      return {
        actualData: actualData.data,
        charts: {
          hour: lastHourData.data,
          day: historyDayData.data,
          week: historyWeekData.data,
          month: historyMonthData.data,
        },
      }
    } catch (error) {
      console.error(error);
      return {}
    }
  }
}
</script>
