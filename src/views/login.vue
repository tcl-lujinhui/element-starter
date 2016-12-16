<template lang="jade">
  include ./components.jade
  #login
    +form("formData")
      +input("username:","UserName")(type="password")
      +input("password:","Password")(type="password")
      +formBtn()
</template>

<script>
import _config from '../config.js'
var Config = _config.login;
export default {
  created() {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
    },
    update (){
      this.sdk.post("Login",this.formData,(res)=>{
        this.$router.push('internetStatistics')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
#login{
  padding:150px;
}
</style>