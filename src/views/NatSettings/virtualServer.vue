<template lang="jade" option="{doctype: 'html'}">

  include ../components.jade
  #virtualServer
    +breadcrumb("Virtual Server")
    +button("new")(@click="page.dialogFormVisible = true")
    el-table(:data="tableData" style="width: 90%;margin:20px auto")
      el-table-column(prop="date" label="Name" width='180')
      el-table-column(prop="name" label="WAN Port" width='100')
      el-table-column(prop="address" label="LAN IP Address" width='180')
      el-table-column(prop="address" label="LAN Port" width='100')
      el-table-column(prop="address" label="Protocol" width='100')
      el-table-column(prop="name" label="Status")
      el-table-column(label="Operation" fixed="right",:context="_self" width='130' inline-template)
        span
          +button("")(icon="search" size="mini")
          +button("")(icon="edit" size="mini")
          +button("")(icon="delete" size="mini" type="danger" @click="page.visible2=true")
    +button("open")(@click="page.dialogFormVisible = true")
    +button('del2')(v-popover:popover5)

    el-dialog(title="收货地址" v-model="page.dialogFormVisible")
      p asdfasdf安抚
    el-popover(ref="popover5" placement="top" width="160" v-model="page.visible2")
      p 这是一段内容这是一段内容确定删除吗？
      +button("cancel")(@click="page.visible2 = false")
      +button("ok")(@click="page.visible2 = false")
</template>

<script>
import _config from '../../config.js'
var Config = _config.virtualServer;
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
      this.page ={
        visible2:false,
        dialogFormVisible:false
      }
      this.tableData=[{
        date: 'name sadf asdf asdf asf sadf ',
        name: '65556',
        address: '192.168.2.1 sdffa'
      }, {
        date: 'name',
        name: '65556',
        address: '192.168.2.1'
      }, {
        date: 'name',
        name: '65556',
        address: '192.168.2.1'
      }];
      this.sdk.get("getPortFwding",null,(res)=>{
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