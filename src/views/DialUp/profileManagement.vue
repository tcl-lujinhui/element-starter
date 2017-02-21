<template lang="jade">
  include ../components.jade
  #profileManagement
    +sideMenuPage('Settings')
      +breadcrumb("ids_profile_pageTitle")
      +form("formData")
        +formItem("ids_profile_pageTitle:")
          el-select(v-model.mumber="page.currentProfileId" @change="changeProfile()")
            el-option(v-for="val in profileList",:label="val.Default==1?val.ProfileName+'(D)':val.ProfileName",:value.number="val.ProfileID")
        +input("ids_profile_name:","ProfileName")(:disabled="page.actionType==0")
        +input("ids_profile_dialNumber:","DailNumber")(:disabled="page.actionType==0")
        +input("ids_profile_apn:","APN")(:disabled="page.actionType==0")
        +input("ids_profile_userName:","UserName")(:disabled="page.actionType==0")
        +input("ids_profile_password:","Password")(type="password",:disabled="page.actionType==0")
        +select("ids_protocol:","AuthType")(:disabled="page.actionType==0")
        div.center
          +button("ids_new")(@click="newProfile",:disabled="page.actionType==2||page.actionType==1")
          +button("ids_edit")(@click="editProfile",:disabled="page.actionType==2||page.actionType==1||page.currentProfileId==''")
          +button("ids_save")(@click="saveProfile",:disabled="page.actionType==0")
          +button("ids_delete")(@click="delProfile()",:disabled="defaultProfile.ProfileID==page.currentProfileId||page.actionType!=0||page.currentProfileId==''")
          +button("ids_profile_setDefault")(@click="setDefaultProfile",:disabled="defaultProfile.ProfileID==page.currentProfileId||page.actionType!=0||page.currentProfileId==''||page.ConnectionStatus==G.WAN_STATE_CONNECTED||page.ConnectionStatus==G.WAN_STATE_CONNECTING||page.ConnectionStatus==G.WAN_STATE_DISCONNECTING")

</template>

<script>
import {
  _,
  _config,
  $,
  vuex,
  G
} from '../../common.js';
var Config = _config.profileManagement;
export default {
  created() {
      this.init();
      this.initdata(Config)
    },
    methods: {
      init() {
        this.G = G
        this.vuex = vuex
        this.page = {
          currentProfileId: 1,
          actionType: 0,
          //0:list;1:edit;2:new
          indexs: -1,
          ConnectionStatus: ""
        }
        this.profileList = {};
        this.defaultProfile = {};
        this.curprofile_operate = null;
        this.sdk.get("GetProfileList", null, (res) => {
          this.profileList = res.ProfileList;
          let defaultProfile = $.grep(res.ProfileList, function(n, i) {
            return n.Default === 1;
          })[0];
          this.formData = $.extend({}, defaultProfile);
          this.defaultProfile = $.extend({}, defaultProfile);
          if (defaultProfile != undefined) {
            this.page.currentProfileId = defaultProfile.ProfileID;
          } else {
            this.page.currentProfileId = "";
          }
        })
        this.sdk.get("GetConnectionState", null, (res) => {
          this.page.ConnectionStatus = res.ConnectionStatus;
        })

      },

      changeProfile() {
        let vm = this;
        vm.$refs.formData.resetFields()
        vm.page.actionType = 0;
        let currentProfile = $.grep(vm.profileList, function(n, i) {
          return n.ProfileID === vm.page.currentProfileId;
        })[0];
        vm.formData = $.extend({}, currentProfile);
      },

      newProfile() {
        let vm = this;
        //vm.$refs.formData.resetFields()
        this.formData = $.extend({}, Config.initNewData)
        this.page.actionType = 2;
        this.curprofile_operate = "add";
      },
      editProfile() {
        let vm = this;
        //vm.$refs.formData.resetFields()
        this.page.actionType = 1;
        this.curprofile_operate = "edit";
      },
      saveProfile() {
        let vm = this;
        let results = {
          callback: this.init,
        }
        if (this.curprofile_operate == "add") {
          this.submit("formData", () => {
            this.sdk.post("AddNewProfile", this.formData, results)
          })
        } else if (this.curprofile_operate == "edit") {
          this.submit("formData", () => {
            this.sdk.post("EditProfile", this.formData, results)
          })

        } else {
          console.log(res)
        }

      },
      delProfile() {
        let vm = this;
        this.page.actionType = 0;
        vm.$refs.formData.resetFields()
        let params = {
          ProfileID: vm.formData.ProfileID
        }
        let results = {
          callback: this.init,
        }
        this.sdk.post("DeleteProfile", params, results)
      },
      setDefaultProfile() {
        let vm = this
        this.page.actionType = 0;
        //vm.$refs.formData.resetFields()
        let params = {
          ProfileID: vm.formData.ProfileID
        }
        let results = {
          callback() {
            //vm.$refs.formData.resetFields();
            //vm.init()
            location.reload()
          }
        }
        this.sdk.post("SetDefaultProfile", params, results)
      }
    }
}
</script>

<style lang="sass" scoped>
</style>