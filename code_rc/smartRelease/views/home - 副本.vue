<template lang="jade">
  include ./components.jade
  #home
    h2 Release List
    div(style="width:500px;margin:15px 0 0;")
      el-form(:inline="true" label-width="0")
        el-form-item(label="" prop="name")
          el-input(v-model="searchVal" @change="search")
            el-button(slot="prepend" icon="search")
            template(slot="append")
    table.table
      tr
        th Name
        th Author
        th Revision
        th Create Date
        th.center Operation
      tr(v-if="loadingList")
        td.center(colspan="5") 
          el-tag(type="primary") loading....
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
</template>

<script>
import $ from 'jquery';
import _ from 'underscore';
export default {
  data(){
    return {
      loadingList:true,
      searchVal: "",
      initListData: [],
      listData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.getListData()
    },
    getListData(){
      let url = "/smartreleaseapi"
      let vm = this;
      let params = {
        "method": "getCustomList",
        "params": {
          "project":"HH70"
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
    }
  }
}
</script>


<style lang="sass" scoped>
</style>