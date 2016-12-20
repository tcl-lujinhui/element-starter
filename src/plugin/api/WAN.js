import G from "../../config/G.js";
export default {
  GetWanSettings: {
    Request(req) {
      let connType = "pppoe";
      let connTypeStr = "ids_ethWan_pppoe";
      let connState = "disconnected";
      let connStateStr = "ids_disconnected";
      switch (req.ConnectType) {
        case G.WAN_CONNECT_TYPE_PPPoE:
          connType = "pppoe";
          connTypeStr = "ids_ethWan_pppoe";
          break;
        case G.WAN_CONNECT_TYPE_DHCP:
          connType = "dhcp";
          connTypeStr = "ids_ethWan_dhcp";
          break;
        case G.WAN_CONNECT_TYPE_STATIC_IP:
          connType = "staticIP";
          connTypeStr = "ids_ethWan_staticIp";
          break;
        default:
          connType = "pppoe";
          connTypeStr = "ids_ethWan_pppoe";
          break;
      }

      switch (req.Status) {
        case G.WAN_PORT_STATUS_DISCONNECTED:
          connState = "disconnected";
          connStateStr = "ids_disconnected";
          break;
        case G.WAN_PORT_STATUS_CONNECTING:
          connStateStr = "ids_connecting";
          connState = "connecting";
          break;
        case G.WAN_PORT_STATUS_CONNECTED:
          connStateStr = "ids_connected";
          connState = "connected";
          break;
        case G.WAN_PORT_STATUS_DISCONNECTING:
          connStateStr = "ids_disconnecting";
          connState = "disconnecting";
          break;
        default:
          connStateStr = "ids_disconnected";
          connState = "disconnected";
          break;
      }

      req.IpAddress = req.IpAddress || "0.0.0.0";
      req.exConnectType = connType;
      req.exConnectTypeStr = connTypeStr;
      req.exStatus = connState;
      req.exStatusStr = connStateStr;
      return req;
    },
    Response(res) {
      return res;
    }
  },

  SetWanSettings: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  },
  GetWanCurrentMacAddr: {
    Request(req) {
      req.exCurrMacAddr = req.MacAddr;
      return req;
    },
    Response(res) {
      return res;
    }
  },
  SetWanCurrentMacAddr: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  },
  GetWanIsConnInter: {
    Request(req) {
      let connState = "disconnected";
      let connStateStr = "ids_disconnected";
      switch (req.ConnToInterStatus) {
        case G.WAN_PORT_INTERNET_DISCONNECTED:
          connState = "disconnected";
          connStateStr = "ids_disconnected";
          break;
        case G.WAN_PORT_INTERNET_CONNECTED:
          connStateStr = "ids_connected";
          connState = "connected";
          break;
        default:
          connStateStr = "ids_disconnected";
          connState = "disconnected";
          break;
      }
      req.exConnToInterStatus = connState;
      req.exConnToInterStatusStr = connStateStr;
      return req;
    },
    Response(res) {
      return res;
    }
  }
}
