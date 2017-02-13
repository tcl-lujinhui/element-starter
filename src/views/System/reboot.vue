<template lang="jade">
  include ../components.jade
  #reboot
    +sideMenuPage('System')
      +breadcrumb("ids_system_rebootReset")
      +form("formData")
        div.reset_reboot
          p {{vuex.res.ids_system_restartDevice}}
          +button("ids_system_reboot")(@click="update_reboot" type="primary" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="")
        div.reset_reboot
        p {{vuex.res.ids_system_resetDescription}}
        +button("ids_reset")(@click="update_reset" type="primary" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="")
</template>
<script>
import {
  _,
  $,
  vuex,
  G
} from '../../common.js';
export default {
  data() {
      return {
        fullscreenLoading: false
      }
    },
    created() {},
    methods: {
      init() {
        this.vuex = vuex
        this.page = {
          dialogFormVisible: false
        };
      },
      tabs(tabs) {
        this.$router.push(tabs.$el.getAttribute("router"))
      },
      update_reboot() {
        let vm = this
        this.$confirm(this.vuex.res.ids_restore_factory_settings, this.vuex.res.ids_restore, {
          cancelButtonText: this.vuex.res.ids_cancel,
          confirmButtonText: this.vuex.res.ids_restore,
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
      },
      update_reset() {
        let vm = this
        this.$confirm(this.vuex.res.ids_system_resetTips, this.vuex.res.ids_reset, {
          cancelButtonText: this.vuex.res.ids_cancel,
          confirmButtonText: this.vuex.res.ids_reset,
          type: 'warning'
        }).then(() => {
          this.reset();
        }).catch(() => {

        });
      },
      reset() {
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
        this.sdk.post("SetDeviceReset", this.formData, results)
      }
    }
}
</script>

<style lang="sass" scoped>
.reset_reboot {
  text-align: left;
  font-size: 14px;
  color: #5e6d82;
  line-height: 1;
  margin-bottom: 40px;
  p {
    padding-bottom: 10px;
  }
}
</style>