<template lang="jade">
  include ../components.jade
  #urlFilter
    +sideMenuPage('Settings')
      +breadcrumb("URL Filter")
      +form("formData")
        +select("URL Filter:","filter_policy")
        span(v-show="(formData.filter_policy==1&&(formData.UrlAllowList).length<10)||(formData.filter_policy==2&&(formData.UrlDenyList).length<10)")
          +button("")(icon="plus" size="mini" @click="add" type="primary")
        table.urlFilterTableTh(v-show="formData.filter_policy!=0")
          thead
            tr
              th.firstTh URL
              th.sencondTh Operation
          tbody(v-for="(Url,index) in formData.filter_policy==1?formData.UrlAllowList:formData.UrlDenyList")
            tr 
              td(v-html="Url")
              td 
                +button("")(icon="edit" size="mini" @click="editUrlFilterDialog(Url,index)")
                +button("")(icon="delete" size="mini" type="danger" @click="deleteUrlFilter(index)")

        div(v-show="formData.filter_policy==0||(formData.filter_policy==1&&(formData.UrlAllowList).length>0)||(formData.filter_policy==2&&(formData.UrlDenyList).length>0)")
          +formBtn()
      el-dialog(:title="page.action=='edit'?'Edit':'Add'" v-model="page.dialog")
        +form("formData")
          +input("URL:","url")
          +formItem("")
            +button("Apply")(type="primary" @click="ediApply")
            +button("Cancel")(@click="reset")
</template>
<script>
import {_,_config,$} from '../../common.js';
var Config = _config.urlFilter;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page = {
          dialog: false,
          action:"edit",
          indexs: -1,
          filter_policy:""
        }
        this.sdk.get("GetUrlFilterSettings", null, (res) => {
          _.extend(this.formData,res);
          this.page.filter_policy=res.filter_policy;
        })
      },
      editUrlFilterDialog(item, index) {
        this.$refs.formData.resetFields();
        this.page.action='edit';
        this.formData.url=item
        this.page.dialog = true;
        this.page.indexs=index;
        
      },
      ediApply() {
        let setForm=()=>{
          if(this.formData.filter_policy == 1){
            this.formData.UrlAllowList[this.page.indexs]=this.formData.url
          }else{
            this.formData.UrlDenyList[this.page.indexs]=this.formData.url
          }
          let params ={
            filter_policy:this.formData.filter_policy,
            UrlDenyList:this.formData.UrlDenyList,
            UrlAllowList:this.formData.UrlAllowList
          }
          this.sdk.post("SetUrlFilterSettings", params, {
            callback: this.init
          })
        }

        this.submit("formData", setForm)
      },

      add() {
        this.page.action='add';
        this.formData.url=""
        this.page.dialog = true;
        this.$refs.formData.resetFields();
        if(this.formData.filter_policy == 1){
          this.page.indexs=this.formData.UrlAllowList.length;
        }else{
          this.page.indexs=this.formData.UrlDenyList.length;
        }

      },
      deleteUrlFilter(index) {
        if (this.formData.filter_policy == 1) {
          this.formData.UrlAllowList.splice(index, 1);
        } else {
          this.formData.UrlDenyList.splice(index, 1);
        }
        this.formData={
          filter_policy: this.page.filter_policy,
          UrlAllowList: this.formData.UrlAllowList,
          UrlDenyList: this.formData.UrlDenyList
        }
        this.sdk.post("SetUrlFilterSettings", this.formData, {
          callback: this.init
        })
      },
      update() {
        let params = {
          filter_policy: this.formData.filter_policy,
          UrlAllowList: this.formData.UrlAllowList,
          UrlDenyList: this.formData.UrlDenyList
        }
        this.sdk.post("SetUrlFilterSettings", params, {
          callback: this.init
        })
      }

    }
}
</script>

<style lang="sass" scoped>
table{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
.urlFilterTableTh .firstTh{
  width: 80%;
}
.urlFilterTableTh .sencondTh{
  width: 20%;
  word-break: break-all;
}
.urlFilterTableTh tr{
   height: 26px;
  border:1px solid #ababab;
}

td{
  text-align: center;
  border:1px solid #ababab;
}
th{
  border:1px solid #ababab;
}
span{
  float: right;
}
</style>