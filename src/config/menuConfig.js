let menuConfig = {};
menuConfig.nav = [{
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

menuConfig.sideMenu = {
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

export default menuConfig;