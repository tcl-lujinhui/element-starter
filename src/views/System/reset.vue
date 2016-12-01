<template lang="jade">
  include ../components.jade
  #reset
    include _menu_reboot_reset.jade
    div reset

</template>
<script>
import VueRouter from 'vue-router'
export default {
  data () {
    return {
    }
  },
  methods: {
    tabs(tabs){
      this.$router.push(tabs.$el.name)
    }
  }
}
</script>
<style lang="sass">
</style>