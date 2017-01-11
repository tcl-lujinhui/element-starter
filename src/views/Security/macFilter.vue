<template lang="jade">
  include ../components.jade
  #macFilter
    +sideMenuPage('Settings')
      +breadcrumb("MAC Filter")
      +form("formData")
        +select("MAC Filter:","filter_policy")
        span(v-show="(formData.filter_policy==1&&(formData.MacAllowList).length<10)||(formData.filter_policy==2&&(formData.MacDenyList).length<10)")
          +button("")(icon="plus" size="mini" @click="add" type="primary")
        table.urlFilterTableTh(v-show="formData.filter_policy!=0")
          thead
            tr
              th.firstTh MAC Address
              th.sencondTh Operation
          tbody(v-for="(MacAddress,index) in formData.filter_policy==1?formData.MacAllowList:formData.MacDenyList")
            tr 
              td(v-html="MacAddress")
              td 
                +button("")(icon="edit" size="mini" @click="editUrlFilterDialog(MacAddress,index)")
                +button("")(icon="delete" size="mini" type="danger" @click="deleteUrlFilter(index)")

        div(v-show="formData.filter_policy==0||(formData.filter_policy==1&&(formData.MacAllowList).length>0)||(formData.filter_policy==2&&(formData.MacDenyList).length>0)")
          +formBtn()
      el-dialog(:title="page.action=='edit'?'Edit':'Add'" v-model="page.dialog")
        +form("formData")
          +input("URL:","Address")
          +formItem("")
            +button("Apply")(type="primary" @click="ediApply")
            +button("Cancel")(@click="reset")
</template>
<script>
import {_,_config,$} from '../../common.js';
var Config = _config.macFilter;
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
        this.sdk.get("GetMacFilterSettings", null, (res) => {
          _.extend(this.formData,res);
          this.page.filter_policy=res.filter_policy;
        })
      },
      editUrlFilterDialog(item, index) {
        this.$refs.formData.resetFields();
        this.page.action='edit';
        this.formData.Address=item
        this.page.dialog = true;
        this.page.indexs=index;
        
      },
      ediApply() {
        let setForm=()=>{
          if(this.formData.filter_policy == 1){
            this.formData.MacAllowList[this.page.indexs]=this.formData.Address
          }else{
            this.formData.MacDenyList[this.page.indexs]=this.formData.Address
          }
          let params ={
            filter_policy:this.formData.filter_policy,
            MacDenyList:this.formData.MacDenyList,
            MacAllowList:this.formData.MacAllowList
          }
          this.sdk.post("SetMacFilterSettings", params, {
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
          this.page.indexs=this.formData.MacAllowList.length;
        }else{
          this.page.indexs=this.formData.MacDenyList.length;
        }

      },
      deleteUrlFilter(index) {
        if (this.formData.filter_policy == 1) {
          this.formData.MacAllowList.splice(index, 1);
        } else {
          this.formData.MacDenyList.splice(index, 1);
        }
        this.formData={
          filter_policy: this.page.filter_policy,
          MacAllowList: this.formData.MacAllowList,
          MacDenyList: this.formData.MacDenyList
        }
        this.sdk.post("SetMacFilterSettings", this.formData, {
          callback: this.init
        })
      },
      update() {
        let params = {
          filter_policy: this.formData.filter_policy,
          MacAllowList: this.formData.MacAllowList,
          MacDenyList: this.formData.MacDenyList
        }
        this.sdk.post("SetMacFilterSettings", params, {
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