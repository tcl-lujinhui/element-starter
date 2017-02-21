<template lang="jade">
  include ./components.jade
  #simState
    div(v-loading.body="page.fullscreenLoading")
    div.sim-state(v-if="vuex.SimInfo.SIMState=='pinReq'")
      h2.center {{vuex.SimInfo.SIMStateStr|res}}
      +form("formData")
        +input('ids_sim_pinCode:','Pin')(type="password")
        +formItem("")
          div.el-text  {{vuex.res.ids_sim_remainTime}}: {{vuex.SimInfo.PinRemainingTimes}}
        +formItem("")
          +button("ids_apply")(type="primary" @click="UnlockPin")
          +button("ids_cancel")(@click="$refs.formData.resetFields()")

    div.sim-state(v-if="vuex.SimInfo.SIMState=='pukReq'")
      h2.center {{vuex.SimInfo.SIMStateStr|res}}
      +form("formData")
        +input("ids_sim_pukCode","Puk")(type="password")
        +input('ids_sim_pinCode:','Pin')(type="password")
        +input('ids_sim_confirmPINCode:','ConfirmPin')(type="password")
        +formItem("")
          div.el-text  {{vuex.res.ids_sim_remainTime}}: {{vuex.SimInfo.PukRemainingTimes}}
        +formItem("")
          +button("ids_apply")(type="primary" @click="UnlockPuk")
          +button("ids_cancel")(@click="$refs.formData.resetFields()")

    div.sim-state(v-if="vuex.SimInfo.SIMState=='simLock'")
      h2.center {{vuex.SimInfo.SIMStateStr |res}}
      +form("formData")
        +input('ids_sim_simlockCode:','SIMLockCode')(type="password")
        +formItem("")
          +button("ids_apply")(type="primary" @click="UnlockSinLock")
          +button("ids_cancel")(@click="$refs.formData.resetFields()")

    slot(v-if="vuex.SimInfo.SIMState=='ready'")

    div(v-if="vuex.SimInfo.SIMState!='pinReq'&vuex.SimInfo.SIMState!='pukReq'&vuex.SimInfo.SIMState!='simLock'&vuex.SimInfo.SIMState!='ready'")
      h2.center {{vuex.SimInfo.SIMStateStr|res}}

    
</template>

<script>
import _config from '../config.js'
import vuex from '../vuex.js';
let Config = _config.simState;
export default {
  created () {
    this.initdata(Config);
    this.init()
  },
  methods: {
    init (){
      this.vuex = vuex;
      this.page={
        fullscreenLoading:false
      }
      vuex.initSimInfo();
    },
    UnlockPin (){
      this.submit("formData",()=>{
        var vm = this;
        let result={
          callback(){
            vm.page.fullscreenLoading=true;
            vm.$refs.formData.resetFields()
            setTimeout(function(){
              vm.page.fullscreenLoading=false;
              vm.init()
            },3000)
          }
        }
        this.sdk.post("UnlockPin", vm.formData, result)
      })
    },
    UnlockPuk (){
      this.submit("formData",()=>{
        var vm = this;
        let result={
          callback(){
            vm.page.fullscreenLoading=true;
            vm.$refs.formData.resetFields()
            setTimeout(function(){
              vm.page.fullscreenLoading=false;
              vm.init()
            },3000)
          }
        }
        this.sdk.post("UnlockPuk", vm.formData, result)
      })
    },
    UnlockSinLock (){
      this.submit("formData",()=>{
        var vm = this;
        let result={
          callback(){
            vm.page.fullscreenLoading=true;
            vm.$refs.formData.resetFields()
            setTimeout(function(){
              vm.page.fullscreenLoading=false;
              vm.init()
            },3000)
          }
        }
        this.sdk.post("UnlockSimlock", vm.formData, result)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>