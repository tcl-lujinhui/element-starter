/*
全局变量
*/
import { $, vuex, _config } from '../common.js';
let sms = {
  SMS_UCS2_MAX_SIZE: 670, //70*10
  SMS_7BIT_MAX_SIZE: 1530, //153*10
  G_SmsCounts: 0,
  isLatamSMS: false,
  GSM_7BIT_NUM: 128,
  //currentCount:0,
  arrayGSM_7DefaultTable: [
    0x0040, 0x00A3, 0x0024, 0x00A5, 0x00E8, 0x00E9, 0x00F9, 0x00EC, 0x00F2, 0x00C7, 0x000A, 0x00D8, 0x00F8, 0x000D, 0x00C5, 0x00E5,
    0x0394, 0x005F, 0x03A6, 0x0393, 0x039B, 0x03A9, 0x03A0, 0x03A8, 0x03A3, 0x0398, 0x039E, 0x001B, 0x00C6, 0x00E6, 0x00DF, 0x00C9,
    0x0020, 0x0021, 0x0022, 0x0023, 0x00A4, 0x0025, 0x0026, 0x0027, 0x0028, 0x0029, 0x002A, 0x002B, 0x002C, 0x002D, 0x002E, 0x002F,
    0x0030, 0x0031, 0x0032, 0x0033, 0x0034, 0x0035, 0x0036, 0x0037, 0x0038, 0x0039, 0x003A, 0x003B, 0x003C, 0x003D, 0x003E, 0x003F,
    0x00A1, 0x0041, 0x0042, 0x0043, 0x0044, 0x0045, 0x0046, 0x0047, 0x0048, 0x0049, 0x004A, 0x004B, 0x004C, 0x004D, 0x004E, 0x004F,
    0x0050, 0x0051, 0x0052, 0x0053, 0x0054, 0x0055, 0x0056, 0x0057, 0x0058, 0x0059, 0x005A, 0x00C4, 0x00D6, 0x00D1, 0x00DC, 0x00A7,
    0x00BF, 0x0061, 0x0062, 0x0063, 0x0064, 0x0065, 0x0066, 0x0067, 0x0068, 0x0069, 0x006A, 0x006B, 0x006C, 0x006D, 0x006E, 0x006F,
    0x0070, 0x0071, 0x0072, 0x0073, 0x0074, 0x0075, 0x0076, 0x0077, 0x0078, 0x0079, 0x007A, 0x00E4, 0x00F6, 0x00F1, 0x00FC, 0x00E0
  ],
  arrayGSM_7ExtTable: [
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0x000A, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005E, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0x007B, 0x007D, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005C,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005B, 0x007E, 0x005D, 0xFFFF,
    0x007C, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x20AC, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
    0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF
  ],
  arrayLatamTable: [
    0x00C0, 0x00C1, 0x00C2, 0x00C3, 0x00C8,
    0x00CA, 0x00CB, 0x00CC, 0x00CD, 0x00CE,
    0x00CF, 0x00D2, 0x00D3, 0x00D4, 0x00D5,
    0x00D9, 0x00DA, 0x00DB, 0x00DD, 0x00E1,
    0x00E2, 0x00E3, 0x00E7, 0x00EA, 0x00EB,
    0x00ED, 0x00EE, 0x00EF, 0x00F3, 0x00F4,
    0x00F5, 0x00FA, 0x00FB, 0x00FD, 0x00FF
  ],
  isUcs2(str) {
    return this.ucs2_number_check(str) > 0 ? true : false;
  },
  ucs2_number_check(str) {
    let i;
    let char_i;
    let num_char_i;

    let j;
    let flag;
    let ucs2_num_temp = 0;

    if (str.length == 0) {
      return 0;
    }
    for (i = 0; i < str.length; i++) {
      flag = 0;
      char_i = str.charAt(i);
      num_char_i = char_i.charCodeAt();
      for (j = 0; j < this.GSM_7BIT_NUM; j++) {
        //if ((num_char_i == this.arrayGSM_7DefaultTable[j]) || (num_char_i == this.arrayGSM_7ExtTable[j]) || (config.isLatamSMS && (num_char_i == this.arrayLatamTable[j]))) {
        if ((num_char_i == this.arrayGSM_7DefaultTable[j]) || (num_char_i == this.arrayGSM_7ExtTable[j]) || (this.isLatamSMS && (num_char_i == this.arrayLatamTable[j]))) {
          flag = 1;
          flag = 1;
          break;
        }
      }
      if (0 == flag) {
        ucs2_num_temp++;
      }
    }
    return ucs2_num_temp;
  },
  get7ExtNum(str) {
    let i;
    let j;
    let char_i;
    let num_char_i;
    let num7Ext = 0;
    for (i = 0; i < str.length; i++) {
      char_i = str.charAt(i);
      num_char_i = char_i.charCodeAt();
      for (j = 0; j < this.GSM_7BIT_NUM; j++) {
        if (num_char_i == this.arrayGSM_7ExtTable[j]) {
          num7Ext++;
        }
      }
    }
    return num7Ext;
  },
  getSmsCountStr(strLen, type) {
    let counts;
    let singleStrNumA, singleStrNumB;
    let isUcs2 = type === "ucs2";
    let totalNum;
    singleStrNumA = isUcs2 ? 70 : 160;
    singleStrNumB = isUcs2 ? 67 : 153;
    if (strLen <= singleStrNumA) {
      //return "(1)";
      return 1;
    } else if (strLen > singleStrNumA) {
      counts = Math.ceil(strLen / singleStrNumB);
      this.G_SmsCounts = counts;
      totalNum = counts > 10 ? 3 : Math.floor(30 / counts);
      //return "(" + counts + ")";
      return counts;
    }
  },
  getSystemTime() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    let currentHours = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();
    let currentSecs = currentDate.getSeconds();
    let currentTime = "";
    currentTime += currentYear + "-";
    currentTime += ((currentMonth < 10) ? "0" : "") + currentMonth + "-";
    currentTime += ((currentDay < 10) ? "0" : "") + currentDay + " ";
    currentTime += ((currentHours < 10) ? "0" : "") + currentHours + ":";
    currentTime += ((currentMinutes < 10) ? "0" : "") + currentMinutes + ":";
    currentTime += ((currentSecs < 10) ? "0" : "") + currentSecs;
    return currentTime
  },
  doReply(router, replyData) {
    router.push('newSMS');
    _config.newSMS.formData.PhoneNumber = replyData.PhoneNumber;
    _config.newSMS.formData.SMSContent = replyData.SMSContent;
    /*if (currentCount == totalCount && totalCount != 0) {
      sys.alert("ids_dlg_sms_smsFull");
    }*/
  },
  doForward(router, forwardData) {
    router.push('newSMS');
    _config.newSMS.formData.PhoneNumber = forwardData.PhoneNumber;
    _config.newSMS.formData.SMSContent = forwardData.SMSContent;
    /*if (currentCount == totalCount && totalCount != 0) {
      sys.alert("ids_dlg_sms_smsFull");
    }*/
  },
  doEdit(router, smsInfo) {
    router.push('newSMS');
    _config.newSMS.formData.PhoneNumber = smsInfo.PhoneNumber;
    _config.newSMS.formData.SMSContent = smsInfo.SMSContent;
  },
  smsGoBack(listName) {
    if (listName == "outbox") {
      $("#outboxList").removeClass("hidden");
      $("#outboxDetail").addClass("hidden");
    } else{
      $("#inboxList").removeClass("hidden");
      $("#inboxDetail").addClass("hidden");
    }
  }
  /*saveEvent(saveData) {
    let results = {
      callback: this.init
    };
    this.sdk.post("SaveSMS", saveData, results);
  },
  sendEvent(sendData) {
    let results = {
      callback: this.init
    };
    this.sdk.post("SendSMS", sendData, results);
  }*/
}

//var currListType = "inbox";;
//var doAction = "";
//var currSmsId = parseInt(getUrlPara("sms_id"));
//var sms_store, currentCount, totalCount;
//var smsNumber,singSms;

//let SMS_UCS2_MAX_SIZE = 670; //70*10
//let SMS_7BIT_MAX_SIZE = 1530; //153*10

//let newSmsCount = 0;
//let ;
//let G_numCounts=0;
/*let sendInfo = {
  numberArr:[],
  total:0,
  currentNum:"",
  currentCount:-1,
  errorNum:[],
  successNum:[]
}*/
/*initSendInfo() {
  sendInfo = {
    numberArr:[],
    total:0,
    currentCount:-1,
    errorNum:[],
    successNum:[]
  }
}*/
/*doActionFun(doAction) {
    switch (doAction) {
        case "reply":
            doReply();
            break;
        case "forward":
      doForward();
            break;
        case "edit":
            doEdit();
            break;
        default:
            doWrite();
    }
}*/

/*doWrite(listName) {
  if (currentCount == totalCount && totalCount != 0) {
    sys.alert("ids_dlg_sms_smsFull");
  }
  $("#phoneNumbers").val("").focus();
  $("#messageContent").val("");
  $("#btnSave,#btnSent").css("display", "")
},*/


//let actionTepy = "inbox";

//let ;
/*;*/

/*let ;*/
/*let arrayLatamTable=[
  0x00C0,0x00C1,0x00C2,0x00C3,0x00C8,
  0x00CA,0x00CB,0x00CC,0x00CD,0x00CE,
  0x00CF,0x00D2,0x00D3,0x00D4,0x00D5,
  0x00D9,0x00DA,0x00DB,0x00DD,0x00E1,
  0x00E2,0x00E3,0x00E7,0x00EA,0x00EB,
  0x00ED,0x00EE,0x00EF,0x00F3,0x00F4,
  0x00F5,0x00FA,0x00FB,0x00FD,0x00FF
];*/

/*let arrayLatamTableStr=[
  0x0041,0x0041,0x0041,0x0041,0x0045,
  0x0045,0x0045,0x0049,0x0049,0x0049,
  0x0049,0x004F,0x004F,0x004F,0x004F,
  0x0055,0x0055,0x0055,0x0059,0x0061,
  0x0061,0x0061,0x00C7,0x0065,0x0065,
  0x0069,0x0069,0x0069,0x006F,0x006F,
  0x006F,0x0075,0x0075,0x0079,0x0079
];*/
/*
 */
/**/



/*initRightSimCard(numMsg) {
    sms_store = getSMSStoreState();
    currentCount = sms_store.used_count;
    totalCount = sms_store.total_count;
    if (!isNaN(numMsg)) {
    doAction = "reply";
        singSms = getSingleSMS(numMsg);
        smsNumber = singSms.sms_number;
        //smsContent=singSms.sms_content;
        $("#phoneNumbers").val(smsNumber);
    } else {
    doAction = "";
        $("#phoneNumbers").val('');
    }
    doActionFun(doAction);
    $("#newMsgBox").css("display", "block");
    showNumCount();
  $("#phoneNumbers").bind("input change keyup keydown paste", function () {
    showNumCount()
  })
    listenCharCount();
    $("#messageContent").bind("input change keyup keydown paste", function() {
        listenCharCount()
    })
}*/

/*initMessageButton() {
    $("#btnBack").click(function() {
        smsGoBack();
    });
    $("#btnSent").click(function() {
    startQueueEvent("send");
    })
    $("#btnSave").click(function() {
    startQueueEvent("save");
    })
    AIRBOX.messages._initPopinDelete();
}*/
/*showNumCount(){
  let numbersArr=[];
  numbersArr = $("#phoneNumbers").val().split(/[;]+/);
  numbersArr=$.grep(numbersArr,function(n,i){
    return n!="";
  })
  let numCount=numbersArr.length;
  G_numCounts=numCount;
  $("#currentNumCount").html(numCount);
}*/



/**/

/*
 */
/*
 */
/*
 */
/*
 */
/*checkPara(action) {
    let inputNumbers = $("#phoneNumbers");
  let messageContent = $("#messageContent").val();
  if (sendInfo.total == 0 && (action == "send" || (action == "save" && messageContent == ""))) {
    inputNumbers.showRule("ids_dlg_sms_inputNum");
    return false;
  }
  return true;
}*/
/*startQueueEvent(type) {
  $("#btnSent,#btnSave").blur();//modify touch screen pc click enter sms sent again issue
  initSendInfo();
  let $inputNumbers = $("#phoneNumbers");
  let inputNumbers = $.trim($inputNumbers.val());
  let messageContent = $("#messageContent").val();
  let numbersArr = [];
  let errorNum = [];
  if (inputNumbers != "") {
    numbersArr = inputNumbers.split(/[;]+/);
    numbersArr=$.grep(numbersArr,function(n,i){
      return n!="";
    })
  }
  let reg = /^((?!;{2,}).)+$/
  if (inputNumbers != "") {
    if (!reg.test(inputNumbers) || /^;/.test(inputNumbers)) {
      $inputNumbers.showRule("ids_dlg_sms_mobileNumRule");
      return false;
    } else {
      errorNum = $.grep(numbersArr, function (n, i) {
        return !(/^\+?[0-9]{1,20}$/.test(n))
      })
      if (errorNum.length > 0) {
        $inputNumbers.showRule("ids_dlg_sms_NumSeparateRule","ids_dlg_sms_mobileNumRule");
        return false;
                }
    }
    if(numbersArr.length*G_SmsCounts>30){
      $inputNumbers.showRule("ids_dlg_numberWarning");
                return false;
            }
    if (!checkCount(true)) {
      sys.alert("ids_dlg_sms_noSpace")
      return;
        }
    sendInfo.numberArr = numbersArr;
    sendInfo.total = numbersArr.length;
    if ($.inArray(type, ["send", "save"]) != -1) {
      queueEvent(type);
    }
  } else {
    if (type == "send" || (type == "save" && messageContent == "")) {
      $inputNumbers.showRule("ids_dlg_sms_inputNum");
            return false;
    }else{
      if (!checkCount(true)) {
        sys.alert("ids_dlg_sms_noSpace")
        return;
        }
      saveEvent("");
    }
  }
}*/
/*queueEvent(type) {
  let resultStr = "";
  let errorCount=0;
  if (type == "smsfull") {
    errorCount=sendInfo.numberArr.length-sendInfo.successNum.length;
    resultStr = sendInfo.successNum.length + " "+sys.getRes("ids_dlg_success")+"<br/>" + errorCount + " "+sys.getRes("ids_dlg_fail")+"<br/>";
    sys.alert(resultStr, function () {
      listenLogout.start();
      page.stopLoading();
      smsGoBack();
    })
  } else {
    sendInfo.currentCount++;
    if (sendInfo.total > sendInfo.currentCount) {
      sendInfo.currentNum = sendInfo.numberArr[sendInfo.currentCount];
      if (type == "send") {
        sendEvent(sendInfo.numberArr[sendInfo.currentCount]);
      } else if (type == "save") {
        saveEvent(sendInfo.numberArr[sendInfo.currentCount]);
      }
    } else {
      errorCount=sendInfo.numberArr.length-sendInfo.successNum.length
      if(sendInfo.successNum.length==0){
        if (type == "send") {
          resultStr=sys.getRes("ids_dlg_fail");
        } else if (type == "save") {
          resultStr=sys.getRes("ids_dlg_fail");
        }
        sys.alert(resultStr, function () {
          if (type == "send") {
            listenLogout.start();
            smsGoBack();
          } else if (type == "save") {
            smsGoBack();
          }
        })
      }else if(sendInfo.successNum.length==sendInfo.numberArr.length){
        resultStr=sys.getRes("ids_dlg_success");
        sys.alert(resultStr, function () {
          if (type == "send") {
            listenLogout.start();
            smsGoBack();
          } else if (type == "save") {
            smsGoBack();
          }
        })
      }else{
        resultStr = sendInfo.successNum.length + " "+sys.getRes("ids_dlg_success")+"<br/>" + errorCount + " "+sys.getRes("ids_dlg_fail")+"<br/>";
        sys.alert(resultStr, function () {
          if (type == "send") {
            listenLogout.start();
            smsGoBack();
          } else if (type == "save") {
            smsGoBack();
          }
        })
      }
      if(type=="save"){
        page.stopLoading();
      }
    }
  }
}*/

/*getParams(number) {
    let now= new Date();     
    let year=now.getFullYear();     
    let month=now.getMonth()+1;     
    let day=now.getDate();     
    let hour=now.getHours();     
    let minute=now.getMinutes();     
    let second=now.getSeconds();     
    let nowdate=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;

    let params = {
    "sms_id":currSmsId,
    "action_type":actionTepy,
    "sms_time":nowdate,
    "sms_number":number,
      "sms_content": config.isLatamSMS ? to7BITStr($("#messageContent").val()) : $("#messageContent").val()
    }
    return params;
}*/


/*sendEvent(number) {
  if (!checkCount(false)) {
    queueEvent("smsfull");
        return;
    }
  let params = getParams(number);
    if (checkPara("send") == true) {
    $("#btnSent,#btnSave").setBtnDisabled();
    sys.prompt('<div id="showResultDiv">' + sys.getRes("ids_dlg_sms_sending") + "(" + (sendInfo.currentCount + 1) + "/" + sendInfo.numberArr.length + ')</div>', -1);
      listenLogout.stop();
        setTimeout(function() {
            sendSMS(params, function(result) {
                if (result == API_RESULT_SUCCESS) {
                    startGetSendResult();
                } else {
          queueEvent("send");
                }
            })
        }, 60)
    }

}*/

/*saveEvent(number) {
  if (!checkCount(false)) {
    queueEvent("smsfull");
        return;
    }
  let params = getParams(number);
    if (checkPara("save") == true) {
    page.startLoading();
      $("#btnSent,#btnSave").setBtnDisabled();
        setTimeout(function() {
            saveSMS(params, function(result) {
        if(sendInfo.total==0){
                if (result == API_RESULT_SUCCESS) {
                    sys.alert("ids_dlg_success", function() {
              smsGoBack();
            })
                } else {
                    sys.alert("ids_dlg_fail", function() {
              smsGoBack();
            })
                }
        }else{
          if(result==API_RESULT_SUCCESS){
            sendInfo.successNum.push(sendInfo.currentNum);
            queueEvent("save");
          }else{
            queueEvent("save");
          }
        }
            })
        }, 60)
    }
}*/

/*startGetSendResult() {
    interGetSendResult = setTimeout("showResult()", 5000);
}*/

/*showResult() {
    let $showResultDiv = $("#showResultDiv");
    let $showResultDivLen = $showResultDiv.length;
    if ($showResultDivLen < 1) {
        return;
    }
    async_getSendSMSResult(function(data) {
        if (data == 1 || data == 2) {
            startGetSendResult();
        }
        if (data == 3) {
      sendInfo.successNum.push(sendInfo.currentNum);
      queueEvent("send");
        }
    if (data == 0 || data == 4 || data==5) {
      queueEvent("send");
        }
    })
}*/

/*listenCharCount() {
    let content = $("#messageContent").val();
    let contentLength = content.length;
    let contentNum = 0;
  let smsCounts;
    let MaxLength = SMS_7BIT_MAX_SIZE;
    if (isUcs2(content)) {
        MaxLength = SMS_UCS2_MAX_SIZE;
        contentNum = contentLength;
    smsCounts = getSmsCountStr(contentLength, "ucs2");
    } else {
        contentNum = parseInt(contentLength + get7ExtNum(content));
    smsCounts = getSmsCountStr(contentNum, "7bit");
    }
    if (contentNum > MaxLength) {
        $("#smsMaxNumWarn").css("display","");
        $("#btnSent,#btnSave").setBtnDisabled();
    } else {
        $("#smsMaxNumWarn").css("display","none");
        $("#btnSent,#btnSave").removeBtnDisabled();
    }
  $("#smsCharCount").html(contentNum + "/" + MaxLength);
  //$("#smsCharCount").html(smsCounts);
}*/

/*to7BITStr(str){
  let i;
  let char_i;
  let num_char_i;

  let j;
  let flag;
  let trueStr = "";

    let k;
    for (i = 0; i < str.length; i++) {
        flag = 0;
        char_i = str.charAt(i);
        num_char_i = char_i.charCodeAt();
        let positionNnm = position(num_char_i);

        if (!isNaN(positionNnm) && positionNnm >= 0 && positionNnm < arrayLatamTable.length) {
            num_char_i = arrayLatamTableStr[positionNnm];
        }
        if (config.isIncludingLatamAndOtherLang) {
            if (positionNnm == undefined) {
                trueStr += String.fromCharCode(num_char_i);
            }
        }
        for (j = 0; j < GSM_7BIT_NUM; j++) {
            if (num_char_i == arrayGSM_7DefaultTable[j] || (num_char_i == arrayGSM_7ExtTable[j])) {
                flag++
            }
        }

        if (flag == 0) {
            num_char_i = 0x0020;
        }
        if (config.isIncludingLatamAndOtherLang) {
            if (positionNnm == undefined) {
                trueStr += $.trim(String.fromCharCode(num_char_i));
            } else {
                trueStr += String.fromCharCode(num_char_i);
            }
        } else {
            trueStr += String.fromCharCode(num_char_i);
        }


    }*/

/*position(value) {
        for (let i in arrayLatamTable) {
            if (arrayLatamTable[i] == value) {
                return i;
                break;
            }
        }
        if (config.isIncludingLatamAndOtherLang) {
          let noLatamOtherLan = "other";
            for (let j = 0; j < GSM_7BIT_NUM; j++) {
                if (value == arrayGSM_7DefaultTable[j] || (value == arrayGSM_7ExtTable[j])) {
                    return noLatamOtherLan;
                    break;
                }
            }
        }
    }
    return trueStr;
}*/
/*checkCount(isFirst) {
    if (currListType != "draft" && currentCount == totalCount) {
        return false;
    }
    let oldCount = 0;
    let newCount;
    let content = $("#messageContent").val();
    let isUCS2;
    if (isUcs2(content)) {
        isUCS2 = true;
    } else {
        isUCS2 = false;
    }
    if (currListType == "draft") {
        if (isUcs2(smsContent)) {
            oldCount = smsContent.length / (smsContent.length <= 70 ? 70 : 67);
        } else {
            oldCount = parseInt(smsContent.length + get7ExtNum(smsContent)) / (parseInt(smsContent.length + get7ExtNum(smsContent)) <= 160 ? 160 : 153);
        }
    }
    oldCount = Math.ceil(oldCount);
    if (isUCS2) {
    newCount = content.length / (content.length <= 70 ? 70 : 67) + newSmsCount;
    } else {
    newCount = parseInt(content.length + get7ExtNum(content)) / (parseInt(content.length + get7ExtNum(content)) <= 160 ? 160 : 153) + newSmsCount;
    }


    newCount = Math.ceil(newCount)
    let addCount = newCount - oldCount;
  if(!isFirst){
    newSmsCount = addCount;
  }
    if (totalCount - currentCount - addCount >= 0) {
        return true
    } else {
        return false;
    }
}*/

/**/




export default sms;
