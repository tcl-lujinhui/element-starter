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
  checkBoxEnable: [
    [1, 'ids_enable'],
    [0, 'ids_disable']
  ],
  checkBoxAuto: [
    [0, 'ids_manual'],
    [1, 'ids_auto']
  ],

  rule:{
    required:{ required: true, message: 'Required!', trigger: 'blur' },
    IP:{ validator: validates.ip, message: 'Invalid IP!', trigger: 'blur' }
  }
}

config.mobileConnection = {
  formOptions: {
    ConnectMode: common.checkBoxAuto,
    PdpType: [
      [0, 'IPV4'],
      [2, 'IPV6'],
      [3, 'IPv4v6']
    ]
  },
  formData: {
    ConnectMode: 0,
    PdpType: 0
  },
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
    ],
    RoamingConnect: common.checkBoxEnable
  },
  formData: {
    NetselectionMode: 0,
    RoamingConnect: 0,
    NetworkMode: 0
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
    Puk:"",
    NewPin:"",
    CurrentPin:"",
    SIMLockCode:"",
    ConfirmPin:"",
  },
  formOptions: {
    Operation: [
      [0, 'Disable'],
      [1, 'Change']
    ],
    AutoValidatePinState: [
      [1, 'Enable'],
      [0, 'Disable']
    ]
  },
  formRules: {
    Pin:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    NewPin:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    CurrentPin:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    ConfirmPin:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ]
  }
};

config.lanSettings = {
  formData: {},
  formOptions: {
    DHCPServerStatus: [
      [0, 'Enable'],
      [1, 'Disable']
    ],
    DHCPLeaseTime: [
      [1],
      [6],
      [12],
      [24]
    ]
  },
  validates: {
    IPv4IPAddress: (vm) => {
      return validates.IsBroadcastOrNetworkAddress(vm, "IPv4IPAddress", "SubnetMask");
    },
    StartIPAddress1: (vm) => {
      return validates.IsSameSubnetAddrs(vm, "StartIPAddress", "IPv4IPAddress", "SubnetMask");
    },
    StartIPAddress2: (vm) => {
      return validates.IsAvailableIpPool(vm, "IPv4IPAddress", "StartIPAddress", "EndIPAddress");
    },
    EndIPAddress1: (vm) => {
      return validates.IsBroadcastOrNetworkAddress(vm, "EndIPAddress", "SubnetMask");
    },
    EndIPAddress2: (vm) => {
      return validates.IsSameSubnetAddrs(vm, "EndIPAddress", "IPv4IPAddress", "SubnetMask");
    }
  },
  formRules: {
    IPv4IPAddress: [
      { required: true, message: 'Required!', trigger: 'blur' },
      { validator: validates.ip, message: 'Invalid IP!' }
    ],
    SubnetMask: [
      { required: true, message: 'Required!', trigger: 'blur' },
      { validator: validates.subnetMask, message: 'Invalid Subnet Mask!' }
    ],
    StartIPAddress: [
      { required: true, message: 'Required!', trigger: 'blur' },
      { validator: validates.ip, message: 'Invalid IP!' }
    ],
    EndIPAddress: [
      { required: true, message: 'Required!', trigger: 'blur' },
      { validator: validates.ip, message: 'Invalid IP!' }
    ]
  },
  formRulesExtension: {
    IPv4IPAddress: { validator: "IPv4IPAddress", message: 'IP Address is invalid. Please input again!' },
    StartIPAddress: { validator: "StartIPAddress1", message: 'Start IP Address and "IP Address" should belong to the same subnet.' },
    StartIPAddress: { validator: "StartIPAddress2", message: 'Error!Please be noticed, 10 after the Home Address is System pre-reserved IP,and it can not be included in DHCP IP Pool.' },
    EndIPAddress: { validator: "EndIPAddress1", message: 'End IP Address is invalid. Please input again!' },
    EndIPAddress: { validator: "EndIPAddress2", message: 'End IP Address and "IP Address" should belong to the same subnet.' }
  }
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
      return validates.Confirm(vm,"NewPassword");
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
    ConfirmPassword: { validator: "Confirm",message: 'The confirm password is not the same as the new password.' },
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
    //TimeZone: "UTC"
    ZoneName: "UTC"
  },
  formOptions: {
    AntennaSwitch: [
      [0, 'Internal'],
      [1, 'External']
    ],
    Language: [],
    TimeZone:[] 
  },
  formRules: {
    NtpServer1: [
      { type: "string", required: true, message: 'Required' },
      {validator:validates.ip,message: 'Invalid IP!'}
    ],
    NtpServer2: [
      { type: "string", required: true, message: 'Required' },
      {validator:validates.ip,message: 'Invalid IP!'}
    ]
  }
}
//backupRestore
config.backupRestore = {
  formData: {
    iptRestore:"45646"
  },
  formOptions: {},
  formRules: {}
}

//inbox
config.inbox = {
  formData: {
    "Page": 0,
    "key": "inbox"
  },
  formOptions: {},
  formRules: {}
}
//outbox
config.outbox = {
  formData: {
    "Page": 0,
    "key": "outbox"
  },
  formOptions: {},
  formRules: {}
}
//draft
config.draft = {
  formData: {
    "Page": 0,
    "key": "draft"
  },
  formOptions: {},
  formRules: {}
}
//newSMS
config.newSMS = {
  formData: {
    PhoneNumber:"",
    SMSContent:""
  },
  formOptions: {
    PhoneNumber: [
      { type: "string", required: true, message: 'Required' }
      /*{ type: "string", required: true, pattern: /^[A-Za-z0-9\-\+\!\^\$\@\#\&\*]{4,16}$/, message: 'Invalid password!The length of login password is 4-16, including 0-9, a-z, A-Z,"-+!@$#^&*",please input again.' }*/
    ],
    SMSContent: [
      { type: "string", required: true, message: 'Required' }
      /*{ type: "string", required: true, pattern: /^[A-Za-z0-9\-\+\!\^\$\@\#\&\*]{4,16}$/, message: 'Invalid password!The length of login password is 4-16, including 0-9, a-z, A-Z,"-+!@$#^&*",please input again.' }*/
    ],

  },
  formRules: {}
}
//SMS Settings
config.smsSettings = {
  formData: {
    "StoreFlag":1,
    "SMSReportFlag":1,
    "SMSCenter":""
  },
  formOptions: {
    StoreFlag: [
      [0,'SIM Card'],
      [1,'Device']
    ],
    SMSReportFlag: [
      [1, 'Enable'],
      [0, 'Disable']
      
    ]
  },
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
    ],
    Unit: [
      [0, 'MB'],
      [1, 'GB'],
      [2, 'KB']
    ]
  },
  formRules: {
    MonthlyPlan: [
      { required: true, message: 'Required', trigger: 'blur' },
      { min: 1, max: 4, message: '长度在 1 到 4 个字符' },
      { validator:validates.monthlyPlan, message: 'Please input the data between 1-1024.', trigger: 'blur'}
    ],
    TimeLimitTimes: [
      { required: true, message: 'Required', trigger: 'blur' },
      { min: 1, max: 5, message: '长度在 1 到 5 个字符' },
      { validator:validates.timeLimitTimes, message: 'Please input the data between 1-43200.', trigger: 'blur'}
    ]
  }
};

//  usage Record
config.usageRecord = {
  formData: {
  },
  formOptions: {
  },
  formRules: {
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
    portfwd_name: [
      common.rule.required
    ],
    private_ip: [
      common.rule.required,
      common.rule.IP
    ],
    private_port: [
      common.rule.required
    ],
    global_port: [
      common.rule.required
    ]
  }

}

//wps
config.wps = {
  formData: {
    wpsMode: 0,
    WpsPin: ""
  },
  formOptions: {
    wpsMode: [
      [0, 'WPS PIN'],
      [1, 'PBC(Push Button Configuration) ']
    ]
  },
  formRules: {
    WpsPin: [
      { required: true, message: 'Required!', trigger: 'blur' },
      { validator: validates.wpsPin, message: 'Invalid wps Pin!' }
    ]
  }
}

//qos
config.qos = {
  initNewData: {
    "Id": "",
    "Priority": 1,
    "SrcIPAddress": "192.168.1.10",
    "Service": 0,
    "Protocol": 0,
    "Port": "9090"
  },
  formOptions: {
    State: [
      [0, 'disable'],
      [1, 'enable'],
    ],
    Protocol: [
      [0, 'ALL'],
      [1, 'TCP'],
      [2, 'UDP'],
      [3, 'ICMP']
    ],
    Priority: [
      [0, 'Express'],
      [1, 'High'],
      [2, 'Normal'],
      [3, 'Low']
    ],
    Service: [
      [0, 'All'],
      [1, 'ICQ'],
      [2, 'BitTorrent'],
      [3, 'eMule'],
      [4, 'FastTrack'],
      [5, 'FTP'],
      [6, 'Gnutella'],
      [7, 'HTTP'],
      [8, 'Ident'],
      [9, 'IRC'],
      [10, 'Jabber'],
      [11, 'MSN'],
      [12, 'NTP'],
      [13, 'POP3'],
      [14, 'SMTP'],
      [15, 'SSL'],
      [16, 'VNC']
    ]
  },
  formData: {
    UserName:'',
    password:''
  },
  formRules: {
    Port: [
      { validator: validates.checkPortInvalid, message: 'Invalid Port!' }
    ],
    SrcIPAddress: [
      { validator: validates.checkIpAddressInvalid, message: 'Invalid IpAddress!', trigger: 'blur' }
    ],
  }
};

//login
config.login = {
  formData: {
    UserName: 'admin',
    Password: '',
    "save_flag":0
  },
  formOptions: {
    save_flag: [
      [1, 'Enable'],
      [0, 'Disable']
    ]
  },
  formRules: {}
};
//dlna
config.dlna = {
  formData: {},
  formOptions: {},
  formRules: {}
};

//usb
config.usb = {
  formData: {},
  formOptions: {
    UsbStatus: [
      [1, 'ids_samba_storageUsb'],
      [2, 'ids_usb_print']
    ]
  },
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
    currentProfileId: 0
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
//localUpgrade
config.localUpgrade = {
  formData:{},
  formRules:{}
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
//wanPing
config.wanPing = {
  formData: {},
  formOptions: {
    disableWanAcess: [
      [0, 'Enable'],
      [1, 'Disable']
    ]
  },
  formRules: {}
};
//tr069
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
//ipFilter
config.ipFilter = {
  formData: {
    filter_policy:0,
    ip_protocol:17,
    lan_ip:"",
    lan_port:"",
    wan_ip:"",
    wan_port:""
  },
  formOptions: {
    filter_policy: [
      [0, 'Disable'],
      [2, 'Blacklist'],
      [1, 'Whitelist']
    ],
    ip_protocol: [
      [6, 'TCP'],
      [17, 'UDP'],
      [253, 'TCP/UDP']
    ]
  },
  formRules: {
    lan_ip:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    lan_port:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    wan_ip:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    wan_port:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ]
  }
};
//macFilter
config.macFilter = {
  formData: {
    filter_policy:0,
    Address:""
  },
  formOptions: {
    filter_policy: [
      [0, 'Disable'],
      [2, 'Blacklist'],
      [1, 'Whitelist']
    ]
  },
  formRules: {
    Address:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ]
  }
};
//urlFilter
config.urlFilter = {
  formData: {
    filter_policy:0,
    url:""
  },
  formOptions: {
    filter_policy: [
      [0, 'Disable'],
      [2, 'Blacklist'],
      [1, 'Whitelist']
    ]
  },
  formRules: {
    url:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ]
  }
};
//staticRules
config.staticRules = {
  formData: {
    State:0,
    DestNetAddr:"",
    DestNetmask:"",
    GateWay:""
  },
  formOptions: {
    State: [
      [1, 'Enable'],
      [0, 'Disable']
    ]
  },
  formRules: {
    DestNetAddr:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    DestNetmask:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ],
    GateWay:[
      { required: true, message: 'Required!', trigger: 'blur' },
    ]
  }
};
//dynamicRules
config.dynamicRules = {
  formData: {
    Operation:0,
    RipState:0,
    RipVerion:0
  },
  formOptions: {
    Operation: [
      [1, 'active'],
      [0, 'disactive']
    ],
    RipState: [
      [1, 'Enable'],
      [0, 'Disable']
    ],
    RipVerion: [
      [0, 'Rip V1&Rip V2'],
      [1, 'Rip V1'],
      [2, 'Rip V2']
    ]
  },
  formRules: {
  }
};

config.systemSettings.formOptions.ZoneName=sys.ZoneName;
config.systemSettings.formOptions.Language=sys.Language;

config.Wlan = {
  formData: {
    "AP2G_Ssid": "ds9",
    "show2GPassword": false,
    "show5GPassword": false,
    "CountryCode": "IT",
    "WiFiOffTime": 0,
    "AP2G": {
      "ApStatus": 1,
      "WMode": 3,
      "CountryCode": "CN",
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
      "CountryCode": "CN",
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
    show2GPassword: [
      [1, 'enable'],
      [0, 'disable']
    ],
    show5GPassword: [
      [1, 'enable'],
      [0, 'disable']
    ],
    CountryCode: [
      ["IT", 'IT'],
      ["CN", 'CN']
    ],
    AP2G: {
      ApStatus: [
        [1, 'Enable'],
        [0, 'Disable']
      ],
      CountryCode: [
        ["IT", 'ITs'],
        ["CN", 'CNs']
      ],
      SecurityMode: [
        [0, 'disable'],
        [1, 'WEP'],
        [2, 'WPA'],
        [3, 'WPA2'],
        [4, 'WPA/WPA2']
      ],
      WepType: [
        [0, 'OPEN'],
        [1, 'share']
      ],
      WpaType: [
        [0, 'TKIP'],
        [1, 'AES'],
        [2, 'AUTO']
      ],
      ApIsolation: [
        [0, 'Off'],
        [1, 'On'],
      ],
      WMode: [
        [0, 'Auto'],
        [1, '802.11b'],
        [2, '802.11b/g'],
        [3, '802.11b/g/n']
      ],
      SsidHidden: [
        [0, 'disable'],
        [1, 'enable'],
      ],
      Bandwidth:[
        [0, '20MHz/40MHz'],
        [1, '20MHz'],
        [2, '40MHz']
      ]
    },
    AP5G: {
      ApStatus: [
        [1, 'Enable'],
        [0, 'Disable']
      ],
      CountryCode: [
        ["IT", 'IT'],
        ["CN", 'CN']
      ],
      SecurityMode: [
        [0, 'disable'],
        [1, 'WEP'],
        [2, 'WPA'],
        [3, 'WPA2'],
        [4, 'WPA/WPA2']
      ],
      WepType: [
        [0, 'OPEN'],
        [1, 'share']
      ],
      WpaType: [
        [0, 'TKIP'],
        [1, 'AES'],
        [2, 'AUTO']
      ],
      ApIsolation: [
        [0, 'Off'],
        [1, 'On']
      ],
      WMode: [
        [0, 'Auto'],
        [4, '802.11a'],
        [5, '802.11a/n'],
        [6, '802.11a/c']
      ],
      SsidHidden: [
        [0, 'disable'],
        [1, 'enable'],
      ],
      Bandwidth:[
        [0, '20MHz/40MHz'],
        [1, '20MHz'],
        [2, '40MHz']
      ]
    }
  },
  formRules: {
    "AP2G:Ssid": [
      common.rule.required
    ],
    "AP5G:Ssid": [
      common.rule.required
    ],
  },
}



export default config;
