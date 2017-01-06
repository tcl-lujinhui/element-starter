<template lang="jade">
  include ../components.jade
  #monthlyPlan
    +sideMenuPage('Settings')
      +breadcrumb("Monthly Plan")
      +form("formData")
        +input("Monthly Data Plan:","MonthlyPlan", "MB")
        +checkbox("Auto Disconnected:","AutoDisconnFlag")
        +text("Data Consumption:","{{formData.UsedData | covertNum}}")
          +button('Reset')(aclick = "reset" style="margin-left:-170px;color: #fff;background-color: #20a0ff;border-color: #20a0ff")
        +input("Set Time Limit:","TimeLimitTimes","Mins")(:disabled="formData.TimeLimitFlag==1")
        +checkbox("Enable or Disable Time Limit:","TimeLimitFlag")
        +text("Time Passed:","{{formData.UsedTimes*60 | UsedTimes}}")
        +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.monthlyPlan
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config)
        this.sdk.get("GetUsageSettings", null, (res) => {
          this.formData = res;
        })
      },
      init_Record() {
        this.initdata(Config)
        this.sdk.get("GetUsageRecord", null, (res) => {
          this.formData = res;
        })
      },
      update() {
        let setForm = () => {
          this.sdk.post("SetUsageSettings", this.formData, {
            callback: this.init
          })
        }
        this.submit("formData", setForm); //formData为表单名
      },
      reset() {
        let setForm = () => {
          this.sdk.post("SetUsageRecordClear", this.formData, {
            callback: this.init_Record
          })
        }
        this.submit("formData", setForm); 
      }
    }
}
</script>



<style lang="sass" scoped>
</style>