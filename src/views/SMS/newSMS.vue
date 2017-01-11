<template lang="jade">
  include ../components.jade
  #newSMS
    +sideMenuPage('Services')
      +breadcrumb("New Message")
      //-+form("formData")(label-width="0px")
      #newSMSContent
        el-input(v-model="formData.PhoneNumber")
          span(slot="prepend") To:
        #smsNumberInputWarn.hidden Please input a mobile number.
        p(v-bind="listenCharCount()"){{page.length}}
        el-input(v-model="formData.SMSContent")(type="textarea",:rows.number=10)
        #smsMaxNumWarn.hidden The input is too large. Please delete some text; otherwise the message will not be sent.
        #btnSMS
          +button("Send")(@click="sendSMS")
          +button("Save")(@click="saveSMS")
          //-+button("Cancel")(@click="cancel")
      
</template>

<script>
import {
  _config,
  _,
  vuex,
  $
} from '../../common.js';
import sms from '../../config/sms.js'
let Config = _config.newSMS;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.vuex=vuex;
        this.listenCharCount();
        this.page = {
          length: 0,
          currentSmsCount: 0,
          maxSMSCount: 0,
          usedSMSCount: 0,
          smsCounts: 0
        };
        this.sdk.get("GetSMSStorageState", null, (res) => {
          this.page.maxSMSCount = res.MaxCount;
          this.page.usedSMSCount = res.TUseCount;
        });
      },

      saveSMS() {
        let saveData = {
          smsId: -1,
          smsTime: sms.getSystemTime(),
          smsContent: this.formData.SMSContent,
          number: this.formData.PhoneNumber
        };
        let results = {
          callback: this.init
        };
        let realCount = this.page.usedSMSCount + this.page.smsCounts;
        if (this.formData.PhoneNumber != "") {
          if (realCount > this.page.maxSMSCount) {
            this.$alert('SMS box is full, please delete some SMS to be able to send/save new SMS.', 'Message', {
              confirmButtonText: 'OK',
              callback: action => {
                this.init();
              }
            });
          } else {
            this.sdk.post("SaveSMS", saveData, results);
            this.$router.push('draft')
          }
        } else {
          $("#smsNumberInputWarn").removeClass("hidden");
        }

      },
      sendSMS() {
        let sendData = {
          smsId: -1,
          smsTime: sms.getSystemTime(),
          smsContent: this.formData.SMSContent,
          number: this.formData.PhoneNumber
        };
        let results = {
          callback: this.init
        };
        let realCount = this.page.usedSMSCount + this.page.smsCounts;
        if (this.formData.PhoneNumber != "") {
          if (realCount > this.page.maxSMSCount) {
            this.$alert('SMS box is full, please delete some SMS to be able to send/save new SMS.', 'Message', {
              confirmButtonText: 'OK',
              callback: action => {
                this.init();
              }
            });
          } else {
            this.sdk.post("SendSMS", sendData, results);
            this.$router.push('inbox');
          }
        } else {
          $("#smsNumberInputWarn").removeClass("hidden");
        }
      },
      listenCharCount() {
        let content = this.formData.SMSContent;
        let contentLength = content.length;
        let contentNum = 0;
        //let smsCounts;
        let MaxLength = sms.SMS_7BIT_MAX_SIZE;
        if (sms.isUcs2(content)) {
          MaxLength = sms.SMS_UCS2_MAX_SIZE;
          contentNum = contentLength;
          this.page.smsCounts = sms.getSmsCountStr(contentLength, "ucs2");
        } else {
          contentNum = parseInt(contentLength + sms.get7ExtNum(content));
          this.page.smsCounts = sms.getSmsCountStr(contentNum, "7bit");

        }
        if (contentNum > MaxLength) {
          $("#smsMaxNumWarn").removeClass("hidden");
        } else {
          $("#smsMaxNumWarn").addClass("hidden");
        }
        this.page.length = contentNum + "/" + MaxLength + "(" + this.page.smsCounts + ")";
      }

    }
}
</script>


<style lang="sass" scoped>
.el-input,.el-textarea textarea{
  width:100%;
} 
p{
  float:right;
}
#btnSMS{
  text-align: center;
  padding-top:20px;

}
.hidden {
    display: none;
}
#smsMaxNumWarn,#smsNumberInputWarn{
  color:#FF0000;
  padding-top:10px;
  margin-left:15px;

}
#newSMSContent{
  margin:20px 10px;
} 
.el-form {
  width:95%;
  margin: 0 10px; 
}
</style>