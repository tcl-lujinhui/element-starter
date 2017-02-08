<template lang="jade">
  include ../components.jade
  #monthlyPlan
    +sideMenuPage('Settings')
      +breadcrumb("ids_monthlyPlan_pageTitle")
      sim-state
        +form("formData")
          +input("ids_monthlyPlan_dataPlan:","MonthlyPlan")
          +select("","Unit")
          +checkbox("ids_monthlyPlan_autoDisconnet:","AutoDisconnFlag")
          +text("ids_dataConsuption:","{{formData.UsedData | covertNum}}")
          +input("ids_monthlyPlan_setTimeLimit:","TimeLimitTimes","ids_mins")(:disabled="formData.TimeLimitFlag==1")
          +checkbox("ids_isTimeLimit:","TimeLimitFlag")
          +text("ids_monthlyPlan_timePass:","{{formData.UsedTimes*60 | UsedTimes}}")
          +formBtn()
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
var Config = _config.monthlyPlan
export default {
  created() {
      this.init();
      this.initdata(Config);
    },
    methods: {
      init() {
        this.vuex=vuex
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
        this.submit("formData", setForm);
      },
      reset() {
      }
    }
}
</script>



<style lang="sass" scoped> 
</style>