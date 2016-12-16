<template lang="jade">
#sideMenu
  el-menu(router=true,unique-opened=true, :default-active="$route.name")
    div(v-for="(val,index) in Config[submenu]")
      el-submenu(:index="index.toString()" v-if="val.hasOwnProperty('submenu')")
        template(slot="title") {{val.text}}
        el-menu-item(:index="item.router" v-for="item in val.submenu") {{item.text}}
      el-menu-item(:index="val.router" v-if="!val.hasOwnProperty('submenu')") {{val.text}}
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