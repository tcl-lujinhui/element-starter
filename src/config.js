const config = {};

const Unit={
  validates:(callback,errMsg)=>{
    return callback(errMsg!==''?new Error(errMsg):undefined);
  }
}

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
    Confirm:(vm) => {
      return (rule, value, callback) => {
        var errMsg=''
        if (value !== vm.formData.NewPassword) {
          errMsg = 'Confirm!'
        }
        Unit.validates(callback,errMsg)
      };
    }
  },
  formRules: {
    CurrPassword: [
      {type: "string", required: true,pattern: /^[a-z]+$/, message: '请输入字母'},
      { min: 3, max: 5, message: '长度在 3 到 5 个字符'}
    ],
    NewPassword: [
      { required: true, message: '请输入活动名称请'},
      { min: 3, max: 5, message: '长度在 3 到 5 个字符'}
    ],
    ConfirmPassword: [
      { required: true, message: '请输入活动名称请'},
    ]
  },
  formRulesExtension:{
    ConfirmPassword:{ validator: "Confirm"},
  }
};

export default config;
