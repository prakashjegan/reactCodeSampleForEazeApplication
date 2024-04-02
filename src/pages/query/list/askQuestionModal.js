
import { useEffect, useState } from "react"
import { Avatar, Button, Modal, Select } from 'antd';
import './style.scss';
import { Input, TextField } from "@mui/material";
import TextArea from "antd/es/input/TextArea";
import queryServices from "../../../services/queryService";

const AskQuestionModal = ({ isVisible, closeModal }) => {
    const [questionData, setQuestionData] = useState({
        platforms: [],
        categories: [],
        title: "",
        body: ""
    })
    const user = JSON.parse(localStorage.getItem("user"))
    const [categoryOptions, setCategoryOptions] = useState([])
    const submitQuestion = async() => {
        // if (questionData) return
        try {
            const payload = {}
            payload.title = questionData.title
            payload.body = questionData.body
            if (questionData.categories.length) {
                payload.categoriesStr = questionData.categories.map((e) => e.value).toString()
            }
            // if (questionData.platforms.length) {
            //     payload.platforms = questionData.platforms.map((e) => e.value)
            // }

            await queryServices.askQuery(payload)
            closeModal()
        } catch (error) {
            console.warn(error)
        }
    }
    useEffect(() => {
        setCategoryOptions(JSON.parse(localStorage.getItem("categories")))
    }, [])
    return <>
        <Modal
            title="Add question"
            open={isVisible}
            centered
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            onOk={() => closeModal()}
            className="ask_modal"
            onCancel={() => {
                closeModal()
            }}
        >
            <div className="ask-modal-header">
                <div className="answering-user" > <Avatar src={user.userPictureLink || ""} size="small" /> {user.userName} </div>
                {/* <Select
                    labelInValue
                    value={questionData.visibility}
                    style={{
                        width: 120,
                    }}

                    onChange={(e) => setQuestionData({ ...questionData, visibility: e })}
                    options={[
                        {
                            value: 'public',
                            label: 'public',
                        },
                        {
                            value: 'private',
                            label: 'private',
                        },
                    ]}
                /> */}
                {/* <Select
                    labelInValue
                    allowClear
                    mode="tags"
                    placeholder="Platforms"
                    value={questionData.platforms}
                    style={{
                        width: 120,
                    }}
                    onChange={(e) => setQuestionData({...questionData, "platforms":e})}
                    options={categoryOptions}
                /> */}
                <Select
                    labelInValue
                    allowClear
                    mode="tags"
                    placeholder="Category"
                    value={questionData.categories}
                    style={{
                        minWidth: 120
                    }}
                    // onChange
                    onChange={(e) => setQuestionData({...questionData, "categories":e})}
                    options={categoryOptions}
                />
            </div>
            <div className="answering-panel">

                <Input className="answring-title-input" onChange={(e) => setQuestionData({
                    ...questionData, title: e.target.value
                })} placeholder="Query title" />
                <TextArea rows={4} className="answering-ans-input" placeholder="quer detail" onChange={(e) => setQuestionData({
                    ...questionData, body: e.target.value
                })} />
                <div className="btns-container">
                    <Button type="text" onClick={() => {
                        closeModal()
                    }} >Cancel</Button>
                    <Button type="primary" shape="round" onClick={async () => {
                        submitQuestion()
                    }}  >Add Question</Button>
                </div>
            </div>
        </Modal>
    </>
}

export default AskQuestionModal