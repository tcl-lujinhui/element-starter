<template lang="jade">
  include ./views/components.jade
  #app
    div.header
      img(src="./images/logo.png")
      status-icon
      //-img.status(src="./images/status.png")
    el-menu.main-menu.el-menu-demo(mode="horizontal" router=true v-if="vuex.loginName != 'login'")
      el-menu-item(:index="val.router" v-for="val in nav") {{val.text |res}}
    router-view.main
     
    .footer 
      span.copyright Copyright 2014-2018 TCT MOBILE INTERNATIONAL LIMTED.ALL RIGHTS RESERVED.{{vuex.res.hello}}
</template>

<script>
import {_config,vuex} from './common.js';
export default {
  data () {
    return {
      vuex:vuex,
      nav:_config.nav
    }
  },
  created() {
    
  },
  methods: {
    logout(){
      this.sdk.post("Logout",this.formData,(res)=>{
        this.$router.push('login')
      })
    }
  }
}
</script>

<style lang="sass">
@import "./styles/common.scss";
body {
  font-family: Helvetica, sans-serif;
}
#app{
  max-width:1004px;
  margin: 0 auto;
}

.footer{
  height: 30px;
  background: #eff2f7;
  line-height: 30px;
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
  .copyright{
    padding-left: 60px;
    margin:0 auto;
    background: url(images/under_logo.png) left center no-repeat;
  }
}
</style>
