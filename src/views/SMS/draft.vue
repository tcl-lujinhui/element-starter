<template lang="jade">
  include ../components.jade
  #draft
    +sideMenuPage('Services')
      +breadcrumb("ids_sms_draft")
      sim-state
        #draftList
          p {{vuex.res.ids_sms_storageStatus}}:{{page.usedSMSCount}}/{{page.maxSMSCount}}
          #btnDelete
            +button("ids_delete")(@click="deleteSMS",:disabled="page.select.length==0")
          el-table(:data="page.displayDraftListArtr" stripe style="width: 100%" border @selection-change="handleSelectionChange")
            el-table-column(prop="PhoneNumber" ,:label="vuex.res.ids_sms_phoneNumber" width="180px" inline-template)
              span(@click="smsDetails(row)" v-html="row.PhoneNumber[0]")
            el-table-column(prop="SMSContent" ,:label="vuex.res.ids_sms_content" width="348px" show-overflow-tooltip=true inline-template)
              span(@click="smsDetails(row)" v-html="row.SMSContent")
            el-table-column(prop="SMSTime" ,:label="vuex.res.ids_time" width="180px" inline-template)
              span(@click="smsDetails(row)" v-html="row.SMSTime")
            el-table-column(prop="SMSId" type="selection" width="50px")
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
        this.vuex = vuex;
        this.page = {
          pageName: " ",
          draftSMSList: [],
          displayDraftListArtr: [],
          maxSMSCount: 0,
          usedSMSCount: 0,
          totalPageCount: 0,
          currentPage: 0,
          select: {},
          PageSize: 10
        };
        this.sdk.get("GetSMSStorageState", null, (res) => {
          this.page.maxSMSCount = res.MaxCount;
          //this.page.usedSMSCount = res.TUseCount;
          this.page.usedSMSCount = res.MaxCount-res.LeftCount;
        });
        let sendData = {
          "Page": 0,
          "key": "draft"
        };
        this.sdk.get("GetSMSListByContactNum", sendData, (res) => {
          if(res!=undefined&&res.SMSList.length>0){
            $.extend(this.page.draftSMSList, res.SMSList);
          //this.page.draftSMSList = res.SMSList;
          //this.page.totalPageCount = res.TotalPageCount;
          this.initTableList();
        }
        });
      },
      deleteSMS() {
        let selectId = [];
        let results = {
          callback: this.init
        };
        _.each(this.page.select, (k, v) => {
          selectId[v] = k.SMSId;
        });
        this.$confirm(vuex.res['ids_sms_deleteSmsPrompt'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['ids_delete'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          let deleteInfo = {
            "DelFlag": 2,
            "ContactId": "",
            "SMSId": selectId
          };
          this.sdk.post("DeleteSMS", deleteInfo, results);
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
        this.page.totalPageCount = Math.ceil(this.page.draftSMSList.length / 10);
        for (let n = 0; n < this.page.PageSize; n++) {
          if (this.page.draftSMSList[n] != undefined) {
            this.page.displayDraftListArtr[n] = this.page.draftSMSList[n];
          }
        }
      },
      handleCurrentChange(val) {
        this.page.displayDraftListArtr.splice(0, this.page.PageSize)
        for (let n = (val - 1) * this.page.PageSize; n < this.page.PageSize * val; n++) {
          if (this.page.draftSMSList[n] != undefined) {
            this.page.displayDraftListArtr.push(this.page.draftSMSList[n]);
          }
        }
      }
    }
}
</script>

<style lang="sass" scoped>
#btnDelete {
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