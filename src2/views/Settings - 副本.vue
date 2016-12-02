<template lang="jade">
  include ./../jade/components.jade
  #settings
    el-tabs(type="card")
      el-tab-pane(label="Wlan")
    //-el-tabs(type="card" @tab-click="open")
      el-tab-pane(label="用户管理" to="index")
      el-tab-pane(label="用户管理" to="changePassword")
      el-tab-pane(label="用户管理" to="systemSettings")
    +form("formData")(:rules="rules" ref="formData")
      el-form-item(label="yuming" prop="Ssid")
        el-input(v-model="formData.Ssid")
      //-+formItem("SSID:")(prop="Ssid",:rules="{type: 'string', required: true,fields:{value:{required: true, message: '域名不能为空', trigger: 'blur'}}}")
        el-input(v-model="formData.Ssid")
      +select("WMode:")(v-model.mumber="formData.WMode")
        el-option(label="802.11b", :value.number="1")
        el-option(label="802.11b/g", :value.number="2")
        el-option(label="802.11b/g/n", :value.number="3")
      +select("SecurityMode:")(v-model.mumber="formData.SecurityMode")
        el-option(label="Disable", :value.number="0")
        el-option(label="WEP", :value.number="1")
        el-option(label="WPA PSK", :value.number="2")
        el-option(label="WPA2 PSK", :value.number="3")
        el-option(label="WPA/WPA2 PSK", :value.number="4")
      div(v-if='formData.SecurityMode==1')
        +radios("Cipher Type:")
          el-radio(v-model="formData.WepType",:label.number="1") Sharedsfdf
          el-radio(v-model="formData.WepType",:label.number="0") Open
        +input("WepKey:")(v-model="formData.WepKey",:type="showPassword?'text':'password'")
      div(v-if='formData.SecurityMode==2||formData.SecurityMode==3||formData.SecurityMode==4')
        +radios("Cipher Type:")
          el-radio(v-model="formData.WpaType",:label.number="0") TKIP
          el-radio(v-model="formData.WpaType",:label.number="1") AES
          el-radio(v-model="formData.WpaType",:label.number="2") Auto
        +input("WpaKey:")(v-model="formData.WpaKey",:type="showPassword?'text':'password'")
      +formItem("")(v-if='formData.SecurityMode!=0')
        el-checkbox(v-model="showPassword") show password
      +select("Channel:")(v-model="formData.Channel")
        el-option(label="Auto",:value.number="0")
        el-option(v-for="v in 13",:label="v",:value.number="v")
      +select("max_numsta:")(v-model="formData.max_numsta")
        el-option(v-for="v in 15",:label="v",:value.number="v")
      +formItem("SSID broadcast:")
        el-switch(v-model="formData.SsidHidden" on-text="" off-text="")
      +radios("ApStatus:")
        el-radio(v-model="formData.ApStatus",:label.number="1") ON
        el-radio(v-model="formData.ApStatus",:label.number="0") OFF
      +formItem("max_numsta")
        el-input-number(v-model="formData.max_numsta",:min="1",:max="15")
      +formItem("")
        +button("Cancel")(@click="handleReset")
        +button("Apply")(type="primary" @click="update",:loading="loading")
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      loading:false,
      showPassword:false,
      formData: {
        "WlanAPID": 0,
        "ApStatus": 1,
        "WMode": 3,
        "Ssid": "WebPocket-BAB5",
        "SsidHidden": true,
        "Channel": 0,
        "SecurityMode": 3,
        "WepType": 0,
        "WepKey": "1234567890",
        "WpaType": 1,
        "WpaKey": "GE747TNT",
        "CountryCode": "IT",
        "ApIsolation": 0,
        "max_numsta": 10,
        "curr_num": 0,
        "CurChannel": 8,
        "Bandwidth": 0
      },
      rules: {
        Ssid: [
          { required: true, message: '请输入活动名称请', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleReset() {
      this.$refs.formData.resetFields();
    },
    open (tab){
      //console.log(tab.$el.getAttribute('to'))
      //location.hash = tab.$el.getAttribute('to')
      //routers.push(tab.$el.getAttribute('to'))
      this.$message({
        message:"ok lfldsfjlk  kfdsjflkdf jlkj kdlsjfldks kfjdlsk sdfjkjlkdjsflkafj !",
        type: 'success'
      });
    },
    update (ev){
      let vm = this;
      vm.loading = true;
      setTimeout(() => {
        vm.loading = false;
      },3000)
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.$message('submit!');
        } else {
          this.$message('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
