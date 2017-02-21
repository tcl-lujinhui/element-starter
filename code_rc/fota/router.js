import home from './views/fota.vue';
import fota from './views/fota.vue';
import device from './views/device.vue';
import login from './views/login.vue';
import user from './views/user.vue';

let routers = [
  //other
  { name: 'home', path: '/', component: home },
  { name: 'fota', path: '/fota', component: fota },
  { name: 'device', path: '/device', component: device },
  { name: 'login', path: '/login', component: login },
  { name: 'user', path: '/user', component: user },
];

export default routers;
