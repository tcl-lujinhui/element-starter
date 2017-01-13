<template lang="jade">
  include ../components.jade
  #draft
    +sideMenuPage('Services')
      +breadcrumb("ids_sms_draft")
      sim-state
      #draftList
        p {{vuex.res.ids_sms_storageStatus}}:{{page.usedSMSCount}}/{{page.maxSMSCount}}
        +button("Delete")(@click="deleteSMS",:disabled="page.select.length==0")
        el-table(:data="page.displayDraftListArtr" stripe style="width: 100%" border @selection-change="handleSelectionChange")
          el-table-column(prop="PhoneNumber" ,:label="vuex.res.ids_sms_phoneNumber" style="width: 30%" inline-template)
            span(@click="smsDetails(row)" v-html="row.PhoneNumber[0]")
          el-table-column(prop="SMSContent" ,:label="vuex.res.ids_sms_content" style="width: 30%" show-overflow-tooltip=true inline-template)
            span(@click="smsDetails(row)" v-html="row.SMSContent")
          el-table-column(prop="SMSTime" ,:label="vuex.res.ids_time" style="width: 20%" inline-template)
            span(@click="smsDetails(row)" v-html="row.SMSTime")
          el-table-column(prop="SMSId" type="selection" style="width: 10%")
        el-pagination(layout="prev, pager, next,jumper",:page-size="page.PageSize",:page-count="page.totalPageCount",@current-change="handleCurrentChange")
</template>
<script>
import {_config,_,vuex,$} from '../../common.js';
import sms from '../../config/sms.js'
let Config = _config.draft
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.vuex=vuex;
        this.page = {
          pageName: " ",
          SMSList: [],
          displayDraftListArtr: [],
          maxSMSCount: 0,
          usedSMSCount: 0,
          totalPageCount: 0,
          currentPage: 0,
          select: [],
          PageSize: 10
        };
        this.sdk.get("GetSMSStorageState", null, (res) => {
          this.page.maxSMSCount = res.MaxCount;
          this.page.usedSMSCount = res.TUseCount;
        });
        let sendData = {
          "Page": 0,
          "key": "draft"
        };
        this.sdk.get("GetSMSListByContactNum", sendData, (res) => {
          this.page.SMSList = res.SMSList;
          this.page.totalPageCount = res.TotalPageCount;
          this.initTableList();
        });
      },
      deleteSMS() {
        let selectId = [];
        let results = {
          callback: this.init
        };
        _.each(this.page.select, (k, v) => {
          selectId[v] = k.Id;
        });
        this.$confirm(vuex.res['ids_sms_deleteSmsPrompt'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['ids_delete'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          this.sdk.post("DeleteSMS", selectId, results);
        }).catch(() => {
          this.init();
        });
      },
      handleSelectionChange(val) {
        this.page.select = val;
      },
      smsDetails(selectSMS) {
        let smsInfo = {
          SMSId: selectSMS.SMSId,
          PhoneNumber: selectSMS.PhoneNumber[0],
          SMSContent: selectSMS.SMSContent,
          SMSTime: selectSMS.SMSTime
        };
        sms.doEdit(this.$router, smsInfo);
      },
      initTableList() {
        for (let n = 0; n < this.page.PageSize; n++) {
          if (this.page.SMSList[n] != undefined) {
            this.page.displayDraftListArtr[n] = this.page.SMSList[n];
            //-console.log(this.page.displayDraftListArtr.length)
          }
        }
      },
      handleCurrentChange(val) {
        this.page.displayDraftListArtr.splice(0, this.page.PageSize)
        for (let n = (val - 1) * this.page.PageSize; n < this.page.PageSize * val; n++) {
          if (this.page.SMSList[n] != undefined) {
            this.page.displayDraftListArtr.push(this.page.SMSList[n]);
          }
        }
      }
    }
}
</script>

<style lang="sass" scoped>
.el-button {
  float: right;
  margin: 10px 0 10px 0;
  padding: 7px 9px;
  font-size: 12px;
}
.el-pagination {
  float: right;
  margin: 10px 0 0 0;
}
p {
  float: left;
  font-size: 12px;
}
.el-table th {
  text-align: center;
}
#draftList{
  margin:20px 10px;
}
</style>