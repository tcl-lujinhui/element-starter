import menuConfig from './config/menuConfig.js'
import sys from "./config/sys.js";
import validates from './plugin/validates.js';
let config = {};

config.nav = menuConfig.nav;
config.sideMenu = menuConfig.sideMenu;

let Unit = {
  validates: (callback, errMsg) => {
    return callback(errMsg !== '' ? new Error(errMsg) : undefined);
  }
}

let common = {

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
  formData: {

  },
  formRules: {}
};



//pinManagement
config.pinManagement = {
  formData: {
    Operation:0,
    AutoValidatePinState:0,
    Pin:"",
    State:1,
    Puk:"12345678",
    NewPin:"1234",
    CurrentPin:"1111",
    SIMLockCode:"01234561215",
    ConfirmPin:"",
  },
  formOptions: {
    Operation: [
      [0, 'Disable'],
      [1, 'Change PIN']
    ],
    AutoValidatePinState: [
      [0, 'Disable'],
      [1, 'Enable']
    ]
  },
  validates: {
    Confirm: (vm) => {
      return (rule, value, callback) => {
        var errMsg = ''
        if (value !== vm.formData.NewPin) {
          errMsg = 'Confirm!'
        }
        Unit.validates(callback, errMsg)
      };
    }
  },
  formRules: {
    Pin: [
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    NewPin: [
      { required: true, message: 'Required!', trigger: 'blur' },

    ],
    CurrentPin: [
      { required: true, message: 'Required!', trigger: 'blur' },

    ],
    ConfirmPin: [
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
  },
  formRulesExtension: {
    ConfirmPin: { validator: "Confirm" },
  }
};

config.lanSettings = {
  formOptions: {
    DHCPServerStatus: [
      [0, 'Enable'],
      [1, 'Disable']
    ],
    DHCPLeaseTime:[
      [1],
      [6],
      [12],
      [24]
    ]
  },
  formData: {},
  formRules: {}
};


//changePassword
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
          errMsg = 'The confirm password is not the same as the new password.';
        }
        Unit.validates(callback, errMsg)
      };
    }
  },
  formRules: {
    CurrPassword: [
      { type: "string", required: true, message: 'Required' },
      { type: "string", required: true, pattern: /^[A-Za-z0-9\-\+\!\^\$\@\#\&\*]{4,16}$/, message: 'Invalid password!The length of login password is 4-16, including 0-9, a-z, A-Z,"-+!@$#^&*",please input again.' }
    ],
    NewPassword: [
      { type: "string", required: true, message: 'Required' },
      { type: "string", required: true, pattern: /^[A-Za-z0-9\-\+\!\^\$\@\#\&\*]{4,16}$/, message: 'Invalid password!The length of login password is 4-16, including 0-9, a-z, A-Z,"-+!@$#^&*",please input again.' }
    ],
    ConfirmPassword: [
      { type: "string", required: true, message: 'Required' }
    ]
  },
  formRulesExtension: {
    ConfirmPassword: { validator: "Confirm" },
  }
};

//systemSettings
config.systemSettings = {
  formData: {
    AntennaSwitch: 0,
    Language: "fr",
    CurrTime: "",
    NtpServer1: "",
    NtpServer2: "",
    TimeZone: "UTC"
  },
  formOptions: {
    AntennaSwitch: [
      [0, 'Internal'],
      [1, 'External']
    ],
    Language: [],
    TimeZone:[] 
  },
  formRules: {}
}
//backupRestore
config.backupRestore = {
  formData: {
    iptRestore:"45646"
  },
  formOptions: {},
  formRules: {}
}

//Inbox
config.inbox = {
  formData: {},
  formOptions: {},
  formRules: {}
}

//CallLog
config.callLogs = {
  formData: {
    pageNum:0,
    type:0
  },
  formOptions: {},
  formRules: {}
}

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
};
// Monthly Plan
config.monthlyPlan = {
  formData: {
    
  },
  formOptions: {
    AutoDisconnFlag: [
      [0, 'disable'],
      [1, 'enable']
    ],
    TimeLimitFlag: [
      [0, 'disable'],
      [1, 'enable']
    ]
  },
  formRules: {
    MonthlyPlan: [
      { required: true, message: '请输入APN', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
    ],
    TimeLimitTimes: [
      { required: true, message: '请输入时间', trigger: 'blur' }
    ]
  }
};

// Statistics/internetStatistics 
config.internetStatistics = {
  formData: {
    
  },
  formOptions: {},
  formRules: {}
};

// Statistics/lanStatistics 
config.lanStatistics = {
  formData: {},
  formOptions: {},
  formRules: {}
};
// Statistics/wlanStatistics 
config.wlanStatistics = {
  formData: {},
  formOptions: {},
  formRules: {}
};

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
  formRules: {
    dmz_ip:[
      {required: true, message: 'Required!', trigger: 'blur'},
      {validator:validates.ip,message: 'Invalid IP!'}
    ]
  }
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

//qos
config.qos = {
  formOptions: {},
  formData: {
    UserName:'',
    password:''
  },
  formRules: {}
};

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
  formData: {

  },
  formOptions: {},
  formRules: {}
};


//simState
config.simState = {
  formData: {
    Pin: "",
    Puk: "",
    ConfirmPin: "",
    SIMLockCode: ""
  },
  formOptions: {

  },
  formRules: {
    Pin: [
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    Puk: [
      { required: true, message: 'Required!', trigger: 'blur' },

    ],
    ConfirmPin: [
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    SIMLockCode: [
      { required: true, message: 'Required!', trigger: 'blur' }
    ]
  }
};
//home status 
config.homeStatus = {
  formData:{},
  networkTypeDisplayNum:1,//val:0,1,2;control networkTypeArr display val
  networkTypeArr:[
    [0,"NA","NO SERVER"],
    [1,"2G","GPRS"],
    [2,"2G","EDGE"],
    [3,"3G","HSPA"],
    [4,"3G","HSUPA"],
    [5,"3G","UMTS"],
    [6,"3G+","HSPA_PLUS"],
    [7,"3G+","DC-HSPA_PLUS"],
    [8,"4G","LTE"],
    [9,"4G+","LTE_PLUS"]
  ],
  connectionDisplayNum:1,//val:0, 1
  connectionStatusArr:[
    [0,"Disconnected"],
    [1,"Connecting......"],
    [2,"Connected"],
    [3,"Disconnecting......"]
  ],
  lanConnectedDisplayNum:1,//val: 0,1
  lanConnectedStatusArr:[
    [0,"Disconnected"],
    [1,"Connected"]
  ],
  usbStatusDisplayNum:1,//val:0,1
  usbStatusArr:[
    [0,"Not Insert"],
    [1,"USB storage"],
    [2,"USB print"]
  ],
  ssidBroadcastDisplayNum:1,//val:0,1
  ssidBroadcastArr:[
    [0,"Disable"],
    [1,"Enable"]
  ],
  wlanAPModeDisplayNum:1,//val:0,1
  wlanAPModeArr:[
    [0,"2.4GHz"],
    [1,"5GHz"],
    [2,"2.4GHz and 5GHz"]
  ]
};
//wan mac Clone
config.macClone = {
  formData: {
    MacAddr: ""
  },
  formOptions: {},
  formRules: {
    MacAddr: [
      { required: true, message: 'Required!', trigger: 'blur' },
    ]
  }
};

//wan Configure
config.wanConfigure = {
  formData: {},
  formOptions: {
    ConnectType: [
      [0, 'PPPoE'],
      [1, 'DHCP'],
      [2, 'Static IP']
    ]
  },
  formRules: {
    "SubNetMask": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ],
    "Gateway": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ],
    "IpAddress": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ],
    "Mtu": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ],
    "PrimaryDNS": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ],
    "SecondaryDNS": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ],
    "Account": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ],
    "Password": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ],
    "StaticIpAddress": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ],
    "pppoeMtu": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ]
  }
};
config.firewall = {
  formData: {},
  formOptions: {
    disableWanAcess: [
      [0, 'Enable'],
      [1, 'Disable']
    ]
  },
  formRules: {}
};

config.tr069 = {
  formData: {
    AcsUrl:"",
    AcsUserName:"",
    AcsUserPassword:"",
    ConReqAuthent:1,
    ConReqUserName:"",
    ConReqUserPassword:"",
    Inform:1,
    InformInterval:60
  },
  formOptions: {
    Inform: [
      [1, 'Enable'],
      [0, 'Disable']
    ],
    ConReqAuthent: [
      [1, 'Enable'],
      [0, 'Disable']
    ]
  },
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
    InformInterval: [
     /* { required: true, pattern: /^[0-9]+$/, message: 'required' },
      /*{ min: 3, max: 5, message: '长度在 3 到 5 个字符' }*/
    ],
    AcsUrl: [
      { required: true, pattern: /((^http)|(^https)):\/\/(\\w)+\.(\\w)+/ ,message: '请输入活动名称请' },
    ],
    ConfirmPassword: [
      { required: true, message: '请输入活动名称请' },
    ]
  },
  formRulesExtension: {
    ConfirmPassword: { validator: "Confirm" },
  }
};
config.systemSettings.formOptions.TimeZone=sys.TimeZone;
config.systemSettings.formOptions.Language=sys.Language;
config.newSms = {
  formData: {
    PhoneNumber: "",
    SMSContent: "",
  },
  formOptions: {

  },
  formRules: {
    PhoneNumber: [
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    SMSContent: [
      { required: true, message: 'Required!', trigger: 'blur' },

    ],
  }
};

config.Wlan = {
  formData: {
    "AP2G_Ssid": "ds9",
    "CountryCode": "IT",
    "WiFiOffTime": 0,
    "AP2G": {
      "ApStatus": 1,
      "WMode": 3,
      "Ssid": "WebPocket-BAB5",
      "SsidHidden": 0,
      "Channel": 0,
      "SecurityMode": 3,
      "WepType": 0,
      "WepKey": "1234567890",
      "WpaType": 1,
      "WpaKey": "GE747TNT",
      "ApIsolation": 0,
      "max_numsta": 15,
      "curr_num": 0,
      "CurChannel": 8,
      "Bandwidth": 0
    },
    "AP5G": {
      "ApStatus": 1,
      "WMode": 3,
      "Ssid": "WebPocket-BAB5-5G",
      "SsidHidden": 0,
      "Channel": 0,
      "SecurityMode": 3,
      "WepType": 0,
      "WepKey": "1234567890",
      "WpaType": 1,
      "WpaKey": "GE747TNT",
      "ApIsolation": 0,
      "max_numsta": 15,
      "curr_num": 0,
      "CurChannel": 8,
      "Bandwidth": 0
    }
  },
  formOptions: {
    CountryCode: [
      ["IT", 'IT'],
      ["CN", 'CN']
    ],
    AP2G: {
      ApStatus: [
        [0, 'Read Only'],
        [1, 'Read and Write']
      ]
    }
  },
  formRules: {
    "AP2G_Ssid": [
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    "AP2G:Ssid": [
      { required: true, message: 'Required!', trigger: 'blur' }
    ],
  },
}



export default config;
