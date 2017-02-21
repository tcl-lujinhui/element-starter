<template lang="jade">
  include ./components.jade
  #fota
    div
      div(style="width:500px;margin:15px 0 0;")
        el-form(:inline="true" label-width="0")
          el-form-item(label="" prop="name")
            el-input(v-model="searchVal" @change="search")
              el-button(slot="prepend" icon="search")
              template(slot="append") {{firmwaresList.length}}/{{initFirmwaresList.length}}

      el-button(type="primary" size="small" icon="upload" @click="upload") Upload

      el-dialog(title="Upload" v-model="updloadDialogFormVisible" size="tiny")
        el-form(label-width="100px")
          el-form-item(label="Info:")
            el-input(v-model="datas.info")
          //-el-form-item(label="hw")
            el-input(v-model="datas.hw_version")
          //-el-form-item(label="hw_version")
            el-input(v-model="datas.sw_version")
        el-upload(v-if="updloadDialogFormVisible" action="/firmware/pub",:data="datas",:before-upload="beforeUpload",:on-success="uploadSuccess",:show-upload-list="true" name="filedata")
          el-form(label-width="100px")
            el-form-item(label="")
              el-button(size="small" type="primary") Select File

      table.table
        tr
          th Info
          th HW version
          th SW version
          th Size
          th Upload Time
          th.center Public
          th.center Delete
        tr(v-if="loadingList")
          td.center(colspan="7") 
            el-tag(type="primary") loading....
        tr(v-for="list in firmwaresList" v-if="!loadingList")
          td {{list.info}}
          td 
            el-tag(type="gray") {{list.hw_version}}
          td 
            el-tag(type="gray") {{list.sw_version}}
          td {{list.size | bytesToSize}}
          td {{list.pub_time}}
          td.center
            el-tooltip(:content="list.public?'点击转为Test版本':'点击发布版本'")
              el-button(size="mini",:icon="list.public?'star-on':'star-off'",:type="list.public?'success':'default'" @click="publicFn(list.hw_version,list.sw_version,!list.public)")
          td.center
            el-tooltip(content="delete")
              el-button(size="mini" icon="delete" type="danger" @click="del(list.hw_version,list.sw_version)")

      
</template>

<script>
import {
  $,
  _,
  _config,
  vuex
} from '../common.js'
import VueRouter from 'vue-router'
export default {
  data() {
      return {
        datas:{
          info:"",
          hw_version:"",
          sw_version:""
        },
        updloadDialogFormVisible:false,
        loadingList:true,
        searchVal: "",
        initFirmwaresList: [],
        firmwaresList: []
      }
    },
    created() {
      this.getlist()
    },
    methods: {
      getlist() {
        this.$http.get("/firmware/info?"+Math.random(), {}).then((res) => {
          this.initFirmwaresList = res.body.firmwares;
          this.loadingList= false;
          this.search()
        }, (response) => {
          this.loadingList= false;
        });
      },
      search() {
        let searchVal = $.trim(this.searchVal)
        if(searchVal==""){
          this.firmwaresList = this.initFirmwaresList
        }else{
          searchVal = searchVal.toUpperCase()
          if(this.initFirmwaresList.length>0){
            this.firmwaresList = _.filter(this.initFirmwaresList, (list) => {
              return list["info"].toUpperCase().indexOf(searchVal) != -1||list["hw_version"].toString().indexOf(searchVal) != -1||list["sw_version"].toString().indexOf(searchVal) != -1
            });
          }
        } 
      },
      publicFn(hw_version,sw_version,state){
        let url = "/firmware/public?hw_version="+hw_version+"&sw_version="+sw_version+"&public="+state
        let vm = this;
        vm.$http.get(url, {}).then((res) => {
          vm.$message.success('Successful');
          vm.getlist()
        }, (response) => {
          vm.$message.error('fail');
        });
      },
      del(hw_version,sw_version){
        let url = "/firmware/del?hw_version="+hw_version+"&sw_version="+sw_version
        let vm = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.get(url, {}).then((res) => {
            vm.$message.success('delete Successful!');
            vm.getlist()
          }, (response) => {
            vm.$message.error('delete fail');
          });
        }).catch(() => {
          //vm.$message.info("undelete");          
        });
        
      },
      beforeUpload(file){
        if($.trim(this.datas.info)==""){
          this.datas.info=file.name
        }
        try {
        let fileNameArr = file.name.split("_");
        this.datas.hw_version = fileNameArr[1].slice(2).toString()
        this.datas.sw_version = fileNameArr[2].slice(2).toString()
        }catch (error1) {
          this.$message.error('文件格式错误');
          return false;
        }
        if(this.datas.hw_version==""||this.datas.sw_version==""){
          this.$message.error('文件格式命名错误');
          return false;
        }else{
          return true;
        }
      },
      uploadSuccess(response, file, fileList){
        let vm = this;
        this.$message({
          message: '上传成功',
          duration:1000,
          type: 'success',
          onClose(){
            vm.updloadDialogFormVisible=false;
            vm.getlist()
          }
        });
      },

      upload(){
        this.updloadDialogFormVisible=true
      }
    }
}
</script>


<style lang="sass" scoped>
.table{
  margin-top: 5px;
}
.el-form-item {
  margin-bottom: 5px;
}
</style>