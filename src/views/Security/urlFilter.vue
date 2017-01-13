<template lang="jade">
  include ../components.jade
  #urlFilter
    +sideMenuPage('Settings')
      +breadcrumb("ids_filter_urlFilter")
      +form("formData")
        +select("ids_filter_urlFilter:","filter_policy")
        span(v-show="(formData.filter_policy==1&&(formData.UrlAllowList).length<10)||(formData.filter_policy==2&&(formData.UrlDenyList).length<10)")
          +button("")(icon="plus" size="mini" @click="add" type="primary")
        table.urlFilterTableTh(v-show="formData.filter_policy!=0")
          thead
            tr
              th.firstTh {{vuex.res.ids_url}}
              th.sencondTh {{vuex.res.ids_netwrok_operation}}
          tbody(v-for="(Url,index) in formData.filter_policy==1?formData.UrlAllowList:formData.UrlDenyList")
            tr 
              td(v-html="Url")
              td 
                +button("")(icon="edit" size="mini" @click="editUrlFilterDialog(Url,index)")
                +button("")(icon="delete" size="mini" type="danger" @click="deleteUrlFilter(index)")

        div(v-show="formData.filter_policy==0||(formData.filter_policy==1&&(formData.UrlAllowList).length>0)||(formData.filter_policy==2&&(formData.UrlDenyList).length>0)")
          +formBtn()
      el-dialog(:title="page.action=='edit'? vuex.res.ids_edit:vuex.res.ids_add" v-model="page.dialog")
        +form("formData")
          +input("ids_url:","url")
          +formItem("")
            +button("ids_apply")(type="primary" @click="ediApply")
            +button("ids_cancel")(@click="reset")
</template>
<script>
import {_,_config,$,vuex} from '../../common.js';
var Config = _config.urlFilter;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex;
        this.initdata(Config);
        this.page = {
          dialog: false,
          action: "edit",
          indexs: -1,
          filter_policy: ""
        }
        this.sdk.get("GetUrlFilterSettings", null, (res) => {
          _.extend(this.formData, res);
          this.page.filter_policy = res.filter_policy;
        })
      },
      editUrlFilterDialog(item, index) {
        this.$refs.formData.resetFields();
        this.page.action = 'edit';
        this.formData.url = item
        this.page.dialog = true;
        this.page.indexs = index;

      },
      ediApply() {
        let vm = this;
        let setForm = () => {
          if (this.formData.filter_policy == 1) {
            if (this.page.action == 'add') {
              if ($.inArray(this.formData.url, this.formData.UrlAllowList) != -1) {
                this.$alert(vuex.res['ids_security_urlAddrNameWarn'],  vuex.res['ids_confirm'],{
                  confirmButtonText:  vuex.res['ids_ok'],
                  callback: action => {
                    vm.reset();
                  }
                });
                return false;
              } else {
                this.formData.UrlAllowList[this.page.indexs] = this.formData.url
              }
            } else {
              if (this.formData.UrlAllowList[this.page.indexs] == this.formData.url) {
                this.formData.UrlAllowList[this.page.indexs] = this.formData.url
              } else {
                if ($.inArray(this.formData.url, this.formData.UrlAllowList) != -1) {
                  this.$alert(vuex.res['ids_security_urlAddrNameWarn'],  vuex.res['ids_confirm'],{
                    confirmButtonText: vuex.res['ids_ok'],
                    callback: action => {
                      vm.reset();
                    }
                  });
                  return false;
                } else {
                  this.formData.UrlAllowList[this.page.indexs] = this.formData.url
                }
              }
            }
          } else {
            if (this.page.action == 'add') {
              if ($.inArray(this.formData.url, this.formData.UrlDenyList) != -1) {
                this.$alert(vuex.res['ids_security_urlAddrNameWarn'],  vuex.res['ids_confirm'], {
                  confirmButtonText:  vuex.res['ids_ok'],
                  callback: action => {
                    vm.reset();
                  }
                });
                return false;
              } else {
                this.formData.UrlDenyList[this.page.indexs] = this.formData.url
              }
            } else {
              if (this.formData.UrlDenyList[this.page.indexs] == this.formData.url) {
                this.formData.UrlDenyList[this.page.indexs] = this.formData.url
              } else {
                if ($.inArray(this.formData.url, this.formData.UrlDenyList) != -1) {
                  this.$alert(vuex.res['ids_security_urlAddrNameWarn'],  vuex.res['ids_confirm'], {
                    confirmButtonText: vuex.res['ids_ok'],
                    callback: action => {
                      vm.reset();
                    }
                  });
                  return false;
                } else {
                  this.formData.UrlDenyList[this.page.indexs] = this.formData.url
                }
              }
            }
          }
          let params = {
            filter_policy: this.formData.filter_policy,
            UrlDenyList: this.formData.UrlDenyList,
            UrlAllowList: this.formData.UrlAllowList
          }
          this.sdk.post("SetUrlFilterSettings", params, {
            callback: this.init
          })
        }

        this.submit("formData", setForm)
      },

      add() {
        this.page.action = 'add';
        this.formData.url = ""
        this.page.dialog = true;
        this.$refs.formData.resetFields();
        if (this.formData.filter_policy == 1) {
          this.page.indexs = this.formData.UrlAllowList.length;
        } else {
          this.page.indexs = this.formData.UrlDenyList.length;
        }

      },
      deleteUrlFilter(index) {
        if (this.formData.filter_policy == 1) {
          this.formData.UrlAllowList.splice(index, 1);
        } else {
          this.formData.UrlDenyList.splice(index, 1);
        }
        let params = {
          filter_policy: this.page.filter_policy,
          UrlAllowList: this.formData.UrlAllowList,
          UrlDenyList: this.formData.UrlDenyList
        }
        this.sdk.post("SetUrlFilterSettings", params, {
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