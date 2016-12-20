<template lang="jade">
  include ./components.jade
  #wanConfigure
    +sideMenuPage('Services')
      <!-- div {{$route.name}} -->
      +breadcrumb("{{page.pageName}}")
      
      <!-- +form("formData") -->
      sim-state
        +button("Delete")(@click="deleteCallLogs")
        el-table(:data="page.CallLogList" stripe style="width: 100%" border)
          el-table-column(prop="TelNumber" label="Phone Number" style="width: 30%")
          el-table-column(prop="Time" label="Holding Time" style="width: 30%")
          el-table-column(prop="DurationTime" label="Call Duration" style="width: 25%")
          el-table-column(type="selection" style="width: 15%")
</template>

<script>
import _Config from '../config.js'
import vuex from '../vuex.js';
let Config = _Config.callLogs
export default {
  created() {
      this.init()
    },
    watch: {
      '$route' (to, from) {
        this.init()
      }
    },
    methods: {
      init() {
        this.initdata(Config);
        this.vuex = vuex;
        vuex.initSimInfo();
        this.page = {
          pageName: " ",
          CallLogList: []
        };
        if (this.$route.name == "incomingCall") {
          this.page.pageName = "Incoming Call";
          this.formData.pageNum = 1;
          this.formData.type = 1;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
          })
        } else if (this.$route.name == "outgoingCall") {
          this.page.pageName = "Outgoing Call";
          this.formData.pageNum = 1;
          this.formData.type = 1;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
          })
        } else if (this.$route.name == "missedCall") {
          this.page.pageName = "Missed Call";
          this.formData.pageNum = 1;
          this.formData.type = 3;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
          })
        } else {
          this.page.pageName = "Incoming Call";
          this.formData.pageNum = 1;
          this.formData.type = 1;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
          })
        }
      },
      deleteCallLogs() {
        this.sdk.post("DeleteCallLog", callId, (res) => {
          if (this.requestJsonRpcIsOk(res)) {
                    ElementUI.Message.success("Succeeded!");
                  } else {
                    ElementUI.Message.error("Failed!");
                  }
          //console.log(res)
        })
      }
    }
}
</script>



<style lang="sass" scoped>
.el-button{
  float:right;
  margin:10px 0 10px 0;
  padding: 7px 9px;
  font-size: 12px;
}
table{
  margin-top:40px;
}
</style>