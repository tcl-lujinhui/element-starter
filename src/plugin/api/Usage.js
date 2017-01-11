import G from "../../config/G.js";
export default {
  GetUsageSettings: {
    Request(req) {
      req.MonthlyPlan = Number(req.MonthlyPlan)
      req.TimeLimitTimes = Number(req.TimeLimitTimes)
      return req;
    },
    Response(res) {
      res.MonthlyPlan = String(res.MonthlyPlan)
      res.TimeLimitTimes = String(res.TimeLimitTimes)
      return res;
    }
  },

  SetUsageSettings: {
    Request(req) {
      return req;
    },
    Response(res) {
      return res;
    }
  }
}
