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
//import ElementUI from 'element-ui';
let Config = _config.changePassword;
export default {
  created() {
      this.init();
      this.initdata(Config);
    },
    methods: {
      init() {},
      update() {
        let vm = this
        this.submit("formData", () => {
          let results = {
            callback: this.init,
            //success:this.vuex.res.ids_success,
            success: {
              tips: "Message",
              msg: this.vuex.res.ids_success,
              callback() {
                vm.setPassChangeFlag();
                vm.reset();
              }
            },
            fail: this.vuex.res.ids_fail,
            e2: {
              tips: "None",
              callback() {
                vm.$alert(vuex.res['ids_login_inputCurrPwd'], vuex.res['ids_error'], {
                  confirmButtonText: vuex.res['ids_ok'],
                  callback: action => {
                    //this.init();
                  }
                });
              }
            }
          };
          let sendPassword = {
              "UserName": this.formData.UserName,
              "CurrPassword": this.formData.CurrPassword,
              "NewPassword": this.formData.NewPassword
            }
            this.sdk.post("ChangePassword", sendPassword, results);
          /*this.sdk.post("ChangePassword", sendPassword, (res) => {
            if (this.requestJsonRpcIsOk(res)) {
              ElementUI.Message.success(this.vuex.res.ids_success);
              this.setPassChangeFlag();
            } else {
              if (res.error.code == "010402") {

                this.$alert(vuex.res['ids_login_inputCurrPwd'],vuex.res['ids_error'], {
                  confirmButtonText: vuex.res['ids_ok'],
                  callback: action => {
                    this.reset();
                  }
                });
              }else if(res.error.code=="010401"){
                ElementUI.Message.error("Failed!");
              }else {
                ElementUI.Message.error(this.vuex.res.ids_fail);
              }
            }
          });*/
        })
      },
     /* requestJsonRpcIsOk(result) {
        return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
      },*/
      setPassChangeFlag() {
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