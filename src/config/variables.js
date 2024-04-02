import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import store from "./store";

export const jobItemsAtHome = 3;
let currencyLocalVariable = undefined;
//let jwtToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSUQiOjExMDQwMTUyMDU0MjYzMTkzNiwiZW1haWwiOiJwcmFrNTg1QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiVEVTVF8xX09yZ2FuaXphdGlvbl9AaW5mbHVrYXJ0LmluIiwibW9iaWxlTnVtYmVyIjoiODc1NDQ5NDcwMiIsImNvdW50cnlDb2RlIjoiSU4iLCJyb2xlIjoiaW5mbHVlbmNlcixhZ2VuY3kiLCJzY29wZSI6Ik9yZ2FuaXphdGlvbiIsImN1c3RvbTEiOiJVU0VSTkFNRVBBU1NXT1JEIiwiY3VzdG9tMiI6Imh0dHBzOi8vc2Vla2xvZ28uY29tL2ltYWdlcy9ML2xvZ28tY29tLWhyLWxvZ28tNTYzNkE0RDJENS1zZWVrbG9nby5jb20ucG5nIiwibG9nZ2VkSW5UaW1lIjoxNjkyNjgwMzczLCJpc3MiOiJpbmZsdWthcnQiLCJleHAiOjE2OTU2ODAzNzMsImlhdCI6MTY5MjY4MDM3MywianRpIjoiOTAxNDk5NWItY2VlOC00NWM4LTllMWEtOGY5MWE4MGY3Y2E0In0.iAi-lVcMuW-IdecCEp7Ya9r8AlhF0dtcXeh3sbsxjDA"
//let jwtToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSUQiOjExMDQwMTUyMDU0MjYzMTkzNiwiZW1haWwiOiJ0ZXN0QGluZmx1a2FydC5pbiIsInVzZXJOYW1lIjoiVEVTVF8xX09yZ2FuaXphdGlvbl9AaW5mbHVrYXJ0LmluIiwibW9iaWxlTnVtYmVyIjoiOTk4OTg4OTg3OCIsImNvdW50cnlDb2RlIjoiSU4iLCJyb2xlIjoibm9ybWFsLXVzZXIsaW5mbHVlbmNlciIsInNjb3BlIjoiT3JnYW5pemF0aW9uIiwiY3VzdG9tMSI6IlVTRVJOQU1FUEFTU1dPUkQiLCJjdXN0b20yIjoiaHR0cHM6Ly9zZWVrbG9nby5jb20vaW1hZ2VzL0wvbG9nby1jb20taHItbG9nby01NjM2QTREMkQ1LXNlZWtsb2dvLmNvbS5wbmciLCJsb2dnZWRJblRpbWUiOjE2OTAxNzU5NzMsImlzcyI6ImluZmx1a2FydCIsImV4cCI6MTY5MzE3NTk3MywiaWF0IjoxNjkwMTc1OTczLCJqdGkiOiI3MDZiMjFlZS02MjBjLTRlODItYTNmNS0yOWZlMmI0Y2FjOTAifQ.vkkRYgnKOa7-eajnxBkiCg7kRRgUmSxy0SAuIW024GY"

//let jwtToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSUQiOjExMDQwMTUyMDU0MjYzMTkzNiwiZW1haWwiOiJwcmFrNTg1QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoicHJhazU4NUBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOiIrOTE4NzU0NDk0NzAyIiwiY291bnRyeUNvZGUiOiJJTiIsInJvbGUiOiJPcmdhbml6YXRpb24sSW5kaXZpZHVhbCxQYXJ0bmVyX0FnZW5jeSxJbmZsdWVuY2VyLEZyZWVsYW5jZXIsQWRtaW4iLCJzY29wZSI6Ik9yZ2FuaXphdGlvbiIsImN1c3RvbTEiOiJVU0VSTkFNRVBBU1NXT1JEIiwiY3VzdG9tMiI6Imh0dHBzOi8vc2Vla2xvZ28uY29tL2ltYWdlcy9ML2xvZ28tY29tLWhyLWxvZ28tNTYzNkE0RDJENS1zZWVrbG9nby5jb20ucG5nIiwibG9nZ2VkSW5UaW1lIjoxNjkwODY5MTM1LCJpc3MiOiJpbmZsdWthcnQiLCJleHAiOjE2OTM4NjkxMzUsImlhdCI6MTY5MDg2OTEzNSwianRpIjoiODM2ZTQxMzgtOWM2Zi00MmFkLTk1NGUtMmY3YzIzOTE1MDA0In0.QOXBVbK-C7M2v_jSW1X57wR-sQzyHfSL0eX2KjITPms"
//let jwtToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSUQiOjExMDY2MTQ2ODczOTQwNzEwNCwiZW1haWwiOiJrc2F0eWFzaGFyYXRoNzhAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjoiOTkwMDk5MDA5OSIsInJvbGUiOiJpbmZsdWVuY2VyIiwiY3VzdG9tMSI6IlVTRVJOQU1FUEFTU1dPUkQiLCJjdXN0b20yIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZlFVRlAwMFl6SHRQZDFSblkwSzJ2OWY0LTVQVXRzTTQ3YmNwQjhCajZfSFE9czk2LWMiLCJsb2dnZWRJblRpbWUiOjE2OTM0NjM4MTAsImlzcyI6ImluZmx1a2FydCIsImV4cCI6MTY5NjQ2MzgxMCwiaWF0IjoxNjkzNDYzODEwLCJqdGkiOiJiOWI4MmYxMS1mZGM4LTRkMDMtYWIxZi0yZmIxMDUwM2U2ZjEifQ.YibOhmIO5NyhAX6M-WHI3nkSQOe8osK-k5c40Mq-MFg"
//let jwtToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSUQiOjExMDQwMTUyMDU0MjYzMTkzNiwiZW1haWwiOiJwcmFrNTg1QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiVEVTVF8xX09yZ2FuaXphdGlvbl9AaW5mbHVrYXJ0LmluIiwibW9iaWxlTnVtYmVyIjoiODc1NDQ5NDcwMiIsImNvdW50cnlDb2RlIjoiSU4iLCJjb21wbGV0ZU1vYmlsZU51bWJlciI6IjkxODc1NDQ5NDcwMiIsInJvbGUiOiJpbmZsdWVuY2VyLGFnZW5jeSIsInNjb3BlIjoiT3JnYW5pemF0aW9uIiwiY3VzdG9tMSI6IlVTRVJOQU1FUEFTU1dPUkQiLCJjdXN0b20yIjoiaHR0cHM6Ly9zZWVrbG9nby5jb20vaW1hZ2VzL0wvbG9nby1jb20taHItbG9nby01NjM2QTREMkQ1LXNlZWtsb2dvLmNvbS5wbmciLCJsb2dnZWRJblRpbWUiOjE2OTU3MTU0MjcsImlzcyI6ImluZmx1a2FydCIsImV4cCI6MTY5ODcxNTQyNywiaWF0IjoxNjk1NzE1NDI3LCJqdGkiOiJjMmFjY2JhNS03NmJlLTRiODYtYTExNi1iZTI0MDJlOGU5ODgifQ.Uh2uVCui_Jr-FTksntE--OmOvULmGABFHeZ_9ACGQjs"
// let jwtToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSUQiOjExMDQwMTUyMDU0MjYzMTkzNiwiZW1haWwiOiJwcmFrNTg1QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiVEVTVF8xX09yZ2FuaXphdGlvbl9AaW5mbHVrYXJ0LmluIiwibW9iaWxlTnVtYmVyIjoiODc1NDQ5NDcwMiIsImNvdW50cnlDb2RlIjoiSU4iLCJyb2xlIjoiSW5mbHVlbmNlciIsInNjb3BlIjoiT3JnYW5pemF0aW9uIiwiY3VzdG9tMSI6IlVTRVJOQU1FUEFTU1dPUkQiLCJjdXN0b20yIjoiaHR0cHM6Ly9zZWVrbG9nby5jb20vaW1hZ2VzL0wvbG9nby1jb20taHItbG9nby01NjM2QTREMkQ1LXNlZWtsb2dvLmNvbS5wbmciLCJsb2dnZWRJblRpbWUiOjE2OTk1MDY3NTcsImlzcyI6ImluZmx1a2FydCIsImV4cCI6MTcwMjUwNjc1NywiaWF0IjoxNjk5NTA2NzU3LCJqdGkiOiI1ODVmOTFmZC1hYWI5LTRkMDMtYTYxOC03M2I2NGEwZTY0YzgifQ.1Pir_KhMxuGSVYK_I1F5tkXsJpZ5UbT-0ydpX-cbLM0";

// let jwtToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSUQiOjExMDY2MTQ2ODczOTQwNzEwNCwiZW1haWwiOiJrc2F0eWFzaGFyYXRoNzhAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjoiOTkwMDk5MDA5OSIsInJvbGUiOiJpbmZsdWVuY2VyIiwiY3VzdG9tMSI6IlVTRVJOQU1FUEFTU1dPUkQiLCJjdXN0b20yIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZlFVRlAwMFl6SHRQZDFSblkwSzJ2OWY0LTVQVXRzTTQ3YmNwQjhCajZfSFE9czk2LWMiLCJsb2dnZWRJblRpbWUiOjE2OTM0NjM4MTAsImlzcyI6ImluZmx1a2FydCIsImV4cCI6MTY5NjQ2MzgxMCwiaWF0IjoxNjkzNDYzODEwLCJqdGkiOiJiOWI4MmYxMS1mZGM4LTRkMDMtYWIxZi0yZmIxMDUwM2U2ZjEifQ.YibOhmIO5NyhAX6M-WHI3nkSQOe8osK-k5c40Mq-MFg" 
//let partnerId = "110401520542825472"
let jwtToken1;
let partnerId = undefined;

export const jwtToken = () => {
  if (jwtToken1 === undefined || jwtToken1 === null) {
    jwtToken1 = Cookies.get("accessToken");
  }
  console.log(
    "UserInfo jwtToken",
    jwtToken1,
    store.getState(),
    Cookies.get("accessToken"),
    localStorage.getItem("persist:root")
  );
  return jwtToken1;
};
// export const myPartnerId = () => {
//    return "110401520542825472"
// }
export const myPartnerId = () => {
  if (partnerId === undefined || partnerId === null) {
    partnerId = localStorage.getItem("partnerId");
  }
  console.log("UserInfo partnerId", partnerId);
  return partnerId;
};

export const currencyList = () => {
  console.log("UserInfo Currency List", currencyLocalVariable);
  if (currencyLocalVariable === undefined || currencyLocalVariable === null) {
    currencyLocalVariable = JSON.parse(localStorage.getItem("currency"));
    console.log("UserInfo Currency List3", currencyLocalVariable);
  }
  if (currencyLocalVariable === undefined || currencyLocalVariable === null) {
    return [];
  }
  return currencyLocalVariable;
};

export const currencyList1 = () => {
  console.log("UserInfo Currency List", currencyLocalVariable);
  if (
    currencyLocalVariable === undefined ||
    currencyLocalVariable === null ||
    currencyLocalVariable.length <= 0
  ) {
    console.log(
      "UserInfo Currency List2",
      JSON.parse(localStorage.getItem("currency"))
    );
    currencyLocalVariable = JSON.parse(localStorage.getItem("currency"));
    console.log("UserInfo Currency List3", currencyLocalVariable);
  }
  return currencyLocalVariable;
};
