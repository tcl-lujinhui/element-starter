import _ from 'underscore';
import G from '../config/G.js';
import {units,vuex,sys} from '../common'

const filters = {
  networkType(value) {
    if (vuex.res[units.networkType(value)]) {
      return vuex.res[units.networkType(value)];
    } else {
      return units.networkType(value);
    }
  },
  covertNum(value) {
    return units.covertNum(value);
  },
  UsedTimes(value) {
    return units.getTimePassed(value);
  },
  qosService(value) {
    return units.qosService(value);
  },
  qosPriority(value) {
    return units.qosPriority(value);
  },
  qosProtocol(value) {
    return units.qosProtocol(value);
  },

  networkRat(value) {
    if (vuex.res[units.networkRat(value)]) {
      return vuex.res[units.networkRat(value)];
    } else {
      return units.networkRat(value);
    }
  },
  networkState(value) {
    if (vuex.res[units.networkState(value)]) {
      return vuex.res[units.networkState(value)];
    } else {
      return units.networkState(value);
    }
  },
  res(value) {
    if (vuex.res[value]) {
      return vuex.res[value];
    } else {
      return value;
    }
  },
  ipProtocol(value) {
    return units.IPprotocol(value);
  },
  byTes(value) {
    return units.bytes(value);
  },
  times(second, type) {
    return units.times(second, type);
  },
  replace(strings, key, replaceKey) {
    return strings.replace(key, replaceKey);
  },
  lanProtState(value) {
    return value == 1 ? vuex.res["ids_connected"] : vuex.res["ids_disconnected"];
  },
  usbStateText(value) {
    return vuex.res[units.usbStateText(value)]
  },
  netConnState(value) {
    return vuex.res[units.netConnState(value)]
  },
  currentLang(value) {
    return sys.allLanguage[value]
  }
}
export default filters
