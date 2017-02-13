<template lang="jade">
  include ../components.jade
  #reset
    +sideMenuPage('System')
      +breadcrumb("ids_reset")
      div.reboot
        p {{vuex.res.ids_system_resetDescription}}.
        +button("ids_reset")(@click="update" type="primary" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="")
        
</template>
<script>
import VueRouter from 'vue-router'
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

      update() {
        let vm = this
        this.$confirm(this.vuex.res.ids_system_resetTips, this.vuex.res.ids_reset, {
          confirmButtonText: this.vuex.res.ids_reset,
          cancelButtonText: this.vuex.res.ids_cancel,
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
.reboot {
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

