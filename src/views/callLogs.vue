<template lang="jade">
  include ./components.jade
  #callLogs
    +sideMenuPage('Services')
      +breadcrumb("{{page.pageName}}")
      sim-state
        +button("ids_delete")(@click="deleteCallLogs",:disabled="page.select.length==0")
        el-table(:data="page.displayCallLogListArtr" stripe style="width: 100%" border @selection-change="handleSelectionChange")
          el-table-column(prop="TelNumber" ,:label="vuex.res.ids_number" style="width: 30%" align="center")
          el-table-column(prop="Time" ,:label="vuex.res.ids_time" style="width: 30%" align="center")
          el-table-column(prop="DurationTime" ,:label="vuex.res.ids_duration" style="width: 25%" align="center")
          el-table-column(prop="Id" type="selection" style="width: 15%" align="center")
        el-pagination(layout="prev, pager, next,jumper",:page-size="10",:page-count="page.totalPageCount",@current-change="handleCurrentChange")
        
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
          displayCallLogListArtr: [],
          totalPageCount: 0,
          currentPage: 0,
          select: []
        };
        if (this.$route.name == "incomingCall") {
          this.page.pageName = this.vuex.res.ids_call_Incoming;
          this.formData.pageNum = this.page.currentPage;
          this.formData.type = 1;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
            this.page.totalPageCount = res.TotalPageCount;
            this.initTableList();
            console.log(res);
            console.log(this.page.CallLogList);
            console.log(this.page.totalPageCount );
          })
        } else if (this.$route.name == "outgoingCall") {
          this.page.pageName = this.vuex.res.ids_call_Outgoing;
          this.formData.pageNum = this.page.currentPage;
          this.formData.type = 2;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
            this.page.totalPageCount = res.TotalPageCount;
            this.initTableList();
          })
        } else if (this.$route.name == "missedCall") {
          this.page.pageName = this.vuex.res.ids_call_Missed;
          this.formData.pageNum = this.page.currentPage;
          this.formData.type = 3;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
            this.page.totalPageCount = res.TotalPageCount;
            this.initTableList();
          })
        } else {
          this.page.pageName = this.vuex.res.ids_call_Incoming;
          this.formData.pageNum = this.page.currentPage;
          this.formData.type = 0;
          this.sdk.get("GetCallLogList", this.formData, (res) => {
            this.page.CallLogList = res.CallLogList;
            this.page.totalPageCount = res.TotalPageCount;
            this.initTableList();
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
        this.$confirm(vuex.res['ids_call_deleteCallRecord'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['ids_delete'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          this.sdk.post("DeleteCallLog", selectId, results);
        }).catch(() => {
          this.init();
        });
      },
      handleSelectionChange(val) {
        this.page.select = val;
      },
      initTableList() {
        for (let n = 0; n < 10; n++) {
          if (this.page.CallLogList[n] != undefined) {
            this.page.displayCallLogListArtr[n] = this.page.CallLogList[n];
          }
        }
      },
      handleCurrentChange(val) {
        this.page.displayCallLogListArtr.splice(0, 10)
        for (let n = (val - 1) * 10; n < 10 * val; n++) {
          if (this.page.CallLogList[n] != undefined) {
            this.page.displayCallLogListArtr.push(this.page.CallLogList[n]);
          }
        }
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