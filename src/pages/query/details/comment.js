import React, { useEffect, useState } from "react";
import './style.scss';
import { Pagination, TextField } from "@mui/material";
import { Button } from "antd";
import { Send } from "@mui/icons-material";
const CommentsComponent = ({ data, addComment }) => {
    const [pageData, setPageData] = useState({
        currentPage: 1
    })
    const [inputComment, setInputComment] = useState("")

    useEffect(() => {
    }, [])

    return (<>
        {data?.length ? <div className="comment-container">
            {/* {props?.data?.splice((pageData.currentPage - 1) * 2, 2)?.map((e, i) => {
                return <div key={i}>{e.body}  - <span className="comment-user">see {"not provided"}  {e.createdAt ? new Date(e.createdAt).toDateString() : ""} at  {e.createdAt ? new Date(e.createdAt).toLocaleTimeString() : ""}</span></div>
            })} */}
            {[...data].splice((pageData.currentPage - 1) * 2, 2)?.map((e, i) => {
                return <div key={i} className="comment-item">{e.Answer}  - <span className="comment-user">see {"not provided"}  {e.createdAt ? new Date(e.createdAt).toDateString() : ""} at  {e.createdAt ? new Date(e.createdAt).toLocaleTimeString() : ""}</span></div>
            })}
            <div className="dataTable-footer">
                <Pagination
                    count={Math.ceil(data?.length / 2)}
                    onChange={(e, page) => {
                        setPageData({
                            currentPage: page
                        })
                    }
                    }
                    page={parseInt(pageData.currentPage)}
                    siblingCount={0}
                    variant="outlined"
                    color="primary"
                    shape="rounded"
                />
            </div>

        </div> : <></>}
        <div className="comment-sec" >
            <TextField value={inputComment || ""} className="comment-input" multiline={true} variant="standard" style={{ width: "100%" }}
                onChange={(e) => setInputComment(e.target.value)}
                placeholder="Add Comments" />
            <Button onClick={async() => {
                await addComment(inputComment)
                setInputComment("")
            }} ><Send /></Button>
        </div>
    </>)

}

export default CommentsComponent