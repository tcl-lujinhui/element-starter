<template lang="jade">
  include ../components.jade
  #networkSettings
    +sideMenuPage('Settings')
      +breadcrumb("ids_netwrok_Title")
      sim-state
        +form("formData")
          +radio("ids_networkSearchMode:","NetselectionMode")
          +select("ids_netwrok_netMode:","NetworkMode")
          div.btn-wrap
            +button("ids_apply")(type="primary" @click="update",:disabled="(page.SearchState==1||page.regist_state==1)")
            +button("ids_netwrok_search")(:disabled="(page.NetworkSettings.NetselectionMode==0||formData.NetselectionMode==0||page.SearchState==1||page.regist_state==1)" type="primary" @click="refreshEvent" )
            +button("ids_cancel")(@click="reset",:disabled="(page.SearchState==1||page.regist_state==1)")    
        div.networkListBox
          table.table.nw-list(cellpadding="0" cellspacing="0" v-loading.body="page.SearchState==1||page.regist_state==1")
            tr
              th(width="25%") {{vuex.res.ids_netwrok_networkName}}
              th(width="25%") {{vuex.res.ids_netwrok_networkType}}
              th(width="25%") {{vuex.res.ids_state}}
              th(width="25%")
            tr(v-for="list in page.listNetworkItem" v-show="page.SearchState==2")
              td(width="25%") {{list.FullName}}
              td(width="25%") {{list.Rat | networkRat}}
              td(width="25%") {{list.State | networkState}}
              td(width="25%")
                +button('ids_netwrok_register')(v-show="list.State==2||list.State==1" @click="selectEvent(list.NetworkID)")
             
        p.select_result {{vuex.res.ids_fail}}
        p.select_text {{vuex.res.ids_net_searching}}
</template>

<script>
import {
  _,
  _config,
  $,
  vuex,
  G
} from '../../common.js';
var Config = _config.networkSettings
export default {
  created() {
      this.init();
      this.initdata(Config);
    },
    methods: {
      init() {
        this.vuex = vuex
        vuex.initSimInfo()
        this.page = {
          actionType: 0, //0:list;1:edit;2:new
          listNetworkItem: [],
          State: "",
          indexs: -1,
          SearchState: '',
          regist_state:0,
          NetworkSettings:{}
        };
        this.sdk.get("GetNetworkSettings", null, (res) => {
          $.extend(this.page.NetworkSettings,res)
          this.formData = res;
        })
      },
      changeNetwork() {
        let vm = this;
        vm.$refs.formData.resetFields()
       // vm.page.actionType = 0;
        vm.initnetlist()
        let currentNetwork = $.grep(vm.page.listNetworkItem, function(n, i) {
          return n.NetworkID === vm.page.currentNetworkID;
        })[0];
        vm.formData = $.extend({}, currentNetwork);
      },

      initnetlist() {
        let vm = this
        let listStr = "";
        this.sdk.get("SearchNetworkResult", null, (res) => {
          this.page.listNetworkItem = res.ListNetworkItem;
          this.page.SearchState = res.SearchState;
          if(vm.page.SearchState==G.NETWORK_SEARCH_STATE_SEARCHING){
            setTimeout(()=>{
              vm.initnetlist();
            },4000)
          }
        })
      },

      update() {
        let params = {
            NetworkMode: this.formData.NetworkMode,
            NetselectionMode: this.formData.NetselectionMode
          }
        this.sdk.post("SetNetworkSettings", params, {
          callback: this.init
        })

      },

      refreshEvent() {
        let vm = this
        let results = {
          callback: this.init,
          success: {
            tips: "None",
            callback() {
              vm.initnetlist();
            }
          }
        };
        this.sdk.post("SearchNetwork", "", results);
      },
      
      getRegisterResult(){
        let vm = this
        this.sdk.get("GetNetworkRegisterState", null, (res) => {
          this.page.regist_state = res.regist_state;
          if(vm.page.regist_state==G.NETWORK_REGISTER_STATE_REGISTERING){
            setTimeout(()=>{
              vm.getRegisterResult();
            },4000)
          }else if(vm.page.regist_state==G.NETWORK_REGISTER_STATE_SUCCESSFUL){
            vm.$message.success(vuex.res.ids_success)
            vm.init()
          }else{
            vm.$message.error(vuex.res.ids_fail)
            vm.init()
          }
        })
      },

      selectEvent(id) {
        let vm=this;
        let params = {NetworkID: id}
        let results = {
          callback: this.init,
          success: {
            tips: "None",
            callback(){
              vm.page.SearchState=G.NETWORK_SEARCH_STATE_NONE
              vm.page.listNetworkItem=[]
              vm.getRegisterResult()
            }
          },
          fail: {
            callback: vm.init
          }
        }
        vm.sdk.post("RegisterNetwork", params, results)
      },
      reset() {
        this.init();
      }
    }
}
</script>

<style lang="sass" scoped>
.nw-list {
  width: 100%;
}

p.select_text, p.select_result {
  height: 25px;
  line-height: 25px;
  background: #fff;
  color: #000;
  margin: 0 1px;
  border-top: 1px solid #ccc;
  padding: 0 7px;
  display: none
}

.btn-wrap {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%
}

.networkListBox {
  margin: 0px auto;
  width: 80%;
  min-height: 250px;
}
.table{
  tr,tr th,tr td{
    line-height: 22px;
    padding:5px;
  }
}
</style>
