<template>
  <div v-show="active">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ComponentsNavigationTab',
  data () {
    return {
      active: false
    };
  }
};
</script>
