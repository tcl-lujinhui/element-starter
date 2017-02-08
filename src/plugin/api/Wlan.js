import G from "../../config/G.js";
export default {
  GetWlanSettings: {
    Request(req) {
      return req;
    },
    Response(res) {
      if(res.AP2G.ApStatus == 2){
        res.AP2G.ApStatus =1;
        //res.AP2G.exWpsStatus = true;
      }
      if(res.AP5G.ApStatus == 2){
        res.AP5G.ApStatus =1;
        //res.AP5G.exWpsStatus = true;
      }
      return res;
    }
  },

  SetWlanSettings: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  }
}
