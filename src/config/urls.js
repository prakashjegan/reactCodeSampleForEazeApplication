const urls = (props = {}) => {
  const { event, code } = props;

  // console.log('INTO URLS ' , props, event, code)
  return {
    base_url:  "http://localhost:8999/api/v1/",
    login: "login",
    authtoken: `loginAuth/authlogin/token?code=${code}`,
    authVerification: `loginAuth/auth/${event}/firebasecallback?code=${code}`,
    metricsattributes: "metrics/fetchAttribute",
    metricsdata: "metrics/fetchMetrics",
    allData: "projconfig/projectConfig/ALL",
    jobType: `contracts/masterContracts/${event}?fetchLevels=CONTRACTGROUPBO,CONTRACTBO,CONTRACTSTAGEBO`,
    masterContractsList: `contracts/masterContracts?fetchLevels=CONTRACTGROUPBO`,
    masterContract: `contracts/masterContracts?fetchLevels=CONTRACTGROUPBO,CONTRACTBO,CONTRACTSTAGEBO&contractGroupId=${event}`,
    definitionList: `jobs/job_definition/fetch_past`,
    definitionById: `jobs/job_definition/fetchById?jobDefinitionId=${event}`,
    fetchJobById: `jobs/job/fetchById?jobId=${event}`,
    fetchJobRequestById: `jobs/job_request/fetchById?jobRequestId=${event}`,

    currentjobs: "jobs/job/fetch_current",
    definitionByYou: `jobs/job_definition/fetch_current_by_you`,
    definitionCurrentJobPosting: `jobs/job_definition/fetch_current`,
    fetchAllJobPosting: `jobs/job_definition/fetch?isOverall=true`,
    fetchAllJobRequest: `jobs/job_request/fetch`,
    jobfilters: `jobs/job/filter?filterType=${event}`,
    jobdetails: `jobs/job/fetchById?jobId=${event}`,

    createJobPosting: "jobs/job_definition/create_update_clone",
    deleteJobPosting: `jobs/job_definition/delete?jobDefinionId=${event}`,
    metrics_url: "http://localhost:8999/api/v1/",
    financialMetrics: "metrics/fetchFinancialMetrics",
    requestedJobs: "jobs/job_request/fetch_pending_by_you",
    jobDefinition: `jobs/job_definition/fetch_${code}`,
    fetchAllJobs: "jobs/job/fetch",

    generateJobRequestAcceptor: `jobs/job_request/generate?isAcceptorRequest=true`,
    generateJobRequestPoster: `jobs/job_request/generate?isAcceptorRequest=false`,
    sendJobRequestAcceptor: `jobs/job_request/sentRequest_acceptor?isAcceptorRequest=true&jobRequestId=0`,

    approveJobRequest: `jobs/job_request/approve?isAcceptorRequest=${event}&jobRequestId=${code}`,
    rejectJobRequest: `jobs/job_request/reject?isAcceptorRequest=${event}&jobRequestId=${code}`,
    reneogitateJobRequest: `jobs/job_request/re-negotiate?isAcceptorRequest=${event}&jobRequestId=${code}`,

    createOrUpdate: "queries/createOrUpdate",
    queyPostedByCurrentUser: "queries/fetchQueriesCreatedByYou",
    queryBasedOnSearchPrivate: "queries/fetchQueriesCreatedOverallWithSearchDB",
    queryBasedOnSearchPublic:
      "pub_queries/fetchQueriesCreatedOverallWithSearchDB",
    queryRepliedByYou:
      "queries/fetchQueriesCreatedOverallRepliedByYouWithSearchDB",
    queryByIdPrivate: `queries/fetchQueriesById?id=${event}`,
    queryByIdPublic: `pub_queries/fetchQueriesById?id=${event}`,
    commentForQueryAndAnswer: "queries/comment/createOrUpdate",
    answerForQuery: "queries/answer/createOrUpdate",
    upAndDownVoteForQuestion: `queries/updateVote?isUpVote=${event}&id=${code}`,
    upAndDownVoteForAnswer: `queries/answer/updateVote?isUpVote=${event}&id=${code}`,

    fetchUsers: `users`,
    fetchUserGroups: `users/fetchUserGroups`,
    fetchSearchOption: `users/searchOption?fetchLevel=${event}`,
    fetchSearchOptionAll: `users/searchOption`,
    fetchSearchOptionAllSearch: `users/searchOptionStr?searchString=${event}`,

    fetchUsersCount: "users/userTagsCount",

    userSearch: "users/userTags",
    jobInvoice: `jobs/invoice/fetch?${event}`,
    jobStage: `jobs/stages/update`,
    s3config: `projconfig/s3Config?bucketType=document&fileName=${event}&prefixedPath=${code}`,
    s3Publicconfig: `projconfig/s3Config?bucketType=public-image&fileName=${event}&prefixedPath=${code}`,

    fetchPlatforms: "platforms/fetch",

    fetchBasicDetails: "contact/basicDetails",
    updateBasicDetails: "contact/basicUpdate/EMAIL",

    fetchSupportDetails: "contact/fetch/SUPPORT",
    updateSupportDetails: "contact/create_update",
    fetchPlatformDetails: "platforms/fetch",
    toverifyPlatformDetails: `platforms/toVerify?platformId=${event}`,

    updatePlatformDetails: "platforms/create_update",

    fetchBankDetails: "paymentAccount/fetch",
    updateBankDetails: "paymentAccount/create_update",
    fetchAddress: "contact/fetch/CONTACT",
    fetchAddressById: `contact/fetchById/${event}`,

    updateAddress: "contact/create_update",
    fetchSignedUrl: "projconfig/s3Config",

    uploadKyc: "documents/create_update",
    fetchKyc: "documents/fetch/KYC",

    getMasterContract: "contracts/masterContracts",
    getPastPosted: "jobs/job_definition/fetch_past",

    createRental: "jobs/job/static/createJobStaticPosting",
    deleteRental: "jobs/job/static/deleteJobRequestJob",
    bookRental: "jobs/job/static/createRequest",

    allPostedJobList:
      "jobs/job_definition/fetchById?jobDefinitionId=110937364919767040",
    yourBookings: "jobs/job/fetchById?jobId=110413144711496960",

    getAllNotifications: "notification/fetchNotificationsForUser",
    getDeviceInfo: "users/devices/createOrUpdate",

    rentalJobListing: "jobs/job/fetch_static_list",
    jobCardTypeList: "projconfig/projectConfig/ALL",

    fetchPostedJobById: `jobs/job_definition/fetchById?jobDefinitionId`,

    fetchRequestJobById: `jobs/job_request/fetchById?jobRequestId`,

    fetchJobByID: `jobs/job/fetchById?jobId`,
    fetchJobByIdPopulateInvoice: `jobs/job/fetchById?jobId=${event}&populateInvoice=true`,

    fetchRequestsList: "users/fetchNeedApprovalUserGroup",
    fetcchAllUserGroups: "users/fetchFriends",

    approveGroupRequest: "users/approveFriendRequest",
    addToGroup:"users/sendFriendRequest",
  };
};

export default urls;
