<template lang="jade">
  include ../components.jade
  #changePassword
    +sideMenuPage('System')
      +breadcrumb("Password Change")
      +form("formData")
        +input("User Name:","UserName")(disabled)
        +input("Current Password:","CurrPassword")(type="password")
        +input("New Password:","NewPassword")(type="password")
        +input("Confirm Password:","ConfirmPassword")(type="password")
        +formBtn()

</template>
<script>
import _config from '../../config.js';
let Config = _config.changePassword;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
      },
      update() {
        let vm = this
        this.submit("formData", () => {
          let results = {
            callback: this.init,
            success: "Succeeded!",
            fail: "Failed!",
            e2: {
              tips: "None",
              callback() {
                vm.$alert('Current Password is wrong.', 'Error', {
                  confirmButtonText: 'OK',
                  callback: action => {
                    this.init;
                  }
                });
              }
            }
          };
          this.sdk.post("ChangePassword", this.formData, results);
        })
      }
    }
}
</script>
<style lang="sass" scoped>
</style>