<template lang="jade">
  include ../components.jade
  #virtualServer
    +sideMenuPage('Settings')
      +breadcrumb("Virtual Server")
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
            +button("")(icon="edit" size="mini" @click="edit(row.name)")
            +button("")(icon="delete" size="mini" type="danger" @click="del(row.name)")
      +button("open")(@click="add")
      
      el-dialog(:title="page.actionType==1?'Edit':'Add'" v-model="page.dialogFormVisible")
        +form("formData")
          +input("Name:","portfwd_name")
          +input("WAN Port:","private_ip")
          +input("LAN IP Address:","private_port")
          +input("LAN Port:","global_port")
          +select("Protocol:","fwding_protocol")
          +select("Status:","fwding_status")
          +formBtn()

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
        actionType:0,//0:list;1:edit;2:new
        dialogFormVisible:false
      }
      this.tableData=[{
        date: 'name sadf asdf asdf asf sadf ',
        name: '65556',
        address: '192.168.2.1 sdffa'
      }];
      this.sdk.get("getPortFwding",null,(res)=>{
        
      })
    },
    
    del(name) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', 'Confirm', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      });
    },
    add(){
      this.page.actionType=2;
      this.page.dialogFormVisible = true;
    },
    edit(id){
      this.page.actionType=1;
      this.page.dialogFormVisible = true;
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