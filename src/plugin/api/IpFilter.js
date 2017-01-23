//import G from "../../config/G.js";
import {_,$,G} from '../../common.js';
export default {
  GetIPFilterList: {
    Request(req) {
      return req;
    },
    Response(res) {
      if (res.ipFilter_list.length > 0) {
        _.each(res.ipFilter_list, (i, v) => {
          res.ipFilter_list[v].lan_port = String(i.lan_port);
          res.ipFilter_list[v].wan_port = String(i.wan_port);
        })
      }
      console.log(res.ipFilter_list)
      return res;
    }
  },
  SetIPFilter: {
    Request(req) {
      if (req.ipFilter_list.length > 0) {
        _.each(req.ipFilter_list, (i, v) => {
          req.ipFilter_list[v].lan_port = Number(i.lan_port);
          req.ipFilter_list[v].wan_port = Number(i.wan_port);
        })
      }
      return req;
    },
    Response(res) {
      return res;
    }
  }
}
