import code_log from './views/code_log.vue';
import fota from './views/fota.vue';
import device from './views/device.vue';
import login from './views/login.vue';
import user from './views/user.vue';

let routers = [
  //other
  { name: 'code_log', path: '/', component: code_log },
  { name: 'fota', path: '/fota', component: fota },
  { name: 'device', path: '/device', component: device },
  { name: 'login', path: '/login', component: login },
  { name: 'user', path: '/user', component: user },
];

export default routers;
