import React, { useEffect, useState } from "react";
import './style.scss';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Expand, ExpandMore, Favorite, FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";
import queryServices from "../../../services/queryService";
import CommentsComponent from "./comment";
const AnswerComponent = ({ data, refresh }) => {
    const addCommentToAnswer = async (text, questionId, answerId ) => {
        
        try {
            await queryServices.addCommentToQueryAndAnswer({
                questionID: questionId,
                queryAnswersID: answerId,
                answer:text
            })
            refresh()
        } catch (error) {
            console.warn(error)
        }
    }
    useEffect(() => {
    }, [])
    
    return (<>
        <div className="ans-accord">
            {data && data.map((e, i) => <Accordion key={i} defaultExpanded={i === 0} >
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{ background: '#F6F7F8', wordBreak: "break-word", justifyContent:"space-between" }}
                >
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                    <Typography className="question-title">{e.Answer}</Typography>
                    {e.answerVoteByCaller?.vote ? <FavoriteRounded sx={{fill:"red"}}/> : <FavoriteBorderOutlined sx={{cursor:"pointer"}}  onClick={() => queryServices.upAndDownVoteForAnswer({
                            upvote:true,
                            id:e.queryAnswersID
                        })} />}
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    <div>
                        <div className="question-desc">
                        {e.body}
                        </div>
                        <div className="question-detail-count">
                            <div>{e?.comments?.length} Comments</div>
                            <div>{e.upvotes - e.downvotes} Upvotes</div>
                            {/* <div>{"data.views"} views</div> */}
                            <div>{"data.userName"} asked {"date" || "data?.date?.toLocaleDateString()"}</div>
                        </div>
                        <div className="tag-list">
                            {
                                data?.categoriesStr?.split(",")?.map((tag, tagIndex) => {
                                    if (tag === "" || tag === " ") return  
                                    return <div key={tagIndex} className="tag-item">{tag}</div>
                                })
                            }
                        </div>
                    </div>
                    <CommentsComponent data={e.comments} addComment={(comment) => addCommentToAnswer(comment, e.questionID, e.queryAnswersID)} />
                </AccordionDetails>
            </Accordion>)}
        </div>
    </>)

}

export default AnswerComponent