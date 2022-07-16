<template>
  <div v-show="active">
    <slot :active="active" />
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
