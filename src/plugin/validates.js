import validatesFn from './validatesFn';

let showErr = (callback, errMsg) => {
  return callback(errMsg !== '' ? new Error(errMsg) : undefined);
}
let validates = {
  ip(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.ip(value)) {
      errMsg = 'Invalid IP'
    }
    showErr(callback, errMsg)
  },
  monthlyPlan(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.monthlyPlan(value)) {
      errMsg = 'Invalid monthlyPlan'
    }
    showErr(callback, errMsg)
  },
  timeLimitTimes(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.timeLimitTimes(value)) {
      errMsg = 'Invalid Time'
    }
    showErr(callback, errMsg)
  },
  checkPortInvalid(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.checkPortInvalid(value)) {
      errMsg = 'Invalid Port'
    }
    showErr(callback, errMsg)
  },
  Confirm(vm,confirmVal) {
    return (rule, value, callback) => {
      var errMsg = ''

      if (value !== vm.formData[confirmVal]) {
        errMsg = 'Confirm!'
      }
      showErr(callback, errMsg)
    };
  },
  subnetMask(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.subnetMask(value)) {
      errMsg = 'Invalid subnetMask'
    }
    showErr(callback, errMsg)
  },
  wpsPin(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.wpsPin(value)) {
      errMsg = 'Invalid wpsPin'
    }
    showErr(callback, errMsg)
  },
  IsBroadcastOrNetworkAddress(vm, Ip, Netmask) {
    return (rule, value, callback) => {
      var errMsg = '';
      if (!validatesFn.IsBroadcastOrNetworkAddress(vm.formData[Ip],vm.formData[Netmask])) {
        errMsg = 'Ip Addr Invalid!'
      }
      showErr(callback, errMsg)
    };
  },  
  IsAvailableIpPool(vm, homeIp, startIp, endIp) {
    return (rule, value, callback) => {
      var errMsg = '';
      if (!validatesFn.IsAvailableIpPool(vm.formData[homeIp],vm.formData[startIp],vm.formData[endIp])) {
        errMsg = 'false'
      }
      showErr(callback, errMsg)
    };
  },
  IsSameSubnetAddrs(vm, Ip1, Ip2, mask) {
    return (rule, value, callback) => {
      var errMsg = '';
      if (!validatesFn.IsSameSubnetAddrs(vm.formData[Ip1],vm.formData[Ip2],vm.formData[mask])) {
        errMsg = 'false'
      }
      showErr(callback, errMsg)
    };
  },
  isValidUrlAddress(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.isValidUrlAddress(value)) {
      errMsg = 'Invalid UrlAddress'
    }
    showErr(callback, errMsg)
  },
  macAddr(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.macAddr(value)) {
      errMsg = 'MAC Address is invalid.'
    }
    showErr(callback, errMsg)
  },
  isValidIpAddress(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.isValidIpAddress(value)) {
      errMsg = 'IP Address is invalid. Please input again!'
    }
    showErr(callback, errMsg)
  },
  portVal(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.portVal(value)) {
      errMsg = 'The value range of Port is 0-65535.'
    }
    showErr(callback, errMsg)
  },
  isSameSubnetAvailableIp(vm, Ip1, Ip2) {
    return (rule, value, callback) => {
      var errMsg = '';
      if (!validatesFn.isSameSubnetAvailableIp(vm.formData[Ip1],vm.formData[Ip2])) {
        errMsg = 'false'
      }
      showErr(callback, errMsg)
    };
  },
  pin(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.pin(value)) {
      errMsg = 'PIN code should be 4-8 digits.'
    }
    showErr(callback, errMsg)
  },
  puk(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.puk(value)) {
      errMsg = 'PUK code should be 8 digits.'
    }
    showErr(callback, errMsg)
  },
  informInterval(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.informInterval(value)) {
      errMsg = 'Inform interval should be 0-2678400,including "0123456789".'
    }
    showErr(callback, errMsg)
  },
  acsUrl(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.acsUrl(value)) {
      errMsg = 'Acs url format:eg:http://ip address:port/xxx'
    }
    showErr(callback, errMsg)
  },
  checkInvalidateDestNet(vm, deIp, deMask) {
    return (rule, value, callback) => {
      var errMsg = '';
      if (!validatesFn.checkInvalidateDestNet(vm.formData[deIp],vm.formData[deMask])) {
        errMsg = 'false'
      }
      showErr(callback, errMsg)
    };
  },
  isValidSubnetMask(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.isValidSubnetMask(value)) {
      errMsg = 'false'
    }
    showErr(callback, errMsg)
  },
  wepkey(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.wepKey(value)) {
      errMsg = 'Invalid'
    }
    showErr(callback, errMsg)
  },
  wpakey(rule, value, callback) {
    var errMsg = ''
    if (!validatesFn.wpaKey(value)) {
      errMsg = 'Invalid'
    }
    showErr(callback, errMsg)
  },
};

export default validates;
