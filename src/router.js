/**
 * Created by jinhui.lu on 16/11/09.
 */

//DiaUp
import mobileConnection from './views/DialUp/mobileConnection.vue';
import monthlyPlan from './views/DialUp/monthlyPlan.vue';
import networkSettings from './views/DialUp/networkSettings.vue';
import profileManagement from './views/DialUp/profileManagement.vue';
//WAN
import macClone from './views/WAN/macClone.vue';
import wanConfigure from './views/WAN/wanConfigure.vue';
import wanStatus from './views/WAN/wanStatus.vue';

//WLAN
import basic from './views/WLAN/basic.vue';
import advanced from './views/WLAN/advanced.vue';
import wps from './views/WLAN/wps.vue';

//Security
import filter from './views/Security/filter.vue';
import firewall from './views/Security/firewall.vue';
import pinManagement from './views/Security/pinManagement.vue';
import routingRules from './views/Security/routingRules.vue';
//LAN
import lanSettings from './views/LAN/lanSettings.vue';

//system
import changePassword from './views/System/changePassword.vue';

//NatSettings
import alg from './views/NatSettings/alg.vue';
import dmz from './views/NatSettings/dmz.vue';
import upnp from './views/NatSettings/upnp.vue';
import virtualServer from './views/NatSettings/virtualServer.vue';

//Statistics
import internetStatistics from './views/Statistics/internetStatistics.vue';
import lanStatistics from './views/Statistics/lanStatistics.vue';
import wlanStatistics from './views/Statistics/wlanStatistics.vue';

//Status
import internetStatus from './views/Status/internetStatus.vue';
import lanStatus from './views/Status/lanStatus.vue';
import wlanStatus from './views/Status/wlanStatus.vue';

//Share
import usb from './views/Share/usb.vue';
import storageShare from './views/Share/storageShare.vue';
import dlna from './views/Share/dlna.vue';
import userSettings from './views/Share/userSettings.vue';

const routers = [
  //other

  //Statistics
  { name: 'internetStatistics', path: '/internetStatistics', component: internetStatistics },
  { name: 'lanStatistics', path: '/lanStatistics', component: lanStatistics },
  { name: 'wlanStatistics', path: '/wlanStatistics', component: wlanStatistics },
  //Status
  { name: 'internetStatus', path: '/internetStatus', component: internetStatus },
  { name: 'lanStatus', path: '/lanStatus', component: lanStatus },
  { name: 'wlanStatus', path: '/wlanStatus', component: wlanStatus },
  //DiaUp
  { name: 'mobileConnection', path: '/mobileConnection', component: mobileConnection },
  { name: 'monthlyPlan', path: '/monthlyPlan', component: monthlyPlan },
  { name: 'networkSettings', path: '/networkSettings', component: networkSettings },
  { name: 'profileManagement', path: '/profileManagement', component: profileManagement },

  //WLAN
  { name: 'basic', path: '/basic', component: basic },
  { name: 'advanced', path: '/advanced', component: advanced },
  { name: 'wps', path: '/wps', component: wps },


  //WAN
  { name: 'macClone', path: '/macClone', component: macClone },
  { name: 'wanConfigure', path: '/wanConfigure', component: wanConfigure },
  { name: 'wanStatus', path: '/wanStatus', component: wanStatus },


  //Security
  { name: 'filter', path: '/filter', component: filter },
  { name: 'firewall', path: '/firewall', component: firewall },
  { name: 'pinManagement', path: '/pinManagement', component: pinManagement },
  { name: 'routingRules', path: '/routingRules', component: routingRules },

  //lan
  { name: 'lanSettings', path: '/lanSettings', component: lanSettings },

  //system
  { name: 'changePassword', path: '/changePassword', component: changePassword },

  //NatSettings
  { name: 'alg', path: '/alg', component: alg },
  { name: 'upnp', path: '/upnp', component: upnp },
  { name: 'dmz', path: '/dmz', component: dmz },
  { name: 'virtualServer', path: '/virtualServer', component: virtualServer },

  //Share
  { name: 'usb', path: '/usb', component: usb },
  { name: 'storageShare', path: '/storageShare', component: storageShare },
  { name: 'dlna', path: '/dlna', component: dlna },
  { name: 'userSettings', path: '/userSettings', component: userSettings }
];

export default routers;
