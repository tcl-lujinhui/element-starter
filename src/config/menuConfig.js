let menuConfig = {};
menuConfig.nav = [{
  name: "Home",
  text: "ids_home",
  router: 'internetStatus'
}, {
  name: "Services",
  text: "ids_services",
  router: 'inbox'
}, {
  name: "Settings",
  text: "ids_settings",
  router: 'mobileConnection'
}, {
  name: "System",
  text: "ids_system",
  router: 'deviceInfo'
}];

menuConfig.sideMenu = {
  "Home": [{
    icon: "status",
    text: "ids_status",
    submenu: [{
      text: "ids_internet",
      router: "internetStatus"
    }, {
      text: "ids_lan_Lan",
      router: "lanStatus"
    }, {
      text: "ids_wifi_WiFiTitle",
      router: "wlanStatus"
    }]
  }, {
    icon: "statistics",
    text: "ids_statistics",
    submenu: [{
      text: "ids_internet",
      router: "internetStatistics"
    }, {
      text: "ids_lan_Lan",
      router: "lanStatistics"
    }, {
      text: "ids_wifi_WiFiTitle",
      router: "wlanStatistics"
    }]
  }, {
    icon: "setup-wizard",
    text: "ids_setupWizard",
    router: "setupWizard"
  }],
  "Services": [{
    icon: "SMS",
    text: "ids_sms_titleSms",
    submenu: [{
      text: "ids_sms_inbox",
      router: "inbox"
    }, {
      text: "ids_sms_outbox",
      router: "outbox"
    }, {
      text: "ids_sms_draft",
      router: "draft"
    }, {
      text: "ids_sms_newMessage",
      router: "newSMS"
    }, {
      text: "ids_menu_smsSettings",
      router: "smsSettings"
    }]
  }, {
    icon: "calllogs",
    text: "ids_call_pageTitle",
    submenu: [{
      text: "ids_call_Incoming",
      router: "incomingCall"
    }, {
      text: "ids_call_Outgoing",
      router: "outgoingCall"
    }, {
      text: "ids_call_Missed",
      router: "missedCall"
    }]
  }, {
    icon: "share",
    text: "ids_share",
    submenu: [{
      text: "ids_storageShare",
      router: "storageShare"
    }, {
      text: "ids_usb_Title",
      router: "usb"
    }, {
      text: "ids_samba_menuDlna",
      router: "dlna"
    }, {
      text: "ids_user_deviceAccess",
      router: "userSettings"
    }]
  }],
  "Settings": [{
    icon: "dailup",
    text: "ids_dialUp",
    submenu: [{
      text: "ids_network_Mobconn",
      router: "mobileConnection"
    }, {
      text: "ids_profile_pageTitle",
      router: "profileManagement"
    }, {
      text: "ids_netwrok_Title",
      router: "networkSettings"
    }, {
      text: "ids_monthlyPlan_pageTitle",
      router: "monthlyPlan"
    }]
  }, {
    icon: "wan",
    text: "ids_ethWan_wan",
    submenu: [{
      text: "ids_ethWan_menuWanStatus",
      router: "wanStatus"
    }, {
      text: "ids_wan_configureTitle",
      router: "wanConfigure"
    }, {
      text: "ids_ethWan_menuMacClone",
      router: "macClone"
    }]
  }, {
    icon: "wlan",
    text: "ids_wifi_WiFiTitle",
    submenu: [{
      text: "ids_wlan_basic",
      router: "basic"
    }, {
      text: "ids_wlan_advanced",
      router: "advanced"
    }, {
      text: "ids_title_wps",
      router: "wps"
    }]
  }, {
    icon: "security",
    text: "ids_wlan_security",
    submenu: [{
      text: "ids_sim_pinManagement",
      router: "pinManagement"
    }, {
      text: "ids_router_Title",
      router: "routingRules"
    }, {
      text: "ids_security_wanPing",
      router: "wanPing"
    }, {
      text: "ids_filter_ipFilter",
      router: "ipFilter"
    }, {
      text: "ids_filter_macFilter",
      router: "macFilter"
    }, {
      text: "ids_filter_urlFilter",
      router: "urlFilter"
    }]
  }, {
    icon: "natsetting",
    text: "ids_NAT_Title",
    submenu: [{
      text: "ids_security_dmzTitle",
      router: "dmz"
    }, {
      text: "ids_alg_Title",
      router: "alg"
    }, {
      text: "ids_security_upnp",
      router: "upnp"
    }, {
      text: "ids_vtServer_titleVirtualServer",
      router: "virtualServer"
    }]
  }, {
    icon: "qos",
    text: "ids_qos_titleQos",
    router: "qos"
  }, {
    icon: "lan",
    text: "ids_lan_Lan",
    router: "lanSettings"
  }],
  "System": [{
    icon: "deviceinfo",
    text: "ids_system_deviceInfo",
    router: "deviceInfo"
  }, {
    icon: "reset",
    text: "ids_system_rebootReset",
    submenu: [{
      text: "ids_system_reboot",
      router: "reboot"
    }, {
      icon: "calllogs",
      text: "ids_reset",
      router: "reset"
    }]
  }, {
    icon: "upgrade",
    text: "ids_update_upgrade",
    submenu: [/*{
      text: "ids_update_localUpgrade",
      router: "localUpgrade"
    },*/ {
      text: "ids_update_onlineUpgrade",
      router: "onlineUpgrade"
    }, {
      text: "ids_title_tr069",
      router: "tr069"
    }]
  }, {
    icon: "devicemgmt",
    text: "ids_system_deviceMamt",
    submenu: [{
      text: "ids_login_loginPwd",
      router: "changePassword"
    }, {
      text: "ids_system_pageTitle",
      router: "systemSettings"
    }, {
      text: "ids_system_backupRestore",
      router: "restore"
    }]
  }]
}

export default menuConfig;
