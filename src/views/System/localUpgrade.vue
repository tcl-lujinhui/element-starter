<template lang="jade">
  include ../components.jade
  #localUpgrade
    +sideMenuPage('System')
      +breadcrumb("ids_pb_local")
      +form("formData")
        el-row(:gutter="11")
          el-col.textAlignRight(:span="8") {{vuex.res.ids_update_localUpgrade}}
          el-col(:span="16")
            div.uploadFile
              input.fileUpload(type="file" id="fileUpload" name="fileUpload")(v-on:change = "showUpgradeFileUrl()")
              el-input(size="small" class="inline-input" placeholder="Please Choice File" v-model="page.fileUrlName", :change="changeUpload()")
              +button("ids_update_Browse")(size="small" type="primary")
            +button("ids_update_upgrade")(size="small" type="primary" @click="update", :disabled="page.upgradeDisabled")
        el-dialog(:title="vuex.res.ids_update_localUpgrade" v-model="page.alertUpdating" close-on-press-escape=false close-on-click-modal=false show-close=false)
          el-progress(:text-inside="true", :stroke-width="18", :percentage="page.percentage")
          div.loadingTxt {{vuex.res.ids_update_Updating}}
        div.noteTips {{vuex.res.ids_note}}:<br />{{vuex.res.ids_update_upgradingWarning}}


      //-div {{$route.name}}

</template>

<script>
import {$,vuex,G,_config} from '../../common.js'
import ElementUI from 'element-ui'
import ajaxFileUpload from '../../plugin/ajaxfileupload.js'
var Config = _config.localUpgrade

export default {
  created () {
    this.init();
    this.initdata(Config);
  },
  methods: {
    init (){
      this.vuex = vuex
      this.page = {
        fileUrlName:"",
        percentage:50,
        alertUpdating:false,
        upgradeDisabled:false
      }
    },
    showUpgradeFileUrl(){
      var urlPath = $("#fileUpload").val();
      //var imageUrlArr = urlPath.split("\\");
      //var imageName = imageUrlArr[imageUrlArr.length-1];
      this.page.fileUrlName = urlPath;
    },
    changeUpload(){
      if($.trim(this.page.fileUrlName) != ''){
        this.page.upgradeDisabled = false;
      }else{
        this.page.upgradeDisabled = true;
      }
    },
    update (){
      if(this.page.fileUrlName!= ""){
        this.page.alertUpdating = true;
        $.ajaxFileUpload({
            url: "/goform/uploadLocalUpdateSettings",
            secureuri: false,
            fileElementId: "fileUpload",
            dataType: "json",
            complete: function() {
                //page.stopLoading();
                console.log("complete"); 
            },
            success: function(data, status) {
                if (data.error == 0) {
                    //sys.alert("ids_success");
                    console.log("Device restored.Now restarting");
                } else {
                  console.log("fail");
                }
            },
            error: function(data, status, e) {
              console.log("error");
            }
        });
        this.page.percentage = 70;
      }
      /*this.sdk.post("SetDeviceStartUpdate",this.formData,(res)=>{

      });*/
      
    },

  }
}
</script>
<style lang="sass" scoped>

.noteTips{
  padding:101px 0 5px 0;
  font-size: 12px;
}
.loadingTxt{
  padding:20px 0;
  text-align:center;
}
</style>