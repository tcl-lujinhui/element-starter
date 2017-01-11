<template lang="jade">
  include ../components.jade
  #virtualServer
    +sideMenuPage('Settings')
      +breadcrumb("ids_vtServer_titleVirtualServer")
      +button("").add-btn(@click="add" type="primary" icon="plus" size="mini")
      el-table(:data="page.portfwd_list" style="width: 100%;margin:20px auto")
        el-table-column(prop="portfwd_name",:label="vuex.res.ids_name" width='120')
        el-table-column(prop="private_port",:label="vuex.res.ids_vtServer_wanPort" width='120')
        el-table-column(prop="private_ip",:label="vuex.res.ids_vtServer_lanIp" width='120')
        el-table-column(prop="global_port",:label="vuex.res.ids_vtServer_lanPort" width='100')
        el-table-column(prop="fwding_protocol",:label="vuex.res.ids_protocol" width='100')
        el-table-column(prop="fwding_status",:label="vuex.res.ids_status")
        el-table-column(:label="vuex.res.ids_netwrok_operation" width='130' inline-template,:context="_self")
          span
            +button("")(icon="edit" size="mini" @click="edit(row)")
            +button("")(icon="delete" size="mini" type="danger" @click="del(row)")
      el-dialog(:title="page.actionType==1?'Edit':'Add'" v-model="page.dialogFormVisible")
        +form("formData")
          +input("ids_name:","portfwd_name")
          +input("ids_vtServer_lanIp:","private_ip")
          +input("ids_vtServer_wanPort:","private_port")
          +input("ids_vtServer_lanPort:","global_port")
          +select("ids_protocol:","fwding_protocol")
          +select("ids_status:","fwding_status")
          +formBtn()
</template>

<script>
import {
  _,
  _config,
  vuex
} from '../../common.js';
var Config = _config.virtualServer;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.vuex=vuex;
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
        this.$confirm(this.vuex.res.ids_profile_delete, this.vuex.res.ids_confirm, {
          confirmButtonText: this.vuex.res.ids_confirm,
          cancelButtonText: this.vuex.res.ids_cancel,
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
