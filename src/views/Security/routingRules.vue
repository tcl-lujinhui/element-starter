<template lang="jade">
  include ../components.jade
  #routingRules
    +sideMenuPage('Settings')
      +breadcrumb("Routing Rules")
      staticRules
      dynamicRules
</template>

<script>
import staticRules from './staticRules.vue'
import dynamicRules from './dynamicRules.vue'
export default {
    components: {
      staticRules,
      dynamicRules
    }
}
</script>

<style lang="sass" scoped>

</style>