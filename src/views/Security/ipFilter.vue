<template lang="jade">
  include ../components.jade
  #ipFilter
    +sideMenuPage('Settings')
      +breadcrumb("ids_filter_ipFilter")
      +form("formData")
        +select("ids_filter_ipFilter:","filter_policy")
        span.add(v-show="(formData.filter_policy==2)||(formData.filter_policy==1)")
          +button("")(icon="plus" size="mini" @click="add" type="primary")
        el-table(:data="formData.filter_policy==1?page.ipFilter_list:page.ipFilterAllowlist" v-show="formData.filter_policy!=0" border)
          el-table-column(prop="lan_ip" ,:label="vuex.res.ids_ipAddress" width='200')
          el-table-column(prop="lan_port" ,:label="vuex.res.ids_vtServer_lanPort" width='120')
          el-table-column(prop="wan_ip", :label="vuex.res.ids_filter_wanIpAddress" width='200')
          el-table-column(prop="wan_port", :label="vuex.res.ids_vtServer_wanPort" width='120')
          el-table-column(:label="vuex.res.ids_protocol",:context="_self" width='120' inline-template)
            span {{row.ip_protocol | ipProtocol}}
          el-table-column(:label="vuex.res.ids_netwrok_operation",:context="_self" width='120' inline-template fixed="right")
            span
              +button("")(icon="edit" size="mini" @click="editipFilterDialog($index,row)")
              +button("")(icon="delete" size="mini" type="danger" @click="deleteIpFilter($index,row)")
        +formBtn()
      el-dialog(:title="page.action=='edit'?vuex.res.ids_edit:vuex.res.ids_add" v-model="page.dialog")
        +form("formData")
          +input("ids_ipAddress:","lan_ip")
          +input("ids_vtServer_lanPort:","lan_port")
          +input("ids_filter_wanIpAddress:","wan_ip")
          +input("ids_vtServer_wanPort:","wan_port")
          +select("ids_protocol:","ip_protocol")
          +formItem("")
            +button("ids_apply")(type="primary" @click="ediApply")
            +button("ids_cancel")(@click="reset")
</template>

<script>
import {_config,_,$,vuex} from '../../common.js';
let Config = _config.ipFilter;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex;
        this.initdata(Config);
        this.page = {
          ipFilter_list: [],
          ipFilterAllowlist: [],
          dialog: false,
          action: "edit",
          indexs: -1,
          filter_policy: "",
          total_num: 0,
          ip_status: ""

        }
        this.sdk.get("getIPFilterList", null, (res) => {
          this.formData.filter_policy = res.filter_policy;
          this.page.ipFilter_list = res.ipFilter_list;
          this.page.ipFilterAllowlist = res.ipFilterAllowlist;
          this.page.filter_policy = res.filter_policy;
          this.page.total_num = res.total_num;
        });
        this.sdk.get("GetLanSettings", null, (res) => {
          _.extend(this.formData, res);
        })
      },
      editipFilterDialog(index, item) {
        this.$refs.formData.resetFields();
        _.extend(this.formData, item);
        //this.page.list_id = item.list_id;
        this.page.ip_status = item.ip_status;
        this.page.action = 'edit';
        this.page.indexs = index;
        this.page.dialog = true;
      },
      ediApply() {
        let params = {};
        let vm = this;
        let sameIpFilter = true;
        let setForm = () => {
          if (this.formData.filter_policy == 1) {
            if (this.page.action == 'add') {
              _.each(vm.page.ipFilter_list, (i, v) => {
                if (vm.formData.lan_ip == i.lan_ip && vm.formData.lan_port == i.lan_port && vm.formData.wan_ip == i.wan_ip && vm.formData.wan_port == i.wan_port && (vm.formData.ip_protocol == i.ip_protocol || 3 * vm.formData.ip_protocol < i.ip_protocol)) {
                  sameIpFilter = false;
                  return false;
                }
              })
              if (!sameIpFilter) {
                this.$alert(vuex.res['ids_security_ipFilterWarn'], vuex.res['ids_confirm'], {
                  confirmButtonText: vuex.res['ids_ok'],
                  callback: action => {
                    vm.reset();
                  }
                });
                return false;
              } else {
                vm.page.ipFilter_list[vm.page.indexs] = {};
                vm.page.ipFilter_list[vm.page.indexs].lan_ip = vm.formData.lan_ip;
                vm.page.ipFilter_list[vm.page.indexs].lan_port = vm.formData.lan_port;
                vm.page.ipFilter_list[vm.page.indexs].wan_ip = vm.formData.wan_ip;
                vm.page.ipFilter_list[vm.page.indexs].wan_port = vm.formData.wan_port;
                vm.page.ipFilter_list[vm.page.indexs].ip_protocol = vm.formData.ip_protocol;
                /*vm.page.ipFilter_list[vm.page.indexs].list_id = vm.page.indexs;*/
                vm.page.ipFilter_list[vm.page.indexs].ip_status = 1;
              }
            } else {
              if (vm.page.ipFilter_list[vm.page.indexs].lan_ip == vm.formData.lan_ip && vm.page.ipFilter_list[vm.page.indexs].lan_port == vm.formData.lan_port && vm.page.ipFilter_list[vm.page.indexs].wan_ip == vm.formData.wan_ip && vm.page.ipFilter_list[vm.page.indexs].wan_port == vm.formData.wan_port && vm.page.ipFilter_list[vm.page.indexs].ip_protocol == vm.formData.ip_protocol) {
                vm.page.ipFilter_list[vm.page.indexs] = {};
                vm.page.ipFilter_list[vm.page.indexs].lan_ip = vm.formData.lan_ip;
                vm.page.ipFilter_list[vm.page.indexs].lan_port = vm.formData.lan_port;
                vm.page.ipFilter_list[vm.page.indexs].wan_ip = vm.formData.wan_ip;
                vm.page.ipFilter_list[vm.page.indexs].wan_port = vm.formData.wan_port;
                vm.page.ipFilter_list[vm.page.indexs].ip_protocol = vm.formData.ip_protocol;
                //vm.page.ipFilter_list[vm.page.indexs].list_id = vm.page.list_id;
                vm.page.ipFilter_list[vm.page.indexs].ip_status = vm.page.ip_status;
              } else {
                _.each(vm.page.ipFilter_list, (i, v) => {
                  if (vm.formData.lan_ip == i.lan_ip && vm.formData.lan_port == i.lan_port && vm.formData.wan_ip == i.wan_ip && vm.formData.wan_port == i.wan_port && (vm.formData.ip_protocol == i.ip_protocol || 3 * vm.formData.ip_protocol < i.ip_protocol)) {
                    sameIpFilter = false;
                    return false;
                  }
                })
                if (!sameIpFilter) {
                  this.$alert(vuex.res['ids_security_ipFilterWarn'], vuex.res['ids_confirm'], {
                    confirmButtonText: vuex.res['ids_ok'],
                    callback: action => {
                      vm.reset();
                    }
                  });
                  return false;
                } else {
                  vm.page.ipFilter_list[vm.page.indexs] = {};
                  vm.page.ipFilter_list[vm.page.indexs].lan_ip = vm.formData.lan_ip;
                  vm.page.ipFilter_list[vm.page.indexs].lan_port = vm.formData.lan_port;
                  vm.page.ipFilter_list[vm.page.indexs].wan_ip = vm.formData.wan_ip;
                  vm.page.ipFilter_list[vm.page.indexs].wan_port = vm.formData.wan_port;
                  vm.page.ipFilter_list[vm.page.indexs].ip_protocol = vm.formData.ip_protocol;
                  //vm.page.ipFilter_list[vm.page.indexs].list_id = vm.page.list_id;
                  vm.page.ipFilter_list[vm.page.indexs].ip_status = vm.page.ip_status;
                }
              }
            }
            let params1 = {
              filter_policy: vm.formData.filter_policy,
              ipFilter_list: vm.page.ipFilter_list
            }
            _.extend(params, params1);
          } else {
            if (this.page.action == 'add') {
              _.each(vm.page.ipFilterAllowlist, (i, v) => {
                if (vm.formData.lan_ip == i.lan_ip && vm.formData.lan_port == i.lan_port && vm.formData.wan_ip == i.wan_ip && vm.formData.wan_port == i.wan_port && (vm.formData.ip_protocol == i.ip_protocol || 3 * vm.formData.ip_protocol < i.ip_protocol)) {
                  sameIpFilter = false;
                  return false;
                }
              })
              if (!sameIpFilter) {
                this.$alert(vuex.res['ids_security_ipFilterWarn'], vuex.res['ids_confirm'], {
                  confirmButtonText: vuex.res['ids_ok'],
                  callback: action => {
                    vm.reset();
                  }
                });
                return false;
              } else {
                vm.page.ipFilterAllowlist[vm.page.indexs] = {};
                vm.page.ipFilterAllowlist[vm.page.indexs].lan_ip = vm.formData.lan_ip;
                vm.page.ipFilterAllowlist[vm.page.indexs].lan_port = vm.formData.lan_port;
                vm.page.ipFilterAllowlist[vm.page.indexs].wan_ip = vm.formData.wan_ip;
                vm.page.ipFilterAllowlist[vm.page.indexs].wan_port = vm.formData.wan_port;
                vm.page.ipFilterAllowlist[vm.page.indexs].ip_protocol = vm.formData.ip_protocol;
                /*vm.page.ipFilter_list[vm.page.indexs].list_id = vm.page.indexs;*/
                vm.page.ipFilterAllowlist[vm.page.indexs].ip_status = 1;
              }
            } else {
              if (vm.page.ipFilterAllowlist[vm.page.indexs].lan_ip == vm.formData.lan_ip && vm.page.ipFilterAllowlist[vm.page.indexs].lan_port == vm.formData.lan_port && vm.page.ipFilterAllowlist[vm.page.indexs].wan_ip == vm.formData.wan_ip && vm.page.ipFilterAllowlist[vm.page.indexs].wan_port == vm.formData.wan_port && vm.page.ipFilterAllowlist[vm.page.indexs].ip_protocol == vm.formData.ip_protocol) {
                vm.page.ipFilterAllowlist[vm.page.indexs] = {};
                vm.page.ipFilterAllowlist[vm.page.indexs].lan_ip = vm.formData.lan_ip;
                vm.page.ipFilterAllowlist[vm.page.indexs].lan_port = vm.formData.lan_port;
                vm.page.ipFilterAllowlist[vm.page.indexs].wan_ip = vm.formData.wan_ip;
                vm.page.ipFilterAllowlist[vm.page.indexs].wan_port = vm.formData.wan_port;
                vm.page.ipFilterAllowlist[vm.page.indexs].ip_protocol = vm.formData.ip_protocol;
                //vm.page.ipFilter_list[vm.page.indexs].list_id = vm.page.list_id;
                vm.page.ipFilterAllowlist[vm.page.indexs].ip_status = vm.page.ip_status;
              } else {
                _.each(vm.page.ipFilterAllowlist, (i, v) => {
                  if (vm.formData.lan_ip == i.lan_ip && vm.formData.lan_port == i.lan_port && vm.formData.wan_ip == i.wan_ip && vm.formData.wan_port == i.wan_port && (vm.formData.ip_protocol == i.ip_protocol || 3 * vm.formData.ip_protocol < i.ip_protocol)) {
                    sameIpFilter = false;
                    return false;
                  }
                })
                if (!sameIpFilter) {
                  this.$alert(vuex.res['ids_security_ipFilterWarn'], vuex.res['ids_confirm'], {
                    confirmButtonText: vuex.res['ids_ok'],
                    callback: action => {
                      vm.reset();
                    }
                  });
                  return false;
                } else {
                  vm.page.ipFilterAllowlist[vm.page.indexs] = {};
                  vm.page.ipFilterAllowlist[vm.page.indexs].lan_ip = vm.formData.lan_ip;
                  vm.page.ipFilterAllowlist[vm.page.indexs].lan_port = vm.formData.lan_port;
                  vm.page.ipFilterAllowlist[vm.page.indexs].wan_ip = vm.formData.wan_ip;
                  vm.page.ipFilterAllowlist[vm.page.indexs].wan_port = vm.formData.wan_port;
                  vm.page.ipFilterAllowlist[vm.page.indexs].ip_protocol = vm.formData.ip_protocol;
                  //vm.page.ipFilter_list[vm.page.indexs].list_id = vm.page.list_id;
                  vm.page.ipFilterAllowlist[vm.page.indexs].ip_status = vm.page.ip_status;
                }
              }

            }
            let params1 = {
              filter_policy: vm.formData.filter_policy,
              ipFilter_list: vm.page.ipFilterAllowlist
            }
            _.extend(params, params1);
          }
          this.sdk.post("SetIPFilter", params, {
            callback: this.init
          })
        }

        vm.submit("formData", setForm)
      },
      add() {
        this.page.action = 'add';
        this.formData.lan_ip = "";
        this.formData.lan_port = "";
        this.formData.wan_ip = "";
        this.formData.wan_port = "";
        this.formData.ip_protocol = 6;
        this.page.dialog = true;
        this.$refs.formData.resetFields();
        if (this.formData.filter_policy == 1) {
          this.page.indexs = this.page.ipFilter_list.length;
        } else {
          this.page.indexs = this.page.ipFilterAllowlist.length;
        }
      },
      deleteIpFilter(index) {
        let vm = this;
        let params = {};
        vm.$confirm(vuex.res['ids_delete_confirm'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['ids_delete'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          if (vm.formData.filter_policy == 1) {
            vm.page.ipFilter_list.splice(index, 1);
            let params1 = {
              filter_policy: vm.formData.filter_policy,
              ipFilter_list: vm.page.ipFilter_list
            }
            _.extend(params, params1);
          } else {
            vm.page.ipFilterAllowlist.splice(index, 1);
            let params1 = {
              filter_policy: vm.formData.filter_policy,
              ipFilter_list: vm.page.ipFilterAllowlist
            }
            _.extend(params, params1);
          }
          this.sdk.post("SetIPFilter", params, {
            callback: this.init
          })
        }).catch(() => {
          /*this.init();*/
        });
      },
      update() {
        let params = {}
        if (this.formData.filter_policy == 1) {
          let params1 = {
            filter_policy: this.formData.filter_policy,
            ipFilter_list: this.page.ipFilter_list
          }
          _.extend(params, params1);
        } else {
          let params1 = {
            filter_policy: this.formData.filter_policy,
            ipFilter_list: this.page.ipFilterAllowlist
          }
          _.extend(params, params1);
        }

        this.sdk.post("SetIPFilter", params, {
          callback: this.init
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