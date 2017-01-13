<template lang="jade">
  include ../components.jade
  #inbox
    +sideMenuPage('Services')
      +breadcrumb("ids_sms_inbox")
      sim-state
      #inboxList
        p {{vuex.res.ids_sms_storageStatus}}:{{page.usedSMSCount}}/{{page.maxSMSCount}}
        +button("ids_delete")(@click="deleteSMS",:disabled="page.select.length==0")
        el-table(:data="page.displayInboxListArtr" stripe style="width: 100%" border @selection-change="handleSelectionChange")
          el-table-column(prop="SMSType" ,:label="vuex.res.ids_state" style="width: 10%" inline-template)
            span(@click="smsDetails(row)" v-html="row.SMSType")
          el-table-column(prop="PhoneNumber" ,:label="vuex.res.ids_sms_phoneNumber" style="width: 30%" inline-template)
            span(@click="smsDetails(row)" v-html="row.PhoneNumber[0]")
          el-table-column(prop="SMSContent" ,:label="vuex.res.ids_sms_content" style="width: 30%" show-overflow-tooltip=true inline-template)
            span(@click="smsDetails(row)" v-html="row.SMSContent")
          el-table-column(prop="SMSTime" ,:label="vuex.res.ids_time" style="width: 20%" inline-template)
            span(@click="smsDetails(row)" v-html="row.SMSTime")
          el-table-column(prop="SMSId" type="selection" style="width: 10%")
        el-pagination(layout="prev, pager, next,jumper",:page-size="page.PageSize",:page-count="page.totalPageCount",@current-change="handleCurrentChange")
      #inboxDetail.hidden
        el-input(v-model="page.selectSMSNumber" readonly="readonly")
          span(slot="prepend") {{vuex.res.ids_sms_from}}:
        el-input(type="textarea",:rows.number=10 ,v-model="page.selectSMSContent" readonly="readonly")
        #btnList
          +button("ids_backup")(@click="back")
          +button("ids_sms_buttonReply")(@click="replySMS(page.selectSMS)")
          +button("ids_sms_buttonForward")(@click="forwardSMS(page.selectSMS)")
          +button("ids_delete")(@click="deleteSingleSMS(page.selectSMSId)")
</template>
<script>
import {_config,_,vuex,$} from '../../common.js';
import sms from '../../config/sms.js';
let Config = _config.inbox;
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
          displayInboxListArtr: [],
          maxSMSCount: 0,
          usedSMSCount: 0,
          totalPageCount: 0,
          currentPage: 0,
          select: [],
          selectSMS: {},
          selectSMSId: 0,
          selectSMSNumber: "",
          selectSMSContent: "",
          PageSize: 10
        };
        this.sdk.get("GetSMSStorageState", null, (res) => {
          this.page.maxSMSCount = res.MaxCount;
          this.page.usedSMSCount = res.TUseCount;
        });
        let sendData = {
          "Page": 0,
          "key": "inbox"
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
      smsDetails(sms) {
        this.page.selectSMS = sms;
        this.page.selectSMSId = sms.SMSId;
        this.page.selectSMSNumber = sms.PhoneNumber[0];
        this.page.selectSMSContent = sms.SMSContent;
        $("#inboxList").addClass("hidden");
        $("#inboxDetail").removeClass("hidden");
      },
      back() {
        sms.smsGoBack("inbox");
      },
      replySMS() {
        let replyData = {
          PhoneNumber: this.page.selectSMSNumber,
          SMSContent: "",
        };

        sms.doReply(this.$router, replyData);
      },
      forwardSMS() {
        let forwardData = {
          PhoneNumber: "",
          SMSContent: this.page.selectSMSContent,
        };

        sms.doForward(this.$router, forwardData);
      },
      deleteSingleSMS(selectSMSId) {
        let selectId = [];
        selectId[0] = selectSMSId;
        let results = {
          callback: this.init
        };
        this.$confirm(vuex.res['ids_sms_deleteSmsPrompt'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['ids_delete'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          this.sdk.post("DeleteSMS", selectId, results);
          $("#inboxList").removeClass("hidden");
          $("#inboxDetail").addClass("hidden");
        }).catch(() => {
          $("#inboxList").addClass("hidden");
          $("#inboxDetail").removeClass("hidden");
        });
      },
      initTableList() {
        for (let n = 0; n < this.page.PageSize; n++) {
          if (this.page.SMSList[n] != undefined) {
            this.page.displayInboxListArtr[n] = this.page.SMSList[n];
          }
        }
      },
      handleCurrentChange(val) {
        this.page.displayInboxListArtr.splice(0, this.page.PageSize)
        for (let n = (val - 1) * this.page.PageSize; n < this.page.PageSize * val; n++) {
          if (this.page.SMSList[n] != undefined) {
            this.page.displayInboxListArtr.push(this.page.SMSList[n]);
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
.hidden {
    display: none;
}

#inboxList,#inboxDetail{
  margin:20px 10px;
}
#inboxDetail .el-textarea{
  margin-top:50px;
}
#btnList{
  float:left;
  margin-top:20px;
}
</style>