import _ from 'underscore';
import menuConfig from './config/menuConfig.js'
import sys from "./config/sys.js";
import countryCode from "./config/countryCode.js";
import validates from './plugin/validates.js';
let config = {};

let countryCodeformOptions = []
_.each(countryCode,(v,k)=>{
  countryCodeformOptions.push([k,v[0]])
})

config.nav = menuConfig.nav;
config.sideMenu = menuConfig.sideMenu;

let common = {
  checkBoxEnable: [
    [1, 'ids_enable'],
    [0, 'ids_disable']
  ],
  checkBoxAuto: [
    [0, 'ids_manual'],
    [1, 'ids_auto']
  ],
  checkBoxDisable: [
    [0, 'ids_enable'],
    [1, 'ids_disable']
  ],


  rule: {
    required: { required: true, message: 'ids_required', trigger: 'change' },
    IP: { validator: validates.ip, message: 'ids_qos_ipInvalid', trigger: 'change' },
    pin: { validator: validates.pin, message: 'ids_sim_pinRule', trigger: 'change' },
    puk: { validator: validates.puk, message: 'ids_sim_pukRule', trigger: 'change' },
    wepkey: { validator: validates.wepkey, message: 'ids_wlan_wepKeyRule', trigger: 'change' },
    wpakey: { validator: validates.wpakey, message: 'ids_wlan_wpaKeyRule', trigger: 'change' }
  }
}

config.mobileConnection = {
  formOptions: {
    ConnectMode: common.checkBoxAuto,
    PdpType: [
      [0, 'IPV4'],
      [2, 'IPV6'],
      [3, 'IPv4v6']
    ],
    RoamingConnect: [
      [1, 'ids_disable'],
      [0, 'ids_enable']
    ]
  },
  formData: {},
  formRules: {}
};

config.networkSettings = {
  formOptions: {
    NetselectionMode: [
      [0, 'ids_auto'],
      [1, 'ids_manual']
    ],
    NetworkMode: [
      [0, 'ids_auto'],
      [1, 'ids_2gOnly'],
      [2, 'ids_3gOnly'],
      [3, 'ids_4gOnly']
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
    UserName: "admin",
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
      Language: "fr",
      CurrTime: "",
      /*NtpServer1: "0.openwrt.pool.ntp.org",
      NtpServer2: "0.openwrt.pool.ntp.org",*/
      //TimeZone: "UTC",
      ZoneName: "UTC"
    },
    formOptions: {
      Language: [],
      /*NtpServer1:[],
      NtpServer2:[],*/
      ZoneName: []
    },
    formRules: {}
  }

config.systemSettings.formOptions.ZoneName = sys.ZoneName;
config.systemSettings.formOptions.Language = sys.Language;
/*config.systemSettings.formOptions.NtpServer1 = sys.NtpServer1;
config.systemSettings.formOptions.NtpServer2 = sys.NtpServer2;*/

//ntpServer
config.ntpServer = {
    formData: {
      NtpServer1: "0.openwrt.pool.ntp.org",
      NtpServer2: "0.openwrt.pool.ntp.org"
    },
    formOptions: {
      NtpServer1:[],
      NtpServer2:[]
    },
    formRules: {}
  }
config.ntpServer.formOptions.NtpServer1 = sys.NtpServer1;
config.ntpServer.formOptions.NtpServer2 = sys.NtpServer2;

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
  pageItem:{
    StoreFlag:true
  },
  formData: {
    "StoreFlag": 1,
    "SMSReportFlag": 1,
    "SMSCenter": ""
  },
  formOptions: {
    StoreFlag: [
      [0, 'ids_sms_modeSimCard'],
      [1, 'ids_device']
    ],
    SMSReportFlag: [
      [1, 'ids_enable'],
      [0, 'ids_disable']

    ]
  },
  formRules: {}
}

//SMS Forwarding
config.smsForwarding = {
  formData: {
    "redirect_flag": 0,
    "redirect_number": ""
  },
  formOptions: {
    redirect_flag: [
      [1, 'ids_enable'],
      [0, 'ids_disable']

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
      [0, 'ids_none'],
      [1, 'PAP'],
      [2, 'CHAP'],
      [3, 'PAP& CHAP']
    ]
  },
  formRules: {
    ProfileName: [
      { required: true, message: 'ids_required', trigger: 'blur' },
    ],
    DailNumber: [
      { required: true, message: 'ids_required', trigger: 'blur' },
    ],
    APN: [
      { required: true, message: 'ids_required', trigger: 'blur' },
    ]
  },
};
// Monthly Plan
config.monthlyPlan = {
  formData: {},
  formOptions: {
    AutoDisconnFlag: [
      [0, 'ids_disable'],
      [1, 'ids_enable']
    ],
    TimeLimitFlag: [
      [0, 'ids_disable'],
      [1, 'ids_enable']
    ],
    Unit: [
      [0, 'ids_mb'],
      [1, 'ids_gb'],
      [2, 'ids_kb']
    ]
  },
  formRules: {
    MonthlyPlan: [
      { required: true, message: 'Required', trigger: 'blur' },
      { validator: validates.monthlyPlan, message: 'ids_monthlyPlan_totalUsageInvalid', trigger: 'blur' }
    ],
    TimeLimitTimes: [
      { required: true, message: 'Required', trigger: 'blur' },
      { validator: validates.timeLimitTimes, message: 'ids_monthlyPlan_overtimeInvalid', trigger: 'blur' }
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
    FtpStatus: [
      [0, 'ids_enable'],
      [1, 'ids_disable']
    ],
    H323AlgStatus: [
      [0, 'ids_enable'],
      [1, 'ids_disable']
    ],
    SipAlgStatus: [
      [0, 'ids_enable'],
      [1, 'ids_disable']
    ]
  },
  formData: {},
  formRules: {}
}


config.dmzSettings = {
  formOptions: {
    dmz_status: [
      [0, 'ids_enable'],
      [1, 'ids_disable']
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
      [0, 'ids_enable'],
      [1, 'ids_disable']
    ]
  },
  formData: {},
  formRules: {}
}


config.virtualServer = {
  formOptions: {
    fwding_status: [
      [0, 'ids_wifi_off'],
      [1, 'ids_wifi_on']
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
    "Priority": "",
    "SrcIPAddress": "",
    "Service": "",
    "Protocol": "",
    "Port": ""
  },
  formOptions: {
    State: [
      [0, 'ids_disable'],
      [1, 'ids_enable'],
    ],
    Protocol: [
      [0, 'ids_all'],
      [1, 'TCP'],
      [2, 'UDP'],
      [3, 'ICMP']
    ],
    Priority: [
      [0, 'ids_qos_express'],
      [1, 'ids_qos_high'],
      [2, 'ids_qos_normal'],
      [3, 'ids_qos_low']
    ],
    Service: [
      [0, 'ids_all'],
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
      { required: true, message: 'ids_required', trigger: 'blur' },
      { validator: validates.checkPortInvalid, message: 'ids_qos_portInvalid' },
    ],
    SrcIPAddress: [
     common.rule.required,
     common.rule.IP
    ]
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
  pageItem:{
    Anonymous:true
  },
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
  pageItem:{
    Anonymous:true
  },
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
      common.rule.required
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
  formData: {
    "IPv4Adrress": ""
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
    [0, "NetTypeNOSERVICE", "ids_netwrok_noService"],
    [1, "NetTypeGPRS", "2G"],
    [2, "NetTypeEDGE", "2G"],
    [3, "NetTypeHSPA", "3G"],
    [4, "NetTypeHSUPA", "3G"],
    [5, "NetTypeUMTS", "3G"],
    [6, "NetTypeHSPAPLUS", "3G+"],
    [7, "NetTypeDCHSPAPLUS", "3G+"],
    [8, "NetTypeLTE", "4G"],
    [9, "NetTypeLTEPLUS", "4G+"]
  ],
  formRules: {}
};
config.homeWlanStatus = {
  formData: {},
  ssidBroadcastDisplayNum: 1, //val:0,1
  ssidBroadcastArr: common.checkBoxDisable,
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
    DestNetAddr: [
      common.rule.required,
      common.rule.IP
    ],
    DestNetmask: [
      common.rule.required,
      { validator: validates.isValidSubnetMask, message: 'ids_router_subnetInvalid' }
    ],
    GateWay: [
      common.rule.required,
      common.rule.IP
    ]
  },
  formRulesExtension: {
    DestNetmask: { validator: "DestNetmaskVal", message: 'ids_router_subnetInvalid', trigger: 'blur' },
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

config.Wlan = {
  formData: {
    "show2GPassword": false,
    "show5GPassword": false,
    "WiFiOffTime": 0,
    "AP2G": {
      "ApStatus": 0,
      "WMode": 3,
      "CountryCode": "CN",
      "Ssid": "",
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
      "ApStatus": 0,
      "WMode": 3,
      "CountryCode": "CN",
      "Ssid": "",
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
    AP2G: {
      ApStatus: common.checkBoxEnable,
      CountryCode: countryCodeformOptions,
      SecurityMode: [
        [0, 'ids_disable'],
        [1, 'WEP'],
        [2, 'WPA'],
        [3, 'WPA2'],
        [4, 'WPA/WPA2']
      ],
      WepType: [
        [0, 'ids_wifi_wepOpen'],
        [1, 'ids_wifi_wepShare']
      ],
      WpaType: [
        [0, 'TKIP'],
        [1, 'AES'],
        [2, 'ids_auto']
      ],
      ApIsolation: [
        [0, 'ids_wifi_off'],
        [1, 'ids_wifi_on'],
      ],
      WMode: [
        [0, 'ids_auto'],
        [1, '802.11b'],
        [2, '802.11b/g'],
        [3, '802.11b/g/n']
      ],
      SsidHidden: common.checkBoxDisable,
      Bandwidth: [
        [0, '20MHz/40MHz'],
        [1, '20MHz'],
        [2, '40MHz']
      ]
    },
    AP5G: {
      ApStatus: common.checkBoxEnable,
      CountryCode: countryCodeformOptions,
      SecurityMode: [
        [0, 'ids_disable'],
        [1, 'WEP'],
        [2, 'WPA'],
        [3, 'WPA2'],
        [4, 'WPA/WPA2']
      ],
      WepType: [
        [0, 'ids_wifi_wepOpen'],
        [1, 'ids_wifi_wepShare']
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
      SsidHidden: common.checkBoxDisable,
      Bandwidth: [
        [0, '20MHz/40MHz'],
        [1, '20MHz'],
        [2, '40MHz']
      ],
      BandwidthAuto: [
        [0, '20MHz/40MHz'],
        [1, '20MHz'],
        [2, '40MHz']
      ],
      BandwidthAc: [
        [0, '20MHz/40MHz'],
        [1, '20MHz'],
        [2, '40MHz'],
        [3, '80MHz']
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
    "AP2G:WepKey": [
      common.rule.required,
      common.rule.wepkey
    ],
    "AP5G:WepKey": [
      common.rule.required,
      common.rule.wepkey
    ],
    "AP2G:WpaKey": [
      common.rule.required,
      common.rule.wpakey
    ],
    "AP5G:WpaKey": [
      common.rule.required,
      common.rule.wpakey
    ]
  },
}



export default config;
