<template lang="jade">
  include ../components.jade
  #ipFilter
    +sideMenuPage('Settings')
      +breadcrumb("ids_filter_ipFilter")
      +form("formData")
        +select("ids_filter_ipFilter:","filter_policy")
        span.add(v-show="formData.filter_policy==1&&page.total_num<16")
          +button("")(icon="plus" size="mini" @click="add" type="primary")
        el-table(:data="page.ipFilter_list" border)
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
          //-+input("Protocol:","IpProtocol")
          +formItem("")
            +button("ids_apply")(type="primary" @click="ediApply")
            +button("ids_cancel")(@click="reset")
</template>

<script>
import { _config,_,$,vuex} from '../../common.js';
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
          dialog: false,
          action: "edit",
          indexs: -1,
          filter_policy: "",
          total_num: 0

        }
        this.sdk.get("GetIPFilterList", null, (res) => {
          this.formData.filter_policy = res.filter_policy;
          this.page.ipFilter_list = res.ipFilter_list;
          this.page.filter_policy = res.filter_policy;
          this.page.total_num = res.total_num;
        });
        this.sdk.get("GetLanSettings", null, (res) => {
          _.extend(this.formData, res);
        })
      },
      editipFilterDialog(index, item) {
        this.$refs.formData.resetFields();
        this.formData.lan_ip = item.lan_ip;
        this.formData.lan_port = item.lan_port;
        this.formData.wan_ip = item.wan_ip;
        this.formData.wan_port = item.wan_port;
        this.formData.ip_protocol = item.ip_protocol;
        this.page.action = 'edit';
        this.page.indexs = index;
        this.page.dialog = true;
      },
      ediApply() {
        let vm = this;
        let sameIpFilter = true;
        let setForm = () => {
          if (this.page.action == 'add') {
            _.each(vm.page.ipFilter_list, (i, v) => {
              if (vm.formData.lan_ip == i.lan_ip && vm.formData.lan_port == i.lan_port && vm.formData.wan_ip == i.wan_ip && vm.formData.wan_port == i.wan_port && (vm.formData.ip_protocol == i.ip_protocol || 3 * vm.formData.ip_protocol < i.ip_protocol)) {
                sameIpFilter = false;
                return false;
              }
            })
            if (!sameIpFilter) {
              this.$alert(vuex.res['ids_security_ipFilterWarn'],  vuex.res['ids_confirm'], {
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
            }
          } else {
            if (vm.page.ipFilter_list[vm.page.indexs].lan_ip == vm.formData.lan_ip && vm.page.ipFilter_list[vm.page.indexs].lan_port == vm.formData.lan_port && vm.page.ipFilter_list[vm.page.indexs].wan_ip == vm.formData.wan_ip && vm.page.ipFilter_list[vm.page.indexs].wan_port == vm.formData.wan_port && vm.page.ipFilter_list[vm.page.indexs].ip_protocol == vm.formData.ip_protocol) {
              vm.page.ipFilter_list[vm.page.indexs] = {};
              vm.page.ipFilter_list[vm.page.indexs].lan_ip = vm.formData.lan_ip;
              vm.page.ipFilter_list[vm.page.indexs].lan_port = vm.formData.lan_port;
              vm.page.ipFilter_list[vm.page.indexs].wan_ip = vm.formData.wan_ip;
              vm.page.ipFilter_list[vm.page.indexs].wan_port = vm.formData.wan_port;
              vm.page.ipFilter_list[vm.page.indexs].ip_protocol = vm.formData.ip_protocol;
            } else {
              _.each(vm.page.ipFilter_list, (i, v) => {
                if (vm.formData.lan_ip == i.lan_ip && vm.formData.lan_port == i.lan_port && vm.formData.wan_ip == i.wan_ip && vm.formData.wan_port == i.wan_port && (vm.formData.ip_protocol == i.ip_protocol || 3 * vm.formData.ip_protocol < i.ip_protocol)) {
                  sameIpFilter = false;
                  return false;
                }
              })
              if (!sameIpFilter) {
                this.$alert(vuex.res['ids_security_ipFilterWarn'],  vuex.res['ids_confirm'],{
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
              }
            }
          }
          let params = {
            filter_policy: vm.formData.filter_policy,
            ipFilter_list: vm.page.ipFilter_list,
            total_num: vm.page.ipFilter_list.length
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
        this.page.indexs = this.page.ipFilter_list.length;
      },
      deleteIpFilter(index) {
        this.page.ipFilter_list.splice(index, 1);
        let params = {
          filter_policy: this.page.filter_policy,
          ipFilter_list: this.page.ipFilter_list,
          total_num: this.page.ipFilter_list.length
        }
        this.sdk.post("SetIPFilter", params, {
          callback: this.init
        })
      },
      update() {
        let params = {
          filter_policy: this.formData.filter_policy,
          ipFilter_list: this.page.ipFilter_list,
          total_num: this.page.total_num
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