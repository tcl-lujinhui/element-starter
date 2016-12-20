<template lang="jade">
  include ../components.jade
  #TR069
    +sideMenuPage('System')
      +breadcrumb("TR069")
      +form("formData")
        h4 TR-069 client¨CConfiguration
        p Select the desired values and click "Apply/Save" to configure the TR-069 client options.
        +radio("Inform:","Inform")
        +input("Inform Interval:","InformInterval")(:disabled="formData.Inform==0",:max.number="2678400",:min.number="1")
        +input("ACS URL:","AcsUrl")(:disabled="formData.Inform==0",:maxlength.Number=125)
        +input("ACS User Name:","AcsUserName")(:disabled="formData.Inform==0",:maxlength.Number=20)
        +input("ACS Password:","AcsUserPassword")(:disabled="formData.Inform==0")(type="password",:maxlength.Number=20)
        el-form-item
          el-checkbox(v-model="formData.ConReqAuthent",:true-label.Number="1",:false-label.Number="0")(:disabled="formData.Inform==0")
          label Connection Request Authentication
        div(v-if="formData.ConReqAuthent==1")
          +input("Connection Request User Name:","ConReqUserName")(:disabled="formData.Inform==0",:maxlength.Number=20)
          +input("Connection Request Password:","ConReqUserPassword")(:disabled="formData.Inform==0",:maxlength.Number=20)
        +formBtn()
</template>

<script>
import _Config from '../../config.js'
import ElementUI from 'element-ui'
var Config = _Config.tr069
export default {
  created() {
      this.init()
    },
    methods: {

      init() {
        this.initdata(Config)
        this.sdk.get("GetClientConfiguration", null, (res) => {
          this.formData = res;
        })
      },
      requestJsonRpcIsOk(result) {
        return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
      },
      update() {
        let vm = this;
        this.sdk.post("SetClientConfiguration", this.formData, (res) => {
          if (this.requestJsonRpcIsOk(res)) {
            ElementUI.Message.success("succeed");
            vm.init()
          } else {
            ElementUI.Message.error("failed");
            vm.init()
          }
        })
      }
    }
}
</script>



<style lang="sass" scoped>
</style>