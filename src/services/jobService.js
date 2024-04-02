import urls from "../config/urls";
import { responseParser, transformStringToBigNumber } from "../utils/parser";
//import transformStringToBigNumber from "../utils/parser";
import request from "../xhr";

const createJobPosting = (payload) => {
  request({
    method: "post",
    url: `${urls().createJobPosting}`,
    data: payload,
    secure: true,
    transformResponse: [responseParser],
  });
};

const deleteJobPosting = (event) => {
  request({
    method: "post",
    url: `${urls({ event }).deleteJobPosting}`,
    data: {},
    secure: true,
    transformResponse: [responseParser],
  });
};
// ==================== get job list ==============
const fetchCurrentJobs = (payload) =>
  request({
    method: "post",
    url: `${urls().currentjobs}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const fetchJobsByDefinationByYou = (payload) =>
  request({
    method: "post",
    url: `${urls().definitionByYou}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });
const fetchCurrentJobPosting = (payload) =>
  request({
    method: "post",
    url: `${urls().definitionCurrentJobPosting}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });
const fetchRequestedJobs = (payload) =>
  request({
    method: "post",
    url: `${urls().requestedJobs}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });
const fetchAllJobPosting = (payload) =>
  request({
    method: "post",
    url: `${urls().fetchAllJobPosting}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });
const fetchAllJobRequest = (payload) =>
  request({
    method: "post",
    url: `${urls().fetchAllJobRequest}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });
const fetchAllJobs = (payload) =>
  request({
    method: "post",
    url: `${urls().fetchAllJobs}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

//+++++++++++++++++++++++ by Id +++++++++++++++++++++++++++
const fetchJobDetails = (event) =>
  request({
    method: "post",
    url: `${urls({ event }).jobdetails}`,
    secure: true,
    transformResponse: [responseParser],
  });
const fetchJobPostingById = (event) =>
  request({
    method: "post",
    url: `${urls({ event }).definitionById}`,
    secure: true,
    transformResponse: [responseParser],
  });
const fetchJobRequestedById = (event) =>
  request({
    method: "post",
    url: `${urls({ event }).fetchJobRequestById}`,
    secure: true,
    transformResponse: [responseParser],
  });

//====================== filters ======================
const fetchJobFilters = (payload) =>
  request({
    method: "get",
    url: `${urls({ event: payload.type }).jobfilters}`,
    secure: true,
    transformResponse: [responseParser],
  });

const fetchPlatforms = () =>
  request({
    method: "get",
    url: `${urls().fetchPlatforms}`,
    secure: true,
    transformResponse: [responseParser],
  });

const fetchJobsByDefination = (code, payload) =>
  request({
    method: "post",
    url: `${urls({ code }).jobDefinition}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const generateJobRequestAcceptor = (payload) =>
  request({
    method: "post",
    url: `${urls().generateJobRequestAcceptor}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const sendJobRequestAcceptor = (payload) =>
  request({
    method: "post",
    url: `${urls().sendJobRequestAcceptor}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const generateJobRequestPoster = (payload) =>
  request({
    method: "post",
    url: `${urls().generateJobRequestPoster}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const approveJobRequest = (payload, event, code) =>
  request({
    method: "post",
    url: `${urls({ event, code }).approveJobRequest}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const rejectJobRequest = (payload, event, code) =>
  request({
    method: "post",
    url: `${urls({ event, code }).rejectJobRequest}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });
const renegotiateJobRequest = (payload, event, code) => {
  console.log(
    "Into REnegotiateJobRequest",
    event,
    code,
    urls(event, code).reneogitateJobRequest
  );
  request({
    method: "post",
    url: `${urls({ event, code }).reneogitateJobRequest}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });
};

//-----------------master contract, post a job----------

const fetchMasterContract = (payload) =>
  request({
    method: "get",
    url: `${urls().getMasterContract}?${new URLSearchParams(payload)}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const fetchPastPostedJobs = (payload) =>
  request({
    method: "post",
    url: `${urls().getPastPosted}?${new URLSearchParams(payload)}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const fetchPostedJobById = (payload) =>
  request({
    method: "post",
    url: `${urls().fetchPostedJobById}=${payload}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

  const fetchRequestJobById = (payload) =>
  request({
    method: "post",
    url: `${urls().fetchRequestJobById}=${payload}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });
  

  const fetchJobById = (payload) =>
  request({
    method: "post",
    url: `${urls().fetchJobByID}=${payload}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

  const fetchJobByIdPopulateInvoice = (event) =>
  request({
    method: "post",
    url: `${urls({event}).fetchJobByIdPopulateInvoice}`,
    secure: true,
    transformResponse: [responseParser],
    data: {},
  });

const jobsService = {
  fetchCurrentJobs,
  fetchJobFilters,
  fetchJobDetails,
  fetchJobPostingById,
  fetchJobRequestedById,
  fetchJobsByDefination,
  fetchRequestedJobs,
  createJobPosting,
  fetchPlatforms,
  deleteJobPosting,
  generateJobRequestAcceptor,
  generateJobRequestPoster,
  sendJobRequestAcceptor,
  approveJobRequest,
  rejectJobRequest,
  renegotiateJobRequest,
  fetchJobsByDefinationByYou,
  fetchCurrentJobPosting,
  fetchAllJobPosting,
  fetchAllJobRequest,
  fetchAllJobs,
  fetchMasterContract,
  fetchPastPostedJobs,
  fetchPostedJobById,
  fetchRequestJobById,
  fetchJobById,
  fetchJobByIdPopulateInvoice
};

export default jobsService;
