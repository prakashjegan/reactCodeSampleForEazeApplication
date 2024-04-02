import { Avatar } from "@mui/material"
import { Modal, Rate } from "antd"
import "./style.scss"
import varifidImg from "./../socialImages/varified.png"
import { useEffect, useState } from "react"
import userService from "../../../services/userService"
import socialImages from "../socialImages/index"
import { Link, NavLink, useParams } from "react-router-dom"
import { Details } from "@mui/icons-material"

const SingleUserModal = ({isVisible, closeModal }) => {
    const [childData, setChildData] = useState([])
    const [data, setdata] = useState([])
    const param = useParams()
    console.log(param)

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
        }
        if (remainingNumber >= 1000) {
            const thousands = Math.floor((remainingNumber) / 1000);
            remainingNumber = remainingNumber - (thousands * 1000);

            formatted += `${thousands}K `;
        }
        if (remainingNumber > 0) {
            formatted += `${remainingNumber}`;
        }
        return formatted;

    };

    const getChildData = async () => {
        if (isVisible) {
            try {
                const j = await userService.fetchUserData({
                    "from": 0,
                    "size": 20,
                    "fetchLevel": "PLATFORM",
                    "searchCriteria": [
                        {
                            "field": "documentType",
                            "value": "PARTNER_TAG",
                            "operator": "==",
                            "logical": "AND"
                        },
                        {
                            "field": "partnerId",
                            "value": [`${param.partnerId}`],
                            "operator": "in",
                            "logical": "AND"
                        }
                    ]

                })
                j.data.message.partnerTags && setdata(j.data.message.partnerTags[0])
                j.data.message.platformTagSers && setChildData(j.data.message.platformTagSers)
                console.log(j.data.message)
                // setCount(parseInt(j?.data?.message?.count))

            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        getChildData()
    }, [isVisible])
    return <Modal
        title="Details"
        open={isVisible}
        // centered
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        onOk={() => closeModal()}
        width={800}
        onCancel={() => {
            closeModal()
        }}
    >
        <div className="prent-user-container">
            <div style={{maxWidth:'100px'}}>
                <Avatar alt="Remy Sharp" src={data.logoLink || ""} sx={{ width: 60, height: 60 }} />
                <div style={{fontSize : '8px' , fontWeight:'bold', width:'100px'}}>{data.userName || ""}</div>
            </div>
            <div className="parent-data-container">
                <div><h4>{data.totalJobs || 0} success project</h4><img src={varifidImg} />Project Verified</div>
                <div><h4>Total Subscribers</h4><img src={varifidImg} />  {formatNumber(data.totalFollowers || 0)}</div>
                <div><h4>Total Views</h4><img src={varifidImg} />  {formatNumber(data.totalViews || 0)}</div>
                <div>
                    <h4>Rating</h4>
                    <h5>{(data.averageReview / 20).toFixed(2)} of {data.totalReviews} reviews</h5>
                    <Rate allowHalf disabled defaultValue={(data.averageReview / 20).toFixed(2) || 0} />
                </div>
                <div><h4>{data.currentJobs || 0} Current project</h4><img src={varifidImg} />Project Verified</div>
                <div><h4>Total Amount Spent</h4><img src={varifidImg} />  {formatNumber(data.totalBudgetAmountSpent || 0)}</div>
                <div><h4>Total Job Posting</h4><img src={varifidImg} />  {formatNumber(data.totalJobPosting || 0)}</div>
            </div>
        </div>
        <div>
            {
                childData.map((e, i) => {
                    return <div key={i} className="child-constainer">
                        <div style={{display:"flex"}}>
                            <div style={{maxWidth:'100px', minWidth:"100px"}}>
                            <img alt="Plateform" src={e.platformType ? (socialImages[e.platformType.toLowerCase()] || "") : ""} style={{ width: "60px", height: "60px" }} />
                                <Link to={e.publicLink} target="_" style={{display:"flex", wordBreak:"break-all", alignItems:"center", gap:"0.3rem", color:"black" , fontSize : '8px', fontWeight:'bold'}}><img src={varifidImg} style={{width:"12px", height:"12px" , fontSize : '8px'}} />{e.platformName || ""}</Link>
                            </div>
                            <div className="child-data-container">
                                <div><h4>{e.totalJobs || 0} success project</h4><img src={varifidImg} />Project Verified</div>
                                <div><h4>Total Subscribers</h4><img src={varifidImg} />  {formatNumber(e.totalFollowers || 0)}</div>
                                <div><h4>Total Views</h4><img src={varifidImg} />  {formatNumber(e.totalView || 0)}</div>
                                <div><h4>Audience - Meta</h4><img src={varifidImg} />  F/M - 1 to 100</div>
                                <div>
                                    <h4>Rating</h4>
                                    <h5>{(e.averageReview / 20).toFixed(2)} of {e.totalReviews} reviews</h5>
                                    <Rate allowHalf disabled defaultValue={(e.averageReview / 20).toFixed(2) || 0} />
                                </div>
                            </div>
                            
                        </div>
                        <div className="tag-container">
                            {
                                e?.tag?.split(",")?.map((tag, tagIndex) => {
                                    if (tag === "" || tag === " ") return  
                                    return <div key={tagIndex} className="tag-item">{tag}</div>
                                })
                            }
                            </div>
                    </div>
                })
            }
        </div>
    </Modal>
}

export default SingleUserModal