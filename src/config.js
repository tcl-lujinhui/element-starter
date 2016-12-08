const config = {};

const Unit = {
  validates: (callback, errMsg) => {
    return callback(errMsg !== '' ? new Error(errMsg) : undefined);
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
        var errMsg = ''
        if (value !== vm.formData.NewPassword) {
          errMsg = 'Confirm!'
        }
        Unit.validates(callback, errMsg)
      };
    }
  },
  formRules: {
    CurrPassword: [
      { type: "string", required: true, pattern: /^[a-z]+$/, message: '请输入字母' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
    ],
    NewPassword: [
      { required: true, message: '请输入活动名称请' },
    ],
    ConfirmPassword: [
      { required: true, message: '请输入活动名称请' },
    ]
  },
  formRulesExtension: {
    ConfirmPassword: { validator: "Confirm" },
  }
};

config.profileManagement = {
  initNewData: {
    "ProfileName": "",
    "APN": "",
    "Password": "",
    "AuthType": 0,
    "DailNumber": "",
    "UserName": ""
  },
  formData: {},
  formOptions: {
    AuthType: [
      [0, 'None'],
      [1, 'PAP'],
      [2, 'CHAP'],
      [3, 'PAP& CHAP']
    ]
  },
  formRules: {
    ProfileName: [
      { required: true, message: '请输入APN',trigger: 'blur'},
    ],
    DailNumber: [
      { required: true, message: '请输入APN',trigger: 'blur'},
    ],
    APN: [
      { required: true, message: '请输入Password',trigger: 'blur'},
    ]
  },
}

config.algSettings = {
  formOptions: {
    PptpStatus: [
      [0, 'Enable'],
      [1, 'Disable']
    ],
    H323AlgStatus: [
      [0, 'Enable'],
      [1, 'Disable']
    ],
    SipAlgStatus: [
      [0, 'Enable'],
      [1, 'Disable']
    ]
  },
  formData: {},
  formRules: {}
}


config.dmzSettings = {
  formOptions: {
    dmz_status: [
      [0, 'Enable'],
      [1, 'Disable']
    ]
  },
  formData: {
    dmz_status:0,
    dmz_ip:''
  },
  formRules: {}
}



config.upnpSettings = {
  formOptions: {
    upnp_switch: [
      [0, 'Enable'],
      [1, 'Disable']
    ]
  },
  formData: {},
  formRules: {}
}


config.virtualServer = {
  formOptions: {
    DHCPServerStatus: [
      [0, 'Enable'],
      [1, 'Disable']
    ]
  },
  formData: {},
  formRules: {}
}


export default config;
