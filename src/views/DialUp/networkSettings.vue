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
            +button("Apply")(type="primary" @click="update" )
            +button("Search")(:disabled="formData.NetselectionMode==0" type="primary" @click="refreshEvent" )
            +button("Cancel")(@click="reset")    
        div.networkListBox
          table.nw-list(cellpadding="0" cellspacing="0")
            tr
              th(width="25%") {{vuex.res.ids_netwrok_networkName}}
              th(width="25%") {{vuex.res.ids_netwrok_networkType}}
              th(width="25%") {{vuex.res.ids_net_status}}
              th(width="25%")
            tr(v-loading.body="page.SearchState==1||page.regist_state==1" v-show="page.SearchState==1||page.regist_state==1")
              td(row="4")
            tr(v-for="list in page.listNetworkItem" v-show="page.SearchState==2")
              td(width="25%") {{list.FullName}}
              td(width="25%") {{list.Rat | networkRat}}
              td(width="25%") {{list.State | networkState}}
              td(width="25%")
                +button('register')(v-show="list.State==2||list.State==1" @click="selectEvent(list.NetworkID)")
             
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
        let vm = this
        this.vuex = vuex
        vuex.initSimInfo()
        this.page = {
          actionType: 0, //0:list;1:edit;2:new
          listNetworkItem: [],
          State: "",
          indexs: -1,
          SearchState: '',
          regist_state:0
        };
        this.sdk.get("GetNetworkSettings", null, (res) => {
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
            tips: "Message",
            msg: this.vuex.res.ids_success,
            callback() {
              vm.initnetlist();
            }
          },
          fail: {
            tips: "Message",
            msg: "fail!",
            callback: this.init
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
          }
        })
      },

      selectEvent(id) {
        let params = {
          NetworkID: id
        }
        let vm=this;
        let results = {
          callback: this.init,
          success: {
            tips: "None",
            callback(){
              vm.getRegisterResult()
            }
          },
          fail: {
            callback: this.init
          }
        }
        this.sdk.post("RegisterNetwork", params, results)
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

table th {
  font-weight: normal;
  color: #333;
  border: 1px solid #ccc;
  background: #fff;
  height: 20px;
  line-height: 20px;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.nw-list td,
.nw-list th {
  color: #333;
  border: 1px solid #ccc;
  background: #fff;
  height: 20px;
  line-height: 20px;
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
}
</style>
