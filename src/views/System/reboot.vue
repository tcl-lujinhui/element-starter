<template lang="jade">
  include ../components.jade
  #reboot
    include _menu_reboot_reset.jade
    div reboot {{$route.name}}

</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    tabs(tabs){
      this.$router.push(tabs.$el.getAttribute("name"))
    }
  }
}
</script>
<style lang="sass">
</style>