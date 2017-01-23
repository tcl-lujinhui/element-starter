<template lang="jade">
  include ./views/components.jade
  #app
    div.header
      img(src="./images/logo.png")
      div.float-right
        div.top-menu
          a.float-right(v-if="vuex.loginName!='login'" @click='logout()') {{vuex.res.ids_logout}}
          a.float-right(hidden) {{vuex.res.ids_help}}
          a.float-right(hidden) language
        status-icon
      sms-report
      //-img.status(src="./images/status.png")
    el-menu.main-menu.el-menu-demo(mode="horizontal" router=true v-if="vuex.loginName != 'login'")
      el-menu-item(:index="val.router" v-for="val in nav") 
        span {{val.text |res}}
    router-view.main
     
    .footer 
      span.copyright {{vuex.res.ids_system_copyright}}
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
        vuex.heartBeat(false);
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
.top-menu {
  margin-right: 20px;
  height: 30px;
  clear: both;
  display: block;
  a,a:hover,a:visited,a:active,a:focus {
    padding: 5px;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
  }
}
.float-right{
  float: right;
}
</style>
