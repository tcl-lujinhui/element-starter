<template lang="jade">
  include ../components.jade
  #reboot
    +sideMenuPage('System')
      +breadcrumb("Reboot")
      div(style="width: 90%;margin:45px auto;text-align: center;font-size: 14px;color: #5e6d82;line-height: 1")
        p(style="padding-bottom: 10px") Click the button to restart the device:
        +button("Reboot")(@click="reboot" style="color: #fff;background-color: #20a0ff;border-color: #20a0ff;" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-text="Reboot...")
</template>
<script>
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
      },
      tabs(tabs) {
        this.$router.push(tabs.$el.getAttribute("router"))
      },
      reboot() {
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
        this.sdk.post("SetDeviceReboot", this.formData, results)
      }
    }
}
</script>




<style lang="sass" scoped>
</style>