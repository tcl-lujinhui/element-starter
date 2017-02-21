<template lang="jade">
  include ./components.jade
  #device
    div
      div(style="width:500px;margin:15px auto;")
        el-form(label-width="0")
          el-form-item(label="" prop="name")
            el-input(v-model="searchVal" size="large")
              template(slot="prepend") Please enter the device ID
              el-button(slot="append" icon="search" @click="search")
      table.table(v-if="currentState!=0")
        tr(v-if="currentState==1")
          td.center(colspan="2") 
            h3 Search....
        tbody(v-if="currentState==2")
          tr
            td Device Name
            td {{deviceInfo.name}}
          tr
            td Device ID
            td {{deviceInfo.ID}}
          tr
            td.center(colspan="2") 
              el-button(type="info" size="small" @click="unbind(deviceInfo.ID)") Unbind device
        tbody(v-if="currentState==3")
          td.center(colspan="2") 
            h3 Search Fail
      
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
        currentState:0,//0:none;1:search;2:ok;3:fail
        searchVal: "",
        deviceInfo:{
          name:"",
          ID:444545
        }
      }
    },
    created() {
    },
    methods: {
      search() {
        this.currentState=1;
        let searchVal = $.trim(this.searchVal)
        setTimeout(()=>{
          this.currentState=2;
        },3000)
      },
      unbind(id){
        alert(id)
      }
    }
}
</script>


<style lang="sass" scoped>
.table{
  width: 500px;
  margin: 0 auto;
}
</style>