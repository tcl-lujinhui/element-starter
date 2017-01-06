import _ from 'underscore';
import G from '../config/G.js'
let units = {}

units.networkType = (type) => {
  let networkTypeMap = [
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
  ];

  let currentType = _.find(networkTypeMap, (num) => {
    return num[0] == type;
  })
  if (!currentType) {
    return networkTypeMap[0][2];
  } else {
    return currentType[2];
  }
}
units.covertNum = (number) => {
  return number >= (1024 * 1024 * 1024) ? (number / (1024 * 1024 * 1024)).toFixed(2) + " " + 'GB' : (number >= (1024 * 1024) ? (number / (1024 * 1024)).toFixed(2) + " " + 'MB' : (number / 1024).toFixed(2) + " " + 'KB');
}

units.getTimePassed = (time) => {
  var day = Math.floor(time / (3600 * 24));
  var hours = Math.floor((time - day * 3600 * 24) / 3600);
  var minutes = Math.floor((time - day * 3600 * 24 - hours * 3600) / 60);

  return day + " " + "day" + " " + hours + " " + "hours" + " " + minutes + " " + "minutes";
}
export default units;
