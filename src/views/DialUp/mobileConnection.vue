<template lang="jade">
  include ../components.jade
  #mobileConnection
    +form("formData")
      +select("Connection Mode:")(v-model.mumber="formData.ConnectMode")
        el-option(label="Manual", :value.number="0")
        el-option(label="Auto", :value.number="1")
      +select("Connection Mode:")(v-model.mumber="formData.PdpType")
        el-option(label="IPV4", :value.number="0")
        el-option(label="IPV6", :value.number="2")
        el-option(label="IPv4v6", :value.number="3")
      +formBtn()

</template>
<script>
export default {
  data () {
    return {
      apiUrl:"/jrd/webapi",
      formData: {}
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init(){
      var apiData = {
        isSet:false,
        apiName:"GetConnectionSettings"
      }
      this.$http.post(this.apiUrl,apiData).then((response) => {
        this.formData=response.body.result;
        console.log(response.body.result)
      })
    },
    reset() {
      this.init()
      //Object.assign(this.$data, this.$options.data())
      //this.$refs.formData.resetFields();
    },
    update (ev){
      var vm = this;
      var apiData = {
        isSet:false,
        apiName:"SetConnectionSettings",
        data:vm.formData
      }
      vm.$http.post(vm.apiUrl,apiData).then((response) => {
        console.log(response.body)
      })
    }
  }
}
</script>
<style lang="sass">
</style>