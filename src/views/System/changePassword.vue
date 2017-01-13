<template lang="jade">
  include ../components.jade
  #changePassword
    +sideMenuPage('System')
      +breadcrumb("ids_login_loginPwd")
      +form("formData")
        +input("ids_profile_userName:","UserName")(disabled)
        +input("ids_admin_currPwd:","CurrPassword")(type="password")
        +input("ids_admin_newPwd:","NewPassword")(type="password")
        +input("ids_admin_confPwd:","ConfirmPassword")(type="password")
        +formBtn()

</template>
<script>
import {_config,vuex} from '../../common.js';
let Config = _config.changePassword;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        //this.vuex = vuex;
      },
      update() {
        let vm = this
        this.submit("formData", () => {
          let results = {
            callback: this.init,
            success: {
                tips:"Message",
                msg:this.vuex.res.ids_success,
                callback(){
                    vm.setPassChangeFlag();
                }
            },
            fail: this.vuex.res.ids_fail,
            e2: {
              tips: "None",
              callback() {
                vm.$alert(vuex.res['ids_login_inputCurrPwd'], vuex.res['ids_error'], {
                  confirmButtonText: vuex.res['ids_ok'],
                  callback: action => {
                    this.init;
                  }
                });
              }
            }
          };
          this.sdk.post("ChangePassword", this.formData, results);
        })
      },
      setPassChangeFlag(){
        let paramt = {
            "change_flag":1
        }
        this.sdk.post("SetPasswordChangeFlag",paramt,(res) =>{})
      }
    }
}
</script>
<style lang="sass" scoped>
</style>