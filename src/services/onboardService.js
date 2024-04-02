import urls from "../config/urls";
import responseParser from "../utils/parser";
import request from "../xhr";

const fetchBasicDetails = () =>
  request({
    method: "get",
    url: `${urls().fetchBasicDetails}`,
    secure: true,
    transformResponse: [responseParser],
  });

const updateBasicDetails = (payload) =>
  request({
    method: "post",
    url: `${urls().updateBasicDetails}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const fetchSupportPersons = () =>
  request({
    method: "get",
    url: `${urls().fetchSupportDetails}`,
    secure: true,
    transformResponse: [responseParser],
  });

const createSupportPersons = (payload) =>
  request({
    method: "post",
    url: `${urls().updateSupportDetails}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const fetchPlatform = () =>
  request({
    method: "get",
    url: `${urls().fetchPlatformDetails}`,
    secure: true,
    transformResponse: [responseParser],
  });

const toverifyPlatformDetails = (event) =>
  request({
    method: "post",
    url: `${urls({ event }).toverifyPlatformDetails}`,
    secure: true,
    transformResponse: [responseParser],
  });

const updatePlatform = (payload) =>
  request({
    method: "post",
    url: `${urls().updatePlatformDetails}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const fetchBankDetails = () =>
  request({
    method: "get",
    url: `${urls().fetchBankDetails}`,
    secure: true,
    transformResponse: [responseParser],
  });

const updateBankDetails = (payload) =>
  request({
    method: "post",
    url: `${urls().updateBankDetails}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const fetchAddress = () =>
  request({
    method: "get",
    url: `${urls().fetchAddress}`,
    secure: true,
    transformResponse: [responseParser],
  });

  const fetchAddressById = (event) =>
  request({
    method: "get",
    url: `${urls({ event }).fetchAddressById}`,
    secure: true,
    transformResponse: [responseParser],
  });

const updateAddress = (payload) =>
  request({
    method: "post",
    url: `${urls().updateAddress}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const uploadKyc = (payload) =>
  request({
    method: "post",
    url: `${urls().uploadKyc}`,
    params: payload,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const fetchKyc = () =>
  request({
    method: "get",
    url: `${urls().fetchKyc}`,
    secure: true,
    transformResponse: [responseParser],
  });

const onboardService = {
  fetchBasicDetails,
  updateBasicDetails,
  fetchSupportPersons,
  createSupportPersons,
  fetchPlatform,
  toverifyPlatformDetails,
  updatePlatform,
  fetchBankDetails,
  updateBankDetails,
  updateAddress,
  fetchAddress,
  fetchAddressById,
  uploadKyc,
  fetchKyc,
};

export default onboardService;
