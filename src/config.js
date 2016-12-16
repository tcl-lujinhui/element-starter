let config = {};

let Unit = {
  validates: (callback, errMsg) => {
    return callback(errMsg !== '' ? new Error(errMsg) : undefined);
  }
}

let common = {

}

config.$G = {
  name: "hui",
  age: 2
}
//主菜单
config.nav = [{
  name: "Home",
  text: "Home",
  router: 'internetStatus'
}, {
  name: "Services",
  text: "Services",
  router: 'inbox'
}, {
  name: "Settings",
  text: "Settings",
  router: 'mobileConnection'
}, {
  name: "System",
  text: "System",
  router: 'deviceInfo'
}];
//左侧菜单
config.sideMenu = {
  "Home": [{
    text: "Status",
    submenu: [{
      text: "Internet",
      router: "internetStatus"
    }, {
      text: "LAN",
      router: "lanStatus"
    }, {
      text: "WLAN",
      router: "wlanStatus"
    }]
  }, {
    text: "Statistics",
    submenu: [{
      text: "Internet",
      router: "internetStatistics"
    }, {
      text: "LAN",
      router: "lanStatistics"
    }, {
      text: "WLAN",
      router: "wlanStatistics"
    }]
  }, {
    text: "Setup Wizard",
    router: "setupWizard"
  }],
  "Services": [{
    text: "SMS",
    submenu: [{
      text: "Inbox",
      router: "inbox"
    }, {
      text: "Outbox",
      router: "outbox"
    }, {
      text: "Draft",
      router: "draft"
    }, {
      text: "New Message",
      router: "newSMS"
    }, {
      text: "SMS Settings",
      router: "smsSettings"
    }]
  }, {
    text: "Call Logs",
    submenu: [{
      text: "Incoming Call",
      router: "incomingCall"
    }, {
      text: "Outgoing Call",
      router: "outgoingCall"
    }, {
      text: "Missed Call",
      router: "missedCall"
    }]
  }, {
    text: "Shared",
    submenu: [{
      text: "USB",
      router: "usb"
    }, {
      text: "Storage Share",
      router: "storageShare"
    }, {
      text: "DLNA",
      router: "dlna"
    }, {
      text: "User Settings",
      router: "userSettings"
    }]
  }],
  "Settings": [{
    text: "Dial-UP",
    submenu: [{
      text: "Mobile Connection",
      router: "mobileConnection"
    }, {
      text: "Profile Management",
      router: "profileManagement"
    }, {
      text: "Network Settings",
      router: "networkSettings"
    }, {
      text: "Monthly Plan",
      router: "monthlyPlan"
    }]
  }, {
    text: "WAN",
    submenu: [{
      text: "WAN Status",
      router: "wanStatus"
    }, {
      text: "WAN Configure",
      router: "wanConfigure"
    }, {
      text: "MAC Clone",
      router: "macClone"
    }]
  }, {
    text: "WLAN",
    submenu: [{
      text: "Basic",
      router: "basic"
    }, {
      text: "Advanced",
      router: "advanced"
    }, {
      text: "WPS",
      router: "wps"
    }]
  }, {
    text: "Security",
    submenu: [{
      text: "PIN Management",
      router: "pinManagement"
    }, {
      text: "Routing Rules",
      router: "routingRules"
    }, {
      text: "Firewall",
      router: "firewall"
    }, {
      text: "Filter",
      router: "filter"
    }]
  }, {
    text: "NAT Settings",
    submenu: [{
      text: "DMZ Settings",
      router: "dmz"
    }, {
      text: "ALG Settings",
      router: "alg"
    }, {
      text: "UPnP Settings",
      router: "upnp"
    }, {
      text: "Virtual Server",
      router: "virtualServer"
    }]
  }, {
    text: "QoS",
    router: "qos"
  }, {
    text: "LAN",
    router: "lanSettings"
  }],
  "System": [{
    text: "Device Info",
    router: "deviceInfo"
  }, {
    text: "Reboot & Reset",
    submenu: [{
      text: "Reboot",
      router: "reboot"
    }, {
      text: "Factory Reset",
      router: "reset"
    }]
  }, {
    text: "Upgrade",
    submenu: [{
      text: "Local Upgrade",
      router: "localUpgrade"
    }, {
      text: "Online Upgrade",
      router: "onlineUpgrade"
    }, {
      text: "TR069",
      router: "tr069"
    }]
  }, {
    text: "Device Mgmt",
    submenu: [{
      text: "Password Change",
      router: "changePassword"
    }, {
      text: "System Settings",
      router: "systemSettings"
    }, {
      text: "Backup&Restore",
      router: "restore"
    }]
  }]
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



//pinManagement
config.pinManagement = {
  formOptions: {
    Operation: [
      [0, 'Disable'],
      [1, 'Change PIN']
    ]
  },
  formData: {
    pinState: 0

  },
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
      { required: true, message: '请输入APN', trigger: 'blur' },
    ],
    DailNumber: [
      { required: true, message: '请输入APN', trigger: 'blur' },
    ],
    APN: [
      { required: true, message: '请输入Password', trigger: 'blur' },
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
    dmz_status: 0,
    dmz_ip: ''
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
    fwding_status: [
      [0, 'Off'],
      [1, 'On']
    ],
    fwding_protocol: [
      [6, 'TCP'],
      [17, 'UDP'],
      [253, 'UDP']
    ]
  },
  formData: {
    portfwd_name: 'name24',
    private_ip: '192.168.1.5',
    private_port: '3242',
    global_port: '324',
    fwding_protocol: 17,
    fwding_status: 0
  },
  formRules: {
    portfwd_name: [],
    private_ip: [],
    private_port: [],
    global_port: []
  }

}

//wps
config.wps = {
  formOptions: {
    wpsMode: [
      [0, 'WPS PIN'],
      [1, 'PBC(Push Button Configuration) ']
    ]
  },
  formData: {
    wpsMode: 0
  },
  formRules: {}
}

//login
config.login = {
  formOptions: {},
  formData: {
    UserName: '',
    Password: ''
  },
  formRules: {}
};
//dlna
config.dlna = {
  formData: {},
  formOptions: {},
  formRules: {}
};

//samba
config.samba = {
  formData: {},
  formOptions: {
    AuthType: [
      [0, 'Read Only'],
      [1, 'Read and Write']
    ]
  },
  formRules: {}
};

//ftp
config.ftp = {
  formData: {},
  formOptions: {
    AuthType: [
      [0, 'Read Only'],
      [1, 'Read and Write']
    ]
  },
  formRules: {}
};

//user settings
config.userSettings = {
  formData: {
    "DeviceName": ""
  },
  formOptions: {},
  formRules: {
    DeviceName: [
      { required: true, message: 'Required!', trigger: 'blur' },
      { min: 1, max: 32, message: 'The maximum length of 32 characters.' }
    ]
  }
}

//setupWizard
config.setupWizard = {
  formOptions: {},
  formData: {
    
  },
  formRules: {}
};

export default config;
