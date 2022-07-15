<template>
  <div>
    <h3 class="flex gap-2 items-center">
      <span class="text-lg leading-6 font-medium text-gray-900" v-t="'quickstats'" />
      <span v-if="hasData && !lastUpdateLongTimeAgo" class="badge badge-green">
        <svg class="badge-dot animate-pulse" fill="currentColor" viewBox="0 0 8 8" cla>
          <circle cx="4" cy="4" r="3" />
        </svg>
        LIVE
      </span>
      <span v-else class="badge badge-red">OFFLINE</span>
    </h3>
    <dl class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-4">
      <div class="flex flex-col bg-white overflow-hidden shadow rounded-lg" v-for="(value, key) in removeNonSensorData(data)" :key="key">
        <div class="px-4 py-5 sm:p-6 flex-grow">
          <div class="flex flex-col justify-center h-full">
            <dt class="flex">
              <span class="flex-1 text-sm font-medium text-gray-500 truncate" v-t="`sensors.${key}.name`" />
              <span v-if="$sensors.isSensorOverload(key, value)" v-t="'sensorOverload.badge'" class="badge badge-red truncate animate-pulse" aria-hidden="true" />
            </dt>
            <dd class="flex flex-col flex-1 items-baseline">
              <div class="flex flex-1 text-2xl items-center font-semibold text-gray-900">
                <div>
                  <span v-html="$sensors.getSensorAttr(key, 'prefix')" />
                  {{ $sensors.getFormattedSensorValue(key, value) }}
                  <span v-html="$sensors.getSensorAttr(key, 'suffix')" />
                </div>
              </div>
              <div class="mt-1 text-sm gap-2">
                <button type="button" @click.prevent="openInfoModal(key)" v-if="$sensors.getSensorAttr(key, 'moreInfo')" class="block font-medium text-green-600 hover:text-green-500" v-t="'moreInfo'" />
                <span v-if="value.timestamp" class="text-xs text-gray-600">
                  <span v-t="'lastUpdate'" /> <time :datetime="value.timestamp">{{ humanizeTimestamp(value.timestamp) }}</time>
                </span>
              </div>

              <!-- Dynamic component insertion -->
              <component :is="$sensors.renderComponent(key, 'info')" />
            </dd>
          </div>
        </div>
      </div>
    </dl>

    <div class="rounded-md bg-red-50 p-4" role="alert" aria-labelledby="no-data-alert-title" v-if="!hasData">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800" id="no-data-alert-title" v-t="'noDataAlertTitle'" />
        </div>
      </div>
    </div>

    <div class="rounded-md bg-yellow-50 p-4 mt-4" v-if="hasOverloadedSensor">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="ml-3">
          <h3 v-t="'sensorOverload.title'" class="text-sm font-medium text-yellow-800" />
          <p v-t="'sensorOverload.description'" class="mt-2 text-sm text-yellow-700" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: "components-quick-stats",
  props: {
    data: {
      type: Object,
      required: true,
      default: {}
    }
  },
  computed: {
    hasData () {
      return Object.keys(this.data).length > 0;
    },
    lastUpdateLongTimeAgo () {
      if (!this.hasData) {
        return false;
      }

      // Check if the newest update of any sensor is more than 5 minutes ago
      return Object.keys(this.data).some(key => {
        return this.data[key].timestamp && DateTime.local().diff(DateTime.fromISO(this.data[key].timestamp)).as('minutes') > 5;
      });
    },
    hasOverloadedSensor () {
      return Object.keys(this.data).some(key => this.$sensors.isSensorOverload(key, this.data[key]));
    }
  },
  methods: {
    openInfoModal (sensor) {
      // If the config defines another key for the more info modal, use that one
      const changedSensorKey = this.$sensors.getSensorAttr(sensor, 'moreInfoKey');
      if (changedSensorKey) {
        sensor = changedSensorKey;
      }

      this.$root.$emit('toggle-info-modal:' + sensor, true);
    },
    humanizeTimestamp(timestamp) {
      return DateTime.fromISO(timestamp).toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    }
  }
}
</script>
