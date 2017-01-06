<template lang="jade">
  include ../components.jade
  #localUpgrade
    +sideMenuPage('System')
      +breadcrumb("Local")
      +form("formData")
        el-row(:gutter="11")
          el-col.textAlignRight(:span="8") Local upgrade:
          el-col(:span="16")
            div.uploadFile
              input.fileUpload(type="file" id="fileUpload" name="fileUpload")(v-on:change = "showUpgradeFileUrl()")
              el-input(size="small" class="inline-input" placeholder="Please Choice File" v-model="page.fileUrlName", :change="changeUpload()")
              +button("Browse")(size="small" type="primary")
            +button("Upgrade")(size="small" type="primary" @click="update", :disabled="page.upgradeDisabled")
        el-dialog(title="Local Upgrade" v-model="page.alertUpdating")
          el-progress(:text-inside="true", :stroke-width="18", :percentage="page.percentage")
          div.loadingTxt loading......
        div.noteTips Note:<br />During the upgrade, esp. when all indicators except Power on the device blink, DO NOT power off the device, otherwise, it may be severely damaged


      //-div {{$route.name}}

</template>

<script>
import {$} from '../../common.js'
import {G,_config} from '../../common.js'
import ElementUI from 'element-ui'
var Config = _config.localUpgrade

export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
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