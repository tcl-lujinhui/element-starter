import G from "../../config/G.js";
export default {
  GetSimStatus: {
    Request(req) {
      var simStateType = "invalid";
      var simStateStr = "ids_sim_invalidSimCard";
      switch (req.SIMState) {
        case G.SIM_STATE_NO_SIM:
          simStateType = "noSim";
          simStateStr = "ids_sim_noSimCard";
          break;
        case G.SIM_STATE_DETECTED:
          simStateType = "initializing";
          simStateStr = "ids_sim_initializing";
          break;
        case G.SIM_STATE_PIN:
          simStateType = "pinReq";
          simStateStr = "ids_sim_pinRequired";
          break;
        case G.SIM_STATE_PUK:
          simStateType = "pukReq";
          simStateStr = "ids_sim_pukRequired";
          break;
        case G.SIM_STATE_SIM_LOCK:
          simStateType = "simLock";
          simStateStr = "ids_sim_locked";
          break;
        case G.SIM_STATE_PUK_TIMES_USED_OUT:
          simStateType = "invalid";
          simStateStr = "ids_sim_invalidSimCard";
          break;
        case G.SIM_STATE_INVALID:
          simStateType = "invalid";
          simStateStr = "ids_sim_invalidSimCard";
          break;
        case G.SIM_STATE_READY:
          simStateType = "ready";
          simStateStr = "ids_sim_ready";
          break;
        case G.SIM_STATE_INITING:
          simStateType = "initializing";
          simStateStr = "ids_sim_initializing";
          break;
      }

      req.SIMState = simStateType;
      req.SIMStateStr = simStateStr;
      return req;
    },
    Response(res) {
      return res;
    }
  },

  UnlockPin: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  },
  UnlockPuk: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  },
  ChangePinCode: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  },
  ChangePinCode: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  },
  GetAutoValidatePinState: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  },
  SetAutoValidatePinState: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  },
  UnlockSimlock: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  }
}
