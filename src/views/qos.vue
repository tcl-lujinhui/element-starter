<template lang="jade">
  include ./components.jade
  #wanConfigure
    +sideMenuPage('Settings')
      +breadcrumb("Qos")
      div(style="width: 90%;margin:20px auto")
        label(style="float:left") Qos
        el-checkbox(v-model="checked" checked style="float:right;display:block")
      el-table(:data="tableData" border style="width: 90%;margin:20px auto")
        el-table-column(prop="date" label="Name" width='180')
        el-table-column(prop="name" label="WAN Port" width='100')
        el-table-column(prop="address" label="LAN IP Address" width='180')
        el-table-column(prop="address" label="LAN Port" width='100')
        el-table-column(prop="address" label="Protocol" width='100')
        el-table-column(prop="name" label="Status")
        el-table-column(label="Operation" fixed="right",:context="_self" width='100' inline-template)
          span
            +button("")(icon="edit" size="mini" @click="")
            +button("")(icon="delete" size="mini" type="danger" @click="")
      +button("add")(@click="") 

      
</template>

<script>
import _config from '../config.js'
var Config = _config.qos;
export default {
  data () {
    return {
      config:Config.GetQosSettings,
      formData: {},
      checked: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init (){
      this.tableData=[{
        date: 'name ',
        name: '65556',
        address: '192.168.2.1 sdffa'
      }];
      this.sdk.get("GetQosSettings",null,(res)=>{
        this.formData = res;
      })
    },
    del(name) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', 'Confirm', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      });
    },
    update (){
      this.sdk.post("SetQosSettings",this.formData,(res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>