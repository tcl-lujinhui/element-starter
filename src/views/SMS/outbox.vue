<template lang="jade">
  include ../components.jade
  #outbox
    +sideMenuPage('Services')
      +breadcrumb("Outbox")
      sim-state
      #outboxList
        p SMS Storage Status(Extant SMS/Total):{{page.usedSMSCount}}/{{page.maxSMSCount}}
        +button("Delete")(@click="deleteSMS",:disabled="page.select.length==0")
        el-table(:data="page.SMSList" stripe style="width: 100%" border @selection-change="handleSelectionChange")
          el-table-column(prop="PhoneNumber" label="Number" style="width: 30%" inline-template)
            span(@click="smsDetails(row)" v-html="row.PhoneNumber[0]")
          el-table-column(prop="SMSContent" label="Content" style="width: 30%" show-overflow-tooltip=true inline-template)
            span(@click="smsDetails(row)" v-html="row.SMSContent")
          el-table-column(prop="SMSTime" label="Time" style="width: 20%" inline-template)
            span(@click="smsDetails(row)" v-html="row.SMSTime")
          el-table-column(prop="SMSId" type="selection" style="width: 10%")
        el-pagination(@click="init",layout="prev,pager,next,jumper",@current-change="handleCurrentChange",:total="page.totalPageCount")
      #outboxDetail.hidden
        el-input(v-model="page.selectSMSNumber")
          span(slot="prepend") From:
        el-input(type="textarea",:rows.number=10 ,v-model="page.selectSMSContent")
        #btnList
          +button("Back")(@click="back")
          +button("Reply")(@click="replySMS(page.selectSMS)")
          +button("Forward")(@click="forwardSMS(page.selectSMS)")
          +button("Delete")(@click="deleteSingleSMS(page.selectSMSId)")
</template>
<script>
import {_config,_,vuex,$} from '../../common.js';
import sms from '../../config/sms.js'
let Config = _config.outbox
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
          maxSMSCount: 0,
          usedSMSCount: 0,
          totalPageCount: 0,
          currentPage: 0,
          select: [],
          selectSMS: {},
          selectSMSId: 0,
          selectSMSNumber: "",
          selectSMSContent: ""
        };
        this.sdk.get("GetSMSStorageState", null, (res) => {
          this.page.maxSMSCount = res.MaxCount;
          this.page.usedSMSCount = res.TUseCount;
        })
        this.sdk.get("GetSMSListByContactNum", this.formData, (res) => {
          this.page.SMSList = res.SMSList;
          this.page.totalPageCount = res.TotalPageCount;
        })
      },
      deleteSMS() {
        let selectId = [];
        let results = {
          callback: this.init
        };
        _.each(this.page.select, (k, v) => {
          selectId[v] = k.Id;
        });
        this.$confirm('Delete the selected message(s) now?', 'Delete', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
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
        $("#outboxList").addClass("hidden");
        $("#outboxDetail").removeClass("hidden");
      },
      back() {
        sms.smsGoBack("outbox");
      },
      replySMS() {
        let replyData={
          PhoneNumber:this.page.selectSMSNumber,
          SMSContent:"",
        };
        
        sms.doReply(this.$router,replyData);
      },
      forwardSMS() {
        let forwardData={
          PhoneNumber:"",
          SMSContent:this.page.selectSMSContent,
        };

        sms.doForward(this.$router,forwardData);
      },
      deleteSingleSMS(selectSMSId) {
        let selectId = [];
        selectId[0] = selectSMSId;
        let results = {
          callback: this.init
        };
        this.$confirm('Delete the selected message(s) now?', 'Delete', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          alert(2222);
          this.sdk.post("DeleteSMS", selectId, results);
          $("#outboxList").removeClass("hidden");
          $("#outboxDetail").addClass("hidden");
        }).catch(() => {
          $("#outboxList").addClass("hidden");
          $("#outboxDetail").removeClass("hidden");
        });
      },
      saveSMS() {
       let saveData={
          smsId : -1,
          smsTime : sms.getSystemTime(),
          smsContent : this.page.selectSMSContent,
          number : this.page.selectSMSNumber
        };
        sms.saveEvent(saveData);
        this.$router.push('draft')
      },
      sendSMS() {
        let sendData={
          smsId : -1,
          smsTime : sms.getSystemTime(),
          smsContent : this.page.selectSMSContent,
          number : this.page.selectSMSNumber
        };
        sms.sendEvent(sendData);
        $("#outboxList").removeClass("hidden");
        $("#outboxDetail").addClass("hidden");
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
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
 #outboxList,#outboxDetail{
  margin:20px 10px;
}
#outboxDetail .el-textarea{
  margin-top:50px;
}
#btnList{
  float:left;
  margin-top:20px;
}
</style>