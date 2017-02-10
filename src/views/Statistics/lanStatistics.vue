<template lang="jade">
  include ../components.jade
  #lanStatistics
    +sideMenuPage('Home')
      +breadcrumb("ids_lan_Lan")
      div.main-box
        table.table.table-bordered.table-tc
          tbody
            tr
              th(rowspan="2") {{vuex.res.ids_lan_interface}}
              th(colspan="4") {{vuex.res.ids_wlan_received}}
              th(colspan="4") {{vuex.res.ids_send}}
            tr
              td {{vuex.res.ids_byte}}
              td {{vuex.res.ids_packet}} 
              td {{vuex.res.ids_error}} 
              td {{vuex.res.ids_discarded}} 
              td {{vuex.res.ids_byte}} 
              td {{vuex.res.ids_packet}}  
              td {{vuex.res.ids_error}} 
              td {{vuex.res.ids_discarded}}
            tr(v-for="list in formData.List")
              td {{list.LanFlag}}
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
var Config = _config.lanStatistics;
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
      init() {
        this.vuex=vuex
        this.initdata(Config);
        this.getData()
      },
      getData(){
        this.sdk.get("GetLanStatistics",null,(res)=>{
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
.table{
  font-size: 14px;
  width: 80%;
  margin: 50px auto 10px;
  border-spacing: 0;
  border-collapse: collapse;
  border: 1px solid #eee;
  background:#fff;
  tr,tr th,tr td{
    text-align: center;
    border: 1px solid #eee;
    padding:8px;
  }
}

</style>

