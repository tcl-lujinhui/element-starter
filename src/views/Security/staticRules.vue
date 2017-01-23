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
        el-table-column(prop="GateWay" ,:label="vuex.res.ids_router_rounterIp" width='200' )
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
import {$,_,_config,vuex} from '../../common.js';
let Config = _config.staticRules;

export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex;
        this.initdata(Config);
        this.page = {
          state: "",
          StaticRoutingList: [],
          dialog: false,
          action: "edit",
          indexs: -1
        }
        this.sdk.get("GetStaticRouting", null, (res) => {
          //this.formData = res;
          this.page.StaticRoutingList = res.StaticRoutingList;
          this.page.state = res.State == 1 ? true : false;
        })
      },
      editipFilterDialog(index, item) {
        this.$refs.formData.resetFields();
        this.formData = item;
        this.page.action = 'edit';
        this.page.indexs = index;
        this.page.dialog = true;
      },
      ediApply() {
        let vm = this;
        let sameIpFilter = true;
        let setForm = () => {
          if (this.page.action == 'add') {
            _.each(vm.page.StaticRoutingList, (i, v) => {
              if (vm.formData.DestNetAddr == i.DestNetAddr && vm.formData.DestNetmask == i.DestNetmask && vm.formData.GateWay == i.GateWay) {
                sameIpFilter = false;
                return false;
              }
            })
            if (!sameIpFilter) {
              this.$alert(vuex.res['ids_router_desIpInvalid'], vuex.res['ids_confirm'], {
                confirmButtonText: vuex.res['ids_ok'],
                callback: action => {
                  vm.reset();
                }
              });
              return false;
            } else {

              vm.page.StaticRoutingList[vm.page.indexs] = {};
              vm.page.StaticRoutingList[vm.page.indexs].DestNetAddr = vm.formData.DestNetAddr;
              vm.page.StaticRoutingList[vm.page.indexs].DestNetmask = vm.formData.DestNetmask;
              vm.page.StaticRoutingList[vm.page.indexs].GateWay = vm.formData.GateWay;
              vm.page.StaticRoutingList[vm.page.indexs].SourceNetAddr = "192.168.1.22";
              vm.page.StaticRoutingList[vm.page.indexs].SourceNetmask = "255.255.0.0";
              vm.page.StaticRoutingList[vm.page.indexs].Interface = 1;
              vm.page.StaticRoutingList[vm.page.indexs].Metric = 0;
              vm.page.StaticRoutingList[vm.page.indexs].MTU = 1500;
              vm.page.StaticRoutingList[vm.page.indexs].Type = 0;
              vm.page.StaticRoutingList[vm.page.indexs].Id = vm.page.indexs;
              vm.formData.State = vm.page.state == true ? 1 : 0;
            }
          } else {
            if (vm.page.StaticRoutingList[vm.page.indexs].DestNetAddr == vm.formData.DestNetAddr && vm.page.StaticRoutingList[vm.page.indexs].DestNetmask == vm.formData.DestNetmask && vm.page.StaticRoutingList[vm.page.indexs].GateWay == vm.formData.GateWay) {
              vm.page.StaticRoutingList[vm.page.indexs] = {};
              vm.page.StaticRoutingList[vm.page.indexs].DestNetAddr = vm.formData.DestNetAddr;
              vm.page.StaticRoutingList[vm.page.indexs].DestNetmask = vm.formData.DestNetmask;
              vm.page.StaticRoutingList[vm.page.indexs].GateWay = vm.formData.GateWay;
              vm.formData.State = vm.page.state == true ? 1 : 0;
              vm.page.StaticRoutingList[vm.page.indexs].SourceNetAddr = vm.formData.SourceNetAddr;
              vm.page.StaticRoutingList[vm.page.indexs].SourceNetmask = vm.formData.SourceNetmask;
              vm.page.StaticRoutingList[vm.page.indexs].Interface = vm.formData.Interface;
              vm.page.StaticRoutingList[vm.page.indexs].Metric = vm.formData.Metric;
              vm.page.StaticRoutingList[vm.page.indexs].MTU = vm.formData.MTU;
              vm.page.StaticRoutingList[vm.page.indexs].Type = vm.formData.Type;
              vm.page.StaticRoutingList[vm.page.indexs].Id = vm.formData.Id;
            } else {
              _.each(vm.page.StaticRoutingList, (i, v) => {
                if (vm.formData.DestNetAddr == i.DestNetAddr && vm.formData.DestNetmask == i.DestNetmask && vm.formData.GateWay == i.GateWay) {
                  sameIpFilter = false;
                  return false;
                }
              })
              if (!sameIpFilter) {
                this.$alert(vuex.res['ids_router_desIpInvalid'], vuex.res['ids_confirm'], {
                  confirmButtonText: vuex.res['ids_ok'],
                  callback: action => {
                    vm.reset();
                  }
                });
                return false;
              } else {
                vm.page.StaticRoutingList[vm.page.indexs] = {};
                vm.page.StaticRoutingList[vm.page.indexs].DestNetAddr = vm.formData.DestNetAddr;
                vm.page.StaticRoutingList[vm.page.indexs].DestNetmask = vm.formData.DestNetmask;
                vm.page.StaticRoutingList[vm.page.indexs].GateWay = vm.formData.GateWay;
                vm.formData.State = vm.page.state == true ? 1 : 0;
                vm.page.StaticRoutingList[vm.page.indexs].SourceNetAddr = vm.formData.SourceNetAddr;
                vm.page.StaticRoutingList[vm.page.indexs].SourceNetmask = vm.formData.SourceNetmask;
                vm.page.StaticRoutingList[vm.page.indexs].Interface = vm.formData.Interface;
                vm.page.StaticRoutingList[vm.page.indexs].Metric = vm.formData.Metric;
                vm.page.StaticRoutingList[vm.page.indexs].MTU = vm.formData.MTU;
                vm.page.StaticRoutingList[vm.page.indexs].Type = vm.formData.Type;
                vm.page.StaticRoutingList[vm.page.indexs].Id = vm.formData.Id;
              }
            }
          }
          let params = {
            State: vm.formData.State,
            StaticRoutingList: vm.page.StaticRoutingList
          }
          this.sdk.post("SetStaticRouting", params, {
            callback: this.init
          })
        }

        this.submit("formData", setForm)
      },
      add() {
        this.page.action = 'add';
        this.formData.DestNetAddr = "";
        this.formData.DestNetmask = "";
        this.formData.GateWay = "";
        this.page.dialog = true;
        this.$refs.formData.resetFields();
        this.page.indexs = this.page.StaticRoutingList.length;
      },
      deleteIpFilter(index) {
        this.$confirm(vuex.res['ids_delete_confirm'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['ids_delete'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          this.page.StaticRoutingList.splice(index, 1);
          this.sdk.post("SetStaticRouting", this.page, {
            callback: this.init
          })
        }).catch(() => {
          /*this.init();*/
        });
      },
      update() {
        this.formData.State = this.page.state == true ? 1 : 0;
        let params = {
          State: this.formData.State,
          StaticRoutingList: this.page.StaticRoutingList
        }
        this.sdk.post("SetStaticRouting", params, (res) => {})
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