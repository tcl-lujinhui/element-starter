<template lang="jade">
  include ../components.jade
  #inbox
    +sideMenuPage('Services')
      +breadcrumb("Inbox")
      sim-state
      #inboxList
        p SMS Storage Status(Extant SMS/Total):{{page.usedSMSCount}}/{{page.maxSMSCount}}
        +button("Delete")(@click="deleteSMS",:disabled="page.select.length==0")
        el-table(:data="page.SMSList" stripe style="width: 100%" border @selection-change="handleSelectionChange" )
          el-table-column(prop="SMSType" label="State" style="width: 10%")
          el-table-column(prop="PhoneNumber" label="Number" style="width: 30%")
          el-table-column(prop="SMSContent" label="Content" style="width: 30%" show-overflow-tooltip=true inline-template)
            span(@click="smsDetails(row)" v-html="row.SMSContent")
          el-table-column(prop="SMSTime" label="Time" style="width: 20%")
          el-table-column(prop="SMSId" type="selection" style="width: 10%")
        el-pagination(@click="init",layout="prev,pager,next,jumper",@current-change="handleCurrentChange",:total="page.totalPageCount")
      #inboxDetail.hidden
        el-input(v-model="page.selectSMSNumber")
          span(slot="prepend") From:
        el-input(type="textarea",:rows.number=10 ,v-model="page.selectSMSContent")
        +button("Back")(@click="back")
        +button("Reply")(@click="replySMS(page.selectSMS)")
        +button("Forward")(@click="forwardSMS(page.selectSMS)")
        +button("Delete")(@click="deleteSingleSMS(page.selectSMSId)") 
      #writeSMS.hidden
        el-input(v-model="page.selectSMSNumber")
          span(slot="prepend") From:
        el-input(type="textarea",:rows.number=10 ,v-model="page.selectSMSContent")
        +button("Send")(@click="sendSMS")
        +button("Save")(@click="saveSMS")
        +button("Cancel")(@click="back")
</template>

<script>
import {_config,_,vuex,$} from '../../common.js';
let Config = _config.inbox
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

        //$("#inboxDetail").addClass("hidden");
        //$("#writeSMS").addClass("hidden");
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
        //if (selectId.length > 0) {
        this.$confirm('Delete the selected message(s) now?', 'Delete', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.sdk.post("DeleteSMS", selectId, results);
        }).catch(() => {
          this.init();
        });
        /*} else {
          let vm = this;
          vm.$alert('Please select you want to delete the content.', 'Error', {
            confirmButtonText: 'OK',
            callback: action => {
              this.init;
            }
          });
        }*/
      },
      handleSelectionChange(val) {
        this.page.select = val;
      },
      smsDetails(sms) {
        //console.log(sms);
        this.page.selectSMS = sms;
        this.page.selectSMSId = sms.SMSId;
        this.page.selectSMSNumber = sms.PhoneNumber[0];
        this.page.selectSMSContent = sms.SMSContent;
        $("#inboxList").addClass("hidden");
        $("#inboxDetail").removeClass("hidden");
        $("#writeSMS").addClass("hidden");
      },
      back() {
        $("#inboxList").removeClass("hidden");
        $("#inboxDetail").addClass("hidden");
        $("#writeSMS").addClass("hidden");
      },
      replySMS() {
        //$("#inboxList").addClass("hidden");
        //$("#inboxDetail").removeClass("hidden");
        this.page.selectSMSContent = "";
        $("#inboxList").addClass("hidden");
        $("#inboxDetail").addClass("hidden");
        $("#writeSMS").removeClass("hidden");
      },
      forwardSMS() {
        this.page.selectSMSNumber = "";
        $("#inboxList").addClass("hidden");
        $("#inboxDetail").addClass("hidden");
        $("#writeSMS").removeClass("hidden");
      },
      deleteSingleSMS(selectSMSId) {
        //console.log(selectSMSId);
        let selectId = [];
        selectId[0] = selectSMSId;
        let results = {
          callback: this.init
        };
        //console.log(selectId);
        this.$confirm('Delete the selected message(s) now?', 'Delete', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          alert(2222);
          this.sdk.post("DeleteSMS", selectId, results);
          $("#inboxList").removeClass("hidden");
          $("#inboxDetail").addClass("hidden");
          $("#writeSMS").addClass("hidden");
        }).catch(() => {
          //this.init();
          $("#inboxList").addClass("hidden");
          $("#inboxDetail").removeClass("hidden");
          $("#writeSMS").addClass("hidden");
        });
      },
      saveSMS() {
        let smsId = -1;
        let smsTime = this.getSystemTime();
        let smsContent = this.page.selectSMSContent;
        let number = this.page.selectSMSNumber;
        let results = {
          callback: this.init
        };
        //console.log(smsId);
        //console.log(smsTime);
        //console.log(smsContent);
        //console.log(number);
        this.sdk.post("SendSMS", {smsId, smsContent, number, smsTime}, results);
      },
      sendSMS() {
        let smsId = -1;
        let smsTime = this.getSystemTime();
        let smsContent = this.page.selectSMSContent;
        let number = this.page.selectSMSNumber;
        let results = {
          callback: this.init
        };
        //console.log(smsId);
        //console.log(smsTime);
        //console.log(smsContent);
        //console.log(number);
        this.sdk.post("SaveSMS", {smsId, smsContent, number, smsTime}, results);
      },
      getSystemTime() {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth() + 1;
        let currentDay = currentDate.getDate();
        let currentHours = currentDate.getHours();
        let currentMinutes = currentDate.getMinutes();
        let currentSecs = currentDate.getSeconds();
        let currentTime = "";
        currentTime += currentYear + "-";
        currentTime += ((currentMonth < 10) ? "0" : "") + currentMonth + "-";
        currentTime += ((currentDay < 10) ? "0" : "") + currentDay + " ";
        currentTime += ((currentHours < 10) ? "0" : "") + currentHours + ":";
        currentTime += ((currentMinutes < 10) ? "0" : "") + currentMinutes + ":";
        currentTime += ((currentSecs < 10) ? "0" : "") + currentSecs;
        return currentTime
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
#inboxDetail input{
  margin-top:20px;
}
</style>