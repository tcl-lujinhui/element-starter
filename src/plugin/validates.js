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
  Confirm(vm,confirmVal) {
    return (rule, value, callback) => {
      var errMsg = ''

      if (value !== vm.formData[confirmVal]) {
        errMsg = 'Confirm!'
      }
      showErr(callback, errMsg)
    };
  }
};

export default validates;
