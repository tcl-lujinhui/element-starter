<template lang="jade">
  include ../components.jade
  #inbox
    +sideMenuPage('Services')
      +breadcrumb("ids_sms_inbox")
      sim-state
        #inboxList(:class="{hidden:page.inboxListDisplay}")
          p {{vuex.res.ids_sms_storageStatus}}:{{page.usedSMSCount}}/{{page.maxSMSCount}}
          #btnDelete
            +button("ids_delete")(@click="deleteSMS",:disabled="page.select.length==0")
          el-table(:data="page.displayInboxListArtr" stripe style="width: 100%" border @selection-change="handleSelectionChange")
            el-table-column(prop="SMSType" ,:label="vuex.res.ids_state" width="80px" inline-template)
              span.read(@click="smsDetails(row)" ,:class="{unread:row.SMSType==1}")
            el-table-column(prop="PhoneNumber" ,:label="vuex.res.ids_sms_phoneNumber" width="150px" inline-template)
              span(@click="smsDetails(row)" v-html="row.PhoneNumber[0]")
            el-table-column(prop="SMSContent" ,:label="vuex.res.ids_sms_content" width="298px" show-overflow-tooltip=true inline-template)
              span(@click="smsDetails(row)" v-html="row.SMSContent")
            el-table-column(prop="SMSTime" ,:label="vuex.res.ids_time" width="180px" inline-template)
              span(@click="smsDetails(row)" v-html="row.SMSTime")
            el-table-column(prop="SMSId" type="selection" width="50px")
          //-div.jumper
            el-button.btnGo(type="primary" size="small" @click="jumperGo") {{vuex.res.ids_go}}
            el-input(type="text" name="jumperInput" v-model="page.jumperVal")
          el-pagination(layout="prev, pager, next, jumper",:page-size="page.PageSize",:page-count="page.totalPageCount",@current-change="handleCurrentChange")
        #inboxDetail(:class="{hidden:page.inboxDetailDisplay}")
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
let Config = _config.inbox;
export default {
  created() {
      this.init();
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          pageName: " ",
          inboxSMSList: [],
          displayInboxListArtr: [],
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
          inboxListDisplay: false,
          inboxDetailDisplay: true/*,
          jumperVal:1*/
        };
        this.sdk.get("GetSMSStorageState", null, (res) => {
          if(res!=undefined){
            this.page.maxSMSCount = res.MaxCount;
            //this.page.usedSMSCount = res.TUseCount;
            this.page.usedSMSCount = res.MaxCount-res.LeftCount;
          }
        });
        let sendData = {
          "Page": 0,
          "key": "inbox"
        };
        this.sdk.get("GetSMSListByContactNum", sendData, (res) => {
          if(res!=undefined&&res.SMSList.length>0){
            $.extend(this.page.inboxSMSList, res.SMSList);
            //this.page.inboxSMSList = res.SMSList;
            for (let i = 0; i < this.page.inboxSMSList.length; i++) {
            if (this.page.inboxSMSList[i].SMSType == 4) {
              this.page.inboxSMSList.splice(i, 1);
            }
          }
          this.initTableList();
          }/*else{
            this.page.inboxSMSList={
              "PhoneNumber": [],
        "SMSId": 0,
        "SMSType": 0,
        "SMSContent": "",
        "SMSTime": ""
            }
          }*/
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
            "DelFlag": 3,
            "SMSArray": selectId
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
        this.page.inboxListDisplay = true;
        this.page.inboxDetailDisplay = false;
        if (sms.SMSType == 1) {
          this.sdk.get("GetSingleSMS", {
            SMSId: sms.SMSId
          }, (res) => {
            //console.log("read"+sms.SMSId);
          });
        }
      },
      back() {
        //sms.smsGoBack("inbox");
        this.page.inboxListDisplay = false;
        this.page.inboxDetailDisplay = true;
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
            "DelFlag": 3,
            "SMSArray": selectId
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
          this.page.inboxListDisplay = false;
          this.page.inboxDetailDisplay = true;
        }).catch(() => {
          this.page.inboxListDisplay = true;
          this.page.inboxDetailDisplay = false;
        });
      },
      initTableList() {
        this.page.totalPageCount = Math.ceil(this.page.inboxSMSList.length / 10);
        for (let n = 0; n < this.page.PageSize; n++) {
          if (this.page.inboxSMSList[n] != undefined) {
            this.page.displayInboxListArtr[n] = this.page.inboxSMSList[n];
          }
        }
      },
      handleCurrentChange(val) {
        this.page.displayInboxListArtr.splice(0, this.page.PageSize)
          //this.page.jumperVal = val;
        for (let n = (val - 1) * this.page.PageSize; n < this.page.PageSize * val; n++) {
          if (this.page.inboxSMSList[n] != undefined) {
            this.page.displayInboxListArtr.push(this.page.inboxSMSList[n]);
          }
        }
      }/*,
      jumperGo(){
        let _self = this;
        let val = $("input[name='jumperInput']").val();
        if(val!=""){
            $(".el-pagination").find(".el-pager .number").each(function(){
                if($(this).html() == val){
                    $(".el-pagination").find(".el-pager .number").removeClass('active');
                    $(this).addClass('active');
                    _self.handleCurrentChange(val);
                }
            })
        }
      }*/
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

.hidden {
  display: none;
}

#inboxList,
#inboxDetail {
  margin: 20px 10px;
}

#inboxDetail .el-textarea {
  margin-top: 50px;
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

.read {
  background-image: url(../../images/icon/message_allread.png);
  display: block;
  width: 32px;
  height: 32px;
}

.unread {
  background-image: url(../../images/icon/message.png);
}
</style>


