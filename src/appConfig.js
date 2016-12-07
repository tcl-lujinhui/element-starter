import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import $ from 'jquery'
Vue.use(VueResource)

export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          formOptions: {},
          formData: {},
          formRules: {},
          extensionRules:{}
        }
      },
      methods: {
        data(Config) {
          //this.validates = Config.validates(vm);
          this.formData = Config.formData;
          this.formOptions = Config.formOptions;
          this.formRules = Config.formRules;
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
          console.log("mixin init")
        },
        reset() {
          console.log("mixin reset")
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