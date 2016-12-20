<template lang="jade">
  include ../components.jade
  #pinManagement
    +sideMenuPage('Settings')
      +breadcrumb("PIN Management")
      sim-state
        +form("formData")
          div(v-if="vuex.SimInfo.PinState==2")
            div(v-if="formData.Operation==0")
              +select("PIN operation:","Operation")
              +input("PIN  Code","Pin")(type="password")
              +text("Remaining Attempt(s):","{{vuex.SimInfo.PinRemainingTimes}}")
              +formItem("")
                +button("Apply")(type="primary" @click="ChangePinState")
                +button("Cancel")(@click="reset")
            div(v-show="formData.Operation==1")
              +select("PIN Code Operation:","Operation")
              +input("Old PIN Code :","CurrentPin")(type="password")
              +input("New PIN Code :","NewPin")(type="password")
              +input("Confirm PIN Code :","ConfirmPin")(type="password")
              +formItem("")
                +button("Apply")(type="primary" @click="ChangePinCode")
                +button("Cancel")(@click="reset")
          div(v-if="vuex.SimInfo.PinState==3")
            +formItem("PIN operation:")
              div Enable PIN
            +input("PIN  Code","Pin")(type="password")
            +text("Remaining Attempt(s):","{{vuex.SimInfo.PinRemainingTimes}}")
            el-form-item
              el-checkbox(v-model="page.AutoValidatePinStatesstr",:true-label.number="1",:false-label.number="0")
              label Auto Validation
            +formItem("")
              +button("Apply")(type="primary" @click="ChangePinState")
              +button("Cancel")(@click="reset")
</template>

<script>
import _Config from '../../config.js'
import vuex from '../../vuex.js';
import ElementUI from 'element-ui'
var Config = _Config.pinManagement
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config)
        this.vuex = vuex
        vuex.initSimInfo()
        this.page = {
          AutoValidatePinStates: {},
          AutoValidatePinStatesstr: false,
        }
        this.sdk.get("GetAutoValidatePinState", null, (res) => {
          this.page.AutoValidatePinStates = res;
          this.page.AutoValidatePinStatesstr = this.page.AutoValidatePinStates.State == 1 ? true : false;
        })
      },
      requestJsonRpcIsOk(result) {
        return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
      },
      ChangePinState() {
        if (vuex.SimInfo.PinState == 2) {
          let postData = {
            Pin: this.formData.Pin,
            State: this.formData.Operation,
          }
          let vm = this;
          this.sdk.post("ChangePinState", postData, (res) => {
            if (this.requestJsonRpcIsOk(res)) {
              ElementUI.Message.success("succeed");
              vm.init()
            } else {
              ElementUI.Message.error("failed");
              vm.init()
            }
          })
        } else if (vuex.SimInfo.PinState == 3) {
          let postData = {
            Pin: this.formData.Pin,
            State: 1,
          }
          let postData1 = {
            Pin: this.formData.Pin,
            State: this.page.AutoValidatePinStatesstr == true ? 1 : 0,
          }
          let vm = this;
          this.sdk.post("ChangePinState", postData, (res) => {
            if (this.requestJsonRpcIsOk(res)) {
              this.sdk.post("SetAutoValidatePinState", postData1, (res) => {
                if (this.requestJsonRpcIsOk(res)) {
                  ElementUI.Message.success("succeed");
                  vm.init()
                } else {
                  ElementUI.Message.error("failed");
                  vm.init()
                }
              })
            } else {
              ElementUI.Message.error("failed");
              vm.init()
            }
          })
        }
      },
      ChangePinCode() {
        let postData = {
          State: this.formData.Operation,
          NewPin: this.formData.NewPin,
          CurrentPin: this.formData.CurrentPin,
        }
        let vm = this;
        this.sdk.post("ChangePinCode", postData, (res) => {
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