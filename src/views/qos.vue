<template lang="jade">
  include ./components.jade
  #wanConfigure
    +sideMenuPage('Settings')
      +breadcrumb("Qos")
      el-table(:data="page.qosList" border style="width: 90%;margin:20px auto")
        el-table-column(prop="Id" label="Id" width='100')
        el-table-column(prop="Priority" label="Priority" width='100' inline-template,:context="_self")
          span {{row.Priority | qosPriority}}
        el-table-column(prop="SrcIPAddress" label="IP Address" width='130')
        el-table-column(prop="Service" label="Service" width='100' inline-template,:context="_self")
          span {{row.Service | qosService}}
        el-table-column(prop="Protocol" label="Protocol" width='100' inline-template,:context="_self")
          span {{row.Protocol | qosProtocol}}
        el-table-column(prop="Port" label="Port" width='100')
        el-table-column(label="Operation" fixed="right",:context="_self" width='120' inline-template)(style="margin:0 auto")
          span
            +button("")(icon="edit" size="mini" @click="edit($index,row.Id)")
            +button("")(icon="delete" size="mini" type="danger" @click="del($index,row)")
      +button("")(icon="plus" size="mini" @click="add" type="primary")
      
      el-dialog(:title="page.actionType==1?'Edit':'Add'" v-model="page.dialogFormVisible")
        +form("formData")
          +input("Id:","Id")
          +select("Priority:","Priority")
          +input("IP Address:","SrcIPAddress")
          +select("Service:","Service")
          +select("Protocol:","Protocol")
          +input("Port:","Port")
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
        this.initdata(Config);
        this.page = {
          actionType: 0, //0:list;1:edit;2:new
          dialogFormVisible: false,
          currentQosId: 1,
          qosList: [],
          State: "",
          indexs: -1
        };
        this.sdk.get("GetQosSettings", null, (res) => {
          this.formData.qosList = res.QosList;
          this.State = res.State;
          this.page.qosList = res.QosList;
        })
      },

      del(index) {
        let vm = this;
        this.$confirm('Are you sure to delete?', 'Confirm', {
          confirmButtonText: 'Sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.page.qosList.splice(index, 1);
          let params = {
            State: this.formData.State,
            QosList: this.formData.qosList
          }
          this.sdk.post("SetQosSettings", params, {
            callback: this.init
          })

        }).catch(() => {

        });
      },

      add() {
        this.page.indexs = this.page.qosList.length;
        Config.initNewData.Id = this.page.qosList.length + 1;
        this.formData = $.extend({}, Config.initNewData);
        this.page.actionType = 2;
        this.page.dialogFormVisible = true;
        this.page.qosList.push(this.formData);
      },
      edit(index, id) {
        this.page.actionType = 1;
        this.page.dialogFormVisible = true;
        let vm = this;


        //vm.page.actionType=0;
        let currentQos = $.grep(vm.page.qosList, function(n, i) {
          return n.Id === id;
        })[0];
        //console.log(currentProfile);
        vm.formData = $.extend({}, currentQos);
        this.page.indexs = index;

        /* this.page.qosList[this.page.indexs]={};
         this.page.qosList[this.page.indexs].Id=vm.formData.Id;
         this.page.qosList[this.page.indexs].Priority=vm.formData.Priority;
         this.page.qosList[this.page.indexs].SrcIPAddress=vm.formData.SrcIPAddress;
         this.page.qosList[this.page.indexs].Service=vm.formData.Service;
         this.page.qosList[this.page.indexs].Protocol=vm.formData.Protocol;
         this.page.qosList[this.page.indexs].Port=vm.formData.Port; */
        /*$.each(this.page.qosList,function(i,v) {
          v.Id = vm.formData.Id;
          v.Priority = vm.formData.Priority;
          v.SrcIPAddress = vm.formData.SrcIPAddress;
          v.Service = vm.formData.Service;
          v.Protocol = vm.formData.Protocol;
          v.Port = vm.formData.Port;
          // body...
        })*/
        //console.log(this.page.qosList[id])
        //this.$refs.formData.resetFields();
      },
      update() {
        /*let params = {
          State: this.formData.State,
          QosList: this.page.qosList
        }*/
        let setForm = () => {
          
          this.page.qosList[this.page.indexs] = {};
          this.page.qosList[this.page.indexs].Id = this.formData.Id;
          this.page.qosList[this.page.indexs].Priority = this.formData.Priority;
          this.page.qosList[this.page.indexs].SrcIPAddress = this.formData.SrcIPAddress;
          this.page.qosList[this.page.indexs].Service = this.formData.Service;
          this.page.qosList[this.page.indexs].Protocol = this.formData.Protocol;
          this.page.qosList[this.page.indexs].Port = this.formData.Port;

          let params = {
            State: this.formData.State,
            QosList: this.page.qosList
          }

          this.sdk.post("SetQosSettings", params, {
            callback: this.init
          })
        }
        this.submit("formData", setForm);
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