<template lang="jade">
  include ../components.jade
  #reboot
    +sideMenuPage('System')
      +breadcrumb("ids_system_reboot")
      +form("formData")
        div.reset
          p {{vuex.res.ids_system_restartDevice}}.
          +button("ids_system_reboot")(@click="update" type="primary" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="")
</template>
<script>
import {_,$,vuex,G} from '../../common.js';

export default {
  data() {
      return {
        fullscreenLoading: false
      }
    },
    created() {
    },
    methods: {
      init() {
        this.vuex=vuex
        this.page = {
          dialogFormVisible: false
        };
      },
      tabs(tabs) {
        this.$router.push(tabs.$el.getAttribute("router"))
      },
      update() {
       let vm = this 
       this.$confirm(this.vuex.res.ids_sys_rebootWarn, 'Confirm', {
          confirmButtonText: this.vuex.res.ids_confirm,
          cancelButtonText: this.vuex.res.ids_cancel,
          type: 'warning'
        }).then(() => {
            this.reboot();
        }).catch(() => {

        });
      },
      reboot() {
        let vm = this
        let results = {
          callback: this.init,
          success: {
            tips: "None",
            callback() {
              vm.fullscreenLoading = true;
              setTimeout(() => {
                vm.fullscreenLoading = false;
              }, 3000);
            }
          },
          fail: vuex.res["ids_fail"]
        }
        this.sdk.post("SetDeviceReboot", this.formData, results)
      }
    }
}
</script>
<style lang="sass" scoped>
.reset {
  width: 90%;
  margin: 45px auto;
  text-align: center;
  font-size: 14px;
  color: #5e6d82;
  line-height: 1;
  p {
    padding-bottom: 10px;
  }
}
</style>