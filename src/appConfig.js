import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import $ from 'jquery'
import {vuex} from './common.js'
Vue.use(VueResource)
if($("#ie9").length>0){
  $('html').attr("id",'ie-9')
}else{
  $('html').attr("id",'no-ie-9')
}

export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          vuex:vuex,
          page:{},
          pageItem:{},
          formData: {},
          formOptions: {},
          formRules: {},
          extensionRules:{}
        }
      },
      methods: {
        initdata(Config) {
          this.pageItem = $.extend({},Config.pageItem);
          this.formRules = $.extend({},Config.formRules);
          this.formData = $.extend({},Config.formData);
          this.formOptions = $.extend({},Config.formOptions);

          
          if (Config.validates) {
            $.each(Config.validates, (k, v) => {
              this.extensionRules[k] = v(this)
            })
          }
          let makeRule=(item)=>{
            let rule = {}
            rule.trigger = item.trigger
            rule.message=item.message
            rule.validator = this.extensionRules[item.validator]
            return rule;
          }

          if (Config.formRulesExtension) {
            let vm = this;
            $.each(Config.formRulesExtension, (k, v) => {
              console.log(v)
              if($.isArray(v)){
                $.each(v,function(o,i){
                  vm.formRules[k].push(makeRule(i))
                })

              }else{
                vm.formRules[k].push(makeRule(v))
              }
            })
          }
          $.each(this.formRules,(k,v)=>{
            $.each(v,(i,h)=>{
              if(this.vuex.res[this.formRules[k][i].message]){
                this.formRules[k][i].message=this.vuex.res[this.formRules[k][i].message]
              }
            })
            
          })
        },
        init() {
        },
        reset() {
          this.$refs.formData.resetFields();
          this.init()
        },
        submit(form, callback) {
          this.$refs[form].validate((valid) => {
            if (valid) {
              callback();
              //this.reset()
            } else {
              return false;
            }
          })
        }
      }
    })

  }
}
