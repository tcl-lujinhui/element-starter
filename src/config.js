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



  rule: {
    required: { required: true, message: 'ids_required', trigger: 'change' },
    IP: { validator: validates.ip, message: 'ids_qos_ipInvalid', trigger: 'change' },
    pin: { validator: validates.pin, message: 'ids_sim_pinRule', trigger: 'change' },
    puk: { validator: validates.puk, message: 'ids_sim_pukRule', trigger: 'change' }
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
    Operation: 0,
    AutoValidatePinState: 0,
    Pin: "",
    State: 1,
    Puk: "",
    NewPin: "",
    CurrentPin: "",
    SIMLockCode: "",
    ConfirmPin: ""
  },
  formOptions: {
    Operation: [
      [0, 'ids_disable'],
      [1, 'ids_wlan_change']
    ],
    AutoValidatePinState: common.checkBoxEnable
  },
  validates: {
    Confirm: (vm) => {
      return validates.Confirm(vm, "NewPin");
    }
  },
  formRules: {
    Pin: [
      common.rule.required,
      { validator: validates.pin, message: 'ids_sim_pinRule', trigger: 'blur' }
    ],
    NewPin: [
      common.rule.required,
      { validator: validates.pin, message: 'ids_sim_newPinRule', trigger: 'blur' }
    ],
    CurrentPin: [
      common.rule.required,
      { validator: validates.pin, message: 'ids_sim_pinRule', trigger: 'blur' }
    ],
    ConfirmPin: [
      common.rule.required,
      { validator: validates.pin, message: 'ids_sim_pinRule', trigger: 'blur' }
    ]
  },
  formRulesExtension: {
    ConfirmPin: { validator: "Confirm", message: 'ids_sim_confirmedPin', trigger: 'blur' },
  }
};

//lanSettings
config.lanSettings = {
  formData: {},
  formOptions: {
    DHCPServerStatus: common.checkBoxEnable,
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
      common.rule.required,
      common.rule.IP
    ],
    SubnetMask: [
      common.rule.required,
      { validator: validates.subnetMask, message: 'ids_router_subnetInvalid' }
    ],
    StartIPAddress: [
      common.rule.required,
      common.rule.IP
    ],
    EndIPAddress: [
      common.rule.required,
      common.rule.IP
    ]
  },
  formRulesExtension: {
    IPv4IPAddress: { validator: "IPv4IPAddress", message: 'ids_qos_ipInvalid' },
    StartIPAddress: [
      { validator: "StartIPAddress1", message: 'ids_lan_startToEnd' },
      { validator: "StartIPAddress2", message: 'ids_lan_DHCPIpRule' }
    ],
    EndIPAddress: [
      { validator: "EndIPAddress1", message: 'ids_lan_endIpRule' },
      { validator: "EndIPAddress2", message: 'ids_lan_endToStart' }
    ]
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
      return validates.Confirm(vm, "NewPassword");
    }
  },
  formRules: {
    CurrPassword: [
      common.rule.required,
      { type: "string", required: true, pattern: /^[A-Za-z0-9\-\+\!\^\$\@\#\&\*]{4,16}$/, message: 'ids_admin_passwordRulePrompt' }
    ],
    NewPassword: [
      common.rule.required,
      { type: "string", required: true, pattern: /^[A-Za-z0-9\-\+\!\^\$\@\#\&\*]{4,16}$/, message: 'ids_admin_passwordRulePrompt' }
    ],
    ConfirmPassword: [
      common.rule.required
    ]
  },
  formRulesExtension: {
    ConfirmPassword: { validator: "Confirm", message: 'ids_admin_confirmPdwNotSame' },
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
      TimeZone: []
    },
    formRules: {
      NtpServer1: [
        common.rule.required,
        common.rule.IP
      ],
      NtpServer2: [
        common.rule.required,
        common.rule.IP
      ]
    }
  }
  //backupRestore
config.backupRestore = {
  formData: {
    iptRestore: "45646"
  },
  formOptions: {},
  formRules: {}
}

//inbox
config.inbox = {
    formData: {},
    formOptions: {},
    formRules: {}
  }
  //outbox
config.outbox = {
    formData: {},
    formOptions: {},
    formRules: {}
  }
  //draft
config.draft = {
    formData: {},
    formOptions: {},
    formRules: {}
  }
  //newSMS
config.newSMS = {
    formData: {
      PhoneNumber: "",
      SMSContent: ""
    },
    formOptions: {
      PhoneNumber: [
        common.rule.required,
        { type: "string", required: true, pattern: /^[0-9]{1,20}$/, message: 'ids_sms_numberRule' }
      ]
    },
    formRules: {}
  }
  //SMS Settings
config.smsSettings = {
  formData: {
    "StoreFlag": 1,
    "SMSReportFlag": 1,
    "SMSCenter": ""
  },
  formOptions: {
    StoreFlag: [
      [0, 'SIM Card'],
      [1, 'Device']
    ],
    SMSReportFlag: [
      [1, 'Enable'],
      [0, 'Disable']

    ]
  },
  formRules: {}
}

//smsReport.vue
config.smsReport = {
  formData: {},
  formOptions: {},
  formRules: {}
}

//CallLog
config.callLogs = {
  formData: {
    pageNum: 0,
    type: 0
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
  formData: {},
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
      { validator: validates.monthlyPlan, message: 'Please input the data between 1-1024.', trigger: 'blur' }
    ],
    TimeLimitTimes: [
      { required: true, message: 'Required', trigger: 'blur' },
      { min: 1, max: 5, message: '长度在 1 到 5 个字符' },
      { validator: validates.timeLimitTimes, message: 'Please input the data between 1-43200.', trigger: 'blur' }
    ]
  }
};

//  usage Record
config.usageRecord = {
  formData: {},
  formOptions: {},
  formRules: {}
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
    dmz_ip: [
      common.rule.required,
      common.rule.IP
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
    portfwd_name: '',
    private_ip: '',
    private_port: '',
    global_port: '',
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
      [0, 'ids_wlan_wpsPin'],
      [1, 'ids_wifi_pbc']
    ]
  },
  formRules: {
    WpsPin: [
      common.rule.required,
      { validator: validates.wpsPin, message: 'ids_wlan_InvalidWpsPinTips' }
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
    UserName: '',
    password: ''
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
    "save_flag": 0
  },
  formOptions: {
    save_flag: common.checkBoxEnable
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
      [0, 'ids_samba_readOnly'],
      [1, 'ids_samba_readWrite']
    ],
    Anonymous: common.checkBoxEnable
  },
  formRules: {}
};

//ftp
config.ftp = {
  formData: {},
  formOptions: {
    AuthType: [
      [0, 'ids_samba_readOnly'],
      [1, 'ids_samba_readWrite']
    ],
    Anonymous: common.checkBoxEnable
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
      common.rule.required,
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
  validates: {
    ConfirmPin: (vm) => {
      return validates.Confirm(vm, "Pin");
    }
  },
  formRules: {
    Pin: [
      common.rule.required,
      common.rule.pin,
    ],
    Puk: [
      common.rule.required,
      common.rule.puk,
    ],
    ConfirmPin: [
      common.rule.required,
      common.rule.pin,
    ],
    SIMLockCode: [
      common.rule.required,
    ]
  },
  formRulesExtension: {
    ConfirmPin: { validator: "ConfirmPin", message: 'ids_sim_confirmedPin', trigger: 'change' },
  }
};
//home status 
config.homeLanStatus = {
  formData: {},
  lanConnectedDisplayNum: 1, //val: 0,1
  lanConnectedStatusArr: [
    [0, "ids_disconnected"],
    [1, "ids_connected"]
  ],
};
//internetStatus
config.homeInternetStatus = {
    formData:{
        "IPv4Adrress":""
    },
  usbStatusDisplayNum: 1, //val:0,1
  usbStatusArr: [
    [0, "ids_Wan_usbNotInsert"],
    [1, "ids_usb_storage"],
    [2, "ids_usb_print"]
  ],
  connectionDisplayNum: 1, //val:0, 1
  connectionStatusArr: [
    [0, "ids_disconnected"],
    [1, "ids_connecting"],
    [2, "ids_connected"],
    [3, "ids_disconnecting"]
  ],
  networkTypeDisplayNum: 1, //val:0,1,2;control networkTypeArr display val
  networkTypeArr: [
    [0, "NA", "NO SERVER"],
    [1, "2G", "GPRS"],
    [2, "2G", "EDGE"],
    [3, "3G", "HSPA"],
    [4, "3G", "HSUPA"],
    [5, "3G", "UMTS"],
    [6, "3G+", "HSPA_PLUS"],
    [7, "3G+", "DC-HSPA_PLUS"],
    [8, "4G", "LTE"],
    [9, "4G+", "LTE_PLUS"]
  ],
    formRules:{}
};
config.homeWlanStatus = {
  formData: {},
  ssidBroadcastDisplayNum: 1, //val:0,1
  ssidBroadcastArr: [
    [0, "ids_disable"],
    [1, "ids_enable"]
  ],
  formRules: {}
};
//localUpgrade
config.localUpgrade = {
  formData: {},
  formRules: {}
};

//wan mac Clone
config.macClone = {
  formData: {
    MacAddr: ""
  },
  formOptions: {},
  formRules: {
    MacAddr: [
      common.rule.required,
    ]
  }
};

//wan Configure
config.wanConfigure = {
  formData: {},
  formOptions: {
    ConnectType: [
      [0, 'ids_ethWan_pppoe'],
      [1, 'ids_ethWan_dhcp'],
      [2, 'ids_ethWan_staticIp']
    ]
  },
  formRules: {
    "SubNetMask": [
      common.rule.required,
      { validator: validates.subnetMask, message: 'ids_router_subnetInvalid' }
    ],
    "Gateway": [
      common.rule.required
    ],
    "IpAddress": [
      common.rule.required,
      common.rule.IP
    ],
    "Mtu": [
      common.rule.required
    ],
    "PrimaryDNS": [
      common.rule.required,
      common.rule.IP
    ],
    "SecondaryDNS": [
      common.rule.required,
      common.rule.IP
    ],
    "Account": [
      common.rule.required
    ],
    "Password": [
      common.rule.required
    ],
    "StaticIpAddress": [
      common.rule.required,
      common.rule.IP
    ],
    "pppoeMtu": [
      common.rule.required
    ]
  }
};
//wanPing
config.wanPing = {
  formData: {},
  formOptions: {
    disableWanAcess: [
      [0, 'ids_enable'],
      [1, 'ids_disable']
    ]
  },
  formRules: {}
};
//tr069
config.tr069 = {
  formData: {
    AcsUrl: "",
    AcsUserName: "",
    AcsUserPassword: "",
    ConReqAuthent: 1,
    ConReqUserName: "",
    ConReqUserPassword: "",
    Inform: 1,
    InformInterval: 60
  },
  formOptions: {
    Inform: common.checkBoxEnable,
    ConReqAuthent: common.checkBoxEnable
  },
  formRules: {
    AcsUrl: [
      common.rule.required,
      { validator: validates.acsUrl, message: 'ids_tr069_acsUrlRule', trigger: 'blur' }
    ],
    AcsUserName: [
      common.rule.required,
    ],
    AcsUserPassword: [
      common.rule.required,
    ],
    ConReqUserName: [
      common.rule.required,
    ],
    ConReqUserPassword: [
      common.rule.required,
    ],
    InformInterval: [
      common.rule.required,
      { validator: validates.informInterval, message: 'ids_tr069_informIntervalRule', trigger: 'blur' }
    ]
  },
};
//ipFilter
config.ipFilter = {
  formData: {
    filter_policy: 0,
    ip_protocol: 17,
    lan_ip: "",
    lan_port: "",
    wan_ip: "",
    wan_port: "",
    IPv4IPAddress: "",
    SubnetMask: ""
  },
  formOptions: {
    filter_policy: [
      [0, 'ids_disable'],
      [1, 'ids_blacklist'],
      [2, 'ids_whitelist']
    ],
    ip_protocol: [
      [6, 'TCP'],
      [17, 'UDP'],
      [253, 'TCP/UDP']
    ]
  },
  validates: {
    lanAddrVal: (vm) => {
      return validates.IsSameSubnetAddrs(vm, "lan_ip", "IPv4IPAddress", "SubnetMask");
    },
    lanAddrValIp: (vm) => {
      return validates.isSameSubnetAvailableIp(vm, "lan_ip", "IPv4IPAddress");
    }
  },
  formRules: {
    lan_ip: [
      common.rule.required,
      common.rule.IP
    ],
    lan_port: [
      common.rule.required,
      { validator: validates.portVal, message: 'ids_security_lanport', trigger: 'blur' }
    ],
    wan_ip: [
      common.rule.required,
      common.rule.IP
    ],
    wan_port: [
      common.rule.required,
      { validator: validates.portVal, message: 'ids_security_lanport', trigger: 'blur' }
    ]
  },
  formRulesExtension: {
    lan_ip: { validator: "lanAddrValIp", message: 'ids_lan_DHCPIpRule', trigger: 'blur' },
  }
};
//macFilter
config.macFilter = {
  formData: {
    filter_policy: 0,
    Address: ""
  },
  formOptions: {
    filter_policy: [
      [0, 'ids_disable'],
      [2, 'ids_blacklist'],
      [1, 'ids_whitelist']
    ]
  },
  formRules: {
    Address: [
      common.rule.required,
      { validator: validates.macAddr, message: 'ids_ethWan_macInvalid', trigger: 'blur' }
    ]
  }
};
//urlFilter
config.urlFilter = {
  formData: {
    filter_policy: 0,
    url: ""
  },
  formOptions: {
    filter_policy: [
      [0, 'ids_disable'],
      [2, 'ids_blacklist'],
      [1, 'ids_whitelist']
    ]
  },
  formRules: {
    url: [
      common.rule.required,
      { validator: validates.isValidUrlAddress, message: 'ids_filter_urlRuleMsg', trigger: 'blur' }
    ]
  }
};
//staticRules
config.staticRules = {
  formData: {
    State: 0,
    DestNetAddr: "",
    DestNetmask: "",
    GateWay: ""
  },
  formOptions: {
    State: common.checkBoxEnable
  },
  validates: {
    DestNetmaskVal: (vm) => {
      return validates.checkInvalidateDestNet(vm, "DestNetAddr", "DestNetmask");
    }
  },
  formRules: {
    DestNetAddr:[
      common.rule.required,
      common.rule.IP
    ],
    DestNetmask:[
      common.rule.required,
      { validator: validates.isValidSubnetMask, message: 'ids_router_subnetInvalid' }
    ],
    GateWay:[
      common.rule.required,
      common.rule.IP
    ]
  },
  formRulesExtension: {
    DestNetmask: { validator: "DestNetmaskVal", message: 'ids_router_subnetInvalid' , trigger: 'blur'},
    //DestNetAddr: { validator: "DestNetmaskVal", message: 'ids_router_subnetInvalid' , trigger: 'blur'},
  }
};
//dynamicRules
config.dynamicRules = {
  formData: {
    Operation: 0,
    RipState: 0,
    RipVerion: 0
  },
  formOptions: {
    Operation: common.checkBoxEnable,
    RipState: common.checkBoxEnable,
    RipVerion: [
      [0, 'ids_router_ripV1V2'],
      [1, 'ids_router_ripV1'],
      [2, 'ids_router_ripV2']
    ]
  },
  formRules: {}
};

config.systemSettings.formOptions.ZoneName = sys.ZoneName;
config.systemSettings.formOptions.Language = sys.Language;

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
    show2GPassword: common.checkBoxEnable,
    show5GPassword: common.checkBoxEnable,
    CountryCode: [
      ["IT", 'IT'],
      ["CN", 'CN']
    ],
    AP2G: {
      ApStatus: common.checkBoxEnable,
      CountryCode: [
        ["IT", 'ITs'],
        ["CN", 'CNs']
      ],
      SecurityMode: [
        [0, 'ids_disable'],
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
        [2, 'ids_auto']
      ],
      ApIsolation: [
        [0, 'Off'],
        [1, 'On'],
      ],
      WMode: [
        [0, 'ids_auto'],
        [1, '802.11b'],
        [2, '802.11b/g'],
        [3, '802.11b/g/n']
      ],
      SsidHidden: common.checkBoxEnable,
      Bandwidth: [
        [0, '20MHz/40MHz'],
        [1, '20MHz'],
        [2, '40MHz']
      ]
    },
    AP5G: {
      ApStatus: common.checkBoxEnable,
      CountryCode: [
        ["IT", 'IT'],
        ["CN", 'CN']
      ],
      SecurityMode: [
        [0, 'ids_disable'],
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
        [2, 'ids_auto']
      ],
      ApIsolation: [
        [0, 'ids_wifi_off'],
        [1, 'ids_wifi_on']
      ],
      WMode: [
        [0, 'ids_auto'],
        [4, '802.11a'],
        [5, '802.11a/n'],
        [6, '802.11a/c']
      ],
      SsidHidden: common.checkBoxEnable,
      Bandwidth: [
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
