<template lang="jade">
  #statusIcon.status
    ul
      li.icon-update
      li.icon-network-type {{vuex.SystemStatus.NetworkType | networkType}}
      li.icon-singal
      li.icon-network-status(:class="{on:vuex.SystemStatus.connectionStatus==2||vuex.SystemStatus.connectionStatus==3}")
      li.icon-wifi(:class="{on:(vuex.SystemStatus.WlanState==1||vuex.SystemStatus.WlanState==2)}")
      li.icon-sms(:class="{fullMessage:vuex.SystemStatus.SmsState==1,newNessage:vuex.SystemStatus.SmsState==3}")
      li.icon-usb(:class="{connect:(vuex.SystemStatus.UsbStatus==1||vuex.SystemStatus.UsbStatus==2)}")
  
</template>

<script>
import {vuex} from '../common.js'
export default {
  created () {
    this.init()
    setInterval(vuex.refreshSystemStatus,5000)
  },
  methods: {
    init (){
      this.vuex = vuex;
      vuex.refreshSystemStatus();
    }
  }
}
</script>

<style lang="sass" scoped>
$iconDirectory:"../images/icon/";
.status {
  margin-top: 22px;
  li {
    float: left;
    list-style-type: none;
    margin: 1px 1px;
    height: 32px;
    line-height: 39px;
    min-width: 32px;
    background-repeat: no-repeat;
    background-position:center center;
    &.icon-update{
      &.on{
        background:url(#{$iconDirectory}update.png);
      } 
    }
    &.icon-network-type{
      color: #01a9f0;
      font-weight:600;
      font-size: 16px;
    }
    &.icon-singal{
      margin: 1px 3px;
      background:url(#{$iconDirectory}singnal.png);
      background-position:0 0px;
      &.singal_1{
        background-position:0 0;
      }
      &.singal_2{
        background-position:0 -32px;
      }
      &.singal_3{
        background-position:0 -64px;
      }
      &.singal_4{
        background-position:0 -96px;
      }
      
    }
    &.icon-network-status{
      background:url(#{$iconDirectory}global_off.png);
      &.on{
        background:url(#{$iconDirectory}global_on.png);
      }
    }
    &.icon-wifi{
      background:url(#{$iconDirectory}wifi_off.png);
      &.on{
        background:url(#{$iconDirectory}wifi_on.png);
      }
    }
    &.icon-sms{
      background:url(#{$iconDirectory}message_allread.png);
      &.fullMessage{
        background:url(#{$iconDirectory}message_full.png);
      }
      &.newNessage{
        background:url(#{$iconDirectory}message.png);
      }
    }
    &.icon-usb{
      background:url(#{$iconDirectory}usb_disconnect.png);
      &.connect{
        background:url(#{$iconDirectory}usb_connect.png);
      }
    }
  }
}
</style>
