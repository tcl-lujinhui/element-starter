<template lang="jade">
  include ../components.jade
  #samba
    +form("formData")
      +formItem("Samba:")
        el-switch(v-model="page.sambaStatus" @change="update()" on-text="" off-text="")
      div(v-if="formData.SambaStatus==1")
        +formItem("Storage:")
          | USB Hard Disk
        +formItem("Anonymous:")
          el-checkbox(v-model="formData.Anonymous",:true-label.number="1",:false-label.number="0") Enable
        +radio("Rights:","AuthType")
        +formBtn()
</template>

<script>
import _config from '../../config.js'
let Config = _config.samba;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          sambaStatus: false
        }
        this.sdk.get("GetSambaSettings", null, (res) => {
          this.formData = res;
          this.page.sambaStatus = this.formData.SambaStatus == 1 ? true : false;
        });
      },
      update() {
        this.formData.SambaStatus = this.page.sambaStatus == true ? 1 : 0;
        this.sdk.post("SetSambaSettings", this.formData, (res) => {          
          console.log(res)
        })
      }
    }
}
</script>
<style lang="sass" scoped>
</style>
