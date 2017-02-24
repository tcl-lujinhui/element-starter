var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var xlsx = require("node-xlsx");

var _ = require('underscore');
var WEBRC_WWW = "webrc"
var DIST_WWW = "dist"
var CustomDir = "Custom"

var args = process.argv.splice(2);
var $buildType = args[0] || ""
var $projectName = args[1] || ""
var $customName = args[2] || ""
var $version = args[3] || ""
if($version!==""){
  $version = "-r"+$version
}

var $projectPath = path.join(__dirname, CustomDir, $projectName)
var $customPath = path.join(__dirname, CustomDir, $projectName,$customName)

console.log($projectPath)
console.log($customPath)
init($buildType, $projectName, $customName);

function cmd(cmd) {
  console.log("cmd:"+cmd)
  try {
    return child_process.execSync(cmd, { encoding: "utf8" })
  } catch (err) {
    return false
  }
}

function init($buildType, $projectName, $customName) {
  if ($buildType !== "b" && $buildType !== "p") {
    console.log("buildType Error:b or p")
    return;
  }

  if ($projectName == "" || !fs.existsSync($projectPath)) {
    console.log("projectName Error")
    return;
  }

  if ($customName == "" || !fs.existsSync($customPath)) {
    console.log("customName Error")
    return;
  }
  cmd("rm -rf "+WEBRC_WWW)
  cmd("cp -rf src "+WEBRC_WWW)
  cmd("cp -rf "+$projectPath+"/Generic/** "+WEBRC_WWW)
  if($customName!=="Generic"){
    cmd("cp -rf "+$customPath+"/** "+WEBRC_WWW)
  }
  cmd("echo "+args+" > versionInfo.txt")
  if($buildType=="p"){
    cmd("svn up "+$version+" >> versionInfo.txt")
  }
  var langArr = ["en", "fr", "it", "sp"];
  buildString(langArr,function(){
    cmd("npm run build")
    cmd("rm -rf www")
    cmd("mkdir www")
    cmd("cp -rf dist www/")
    cmd("cp -rf index.html www/")
    cmd("cp -rf default.html www/")
    cmd("mv cfgbak www/")
    cmd("mv versionInfo.txt www/")

    if($buildType=="p"){
      cmd("svn update ../SmartSwReleaseUI/ElementUI")
      if($customName=="Generic"){
        cmd("cp -rf www/** ../SmartSwReleaseUI/ElementUI/"+$projectName+"_rc")
      }else{
        var customDirPath = path.join(__dirname,"../SmartSwReleaseUI/ElementUI/"+$customName+"/"+$projectName+"_rc")
        if(!fs.existsSync(customDirPath)){
          cmd("mkdir -p "+customDirPath)
        }
        cmd("cp -rf www/** "+customDirPath)
      }
      cmd("rm -rf dist "+WEBRC_WWW+" "+DIST_WWW)
      cmd("rm -rf index.html")
    }
  })
}


function buildString(langArr,callback) {
  console.log("build String...")
  var StringData = xlsx2Obj("./HH70_String.xlsx", "HH70_all");
  var stringMap = require("./" + WEBRC_WWW + "/i18n/map.js")
  var stringMapCustom = require("./" + WEBRC_WWW + "/i18n/map_custom.js")
  _.extend(stringMap,stringMapCustom)
  var stringRes = {}
  _.each(langArr, function(n) {
    stringRes[n] = {}
  })
  _.each(stringMap, function(i, v) {
    _.each(langArr, function(n) {
      stringRes[n][v] = StringData[i][n] || StringData[i]["en"] ||""
    })
  })
  var i =0;
  _.each(langArr, function(n) {
    var str_custom_path = "./" + WEBRC_WWW + "/i18n/"+n+"_custom.json";
    var str_custom;
    var jsonPath = "./" + WEBRC_WWW + "/i18n/"+n + ".json"
    if (fs.existsSync(str_custom_path)) {
      str_custom=require(str_custom_path)||{}
      _.extend(stringRes[n],str_custom)
    }
    
    fs.writeFile(jsonPath, JSON.stringify(stringRes[n], null, 2), function(err) {
      console.log(jsonPath)
      i++
      if(i==langArr.length){
        if(callback){
          callback()
        }
      }
    })
  })
}


function trim(str) {
  str = str || '';
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

function addcslashes(str) {
  return str.replace(/\\/g, "\\\\").replace(/'/g, "\\\'"); //需要全局替换，否则出错
}

function checkNull(str) {
  return str == undefined ? "" : str.toString();
}


function findKeyIndex(titleArr, str) {
  return titleArr.indexOf(trim(str));
}

function getXlsxData(xlsxPath) {
  var Sheets = xlsx.parse(xlsxPath);
  return Sheets;
}

function getSheetData(xlsxData, sheetName) {
  var SheetObj = _.find(xlsxData, function(list) {
    return list['name'] == sheetName;
  })
  return SheetObj.data;
}

function sheetData2Obj(SheetData) {
  var data = {};
  var titleArrs = SheetData[0];
  var titleArr = _.map(titleArrs, function(item) {
    return trim(item);
  });
  var indexKey = titleArr[0];
  _.each(titleArr, function(key) {

    _.each(SheetData, function(i, index) {

      if (index !== 0 && findValByName(i, key) != '') {
        if (key == indexKey) {
          if (!_.has(data, findValByName(i, key))) {
            data[findValByName(i, key)] = {};
          }
        } else {
          if (_.has(data[findValByName(i, key)], key)) {
            if (data[findValByName(i, indexKey)][key] == '') {
              data[findValByName(i, indexKey)][key] = findValByName(i, key) == '' ? '' : findValByName(i, key);
            }
          } else {
            data[findValByName(i, indexKey)][key] = findValByName(i, key) == '' ? '' : findValByName(i, key);
          }
        }
      }

    })
  })

  function findValByName(item, keyName) {
    var value = item[findKeyIndex(titleArr, keyName)] || '';
    if (_.isString(value)) {
      return trim(value);
    } else {
      return value;
    }
  }

  function findKeyIndex(titleArr, str) {
    return titleArr.indexOf(trim(str));
  }
  return data;
}

function xlsx2Obj(xlsxPath, sheetName) {
  var xlsxData = getXlsxData(xlsxPath)
  var allStringData = getSheetData(xlsxData, sheetName);
  var allStringDataObj = sheetData2Obj(allStringData);
  return allStringDataObj;
}

function createXlsx(xlsxPath, data) {
  var file = xlsx.build(data);
  console.log(xlsxPath + ' ok!')
  fs.writeFileSync(xlsxPath, file, 'binary');
}

function xlsxObj2xlsx(datas, xlsxPath) {
  var sheetData = [];
  var sheetLangID = ['StrID'];
  var sheetLangs = ['StrID'];
  _.each(langConfig, function(v, k) {
    sheetLangID.push(k)
    sheetLangs.push(v)
  })
  sheetData.push(sheetLangID)
  sheetData.push(sheetLangs)
  _.each(datas, function(v, k) {
    if (k != 'StrID' & k != '') {
      var strLi = [trim(k)]
      _.each(sheetLangID, function(id, i) {
        if (id != 'StrID') {
          if (v != undefined) {
            strLi.push(trim(v[id]) == '' ? null : trim(v[id]))
          } else {
            strLi.push(null)
          }

        }
      })
      sheetData.push(strLi)
    }
  })
  createXlsx(xlsxPath, [{ name: 'Strings', data: sheetData }])
}
