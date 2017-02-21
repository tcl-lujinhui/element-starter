<template lang="jade">
  include ../components.jade
  #userSettings
    +sideMenuPage('Services')    
      +breadcrumb("ids_user_deviceAccess")
      h4 {{vuex.res.ids_user_defaultForNew}}
      +form("page.defaultRight")
        +formItem("ids_user_accessInternet:")
          el-switch(v-model="page.accessInternetRight" @change="setDefaultRight()" on-text="" off-text="")
        +formItem("ids_user_accessStorage:")
          el-switch(v-model="page.accessStorageRight" @change="setDefaultRight()" on-text="" off-text="")
      h4 {{vuex.res.ids_menu_connectDevice}} ({{page.connectedListData.length}})
      el-table(:data="page.connectedListData" style="width: 100%")  
        el-table-column(:label="vuex.res.ids_device" width='150' inline-template)
          span
            | {{row.DeviceName}}
            +button("")(icon="edit" size="mini" @click="editDeviceNameDialog(row)")
        el-table-column(prop="IPAddress",:label="vuex.res.ids_user_IP" width='120')
        el-table-column(prop="MacAddress",:label="vuex.res.ids_lan_macAdress" width='120')
        el-table-column(prop="AssociationTime",:label="vuex.res.ids_duration" width='100' inline-template)
          span
            | {{row.AssociationTime | times('2')}}
        el-table-column(prop="InternetRight",:label="vuex.res.ids_user_accessInternet" width='80' inline-template)
          el-switch(v-model="row.exAccessInternetRight" @change="SetConnectedDeviceRight(row)" on-text="" off-text="")
        el-table-column(prop="StorageRight",:label="vuex.res.ids_user_accessStorage" width='80' inline-template)
          el-switch(v-model="row.exAccessStorageRight" @change="SetConnectedDeviceRight(row)" on-text="" off-text="")       
        el-table-column(:label="vuex.res.ids_netwrok_operation",:context="_self" width='100' inline-template)
          span
            +button("ids_btn_block")(:disabled="!row.exAllowBlock" size="mini" type="danger" @click="blockEvent(row)")
      h4 {{vuex.res.ids_title_blockDevice}} ({{page.blockedListData.length}})
      el-table(:data="page.blockedListData" style="width: 100%")
        el-table-column(prop="DeviceName",:label="vuex.res.ids_device" width='325')
        el-table-column(prop="MacAddress",:label="vuex.res.ids_lan_macAdress" width='325')
        el-table-column(:label="vuex.res.ids_netwrok_operation",:context="_self" width='100' inline-template)
          span
            +button("ids_btn_unblock")(size="mini" type="info" @click="unblockEvent(row)")
      el-dialog(:title="Edit" v-model="page.dialogFormVisible")
        +form("formData")
          +input("ids_system_deviceName:","DeviceName")(:maxlength="32")
          +formBtn()
</template>
<script>
import {_,_config,$,vuex,G} from '../../common.js';
let Config = _config.userSettings;
export default {
  created() {
      this.init();      
      this.initdata(Config);
    },
    watch: {
      'vuex.SystemStatus.TotalConnNum' (newValue, oldValue) {
        this.init()
      }
    },
    methods: {
      init() {
        this.page = {
          accessInternetRight: false,
          accessStorageRight: false,
          dialogFormVisible: false,
          connectedListData: [],
          blockedListData: [],
          defaultRight: {}
        };
        this.sdk.get("GetDeviceDefaultRight", null, (res) => {
          this.page.defaultRight = res;
          this.page.accessInternetRight = this.page.defaultRight.InternetRight == 1 ? true : false;
          this.page.accessStorageRight = this.page.defaultRight.StorageRight == 1 ? true : false;
        });
        this.sdk.get("GetConnectedDeviceList", null, (res) => {
          $.each(res.ConnectedList, function(i, v) {
            $.extend(res.ConnectedList[i], {
              "exAllowBlock": true,
              "exAccessInternetRight": v.InternetRight == 1 ? true : false,
              "exAccessStorageRight": v.StorageRight == 1 ? true : false
            });
            if (v.ConnectMode == G.CONNDEVICE_USB_DEVICE || v.ConnectType == G.CONNDEVICE_LOGINED_DEVICE) {
              $.extend(res.ConnectedList[i], {
                "exAllowBlock": false
              });
            };
          });
          this.page.connectedListData = res.ConnectedList;
        });
        this.sdk.get("GetBlockDeviceList", null, (res) => {
          this.page.blockedListData = res.BlockList;
        });
      },
      setDefaultRight() {
        let results = {
          callback:this.init
        };
        this.page.defaultRight.InternetRight = this.page.accessInternetRight == true ? 1 : 0;
        this.page.defaultRight.StorageRight = this.page.accessStorageRight == true ? 1 : 0;
        this.sdk.post("SetDeviceDefaultRight", this.page.defaultRight, results);
      },
      SetConnectedDeviceRight(item) {
        let params = {
          "DeviceName":item.DeviceName,
          "MacAddress": item.MacAddress,
          "InternetRight": item.exAccessInternetRight == true ? 1 : 0,
          "StorageRight": item.exAccessStorageRight == true ? 1 : 0
        }
        let results = {
          callback:this.init
        };
        this.sdk.post("SetConnectedDeviceRight", params, results);
      },
      blockEvent(item) {
        let params = {
          DeviceName: item.DeviceName,
          MacAddress: item.MacAddress
        }
        let results = {
          callback:this.init
        };
        this.sdk.post("SetConnectedDeviceBlock", params, results);
      },
      unblockEvent(item) {
        let params = {
          DeviceName: item.DeviceName,
          MacAddress: item.MacAddress
        }
        let results = {
          callback:this.init
        };
        this.sdk.post("SetDeviceUnblock", params, results);
      },
      editDeviceNameDialog(item) {
        this.formData = {
          "DeviceName": item.DeviceName,
          "MacAddress": item.MacAddress
        }
        this.page.dialogFormVisible = true;
      },
      update() {
        let results = {
          callback:this.init
        };
        this.sdk.post("SetDeviceName", this.formData, results);
      }
    }
}
</script>
<style lang="sass" scoped>
</style>
