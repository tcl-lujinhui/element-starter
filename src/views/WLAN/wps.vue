<template lang="jade">
  include ../components.jade
  #wps
    +sideMenuPage('Settings')
      +breadcrumb("WLAN Basic")
      +form("formData")
        +select("WPS Mode:","wpsMode")
        div(v-if="formData.wpsMode==0")
          +input("WPS PIN:","wpsPin")
        +formBtn()
</template>

<script lang="coffee">
import _config from '../../config.js'
Config = _config.wps
export default {
  created:()->
    this.init()
  methods:
    init:()->
      this.initdata Config
      console.log 'init'
    update:()->
      console.log 'update'
}
</script>

<style lang="sass" scoped>
</style>