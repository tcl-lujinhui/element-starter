/**
 * Created by jinhui.lu on 16/11/09.
 */
import Index from './views/Index.vue';

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


const routers = [
  //other
  { name: 'index', path: '/index', component: Index },


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

];

export default routers;
