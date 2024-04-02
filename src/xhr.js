import axios from "axios";
import urls from "./config/urls";
import store from "./config/store";
import { saveAuthenticationUserLogout } from "./redux/auth/actions";
import { jwtToken } from "./config/variables";

export const metricsRequest = (httpOptions) => {
  //const jwtToken = store.getState()?.authentication?.accessToken;
  // const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSUQiOjExMDQwMTUyMDU0MjYzMTkzNiwiZW1haWwiOiJwcmFrNTg1QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiVEVTVF8xX09yZ2FuaXphdGlvbl9AaW5mbHVrYXJ0LmluIiwibW9iaWxlTnVtYmVyIjoiODc1NDQ5NDcwMiIsImNvdW50cnlDb2RlIjoiSU4iLCJyb2xlIjoiSW5mbHVlbmNlciIsInNjb3BlIjoiT3JnYW5pemF0aW9uIiwiY3VzdG9tMSI6IlVTRVJOQU1FUEFTU1dPUkQiLCJjdXN0b20yIjoiaHR0cHM6Ly9zZWVrbG9nby5jb20vaW1hZ2VzL0wvbG9nby1jb20taHItbG9nby01NjM2QTREMkQ1LXNlZWtsb2dvLmNvbS5wbmciLCJsb2dnZWRJblRpbWUiOjE2OTkzNzI3MzcsImlzcyI6ImluZmx1a2FydCIsImV4cCI6MTcwMjM3MjczNywiaWF0IjoxNjk5MzcyNzM3LCJqdGkiOiJiNDVlNTY5NS04Y2U0LTQ3ZTctOTFkYi05YjMzZDRjZDRiZWQifQ.DmdiANGgjD0Q6A2Oy0W4AL8cikxbylLdGpOnyjOdC_k"  
  let jwt = jwtToken();
  console.log("JWT Token : ", jwt);

  if (!httpOptions.exact)
    httpOptions.url = urls().metrics_url + httpOptions.url;

  httpOptions.headers = {
    "Content-Type": httpOptions.files
      ? "multipart/form-data"
      : "application/json",
    Accept: "application/json",
    ...httpOptions.headers,
  };
  if (httpOptions.secure) httpOptions.headers.Authorization = `Bearer ${jwt}`;

  const handleRequestErrors = (errorResponse) => {
    const error = errorResponse?.data;
    if (error?.statusCode === 401) {
      store.dispatch(saveAuthenticationUserLogout());
      window.location.replace("/");
    }
  };

  return axios(httpOptions)
    .then((response) => response)
    .catch((error) => {
      handleRequestErrors(error.response);
      throw error.response;
    });
};

export default function request(httpOptions) {
  //const jwtToken = store.getState()?.authentication?.accessToken;
  //const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSUQiOjExMDQwMTUyMDU0MjYzMTkzNiwiZW1haWwiOiJURVNUXzFfT3JnYW5pemF0aW9uX0BpbmZsdWthcnQuaW4iLCJ1c2VyTmFtZSI6IlRFU1RfMV9Pcmdhbml6YXRpb25fQGluZmx1a2FydC5pbiIsIm1vYmlsZU51bWJlciI6Iis5MTkxMDAwMDAwMDAiLCJjb3VudHJ5Q29kZSI6IklOIiwicm9sZSI6Ik9yZ2FuaXphdGlvbiIsInNjb3BlIjoiT3JnYW5pemF0aW9uIiwiY3VzdG9tMSI6IlVTRVJOQU1FUEFTU1dPUkQiLCJjdXN0b20yIjoiaHR0cHM6Ly9zZWVrbG9nby5jb20vaW1hZ2VzL0wvbG9nby1jb20taHItbG9nby01NjM2QTREMkQ1LXNlZWtsb2dvLmNvbS5wbmciLCJsb2dnZWRJblRpbWUiOjE2ODkwNDc4NDEsImlzcyI6ImluZmx1a2FydCIsImV4cCI6MTY5MjA0Nzg0MSwiaWF0IjoxNjg5MDQ3ODQxLCJqdGkiOiI4YTk3MjRiMC04YWNmLTRmYWQtOTU1Zi1kY2M4MjZjNTk0ZDYifQ.Wg8bqpxY2b5FN4WaHVdHDBp5ptwWe7xjMG00CEYuUjM'
  let jwtToken1 = jwtToken();
  // let jwtToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSUQiOjExMDY2MTQ2ODczOTQwNzEwNCwiZW1haWwiOiJrc2F0eWFzaGFyYXRoNzhAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjoiOTkwMDk5MDA5OSIsInJvbGUiOiJpbmZsdWVuY2VyIiwiY3VzdG9tMSI6IlVTRVJOQU1FUEFTU1dPUkQiLCJjdXN0b20yIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZlFVRlAwMFl6SHRQZDFSblkwSzJ2OWY0LTVQVXRzTTQ3YmNwQjhCajZfSFE9czk2LWMiLCJsb2dnZWRJblRpbWUiOjE2OTM0NjM4MTAsImlzcyI6ImluZmx1a2FydCIsImV4cCI6MTY5NjQ2MzgxMCwiaWF0IjoxNjkzNDYzODEwLCJqdGkiOiJiOWI4MmYxMS1mZGM4LTRkMDMtYWIxZi0yZmIxMDUwM2U2ZjEifQ.YibOhmIO5NyhAX6M-WHI3nkSQOe8osK-k5c40Mq-MFg"
  console.log("JWT Token : ", jwtToken1);

  if (!httpOptions.exact) httpOptions.url = urls().base_url + httpOptions.url;

  httpOptions.headers = {
    "Content-Type": httpOptions.files
      ? "multipart/form-data"
      : "application/json",
    Accept: "application/json",
    ...httpOptions.headers,
  };
  if (httpOptions.secure)
    httpOptions.headers.Authorization = `Bearer ${jwtToken1}`;

  const handleRequestErrors = (errorResponse) => {
    const error = errorResponse?.data;
    if (error?.statusCode === 401) {
      store.dispatch(saveAuthenticationUserLogout());
      window.location.replace("/");
    }
  };

  return axios(httpOptions)
    .then((response) => response)
    .catch((error) => {
      handleRequestErrors(error.response);
      throw error.response;
    });
}
