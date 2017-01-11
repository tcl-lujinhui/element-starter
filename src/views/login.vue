<template lang="jade">
  include ./components.jade
  #login
    +form("formData")
      el-row(:gutter="0")
        el-col(:span="12")
          div.title LINKHUB Manager APP
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
            div.title Login
            //-+input("username:","UserName")(type="password")
            +inputNone("","Password")(type="password")(v-on:change = "changeInput()" placeholder="Enter Administrator Password" name="passVal")
            div.tips-error(v-show="page.isTipsError")
            +formCheckbox("save_flag","Remember password")(class="paddingVal")
            +formBtnNone()
</template>

<script>
import {$,_config} from '../common.js'
import _cookie from '../plugin/jquery.cookie.js'
var Config = _config.login;
export default {
  created() {
    this.init()
  },
  methods: {
    init (){
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
                let text = "Please input the password.";
                _self.displayTipsText(text);
                console.log("oooooooo")
            }
          },
          e1:{
            tips:"None",
            msg:"",
            callback(){
                let text = "Wrong password!";
                _self.displayTipsText(text);
            }
          },
          e2:{
            tips:"None",
            msg:"",
            callback(){
                let text = "The administrator had already logged in, Please try later.";
                _self.displayTipsText(text);
            }
        },
        e3:{
            tips:"None",
            msg:"",
            callback(){
                let text = "The login times used out.Please reboot and try again.";
                _self.displayTipsText(text);
            }
        }
        };
    if($("input[name = 'passVal']").val() != ""){
        this.sdk.post("Login",this.formData,setLogin);
    }else{
        let text = "Please input the password.";
         _self.displayTipsText(text);
    }
      //this.sdk.post("Login",this.formData,(res)=>{
          //this.$router.push('internetStatistics');
     // })
    },
    firstLoginEvent(){
      this.sdk.post("GetPasswordChangeFlag",this.formData,(res) =>{
        if(res.result.change_flag == 0){
          this.$confirm('For better security, it’s recommended you change the default administrator password for login.','Login settings',{
            confirmButtonText:'Change now',
            cancelButtonText:'Cancel'
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