<template>
  <div>
    <div class="tabs tabs-pills">
      <div class="tabs-mobile">
        <label for="form-lang-tabs" v-t="'tabs.select'" />
        <select id="form-lang-tabs" v-model="selectedIndex">
          <option v-for="(option, index) in options" :key="getTrackKey(option)" :value="index">{{ getLabel(option) }}</option>
        </select>
      </div>
      <div class="tabs-desktop">
        <nav class="flex space-x-4" :aria-label="$t('tabs.label')">
          <a v-for="(option, index) in options" :key="option" href="#" :aria-current="String(selectedIndex === index)" @click.prevent="selectedIndex = index">{{ getLabel(option) }}</a>
        </nav>
      </div>
    </div>

    <!-- Tabs content -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ComponentsTabs',
  props: {
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    trackBy: {
      type: String,
      required: true,
      default: null
    },
    customLabel: {
      type: Function,
      required: false,
      default: () => null
    }
  },
  data () {
    return {
      selectedIndex: 0,
      tabs: []
    };
  },
  watch: {
    selectedIndex (val) {
      this.selectTab(val);
    }
  },
  created () {
    this.tabs = this.$children;
  },
  mounted () {
    this.selectTab(0);
  },
  methods: {
    selectTab (index) {
      this.tabs.forEach((tab, tabIndex) => {
        tab.active = tabIndex === index;
      });
    },
    getTrackKey (item) {
      return this.trackBy ? item[this.trackBy] : item;
    },
    getLabel (item) {
      return this.customLabel ? this.customLabel(item) : item;
    }
  }
};
</script>

<style lang="scss">
.tabs {
  &.tabs-pills {
    @apply mb-4;

    .tabs-mobile {
      @apply sm:hidden;

      label {
        @apply block text-sm font-medium text-gray-700;
      }

      select {
        @apply block w-full focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md;
      }
    }

    .tabs-desktop {
      @apply hidden sm:block;

      nav {
        @apply flex space-x-4;

        a {
          @apply text-gray-500 hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md;

          &[aria-current="true"] {
            @apply text-white bg-green-500;
          }
        }
      }
    }

  }
}
</style>
