<template lang="jade">
  include ../components.jade
  #newSMS
    +sideMenuPage('Services')
      +breadcrumb("New Message")
      +form("formData")
        el-input(placeholder="please input" v-model="input3")
          span(slot="prepend") To:
        //-p{{}}
        el-input(type="textarea" ,:rows.number=10, v-model="textarea")
</template>

<script>
import {_config,_,vuex} from '../../common.js';
let Config = _config.draft;
export default {
  created() {
      this.init()
    },
    methods: {
      /*tabs(tabs){
        this.$router.push(tabs.$el.getAttribute("router"))
      },*/
      init() {
        this.initdata(Config);
        this.page = {

        };
      },
      update() {
        this.sdk.post("SetConnectionSettings", this.formData, (res) => {
          console.log(res)
        })
      }
    }
}
</script>


<style lang="sass" scoped>
.el-input{
  width:540px;
}
.el-textarea textarea{
    height:200px;
}
p{
  float:right;
}
</style>