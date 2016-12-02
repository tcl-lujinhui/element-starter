<template lang="jade">
  include ../components.jade
  #onlineUpgrade
    include _menu_upgrade.jade
    div {{$route.name}}

</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
    this.init()
  },
  methods: {
    tabs(tabs){
      this.$router.push(tabs.$el.getAttribute("router"))
    },
    init (){
      this.sdk.get("GetConnectionSettings",null,(res)=>{
        
      })
    },
    update (){
      this.sdk.post("SetConnectionSettings",this.formData,(res)=>{
        
      })
    }
  }
}
</script>
<style lang="sass" scoped>
</style>