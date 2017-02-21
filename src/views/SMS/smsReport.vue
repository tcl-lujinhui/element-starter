<template lang="jade">
  #smsReport
</template>

<script>
import {_config,vuex,$} from '../../common.js';
let Config = _config.smsReport;
export default {
  created() {
      this.init();
      setInterval(vuex.refreshSMSStorageState, 5000);
      //setInterval(this.getSMSStorageState, 5000);
    },
    watch: {
      'vuex.smsCount.TUseCount' (newValue, oldValue) {
        this.displaySMSReport();
      }
    },
    /*watch: {
      'this.page.smsCount' (newValue, oldValue) {
        this.displaySMSReport();
      }
    },*/
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          smsList: [],
          smsReport: []
            /*,
                      smsCount:0*/
        };
      },
      /*getSMSStorageState(){
        this.sdk.get("GetSMSStorageState", null, (res) => {
          this.page.smsCount= res.TUseCount;
        });
      },*/
      displaySMSReport() {
        let sendData = {
          "Page": 0,
          "key": "inbox"
        };
        this.sdk.get("GetSMSListByContactNum", sendData, (res) => {
          if (res != undefined && res.SMSList.length > 0) {
            $.extend(this.page.smsList, res.SMSList);
            //this.page.smsList = res.SMSList;
            for (let i = 0; i < this.page.smsList.length; i++) {
              if (this.page.smsList[i].SMSType == 4) {
                this.page.smsReport.push(this.page.smsList[i]);
              }
            }
            if (this.page.smsReport.length > 0) {
              this.$notify.info({
                title: this.vuex.res.ids_sms_deliveryReport,
                message: this.vuex.res.ids_sms_successfullyDeliveredReport + " " + this.page.smsReport[0].PhoneNumber,
                offset: 100,
                onClose: this.deleteReport()
              });
            }
          }
        });
      },
      deleteReport(){
        let deletReportId=[];
        deletReportId[0]=this.page.smsReport[0].SMSId;
        let deleteInfo = {
            "DelFlag": 2,
            //"ContactId": "",
            "SMSId": deletReportId
          };
         this.sdk.post("DeleteSMS", deleteInfo, (res) => {
          deletReportId.splice(0,1);
          //console.log(this.page.smsReport[0].SMSId);
        });
      },
      read() {
        this.sdk.get("GetSingleSMS", {
          SMSId: this.page.smsReport[0].SMSId
        }, (res) => {
          //console.log(this.page.smsReport[0].SMSId);
        });
      }
    }
}
</script>

<style lang="sass" scoped>
.el-notification {
  bottom: 50;
  top: auto !important;
}
</style>