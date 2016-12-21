<template lang="jade">
  include ../components.jade
  #reboot
    +sideMenuPage('System')
      +breadcrumb("Reboot")
      div(style="width: 90%;margin:45px auto;text-align: center;font-size: 14px;color: #5e6d82;line-height: 1")
        p(style="padding-bottom: 10px") Click the button to restart the device:
        +button("Reboot")(@click="reboot" style="color: #fff;background-color: #20a0ff;border-color: #20a0ff;")
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
    
  },
  methods: {
    tabs(tabs){
      this.$router.push(tabs.$el.getAttribute("router"))
    },
    reboot (){
      this.sdk.post("SetDeviceReboot",this.formData,(res)=>{
        console.log(res)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
</style>