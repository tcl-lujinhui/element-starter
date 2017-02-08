<template lang="jade">
  include ../components.jade
  #restore
    +sideMenuPage('System')
      +breadcrumb("ids_system_backupRestore")
      +form("formData")
        div.backupRestore(v-loading.fullscreen.lock="page.fullscreenLoading")
          el-row(:gutter="15")
            el-col.textAlignRight(:span="5") {{vuex.res.ids_backup}}
            el-col(:span="15") 
              div.backupTxt {{vuex.res.ids_system_backupDescription}}
              +button("ids_backup")(size="small" type="primary" @click="backupFile")
          el-row.restoreArea(:gutter="15")
            el-col.textAlignRight(:span="5") {{vuex.res.ids_restore}}
            el-col(:span="15")
              div.uploadFile
                input.fileUpload(type="file" id="fileUpload" name="fileUpload")(v-on:change = "showUpgradeFileUrl()")
                el-input(size="small" class="inline-input" placeholder="" v-model="page.fileUrlName", :change="changeInput()")
                +button("ids_update_Browse")(size="small" type="primary")
              +button("ids_restore")(size="small" type="primary" @click="restoreDevice", :disabled="page.restoreDisabled")
          el-dialog(v-model="page.deviceRestored" size="tiny" top="50%" show-close = false)
              span {{vuex.res.ids_restore_evice_restored}}

</template>
<script>
import {$,vuex} from '../../common.js'
import ajaxFileUpload from '../../plugin/ajaxfileupload.js'
import ElementUI from 'element-ui'
export default {
  created() {
    this.init();
  },
  methods: {
    init(){
      this.vuex = vuex
      this.page = {
        fileUrlName:"",
        deviceRestored:false,
        restoreDisabled:false,
        fullscreenLoading:false
      }
    },
    showUpgradeFileUrl(){
      var urlPath = $("#fileUpload").val();
      //var imageUrlArr = urlPath.split("\\");
      //var imageName = imageUrlArr[imageUrlArr.length-1];
      this.page.fileUrlName = urlPath;
    },
    changeInput(){
      if($.trim(this.page.fileUrlName) != ''){
        this.page.restoreDisabled = false;
      }else{
        this.page.restoreDisabled = true;
      }
    },
    backupFile(){
        var _self = this;
        let setResult = {
            success:{
                tips:"Message",
                msg:vuex.res["ids_success"],
                callback(){
                    _self.getBackupSettings();
                }
            },
            fail:vuex.res["ids_fail"]
        }
        this.sdk.post("SetDeviceBackup",this.formData,setResult);

    },
    restoreDevice(){
      if(this.page.fileUrlName!= ""){
        this.$confirm(vuex.res['ids_restore_factory_settings'], vuex.res['ids_restore'], {
          confirmButtonText: vuex.res['ids_restore'],
          cancelButtonText: vuex.res['ids_cancel']
        }).then(() => {
          this.ajaxFileUploadEvent();
        }).catch(() => {
           console.log("Cancel Restore");
        });
      }
    },
    getBackupSettings(){
      $("body").append("<iframe src='/cfgbak/configure.bin' style='display: none'></iframe>");
    },
    ajaxFileUploadEvent(){
      var _self = this;
      this.page.fullscreenLoading = true;
      $.ajaxFileUpload({
            url: "/goform/uploadBackupSettings",
            secureuri: false,
            fileElementId: "fileUpload",
            dataType: "json",
            complete: function() {
                //page.stopLoading();
                _self.page.fullscreenLoading = false
                console.log("complete"); 
                _self.page.deviceRestored = false;
            },
            success: function(data, status) {
                if (data.error == 0) {
                    //sys.alert("ids_success");
                    console.log("Device restored.Now restarting…");
                    _self.page.deviceRestored = true;
                } else {
                  console.log("fail");
                  _self.$alert(vuex.res['ids_restore_device_restoration'], vuex.res['ids_restore'], {
                    confirmButtonText: vuex.res['ids_ok']
                  });
                }
            },
            error: function(data, status, e) {
              console.log("error");
              _self.$alert(vuex.res['ids_restore_device_restoration'], vuex.res['ids_restore'], {
                confirmButtonText: vuex.res['ids_ok']
              });
            }
        });
    },
    
  }
}
</script>
<style lang="sass" scoped>
</style>