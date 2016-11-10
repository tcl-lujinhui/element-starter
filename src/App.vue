<template lang="jade">
  include ./jade/components.jade
  #app
    img(src="./images/logo.png")
    el-menu.el-menu-demo(default-active="index" mode="horizontal" router=true)
      el-menu-item(index="index") 处理中心
      el-submenu(index="2")
        template(slot="title") 我的工作台
        el-menu-item(index="bar") Bar
        el-menu-item(index="2-2") 选项2
      el-menu-item(index="foo") foo
    el-breadcrumb(separator="/")
      el-breadcrumb-item index
      el-breadcrumb-item 活动页面
      el-breadcrumb-item 活动管理
    //-+button("fds")(@click.native="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading")
    //-el-steps(:active="1" finish-status="success")
      el-step(title="已完成" description="这是一段很长很长很长的描述性文字")
      el-step(title="进行中" description="这是一段很长很长很长的描述性文字")
      el-step(title="步骤 3" description="这是一段很长很长很长的描述性文字")
    router-view
</template>

<script>
export default {
  data () {
    return {
      radio: '1',
      input: '',
      msg: 'Use Vue 2.0 Today!',
      fullscreenLoading: false
    }
  },

  methods: {
    openFullScreen() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 3000);
    }
  }
}
</script>

<style lang="sass">
@import "./styles/common.scss";
body {
  font-family: Helvetica, sans-serif;
}
</style>
