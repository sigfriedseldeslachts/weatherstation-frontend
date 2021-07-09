<template>
  <slide-over close-event="toggle-info-modal:illuminance">
    <template v-slot:heading>
      <span v-t="'sensors.illuminance.name'" />
    </template>

    <template>
      <p class="text-gray-700" v-t="'sensors.illuminance.description'" />

      <div class="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Omgeving
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lux
              </th>
            </tr>
          </thead>
          <tbody>
            <tr :class="getLuxMappingKeys.indexOf(key) % 2 ? 'bg-gray-50' : 'bg-white'" v-for="(value, key) in luxMapping" :key="key">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" v-t="'sensors.illuminance.table.' + key" />
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </slide-over>
</template>

<script>
export default {
  data () {
    return {
      luxMapping: {
        "direct_sunlight": "32 000 - 100 000",
        "ambient_daylight": "10 000 - 25 000",
        "overcast_daylight": "1000 - 2000",
        "sunset_sunrise": "~400",
        "moonlight": "<1",
        "night": "<0.01",
      }
    }
  },
  computed: {
    getLuxMappingKeys() {
      return Object.keys(this.luxMapping);
    }
  }
};
</script>