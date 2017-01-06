<template lang="jade">
  include ./components.jade
  #wanConfigure
    +sideMenuPage('Settings')
      +breadcrumb("Qos")
      el-table(:data="page.qosList" border style="width: 90%;margin:20px auto")
        el-table-column(prop="Id" label="Id" width='100')
        el-table-column(prop="Priority" label="Priority" width='100')
        el-table-column(prop="SrcIPAddress" label="IP Address" width='130')
        el-table-column(prop="Service" label="Service" width='100')
        el-table-column(prop="Protocol" label="Protocol" width='100')
        el-table-column(prop="Port" label="Port")
        el-table-column(label="Operation" fixed="right",:context="_self" width='120' inline-template)(style="margin:0 auto")
          span
            +button("")(icon="edit" size="mini" @click="edit(row.Id)")
            +button("")(icon="delete" size="mini" type="danger" @click="del(row.Id)")
      +button("add")(@click="add")
      
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
import $ from 'jquery'
import _config from '../config.js'
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
          qosList: []
        };
        this.sdk.get("GetQosSettings", null, (res) => {
          this.page.qosList = res.QosList;
        })
      },
      del(id) {
        this.$confirm('Are you sure to delete it?', 'Confirm', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(() => {

        });
      },
      add() {
        this.formData= $.extend({},Config.initNewData);
        this.page.actionType = 2;
        this.page.dialogFormVisible = true;
      },
      edit(id) {
        this.page.actionType = 1;
        this.page.dialogFormVisible = true;

        let vm = this;
        //vm.$refs.formData.resetFields()
        //vm.page.actionType=0;
        let currentQos = $.grep(vm.page.qosList, function(n, i) {
          return n.Id === id;
        })[0];
        //console.log(currentProfile);
        vm.formData = $.extend({}, currentQos);
      },
      update() {
        this.sdk.post("SetQosSettings", this.formData, (res) => {
          console.log(res)
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