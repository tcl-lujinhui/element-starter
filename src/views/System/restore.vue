<template lang="jade">
  include ../components.jade
  #restore
    +sideMenuPage('System')
      +breadcrumb("Backup & Restore")
      +form("formData")
        div.backupRestore
          el-row(:gutter="15")
            el-col.textAlignRight(:span="5") Backup:
            el-col(:span="15") 
              div.backupTxt Backup current settings of the device.
              +button("Backup")(size="small" type="primary" @click="backupFile")
          el-row.restoreArea(:gutter="15")
            el-col.textAlignRight(:span="5") Restore:
            el-col(:span="15")
              div.uploadFile
                input.fileUpload(type="file" id="fileUpload" name="fileUpload")(v-on:change = "showUpgradeFileUrl()")
                el-input(size="small" class="inline-input" placeholder="Tap to select file" v-model="page.fileUrlName", :change="changeInput()")
                +button("Browse")(size="small" type="primary")
              +button("Restore")(size="small" type="primary" @click="restoreDevice", :disabled="page.restoreDisabled")
          el-dialog(v-model="page.deviceRestored" size="tiny" top="50%" show-close = "false")
              span Device restored.Now restarting¡­

</template>
<script>
import {$} from '../../common.js'
import ajaxFileUpload from '../../plugin/ajaxfileupload.js'
import ElementUI from 'element-ui'
export default {
  created() {
    this.init();
  },
  methods: {
    init(){
      this.page = {
        fileUrlName:"",
        deviceRestored:false,
        restoreDisabled:false
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
        this.sdk.post("SetDeviceBackup",this.formData,(res)=>{
          if(this.requestJsonRpcIsOk(res)){
            ElementUI.Message.success("succeed");
            this.getBackupSettings()
          }else{
            ElementUI.Message.error("failed");
          }
          
        })

    },
    restoreDevice(){
      if(this.page.fileUrlName!= ""){
        this.$confirm('Restore your device to factory settings now?', 'Restore', {
          confirmButtonText: 'Restore',
          cancelButtonText: 'Cancel'
          //type: 'info'
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
    requestJsonRpcIsOk(result) {
        return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
    },
    ajaxFileUploadEvent(){
      var _self = this;
      $.ajaxFileUpload({
            url: "/goform/uploadBackupSettings",
            secureuri: false,
            fileElementId: "fileUpload",
            dataType: "json",
            complete: function() {
                //page.stopLoading();
                console.log("complete"); 
                _self.page.deviceRestored = false;
            },
            success: function(data, status) {
                if (data.error == 0) {
                    //sys.alert("ids_success");
                    console.log("Device restored.Now restarting¡­");
                    _self.page.deviceRestored = true;
                } else {
                  console.log("fail");
                  _self.$alert('Device restoration not complete. Restart device and try again.', 'Restore', {
                    confirmButtonText: 'OK'
                  });
                }
            },
            error: function(data, status, e) {
              console.log("error");
              _self.$alert('Device restoration not complete. Restart device and try again.', 'Restore', {
                confirmButtonText: 'OK'
              });
            }
        });
    },
    
  }
}
</script>
<style lang="sass" scoped>
</style>