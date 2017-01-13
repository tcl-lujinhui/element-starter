<template lang="jade">
  include ../components.jade
  #staticRules
    +form("formData")
      +formItem("ids_router_titleStaticRouting:")
        el-switch(v-model="page.state" @change="update()" on-text="" off-text="")
      span.add
        +button("")(icon="plus" size="mini" @click="add" type="primary")
      el-table(:data="page.StaticRoutingList" border)
        el-table-column(type="index" ,:label="vuex.res.ids_index" width="100")
        el-table-column(prop="DestNetAddr" ,:label="vuex.res.ids_router_desIp" width='200')
        el-table-column(prop="DestNetmask" ,:label="vuex.res.ids_subnetMark" width='200')
        el-table-column(prop="GateWay" ,:label="vuex.res.ids_router_rounterIp" width='200')
        el-table-column(:label="vuex.res.ids_netwrok_operation",:context="_self" width='120' inline-template fixed="right")
          span
            +button("")(icon="edit" size="mini" @click="editipFilterDialog($index,row)")
            +button("")(icon="delete" size="mini" type="danger" @click="deleteIpFilter($index,row)")
    el-dialog(:title="page.action=='edit'?vuex.res.ids_edit:vuex.res.ids_add" v-model="page.dialog")
      +form("formData")
        +input("ids_router_desIp:","DestNetAddr")
        +input("ids_subnetMark:","DestNetmask")
        +input("ids_router_rounterIp:","GateWay")
        +formItem("")
          +button("ids_apply")(type="primary" @click="ediApply")
          +button("ids_cancel")(@click="reset")
</template>

<script>
import{$,_,_config,vuex} from '../../common.js';
let Config = _config.staticRules;

export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex;
        this.initdata(Config);
        this.page={
          state:"",
          StaticRoutingList:[],
          dialog:false,
          action:"edit",
          indexs: -1
        }
        this.sdk.get("GetStaticRouting", null, (res) => {
          //this.formData = res;
          this.page.StaticRoutingList=res.StaticRoutingList;
          this.page.state = res.State == 1 ? true : false;
        })
      },
      editipFilterDialog(index,item) {
        this.$refs.formData.resetFields();
        this.formData.DestNetAddr=item.DestNetAddr;
        this.formData.DestNetmask=item.DestNetmask;
        this.formData.GateWay=item.GateWay;
        this.page.action='edit';
        this.page.indexs=index;
        this.page.dialog = true;
      },
      ediApply() {
        let setForm=()=>{
          this.page.StaticRoutingList[this.page.indexs]={};
          this.page.StaticRoutingList[this.page.indexs].DestNetAddr=this.formData.DestNetAddr;
          this.page.StaticRoutingList[this.page.indexs].DestNetmask=this.formData.DestNetmask;
          this.page.StaticRoutingList[this.page.indexs].GateWay=this.formData.GateWay;
          this.formData.State = this.page.state == true ? 1 : 0;
          let params ={
            State:this.formData.State,
            StaticRoutingList:this.page.StaticRoutingList
          }
          this.sdk.post("SetStaticRouting", params, {
            callback: this.init
          })
        }

        this.submit("formData", setForm)
      },
      add() {
        this.page.action='add';
        this.formData.DestNetAddr="";
        this.formData.DestNetmask="";
        this.formData.GateWay="";
        this.page.dialog = true;
        this.$refs.formData.resetFields();
        this.page.indexs=this.page.StaticRoutingList.length;
      },
      deleteIpFilter(index) {
        this.page.StaticRoutingList.splice(index, 1);
        this.sdk.post("SetStaticRouting", this.page, {
          callback: this.init
        })
      },
      update() {
        this.formData.State = this.page.state == true ? 1 : 0;
        let params ={
            State:this.formData.State,
            StaticRoutingList:this.page.StaticRoutingList
          }
        this.sdk.post("SetStaticRouting", params, (res) => {
        })
      }
    }
}
</script>

<style lang="sass" scoped>
.el-form{
  width: 721px;
}
span.add{
  float: right;
}
</style>