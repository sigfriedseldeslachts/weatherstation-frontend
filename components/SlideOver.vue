<template>
  <div :class="{ 'fixed inset-0 overflow-hidden': open, 'z-20': true }">
    <div :class="{ 'absolute inset-0 overflow-hidden': open }">
      <transition enter-active-class="ease-in-out duration-500" enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="ease-in-out duration-500" leave-class="opacity-100" leave-to-class="opacity-0">
        <div @click="closeModal()" v-if="open" class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
      </transition>

      <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16" aria-labelledby="slide-over-heading">
        <transition enter-active-class="transform transition ease-in-out duration-500 sm:duration-700" enter-class="translate-x-full" enter-to-class="translate-x-0" leave-active-class="transform transition ease-in-out duration-500 sm:duration-700" leave-class="translate-x-0" leave-to-class="translate-x-full">
          <div class="w-screen max-w-2xl" v-if="open">
            <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
              <div class="px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 id="slide-over-heading" class="text-lg font-medium text-gray-900">
                    <slot name="heading" />
                  </h2>
                  <div class="ml-3 h-7 flex items-center">
                    <button @click="closeModal()" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <span class="sr-only">Close panel</span>
                      <svg class="h-6 w-6" x-description="Heroicon name: x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-6 relative flex-1 px-4 sm:px-6">
                <slot />
              </div>
            </div>
          </div>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "components-slideover",
  data () {
    return {
      open: false,
    }
  },
  props: {
    closeEvent: {
      type: String,
      required: true,
      default: 'toggle-modal:',
    }
  },
  methods: {
    closeModal () {
      this.open = false;
    },
    toggleModal(bool) {
      // If bool is given then use that value, otherwise just set the inverse
      if (typeof bool === 'boolean') {
        this.open = bool;
      } else {
        this.open = !this.open;
      }
    }
  },
  mounted () {
    this.$root.$on(this.closeEvent, this.toggleModal);
  }
}
</script>
