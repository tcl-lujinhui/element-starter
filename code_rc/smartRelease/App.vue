<template lang="jade">
  include ./views/components.jade
  #app
    el-menu.main-menu.el-menu-demo(mode="horizontal" router=true theme="dark")
      el-menu-item(index="") 
        a.el-menu-span(href="http://baidu.com") logout
    router-view.main
</template>

<script>
export default {
  methods: {
    logout(){
      alert("sdfsdfsdf")
    }
  }
}
</script>


<style lang="sass">
@import "./styles/common.scss";
</style>
