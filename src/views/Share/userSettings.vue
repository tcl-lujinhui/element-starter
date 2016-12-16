<template lang="jade">
  include ../components.jade
  #userSettings
    +sideMenuPage('Services')    
      +breadcrumb("User Settings")
      h4 Default for New
      +form("page.defaultRight")
        +formItem("Access Internet:")
          el-switch(v-model="page.accessInternetRight" @change="setDefaultRight()" on-text="" off-text="")
        +formItem("Access Storage:")
          el-switch(v-model="page.accessStorageRight" @change="setDefaultRight()" on-text="" off-text="")
      h4 Connected Devices
      el-table(:data="page.connectedListData")
        el-table-column(label="Device" width='150' inline-template)
          span
            | {{row.DeviceName}} 
            +button("")(icon="edit" size="mini" @click="editDeviceNameDialog(row)")
        el-table-column(prop="IPAddress" label="IP" width='120')
        el-table-column(prop="MacAddress" label="Mac Address" width='120')
        el-table-column(prop="AssociationTime" label="Duration" width='100')
        el-table-column(prop="InternetRight" label="Access Internet" width='80' inline-template)
          el-switch(v-model="row.exAccessInternetRight" @change="SetConnectedDeviceRight(row)" on-text="" off-text="")
        el-table-column(prop="StorageRight" label="Access Storage" width='80' inline-template)
          el-switch(v-model="row.exAccessStorageRight" @change="SetConnectedDeviceRight(row)" on-text="" off-text="")
        el-table-column(label="Operation" fixed="right",:context="_self" width='100' inline-template)
          span
            +button("block")(:disabled="!row.exAllowBlock" size="mini" @click="blockEvent(row)")
      h4 Blocked Devices
      el-table(:data="page.blockedListData")
        el-table-column(prop="DeviceName" label="Device" width='325')
        el-table-column(prop="MacAddress" label="Mac Address" width='325')
        el-table-column(label="Operation" fixed="right",:context="_self" width='100' inline-template)
          span
            +button("unblock")(size="mini" @click="unblockEvent(row)")
      el-dialog(:title="Edit" v-model="page.dialogFormVisible")
        +form("formData")
          +input("Device Name:","DeviceName")(:maxlength="32")
          +formBtn()
</template>
<script>
import $ from 'jquery';
import _ from 'underscore';
import G from "../../config/G.js";
import _config from '../../config.js';
let Config = _config.userSettings;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
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
        this.page.defaultRight.InternetRight = this.page.accessInternetRight == true ? 1 : 0;
        this.page.defaultRight.StorageRight = this.page.accessStorageRight == true ? 1 : 0;
        this.sdk.post("SetDeviceDefaultRight", this.page.defaultRight, (res) => {
          console.log(res)
        })
      },
      SetConnectedDeviceRight(item) {
        let params = {
          "DeviceName":item.DeviceName,
          "MacAddress": item.MacAddress,
          "InternetRight": item.exAccessInternetRight == true ? 1 : 0,
          "StorageRight": item.exAccessStorageRight == true ? 1 : 0
        }
        this.sdk.post("SetConnectedDeviceRight", params, (res) => {
          console.log(res)
        });
      },
      blockEvent(item) {
        let params = {
          DeviceName: item.DeviceName,
          MacAddress: item.MacAddress
        }
        this.sdk.post("SetConnectedDeviceBlock", params, (res) => {
          this.init();
        });
      },
      unblockEvent(item) {
        let params = {
          DeviceName: item.DeviceName,
          MacAddress: item.MacAddress
        }
        this.sdk.post("SetDeviceUnlock", params, (res) => {
          this.init();
        });
      },
      editDeviceNameDialog(item) {
        this.formData = {
          "DeviceName": item.DeviceName,
          "MacAddress": item.MacAddress
        }
        this.page.dialogFormVisible = true;
      },
      update() {
        this.sdk.post("SetDeviceName", this.formData, (res) => {
          this.init();
        });
      }
    }
}
</script>
<style lang="sass" scoped>
.el-table .cell,
.el-table th>div {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
