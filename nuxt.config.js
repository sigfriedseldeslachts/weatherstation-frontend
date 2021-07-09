export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'weatherstation-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/mixins.js',
    '~/plugins/sensors.js',
    { src: '~/plugins/SockJS.js', mode: 'client', }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/nuxt-i18n
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'nl',
            iso6392b: 'NLD',
            iso: 'nl-BE',
            file: 'nl.js',
            name: 'Nederlands',
            isCatchallLocale: true
          },
          {
            code: 'en',
            iso6392b: 'ENG',
            iso: 'en-GB',
            file: 'en.js',
            name: 'English'
          }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'nl',
        seo: false
      }
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    host: '0.0.0.0'
  }
}
