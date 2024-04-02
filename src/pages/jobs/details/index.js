import React, { useEffect, useState } from "react";
import './style.scss';
import jobsService from "../../../services/jobService";
import { Avatar, Rate, Skeleton } from "antd";
import VerifiedIcon from '../../../assets/images/common/verified1.png';
import UserModal from "../components/userModal";
import { useNavigate, useParams } from "react-router-dom";
import { myPartnerId } from "../../../config/variables";
import JobsUpdate from "../components/jobs_update";

const JobDetails = (props) => {
    const navigate = useNavigate()
    const param = useParams()
    const { selectedJob, activeTab } = props;
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState(null);
    const [jobPosterAccepter, setJobPosterAccepter] = useState(null);
    const [reviews, setReviews] = useState({})
    const [projectData, setProjectData] = useState({})
    const [responseDetails, setResponseDetails] = useState({})
    const [subType, setSubType] = useState("JOB_DETAILS_JOB_DEFINITION")
    const [id, setId] = useState("000000000000000000")

    const currencyData = JSON.parse(localStorage.getItem("currency"))
    const formatNumber = (number) => {
        let formatted = '';
        if (number === 0) {
            formatted += "0";
            return formatted;
        }

        let remainingNumber = number
        if (remainingNumber >= 1000000) {
            const millions = Math.floor(remainingNumber / 1000000);
            remainingNumber = remainingNumber - (millions * 1000000);
            if (millions > 0) {
                formatted += `${millions}M `;
            }
        } else if (remainingNumber >= 1000) {
            const thousands = Math.floor((remainingNumber) / 1000);
            remainingNumber = remainingNumber - (thousands * 1000);

            formatted += `${thousands}K `;
        } else if (remainingNumber > 0) {
            formatted += `${remainingNumber}`;
        }
        return formatted;

    };

    useEffect(() => {
        { console.log('Into Job Details SelectedDetails') }

        selectedJob && fetchJobDetails();
    }, [selectedJob, activeTab])

    const fetchJobDetails = async () => {
        try {
            setDetails(null)
            setLoading(true);
            setJobPosterAccepter(null)
            let res = null
            if (activeTab === "current-jobs" || activeTab === "all-jobs") {
                res = await jobsService.fetchJobDetails(selectedJob)
                const response = res?.data?.message?.jobBOs;
                if (response?.length !== undefined && response?.length !== 0) {
                    response?.length !== 0 && setDetails(response[0]);

                    setResponseDetails(res)
                    setSubType("JOB_DETAILS_JOB")
                    setId(response[0].jobId)

                    const poster = res?.data?.message?.partnerTags.find((e) => e.partnerId === response[0].posterPartnerId)
                    const reviewData = (res?.data?.message?.jobDefinitionReviewTags || []).find(e => e.reviewGivenForID === response[0].jobDefinitionId);
                    setReviews(reviewData);
                    const projectData = (res?.data?.message?.jobDefinitionTags || []).find(e => e.jobDefinitionId === response[0].jobDefinitionId);
                    setProjectData(projectData)
                    // reviewData?.length !== 0 && setReviews(reviewData[0]);
                    if (poster) {
                        setJobPosterAccepter({
                            type: "Poster",
                            data: poster
                        })
                    }
                } else {
                    setDetails(null)
                }
            } else if (["your-postings", "current-job-postings", "all-job-postings"].includes(activeTab)) {
                res = await jobsService.fetchJobPostingById(selectedJob)
                const response = res?.data?.message?.jobDefinitionBOs;                   
                console.log('Into jobPosting', response , response?.length , response[0].jobDefinitionId )
                if (response?.length !== undefined && response?.length !== 0 && response[0].jobDefinitionId !== undefined) {

                    response?.length !== 0 && setDetails(response[0]);
                    console.log('Into Job Posting ::', response[0])
                    setResponseDetails(res)
                    setSubType("JOB_DETAILS_JOB_DEFINITION")
                    setId(response[0].jobDefinitionId)
                    { console.log('Into Job Details ', response[0].jobDefinitionId) }
                    const reviewData = (res?.data?.message?.jobDefinitionReviewTags || []).find(e => e.reviewGivenForID === response[0].jobDefinitionId);
                    setReviews(reviewData);

                    const poster = res?.data?.message?.partnerTags.find((e) => e.partnerId === response[0].posterPartnerId)
                    if (poster) {
                        setJobPosterAccepter({
                            type: "Poster",
                            data: poster
                        })
                    }
                } else {
                    setDetails(null)
                }
            } else if (["current-job-requests", "all-requests"].includes(activeTab)) {
                console.log('Into Job Details RequestedId') 
                res = await jobsService.fetchJobRequestedById(selectedJob)
                const response = res?.data?.message?.jobRequestBOs;
                console.log('Into Job Request ::', response)
                if (response?.length !== undefined && response?.length !== 0) {
                    response?.length !== undefined && response?.length !== 0 && setDetails(response[0]);
                    console.log('Into Job Request ::', response[0])

                    setResponseDetails(res)
                    setSubType("JOB_DETAILS_JOB_REQUEST")
                    setId(response[0].jobRequestId)
                    console.log('Into Job Details ', response[0].jobRequestId)
                    
                    if (res?.data?.message?.jobDefinitionReviewTags !== undefined ) {
                    const reviewData = res?.data?.message?.jobDefinitionReviewTags.find(e => e.reviewGivenForID === response[0].jobDefinitionId);
                    setReviews(reviewData);
                    }
                    console.log('IntoJobDetailspage AsaPoster' , response[0].acceptorPartnerId , response[0].posterPartnerId,myPartnerId(), res?.data?.message?.partnerTags )
                    if (myPartnerId() === response[0].acceptorPartnerId) {
                        const poster = res?.data?.message?.partnerTags.find((e) => e.partnerId === response[0].posterPartnerId)
                        setJobPosterAccepter({
                            type: "Poster",
                            data: poster
                        })
                    } else if (myPartnerId() === response[0].posterPartnerId) {
                        const poster = res?.data?.message?.partnerTags.find((e) => e.partnerId === response[0].acceptorPartnerId)
                        setJobPosterAccepter({
                            type: "Requester",
                            data: poster
                        })
                    }
                } else {
                    setDetails(null)
                }
            }
        } catch (error) {
            console.warn(error)
        } finally {
            setLoading(false)
        }

    }

    const handleOpen = (url) => {
        window.open(url, '_blank')
    }

    const refreshList = () => {
        if (activeTab === "current-jobs" || activeTab === "all-jobs") {
            fetchJobDetails()
        } else {
            props.refreshList()
        }
    }

    return (
        <div className="jobs-details-container">

            <UserModal isVisible={param.partnerId} closeModal={() => {
                navigate("/jobs")
            }} />
            {[1, 2, 3]?.map(num => {
                return (<Skeleton key={num} loading={loading} active />)
            })}
            {console.log('Into JobDetails page ::', details)}
            {!loading && details && <div>
                <div className="job-name">{details?.jobType}</div>

                <div className="job-name">{details?.jobName}</div>

                <div className="details-section">
                    <div className="section-name">Job Overview</div>
                    <div className="job-desc">{details?.jobDescription}</div>
                </div>

                {details?.jobDescriptionLink && <div className="links-show">
                    <span className="link" onClick={() => handleOpen(details?.jobDescriptionLink)}>Click here</span>
                    to know more about the job
                </div>}

                {details?.jobInfluProdCodeLink && <div className="links-show">
                    <span className="link" onClick={() => handleOpen(details?.jobInfluProdCodeLink)}>Click here</span>
                    to know more about the job through a production link
                </div>}
                {console.log('Into Job Details page :::', jobPosterAccepter)}
                {jobPosterAccepter ? <><div className="section-name" >{jobPosterAccepter.type}</div>
                    <div className="prent-user-container">
                        <div style={{ maxWidth: '100px' }}>
                            <Avatar alt="Remy Sharp" src={jobPosterAccepter.data.logoLink || ""} sx={{ width: 60, height: 60 }} />
                            <div style={{ overflow: "hidden", whiteSpace: "break-spaces", wordWrap: "break-word", display: "flex" }} ><img className="verified" src={VerifiedIcon} /> {jobPosterAccepter.data.userName || ""}</div>
                        </div>
                        <div className="job-poster-data-container">
                            <div><h4>{jobPosterAccepter.data.totalJobs || 0} success project</h4><img className="verified" src={VerifiedIcon} />Project Verified</div>
                            <div><h4>Total Subscribers</h4><img className="verified" src={VerifiedIcon} />  {formatNumber(jobPosterAccepter.data.totalFollowers || 0)}</div>
                            <div><h4>Total Views</h4><img className="verified" src={VerifiedIcon} />  {formatNumber(jobPosterAccepter.data.totalViews || 0)}</div>
                            <div>
                                <h4>Rating</h4>
                                <h5>{(jobPosterAccepter.data.averageReview / 20).toFixed(2)} of {jobPosterAccepter.data.totalReviews} reviews</h5>
                                <Rate allowHalf disabled defaultValue={(jobPosterAccepter.data.averageReview / 20).toFixed(2) || 0} />
                            </div>
                        </div>
                    </div>
                    <div className="links-show">
                        <span className="link" onClick={() => navigate(`/jobs/${jobPosterAccepter?.data?.partnerId}`)}>Click </span>
                        to know more about User
                    </div></> : <></>}

                <div className="statistics">
                    <div className="rating">
                        <div>{(reviews?.averageReview / 20).toFixed(2) || 0} of {reviews?.totalReviews} reviews</div>
                        <Rate allowHalf disabled defaultValue={(reviews?.averageReview / 20).toFixed(2) || 0} />
                    </div>

                    <div className="projects-and-payments">
                        <div>{projectData?.totalJobs || 0} Success projects</div>
                        <div className="verified">
                            <img className="verified" src={VerifiedIcon} style={{ aspectRatio: "1 / 1" }} alt="verified" />
                            Project Verified
                        </div>
                    </div>

                    <div className="projects-and-payments">
                        <div>{(currencyData.find(e => e.value === details.currency) || { currency_symbol: "₹" }).currency_symbol}{formatNumber(projectData?.totalBudgetAmountSpent || 0)}+ total spent</div>
                        <div className="verified">
                            <img className="verified" src={VerifiedIcon} style={{ aspectRatio: "1 / 1" }} alt="verified" />
                            Payment Verified
                        </div>
                    </div>
                </div>

                <div className="details-section">
                    <div className="section-name">Tags</div>
                </div>
                <div className="job-due-status-container">
                    <div>
                        <p className="job-due-title">Job Posted</p>
                        <p className="job-due-data">{new Date(details.tentativeStartDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="job-due-title">Job expire in</p>
                        <p className="job-due-data">{new Date(details.tentativeEndDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="job-due-title">Buffer Period</p>
                        <p className="job-due-data">{details.maxBufferPeriodInDays}</p>
                    </div>
                    <div>
                        <p className="job-due-title">Status</p>
                        <p className="job-due-data">{details.status == "INPROGRESS" ? "ACTIVE" : "INACTIVE"}</p>
                    </div>
                </div>
                <div className="details-section">
                    <div className="section-name">Term and conditions</div>
                    <p className="job-desc" style={{ whiteSpace: "pre-line" }}>{details.jobTermsAndConditionLink || ""}</p>
                </div>
                <div key={id} style={{ width: '100%' }} >
                    {console.log('Into JobsUpdates ', selectedJob)}
                    <JobsUpdate subType={subType} data={responseDetails} id={selectedJob} refreshList={refreshList} />
                </div>
            </div>}
        </div>
    )
}

export default JobDetails