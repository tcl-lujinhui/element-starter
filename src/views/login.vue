<template lang="jade">
  include ./components.jade
  #login
    +form("formData")
      el-row(:gutter="0")
        el-col(:span="12")
          div.title {{vuex.res.ids_managerAPP}}
          el-row(:gutter="0")
            el-col(:span="11") 
              img(src="../images/android.png" width="130" height="130")
              div.imgTextAlign
                img(src="../images/AndroidApp.png" width="60" height="30")
            el-col(:span="11") 
              img(src="../images/app.png"  width="130" height="130")
              div.imgTextAlign
                img(src="../images/appleApp.png" width="30" height="30")
        el-col.cutLine(:span="12")
          div.loginArea
            div.title {{vuex.res.ids_login_loginPwd}}
            //-+input("username:","UserName")(type="password")
            +inputNone("","Password")(type="password")(v-on:change = "changeInput()", :placeholder="vuex.res.ids_login_placeHolder" name="passVal")
            div.tips-error(v-show="page.isTipsError")
            +formCheckbox("save_flag","Remember password")(class="paddingVal")
            +formBtnNone()
</template>

<script>
import {$,_config,vuex} from '../common.js'
import _cookie from '../plugin/jquery.cookie.js'
var Config = _config.login;
export default {
  created() {
    this.init()
  },
  methods: {
    init (){
      this.vuex = vuex;
      this.initdata(Config);
      this.initDataEvent();
      this.page = {
        isTipsError:false
      }
    },
    update (){
      var _self = this;
        let setLogin = {
          success:{
            tips:"None",
            msg:"",
            callback(){
              _self.firstLoginEvent();
              _self.passwordSaveEvent();
            }
          },
          fail:{
            tips:"None",
            msg:"",
            callback(){
                let text = _self.vuex.res.ids_required;
                _self.displayTipsText(text);
                console.log("oooooooo")
            }
          },
          e1:{
            tips:"None",
            msg:"",
            callback(){
                let text = _self.vuex.res.ids_login_wrongPwd;
                _self.displayTipsText(text);
            }
          },
          e2:{
            tips:"None",
            msg:"",
            callback(){
                let text = _self.vuex.res.ids_login_otherLogin;
                _self.displayTipsText(text);
            }
        },
        e3:{
            tips:"None",
            msg:"",
            callback(){
                let text = _self.vuex.res.ids_login_timeuseout;
                _self.displayTipsText(text);
            }
        }
        };
    if($("input[name = 'passVal']").val() != ""){
        this.sdk.post("Login",this.formData,setLogin);
    }else{
        let text = this.vuex.res.ids_required;
         _self.displayTipsText(text);
    }
      //this.sdk.post("Login",this.formData,(res)=>{
          //this.$router.push('internetStatistics');
     // })
    },
    firstLoginEvent(){
      this.sdk.post("GetPasswordChangeFlag",this.formData,(res) =>{
        if(res.result.change_flag == 0){
          this.$confirm(vuex.res['ids_login_changePasswordTips'],vuex.res['ids_login_loginPwd'],{
            confirmButtonText:vuex.res['ids_login_changeNow'],
            cancelButtonText:vuex.res['ids_cancel']
          }).then(() =>{
            this.$router.push('changePassword')
          }).catch(() =>{
            this.$router.push('internetStatistics')
          });
        }else{
          this.$router.push('internetStatistics')
        }
      });
    },
    passwordSaveEvent(){
         let obj = {
            save_flag:this.formData.save_flag,
            Password:this.formData.Password
         }
         let str = JSON.stringify(obj);
        $.cookie("obj",str);
    },
    initDataEvent(){
         let getObj = JSON.parse($.cookie("obj"));
       if(getObj.save_flag == 1){
            this.formData.Password = getObj.Password;
            this.formData.save_flag = getObj.save_flag;
       }
    },
    changeInput(){
        this.page.isTipsError = false;
    },
    displayTipsText(text){
        this.page.isTipsError = true;
        $(".tips-error").html(text);
    }
  }
}
</script>

<style lang="sass" scoped>
#login{
  padding:30px 0;
}
.el-form{
  width:895px;
}
</style>