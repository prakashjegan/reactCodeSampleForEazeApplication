import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import './style.scss';
import JobsFilters from './filters';
import JobsList from './list';
import JobDetails from './details';
import jobsService from '../../services/jobService';
import DeleteIcon from '../../assets/images/common/close_white.png';
import FilterIcon from '../../assets/images/common/filter.png';
import { useNavigate, useParams } from 'react-router-dom';

const Jobs = () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('openTab');
    console.log('IntoJobs' , code)
    let id = urlParams.get('id');
    console.log('IntoJobs' , id)
    let navigate = useNavigate();

    if (id === undefined || id === "" || id === null) {
        id = "000000000000000000"
    }
    const [jobList, setJobList] = useState([]);
    const [jobListLoding, setJobListLoading] = useState(true)
    const [pageData, setPageData] = useState({
        currentPage: 1,
        rowsPerPage: 10,
        count: 0
    })

    const [tabs] = useState([
        { label: 'Current Jobs', value: 'current-jobs' },
        { label: 'Your Postings', value: 'your-postings' },
        { label: 'Current Job Postings', value: 'current-job-postings' },
        { label: 'Current Job Requests', value: 'current-job-requests' },
        { label: 'All Job Posting', value: 'all-job-postings' },
        { label: 'All Jobs', value: 'all-jobs' },
        { label: 'All Requests', value: 'all-requests' }
    ])
    const [active, setActive] = (!((code === undefined || code === "" || code === null)) ? useState(code) : useState('current-jobs'));
    const [selectedJob, setSelectedJob] = useState(null);
    const [filters, setFilters] = useState({
        languages: { label: 'Language', list: [] },
        locations: { label: 'Loaction', list: [] },
        platformTypes: { label: 'Platform', list: [] },
        categories: { label: 'Category', list: [] },
        tags: { label: 'Tag', list: [] }
    });
    const fetchJobs = async (page = pageData.currentPage, row = pageData.rowsPerPage) => {
        try {
            setJobListLoading(true)
            setJobList([]);
            setPageData({
                currentPage: 1,
                rowsPerPage: 10,
                count: 0
            })
            setSelectedJob("")
            let res = null
            let searchCriteria = []
            let language = filters['languages']?.list.filter(e => e.selected)
            if (language.length) {
                searchCriteria.push({
                    "field": "languages",
                    "termField": "languages",
                    "operator": "LIKE",
                    "termValue": language.map((e) => e.value),
                    "logical": "AND"
                })
            }

            let location = filters['locations']?.list.filter(e => e.selected)
            if (location.length) {
                searchCriteria.push({
                    "field": "locations",
                    "termField": "locations",
                    "operator": "LIKE",
                    "termValue": location.map((e) => e.value),
                    "logical": "AND"
                })
            }
            let plateform = filters['platformTypes']?.list.filter(e => e.selected)
            if (plateform.length) {
                searchCriteria.push({
                    "field": "platforms",
                    "termField": "platforms",
                    "operator": "LIKE",
                    "termValue": plateform.map((e) => e.value),
                    "logical": "AND"
                })
            }
            let tags = filters['tags']?.list.filter(e => e.selected)
            if (tags.length) {
                searchCriteria.push({
                    "field": "tags",
                    "termField": "tags",
                    "operator": "LIKE",
                    "termValue": tags.map((e) => e.value),
                    "logical": "AND"
                })
            }
            ///api call3
            let jobData = []
            let jobId = "000000000000000000"
            if (active === "current-jobs") {
                const payload = {
                    from: 0,
                    size: row,
                    page: page,
                    fetchLevel: "NONE",
                    fetchFirstId:id,
                    canFetchExtraAttribute: true,
                    "searchCriteria": [{
                        "field": "documentType",
                        "value": "JOB_TAG",
                        "operator": "==",
                        "logical": "AND"
                    }, ...searchCriteria]
                }
                res = await jobsService.fetchCurrentJobs(payload)
                jobData = res?.data?.message?.jobBOs || []
                jobId = res?.data?.message?.jobBOs.length ? res?.data?.message?.jobBOs[0]?.jobID : ""
                // setJobList(res?.data?.message?.jobBOs || []);
                // setSelectedJob(res?.data?.message?.jobBOs.length ? res?.data?.message?.jobBOs[0]?.jobID : "")

                // setPageData({
                //     currentPage: page,
                //     rowsPerPage: row,
                //     count: res?.data?.message?.count
                // })
            } else if (active === "your-postings") {

                const payload = {
                    from: 0,
                    size: row,
                    page: page,
                    fetchLevel: "NONE",
                    canFetchExtraAttribute: true,
                    fetchFirstId:id,
                    "searchCriteria": [{
                        "field": "documentType",
                        "value": "JOB_DEFINITION_TAG",
                        "operator": "==",
                        "logical": "AND"
                    }, ...searchCriteria]
                }
                res = await jobsService.fetchJobsByDefinationByYou(payload)
                jobData = res?.data?.message?.jobDefinitionTags || []
                jobId = jobData.length ? jobData[0]?.jobDefinitionId : ""

                // setJobList(res?.data?.message?.jobDefinitionTags || []);
                // setSelectedJob(res?.data?.message?.jobDefinitionTags.length ? res?.data?.message?.jobDefinitionTags[0]?.jobDefinitionId : "")
                // setPageData({
                //     currentPage: page,
                //     rowsPerPage: row,
                //     count: res?.data?.message?.count
                // })
            } else if (active === "current-job-postings") {

                const payload = {
                    from: 0,
                    size: row,
                    page: page,
                    fetchLevel: "NONE",
                    canFetchExtraAttribute: true,
                    fetchFirstId:id,
                    "searchCriteria": [{
                        "field": "documentType",
                        "value": "JOB_DEFINITION_TAG",
                        "operator": "==",
                        "logical": "AND"
                    }, ...searchCriteria]
                }
                res = await jobsService.fetchCurrentJobPosting(payload)
                jobData = res?.data?.message?.jobDefinitionTags || []
                jobId = jobData.length ? jobData[0]?.jobDefinitionId : ""

                // setJobList(res?.data?.message?.jobDefinitionTags || []);
                // setSelectedJob(res?.data?.message?.jobDefinitionTags.length ? res?.data?.message?.jobDefinitionTags[0]?.jobDefinitionId : "")
                // setPageData({
                //     currentPage: page,
                //     rowsPerPage: row,
                //     count: res?.data?.message?.count
                // })
            } else if (active === "current-job-requests") {

                const payload = {
                    from: 0,
                    size: row,
                    page: page,
                    fetchLevel: "NONE",
                    canFetchExtraAttribute: true,
                    fetchFirstId:id,
                    "searchCriteria": [{
                        "field": "documentType",
                        "value": "JOB_TAG",
                        "operator": "==",
                        "logical": "AND"
                    }, ...searchCriteria]
                }
                res = await jobsService.fetchRequestedJobs(payload)
                jobData = res?.data?.message?.jobRequestBOs || []
                jobId = jobData.length ? jobData[0]?.jobRequestId : ""

                // setJobList(res?.data?.message?.jobRequestBOs || []);
                // setSelectedJob(res?.data?.message?.jobRequestBOs.length ? res?.data?.message?.jobRequestBOs[0]?.jobRequestId : "")
                // setPageData({
                //     currentPage: page,
                //     rowsPerPage: row,
                //     count: res?.data?.message?.count
                // })
            } else if (active === "all-job-postings") {

                const payload = {
                    from: 0,
                    size: row,
                    page: page,
                    fetchLevel: "NONE",
                    canFetchExtraAttribute: true,
                    fetchFirstId:id,
                    "searchCriteria": [{
                        "field": "documentType",
                        "value": "JOB_DEFINITION_TAG",
                        "operator": "==",
                        "logical": "AND"
                    }, ...searchCriteria]
                }
                res = await jobsService.fetchAllJobPosting(payload)
                jobData = res?.data?.message?.jobDefinitionTags || []
                jobId = jobData.length ? jobData[0]?.jobDefinitionId : ""

                // setJobList(res?.data?.message?.jobDefinitionTags || []);
                // setSelectedJob(res?.data?.message?.jobDefinitionTags.length ? res?.data?.message?.jobDefinitionTags[0]?.jobDefinitionId : "")
                // setPageData({
                //     currentPage: page,
                //     rowsPerPage: row,
                //     count: res?.data?.message?.count
                // })
            } else if (active === "all-requests") {

                const payload = {
                    from: 0,
                    size: row,
                    page: page,
                    fetchLevel: "NONE",
                    canFetchExtraAttribute: true,
                    fetchFirstId:id,
                    "searchCriteria": [{
                        "field": "documentType",
                        "value": "JOB_TAG",
                        "operator": "==",
                        "logical": "AND"
                    }, ...searchCriteria]
                }
                res = await jobsService.fetchAllJobRequest(payload)
                jobData = res?.data?.message?.jobRequestBOs || []
                jobId = jobData.length ? jobData[0]?.jobRequestId : ""

                // setJobList(res?.data?.message?.jobRequestBOs || []);
                // setSelectedJob(res?.data?.message?.jobRequestBOs.length ? res?.data?.message?.jobRequestBOs[0]?.jobRequestId : "")
                // setPageData({
                //     currentPage: page,
                //     rowsPerPage: row,
                //     count: res?.data?.message?.count
                // })
            } else if (active === "all-jobs") {

                const payload = {
                    from: 0,
                    size: row,
                    page: page,
                    fetchLevel: "NONE",
                    canFetchExtraAttribute: true,
                    fetchFirstId:id,
                    "searchCriteria": [{
                        "field": "documentType",
                        "value": "JOB_TAG",
                        "operator": "==",
                        "logical": "AND"
                    }, ...searchCriteria]
                }
                res = await jobsService.fetchAllJobs(payload)
                jobData = res?.data?.message?.jobBOs || []
                jobId = jobData.length ? jobData[0]?.jobID : ""

                // setJobList(res?.data?.message?.jobBOs || []);
                // setSelectedJob(res?.data?.message?.jobBOs.length ? res?.data?.message?.jobBOs[0]?.jobID : "")
                // setPageData({
                //     currentPage: page,
                //     rowsPerPage: row,
                //     count: res?.data?.message?.count
                // })

            }
            setJobList(jobData);
                setSelectedJob(jobId)
                setPageData({
                    currentPage: page,
                    rowsPerPage: row,
                    count: res?.data?.message?.count
                })
            console.log(res)
        } catch (error) {
            console.warn(error)
        } finally {
            setJobListLoading(false)
        }
    }
    useEffect(() => {
        fetchJobFilters();
        fetchJobs();
    }, [active])

    const refreshList = () => {
        fetchJobs();
    }

    const fetchJobFilters = async () => {
        try {
            const type = ["current-jobs", 'all-jobs'].includes(active) ? "JOBS" : ["your-postings", "current-job-postings", "current-job-requests"].includes(active) ? "ADS" : "JOB_REQUEST"
            const res = await jobsService.fetchJobFilters({ type })
            configureFilters(res?.data?.message || filters)
        } catch (error) {
            console.warn(error)
        }
    }

    const configureFilters = (data) => {
        const { languages, locations, platformTypes, categories, tags } = data;
        const languguagesList = languages?.map(elem => { return { label: elem, value: elem } });
        const locationsList = locations?.map(elem => { return { label: elem, value: elem } });
        const platformsList = platformTypes?.map(elem => { return { label: elem, value: elem } });
        const categoriesList = categories?.map(elem => { return { label: elem, value: elem } });
        const tagsList = tags?.map(elem => { return { label: elem, value: elem } });

        setFilters({
            languages: { ...filters.languages, list: languguagesList },
            locations: { ...filters.locations, list: locationsList },
            platformTypes: { ...filters.platformTypes, list: platformsList },
            categories: { ...filters.categories, list: categoriesList },
            tags: { ...filters.tags, list: tagsList }
        })
    }

    const handleDeleteFilter = (key, innerkey) => {
        const filteritem = filters[key];
        const updatedList = filters[key]?.list?.map(item => {
            if (item.value === innerkey) item.selected = false
            return item
        })
        const updatedFilters = {
            ...filters,
            [key]: { ...filteritem, list: updatedList }
        }
        setFilters(updatedFilters)
    }

    const QuickJobsButton = () => {

        const [isHovered, setIsHovered] = useState(false);
      
        const handleMouseOver = () => {
          setIsHovered(true);
        };
      
        const handleMouseOut = () => {
          setIsHovered(false);
        };
      
        const handleButtonClick = () => {
          navigate('/pastpostedJobs');
        };
      
        return (
          <div
            style={{
              float: 'right',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: isHovered ? '#68e362' : '#4CAF50', // Different background color
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textDecoration: isHovered ? 'underline' : 'none',
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleButtonClick}
          >
            Quick Jobs
          </div>
        );
      };


    return (
        <div className='jobs-container'>
            <div className='jobs-tab'>
                {tabs?.map((tab, index) => {
                    return (
                        <div
                            onClick={() => setActive(tab.value)}
                            className={`tab-item ${active === tab.value ? 'active-tab' : ''}`}
                            key={index}>
                            {tab.label}
                        </div>
                    )
                })}
                <div style={{ marginLeft: 'auto' }}>
                <QuickJobsButton/>
                </div>
            </div>

            <div className='filtered-list'>
                <img src={FilterIcon} alt='filter' className='filter-icon' />
                {Object.keys(filters)?.map((item) => {
                    const filteritem = filters[item];
                    return filteritem?.list?.map((inner, index) => {
                        if (inner.selected) return (
                            <div className='selected-item' key={`${inner.value}${index}`}>
                                {inner.label}
                                <div className='delete' onClick={() => handleDeleteFilter(item, inner.value)}>
                                    <img src={DeleteIcon} alt='delete' />
                                </div>
                            </div>
                        )
                        else return null
                    })
                })}
            </div>

            <div className='details-container'>
                <JobsFilters filters={filters} setFilters={setFilters} fetchJobs={fetchJobs} />
                <JobsList
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                    activeTab={active} jobList={jobList}
                    pageData={pageData}
                    fetchJobs={fetchJobs}
                    loading={jobListLoding} />
                    {console.log('Into Details job : ', selectedJob)}
                <JobDetails selectedJob={selectedJob} activeTab={active} fetchJobs={fetchJobs} refreshList={refreshList}/>
            </div>
        </div>
    )
}

export default Layout(Jobs);