<template lang="jade">
  include ../components.jade
  #outbox
    +sideMenuPage('Services')
      +breadcrumb("ids_sms_outbox")
      sim-state
        #outboxList(:class="{hidden:page.outboxListDisplay}")
          p {{vuex.res.ids_sms_storageStatus}}:{{page.usedSMSCount}}/{{page.maxSMSCount}}
          #btnDelete
            +button("ids_delete")(@click="deleteSMS",:disabled="page.select.length==0")
          el-table(:data="page.displayOutboxListArtr" stripe style="width: 100%" border @selection-change="handleSelectionChange")
            el-table-column(prop="PhoneNumber" ,:label="vuex.res.ids_sms_phoneNumber" width="180px" inline-template)
              span(@click="smsDetails(row)" v-html="row.PhoneNumber[0]")
            el-table-column(prop="SMSContent" ,:label="vuex.res.ids_sms_content" width="348px" show-overflow-tooltip=true inline-template)
              span(@click="smsDetails(row)" v-html="row.SMSContent")
            el-table-column(prop="SMSTime" ,:label="vuex.res.ids_time" width="180px" inline-template)
              span(@click="smsDetails(row)" v-html="row.SMSTime")
            el-table-column(prop="SMSId" type="selection" width="50px")
          el-pagination(layout="prev, pager, next,jumper",:page-size="page.PageSize",:page-count="page.totalPageCount",@current-change="handleCurrentChange")
        #outboxDetail(:class="{hidden:page.outboxDetailDisplay}")
          el-input(v-model="page.selectSMSNumber" readonly="readonly")
            span(slot="prepend") {{vuex.res.ids_sms_from}}:
          el-input(type="textarea",:rows.number=10 ,v-model="page.selectSMSContent" readonly="readonly")
          #btnList
            #btnLeft
              +button("ids_backup")(@click="back")
            #btnRight
              +button("ids_sms_buttonReply")(@click="replySMS(page.selectSMS)")
              +button("ids_sms_buttonForward")(@click="forwardSMS(page.selectSMS)")
              +button("ids_delete")(@click="deleteSingleSMS(page.selectSMSId)")
</template>

<script>
import {_config,_,vuex,$} from '../../common.js';
import sms from '../../config/sms.js';
let Config = _config.outbox;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          pageName: " ",
          outboxSMSList: [],
          displayOutboxListArtr: [],
          maxSMSCount: 0,
          usedSMSCount: 0,
          totalPageCount: 0,
          currentPage: 0,
          select: {},
          selectSMS: {},
          selectSMSId: 0,
          selectSMSNumber: "",
          selectSMSContent: "",
          PageSize: 10,
          outboxListDisplay: false,
          outboxDetailDisplay: true
        };
        this.sdk.get("GetSMSStorageState", null, (res) => {
          this.page.maxSMSCount = res.MaxCount;
          //this.page.usedSMSCount = res.TUseCount;
          this.page.usedSMSCount = res.MaxCount-res.LeftCount;
        });
        let sendData = {
          "Page": 0,
          "key": "send"
        };
        this.sdk.get("GetSMSListByContactNum", sendData, (res) => {
          if(res!=undefined&&res.SMSList.length>0){
          $.extend(this.page.outboxSMSList, res.SMSList);
          //this.page.outboxSMSList = res.SMSList;
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
            //"ContactId": "",
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
      smsDetails(sms) {
        this.page.selectSMS = sms;
        this.page.selectSMSId = sms.SMSId;
        this.page.selectSMSNumber = sms.PhoneNumber[0];
        this.page.selectSMSContent = sms.SMSContent;
        this.page.outboxListDisplay = true;
        this.page.outboxDetailDisplay = false;
        if (sms.SMSType == 1) {
          this.sdk.get("GetSingleSMS", {
            SMSId: sms.SMSId
          }, (res) => {
            //console.log("read"+sms.SMSId);
          });
        }
      },
      back() {
        //sms.smsGoBack("outbox");
        this.page.outboxListDisplay = false;
        this.page.outboxDetailDisplay = true;
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
        let deleteInfo = {
            "DelFlag": 2,
            //"ContactId": "",
            "SMSId": selectId
          };
        let results = {
          callback: this.init
        };
        this.$confirm(vuex.res['ids_sms_deleteSmsPrompt'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['ids_delete'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          this.sdk.post("DeleteSMS", deleteInfo, results);
          this.page.outboxListDisplay = false;
          this.page.outboxDetailDisplay = true;
        }).catch(() => {
          this.page.outboxListDisplay = true;
          this.page.outboxDetailDisplay = false;
        });
      },
      initTableList() {
        this.page.totalPageCount = Math.ceil(this.page.outboxSMSList.length / 10);
        for (let n = 0; n < this.page.PageSize; n++) {
          if (this.page.outboxSMSList[n] != undefined) {
            this.page.displayOutboxListArtr[n] = this.page.outboxSMSList[n];
          }
        }
      },
      handleCurrentChange(val) {
        this.page.displayOutboxListArtr.splice(0, this.page.PageSize)
        for (let n = (val - 1) * this.page.PageSize; n < this.page.PageSize * val; n++) {
          if (this.page.outboxSMSList[n] != undefined) {
            this.page.displayOutboxListArtr.push(this.page.outboxSMSList[n]);
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

.hidden {
  display: none;
}
 #outboxList,#outboxDetail{
  margin:20px 10px;
}
#outboxDetail .el-textarea{
  margin-top:50px;
}

#btnList {
  margin-top: 20px;
}

#btnList #btnLeft {
  float: left;
}

#btnList #btnRight {
  float: right;
}
</style>