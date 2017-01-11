<template lang="jade">
  include ../components.jade
  #pinManagement
    +sideMenuPage('Settings')
      +breadcrumb("PIN Management")
      sim-state
        div(v-if="vuex.SimInfo.PinState==2")
          +form("formData")(v-show="formData.Operation==0")
            +radio("PIN operation:","Operation")
            +input("PIN  Code","Pin")(type="password")
            +text("Remaining Attempts:","{{vuex.SimInfo.PinRemainingTimes}}")
            +formItem("")
              +button("Apply")(type="primary" @click="ChangePinState")
              +button("Cancel")(@click="reset")
          +form("formData")(v-show="formData.Operation==1" ref="formData2")
            +radio("PIN Code Operation:","Operation")
            +input("Old PIN Code :","CurrentPin")(type="password")
            +input("New PIN Code :","NewPin")(type="password")
            +input("Confirm PIN Code :","ConfirmPin")(type="password")
            +text("Remaining Attempts:","{{vuex.SimInfo.PinRemainingTimes}}")
            +formItem("")
              +button("Apply")(type="primary" @click="ChangePinCode('formData2')")
              +button("Cancel")(@click="reset")
        +form("formData")(v-show="vuex.SimInfo.PinState==3")
          +formItem("PIN operation:")
            div Enable
          +input("PIN  Code","Pin")(type="password")
          +checkbox("","AutoValidatePinState","Auto Validation")
          +text("Remaining Attempts:","{{vuex.SimInfo.PinRemainingTimes}}")
          +formItem("")
            +button("Apply")(type="primary" @click="ChangePinState")
            +button("Cancel")(@click="reset")
</template>
<script>
import {$,vuex,_,_config} from '../../common.js';
let Config = _config.pinManagement
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
          this.formData.AutoValidatePinState = res.State;
        })
      },
      requestJsonRpcIsOk(result) {
        return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
      },
      ChangePinState() {
        if (vuex.SimInfo.PinState == 2) {
          let setForm = () => {
            let postData = {
              Pin: this.formData.Pin,
              State: this.formData.Operation,
            }
            this.sdk.post("ChangePinState", postData, {
              callback: this.init
            })
          }
          this.submit("formData", setForm)
        } else if (vuex.SimInfo.PinState == 3) {
          let postData = {
            Pin: this.formData.Pin,
            State: 1,
          }
          let postData1 = {
            Pin: this.formData.Pin,
            State: this.formData.AutoValidatePinState
          }
          let vm = this;
          let setForm = () => {
            this.sdk.post("ChangePinState", postData, {
              success: {
                tips: "None",
                callback() {
                  vm.sdk.post("SetAutoValidatePinState", postData1, {
                      callback: this.init
                    })
                }
              },
              callback: this.init
            })
          }
          vm.submit("formData", setForm)
        }
      },
      ChangePinCode(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let postData = {
              State: this.formData.Operation,
              NewPin: this.formData.NewPin,
              CurrentPin: this.formData.CurrentPin
            }
            this.sdk.post("ChangePinCode", postData, {
                callback: this.init
              })
          } else {
            return false;
          }
        });

      }

    }
}
</script>


<style lang="sass" scoped>
</style>