<template lang="jade">
  include ./components.jade
  #home
    div
      div(style="width:500px;margin-top:15px;")
        el-form(label-width="0")
          el-form-item(label="" prop="name")
            el-input(v-model="searchVal" @change="search")
              el-button(slot="prepend" icon="search")
              template(slot="append") {{firmwaresList.length}}/{{initFirmwaresList.length}}
      table.table
        tr
          th Info
          th HW version
          th SW version
          th Size
          th Upload Time
          th.center Public
          th.center operation
        tr(v-if="loadingList")
          td.center(colspan="7") 
            h3 loading....
        tr(v-for="list in firmwaresList" v-if="!loadingList")
          td {{list.info}}
          td 
            el-tag(type="gray") {{list.hw_version}}
          td 
            el-tag(type="gray") {{list.sw_version}}
          td {{list.size | bytesToSize}}
          td {{list.pub_time}}
          td.center
            el-tooltip(:content="list.public?'点击发布为Test版本':'点击发布为发布版本'")
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
        this.$http.get("/firmware/info", {}).then((res) => {
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
        alert(url)
      },
      del(hw_version,sw_version){
        let url = "/firmware/del?hw_version="+hw_version+"&sw_version="+sw_version
        alert(url)
      },
      upload(){

      }
    }
}
</script>


<style lang="sass" scoped>
</style>