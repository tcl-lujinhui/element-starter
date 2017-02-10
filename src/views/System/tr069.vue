<template lang="jade">
  include ../components.jade
  #TR069
    +sideMenuPage('System')
      +breadcrumb("ids_title_tr069")
      +form("formData")
        +radio("ids_tr069_inform:","Inform")
        +input("ids_tr069_informInterval:","InformInterval")(:disabled="formData.Inform==0")
        +input("ids_tr069_acsUrl:","AcsUrl")(:disabled="formData.Inform==0")
        +input("ids_tr069_acsUsername:","AcsUserName")(:disabled="formData.Inform==0")
        +input("ids_tr069_acsPw:","AcsUserPassword")(:disabled="formData.Inform==0" type="password")
        +checkbox("","ConReqAuthent","ids_tr069_connRqAuth")(:disabled="formData.Inform==0")
        div(v-if="formData.ConReqAuthent==1")
          +input("ids_tr069_connRqUsername:","ConReqUserName")(:disabled="formData.Inform==0")
          +input("ids_tr069_connRqPw:","ConReqUserPassword")(:disabled="formData.Inform==0")
        +formBtn()
</template>

<script> 
import {_,_config,$,vuex} from '../../common.js';
var Config = _config.tr069
export default {
  created() {
      this.init()
      this.initdata(Config)
    },
    methods: {
      init() {
        this.vuex = vuex
        this.page = {
          clientConfiguration: [],
          InformInterval: ""
        }
        this.sdk.get("GetClientConfiguration", null, (res) => {
          _.extend(this.formData, res);
          this.page.clientConfiguration=res;
        })
      },
      update() {
        let params = {}
        let setForm = () => {
          if (this.formData.Inform == 1) {
            let params1 = {
              AcsUrl: this.formData.AcsUrl,
              AcsUserName: this.formData.AcsUserName,
              AcsUserPassword: this.formData.AcsUserPassword,
              ConReqAuthent: this.formData.ConReqAuthent,
              Inform: this.formData.Inform,
              InformInterval: this.formData.InformInterval
            }
            _.extend(params, params1);
            if (this.formData.ConReqAuthent == 1) {
              let params2 = {
                ConReqUserName: this.formData.ConReqUserName,
                ConReqUserPassword: this.formData.ConReqUserPassword
              }
              _.extend(params, params2);
            } else {
              let params2 = {
                ConReqUserName: this.page.clientConfiguration.ConReqUserName,
                ConReqUserPassword: this.page.clientConfiguration.ConReqUserPassword
              }
              _.extend(params, params2);
            }

          }else{
            let paramsOther = {
              AcsUrl: this.page.clientConfiguration.AcsUrl,
              AcsUserName: this.page.clientConfiguration.AcsUserName,
              AcsUserPassword: this.page.clientConfiguration.AcsUserPassword,
              ConReqAuthent: this.page.clientConfiguration.ConReqAuthent,
              Inform: this.formData.Inform,
              InformInterval: this.page.clientConfiguration.InformInterval,
              ConReqUserName: this.page.clientConfiguration.ConReqUserName,
              ConReqUserPassword: this.page.clientConfiguration.ConReqUserPassword
            }
            _.extend(params, paramsOther);
          }
          this.sdk.post("SetClientConfiguration", params, {
            callback: this.init
          })
        }

        if(this.formData.Inform==0){
          setForm()   
        }else{
          this.submit("formData", setForm)    
        }
      }
    }
}
</script>
<style lang="sass" scoped>
</style>