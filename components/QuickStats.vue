<template>
  <div>
    <h3 class="flex gap-2 items-center">
      <span class="text-lg leading-6 font-medium text-gray-900" v-t="'quickstats'" />
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <svg class="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3"></circle>
        </svg>
        LIVE
      </span>
      <span class="text-sm text-gray-600">
        <span v-t="'lastUpdate'" /> {{ humanizeTimestamp }}
      </span>
    </h3>
    <dl class="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
      <div class="flex flex-col bg-white overflow-hidden shadow rounded-lg" v-for="(value, key) in removeNonSensorData(data)" :key="key">
        <div class="px-4 py-5 sm:p-6 flex-grow">
          <div class="flex items-center">
            <div class="w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate" v-t="`sensors.${key}.name`" /> 
              <dd class="flex items-baseline">
                <div>
                  <div class="text-2xl font-semibold text-gray-900">
                    <span v-html="$sensors.getSensorAttr(key, 'prefix')" />
                    {{ $sensors.getFormattedSensorValue(key, value) }}
                    <span v-html="$sensors.getSensorAttr(key, 'suffix')" />
                  </div>
                </div>
              </dd>
            </div>
          </div>
        </div>
        <!--<div class="hidden sm:block bg-gray-50 px-4 py-4 sm:px-6 just" v-if="$sensors.getSensorAttr(key, 'moreInfo')">
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500" v-t="'moreInfo'" />
          </div>
        </div>-->
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
  computed: {
    humanizeTimestamp() {
      return DateTime.fromISO(this.data.createdTimestamp).toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    }
  }
}
</script>