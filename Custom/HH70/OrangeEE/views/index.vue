<template lang="jade">
  include ./components.jade
  #index
    +form("formData")
      div.mainContent
        div.boxTop
        div.boxMain
          el-card.boxStatus(:body-style="{ padding: '0px' }")
            div.boxContentState(v-if="vuex.SimInfo.SIMState=='ready'")
              ul.leftPart
                li.icon.icon-network-status(:class="{on:vuex.SystemStatus.ConnectionStatus==2||vuex.SystemStatus.ConnectionStatus==3}")
                  {{vuex.systemStatus}}
                li
                  div {{vuex.SystemStatus.ConnectionStatus|netConnState}}
                  div {{vuex.res.ids_orange_wan_to}}: 
                    span.name {{vuex.SystemStatus.NetworkName}}
              ul.rightPart
                li.mainRoaming(v-if="vuex.SystemStatus.exRoaming==true")
                li.icon.icon-network-type{{vuex.SystemStatus.NetworkType | networkType}}
                li.icon.icon-signal(:class="{0:'icon-signal',1:'signal_1',2:'signal_2',3:'signal_3',4:'signal_4',5:'signal_4'}[vuex.SystemStatus.SignalStrength]")
              div.lowSignDes(v-if="vuex.SystemStatus.ConnectionStatus==2 && vuex.SystemStatus.NetworkType == 0") {{vuex.res.ids_network_lowSignShow}}
            div.boxContentState(v-if="vuex.SimInfo.SIMState!='ready'")
              ul.leftPart
                li(style="line-height:40px") {{vuex.SimInfo.SIMStateStr|res}}   
            div.boxData
              p.dataText {{page.connectionInfo.DlBytes+page.connectionInfo.UlBytes | covertNum}}            
            div.boxTime
              p.timeText {{page.connectionInfo.ConnectionTime | times('2')}}          
            div.boxWifi
              div.WiFiOff(v-if="page.WiFi2GMode == false && page.WiFi5GMode == false") 
                P {{vuex.res.ids_wifi_WiFiTitle}}:{{vuex.res.ids_wifi_off}}
              div.WiFi2G(v-if="page.WiFi2GMode == true")
                h3(title="MY WIFI")
                  span {{formData.AP2G.Ssid}}
                p {{vuex.res.ids_orange_wan_deviceConnect}}: 
                  span {{vuex.SystemStatus.curr_num}}
              div.WiFi5G(v-if="page.WiFi5GMode == true")
                h3(title="MY WIFI")
                  span {{formData.AP5G.Ssid}}
                p {{vuex.res.ids_orange_wan_deviceConnect}}: 
                  span {{formData.AP5G.curr_num}}
          el-card.hello(:body-style="{ padding: '0px' }")
            img(src="../images/hello.png" width="97px") 
          div.media-list
            el-card.media.mediaUp(:body-style="{ padding: '0px' }")
              span.pull-left
                img(src="../images/icon_sms.png" width="25px")
              div.media-body {{vuex.res.ids_orange_sms_des}}      
                a(@click="showLogin" id="menuSms") {{vuex.res.ids_orange_click}}
                | {{vuex.res.ids_orange_login}}
            el-card.media.media-right.mediaUp(:body-style="{ padding: '0px' }") 
              span.pull-left
                img(src="../images/icon_account.png" width="25px")
              div.media-body {{vuex.res.ids_orange_account_des}} 
                a(href="http://my.ee.co.uk" target="_blank") {{vuex.res.ids_orange_account}}
                i {{vuex.res.ids_orange_new_window}}    
            el-card.media.mediaDown(:body-style="{ padding: '0px' }") 
              span.pull-left
                img(src="../images/icon_settings.png" width="25px")
              div.media-body {{vuex.res.ids_orange_settings_des}}
                router-link(to="networkSettings") {{vuex.res.ids_orange_login_here}}
                //-a(@click="showLogin" id="menuSetting") 
            el-card.media.media-right.mediaDown(:body-style="{ padding: '0px' }") 
              span.pull-left
                img(src="../images/icon_usage.png" width="25px")
              div.media-body {{vuex.res.ids_orange_usage_des}}
                a(href='http://add-on.ee.co.uk/mbbstatus' target='_blank'){{vuex.res.ids_orange_click}}.
                i {{vuex.res.ids_orange_new_window}}
          el-card.smsFwdLink_index(:body-style="{ padding: '0px' }")
            a(@click="showLogin" id="menuSmsFwd") {{vuex.res.ids_index_click}} 
            | {{vuex.res.ids_index_smsFwd_des}}         
        div.boxBottom
    el-dialog.loginBox(title="login" v-model="vuex.dialogLoginVisible" size="tiny")
      login
</template>

<script>
import {$,_config,vuex,G} from '../common.js'
import login from './login.vue'
export default {
  created() {
      this.init();
      this.vuex.initSimInfo();
      this.Inter = setInterval(() => {
        this.getData()
      }, 6000);
    },
    destroyed() {
      clearInterval(this.Inter)
      this.Inter = null
    },
    methods: {
      init() {
        this.vuex = vuex;
        this.initdata(_config);
        this.page = {
          dialogFormVisible: false,
          connectionInfo: {},          
          WiFi2GMode:false,
          WiFi5GMode:false
        };
        this.getData();
        this.sdk.get("GetWlanSettings",null,(res)=>{
          this.formData = res;
          if(this.formData.AP2G.ApStatus != G.WLAN_MODEL_ApStatus_DISABLE){
            this.page.WiFi2GMode = true;
          }
          if(this.formData.AP5G.ApStatus != G.WLAN_MODEL_ApStatus_DISABLE){            
            this.page.WiFi5GMode = true;
          }
        });
      },
      getData() {        
        this.sdk.get("GetConnectionState", null, (res) => {
          this.page.connectionInfo = res;
        });
      },
      showLogin() {
        this.page.dialogFormVisible = true;
      }
    },
    components: {
      login
    }
}
</script>
<style lang="sass">
.index{
  background: #E5E5E5 url(../images/bg-body.png) 0 0 repeat-x;
  height: 100%;
  font-size:12px;
  font-family:Arial, Helvetica, sans-serif;
  color:#757575;  
  .header,.container,.footer{
    background: transparent;
  }
}
</style>
<style lang="sass" scoped>
@import "../styles/color.scss";
$iconDirectory:"../images/";

.el-form {
  width: 895px;
}

.el-card {
  width: 90%;
  margin: 0px auto
}

a {
  color: #1d9beb;
  text-decoration: underline;
  cursor: pointer;
}

h3 {
  font-size: 16px;
  font-weight: bold;
}

.mainContent {
  width: 580px;
  height: 628px;
  margin: 50px auto;
  position: relative;
  .boxTop {
    position: absolute;
    top: 0;
    left: 0;
    height: 6px;
    width: 580px;
    overflow: hidden;
    background: transparent url(#{$iconDirectory}box-top.png) 0 0 no-repeat;
  }
  .boxMain {
    position: absolute;
    top: 6px;
    left: 0;
    width: 100%;
    height: 656px;
    background: #ebebeb url(#{$iconDirectory}box-body.png) 0 0 repeat-y;
  }
  .boxBottom {
    position: absolute;
    bottom: -40px;
    left: 0;
    height: 6px;
    width: 580px;
    overflow: hidden;
    background: transparent url(#{$iconDirectory}box-bottom.png) 0 0 no-repeat;
  }
  li{
    float:left;
    list-style-type: none;
    margin: 1px 1px;
    &.icon{
      height: 32px;
      line-height: 39px;
      min-width: 32px;
      background-repeat: no-repeat;
      background-position: center center;
      margin-right: 5px;
    }
    &.icon-network-type {
      color: $color_main_level_1;
      font-weight: 600;
      font-size: 16px;
    }
    &.icon-signal {
      min-width: 28px;
      margin: 1px 3px;
      background:url(#{$iconDirectory}ico-signal.png);
      background-position: 0 0px;
      &.signal_0 {
        background-position: 0 0;
      }
      &.signal_1 {
        background-position: 0 -32px;
      }
      &.signal_2 {
        background-position: 0 -66px;
      }
      &.signal_3 {
        background-position: 0 -99px;
      }
      &.signal_4 {
        background-position: 0 -134px;
      }
      &.signal_5 {
        background-position: 0 -168px;
      }
    }
    &.icon-network-status {
      background: url(#{$iconDirectory}wanState.png) 0 0 no-repeat;
      &.on {
        background: url(#{$iconDirectory}wanState.png) 0 -31px no-repeat;
      }
    }
  }
}




.boxStatus{
  margin: 20px auto 10px auto;
}
.boxContentState {
  padding: 10px 10px 10px 0;
  overflow: hidden;
  border-bottom: solid 1px #e0e0e0;
  .leftPart {
    float: left;
    width: 50%;
    padding-left: 25px;
    #connectStatus {
      font-size: 14px;
      font-weight: bold;
    }
    #connectImg {
      margin-top: 5px;
      margin-right: 10px;
      height: 31px;
      width: 31px;
      overflow: hidden;
      background: url(#{$iconDirectory}wanState.png) 0 0 no-repeat;
    }
    li .name {
      color: #009c9c;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .rightPart {
    float: right;
    .mainRoaming {
      width: 54px;
      height: 35px;
      background: url(#{$iconDirectory}ico-roaming.png) no-repeat center 0%;
    }
  } 
  .lowSignDes {
    clear: both;
    float: left;
    font-size: 12px;
    padding-left: 25px;
  }
}

.boxData {
  width: 165px;
  padding: 10px 0 10px 30px;
  float: left;
  border-right: solid 1px #e0e0e0;
  .dataText {
    background: url(#{$iconDirectory}ico-middle.png) no-repeat;
    padding-left: 40px;
    height: 22px;
    line-height: 22px;
  }
}

.boxTime {
  padding: 10px 0 10px 165px;
  float: left;
  .timeText {
    background: url(#{$iconDirectory}ico-middle.png) no-repeat 0 -29px;
    padding-left: 40px;
    height: 22px;
    line-height: 22px;
  }
}

.boxWifi {
  border-top: solid 1px #e0e0e0;
  clear: both;
  padding: 5px 0 5px 62px;
  overflow: hidden;
  background: url(#{$iconDirectory}ico-mbb.png) 25px 30px no-repeat;
  line-height: 20px;
  h3{
    word-wrap: break-word;
  }
  .WiFiOff{
    margin-top: 30px;
  }
  .WiFi2G{
    width: 44%;
    float: left;
    margin-right: 15px;
  }
}

.hello img {
  padding: 10px 20px;
}

.media-list {
  width: 524px;
  margin: 10px auto;
  font-size: 12px;
  .media {
    float: left;
    width: 234px;
    padding: 12px;
    margin-bottom: 6px;
    line-height: 1.5em;
    &.mediaDown {
      height: 90px;
    }
    &.mediaUp {
      height: 70px;
    }
    &.media-right {
      float: right;
    }    
    .pull-left {
      float: left;
      margin-left: 8px;
      margin-right: 12px;
    }
    .media-body {
      overflow: hidden;
      zoom: 1;
    }
    i {
      color: #ccc;
      font-style: normal;
    }
  }
}

.smsFwdLink_index {
  line-height: 40px;
  font-size: 14px;
  text-align: center;
}
</style>
