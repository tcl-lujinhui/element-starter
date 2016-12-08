<template lang="jade">
  include ./jade/components.jade
  #app
    div.header
      img(src="./images/logo.png")
      img.status(src="./images/status.png")
    el-menu.main-menu.el-menu-demo(default-active="index" mode="horizontal" router=true)
      el-menu-item(index="1") Home
      el-menu-item(index="mobileConnection") Services
      el-menu-item(index="basic") Basic Settings
      el-menu-item(index="dmz") Advance Settings
      el-menu-item(index="changePassword") System
    //-el-breadcrumb(separator="/")
      el-breadcrumb-item Index
      el-breadcrumb-item System
      el-breadcrumb-item Device Mgmt
    div.main
      el-row
        el-col(:span="5")
          el-menu(router=true,unique-opened=true)
            el-submenu(index="1")
              template(slot="title") Dial-UP
              el-menu-item(index="mobileConnection") Mobile Connection
              el-menu-item(index="profileManagement") Profile Management
              el-menu-item(index="networkSettings") Network Settings
              el-menu-item(index="monthlyPlan")  Monthly Plan
            el-submenu(index="2")
              template(slot="title") WAN
              el-menu-item(index="wanStatus") WAN Status
              el-menu-item(index="wanConfigure") WAN Configure
              el-menu-item(index="macClone") MAC Clone
            el-submenu(index="3")
              template(slot="title") WLAN
              el-menu-item(index="basic") Basic
              el-menu-item(index="advanced") Advanced
              el-menu-item(index="wps") WPS
            el-submenu(index="4")
              template(slot="title") Security
              el-menu-item(index="pinManagement") PIN Management
              el-menu-item(index="routingRules") Routing Rules
              el-menu-item(index="firewall") Firewall
              el-menu-item(index="filter") Filter
            el-menu-item(index="lanSettings") LAN
            el-submenu(index="5")
              template(slot="title") NAT Settings
              el-menu-item(index="dmz") DMZ Settings
              el-menu-item(index="alg") ALG Settings
              el-menu-item(index="upnp") UPnP Settings
              el-menu-item(index="virtualServer") Virtual Server
        el-col(:span="19")
          router-view.main-block

    .footer Copyright 2014-2018 TCT MOBILE INTERNATIONAL LIMTED.ALL RIGHTS RESERVED.
</template>

<script>
export default {
  data () {
    return {
      radio: '1',
      input: '',
      msg: 'Use Vue 2.0 Today!',
      fullscreenLoading: false
    }
  },

  methods: {
    openFullScreen() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 3000);
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
  width:1004px;
  margin: 0 auto;
}

.footer{
  height: 30px;
  background: #eff2f7;
  line-height: 30px;
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
}
</style>
