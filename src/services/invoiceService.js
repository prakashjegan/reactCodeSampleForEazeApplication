import urls from "../config/urls"
import responseParser, { transformStringToBigNumber } from "../utils/parser"
import request from "../xhr"

const fetchJobInvoice = (event, payload) =>
   request({
      method: "post",
      url: `${urls({ event }).jobInvoice}`,
      secure: true,
      data: payload,
      transformResponse: [responseParser]
   })
const updateJobStage = (payload) =>
   request({
      method: "post",
      url: `${urls().jobStage}`,
      secure: true,
      data: payload,
      transformResponse: [responseParser]
   })

const invoiceService = {
   fetchJobInvoice,
   updateJobStage
}

export default invoiceService
