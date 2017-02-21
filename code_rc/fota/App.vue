<template lang="jade">
  include ./views/components.jade
  #app
    div.header(v-if="vuex.systemInfo.isLogined")
      el-menu.main-menu.el-menu-demo(mode="horizontal" router=true theme="dark")
        el-menu-item(:index="val.router" v-for="val in nav") 
          span(:title="val.text |res") {{val.text |res}}
        el-menu-item.fr(index="login" @click="logout") 
          span.el-menu-span(@click="logout") logout
    router-view.main
     
    .footer 
      span.copyright {{vuex.res.ids_system_copyright}}
</template>

<script>
import {
  _,
  _config,
  vuex
} from './common.js';
export default {
  data() {
      return {
        vuex: vuex,
        nav: _config.nav
      }
    },
    created() {
      this.init();
      this.Inter = setInterval(() => {
        this.getLoginInfo()
      }, 5000);
    },
    destroyed() {
      clearInterval(this.Inter)
      this.Inter = null
    },
    methods: {
      init(){
        this.getLoginInfo()
      },
      getLoginInfo(){
        let vm = this;
        vm.$http.get("/user/getLoginInfo?"+Math.random(), {}).then((res) => {
          vuex.systemInfo.isLogined=res.body.isLogined
        }, (response) => {
          vm.$message.error('fail');
        });
      },
      logout() {
        let vm = this;
        vm.$http.get("/user/logout", {}).then((res) => {
          this.$router.push("login")
          vuex.systemInfo.isLogined=false
        }, (response) => {
          vm.$message.error('fail');
        });
      }
    }
}
</script>


<style lang="sass">
@import "./styles/common.scss";
</style>
