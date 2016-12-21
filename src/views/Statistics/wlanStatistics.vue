<template lang="jade">
  include ../components.jade
  #wlanStatistics
    +sideMenuPage('Home')
      +breadcrumb("WLAN Statistics")
      div.main-box.border-notop
        fieldset.cbi-section
          table.table.table-bordered.table-tc
            tbody
              tr
                th(rowspan="2") Interface
                th(colspan="4") Received
                th(colspan="4") Sent
              tr
                th Byte
                th Packet 
                th Error 
                th Discarded 
                th Byte 
                th Packet  
                th Error 
                th Discarded
              tr(v-for="list in formData.List")
                th {{list.Ssid}}
                th {{list.ReceivedByte}}
                th {{list.ReceivedPacket}} 
                th {{list.ReceivedError}} 
                th {{list.ReceivedDiscarded}} 
                th {{list.SentByte}} 
                th {{list.SentPacket}}  
                th {{list.SentError}} 
                th {{list.SentDiscarded}}  
</template>
<script>
import _config from '../../config.js'
var Config = _config.wlanStatistics;
export default {
  created() {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
      this.sdk.get("GetWlanStatistics",null,(res)=>{
        this.formData = res;
      })
    },
    update (){
      this.submit("formData",()=>{
        this.sdk.post("",this.formData,(res)=>{
            this.reset()
          })
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