<template lang="jade">
  include ../components.jade
  #monthlyPlan
    +sideMenuPage('Settings')
      +breadcrumb("ids_monthlyPlan_pageTitle")
      +form("formData")
        +input("ids_monthlyPlan_dataPlan:","MonthlyPlan", "MB")
        +checkbox("ids_monthlyPlan_autoDisconnet:","AutoDisconnFlag")
        +text("Data Consumption:","{{formData.UsedData | covertNum}}")
        +input("ids_monthlyPlan_setTimeLimit:","TimeLimitTimes","Mins")(:disabled="formData.TimeLimitFlag==1")
        +checkbox("Enable or Disable Time Limit:","TimeLimitFlag")
        +text("ids_monthlyPlan_timePass:","{{formData.UsedTimes*60 | UsedTimes}}")
        +formBtn()
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
var Config = _config.monthlyPlan
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex=vuex
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
          let params = {
            "BillingDay": Number(this.formData.BillingDay),
            "MonthlyPlan": Number(this.formData.MonthlyPlan),
            "UsedData": Number(this.formData.UsedData),
            "TimeLimitFlag": Number(this.formData.TimeLimitFlag),
            "TimeLimitTimes": Number(this.formData.TimeLimitTimes),
            "UsedTimes": Number(this.formData.UsedTimes),
            "AutoDisconnFlag": Number(this.formData.AutoDisconnFlag),
            "Unit": Number(this.formData.Unit)
          }
          this.sdk.post("SetUsageSettings", params, {
            callback: this.init
          })
        }
        this.submit("formData", setForm);
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