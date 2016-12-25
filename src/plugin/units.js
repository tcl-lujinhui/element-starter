import _ from 'underscore';
import G from '../config/G.js'
let units = {}

units.networkType = (type) => {
  let networkTypeMap = [
    [0, "NA", "NO SERVER"],
    [1, "2G", "GPRS"],
    [2, "2G", "EDGE"],
    [3, "3G", "HSPA"],
    [4, "3G", "HSUPA"],
    [5, "3G", "UMTS"],
    [6, "3G+", "HSPA_PLUS"],
    [7, "3G+", "DC-HSPA_PLUS"],
    [8, "4G", "LTE"],
    [9, "4G+", "LTE_PLUS"]
  ];
  
  let currentType = _.find(networkTypeMap, (num)=>{ 
    return num[0] == type; 
  })
  if(!currentType){
    return networkTypeMap[0][2]
  }else{
    return currentType[2]
  }
}

export default units;
