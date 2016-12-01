/**
 * Created by jinhui.lu on 16/11/09.
 */
import Index from './views/Index.vue';
import Settings from './views/Settings.vue';
import changePassword from './views/system/changePassword.vue';
import systemSettings from './views/system/systemSettings.vue';
import mobileConnection from './views/DialUp/mobileConnection.vue';

//system
import deviceInfo from './views/System/deviceInfo.vue';
import reboot from './views/System/reboot.vue';
import reset from './views/System/reset.vue';
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };


const routers = [
  { name: 'index', path: '/index', component: Index },
  { name: 'changePassword', path: '/changePassword', component: changePassword },
  { name: 'systemSettings', path: '/systemSettings', component: systemSettings },
  { name: 'mobileConnection', path: '/mobileConnection', component: mobileConnection },
  { name: 'foo', path: '/foo', component: Settings },
  { name: 'bar', path: '/bar', component: Bar },
  { name: 'deviceInfo', path: '/deviceInfo', component: deviceInfo },
  { name: 'reboot', path: '/reboot', component: reboot },
  { name: 'reset', path: '/reset', component: reset },
];

export default routers;
