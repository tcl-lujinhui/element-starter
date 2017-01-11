<template lang="jade">
  include ../components.jade
  #dynamicRules
    +form("formData")
      +formItem("Dynamic Routing:")
        el-switch(v-model="page.operation" @change="swich()" on-text="" off-text="")
      +radio("Rip:","RipState")
      +select("Verion:","RipVerion")
      +formBtn()
</template>

<script>
import {$, _,_config} from '../../common.js';
let Config = _config.dynamicRules;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          operation: "",
          RipVerion:"",
          RipState:""
        }
        this.sdk.get("GetDynamicRouting", null, (res) => {
          this.formData = res;
          this.formData.RipVerion = res.RipVerion;
          this.formData.RipState = res.RipState;
          this.page.RipVerion = res.RipVerion;
          this.page.RipState = res.RipState;
          this.page.operation = this.formData.Operation == 1 ? true : false;
        })
      },
      swich() {
        this.formData.Operation = this.page.operation == true ? 1 : 0;
        this.formData={
          Operation: this.formData.Operation,
          RipVerion: this.page.RipVerion,
          RipState:this.page.RipState
        }
        this.sdk.post("SetDynamicRouting", this.formData, (res) => {})
      },
      update() {
          this.formData.Operation = this.page.operation == true ? 1 : 0;
          let params = {
          Operation: this.formData.Operation,
          RipVerion: this.formData.RipVerion,
          RipState:this.formData.RipState
        }
          this.sdk.post("SetDynamicRouting", params, {
            callback: this.init
          })
      }
    }
}
</script>
<style lang="sass" scoped>
.el-form{
  width: 721px;
}
span.add{
  float: right;
}
</style>