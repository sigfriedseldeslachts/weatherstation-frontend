<template>
  <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-semibold mb-4">Weer Lovenjoel</h1>
    <Nuxt />
  </main>
</template>

<script>
import { Settings } from 'luxon';

export default {
  name: "layouts-default",
  head () {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
  beforeCreate () {
    Settings.defaultLocale = this.$i18n.locale;
  }
}
</script>

<style lang="scss">
html, body, #__nuxt, #__layout {
  @apply h-full bg-gray-50;
}
</style>