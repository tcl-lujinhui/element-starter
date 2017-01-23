<template lang="jade">
  include ../components.jade
  #pinManagement
    +sideMenuPage('Settings')
      +breadcrumb("ids_sim_pinManagement")
      sim-state
        div(v-if="vuex.SimInfo.PinState==2")
          +form("formData")(v-show="formData.Operation==0")
            +radio("ids_sim_pinOperation:","Operation")
            +input("ids_sim_pinCode:","Pin")(type="password")
            +text("ids_sim_remaining:","{{vuex.SimInfo.PinRemainingTimes}}")
            +formItem("")
              +button("ids_apply")(type="primary" @click="ChangePinState")
              +button("ids_cancel")(@click="reset")
          +form("formData")(v-show="formData.Operation==1" ref="formData2")
            +radio("ids_sim_pinOperation:","Operation")
            +input("ids_sim_oldPinCode:","CurrentPin")(type="password")
            +input("ids_sim_newPinCode :","NewPin")(type="password")
            +input("ids_sim_confirmPINCode :","ConfirmPin")(type="password")
            +text("ids_sim_remaining:","{{vuex.SimInfo.PinRemainingTimes}}")
            +formItem("")
              +button("ids_apply")(type="primary" @click="ChangePinCode('formData2')")
              +button("ids_cancel")(@click="reset")
        +form("formData")(v-show="vuex.SimInfo.PinState==3")
          +formItem("ids_sim_pinOperation:")
            div {{vuex.res.ids_enable}}
          +input("ids_sim_pinCode:","Pin")(type="password")
          +checkbox("","AutoValidatePinState","ids_sim_autoValidation")
          +text("ids_sim_remaining:","{{vuex.SimInfo.PinRemainingTimes}}")
          +formItem("")
            +button("ids_apply")(type="primary" @click="ChangePinState")
            +button("ids_cancel")(@click="reset")
</template>
<script>
import {$,vuex,_,_config} from '../../common.js';
let Config = _config.pinManagement
export default {
  created() {
      this.init()
      this.initdata(Config)
    },
    methods: {
      init() {
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
      ChangePinState() {
        let vm = this;
        if (vuex.SimInfo.PinState == 2) {
          let setForm = () => {
            let postData = {
              Pin: this.formData.Pin,
              State: this.formData.Operation,
            }
            this.sdk.post("ChangePinState", postData, {
              callback(){
                  vm.init();
                  vm.initdata(Config);
                  vm.$refs["formData"].resetFields()
                }
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
          let setForm = () => {
            vm.sdk.post("ChangePinState", postData, {
              success: {
                tips: "None",
                callback() {
                  vm.sdk.post("SetAutoValidatePinState", postData1, {
                      //callback: vm.init
                      callback(){
                        vm.init();
                        vm.initdata(Config);
                        vm.$refs["formData"].resetFields()
                      }
                    })
                }
              },
              callback: vm.init
            })
          }
          vm.submit("formData", setForm)
        }
      },
      ChangePinCode(formName) {
        let vm=this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            let postData = {
              State: vm.formData.Operation,
              NewPin: vm.formData.NewPin,
              CurrentPin: vm.formData.CurrentPin
            }
            vm.sdk.post("ChangePinCode", postData, {
                callback(){
                  vm.init();
                  vm.initdata(Config)
                  vm.$refs[formName].resetFields()
                }
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