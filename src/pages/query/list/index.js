import React, { useEffect, useState } from "react";
import './style.scss';
import { Button, Card, Input, Modal, Rate, Select, Skeleton, Typography } from "antd";
import { PaperPlaneIcon } from "../../../assets/icons/figmaIcons";
import AskQuestionModal from "./askQuestionModal";
import queryServices from "../../../services/queryService";
import { Pagination } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";

const QueryList = (props) => {
    const param = useParams()
    const [searchParams] = useSearchParams()
    const { activeTab, activateTab, filters, updateSelectedQuery , selectedquestion } = props;
    const [loading, setLoading] = useState(false);
    const [queriesList, setQueriesList] = useState([]);
    const [queryString, setQueryString] = useState("")
    const [askQuestionModal, setAskQuestionModal] = useState(false)
    const [pageData, setPageData] = useState({
        currentPage: 1,
        rowsPerPage: 10,
        count: 0
    })
    console.log(searchParams.get("public") === "true")
    useEffect(() => {
        fetchData(1, pageData.rowsPerPage)
        // na-eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, filters])

    const fetchData = async (currentPage = pageData.currentPage, rowsPerPage = pageData.rowsPerPage) => {
        try {
            setLoading(true)
            let payload = {
                "searchRequest": {
                    "page": currentPage,
                    "size": rowsPerPage
                }
            }
            if (queryString) {
                payload.queryString = queryString
            }
            if (filters.category?.list?.length) {
                filters.category?.list.forEach((e) => {
                    if (e.selected) {
                        if (!payload.category) {
                            payload.category = []
                        }
                        payload.category.push(e.value)
                    }
                })
            }
            if (filters.platform?.list?.length) {
                filters.platform?.list.forEach((e) => {
                    if (e.selected) {
                        if (!payload.platformsStr) {
                            payload.platformsStr = []
                        }
                        payload.platformsStr.push(e.value)
                    }
                })
            }
            if (filters.keywords?.list?.length) {
                filters.keywords?.list.forEach((e) => {
                    if (e.selected) {
                        if (!tags.platformsStr) {
                            tags.platformsStr = []
                        }
                        tags.platformsStr.push(e.value)
                    }
                })
            }
            let res = null
            if (activeTab.current === "gernal_query") {
                // fetchQueryBasedOnSearch(currentPage, rowsPerPage);
                res = await queryServices.fetchqueryBasedOnCatagorySearch(payload, searchParams.get("public") === "true")
            } else if (activeTab.current === "your_query") {
                // fetchQueryAskedByYou(currentPage, rowsPerPage);
                res = await queryServices.queryAskedByYou(payload)
            } else if (activeTab.current === "answered_Query") {
                // fetchQueryRepliedByYou(currentPage, rowsPerPage)
                res = await queryServices.fetchQueryRepliedByYou(payload)
            }
            const queriesList = res?.data?.message?.questionBOs || []
            setPageData({
                currentPage, rowsPerPage, count: res?.data?.message?.count
            })
            setQueriesList(queriesList)
            if (queriesList.length) {
                updateSelectedQuery(queriesList[0].questionID)
            }
        } catch (error) {
            console.warn(error)
        } finally {
            setLoading(false)
        }
    }
    // const fetchQueryBasedOnSearch = async (currentPage = pageData.currentPage, rowsPerPage = pageData.rowsPerPage) => {
    //     try {
    //         setLoading(true)
    //         let payload = {
    //             "searchRequest": {
    //                 "page": currentPage,
    //                 "size": rowsPerPage
    //             }
    //         }
    //         if (queryString) {
    //             payload.queryString = queryString
    //         }
    //         if (filters.category?.list?.length) {
    //             filters.category?.list.forEach((e) => {
    //                 if (e.selected) {
    //                     if (!payload.category) {
    //                         payload.category = []
    //                     }
    //                     payload.category.push(e.value)
    //                 }
    //             })
    //         }
    //         if (filters.platform?.list?.length) {
    //             filters.platform?.list.forEach((e) => {
    //                 if (e.selected) {
    //                     if (!payload.platformsStr) {
    //                         payload.platformsStr = []
    //                     }
    //                     payload.platformsStr.push(e.value)
    //                 }
    //             })
    //         }
    //         if (filters.keywords?.list?.length) {
    //             filters.keywords?.list.forEach((e) => {
    //                 if (e.selected) {
    //                     if (!tags.platformsStr) {
    //                         tags.platformsStr = []
    //                     }
    //                     tags.platformsStr.push(e.value)
    //                 }
    //             })
    //         }
    //         const res = await queryServices.fetchqueryBasedOnCatagorySearch(payload)
    //         const queriesList = res?.data?.message?.questionBOs || []
    //         setPageData({
    //             currentPage, rowsPerPage, count: res?.data?.message?.count
    //         })
    //         setQueriesList(queriesList)
    //         if (queriesList.length) {
    //             updateSelectedQuery(queriesList[0].questionID)
    //         }
    //     } catch (error) {
    //         console.warn(error)
    //     } finally {
    //         setLoading(false)
    //     }

    // }
    // const fetchQueryRepliedByYou = async (currentPage = pageData.currentPage, rowsPerPage = pageData.rowsPerPage) => {
    //     try {
    //         setLoading(true)
    //         let payload = {
    //             "searchRequest": {
    //                 "page": currentPage,
    //                 "size": rowsPerPage
    //             }
    //         }
    //         if (filters.category?.list?.length) {
    //             filters.category?.list.forEach((e) => {
    //                 if (e.selected) {
    //                     if (!payload.category) {
    //                         payload.category = []
    //                     }
    //                     payload.category.push(e.value)
    //                 }
    //             })
    //         }
    //         const res = await queryServices.fetchQueryRepliedByYou(payload)
    //         const queriesList = res?.data?.message?.questionBOs || []
    //         setPageData({
    //             currentPage, rowsPerPage, count: res?.data?.message?.count
    //         })
    //         setQueriesList(queriesList)
    //         if (queriesList.length) {
    //             updateSelectedQuery(queriesList[0].questionID)
    //         }
    //     } catch (error) {
    //         console.warn(error)
    //     } finally {
    //         setLoading(false)
    //     }

    // }
    // const fetchQueryAskedByYou = async (currentPage = pageData.currentPage, rowsPerPage = pageData.rowsPerPage) => {
    //     try {
    //         setLoading(true)
    //         let payload = {
    //             "searchRequest": {
    //                 "page": currentPage,
    //                 "size": rowsPerPage
    //             }
    //         }
    //         if (filters.category?.list?.length) {
    //             filters.category?.list.forEach((e) => {
    //                 if (e.selected) {
    //                     if (!payload.category) {
    //                         payload.category = []
    //                     }
    //                     payload.category.push(e.value)
    //                 }
    //             })
    //         }
    //         const res = await queryServices.queryAskedByYou(payload)
    //         const queriesList = res?.data?.message?.questionBOs || []
    //         setPageData({
    //             currentPage, rowsPerPage, count: res?.data?.message?.count
    //         })
    //         setQueriesList(queriesList)
    //         if (queriesList.length) {
    //             updateSelectedQuery(queriesList[0].questionID)
    //         }
    //     } catch (error) {
    //         console.warn(error)
    //     } finally {
    //         setLoading(false)
    //     }

    // }

    return (
        <>
            <AskQuestionModal isVisible={askQuestionModal} closeModal={() => {
                setAskQuestionModal(false)
                activateTab({
                    ...activeTab,
                    current: activeTab.prev
                })
            }} />
            <div className="queries-list-container">
                <Card style={{ width: "auto", paddingTop: "0", paddingBottom: "0" }} className='query-nav'>
                    <div className='search-input-wrapper' style={{ width: '104%'}}>
                        <Input
                            placeholder='Search query'
                            className='search-input'
                            value={queryString}
                            onChange={(e) => setQueryString(e.target.value)}
                            style={{width: '100%' , 
                                height: '40px'}}
                        />
                        <PaperPlaneIcon onClick={() => fetchData()} />

                    </div>
                    <div className="tab-container">
                        <Button className='tab-btn' onClick={() => {
                            activateTab({
                                current: "gernal_query"
                            })
                        }}>
                            <span className={activeTab?.current === "gernal_query" ? 'tab-active' : ""}>General Query</span>
                        </Button>
                        <Button className='tab-btn' onClick={() => {
                            activateTab({
                                current: "your_query"
                            })
                        }}>
                            <span className={activeTab?.current === "your_query" ? 'tab-active' : ""}>Your Query</span>
                        </Button>
                        <Button className='tab-btn' onClick={() => {
                            activateTab({
                                current: "answered_Query"
                            })
                        }}>
                            <span className={activeTab?.current === "answered_Query" ? 'tab-active' : ""}>Answered Query</span>
                        </Button>
                        <Button className='tab-btn' onClick={() => {
                            setAskQuestionModal(true)
                            activateTab({
                                prev: activeTab.current,
                                current: "answered_Query"
                            })
                        }}>
                            <span className={activeTab?.current === "ask_query" ? 'tab-active' : ""}>Ask</span>
                        </Button>
                    </div>

                </Card >
                {
                    [1, 2, 3]?.map(num => {
                        return (<Skeleton key={num} loading={loading} active />)
                    })
                }

                {
                    queriesList?.map((query, index) => {
                        return (
                            
                            <div className={`query-item ${((selectedquestion === query.questionID)) ? 'selected-query' : ''}`}
                            key={index} onClick={() => updateSelectedQuery(query.questionID)}  >
                                {console.log("Selected Query Item ::", selectedquestion , query.questionID)}
                                <div className="query-tag">
                                    <Typography className="query-tag">{(query?.upvotes) || 0} votes</Typography>
                                    <Typography className="query-tag">{query.answers.length} answers</Typography>
                                    {/* <Typography>NA views</Typography> */}
                                </div>
                                <div>
                                    <div type="button" className="query-question">{query?.title}</div>
                                    <div className="query-question-desc">{query?.body}</div>
                                    <div className="tag-list">
                                        {query?.categoriesStr.split(",")?.map((tag, tagIndex) => {
                                            if (tag == '' || tag == " ") return
                                            return (
                                                <div className="tag-item" key={tagIndex}>{tag}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div>
                    <Pagination
                        count={Math.ceil(pageData.count / pageData.rowsPerPage)}
                        onChange={(e, page) => {
                            fetchData(page, pageData.rowsPerPage)
                        }
                        }
                        page={parseInt(pageData.currentPage)}
                        siblingCount={0}
                        variant="outlined"
                        color="primary"
                        shape="rounded"
                    />
                </div>
            </div >
        </>
    )
}

export default QueryList