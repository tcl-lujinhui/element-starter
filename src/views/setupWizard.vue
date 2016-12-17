<template lang="jade">
  include ./components.jade
  #setupWizard
    +sideMenuPage('Home')
      +breadcrumb("Setup Wizard")
      el-steps.margin-auto(:space="200",:active.number="page.setp_status")
        el-step(title="Internet")
        el-step(title="WLAN")
        el-step(title="WLAN Security")
        el-step(title="Confirm")
      +form("formData")(v-show="page.setp_status==0") 
        +select("Network mode:","NetselectionMode")
        +select("Connection mode:","NetworkMode")
      +form("formData")(v-show="page.setp_status==1") 
        +input("User name:","UserName")(disabled)
        +input("Current password:","CurrPassword")(type="password")
      +form("formData")(v-show="page.setp_status==2") 
        +input("User name:","UserName")(disabled)
        +input("Current password:","CurrPassword")(type="password")
      +form("formData")(v-show="page.setp_status==3") 
        +input("User name:","UserName")(disabled)
        +input("Current password:","CurrPassword")(type="password")
      +form("formData")(v-show="page.setp_status==4") 
        h1 
      div.center
        +button("Back")(@click="prev" type="primary")
        +button("Next")(@click="next" type="primary")
</template>

<script>
import _ from 'underscore';
import _config from '../config.js'
let Config = _config.setupWizard;
_.extend(Config,_config.networkSettings);
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.page={
        setp_status:0
      }
      this.initdata(Config);
    },
    update (){
      
    },
    prev(){
      if (this.page.setp_status-- <= 0){
        this.page.setp_status = 0;
      }
    },
    next() {
      if (this.page.setp_status++ > 3){
        this.page.setp_status = 4;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>