<template lang="jade">
  include ../components.jade
  #storageShare
    +sideMenuPage('Services')
      +breadcrumb("Storage Share")
      samba
      ftp
</template>

<script>
import samba from './samba.vue'
import ftp from './ftp.vue'
export default {
    components: {
      samba,
      ftp
    }
}
</script>
<style lang="sass" scoped>
</style>
