<template lang="jade">
  include ../components.jade
  #dynamicRules
    +form("formData")
      +formItem("ids_router_titleDynamicRouting:")
        el-switch(v-model="page.Operation" @change="swich()" on-text="" off-text="")
      +radio("ids_router_rip:","RipState")
      +select("ids_verion:","RipVerion")
      +formBtn()
</template>

<script>
import {$, _,_config,vuex} from '../../common.js';
let Config = _config.dynamicRules;
export default {
  created() {
      this.init()
      this.initdata(Config);
    },
    methods: {
      init() {
        this.vuex = vuex;
        this.page={
          Operation:true
        }
        this.sdk.get("GetDynamicRouting", null, (res) => {
          this.formData = res;
          this.page.Operation=res.Operation == 1 ? true : false;
        })
      },
      swich() {
        this.formData.Operation = this.page.Operation? 1 : 0;
        this.sdk.post("SetDynamicRouting", this.formData, (res) => {})
      },
      update() {
          this.formData.Operation = this.page.Operation? 1 : 0;
          this.sdk.post("SetDynamicRouting", this.formData, {
            callback: this.init
          })
      }
    }
}
</script>

<style lang="sass" scoped>
.el-form {
  width: 721px;
}

span.add {
  float: right;
}
</style>