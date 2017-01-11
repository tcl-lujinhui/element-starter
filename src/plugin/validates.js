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
  }
};

export default validates;
