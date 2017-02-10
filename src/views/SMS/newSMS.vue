<template lang="jade">
  include ../components.jade
  #newSMS
    +sideMenuPage('Services')
      +breadcrumb("ids_sms_newMessage")
      sim-state
          //-+form("formData")(label-width="0px")
          #newSMSContent
            el-input(v-model="formData.PhoneNumber")
              span(slot="prepend") {{vuex.res.ids_sms_to}}:
            #phoneNumberInputWarn(:class="{hidden:page.inputNumberWarn}") {{vuex.res.ids_sms_inputNumber}}
            #phoneNumberRule(:class="{hidden:page.phoneNumberRule}") {{vuex.res.ids_sms_numberRule}}
            p(v-bind="listenCharCount()") {{page.length}}
            el-input(v-model="formData.SMSContent" type="textarea",:rows.number=10)
            #smsMaxNumWarn(:class="{hidden:page.maxContentWarnDisplay}") {{vuex.res.ids_sms_contentRule}}
            #btnSMS
              +button("ids_send")(@click="sendSMS")
              +button("ids_save")(@click="saveSMS")
              +button("ids_cancel")(@click="cancel")
          el-dialog(v-model="page.sendPop" size="tiny" custom-class="sendPop" close-on-click-modal=false)
            span {{vuex.res.ids_sms_sendingPrompt}}
      
</template>

<script>
import {_config,_,vuex,$} from '../../common.js';
import sms from '../../config/sms.js'
let Config = _config.newSMS;
export default {
  created() {
      this.init();
    },
    methods: {
      init() {
        this.initdata(Config);
        this.vuex = vuex;
        this.listenCharCount();
        this.page = {
          length: 0,
          currentSmsCount: 0,
          maxSMSCount: 0,
          usedSMSCount: 0,
          smsCounts: 0,
          inputNumberWarn: true,
          maxContentWarnDisplay: true,
          phoneNumberRule: true,
          smsFullFlag: 0,
          smsStatus: 0,
          sendPop: false
        };
        if (this.$router.name = "newSMS") {
          sms.doWrite();
        }
        this.sdk.get("GetSMSStorageState", null, (res) => {
          this.page.maxSMSCount = res.MaxCount;
          //this.page.usedSMSCount = res.TUseCount;
          this.page.usedSMSCount = res.MaxCount-res.LeftCount;

          if (this.page.smsFullFlag == 0) {
            this.page.smsFullFlag = 1;
            if (this.page.usedSMSCount == this.page.maxSMSCount&&this.page.usedSMSCount!=0) {
              this.$alert(vuex.res['ids_sms_boxFullPrompt'], vuex.res['ids_message'], {
                confirmButtonText: vuex.res['ids_ok']
              });
            }
          }
        });
      },

      saveSMS() {
        /*let content="";
        if(sms.isLatamSMS){
          content=sms.to7BITStr(this.formData.SMSContent);
        }else{
          content=this.formData.SMSContent;
        }*/
        let saveData = {
          SMSId: -1,
          SMSTime: sms.getSystemTime(),
          SMSContent: this.formData.SMSContent,
          //smsContent: content,
          PhoneNumber: this.formData.PhoneNumber
        };
        let results = {
          callback: this.init
        };
        let realCount = this.page.usedSMSCount + this.page.smsCounts;
        if (this.formData.PhoneNumber != " " && sms.phoneNumberRule(this.formData.PhoneNumber)) {
          if (realCount <= this.page.maxSMSCount) {
            this.sdk.post("SaveSMS", saveData, results);
            this.$router.push('draft')
          } else {
            this.$alert(vuex.res['ids_sms_boxFullPrompt'], vuex.res['ids_message'], {
              confirmButtonText: vuex.res['ids_ok'],
              callback: action => {
                this.init();
              }
            });
          }
        } else if (this.formData.PhoneNumber == "") {
          this.page.inputNumberWarn = false;
          this.page.phoneNumberRule = true;
        } else {
          this.page.inputNumberWarn = true;
          this.page.phoneNumberRule = false;
        }
      },
      sendSMS() {
        let sendData = {
          SMSId: -1,
          SMSContent: this.formData.SMSContent,
          PhoneNumber: this.formData.PhoneNumber,
          SMSTime: sms.getSystemTime()
        };
        let realCount = this.page.usedSMSCount + this.page.smsCounts;
        if (this.formData.PhoneNumber != " " && sms.phoneNumberRule(this.formData.PhoneNumber)) {
          this.page.inputNumberWarn = true;
          this.page.phoneNumberRule = true;
          if (realCount <= this.page.maxSMSCount) {
            this.sdk.post("SendSMS", sendData, (res) => {
              this.page.sendPop = true;
              let vm = this;
              this.Inter = setInterval(() => {
                vm.showResult()
              }, 3000);
            });
          } else {
            this.$alert(vuex.res['ids_sms_boxFullPrompt'], vuex.res['ids_message'], {
              confirmButtonText: vuex.res['ids_ok'],
              callback: action => {
                this.init();
              }
            });
          }
        } else if (this.formData.PhoneNumber == "") {
          this.page.inputNumberWarn = false;
          this.page.phoneNumberRule = true;
        } else {
          this.page.inputNumberWarn = true;
          this.page.phoneNumberRule = false;
        }
      },
      cancel() {
        //console.log(this.$router.name);
        /*if(this.$router.name!="newSMS"){
          alert(1);
          this.$router.push('newSMS');
        }*/
        this.init();
      },
      showResult() {
        this.sdk.get("GetSendSMSResult", null, (res) => {
          let status = res.SendStatus;
          if (status == 1 || status == 3) {
            this.page.sendPop = true;
          } else if (status == 2) {
            this.page.sendPop = false;
            this.$message({
              message: vuex.res['ids_success'],
              type: 'success'
            });
            this.$router.push('inbox');
            clearInterval(this.Inter)
            this.Inter = null
          } else {
            this.page.sendPop = false;
            this.$message.error(vuex.res['ids_fail']);
            this.$router.push('draft');
            clearInterval(this.Inter)
            this.Inter = null
          }
        });
      },
      prompt(strId, time) {
        var resMsg = resourceInfo[strId];
        popUp.prompt(time == null ? (resMsg != undefined ? resMsg : strId) : resMsg != undefined ? resMsg : strId, time)
    },
    getRes(strId) {
        return resourceInfo[strId];
    },
      /*listenPhoneNumber(){
        if(this.formData.PhoneNumber=""){
          this.page.inputNumberWarn = false;
          this.page.phoneNumberRule = true;
        }else if(!sms.phoneNumberRule(this.formData.PhoneNumber)){
          this.page.inputNumberWarn = true;
          this.page.phoneNumberRule = false;
        }else{
          this.page.inputNumberWarn = true;
          this.page.phoneNumberRule = true;
        }
      },*/
      listenCharCount() {
        let content = this.formData.SMSContent;
        let contentLength = content.length;
        let contentNum = 0;
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
          this.page.maxContentWarnDisplay = false;
        } else {
          this.page.maxContentWarnDisplay = true;
        }
        this.page.length = contentNum + "/" + MaxLength + "(" + this.page.smsCounts + ")";
      }

    }
}
</script>
<style lang="sass">
  .sendPop .el-dialog__close.el-icon.el-icon-close{
    display: none;
  }
</style>

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
#smsMaxNumWarn,#phoneNumberInputWarn,#phoneNumberRule{
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