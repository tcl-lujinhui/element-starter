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
            input(type="password" style="display:none" onkeypress="update(event)")
            +inputNone("","Password")(type="password")(v-on:change = "changeInput()", :placeholder="vuex.res.ids_login_placeHolder" name="passVal")
            div.tips-error(v-show="page.isTipsError")
            +formCheckbox("save_flag","ids_login_rememberPassword")(class="paddingVal")
            +formBtnNone(class="submit")
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
        isTipsError:false,
        className:"submit"
      }
    },
    update (){
      var _self = this;
        let setLogin = {
          success:{
            tips:"None",
            msg:"",
            callback(){
            vuex.initLoginState();
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
         this.displayTipsText(text);
    }
      //this.sdk.post("Login",this.formData,(res)=>{
          //this.$router.push('internetStatistics');
     // })
    },
    firstLoginEvent(){
      this.sdk.post("GetPasswordChangeFlag",this.formData,(res) =>{
        if(res.result.change_flag == 0){
          this.page.className = "submitNone";
          this.$confirm(vuex.res['ids_login_changePasswordTips'],vuex.res['ids_login_loginPwd'],{
            confirmButtonText:vuex.res['ids_login_changeNow'],
            cancelButtonText:vuex.res['ids_cancel']
          }).then(() =>{
            this.$router.push('changePassword')
          }).catch(() =>{
            this.$router.push('internetStatus')
          });
        }else{
          this.$router.push('internetStatus')
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
        if(!$.isEmptyObject($.cookie("obj"))){
            let getObj = $.parseJSON($.cookie("obj"));
            if(getObj.save_flag == 1){
                this.formData.Password = getObj.Password;
                this.formData.save_flag = getObj.save_flag;
            }else{
                getObj.Password = "";
                this.formData.Password = "";
            }
        }
        let _self = this;
        $(document).keypress(function(e) {
        if (e.which == 13) {
            $("."+_self.page.className).find("button").click();
        }
    });
    },
    changeInput(){
        this.page.isTipsError = false;
    },
    displayTipsText(text){
        this.page.isTipsError = true;
        $(".tips-error").html(text);
        $("input[name = 'passVal']").select();
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