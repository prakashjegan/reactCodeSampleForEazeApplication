import urls from "../config/urls";
import request from "../xhr";
import responseParser from "../utils/parser";

const createRentalPost = (payload) =>
  request({
    method: "post",
    url: `${urls().createRental}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const deleteRentalPost = (payload) =>
  request({
    method: "post",
    url: `${urls().deleteRental}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const bookRentalPost = (payload) =>
  request({
    method: "post",
    url: `${urls().bookRental}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const allPostedJobList = () =>
  request({
    method: "post",
    url: `${urls().allPostedJobList}`,
    secure: true,
    transformResponse: [responseParser],
  });

const allRentalJobListing = (payload) =>
  request({
    method: "post",
    url: `${urls().rentalJobListing}`,
    secure: true,
    data: payload,
    transformResponse: [responseParser],
  });

const yourBookingList = () =>
  request({
    method: "post",
    url: `${urls().yourBookings}`,
    secure: true,
    transformResponse: [responseParser],
  });

const createPost = (payload) =>
  request({
    method: "post",
    url: `${urls().createPost}`,
    secure: true,
    transformResponse: [responseParser],
    data: payload,
  });

const jobCardTypeList = () =>
  request({
    method: "get",
    url: `${urls().jobCardTypeList}`,
    secure: true,
    transformResponse: [responseParser],
  });

const rentalService = {
  createRentalPost,
  allPostedJobList,
  yourBookingList,
  allRentalJobListing,
  jobCardTypeList,
  deleteRentalPost,
  bookRentalPost
};

export default rentalService;
