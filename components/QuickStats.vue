<template>
  <div>
    <h3 class="flex gap-2 items-center">
      <span class="text-lg leading-6 font-medium text-gray-900" v-t="'quickstats'" />
      <span class="badge badge-green">
        <svg class="badge-dot animate-pulse" fill="currentColor" viewBox="0 0 8 8" cla>
          <circle cx="4" cy="4" r="3" />
        </svg>
        LIVE
      </span>
      <!--<span class="text-sm text-gray-600">
        <span v-t="'lastUpdate'" /> {{ humanizeTimestamp }}
      </span>-->
    </h3>
    <dl class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-4">
      <div class="flex flex-col bg-white overflow-hidden shadow rounded-lg" v-for="(value, key) in removeNonSensorData(data)" :key="key">
        <div class="px-4 py-5 sm:p-6 flex-grow">
          <div class="flex flex-col justify-center h-full">
            <dt class="flex">
              <span class="flex-1 text-sm font-medium text-gray-500 truncate" v-t="`sensors.${key}.name`" />
              <span v-if="$sensors.isSensorOverload(key, value)" v-t="'sensorOverload'" class="badge badge-red truncate animate-pulse" aria-hidden="true" />
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
              <component v-if="$sensors.getSensorAttr(key, 'moreInfo')" :is="$sensors.renderComponent(key, 'info')" />
            </dd>
          </div>
        </div>
      </div>
    </dl>
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
  methods: {
    openInfoModal (sensor) {
      this.$root.$emit('toggle-info-modal:' + sensor, true);
    },
    humanizeTimestamp(timestamp) {
      return DateTime.fromISO(timestamp).toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    }
  }
}
</script>
