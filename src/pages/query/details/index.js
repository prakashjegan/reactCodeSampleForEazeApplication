import React, { useEffect, useState } from "react";
import './style.scss';
import { Button, Rate, Skeleton, Typography } from "antd";
import { FavoriteBorderOutlined, FavoriteRounded, Send, ShareOutlined } from "@mui/icons-material";
import { Avatar, Input, Pagination, TextField } from "@mui/material";
import queryServices from "../../../services/queryService";
import CommentsComponent from "./comment";
import AnswerComponent from "./answerDetails";
import { useSearchParams } from "react-router-dom";

const QueryDetails = (props) => {
    const [searchParams] = useSearchParams()
    const { selectedquestion } = props;
    const user = JSON.parse(localStorage.getItem("user"))
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({});
    const [partnerData, setParternerData] = useState([])
    const [inputAnswer, setInputAnswer] = useState({
        title: "",
        body: ""
    });

    const addCommentToQuestion = async (id, text) => {
        try {
             await queryServices.addCommentToQuery({
                questionID: id,
                answer: text
            })
            fatchQueryData()
        } catch (error) {
            console.warn(error)
        }
    }

    const answerToQuery = async (id, ans) => {
        try {
            await queryServices.addAnswerToQuery({
                questionID: id,
                body: ans.body,
                answer:ans.title

            })
            fatchQueryData()
        } catch (error) {
            console.warn(error)
        }
    }
    useEffect(() => {
        selectedquestion && fatchQueryData();
        // na-eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedquestion])
    
    const fatchQueryData = () => {
        setLoading(true);
        queryServices.fetchQueryById({ id: selectedquestion }, searchParams.get("public") === "true")
            .then(res => {
                setDetails(res?.data?.message?.questionBOs[0])
                setParternerData(res?.data?.message?.partners)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }
    return (
        <div className="queries-details-container">
            {[1, 2, 3]?.map(num => {
                return (<Skeleton key={num} loading={loading} active />)
            })}

            {!loading && details.questionID && <div className="detail-section">
                <div className="section-header">
                    <div className="cat-name">{details.categoriesStr || ""}</div>
                    <div style={{display:"flex"}}>
                        {details.queryVoteByCaller?.vote ? <FavoriteRounded sx={{fill:"red"}}/> : <FavoriteBorderOutlined sx={{cursor:"pointer"}}  onClick={() => queryServices.upAndDownVoteForQuestion({
                            upvote:true,
                            id:details.questionID
                        })} />}
                        <ShareOutlined />
                    </div>
                </div>
                <div className="question-detail-container">
                    <div className="question-container" >
                        <h3 className="question-title">{details.title}</h3>
                        <Typography className="question-desc"> {details.body} </Typography>
                    </div>
                    <div className="question-detail-count">
                        <div>{details.answers?.length} Answers</div>
                        <div>{details.upvotes} Upvotes</div>
                        {/* <div>{"NA"} views</div> */}
                        <div>{partnerData.find((partner) => partner.partnerId === details.partnerId)?.userName} asked {new Date(details.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="tag-list">
                        {
                            details?.categoriesStr?.split(",")?.map((tag, tagIndex) => {
                                if (tag === "" || tag === " ") return
                                return <div key={tagIndex} className="tag-item">{tag}</div>
                            })
                        }
                    </div>

                </div>
                <CommentsComponent data={details.comments} addComment={(e) => addCommentToQuestion(details.questionID, e)} />
                {/* =============detail Answer Acordian ============= */}

                <AnswerComponent data={details.answers} refresh={() => fatchQueryData()} />

                {/* ====================== Answring Panle =========================== */}
                <div className="answering-panel">
                    <div className="answering-user" > <Avatar sx={{ width: 24, height: 24 }} src={user?.userPictureLink || ""} /> {user?.userName} </div>
                    <form style={{ width: "100%" }}>
                        <Input className="answring-title-input" value={inputAnswer.title || ""} placeholder="Answer title" onChange={(e) => setInputAnswer((prev) => {
                            const prevData = { ...prev }
                            prevData.title = e.target.value
                            return prevData
                        })} />
                        <TextField minRows={5} maxRows={7} value={inputAnswer.body || ""} className="answering-ans-input" onChange={(e) => setInputAnswer((prev) => {
                            const prevData = { ...prev }
                            prevData.body = e.target.value
                            return prevData
                        })} multiline placeholder="Answer " />
                        <div className="btns-container">
                            <Button type="text" >Cancel</Button>
                            <Button type="primary" shape="round" onClick={() => {
                                answerToQuery(details.questionID, inputAnswer)
                                setInputAnswer({
                                    title: "",
                                    body: ""
                                })
                            }}>Add Answer</Button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    )
}

export default QueryDetails