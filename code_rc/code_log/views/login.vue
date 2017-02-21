<template lang="jade">
  include ./components.jade
  #login
    .login
      form(action="/" target="hiddenIframe")
        el-form.login-box(label-width="0")
          el-form-item(label="")
            el-input(v-model="loginInfo.name")
          el-form-item(label="")
            el-input(v-model="loginInfo.password" type="password")
          el-form-item(label="")
            el-button.login-btn(@click="login" type="primary" native-type="submit") Login
      iframe#hiddenIframe.hidden(name="hiddenIframe")
</template>

<script>
import {$,_config,vuex} from '../common.js'
export default {
  data() {
    return {
      loginInfo:{
        name:"",
        password:""
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.$http.get("/user/getLoginInfo?"+Math.random(), {}).then((res) => {
        vuex.systemInfo.isLogined=res.body.isLogined
        if(res.body.isLogined){
          this.$router.push("fota")
        }
      })
    },
    login(){
      let vm = this;
      vm.$http.post("/user/login", vm.loginInfo).then((res) => {
        if(!res.body.err){
          this.$router.push("fota")
        }else{
          vm.$message.error('The user name or password error');
        }
        
      }, (response) => {
        vm.$message.error('fail');
      });
    },

  }

}
</script>

<style lang="sass" scoped>
.login {
  padding: 30px 0;
  width: 500px;
  margin: 100px auto auto;
  border: 1px solid #eaeefb;
  border-radius: 4px;
  transition: .2s;
}
.login-box{
  margin: 20px auto;
  width: 400px;
  .login-btn{
    display: block;
    width: 100%;
  }
}

</style>
