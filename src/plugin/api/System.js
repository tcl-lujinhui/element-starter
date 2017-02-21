import G from "../../config/G.js";
export default {
  GetSystemStatus: {
    Request(req) {
      return req;
    },
    Response(res) {
      res.exRoaming = res.Roaming == G.ROAM_STATE_YES ? true : false;
      return res;
    }
  },
} 
