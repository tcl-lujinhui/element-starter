<template lang="jade">
  include ./../jade/components.jade
  +form("form")
    +input("username:")
    +select("sad:")
      +option("区域a","shanghai")
      +option("区域e","beijing")
    +input("username:")
    +input("username:")
    +radios("活动名称888")
      +radio("活动111111","1")(v-model="radio")
      +radio("活动222222","2")(v-model="radio")
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
