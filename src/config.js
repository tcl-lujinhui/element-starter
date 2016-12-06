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
  },
  validates: (vm) => {},
  formData: {},
  formRules: {}
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
  },
  validates: (vm) => {},
  formData: {},
  formRules: {}
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
  },
  validates: (vm) => {},
  formData: {},
  formRules: {}
};

config.pinManagement = {
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
  },
  validates: (vm) => {},
  formData: {},
  formRules: {}
};

config.lanSettings = {
  formOptions: {
    DHCPServerStatus: [
      [0, 'Enable'],
      [1, 'Disable']
    ]
  },
  validates: (vm) => {},
  formData: {},
  formRules: {}
};



config.changePassword = {
  formData: {
    UserName: "admim",
    CurrPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  },
  formOptions: {},
  validates: {
    Confirm: (vm) => {
      return (rule, value, callback) => {
        console.log(rule)
        let errMsg='';
        if (value !== vm.formData.NewPassword) {
          errMsg = '两次输入密码不一致888888999945454!'
        }
        callback(errMsg!==''?new Error(errMsg):undefined);
      };
    }
  },
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
    ]
  },
  formRulesExtension:{
    ConfirmPassword:{ validator: "Confirm", trigger: 'blur' }
  }
};

export default config;
