<template lang="jade">
  include ./components.jade
  #wanConfigure
    +sideMenuPage('Settings')
      +breadcrumb("ids_qos_titleQos")
      +button("").add-btn(@click="add" type="primary" icon="plus" size="mini")
      el-table(:data="page.qosList" border style="width: 100%;margin:20px auto")
        el-table-column(prop="Id",:label="vuex.res.ids_id" width='120')
        el-table-column(prop="Priority",:label="vuex.res.ids_qos_priority" width='120' inline-template,:context="_self")
          span {{row.Priority | qosPriority}}
        el-table-column(prop="SrcIPAddress",:label="vuex.res.ids_ipAddress" width='120')
        el-table-column(prop="Service",:label="vuex.res.ids_service" width='100' inline-template,:context="_self")
          span {{row.Service | qosService}}
        el-table-column(prop="Protocol",:label="vuex.res.ids_protocol" width='100' inline-template,:context="_self")
          span {{row.Protocol | qosProtocol}}
        el-table-column(prop="Port",:label="vuex.res.ids_port" width='100')
        el-table-column(:label="vuex.res.ids_netwrok_operation" fixed="right",:context="_self" width='130' inline-template style="margin:0 auto")
          span
            +button("")(icon="edit" size="mini" @click="edit(row)")
            +button("")(icon="delete" size="mini" type="danger" @click="del($index,row)")
    
      el-dialog(:title="page.actionType==1?'Edit':'Add'" v-model="page.dialogFormVisible")
        +form("formData")
          +input("ids_id:","Id")
          +select("ids_qos_priority:","Priority")
          +input("ids_ipAddress:","SrcIPAddress")
          +select("ids_service:","Service")
          +select("ids_protocol:","Protocol")
          +input("ids_port:","Port")
          +formBtn()

</template>

<script>
import {
  $,
  _,
  _config,
  vuex,
  G,
  units
} from '../common.js';
var Config = _config.qos;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex
        this.initdata(Config);
        this.page = {
          actionType: 0, //0:list;1:edit;2:new
          dialogFormVisible: false,
          currentQosId: 1,
          qosList: [],
          State: "",
          indexs: -1,
          listIndex: 0
        };
        this.sdk.get("GetQosSettings", null, (res) => {
          this.formData.qosList = res.QosList;
          this.State = res.State;
          this.page.qosList = res.QosList;
        })
      },

      del(index) {
        let vm = this;
        this.$confirm(this.vuex.res.ids_qos_deleteTips, 'Confirm', {
          confirmButtonText: this.vuex.res.ids_confirm,
          cancelButtonText: this.vuex.res.ids_cancel,
          type: 'warning'
        }).then(() => {
          this.page.qosList.splice(index, 1);
          this.save()

        }).catch(() => {

        });
      },

      add() {
        this.page.indexs = this.page.qosList.length;
        Config.initNewData.Id = this.page.qosList.length + 1;
        this.formData = $.extend({}, Config.initNewData);
        this.page.actionType = 2;
        this.page.dialogFormVisible = true;
      },
      edit(item) {
        this.page.actionType = 1;
        this.page.dialogFormVisible = true;
        this.page.listIndex = _.indexOf(this.page.qosList, item)
        this.formData = _.findWhere(this.page.qosList, item) 
      },
      update() {        
        let setForm = () => {
          if (this.page.actionType == 1) {
            this.page.qosList[this.page.listIndex] = this.formData
          } else if (this.page.actionType == 2) {
            if(!this.page.qosList){
              this.page.qosList=[]
            }
            this.page.qosList.push(this.formData)
          }
          this.save()
        }
        this.submit("formData", setForm);
      },

      save() {
        let params = {
          State: this.formData.State,
          QosList: this.page.qosList
        }
        this.sdk.post("SetQosSettings", params, {
          callback: this.init
        })
      }
    }
}
</script>
<style lang="sass" scoped>
.main-box {
  min-height: 420px;
  height: auto!important;
  height: 420px;
  overflow: visible;
}

.border-notop {
  -webkit-border-radius: 0 0 4px 4px;
  -moz-border-radius: 0 0 4px 4px;
  border-radius: 0 0 4px 4px;
  border-top: 0 none;
  padding: 15px;
}

.cbi-section {
  padding: 0;
  margin: 0;
  border: 0;
}

.table-bordered {
  border: 1px solid #dddddd;
  border-collapse: separate;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
}

table {
  max-width: 100%;
  background-color: transparent;
  border-spacing: 0;
}

.table-bordered th, .table-bordered td {
    border-left: 1px solid #dddddd;
}

table th {
    font-weight: normal;
}

table tr {
    height: 36px;
}

.table th, .table td {
    padding: 8px;
    line-height: 20px;
    text-align: left;
    vertical-align: top;
    border-top: 1px solid #dddddd;
}

.table-tc th, .table-tc td {
    vertical-align: middle;
    text-align: center;
}
</style>