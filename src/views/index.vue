<template lang="jade">
  include ./components.jade
  #index
    +form("formData")
      el-row(:gutter="0")
        el-col(:span="12")
          div.title {{vuex.res.ids_managerAPP}}
          el-row(:gutter="0")
            el-col(:span="11") 
              img(src="../images/android.png" width="130" height="130")
              div.imgTextAlign
                img(src="../images/AndroidApp.png" width="60" height="30")
            el-col(:span="11") 
              img(src="../images/app.png"  width="130" height="130")
              div.imgTextAlign
                img(src="../images/appleApp.png" width="30" height="30")
        el-col.cutLine(:span="12")
          login
</template>

<script>
import {$,_config,vuex} from '../common.js'
import login from './login.vue'
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex;
      },
      update() {
      }
    },
    components: {
      login
    }
}
</script>

<style lang="sass" scoped>
@import "../styles/color.scss";
#index {
  padding: 30px 0;
  .title {
    padding: 0 0 46px 0;
  }
  .imgTextAlign {
    text-align: center;
    padding: 21px 75px 0 0;
  }
  .cutLine {
    border-left: 1px solid $color_main_level_1;
    min-height: 379px;
  }
}

.el-form {
  width: 895px;
}
</style>
