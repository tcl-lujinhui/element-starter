<template lang="jade">
  include ../components.jade
  #draft
    +sideMenuPage('Services')
      +breadcrumb("Draft")
      sim-state
        p SMS Storage Status(Extant SMS/Total):{{page.usedSMSCount}}/{{page.maxSMSCount}}
        +button("Delete")(@click="deleteSMS" ,:disabled="page.select.length==0")
        el-table(:data="page.SMSList" stripe style="width: 100%" border @selection-change="handleSelectionChange")
          el-table-column(prop="PhoneNumber" label="Number" style="width: 30%")
          el-table-column(prop="SMSContent" label="Content" style="width: 30%" show-overflow-tooltip=true)
          el-table-column(prop="SMSTime" label="Time" style="width: 20%")
          el-table-column(prop="SMSId" type="selection" style="width: 10%")
        el-pagination(@click="init",layout="prev,pager,next,jumper",@current-change="handleCurrentChange",:total="page.totalCount")
</template>

<script>
import {_config,_,vuex} from '../../common.js';
let Config = _config.draft
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          pageName: " ",
          SMSList: [],
          maxSMSCount:0,
          usedSMSCount:0,
          totalCount: 0,
          currentPage: 0,
          select: []
        };
        this.sdk.get("GetSMSStorageState", null, (res) => {
          this.page.maxSMSCount = res.MaxCount;
          this.page.usedSMSCount = res.TUseCount;
        })
        this.sdk.get("GetSMSListByContactNum", this.formData, (res) => {
          this.page.SMSList = res.SMSList;
          this.page.totalCount = res.TotalPageCount;
        })
      },
      deleteSMS() {
        //console.log(this.page.select);
        let selectId = [];
        let results = {
          callback: this.init
        };
        _.each(this.page.select, (k, v) => {
          //console.log(k);
          //console.log(v);
          selectId[v] = k.Id;
        })
        //console.log(selectId);
        if (selectId.length > 0) {
          //this.sdk.post("DeleteSMS", selectId, results);
          this.$confirm('Delete the selected message(s) now?', 'Delete', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.sdk.post("DeleteSMS", selectId, results);
          }).catch(() => {

          });
        } else {
          let vm = this;
          vm.$alert('Please select you want to delete the content.', 'Error', {
            confirmButtonText: 'OK',
            callback: action => {
              this.init;
            }
          });
        }
      },
      handleSelectionChange(val) {
        this.page.select = val;
        //console.log(val);
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
.el-pagination{
  float:right;
  margin:10px 0 0 0;
}
p{
  float:left;
  font-size:12px;
}
</style>