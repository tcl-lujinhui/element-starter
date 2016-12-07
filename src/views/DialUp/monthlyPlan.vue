<template lang="jade">
  include ../components.jade
  #wanConfigure
    +breadcrumb("Monthly Plan")
    +form("formData")
      div {{page.name}}
      +button("change")(@click="edit")
</template>

<script>
import Config from '../../config.js'
export default {
  created () {
    this.init()
  },
  methods: {
    edit (){
      this.page.name="5555555555555555wo"
    },
    init (){
      this.page={
        name:"898989898"
      }
      this.sdk.get("GetConnectionSettings",null,(res)=>{
        this.formData = res;
      })
    },
    update (){
      this.sdk.post("SetConnectionSettings",this.formData,(res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>