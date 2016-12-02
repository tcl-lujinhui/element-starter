/**
 * Created by jinhui.lu on 16/11/09.
 */
import Index from './views/Index.vue';
import Settings from './views/Settings.vue';

//DiaUp
import mobileConnection from './views/DialUp/mobileConnection.vue';
import monthlyPlan from './views/DialUp/monthlyPlan.vue';
import networkSettings from './views/DialUp/networkSettings.vue';
import profileManagement from './views/DialUp/profileManagement.vue';

//LAN
import lan from './views/LAN/lanSettings.vue';

//NatSettings
import alg from './views/NatSettings/alg.vue';
import dmz from './views/NatSettings/dmz.vue';
import upnp from './views/NatSettings/upnp.vue';
import virtualServer from './views/NatSettings/virtualServer.vue';

//Security
import filter from './views/Security/filter.vue';
import firewall from './views/Security/firewall.vue';
import pinManagement from './views/Security/pinManagement.vue';
import routingRules from './views/Security/routingRules.vue';

//Share
import dlna from './views/Share/dlna.vue';
import storageShare from './views/Share/storageShare.vue';
import usb from './views/Share/usb.vue';
import userSettings from './views/Share/userSettings.vue';

//SMS
import inbox from './views/SMS/inbox.vue';
import outbox from './views/SMS/outbox.vue';
import draft from './views/SMS/draft.vue';
import newSNS from './views/SMS/newSMS.vue';
import smsSettings from './views/SMS/smsSettings.vue';

//WAN
import macClone from './views/WAN/macClone.vue';
import wanConfigure from './views/WAN/wanConfigure.vue';
import wanStatus from './views/WAN/wanStatus.vue';

//WLAN
import basic from './views/WLAN/basic.vue';
import advanced from './views/WLAN/advanced.vue';
import wps from './views/WLAN/wps.vue';

//system
import deviceInfo from './views/System/deviceInfo.vue';
import reboot from './views/System/reboot.vue';
import reset from './views/System/reset.vue';
import backup from './views/System/backup.vue';
import changePassword from './views/System/changePassword.vue';
import localUpgrade from './views/System/localUpgrade.vue';
import onlineUpgrade from './views/System/onlineUpgrade.vue';
import systemSettings from './views/system/systemSettings.vue';
import tr069 from './views/System/tr069.vue';

//other
import callLogs from './views/callLogs.vue';
import login from './views/login.vue';
import qos from './views/qos.vue';
import setupWizard from './views/setupWizard.vue';


const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };


const routers = [
  //other
  { name: 'index', path: '/index', component: Index },
  { name: 'callLogs', path: '/callLogs', component: callLogs },
  { name: 'login', path: '/login', component: login },
  { name: 'qos', path: '/qos', component: qos },
  { name: 'setupWizard', path: '/setupWizard', component: setupWizard },

  //DiaUp
  { name: 'mobileConnection', path: '/mobileConnection', component: mobileConnection },
  { name: 'monthlyPlan', path: '/monthlyPlan', component: monthlyPlan },
  { name: 'networkSettings', path: '/networkSettings', component: networkSettings },
  { name: 'profileManagement', path: '/profileManagement', component: profileManagement },

  //WLAN
  { name: 'basic', path: '/basic', component: basic },
  { name: 'advanced', path: '/advanced', component: advanced },
  { name: 'wps', path: '/wps', component: wps },

  //SMS
  { name: 'inbox', path: '/inbox', component: inbox },
  { name: 'outbox', path: '/outbox', component: outbox },
  { name: 'draft', path: '/draft', component: draft },
  { name: 'newSNS', path: '/newSNS', component: newSNS },
  { name: 'smsSettings', path: '/smsSettings', component: smsSettings },

  //WAN
  { name: 'macClone', path: '/macClone', component: macClone },
  { name: 'wanConfigure', path: '/wanConfigure', component: wanConfigure },
  { name: 'wanStatus', path: '/wanStatus', component: wanStatus },

  //NatSettings
  { name: 'alg', path: '/alg', component: alg },
  { name: 'dmz', path: '/dmz', component: dmz },
  { name: 'upnp', path: '/upnp', component: upnp },
  { name: 'virtualServer', path: '/virtualServer', component: virtualServer },

  //Security
  { name: 'filter', path: '/filter', component: filter },
  { name: 'firewall', path: '/firewall', component: firewall },
  { name: 'pinManagement', path: '/pinManagement', component: pinManagement },
  { name: 'routingRules', path: '/routingRules', component: routingRules },

  //Share
  { name: 'dlna', path: '/dlna', component: dlna },
  { name: 'storageShare', path: '/storageShare', component: storageShare },
  { name: 'usb', path: '/usb', component: usb },
  { name: 'userSettings', path: '/userSettings', component: userSettings },

   //lan
  { name: 'lan', path: '/lan', component: lan },

  //system
  { name: 'deviceInfo', path: '/deviceInfo', component: deviceInfo },
  { name: 'reboot', path: '/reboot', component: reboot },
  { name: 'reset', path: '/reset', component: reset },
  { name: 'backup', path: '/backup', component: backup },
  { name: 'changePassword', path: '/changePassword', component: changePassword },
  { name: 'localUpgrade', path: '/localUpgrade', component: localUpgrade },
  { name: 'onlineUpgrade', path: '/onlineUpgrade', component: onlineUpgrade },
  { name: 'systemSettings', path: '/systemSettings', component: systemSettings },
  { name: 'tr069', path: '/tr069', component: tr069 },
];

export default routers;
