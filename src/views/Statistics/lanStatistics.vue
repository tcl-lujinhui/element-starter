<template lang="jade">
  include ../components.jade
  #lanStatistics
    +sideMenuPage('Home')
      +breadcrumb("ids_lan_Lan")
      div
        table.el-table.table-bordered.table-tc
          tbody
            tr
              th(rowspan="2") {{vuex.res.ids_lan_interface}}
              th(colspan="4") {{vuex.res.ids_wlan_received}}
              th(colspan="4") {{vuex.res.ids_statistics_send}}
            tr
              th {{vuex.res.ids_byte}}
              th {{vuex.res.ids_packet}} 
              th {{vuex.res.ids_statistics_error}} 
              th {{vuex.res.ids_discarded}} 
              th {{vuex.res.ids_byte}} 
              th {{vuex.res.ids_packet}}  
              th {{vuex.res.ids_statistics_error}} 
              th {{vuex.res.ids_discarded}}
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
.el-table{
  width: 80%;
  margin-top: 80px;
}
</style>

