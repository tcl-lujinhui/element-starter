<template lang="jade">
  #smsReport
</template>

<script>
import {_config,vuex} from '../../common.js';
let Config = _config.smsReport;
export default {
  created() {
      this.init();
      setInterval(this.displaySMSReport, 5000);
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          smsList: []
        };
      },
      displaySMSReport() {
        this.sdk.get("GetSMSListByContactNum", null, (res) => {
          this.page.smsList = res.SMSList;
        });
        for (let i = 0; i < this.page.smsList.length; i++) {
          if (this.page.smsList[i].SMSType == 4) {
            this.$notify.info({
              title: this.vuex.res.ids_sms_deliveryReport,
              message: this.vuex.res.ids_sms_successfullyDeliveredReport + this.page.smsList[i].PhoneNumber,
              offset: 100
            });
          }
        }
      }
    }
}
</script>

<style lang="sass" scoped>
</style>