<template lang="jade">
  include ./components.jade
  #code_log
    div
      div(style="width:500px;margin:15px 0 0;")
        el-form(:inline="true" label-width="0")
          el-form-item(label="" prop="name")
            el-input(v-model="searchVal" @change="search")
              el-button(slot="prepend" icon="search")
              template(slot="append")
      table.table
        tr
          th svn code log
        tr(v-for="list in dataList" v-if="!loadingList&&dataList.length>0")
          td 
            h2 
              el-tag {{list.info.split("|")[2].split("+")[0]}} 
            el-tag(type="success") {{list.info.split("|")[1]}} 
            el-tag(type="success") {{list.info.split("|")[0]}} 
            
            .log
              div(v-for="log in list.log")
                el-tag(type="primary"){{log}}
                br
            .files
              div(v-for="li in list.files")
                el-tag(type="danger") {{li}}
                br
            
      //-table.table
        tr
          th list
        tr(v-for="list in dataList" v-if="!loadingList&&dataList.length>0")
          td 
            el-tag(type="primary") {{list.split("\n")[1]}}
            p {{list.split("\n\n")[0].split("\n").slice(3)}}
            p {{list.split("\n\n").slice(1).toString()}}
      //-table.table
        tr
          th Name
          th Create Time
          th Update Time
          th Role
          th.center Delete
        tr(v-if="loadingList")
          td.center(colspan="5") 
            el-tag(type="primary") loading....
        tr(v-for="list in dataList" v-if="!loadingList&&dataList.length>0")
          td {{list.name}}
          td 
            el-tag(type="gray") {{list.meta.createAt}}
          td 
            el-tag(type="gray") {{list.meta.updateAt}}
          td {{list.role}}
          td.center
            el-tooltip(content="delete")
              el-button(size="mini" icon="delete" type="danger" @click="del(list._id)")

      
</template>

<script>
import {
  $,
  _,
  _config,
  vuex
} from '../common.js'
export default {
  data() {
      return {
        user:{
          name:"",
          password:"",
          role:0
        },
        dialogLoginVisible:false,
        dialogFormVisible:false,
        loadingList:true,
        searchVal: "",
        initDataList: [],
        dataList: []
      }
    },

    created() {
      this.init();
      this.Inter = setInterval(() => {
        this.getlist()
      }, 10000);
    },
    destroyed() {
      clearInterval(this.Inter)
      this.Inter = null
    },
    methods: {
      init(){
        this.dialogFormVisible=false;
        this.dialogLoginVisible=false;
        this.getlist()
      },
      getlist() {
        this.$http.get("/svnlog?"+Math.random(), {}).then((res) => {
          this.initDataList = res.body.reverse();
          this.loadingList= false;
          this.search()
        }, (response) => {
          this.loadingList= false;
        });
      },
      search() {
        let searchVal = $.trim(this.searchVal)
        let _list;
        if(searchVal==""){
          _list = this.initDataList
        }else{
          searchVal = searchVal.toUpperCase()
          if(this.initDataList.length>0){
            _list = _.filter(this.initDataList, (list) => {
              return list.toUpperCase().indexOf(searchVal) != -1
            });
          }
        }
        let _dataList=[];
        _.each(_list,(i,v)=>{
          let log = i.split("\n\n").slice(1).join("\n").split("\n")
          log=_.filter(log,(k)=>{
            return $.trim(k)!=""
          })
          _dataList.push({
            "info":i.split("\n")[1],
            "files":i.split("\n\n")[0].split("\n").slice(3),
            "log":log
          })
        })
        this.dataList =_dataList
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
.log,.files{
  //background-color: rgba(32,159,255,.1);
  //border-color: rgba(32,159,255,.2);
  //color: #20a0ff;
  padding:10px 0px;
  margin: 5px 0;
}
</style>