<template>
  <slide-over close-event="toggle-info-modal:pm25">
    <template v-slot:heading>
      <span v-t="'sensors.pm.name'" />
    </template>

    <template>
      <p class="text-gray-700 text-sm" v-t="'sensors.pm.description'" />

      <section class="my-4">
        <h5 v-t="'sensors.pm.25_vs_10.title'" />
        <p class="text-gray-700 text-sm" v-t="'sensors.pm.25_vs_10.description'" />

        <div class="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg overflow-x-scroll">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" v-for="meaning in $t('sensors.pm.meanings')" :key="meaning">
                  {{ meaning}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr :class="Object.keys(pmTable).indexOf(sensorKey) % 2 ? 'bg-gray-50' : 'bg-white'" v-for="(values, sensorKey) in pmTable" :key="sensorKey">
                <th class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ sensorKey }}</th>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" v-for="value in values">
                  {{ value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section aria-describedby="pmMoreInfo">
        <h5 v-t="'moreInfo'" id="pmMoreInfo" class="mb-1" />
        <ul class="text-gray-700 text-sm list-disc list-inside">
          <li v-for="link in links" :key="link.name" :lang="link.lang"><a :href="link.url" rel="noopener nofollow" target="_blank" class="underline hover:no-underline hover:text-green-700">{{ link.name }}</a></li>
        </ul>
      </section>
    </template>
  </slide-over>
</template>

<script>
export default {
  name: "ComponentsSensorInfoParticulateMatter",
  data () {
    return {
      links: [
        { name: 'Vlaamse Milieumaatschappij', url: 'https://www.vmm.be/lucht/fijn-stof/wat-is-fijn-stof', lang: 'nl' },
        { name: 'RIVM', url: 'https://www.rivm.nl/fijn-stof', lang: 'nl' },
        { name: 'Environmental Protection Agency', url: 'https://www.epa.gov/pm-pollution/particulate-matter-pm-basics', lang: 'en' },
      ],
      pmTable: {
        'PM2.5': ['0-10', '10-20', '20-25', '25-50', '50+'],
        'PM10': ['0-20', '20-40', '40-50', '50-100', '100+'],
      }
    }
  }
};
</script>
