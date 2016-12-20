<template lang="jade">
  include ../components.jade
  #ftp
    +form("formData")
      +formItem("Ftp:")
        el-switch(v-model="page.ftpStatus" @change="update()" on-text="" off-text="")
      div(v-if="formData.FtpStatus==1")
        +formItem("Storage:")
          | USB Hard Disk
        +formItem("Anonymous:")
          el-checkbox(v-model="formData.Anonymous",:true-label.number="1",:false-label.number="0") Enable
        +radio("Rights:","AuthType")
        +formBtn()
</template>

<script>
import _config from '../../config.js'
let Config = _config.ftp;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          ftpStatus: false
        }
        this.sdk.get("GetFtpSettings", null, (res) => {
          this.formData = res;
          this.page.ftpStatus = this.formData.FtpStatus == 1 ? true : false;
        });
      },
      update() {
        this.formData.FtpStatus = this.page.ftpStatus == true ? 1 : 0;
        this.sdk.post("SetFtpSettings", this.formData, (res) => {          
          console.log(res)
        })
      }
    }
}
</script>
<style lang="sass" scoped>
</style>
