import config from './config_project.js';
config.homeWlanStatus.ssidBroadcastArr = [
  [0, 'ids_enabled'],
  [1, 'ids_disabled']
];
config.samba.pageItem.Anonymous = false;
config.ftp.pageItem.Anonymous = false;
config.smsSettings.pageItem.StoreFlag =false;
export default config;
