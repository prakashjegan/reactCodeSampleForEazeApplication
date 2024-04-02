import React from "react";
import Contract from "../pages/Contract";
import Contract1 from "../pages/Contract-1";
import PostAJob from "../pages/PostAJob";
import PostAJob1 from "../pages/PostAJob-1";

import Home from "../pages/home";
import Jobs from "../pages/jobs";
import Login from "../pages/login";
import Messages from "../pages/messages";
import Metrics from "../pages/metrics";
import Notifications from "../pages/notifications";
import Onboarding from "../pages/onboarding";
import Query from "../pages/query";
import Payments from "../pages/Payments";

import UserList from "../pages/userDetails";
import JobsUpdate from "../pages/jobs/components/jobs_update";
import MobileWarningPage from "../pages/mobileVersion";
import JobCard from "../pages/jobs/components/JobCard";
import CreatePost from "../pages/jobs/components/CreatePost";

const RouteItems = [
  { path: "/", element: <Login />, private: false },
  { path: "/login", element: <Login />, private: false },
  { path: "/mobile-warning", element: <MobileWarningPage />, private: false },
  { path: "/mobile-warning1", element: <MobileWarningPage />, private: true },

  { path: "/onboarding", element: <Onboarding />, private: true },
  { path: `/post-a-job/:type/:id`, element: <PostAJob1 />, private: true }, //Type Selection is JobType, MasterContractId, PastJobDefinitionId, JobDefinitionId
  {
    path: `/job_details/:subType/:idr`,
    element: <JobsUpdate />,
    private: true,
  }, //Type Selection is JobType, MasterContractId, PastJobDefinitionId, JobDefinitionId

  //{ path: `/post-a-job-contractlist/:id`, element: <PostAJob />, private: true },
  //{ path: `/post-a-job-pastjoblist/:id`, element: <PostAJob />, private: true },
  // { path: `/user_details/:type`, element: <UserList />, private: true },
  { path: `/user_details/:partnerId`, element: <UserList />, private: true },
  { path: `/user_details`, element: <UserList />, private: true },

  { path: `/post-a-job_contract/:id`, element: <Contract />, private: true },
  { path: `/post-a-job_contract1/:id`, element: <Contract1 />, private: true },
  { path: "/home", element: <Home />, private: true },
  { path: "/invoices", element: <Payments />, private: true },
  { path: "/query", element: <Query />, private: true },
  { path: "/messages", element: <Messages />, private: true },
  { path: "/jobs", element: <Jobs />, private: true },
  { path: "/jobs/:partnerId", element: <Jobs />, private: true },
  { path: "/metrics", element: <Metrics />, private: true },
  { path: "/notifications", element: <Notifications />, private: true },

  { path: "/pastPostedJobs", element: <JobCard />, private: true },
  { path: "/createNewPost", element: <CreatePost/>, private: true },
];

export default RouteItems;
