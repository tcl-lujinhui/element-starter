<template lang="jade">
  include ../components.jade
  #newSms
    +sideMenuPage('Services')
      +breadcrumb("New Message")
      sim-state
        +form("formData")
          +input("Number:","PhoneNumber")
          +input("SMSContent:","SMSContent")(type="textarea" rows="10")
          +formItem("")
            +button("Apply")(type="primary")
            +button("Cancel")(@click="reset")
</template>

<script>
import _Config from '../../config.js'
var Config = _Config.newSms
export default {
  created () {
    this.init()
  },
  methods: {
   
    init (){
      this.initdata(Config)
      this.sdk.get("GetConnectionSettings",null,(res)=>{
        this.formData = res;
      })
    },
    send (){

    },

    save(){

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