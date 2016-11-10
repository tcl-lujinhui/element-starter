<template lang="jade">
  include ./../jade/components.jade
  #settings
    +form("formData")(:rules="rules" ref="formData")
      +formItem("SSID:")(prop="Ssid",:rules="{type: 'string', required: true,fields:{value:{required: true, message: '域名不能为空', trigger: 'blur'}}}")
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
          el-radio(v-model="formData.WepType",:label.number="1") Share
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
      +formItem("")
        +button("Cancel")(@click="handleReset")
        +button("Apply")(type="primary" @click="update")
</template>
<script>
export default {
  data () {
    return {
      showPassword:false,
      formData: {
        Ssids:"",
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
        "max_numsta": 15,
        "curr_num": 0,
        "CurChannel": 8,
        "Bandwidth": 0
      },
      rules: {
        Ssid: [
          { required: true, message: '请输入活动名称请输入活动名称请输入活动名称请输入活动名称 请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleReset() {
      this.$refs.formData.resetFields();
    },
    update (ev){
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
