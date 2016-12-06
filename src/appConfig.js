import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
Vue.use(VueResource)
let apiURI = 'http://127.0.0.1:9096/jrd/webapi'

const config = {};
config.mobileConnection = {
  formOptions: {
    ConnectMode: [
      [0, 'Manual'],
      [1, 'Auto']
    ],
    PdpType: [
      [0, 'IPV4'],
      [2, 'IPV6'],
      [3, 'IPv4v6']
    ]
  }
};

config.networkSettings = {
  formOptions: {
    NetselectionMode: [
      [0, 'Auto'],
      [1, 'Manual']
    ],
    NetworkMode: [
      [0, 'AUTO'],
      [1, '2G Only'],
      [2, '3G Only'],
      [3, '4G Only']
    ]
  }
};

config.changePassword = {
  formData: {
    UserName: "admims",
    CurrPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  },
  formOptions: {},
  formRules: {
    CurrPassword: [
      { required: true, message: '请输入活动名称请', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    NewPassword: [
      { required: true, message: '请输入活动名称请', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    ConfirmPassword: [
      { required: true, message: '请输入活动名称请', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]
  }
};

export default {
  install(Vue) {
    Vue.appConfig = config;
    Vue.prototype.appConfig = config
    Vue.mixin({
      data() {
        return {
          formOptions: {},
          formData: {},
          formRules: {}
        }
      },

      methods: {
        data(Config){
          this.formData=Config.formData;
          this.formOptions=Config.formOptions,
          this.formRules=Config.formRules
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
              //this.$message.error('error submit!!888888888');
              return false;
            }
          })
        }
      }
    })

  }
}
