<template lang="jade">
  include ../components.jade
  #changePassword
    +sideMenuPage('System')
      +breadcrumb("Password Change")
      +form("formData")
        +input("User Name:","UserName")(disabled)
        +input("Current Password:","CurrPassword")(type="password")
        +input("New Password:","NewPassword")(type="password")
        +input("Confirm Password:","ConfirmPassword")(type="password")
        +formBtn()

</template>
<script>
import _config from '../../config.js';
import ElementUI from 'element-ui';
let Config = _config.changePassword;
export default {
  created() {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
    },
    requestJsonRpcIsOk(result) {
      return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
    },
    /*checkStringInvalid(str) {
      if (str == null || str == "") {
        return false;
      } else {
        return true;
      }
    },*/
    update (){
      this.submit("formData",()=>{
        this.sdk.post("ChangePassword",this.formData,(res)=>{
          //this.reset();
          if(this.requestJsonRpcIsOk(res)){
            ElementUI.Message.success("Succeeded!");
          }else{
            if(res.error.code=="010402"){
              this.$alert('Current Password is wrong.', 'Error', {
                confirmButtonText: 'OK',
                callback: action => {
                  this.reset();
                }
              });
            }/*else if(res.error.code=="010401"){
              ElementUI.Message.error("Failed!");
            }*/else{
              ElementUI.Message.error("Failed!");
           }
          }   
        })
      }) 
    }
  }
}
</script>
<style lang="sass" scoped>
</style>