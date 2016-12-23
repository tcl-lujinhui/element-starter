<template lang="jade">
  include ../components.jade
  #monthlyPlan
    +sideMenuPage('Settings')
      +breadcrumb("Monthly Plan")
      +form("formData")
        +input("Monthly Data Plan:","MonthlyPlan","MB")
        +checkbox("Auto Disconnected:","AutoDisconnFlag")
        +text1("Reset Data Consumption:","UsedData")
        +input("Set Time Limit:","TimeLimitTimes","Mins")
        +checkbox("Enable or Disable Time Limit:","TimeLimitFlag")
        +text("Time Passed:","{{formData.UsedTimes}}")
        +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.monthlyPlan
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config)
      this.sdk.get("GetUsageSettings",null,(res)=>{
        this.formData = res;
      })
    },
    update (){
      this.sdk.post("SetUsageSettings",this.formData,(res)=>{
         this.reset()
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>