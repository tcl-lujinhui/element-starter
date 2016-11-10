<template lang="jade">
  #app
    img(src="./assets/logo.png")
    el-menu.el-menu-demo(default-active="1" mode="horizontal")
      el-menu-item(index="1") 处理中心
      el-submenu(index="2")
        template(slot="title") 我的工作台
        el-menu-item(index="2-1") 选项1
        el-menu-item(index="2-2") 选项2
        el-menu-item(index="2-3") 选项3
      el-menu-item(index="3") settings
    .line
    el-breadcrumb(separator="/")
      el-breadcrumb-item index
      el-breadcrumb-item 活动页面
      el-breadcrumb-item 活动管理
    el-form(ref="form",:model="form" label-width="80px")
      el-form-item(label="活动名称")
        el-input
      el-form-item(label="活动名称")
        el-select(v-model="form.region" placeholder="请选择活动区域")
          el-option(label="区域一" value="shanghai")
          el-option(label="区域e" value="beijing")
      el-form-item(label="活动名称")
        el-input
      el-form-item(label="活动名称")
        el-input

    h1 dsfsdf
    el-button(@click.native="startHacking") let's do it80
    el-radio.radio(v-model="radio" label="1") 111111
    el-radio.radio(v-model="radio" label="2") 222222
    el-input(placeholder="请输入内容" v-model="input")
    h2 {{input}}
    el-button(type="primary" @click="open") msg
</template>

<script>
export default {
  data () {
    return {
      radio: '1',
      input: '',
      msg: 'Use Vue 2.0 Today!',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 1000
      })
    },
    open (){
      this.$message({
        message:"ok lfldsfjlk  kfdsjflkdf jlkj kdlsjfldks kfjdlsk sdfjkjlkdjsflkafj !",
        type: 'success'
      });
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
