<template>
  <div>
    <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center mb-4">
        <h1 class="text-2xl font-semibold dark:text-white">Weer Lovenjoel</h1>
        <div class="ml-0 sm:ml-4 space-x-2 text-sm">
          <nuxt-link
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
        </div>
      </div>

      <!-- Pages -->
      <Nuxt />
    </main>

    <footer class="max-w-7xl mx-auto pt-2 pb-6 px-4 sm:px-6 lg:px-8 text-sm mt-3 text-gray-600">
      <p><span v-t="'createdBy'" /> <a href="https://sigfried.be">Sigfried</a></p>
    </footer>
  </div>
</template>

<script>
import { Settings } from 'luxon';

export default {
  name: "layouts-default",
  head () {
    return this.$nuxtI18nHead({ addSeoAttributes: true });
  },
  beforeCreate () {
    Settings.defaultLocale = this.$i18n.locale;
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(l => l.code !== this.$i18n.locale);
    },
    isDarkMode () {
      return process.client && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  },
  methods: {
    toggleDarkMode () {

    },
  }
}
</script>

<style lang="scss">
html, body, #__nuxt, #__layout {
  @apply h-full bg-gray-50 dark:bg-gray-900;
}
</style>
