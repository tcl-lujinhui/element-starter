<template lang="jade">
  include ./views/components.jade
  #app
    div.header
      img(src="./images/logo.png")
      div.float-right
        div.top-menu
          a.float-right(v-if="vuex.loginName!='login'" @click='logout()') {{vuex.res.ids_logout}}
          a.float-right() {{vuex.res.ids_help}}
          el-dropdown.float-right.lang-dropdown(trigger="click" @command="changLang")
            span.el-dropdown-link
              | {{vuex.currentLanguage|currentLang}}
              i.el-icon-caret-bottom.el-icon--right
            el-dropdown-menu(slot="dropdown")
              el-dropdown-item(:command="li[0]" v-for="li in sys.Language") {{li[1]}}
        status-icon
      sms-report
      //-img.status(src="./images/status.png")
    el-menu.main-menu.el-menu-demo(mode="horizontal" router=true v-if="vuex.loginName != 'login'")
      el-menu-item(:index="val.router" v-for="val in nav") 
        span(:title="val.text |res") {{val.text |res}}
    router-view.main
     
    .footer 
      span.copyright {{vuex.res.ids_system_copyright}}
</template>

<script>
import {_config,vuex,sys} from './common.js';
export default {
  data () {
    return {
      vuex:vuex,
      nav:_config.nav,
      sys:sys
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
    },
    changLang(lang){
      this.sdk.post("SetLanguage", {Language:lang}, (res) => {
        location.reload()
      })
    }
  }
}
</script>

<style lang="sass">
@import "./styles/common.scss";
@import "./styles/iconfont.css";
</style>
