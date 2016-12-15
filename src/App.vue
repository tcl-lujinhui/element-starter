<template lang="jade">
  include ./views/components.jade
  #app
    div.header
      img(src="./images/logo.png")
      img.status(src="./images/status.png")
    el-menu.main-menu.el-menu-demo(mode="horizontal" router=true)
      el-menu-item(index="1") Home {{common.age}}
      el-menu-item(index="mobileConnection") Services
      el-menu-item(index="basic") Basic Settings
      el-menu-item(index="dmz") Advance Settings
      el-menu-item(index="changePassword") System

    div.main
      el-row
        el-col(:span="5")
          el-menu(router=true,unique-opened=true)
            div(v-for="(val, key, index) in menu")
              el-submenu(:index="index.toString()" v-if="val instanceof Array")
                template(slot="title") {{key}}
                el-menu-item(:index="item[0]" v-for="item in val") {{item[1]}}
              el-menu-item(:index="val" v-if="typeof val == 'string'") {{key}}
        //-el-col(:span="5")
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
            el-submenu(index="6")
              template(slot="title") Status&Statistics
              el-menu-item(index="internetStatus") internetStatus
              el-menu-item(index="lanStatus") lanStatus
              el-menu-item(index="wlanStatus") wlanStatus
              el-menu-item(index="internetStatistics") internetStatistics
              el-menu-item(index="lanStatistics") lanStatistics
              el-menu-item(index="wlanStatistics") wlanStatistics
              
        el-col(:span="19")
          router-view.main-block
     
    .footer Copyright 2014-2018 TCT MOBILE INTERNATIONAL LIMTED.ALL RIGHTS RESERVED.
</template>

<script>
import _config from './config.js'

export default {
  data () {
    return {
      menu:_config.menu,
      common:_config.$G,
      radio: '1',
      input: '',
      msg: 'Use Vue 2.0 Today!',
      fullscreenLoading: false
    }
  },
  created() {
    setInterval(() => {
        this.common.age++;
        console.log("App set:"+this.common.age)
      }, 3000);
  },
  methods: {
    openFullScreen() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.common.age++;
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
}
</style>
