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
    //console.log(currentType)
  if (!currentType) {
    return networkTypeMap[0][2]
  } else {
    return currentType[2]
  }
}
units.covertNum = (number) => {
  return number >= (1024 * 1024 * 1024) ? (number / (1024 * 1024 * 1024)).toFixed(2) + " " + 'GB' : (number >= (1024 * 1024) ? (number / (1024 * 1024)).toFixed(2) + " " + 'MB' : (number / 1024).toFixed(2) + " " + 'KB');
}

units.qosService = (val) => {
  let qosServiceArr = [
    [0, "All"],
    [1, "ICQ"],
    [2, "BitTorrent"],
    [3, "eMule"],
    [4, "FastTrack"],
    [5, "FTP"],
    [6, "Gnutella"],
    [7, "HTTP"],
    [8, "Ident"],
    [9, "IRC"],
    [10, "Jabber"],
    [11, "MSN"],
    [12, "NTP"],
    [13, "POP3"],
    [14, "SMTP"],
    [15, "SSL"],
    [16, "VNC"]
  ];
  let currentService = _.find(qosServiceArr, (num) => {
    return num[0] == val;
  })
  if (!currentService) {
    return qosServiceArr[0][1]
  } else {
    return currentService[1]
  }
}

units.qosPriority = (val) => {
  let qosPriorityArr = [
    [0, "Express"],
    [1, "High"],
    [2, "Normal"],
    [3, "Low"]  
  ];
  let currentPriority = _.find(qosPriorityArr, (num) => {
    return num[0] == val;
  })
  if (!currentPriority) {
    return qosPriorityArr[0][1]
  } else {
    return currentPriority[1]
  }
}

units.qosProtocol = (val) => {
  let qosProtocolArr = [
    [0, "ALL"],
    [1, "TCP"],
    [2, "UDP"],
    [3, "ICMP"]   
  ];
  let currentProtocol = _.find(qosProtocolArr, (num) => {
    return num[0] == val;
  })
  if (!currentProtocol) {
    return qosProtocolArr[0][1]
  } else {
    return currentProtocol[1]
  }
}

units.getTimePassed = (time) => {
  var day = Math.floor(time / (3600 * 24));
  var hours = Math.floor((time - day * 3600 * 24) / 3600);
  var minutes = Math.floor((time - day * 3600 * 24 - hours * 3600) / 60);

  return day + " " + "day" + " " + hours + " " + "hours" + " " + minutes + " " + "minutes";
}
units.IPprotocol = (ipProtocolVal) => {
  let IPprotocol
  switch (ipProtocolVal) {
    case 6:
      IPprotocol = "TCP"
      break;
    case 17:
      IPprotocol = "UDP"
      break;
    case 253:
      IPprotocol = "TCP/UDP"
      break;
    default:
      IPprotocol = "TCP"
      break;
  }
  return IPprotocol
}
units.bytes = (bytes) => {
  if (bytes === 0) return '0';
    var k = 1024;
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
units.times = (second, type) => {  
  var formatStr;
  var hours = parseInt(second / 60 / 60);
  var min = parseInt(second / 60 % 60);
  var sec = second % 60;

  switch (type) {
    case "1": //format:HH:mm:ss or mm:ss 
      if (hours > 0) {
        formatStr = [hours, min, sec].join(":").replace(/\b(\d)\b/g, "0$1");
      } else {
        formatStr = [min, sec].join(":").replace(/\b(\d)\b/g, "0$1");
      }
      break;
    case "2": //format:HH:mm:ss 
      formatStr = [hours, min, sec].join(":").replace(/\b(\d)\b/g, "0$1");
      break;
  }
  return formatStr;
}

export default units;
