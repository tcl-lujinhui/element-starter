import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import $ from 'jquery'
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
          page:{},
          formData: {},
          formOptions: {},
          formRules: {},
          extensionRules:{}
        }
      },
      methods: {
        initdata(Config) {
          this.formRules = $.extend({},Config.formRules);
          this.formData = $.extend({},Config.formData);
          this.formOptions = $.extend({},Config.formOptions);
          
          if (Config.validates) {
            $.each(Config.validates, (k, v) => {
              this.extensionRules[k] = v(this)
            })
          }
          if (Config.formRulesExtension) {
            $.each(Config.formRulesExtension, (k, v) => {
              let rule = {};
              rule.trigger = v.trigger
              rule.validator = this.extensionRules[v.validator]
              this.formRules[k].push(rule)
            })
          }
        },
        init() {
        },
        reset() {
          this.init()
          this.$refs.formData.resetFields();
        },
        submit(form, callback) {
          this.$refs[form].validate((valid) => {
            if (valid) {
              callback();
              this.reset()
            } else {
              return false;
            }
          })
        }
      }
    })

  }
}
