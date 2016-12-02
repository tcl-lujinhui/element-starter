<template lang="jade">
  include ../components.jade
  #changePassword
    include _menu_device_mgmt.jade
    +form("formData")(:rules="rules" ref="formData")
      +input("User name:","UserName")(disabled)
      +input("Current password:","CurrPassword")(type="password")
      +input("New password:","NewPassword")(type="password")
      +input("Confirm password:","ConfirmPassword")(type="password")
      +formBtn()

</template>
<script>
import Config from '../../config.js'
var _Config = Config.changePassword
export default {
  data () {
    return {
      formData:{},
      rules: _Config.rules
    }
  },
  created () {
    this.init()
  },
  methods: {
    tabs(tabs){
      this.$router.push(tabs.$el.getAttribute("router"))
    },
    reset() {
      this.init()
      this.$refs.formData.resetFields();
    },
    init (){
      this.formData=_Config.formData
    },
    update (){
      this.$refs.formData.validate((valid) => {
        if(valid){
          this.sdk.post("ChangePassword",this.formData,(res)=>{
            this.reset()
          })
        }else{
          this.$message.error('error submit!!');
          return false;
        }
      })
      
    }
  }
}
</script>
<style lang="sass" scoped>
</style>