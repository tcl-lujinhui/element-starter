<template lang="jade">
  include ../components.jade
  #virtualServer
    +sideMenuPage('Settings')
      +breadcrumb("Virtual Server")
      +button("").add-btn(@click="add" type="primary" icon="plus" size="mini")
      el-table(:data="page.portfwd_list" style="width: 100%;margin:20px auto")
        el-table-column(prop="portfwd_name" label="Name" width='120')
        el-table-column(prop="private_port" label="WAN Port" width='120')
        el-table-column(prop="private_ip" label="LAN IP" width='120')
        el-table-column(prop="global_port" label="LAN Port" width='100')
        el-table-column(prop="fwding_protocol" label="Protocol" width='100')
        el-table-column(prop="fwding_status" label="Status")
        el-table-column(label="Operation" width='130' inline-template,:context="_self")
          span
            +button("")(icon="edit" size="mini" @click="edit(row)")
            +button("")(icon="delete" size="mini" type="danger" @click="del(row)")
      el-dialog(:title="page.actionType==1?'Edit':'Add'" v-model="page.dialogFormVisible")
        +form("formData")
          +input("Name:","portfwd_name")
          +input("LAN IP Address:","private_ip")
          +input("WAN Port:","private_port")
          +input("LAN Port:","global_port")
          +select("Protocol:","fwding_protocol")
          +select("Status:","fwding_status")
          +formBtn()
</template>

<script>
import {
  _,
  _config
} from '../../common.js';
var Config = _config.virtualServer;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          actionType: 0, //0:list;1:edit;2:new
          dialogFormVisible: false,
          portfwd_list: [],
          listIndex: 0
        }
        this.sdk.get("getPortFwding", null, (res) => {
          this.page.portfwd_list = res.portfwd_list
        })
      },

      del(item) {
        this.$confirm('Are you sure you want to delete it?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.page.portfwd_list = _.reject(this.page.portfwd_list, (v) => {
            return _.isEqual(v, item)
          })

          this.save()

        }).catch(() => {

        });
      },

      save() {
        let params = {
          total_num: this.page.portfwd_list.length,
          portfwd_list: this.page.portfwd_list
        }
        this.sdk.post("SetPortFwding", params, {
          callback: this.init
        })
      },

      add() {
        this.page.actionType = 2;//new
        this.page.dialogFormVisible = true;
        this.formData = {
          portfwd_name: "",
          private_ip: "",
          private_port: "",
          global_port: "",
          fwding_protocol: 6,
          fwding_status: 1
        }
      },

      edit(item) {
        this.page.actionType = 1;//edit
        this.page.dialogFormVisible = true;
        this.page.listIndex = _.indexOf(this.page.portfwd_list, item)
        this.formData = _.findWhere(this.page.portfwd_list, item)
      },

      update() {
        let setForm = () => {
          if (this.page.actionType == 1) {
            this.page.portfwd_list[this.page.listIndex] = this.formData
          } else if (this.page.actionType == 2) {
            this.page.portfwd_list.push(this.formData)
          }
          this.save()
        }
        this.submit("formData", setForm)
      }
    }
}
</script>
<style lang="sass" scoped>
</style>
