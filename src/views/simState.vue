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

    div.sim-state(v-if="vuex.SimInfo.SIMState=='pukReq'")
      h2.center{{vuex.SimInfo.SIMStateStr}}
      +form("formData")
        +input("PUK","Puk")
        +input('Pin Code:','Pin')
        +input('Confirm Pin:','ConfirmPin')
        +formItem("")
          +button("Apply")(type="primary")
          +button("Cancel")(@click="reset")

    div.sim-state(v-if="vuex.SimInfo.SIMState=='simLock'")
      h2.center{{vuex.SimInfo.SIMStateStr}}
      +form("formData")
        +input('SIM LockCode:','SIMLockCode')
        +formItem("")
          +button("Apply")(type="primary")
          +button("Cancel")(@click="reset")

    slot(v-if="vuex.SimInfo.SIMState=='ready'")
    div(v-if="vuex.SimInfo.SIMState=='pinReq'&vuex.SimInfo.SIMState=='pukReq'&vuex.SimInfo.SIMState=='simLock'&vuex.SimInfo.SIMState=='ready'")
      h2.center{{vuex.SimInfo.SIMStateStr}}
    
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
    },
    UnlockPin (){
      this.submit("formData",()=>{
        var vm = this;
        this.sdk.post("UnlockPin", this.formData, (res) => {
          vm.init()
        })
      })
    },
    UnlockPuk (){
      this.submit("formData",()=>{
        var vm = this;
        this.sdk.post("UnlockPuk", this.formData, (res) => {
          vm.init()
        })
      })
    },
    UnlockSinLock (){
      this.submit("formData",()=>{
        var vm = this;
        this.sdk.post("UnlockSimlock", this.formData, (res) => {
          vm.init()
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.sim-state{
  padding:50px;
}
</style>