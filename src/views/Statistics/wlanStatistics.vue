<template lang="jade">
  include ../components.jade
  #wlanStatistics
    +sideMenuPage('Home')
      +breadcrumb("ids_wifi_WiFiTitle")
      div.main-box
        table.table.table-bordered.table-tc
          tbody
            tr
              th(rowspan="2") {{vuex.res.ids_lan_interface}}
              th(colspan="4") {{vuex.res.ids_wlan_received}}
              th(colspan="4") {{vuex.res.ids_statistics_send}}
            tr
              td {{vuex.res.ids_byte}}
              td {{vuex.res.ids_packet}} 
              td {{vuex.res.ids_statistics_error}} 
              td {{vuex.res.ids_discarded}} 
              td {{vuex.res.ids_byte}} 
              td {{vuex.res.ids_packet}}   
              td {{vuex.res.ids_statistics_error}} 
              td {{vuex.res.ids_discarded}}
            tr(v-for="list in formData.List")
              td {{list.Ssid}}
              td {{list.ReceivedByte | covertNum}}
              td {{list.ReceivedPacket | covertNum}} 
              td {{list.ReceivedError | covertNum}} 
              td {{list.ReceivedDiscarded | covertNum}} 
              td {{list.SentByte | covertNum}} 
              td {{list.SentPacket | covertNum}}  
              td {{list.SentError | covertNum}} 
              td {{list.SentDiscarded | covertNum}}  
</template>
<script>
import {_,_config,$,vuex,G} from '../../common.js';
var Config = _config.wlanStatistics;
export default {
  created() {
    this.init()
    this.Inter = setInterval(() => {
      this.getData()
    }, 6000);
  },
  destroyed() {
    clearInterval(this.Inter)
    this.Inter = null
  },
  methods: {
    init (){
      this.vuex= vuex
      this.initdata(Config);
      this.getData()
    },
    getData(){
      this.sdk.get("GetWlanStatistics",null,(res)=>{
        this.formData = res;
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.main-box {
  min-height: 420px;
  height: auto!important;
  height: 420px;
  overflow: visible;
}


</style>