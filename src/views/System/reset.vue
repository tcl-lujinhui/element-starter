<template lang="jade">
  include ../components.jade
  #reset
    +sideMenuPage('System')
      +breadcrumb("Reset")
      div(style="width: 90%;margin:45px auto;text-align: center;font-size: 14px;color: #5e6d82;line-height: 1")
        p(style="padding-bottom: 10px") {{vuex.res.ids_system_resetDescription}}:
        +button("Reset")(@click="reset" style="color: #fff;background-color: #20a0ff;border-color: #20a0ff;" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="Reset...")
</template>
<script>
import VueRouter from 'vue-router'
import {_,$,vuex,G} from '../../common.js';
export default {
  data() {
      return {
       fullscreenLoading: false
      }
    },
    created() {},
    methods: {
      init() {  
      this.vuex=vuex      
      },
      tabs(tabs) {
        this.$router.push(tabs.$el.getAttribute("router"))
      },
      reset() {
        let vm = this
        let results = {
          callback: this.init,
          success: function() {
            vm.fullscreenLoading = true;
            setTimeout(() => {
              vm.fullscreenLoading = false;
            }, 3000);
          },
          fail: "fail!"
        }
        this.sdk.post("SetDeviceReset", this.formData, results)
      }
    }
}
</script>

<style lang="sass" scoped>
</style>