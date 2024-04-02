import urls from "../config/urls";
import responseParser from "../utils/parser";
import request from "../xhr";

const fetchUserData = (payload) =>
  request({
    method: "post",
    url: `${urls().userSearch}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const fetchUsers = () =>
  request({
    method: "get",
    url: `${urls().fetchUsers}`,
    secure: true,
    transformResponse: [responseParser],
  });

const fetchUserGroups = (payload) =>
  request({
    method: "post",
    url: `${urls().fetchUserGroups}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const fetchSearchOption = (event) =>
  request({
    method: "get",
    url: `${urls({ event }).fetchSearchOption}`,
    secure: true,
    transformResponse: [responseParser],
  });

const fetchSearchOptionAll = () =>
  request({
    method: "get",
    url: `${urls().fetchSearchOptionAll}`,
    secure: true,
    transformResponse: [responseParser],
  });

const fetchSearchOptionAllSearch = (event) =>
  request({
    method: "get",
    url: `${urls({ event }).fetchSearchOptionAllSearch}`,
    secure: true,
    transformResponse: [responseParser],
  });

const fetchUserTagsCount = (payload) =>
  request({
    method: "post",
    url: `${urls().fetchUsersCount}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const fetchRequestsList = (payload) =>
  request({
    method: "post",
    url: `${urls().fetchRequestsList}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });


const fetchAllUsersGroups = (payload) =>
request ({
   method: "post",
   url: `${urls().fetcchAllUserGroups}`,
   secure: true,
   transformResponse: [responseParser],
   data: payload
})

const approvegrouprequest = (payload) =>
request({
  method: "post",
  url: `${urls().approveGroupRequest}?isApproved=${true}`,
  transformResponse: [responseParser],
  secure: true,
  data: payload
})

const addToGroup = (payload) =>
request({
  method: "post",
  url: `${urls().addToGroup}`,
  transformResponse: [responseParser],
  secure: true,
  data: payload
})

const rejectGrouprequest = (payload) =>
request({
  method: "post",
  url: `${urls().approveGroupRequest}?isApproved=${false}`,
  transformResponse: [responseParser],
  secure: true,
  data: payload
})


const userService = {
  fetchUserData,
  fetchUsers,
  fetchUserTagsCount,
  fetchSearchOption,
  fetchSearchOptionAll,
  fetchSearchOptionAllSearch,
  fetchUserGroups,
  fetchRequestsList,
  fetchAllUsersGroups,
  approvegrouprequest,
  rejectGrouprequest,
  addToGroup
};

export default userService;
