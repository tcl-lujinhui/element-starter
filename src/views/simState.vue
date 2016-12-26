<template lang="jade">
  include ./components.jade
  #simState
    div.sim-state(v-if="vuex.SimInfo.SIMState=='pinReq'")
      h2.center {{vuex.SimInfo.SIMStateStr|res}}
      +form("formData")
        +input('Pin Code:','Pin')(type="password")
        +formItem("")
          +button("Apply")(type="primary" @click="UnlockPin")
          +button("Cancel")(@click="reset")

    div.sim-state(v-if="vuex.SimInfo.SIMState=='pukReq'")
      h2.center{{vuex.SimInfo.SIMStateStr|res}}
      +form("formData")
        +input("PUK","Puk")(type="password")
        +input('Pin Code:','Pin')(type="password")
        +input('Confirm Pin:','ConfirmPin')(type="password")
        +formItem("")
          +button("Apply")(type="primary" @click="UnlockPuk")
          +button("Cancel")(@click="reset")

    div.sim-state(v-if="vuex.SimInfo.SIMState=='simLock'")
      h2.center{{vuex.SimInfo.SIMStateStr |res}}
      +form("formData")
        +input('SIM LockCode:','SIMLockCode')(type="password")
        +formItem("")
          +button("Apply")(type="primary" @click="UnlockSinLock")
          +button("Cancel")(@click="reset")

    slot(v-if="vuex.SimInfo.SIMState=='ready'")

    div(v-if="vuex.SimInfo.SIMState!='pinReq'&vuex.SimInfo.SIMState!='pukReq'&vuex.SimInfo.SIMState!='simLock'&vuex.SimInfo.SIMState!='ready'")
      h2.center{{vuex.SimInfo.SIMStateStr|res}}
    
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
          setTimeout(function(){
            vm.init()
          },3000)
        })
      })
    },
    UnlockPuk (){
      this.submit("formData",()=>{
        var vm = this;
        this.sdk.post("UnlockPuk", this.formData, (res) => {
          setTimeout(function(){
            vm.init()
          },3000)
        })
      })
    },
    UnlockSinLock (){
      this.submit("formData",()=>{
        var vm = this;
        this.sdk.post("UnlockSimlock", this.formData, (res) => {
          setTimeout(function(){
            vm.init()
          },3000)
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