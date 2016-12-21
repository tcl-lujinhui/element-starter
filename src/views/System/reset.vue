<template lang="jade">
  include ../components.jade
  #reset
    +sideMenuPage('System')
      +breadcrumb("Reset")
      div(style="width: 90%;margin:45px auto;text-align: center;font-size: 14px;color: #5e6d82;line-height: 1")
        p(style="padding-bottom: 10px") Click the button to restore device to factory settings:
        +button("Reset")(@click="reset" style="color: #fff;background-color: #20a0ff;border-color: #20a0ff;")
</template>
<script>
import VueRouter from 'vue-router'
export default {
  created() {
      this.init()
    },
  methods: {
    tabs(tabs){
      this.$router.push(tabs.$el.getAttribute("router"))
    },
    reset (){
      this.sdk.post("SetDeviceReset",this.formData,(res)=>{
        console.log(res)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
</style>