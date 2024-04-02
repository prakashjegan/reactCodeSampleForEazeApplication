import urls from "../config/urls"
import responseParser from "../utils/parser"
import request, { metricsRequest } from "../xhr"

const fetchAttribute = () =>
   request({
      method: "get",
      url: `${urls().metricsattributes}`,
      secure: true,
      transformResponse: [responseParser]
   })

const fetchMetrics = (payload) =>
   request({
      method: "post",
      url: `${urls().metricsdata}`,
      data: payload,
      secure: true
   })

const fetchMetricsData = (payload) =>
   metricsRequest({
      method: "post",
      url: `${urls().metricsdata}`,
      data: payload,
      secure: true
   })

const fetchFinancialMetricsData = (payload) =>
   metricsRequest({
      method: "post",
      url: `${urls().financialMetrics}`,
      data: payload,
      secure: true
   })

const metricsService = {
   fetchAttribute,
   fetchMetrics,
   fetchMetricsData,
   fetchFinancialMetricsData
}

export default metricsService
