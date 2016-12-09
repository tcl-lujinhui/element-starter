<template lang="jade">
  include ../components.jade
  #pinManagement
    +breadcrumb("PIN Management")
    +form("formData")
      div(v-if="formData.pinState==1")
        +select('PIN operation:',"Operation")
      div(v-if="formData.pinState==0")
        +formItem("PIN operation:")
          div Eanbel PIN
      +input("PIN  Code","pinCode")
      +formBtn()
</template>

<script lang='coffee'>
import _config from '../../config.js'
Config = _config.pinManagement;
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