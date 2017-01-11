<template lang="jade">
  include ../components.jade
  #onlineUpgrade
    +sideMenuPage('System')
      +breadcrumb("Online")
      sim-state
        +form("formData")
          div(v-show="page.actionTypeCheck==1")
            p.tips Online upgrade: 
              span {{page.Version}} up to date
            +formItem("")
              +button("Check for upgrade")(type="primary" @click="startCheckUpdate")
          div(v-show="page.actionTypeChecking==1")
            p.tips
              span(v-loading.body="page.loading") 
              span Checking...
            +formItem("")
              +button("Check for upgrade")(disabled type="primary" @click="")
          el-dialog(title="Online upgrade" v-model="page.newVersionType",size="tiny")
            p.tips Find a new version:
              span{{page.Version}} available. Size:{{page.total_size | byTes}}.
            +formItem("")
              +button("Upgrade")(type="primary" @click="setFOTAStartDownload")
              +button("Cancel")(type="primary" @click="reset")
          el-dialog(v-model="page.actionTypeDownloading",size="tiny")
            el-progress(:text-inside="true",:stroke-width="24",:percentage="page.fotaProcess")
            p.tips Downloading…
            +formItem("")
              +button("Cancel")(type="primary" @click="stopDownloadFOTA")
          el-dialog(v-model="page.actionTypeDownloaded",size="tiny")
            p.tips The file has been downloaded,are you sure you want to update?
            +formItem("")
              +button("OK")(type="primary" @click="startUpdateFOTA")
          el-dialog(title="Upgrading..." v-model="page.actionTypeUpgrading",size="tiny")
            p.tips Please don't power off during upgrading.The device will be restarted after an upgrade.
          el-dialog(v-model="page.newVersionTypeNo",size="tiny")
            p.tips Software Version:It's already the latest version.
            +formItem("")
              +button("Finish")(type="primary" @click="reset")
          p.tips Note:<br/>During the upgrade, esp. when all indicators except Power on the device blink, DO NOT power off the device, otherwise, it may be severely damaged.        
</template>
<script>
import {$,vuex,G,_,_config} from '../../common.js';
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex
        vuex.initSimInfo()
        this.page = {
          fotaStatus: "",
          fotaProcess: 0,
          actionTypeCheck: 1,
          actionTypeChecking: 0,
          connectionState: 0,
          deviceNewVersionState: "",
          Version:"",
          total_size:"",
          actionTypeUpgrading: false,
          actionTypeDownloading: false,
          actionTypeDownloaded: false,
          newVersionType: false,
          newVersionTypeNo: false,
          loading:false
        }
        this.sdk.get("GetConnectionState", null, (res) => {
          this.page.connectionState = res.ConnectionStatus;
        });
        this.sdk.get("GetDeviceNewVersion", null, (res) => {
          this.page.Version=res.Version;
        });
      },
      GetDeviceNewVersions() {
        let vm = this;
        this.sdk.get("GetDeviceNewVersion", null, (res) => {
          vm.page.deviceNewVersionState = res.State;
          vm.page.Version=res.Version;
          vm.page.total_size=res.total_size;
          switch (vm.page.deviceNewVersionState) {

            case G.VERSION_CHECKING:
              vm.page.actionTypeChecking = 1;
              vm.page.loading=true;
              vm.page.actionTypeCheck = 0;
              vm.page.actionTypeDownloading = false;
              vm.page.actionTypeDownloaded = false;
              vm.page.newVersionTypeNo = false;
              vm.page.newVersionType = false;
              setTimeout(function() {
                vm.GetDeviceNewVersions();
              }, 2000)
              break;
            case G.VERSION_NEW_YES:
              vm.page.actionTypeChecking = 0;
              vm.page.loading=false;
              vm.page.actionTypeCheck = 1;
              vm.page.actionTypeDownloading = false;
              vm.page.actionTypeDownloaded = false;
              vm.page.newVersionTypeNo = false;
              vm.page.newVersionType = true;
              break;
            case G.VERSION_NEW_NO:
              vm.page.actionTypeChecking = 0;
              vm.page.loading=false;
              vm.page.actionTypeCheck = 0;
              vm.page.actionTypeDownloading = false;
              vm.page.actionTypeDownloaded = false;
              vm.page.newVersionTypeNo = true;
              vm.page.newVersionType = false;
              break;
            case G.VERSION_NO_CONNECT:
              vm.page.actionTypeChecking = 0;
              vm.page.loading=false;
              vm.page.actionTypeCheck = 0;
              vm.page.actionTypeDownloading = false;
              vm.page.actionTypeDownloaded = false;
              vm.page.newVersionTypeNo = false;
              vm.page.newVersionType = false;
              this.$alert('Unable to connect to the internet, please try again later.', {
                confirmButtonText: 'OK',
                callback: action => {
                  vm.reset();
                }
              });
              break;
            case G.VERSION_NO_SERVICE:
              vm.page.actionTypeChecking = 0;
              vm.page.loading=false;
              vm.page.actionTypeCheck = 0;
              vm.page.actionTypeDownloading = false;
              vm.page.actionTypeDownloaded = false;
              vm.page.newVersionTypeNo = false;
              vm.page.newVersionType = false;
              this.$alert('Service is not available, please try again later.', {
                confirmButtonText: 'OK',
                callback: action => {
                  this.reset();
                }
              });
              break;
            default:
              vm.page.actionTypeChecking = 0;
              vm.page.loading=false;
              vm.page.actionTypeCheck = 0;
              vm.page.actionTypeDownloading = false;
              vm.page.actionTypeDownloaded = false;
              vm.page.newVersionTypeNo = false;
              vm.page.newVersionType = false;
              this.$alert('Error!', {
                confirmButtonText: 'OK',
                callback: action => {
                  this.reset();
                }
              });
          }
        })
      },
      showFOTADownloadProcess() {
        this.startCheckUpdate();
      },
      startCheckUpdate() {
        let vm = this
        this.sdk.get("GetDeviceUpgradeState", null, (res) => {
          vm.formData = res;
          vm.page.fotaStatus = vm.formData.Status;
          if (vm.page.fotaStatus == G.FOTA_DOWNLOAD_STATE_COMPLETED) {
            vm.page.actionTypeDownloaded = true;
            vm.page.actionTypeChecking = 0;
            vm.page.loading=false;
            vm.page.actionTypeCheck = 1;
            vm.page.actionTypeDownloading = false;
            vm.page.newVersionTypeNo = false;
            vm.page.newVersionType = false;
          }
          if (vm.page.fotaStatus == G.FOTA_DOWNLOAD_STATE_DOWNLOADING) {
            vm.page.actionTypeDownloading = true;
            vm.page.loading=false;
            vm.page.actionTypeChecking = 0;
            vm.page.actionTypeCheck = 1;
            vm.page.actionTypeDownloaded = false;
            vm.page.newVersionTypeNo = false;
            vm.page.newVersionType = false;
            vm.page.fotaProcess = vm.formData.Process;
            setTimeout(function() {
              vm.showFOTADownloadProcess();
            }, 2000)

          }
          if (vm.page.fotaStatus == G.FOTA_DOWNLOAD_STATE_FREE) {
            if (vm.page.connectionState == G.WAN_STATE_CONNECTED) {
              this.sdk.post("SetCheckNewVersion", null, {
                success: {
                  tips: "None",
                  callback: vm.GetDeviceNewVersions
                },
                fail: {
                  tips: "None",
                  callback() {
                    vm.$alert('Error!', {
                      confirmButtonText: 'OK',
                      callback: action => {
                        vm.reset();
                      }
                    });
                  }
                }
              })
            } else {
              this.$alert('Unable to connect to the internet, please try again later.', {
                confirmButtonText: 'OK',
                callback: action => {
                  this.reset();
                }
              });
            }
          }
        })
      },
      setFOTAStartDownload() {
        let vm = this;
        this.sdk.post("SetFOTAStartDownload", null, {
          success: {
            tips: "None",
            callback() {
              vm.page.actionTypeDownloading = true;
              vm.page.loading=false;
              vm.page.actionTypeChecking = 0;
              vm.page.actionTypeCheck = 1;
              vm.page.newVersionTypeNo = false;
              vm.page.newVersionType = false;
              vm.startCheckUpdate()
            }
          },
          fail: {
            tips: "None",
            callback() {
              vm.$alert('Error!', {
                confirmButtonText: 'OK',
                callback: action => {
                  vm.reset();
                }
              });
            }
          }
        })
      },
      startUpdateFOTA() {
        let vm = this;
        this.sdk.post("SetDeviceStartUpdate", null, {
          success: {
            tips: "None",
            callback() {
              vm.page.actionTypeUpgrading = true;
              vm.page.loading=false;
              vm.page.actionTypeChecking = 0;
              vm.page.actionTypeCheck = 1;
              vm.page.actionTypeDownloaded = false;
              vm.page.newVersionTypeNo = false;
              vm.page.newVersionType = false;
              setTimeout(function() {
                window.location.reload();
              }, 120000)
            }
          },
          fail: {
            tips: "None",
            callback() {
              vm.$alert('Error!', {
                confirmButtonText: 'OK',
                callback: action => {
                  vm.reset();
                }
              });
            }
          }
        })
      },
      stopDownloadFOTA() {
        let vm = this;
        this.sdk.post("SetDeviceUpdateStop", null, {
          success: {
            tips: "None",
            callback() {
              vm.startCheckUpdate()
            }
          },
          fail: {
            tips: "None",
            callback() {
              vm.$alert('Error!', {
                confirmButtonText: 'OK',
                callback: action => {
                  vm.reset();
                }
              });
            }
          }
        })
      }
    }
}
</script>

<style lang="sass" scoped>
.tips{
    font-size: 14px;
    margin-top: 60px;
    color: #5e6d82;
  }
  span.tex{
    float: right;
  }
</style>