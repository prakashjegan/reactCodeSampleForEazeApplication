import urls from '../config/urls';
import responseParser from '../utils/parser';
import request from '../xhr';

const fetchEventsList = () =>
  request({
    method: 'get',
    url: `${urls().allData}`,
    secure: true,
    transformResponse: [responseParser],
  });

  const fetchJobTypes = (event) =>
  request({
    method: 'get',
    url: `${urls({event}).jobType}`,
    secure: true,
    transformResponse: [responseParser],
  });

  const fetchPastDefinition = (event, payload) =>
  request({
    method: 'post',
    url: `${urls({event}).definitionById}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });
  const fetchPastDefinitions = (event, payload) =>
  request({
    method: 'post',
    url: `${urls({event}).definitionList}`,
    secure: true,
    data:payload,
    transformResponse: [responseParser],
  });
  const fetchMasterContract = (event) =>
  request({
    method: 'get',
    url: `${urls({event}).masterContract}`,
    secure: true,
    transformResponse: [responseParser],
  });
  const fetchMasterContracts = (event) =>
  request({
    method: 'get',
    url: `${urls({event}).masterContractsList}`,
    secure: true,
    transformResponse: [responseParser],
  });
  const fetchDefinition = (event, payload) =>
  request({
    method: 'post',
    data:payload,
    url: `${urls({event}).definitionById}`,
    secure: true,
    transformResponse: [responseParser],
  });

  const fetchJob = (event, payload) =>
  request({
    method: 'post',
    data:payload,
    url: `${urls({event}).fetchJobById}`,
    secure: true,
    transformResponse: [responseParser],
  });

  const fetchJobRequest = (event, payload) =>
  request({
    method: 'post',
    data:payload,
    url: `${urls({event}).fetchJobRequestById}`,
    secure: true,
    transformResponse: [responseParser],
  });
  /*{
		"from" : 0,
	"size" : 10,

	"page" : 1,
	"fetchLevel" : "",
	"canFetchExtraAttribute" : true
}*/

const listService = {
  fetchEventsList,
  fetchJobTypes,
  fetchPastDefinition,
  fetchMasterContract,
  fetchDefinition,
  fetchMasterContracts,
  fetchPastDefinitions,
  fetchJob,
  fetchJobRequest,
};

export default listService;
