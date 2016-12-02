<template lang="jade">
  include ./../jade/components.jade
  +form("form")
    +input("username:")
    +select("sad:")
      +option("区域a","shanghai")
      +option("区域e","beijing")
    +input("username:")
    +input("username:")
    +input("password:")(type="password" v-model="input")
    +radios("活动名称888")
      +radio("活动111111","1")(v-model="radio")
      +radio("活动222222","2")(v-model="radio")
    +formItem("fdsaf")
      el-radio-group(v-model="radio3")
        el-radio-button(label="上海") dsf
        el-radio-button(label="Beijing") dsfd
    +formItem("fdsaf")
      el-switch(v-model="value1" on-text="" off-text="")
    +formItem("fdsaf")
      el-checkbox(v-model="checked" true-label="1" false-label="2")
    div {{radio3}} {{input}}
    +formItem("")
      +button("msg88")(@click="open")
      +button("let's do it80")(type="primary" @click.native="startHacking")
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to8888',
      radio: '1',
      radio3:"Beijing",
      checked: "2",
      value1:true,
      checkboxChecked:false,
      input: '',
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
