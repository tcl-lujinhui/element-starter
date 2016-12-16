<template lang="jade">
  include ../components.jade
  #reset
    +sideMenuPage('System')
      div reset {{$route.name}}

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
      this.$router.push(tabs.$el.getAttribute("router"))
    }
  }
}
</script>
<style lang="sass" scoped>
</style>