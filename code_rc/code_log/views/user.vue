<template lang="jade">
  include ./components.jade
  #user
    div
      div(style="width:500px;margin:15px 0 0;")
        el-form(:inline="true" label-width="0")
          el-form-item(label="" prop="name")
            el-input(v-model="searchVal" @change="search")
              el-button(slot="prepend" icon="search")
              template(slot="append")

      el-button(type="primary" size="small" icon="plus" @click="dialogFormVisible=true") Add User
      el-dialog(title="Add User" v-model="dialogFormVisible" size="tiny")
        el-form(label-width="100px")
          el-form-item(label="name:")
            el-input(v-model="user.name")
          el-form-item(label="passwror")
            el-input(v-model="user.password" type="password")
          el-form-item(label="")
            el-button(@click="add") Apply
      table.table
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
      this.getlist()
    },
    methods: {
      getlist() {
        this.dialogFormVisible=false;
        this.dialogLoginVisible=false;
        this.$http.get("/user/list", {}).then((res) => {
          this.initDataList = res.body;
          this.loadingList= false;
          this.search()
        }, (response) => {
          this.loadingList= false;
        });
      },
      search() {
        let searchVal = $.trim(this.searchVal)
        if(searchVal==""){
          this.dataList = this.initDataList
        }else{
          searchVal = searchVal.toUpperCase()
          if(this.initDataList.length>0){
            this.dataList = _.filter(this.initDataList, (list) => {
              return list["name"].toUpperCase().indexOf(searchVal) != -1
            });
          }
        } 
      },
      add(){
        let vm = this;
        vm.$http.post("/user/add", vm.user).then((res) => {
          vm.$message.success('Successful');
          vm.getlist()
        }, (response) => {
          vm.$message.error('fail');
        });
      },
      del(id){
        let vm = this;
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.post("/user/del", {id:id}).then((res) => {
            vm.$message.success('delete Successful!');
            vm.getlist()
          }, (response) => {
            vm.$message.error('delete fail');
          });
        }).catch(() => {
          //vm.$message.info("undelete");          
        });
        
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