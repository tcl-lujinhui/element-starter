<template lang="jade">
  include ./components.jade
  #login
    +form("formData")
      div.loginArea
        form(@keyup.enter="update" @submit.prevent="update")
          div.title {{vuex.res.ids_login_loginPwd}}
          //-+input("username:","UserName")(type="password",;autofocus=true)
          +inputNone("","Password")(type="password",@change="page.tipsError=''",:placeholder="vuex.res.ids_login_placeHolder" autofocus=true)
          div.tips-error(v-show="page.tipsError!=''") {{page.tipsError | res}}
          +formCheckbox("save_flag","ids_login_rememberPassword").paddingVal
          div.btnLogin
            +button("ids_login")(type="primary" @click="update")
</template>

<script>
import {
  $,
  _config,
  vuex
} from '../common.js'
import _cookie from '../plugin/jquery.cookie.js'
var Config = _config.login;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex;
        this.initdata(Config);
        this.page = {
          tipsError: ""
        }
        this.initDataEvent();
      },
      update() {
        var vm = this;
        let setLogin = {
          success: {
            tips: "None",
            callback() {
              vuex.initLoginState();
              vm.firstLoginEvent();
              vm.passwordSaveEvent();
            }
          },
          fail: {
            tips: "None",
            callback() {
              vm.page.tipsError = vuex.res.ids_required
            }
          },
          e1: {
            tips: "None",
            callback() {
              vm.page.tipsError = vuex.res.ids_login_wrongPwd
            }
          },
          e2: {
            tips: "None",
            callback() {
              vm.page.tipsError = vuex.res.ids_login_otherLogin
            }
          },
          e3: {
            tips: "None",
            callback() {
              vm.page.tipsError = vuex.res.ids_login_timeuseout
            }
          }
        };
        vm.sdk.post("Login",this.formData,setLogin);
      },
      firstLoginEvent() {
        this.sdk.post("GetPasswordChangeFlag", this.formData, (res) => {
          if (res.result.change_flag == 0) {
            this.$confirm(vuex.res['ids_login_changePasswordTips'], vuex.res['ids_login_loginPwd'], {
              confirmButtonText: vuex.res['ids_login_changeNow'],
              cancelButtonText: vuex.res['ids_cancel']
            }).then(() => {
              this.$router.push('changePassword')
            }).catch(() => {
              this.$router.push('internetStatus')
            });
          } else {
            this.$router.push('internetStatus')
          }
        });
      },

      passwordSaveEvent() {
        let obj = {
          save_flag: this.formData.save_flag,
          Password: this.formData.Password
        }
        let str = JSON.stringify(obj);
        $.cookie("obj", str);
      },

      initDataEvent() {
        if (!$.isEmptyObject($.cookie("obj"))) {
          let getObj = $.parseJSON($.cookie("obj"));
          if (getObj.save_flag == 1) {
            _.extend(this.formData,getObj)
          } else {
            getObj.Password = "";
            this.formData.Password = "";
            this.formData.save_flag = 0;
          }
        }
      }
    }
}
</script>

<style lang="sass" scoped>
#login {
  margin: 0 auto;
  width: 300px;
}

.el-form {
  width: 895px;
}
</style>
