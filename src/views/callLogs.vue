<template lang="jade">
  include ./components.jade
  #callLogs
    +sideMenuPage('Services')
      +breadcrumb("{{page.pageName}}")
      sim-state
        +button("Delete")(@click="deleteCallLogs",:disabled="page.select.length==0")
        el-table(:data="page.CallLogList" stripe style="width: 100%" border @selection-change="handleSelectionChange")
          el-table-column(prop="TelNumber" label="Number" style="width: 30%" align="center")
          el-table-column(prop="Time" label="Time" style="width: 30%" align="center")
          el-table-column(prop="DurationTime" label="Duration" style="width: 25%" align="center")
          el-table-column(prop="Id" type="selection" style="width: 15%" align="center")
        el-pagination(@click="init",layout="prev,pager,next,jumper",@current-change="handleCurrentChange",:total="page.totalCount")
        
</template>

<script>
import {_config,_,vuex} from '../common.js';
let Config = _config.callLogs;
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
        vuex.initSimInfo();
        this.page = {
          pageName: " ",
          CallLogList: [],
          totalCount: 0,
          currentPage: 0,
          select: []
        };

        if (this.$route.name == "incomingCall") {
          this.page.pageName = "Incoming Call";
          this.formData.pageNum = this.page.currentPage;
          this.formData.type = 1;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
            this.page.totalCount = res.TotalPageCount * 10;
          })
        } else if (this.$route.name == "outgoingCall") {
          this.page.pageName = "Outgoing Call";
          this.formData.pageNum = this.page.currentPage;
          this.formData.type = 2;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
            this.page.totalCount = res.TotalPageCount * 10;
          })
        } else if (this.$route.name == "missedCall") {
          this.page.pageName = "Missed Call";
          this.formData.pageNum = this.page.currentPage;
          this.formData.type = 3;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
            this.page.totalCount = res.TotalPageCount * 10;
          })
        } else {
          this.page.pageName = "Incoming Call";
          this.formData.pageNum = this.page.currentPage;
          this.formData.type = 0;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
            this.page.totalCount = res.TotalPageCount * 10;
          })
        }
      },
      deleteCallLogs() {
        let selectId = [];
        _.each(this.page.select, (k, v) => {
          selectId[v] = k.Id;
        })
        let results = {
          callback: this.init
        };
        this.$confirm('Delete the selected call log(s) now?', 'Delete', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.sdk.post("DeleteCallLog", selectId, results);
        }).catch(() => {
          this.clearSelection;
        });
      },
      handleSelectionChange(val) {
        this.page.select = val;
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
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
.el-table{
  margin-top:40px;
}
.el-pagination{
  float:right;
  margin:10px 0 0 0;
}
/* .el-table,.el-table th{
  text-align: center;
} */
</style>