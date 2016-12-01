<template lang="jade">
  include ./jade/components.jade
  #app
    img(src="./images/logo.png")
    el-menu.el-menu-demo(default-active="index" mode="horizontal" router=true)
      el-submenu(index="1")
        template(slot="title") Home
        el-menu-item(index="index") Status
        el-menu-item(index="index") Statistics
        el-menu-item(index="index") Setup Wizard
      el-submenu(index="2")
        template(slot="title") Services
        el-menu-item(index="bar") SMS
        el-menu-item(index="2-2") Call Logs
        el-menu-item(index="bar") Share
      el-submenu(index="3")
        template(slot="title") Basic Settings
        el-menu-item(index="mobileConnection") Dial-UP
        el-menu-item(index="2-2") WAN
        el-menu-item(index="bar") WLAN
        el-menu-item(index="bar") Security
        el-menu-item(index="2-2") LAN
      el-submenu(index="4")
        template(slot="title") Advance Settings
        el-menu-item(index="index") NAT Settings
        el-menu-item(index="index") QoS
      el-submenu(index="5")
        template(slot="title") System
        el-menu-item(index="deviceInfo") Device Info
        el-menu-item(index="reboot") Reboot & Reset
        el-menu-item(index="systemSettings") Upgrade
        el-menu-item(index="foo") Device Mgmt
    el-breadcrumb(separator="/")
      el-breadcrumb-item Index
      el-breadcrumb-item System
      el-breadcrumb-item Device Mgmt
    router-view.main-block
    .footer Copyright 2014-2016 TCT MOBILE INTERNATIONAL LIMTED.ALL RIGHTS RESERVED.
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
