<template lang="jade">
  include ../components.jade
  #internetStatistics
    +sideMenuPage('Home')
      +breadcrumb("ids_internet")
      div.internet
        +button("ids_network_resetStatistics")(type="primary" @click="resetStatistics")
      div.main-box
        table.table
          tbody
            tr
              th {{vuex.res.ids_type}}
              th {{vuex.res.ids_netwrok_currentVolume}}
              th {{vuex.res.ids_netwrok_totalVolumeMonthly}}
            tr
              td {{vuex.res.ids_download}}
              td {{page.connectionInfo.DlBytes | covertNum}}
              td {{page.UsageRecord.HCurrUseDL+page.UsageRecord.RCurrUseDL | covertNum}} 
            tr
              td {{vuex.res.ids_upload}}
              td {{page.connectionInfo.UlBytes | covertNum}}
              td {{page.UsageRecord.HCurrUseUL+page.UsageRecord.RCurrUseUL | covertNum}}  
              
            tr
              td {{vuex.res.ids_total}}
              td {{page.connectionInfo.DlBytes+page.connectionInfo.UlBytes | covertNum}}
              td {{page.UsageRecord.HCurrUseDL+page.UsageRecord.RCurrUseDL+page.UsageRecord.HCurrUseUL+page.UsageRecord.RCurrUseUL | covertNum}} 
               
            tr
              td {{vuex.res.ids_statistics_duration}}
              td {{page.connectionInfo.ConnectionTime | times('2')}}
              td {{page.UsageRecord.TConnTimes | times('2')}}  

        div.noteTips {{vuex.res.ids_note}}:<br /> {{vuex.res.ids_netwrok_statisticsDescription}}
</template>
<script>
import {
  _,
  _config,
  $,
  vuex,
  G,
  units
} from '../../common.js';
var Config = _config.internetStatistics;
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
        this.vuex = vuex
        this.units = units
        this.initdata(Config);
        this.page = {
          UsageRecord: {},
          connectionInfo: {}
        };
        this.getData()
      },
      getData() {
        this.sdk.get("GetUsageRecord", null, (res) => {
          this.page.UsageRecord = res
        });
        this.sdk.get("GetConnectionState", null, (res) => {
          this.page.connectionInfo = res;
        });
      },
      resetStatistics() {
        console.log(units.getSystemTime())
        let vm = this
        let params = {
          clear_time: units.getSystemTime()
        }
        this.sdk.post("SetUsageRecordClear", params, {
          callback: vm.init
        })
      }
    }
}
</script>

<style lang="sass" scoped>
.internet {
  float: right;
  margin-right: 78px;
  margin-top: 8px;
}

.main-box {
  min-height: 420px;
  height: auto!important;
  height: 420px;
  overflow: visible;
}

.table {
  font-size: 14px;
  width: 80%;
  margin: 50px auto 10px;
  border-spacing: 0;
  border-collapse: collapse;
  border: 1px solid #fff;
  background: #fff;
  tr,
  tr th,
  tr td {
    text-align: center;
    border: 2px solid #fff;
    padding: 8px;
  }
}

.table tr:nth-child(odd) td,
.table tr:nth-child(odd) th {
  background: #eee;
}

.table tr:nth-child(even) td {
  background: #f5f5f5;
}

.noteTips {
  width: 80%;
  margin: 0 auto;
}
</style>