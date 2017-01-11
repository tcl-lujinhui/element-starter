<template lang="jade">
  include ../components.jade
  #ipFilter
    +sideMenuPage('Settings')
      +breadcrumb("IP Filter")
      +form("formData")
        +select("IP Filter:","filter_policy")
        span.add(v-show="formData.filter_policy==1&&page.total_num<16")
          +button("")(icon="plus" size="mini" @click="add" type="primary")
        el-table(:data="page.ipFilter_list" border)
          el-table-column(prop="lan_ip" label="IP Address" width='200')
          el-table-column(prop="lan_port" label="LAN Port" width='120')
          el-table-column(prop="wan_ip" label="WAN IP Address" width='200')
          el-table-column(prop="wan_port" label="WAN Port" width='120')
          el-table-column(label="Protocol",:context="_self" width='120' inline-template)
            span {{row.ip_protocol | ipProtocol}}
          el-table-column(label="Operation",:context="_self" width='120' inline-template fixed="right")
            span
              +button("")(icon="edit" size="mini" @click="editipFilterDialog($index,row)")
              +button("")(icon="delete" size="mini" type="danger" @click="deleteIpFilter($index,row)")
        +formBtn()
      el-dialog(:title="page.action=='edit'?'Edit':'Add'" v-model="page.dialog")
        +form("formData")
          +input("IP Address:","lan_ip")
          +input("LAN Port:","lan_port")
          +input("WAN IP Address:","wan_ip")
          +input("WAN Port:","wan_port")
          +select("Protocol:","ip_protocol")
          //-+input("Protocol:","IpProtocol")
          +formItem("")
            +button("Apply")(type="primary" @click="ediApply")
            +button("Cancel")(@click="reset")
</template>

<script>
import{$,_,_config} from '../../common.js';
let Config = _config.ipFilter;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          ipFilter_list:[],
          dialog:false,
          action:"edit",
          indexs: -1,
          filter_policy:"",
          total_num:0

        }
        this.sdk.get("GetIPFilterList", null, (res) => {
          this.formData.filter_policy=res.filter_policy;
          this.page.ipFilter_list=res.ipFilter_list;
          this.page.filter_policy=res.filter_policy;
          this.page.total_num=res.total_num;
        })
      },
      editipFilterDialog(index,item) {
        this.$refs.formData.resetFields();
        this.formData.lan_ip=item.lan_ip;
        this.formData.lan_port=item.lan_port;
        this.formData.wan_ip=item.wan_ip;
        this.formData.wan_port=item.wan_port;
        this.formData.ip_protocol=item.ip_protocol;
        this.page.action='edit';
        this.page.indexs=index;
        this.page.dialog = true;
      },
      ediApply() {
        let setForm=()=>{
          this.page.ipFilter_list[this.page.indexs]={};
          this.page.ipFilter_list[this.page.indexs].lan_ip=this.formData.lan_ip;
          this.page.ipFilter_list[this.page.indexs].lan_port=this.formData.lan_port;
          this.page.ipFilter_list[this.page.indexs].wan_ip=this.formData.wan_ip;
          this.page.ipFilter_list[this.page.indexs].wan_port=this.formData.wan_port;
          this.page.ipFilter_list[this.page.indexs].ip_protocol=this.formData.ip_protocol;
          let params ={
            filter_policy:this.formData.filter_policy,
            ipFilter_list:this.page.ipFilter_list,
            total_num:this.page.ipFilter_list.length
          }
          this.sdk.post("SetIPFilter", params, {
            callback: this.init
          })
        }

        this.submit("formData", setForm)
      },
      add() {
        this.page.action='add';
        this.formData.lan_ip="";
        this.formData.lan_port="";
        this.formData.wan_ip="";
        this.formData.wan_port="";
        this.formData.ip_protocol=6;
        this.page.dialog = true;
        this.$refs.formData.resetFields();
        this.page.indexs=this.page.ipFilter_list.length;
      },
      deleteIpFilter(index) {
        this.page.ipFilter_list.splice(index, 1);
        let params={
          filter_policy: this.page.filter_policy,
          ipFilter_list: this.page.ipFilter_list,
          total_num:this.page.ipFilter_list.length
        }
        this.sdk.post("SetIPFilter", params, {
          callback: this.init
        })
      },
      update() {
        let params = {
          filter_policy: this.formData.filter_policy,
          ipFilter_list: this.page.ipFilter_list,
          total_num:this.page.total_num
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