<template lang="jade">
#sideMenu
  el-menu(router=true,unique-opened=true, :default-active="$route.name")
    div(v-for="(val,index) in Config[submenu]")
      el-submenu(:index="index.toString()" v-if="val.hasOwnProperty('submenu')")
        template(slot="title") 
          b(v-if="!!val.icon",:class="'icon-style iconfont icon-'+val.icon")
          span(:title="val.text |res") {{val.text |res}}
        el-menu-item(:title="item.text |res",:index="item.router" v-for="item in val.submenu") {{item.text |res}}
      el-menu-item(:index="val.router" v-if="!val.hasOwnProperty('submenu')" class="no-submenu") 
        i(v-if="!!val.icon",:class="'icon-style iconfont icon-'+val.icon")
        span(:title="val.text |res") {{val.text |res }}
</template>
  

<script>
import _Config from './config.js'
var Config = _Config.sideMenu
export default {
  data(){
    return {
      Config:Config
    }
  },
  created () {
  },
  props: ['submenu'],
  methods: {
  }
}
</script>

<style lang="sass" scoped>
</style>