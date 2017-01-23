<template lang="jade">
  include ../components.jade
  #wlanStatistics
    +sideMenuPage('Home')
      +breadcrumb("ids_wifi_WiFiTitle")
      div.main-box.border-notop
        fieldset.cbi-section
          table.table.table-bordered.table-tc
            tbody
              tr
                th(rowspan="2") {{vuex.res.ids_lan_interface}}
                th(colspan="4") {{vuex.res.ids_wlan_received}}
                th(colspan="4") {{vuex.res.ids_send}}
              tr
                th {{vuex.res.ids_byte}}
                th {{vuex.res.ids_packet}} 
                th {{vuex.res.ids_error}} 
                th {{vuex.res.ids_discarded}} 
                th {{vuex.res.ids_byte}} 
                th {{vuex.res.ids_packet}}   
                th {{vuex.res.ids_error}} 
                th {{vuex.res.ids_discarded}}
              tr(v-for="list in formData.List")
                th {{list.Ssid}}
                th {{list.ReceivedByte | covertNum}}
                th {{list.ReceivedPacket | covertNum}} 
                th {{list.ReceivedError | covertNum}} 
                th {{list.ReceivedDiscarded | covertNum}} 
                th {{list.SentByte | covertNum}} 
                th {{list.SentPacket | covertNum}}  
                th {{list.SentError | covertNum}} 
                th {{list.SentDiscarded | covertNum}}  
</template>
<script>
import {_,_config,$,vuex,G} from '../../common.js';
var Config = _config.wlanStatistics;
export default {
  created() {
    this.init()
  },
  methods: {
    init (){
      this.vuex= vuex
      this.initdata(Config);
      this.sdk.get("GetWlanStatistics",null,(res)=>{
        this.formData = res;
      })
    },
    update (){
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

.border-notop {
  -webkit-border-radius: 0 0 4px 4px;
  -moz-border-radius: 0 0 4px 4px;
  border-radius: 0 0 4px 4px;
  border-top: 0 none;
  padding: 15px;
}

.cbi-section {
  padding: 0;
  margin: 0;
  border: 0;
}

.table-bordered {
  border: 1px solid #dddddd;
  border-collapse: separate;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
}

table {
  max-width: 100%;
  background-color: transparent;
  border-spacing: 0;
}

.table-bordered th, .table-bordered td {
    border-left: 1px solid #dddddd;
}

table th {
    font-weight: normal;
}

table tr {
    height: 36px;
}

.table th, .table td {
    padding: 8px;
    line-height: 20px;
    text-align: left;
    vertical-align: top;
    border-top: 1px solid #dddddd;
}

.table-tc th, .table-tc td {
    vertical-align: middle;
    text-align: center;
}
</style>