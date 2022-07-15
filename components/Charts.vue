<template>
  <div v-show="hasData" class="mt-3">
    <div class="rounded-md bg-red-50 p-4" role="alert" aria-labelledby="rotate-phone-alert-title" v-if="rotatePhoneMsg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800" id="rotate-phone-alert-title" v-t="'rotatePhone.title'" />
          <p v-t="'rotatePhone.description'" class="mt-2 text-sm text-red-700" />
        </div>
      </div>
    </div>

    <canvas ref="canvas" v-show="!rotatePhoneMsg" />
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
      rotatePhoneMsg: false,
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: {},
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    createChart () {
      if (!this.hasData) return;

      this.chartjs = new Chart(this.$refs['canvas'].getContext('2d'), {
        type: this.$charts.getChartAttr(this.type, 'type', 'line'),
        data: {
          datasets: this.getDataForChart
        },
        options: {
          responsive: true,
          spanGaps: true,
          normalized: true,
          animation: false,
          decimation: {
            enabled: true,
          },
          elements: {
            point: {
              radius: 2.5
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
              },
              time: {
                isoWeekday: true,
                unit: this.$charts.getChartAttr(this.type, 'timeUnit', 'hour'), // https://www.chartjs.org/docs/latest/axes/cartesian/time.html#time-units
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
    },
    updateChart() {
      if (this.chartjs === null) {
        if (window.innerWidth < 550) {
          this.rotatePhoneMsg = true;
        } else {
          this.createChart();
          this.rotatePhoneMsg = false;
        }

        return;
      }

      if (window.innerWidth < 550) {
        this.rotatePhoneMsg = true;
        this.chartjs.destroy();
        this.chartjs = null;
        return;
      }


      this.$set(this.chartjs.data, 'datasets', this.getDataForChart);
      this.chartjs.update();
    },
  },
  computed: {
    hasData () {
      return Object.keys(this.data).length > 0;
    },
    getDataForChart () {
      let data = [];

      Object.keys(this.data).forEach((sensorName) => {
        const color = this.$sensors.getSensorAttr(sensorName, 'color');

        data.push({
          label: this.$t(`sensors.${sensorName}.name`),
          data: this.data[sensorName],
          backgroundColor: color,
          borderColor: color,
          lineTension: 0.2,
          hidden: this.$sensors.getSensorAttr(sensorName, 'defaultHidden'),
        })
      });

      return data;
    }
  },
  mounted () {
    this.updateChart();
    this.$root.$on('chart:update', this.updateChart);
  },
  created () {
    window.addEventListener("resize", this.updateChart);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateChart);
  }
}
</script>
