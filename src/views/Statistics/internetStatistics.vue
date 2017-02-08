<template lang="jade">
  include ../components.jade
  #internetStatistics
    +sideMenuPage('Home')
      +breadcrumb("ids_internet")
      div.main-box.border-notop
        fieldset.cbi-section
          table.table.table-bordered.table-tc
            tbody
              tr
                th {{vuex.res.ids_type}}
                th {{vuex.res.ids_netwrok_currentVolume}}
                th {{vuex.res.ids_netwrok_totalVolumeMonthly}}
              tr
                th {{vuex.res.ids_download}}
                th {{page.connectionInfo.DlBytes | covertNum}}
                th {{page.UsageRecord.HCurrUseDL+page.UsageRecord.RCurrUseDL | covertNum}} 
              tr
                th {{vuex.res.ids_upload}}
                th {{page.connectionInfo.UlBytes | covertNum}}
                th {{page.UsageRecord.HCurrUseUL+page.UsageRecord.RCurrUseUL | covertNum}}  
                
              tr
                th {{vuex.res.ids_total}}
                th {{page.connectionInfo.DlBytes+page.connectionInfo.UlBytes | covertNum}}
                th {{page.UsageRecord.HCurrUseDL+page.UsageRecord.RCurrUseDL+page.UsageRecord.HCurrUseUL+page.UsageRecord.RCurrUseUL | covertNum}} 
                 
              tr
                th {{vuex.res.ids_duration}}
                th {{page.connectionInfo.ConnectionTime | covertNum}}
                th {{page.UsageRecord.TConnTimes | covertNum}}  

        div.noteTips {{vuex.res.ids_note}}:<br /> {{vuex.res.ids_netwrok_statisticsDescription}}
</template>
<script>
import {_,_config,$,vuex,G} from '../../common.js';
var Config = _config.internetStatistics;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex= vuex
        this.initdata(Config);
        this.page = {
          UsageRecord: {},
          connectionInfo: {}
        };
        this.sdk.get("GetUsageRecord", null, (res) => {
          this.page.UsageRecord=res
        });
        this.sdk.get("GetConnectionState", null, (res) => {
          this.page.connectionInfo = res;
        });
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
    width: 33.3%;
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