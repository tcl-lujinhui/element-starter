<template lang="jade">
  include ./components.jade
  #home
    h2 Release List
    el-select(v-model="defaultProject" @change="getCustomListData(defaultProject)")
      el-option(v-for="val in projectList",:label="val.name",:value="val.name")
    div(style="width:500px;margin:15px 0 0;")
      el-form(:inline="true" label-width="0")
        el-form-item(label="" prop="name")
          el-input(v-model="searchVal" @change="search")
            el-button(slot="prepend" icon="search")
            template(slot="append")
    table.table
      tr
        th Custom Name
        th Update Author
        th Current Revision
        th Update Date
        th.center Operation
      tr(v-if="loadingList")
        td.center(colspan="5") 
          el-tag(type="primary") loading....
      tr(v-if="dialogLogVisible&listData.length==0")
        td.center(colspan="5") 
          el-tag(type="primary") 无记录
      tr(v-for="list in listData" v-if="!loadingList && list.kind=='file'")
          td 
            el-tag(type="success"){{list.name}}
          td 
            el-tag(type="gray") {{list.author}}
          td 
            el-tag(type="gray") {{list.revision}}
          td 
            el-tag(type="gray") {{list.date}}
          td.center
            el-button(@click="getFileLog(list.name)" type="primary" size="small") log
      el-dialog(title="Log list" v-model="dialogLogVisible")
        table.table
          tr(v-if="dialogLogVisible&logData.length==0")
            td.center
              el-tag(type="primary") 无记录
          tr(v-for="list in logData" v-if="dialogLogVisible&&logData.length>0")
            td 
              h2 
                el-tag {{list.info.split("|")[2].split("+")[0]}} 
                el-tag(type="success") {{list.info.split("|")[1]}} 
                el-tag(type="success") {{list.info.split("|")[0]}} 
              .log
                div(v-for="log in list.log")
                  el-tag(type="primary"){{log}}
                  br
</template>

<script>
import $ from 'jquery';
import _ from 'underscore';
export default {
  data(){
    return {
      loadingList:true,
      searchVal: "",
      dialogLogVisible:false,
      defaultProject:"HH70",
      logData:[],
      projectList:[],
      initListData: [],
      listData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.getProjectList()
    },
    getProjectList() {
      let url = "/smartreleaseapi"
      let vm = this;
      let params = {
        "method": "getCustomList",
        "params": {
          "project":""
        }
      }
      vm.$http.post(url, params).then((res) => {
        this.projectList = res.body.data;
        this.getCustomListData(this.defaultProject)
      }, (response) => {
      });
    },
    getCustomListData(project){
      let url = "/smartreleaseapi"
      let vm = this;
      let params = {
        "method": "getCustomList",
        "params": {
          "project":project
        }
      }
      vm.$http.post(url, params).then((res) => {
        this.initListData = res.body.data;
        this.search()
        this.loadingList= false;
      }, (response) => {

      });
    },
    search() {
      let searchVal = $.trim(this.searchVal)
      if(searchVal==""){
        this.listData = this.initListData
      }else{
        searchVal = searchVal.toUpperCase()
        if(this.initListData.length>0){
          this.listData = _.filter(this.initListData, (list) => {
            return list['name'].toString().toUpperCase().indexOf(searchVal) != -1
          });
        }
      } 
    },

    getFileLog(file){
      
      let url = "/smartreleaseapi"
      let vm = this;
      let params = {
        "method": "getLogListByFile",
        "params": {
          "file":this.defaultProject+"/"+file
        }
      }
      vm.$http.post(url, params).then((res) => {
        let _dataList=[];
        _.each(res.body.data,(i,v)=>{
          let log = i.split("\r\n\r\n").slice(1).join("\n").split("\n")
          console.log(i)
          log=_.filter(log,(k)=>{
            return $.trim(k)!=""
          })
          _dataList.push({
            "info":i.split("\n")[1],
            "files":i.split("\n\n")[0].split("\n").slice(3),
            "log":log
          })
        })
        vm.logData =_dataList
        vm.dialogLogVisible = true
      }, (response) => {

      });

    }
  }
}
</script>


<style lang="sass" scoped>
</style>