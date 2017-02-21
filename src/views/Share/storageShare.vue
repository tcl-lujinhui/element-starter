<template lang="jade">
  include ../components.jade
  #storageShare
    +sideMenuPage('Services')
      +breadcrumb("ids_storageShare")
      samba
      ftp
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
import samba from './samba.vue'
import ftp from './ftp.vue'
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
      samba,
      ftp
    }
}
</script>

<style lang="sass" scoped>
</style>
