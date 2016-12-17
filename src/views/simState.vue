<template lang="jade">
  include ./components.jade
  #simState
    div.sim-state(v-if="vuex.SimInfo.SIMState=='pinReq'")
      h2.center{{vuex.SimInfo.SIMStateStr}}
      +form("formData")
        +input('Pin Code:','Pin')
        +formItem("")
          +button("Apply")(type="primary")
          +button("Cancel")(@click="reset")
    slot(v-else)
    
</template>

<script>
import _config from '../config.js'
import vuex from '../vuex.js';
let Config = _config.simState;
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.vuex = vuex
      vuex.initSimInfo();
      this.initdata(Config);
    }
  }
}
</script>

<style lang="sass" scoped>
.sim-state{
  padding:50px;
}
</style>