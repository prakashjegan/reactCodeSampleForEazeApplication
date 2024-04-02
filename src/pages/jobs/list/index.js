import React, { useEffect, useState } from "react";
import './style.scss';
import jobsService from "../../../services/jobService";
import { Rate, Skeleton } from "antd";
import VerifiedIcon from '../../../assets/images/common/verified.png';
import { Pagination } from "@mui/material";

const JobsList = (props) => {
    const { selectedJob, setSelectedJob, activeTab, jobList, loading, pageData, fetchJobs } = props;

    console.log("-------------------------------------")
    console.log(pageData)
    return (
        <div className="jobs-list-container">
            {[1, 2, 3]?.map(num => {
                return (<Skeleton key={num} loading={loading} active />)
            })}

            {jobList?.map((job, index) => {
                return (
                    <div
                        className={`job-item ${((selectedJob === job.jobID) || (selectedJob === job.jobDefinitionId) || (selectedJob === job.jobRequestId)) ? 'selected-job' : ''}`}
                        key={index}
                        onClick={() => {
                            if (activeTab === "current-jobs") {
                                setSelectedJob(job?.jobID)
                            } else if (activeTab === "your-postings") {
                                setSelectedJob(job?.jobDefinitionId)
                            } else if (activeTab === "current-job-postings") {
                                setSelectedJob(job?.jobDefinitionId)
                            } else if (activeTab === "current-job-requests") {
                                setSelectedJob(job?.jobRequestId)
                            } else if (activeTab === "all-job-postings") {
                                setSelectedJob(job?.jobDefinitionId)
                            } else if (activeTab === "all-requests") {
                                setSelectedJob(job?.jobRequestId)
                            }
                        }}>
                        <div className="job-name">{job?.jobName}</div>
                        <div className="job-desc">{job?.jobDescription}</div>

                        <div className="tag-list">
                            {job?.tags?.map((tag, tagIndex) => {
                                return (
                                    <div className="tag-item" key={tagIndex}>{tag}</div>
                                )
                            })}
                        </div>

                        <div className="statistics">
                            <Rate allowHalf disabled defaultValue={(job?.averageReview / 20).toFixed(2) || 0} />

                            <div className="verified">
                                <img src={VerifiedIcon} alt="verified" />
                                Project Verified
                            </div>

                            <div className="proposals">
                                Proposals: <span className="count">{job?.totalJobs || 0} of { job?.totalJobRequests || 0}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
            <Pagination
                count={Math.ceil(pageData.count / pageData.rowsPerPage)}
                onChange={(e, page) => {
                    fetchJobs(page, pageData.rowsPerPage)
                }
                }
                page={parseInt(pageData.currentPage)}
                siblingCount={0}
                variant="outlined"
                color="primary"
                shape="rounded"
            />
        </div>
    )
}

export default JobsList