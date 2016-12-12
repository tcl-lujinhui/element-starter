<template lang="jade">
  include ./components.jade
  #wanConfigure
    div {{$route.name}}
    +form("formData")
      +input("username:","UserName")
      +input("password:","Password")
      +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.login;
export default {
  created() {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
      this.sdk.get("GetConnectionSettings",null,(res)=>{
        console.log(res)
        this.formData = res;
      })
    },
    update (){
      this.sdk.post("SetConnectionSettings",this.formData,(res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>