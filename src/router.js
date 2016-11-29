/**
 * Created by jinhui.lu on 16/11/09.
 */
import Index from './views/Index.vue';
import Settings from './views/Settings.vue';
import changePassword from './views/system/changePassword.vue';
import systemSettings from './views/system/systemSettings.vue';
import mobileConnection from './views/DialUp/mobileConnection.vue';
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };


const routers = [
  { path: '/index', component: Index },
  { path: '/changePassword', component: changePassword },
  { path: '/systemSettings', component: systemSettings },
  { path: '/mobileConnection', component: mobileConnection },
  { path: '/foo', component: Settings },
  { path: '/bar', component: Bar }
];

export default routers;
