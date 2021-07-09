<template>
  <div class="mt-8">
    <h3 class="text-lg leading-6 font-medium text-gray-900" v-t="'lastHour'" />
    <p class="text-sm text-gray-700 mb-2" v-t="'lastHourDescription'" />
    <canvas ref="canvas" />
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

export default {
  name: "components-charts",
  data () {
    return {
      chartjs: null,
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: {},
    }
  },
  methods: {
    createChart () {
      if (process.server) return;

      this.chartjs = new Chart(this.$refs['canvas'].getContext('2d'), {
        type: 'line',
        data: {
          datasets: this.getDataForChart
        },
        options: {
          responsive: true,
          decimation: {
            enabled: true,
          },
          elements: {
            point:{
              radius: 0
            }
          },
          scales: {
            x: {
              type: 'time',
              title: {
                display: true,
                text: this.$t('time')
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 20
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'value'
              }
            }
          },
        },
      });
    }
  },
  computed: {
    getDataForChart () {
      let data = [];

      Object.keys(this.data).forEach((key) => {
        const color = this.$sensors.getSensorAttr(key, 'color');

        data.push({
          label: this.$t(`sensors.${key}.name`),
          data: this.data[key],
          backgroundColor: color,
          borderColor: color,
          lineTension: 0.2
        })
      });

      return data;
    }
  },
  mounted () {
    this.createChart();
  }
}
</script>