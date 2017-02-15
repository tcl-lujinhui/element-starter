<template lang="jade">
  include ./views/components.jade
  #app
    div.header
    el-menu.main-menu.el-menu-demo(mode="horizontal" router=true theme="dark")
      el-menu-item(:index="val.router" v-for="val in nav") 
        span(:title="val.text |res") {{val.text |res}}
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
  }
}
</script>

<style lang="sass">
@import "./styles/common.scss";
@import "./styles/iconfont.css";
</style>
