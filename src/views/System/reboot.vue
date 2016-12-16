<template lang="jade">
  include ../components.jade
  #reboot
    +sideMenuPage('System')
      div reboot {{$route.name}}

</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
    
  },
  methods: {
    tabs(tabs){
      this.$router.push(tabs.$el.getAttribute("router"))
    }
  }
}
</script>
<style lang="sass" scoped>
</style>