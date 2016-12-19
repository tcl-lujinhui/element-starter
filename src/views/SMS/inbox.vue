<template lang="jade">
  include ../components.jade
  #wanConfigure
    +sideMenuPage('Services')
      +breadcrumb("Inbox")
      sim-state
        div SMS Storage Status(Extant SMS/Total):5/300
        el-table(:data="page.tableData" style="width: 90%;margin:20px auto")
          el-table-column(prop="date" label="Name" width='180')
          el-table-column(prop="name" label="WAN Port" width='100')
          el-table-column(prop="address" label="LAN IP Address" width='180')
          el-table-column(prop="address" label="LAN Port" width='100')
          el-table-column(prop="address" label="Protocol" width='100')
          el-table-column(prop="name" label="Status")
          el-table-column(label="Operation" fixed="right",:context="_self" width='130' inline-template)
            span
</template>

<script>
import Config from '../../config.js'
export default {
  data() {
      return {

      }
    },
    created() {
      this.init()
    },
    methods: {

      init() {
        this.page ={
          tableData:[]
        }
        this.sdk.get("GetSMSListByContactNum", null, (res) => {
          //console.log(res)
          //this.page.tableData = res;
        })
      },

    }
}
</script>
<style lang="sass" scoped>
</style>
