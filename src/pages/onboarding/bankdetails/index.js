import React, { useEffect, useState } from "react";
import './style.scss';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Grid, Input, Row, Select } from 'antd';
import onboardService from "../../../services/onboardService";
import { toast } from "react-hot-toast";
const { Option } = Select;

const OnboardingBankDetails = () => {

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [bankDetails, setBankDetails] = useState();
    const [optionLoading, setOptionLoading] = useState(true);

    const onFinish = (values) => {
        let data = {
            bankAccountHolderName: values.bankAccountHolderName,
            bankName: values.bankName,
            accountNummber: values.accountNummber,
            ifscCode: values.ifscCode,
            upi: values.upi,
            accountnumber2: values.accountnumber2
        }
        console.log(data);

        if (values.accountNummber == values.accountnumber2) {
            updateBankDetails(data);
        } else {
            toast.error("Account numbers mismatched, please enter again..!")

        }

    }

    useEffect(() => {
        fetchBankDetails();
    }, [])

    useEffect(() => {
        form.setFieldsValue(bankDetails);
        console.log(bankDetails);
    }, [bankDetails])


    const fetchBankDetails = () => {
        setOptionLoading(true);
        onboardService.fetchBankDetails()
            .then((res) => {
                setOptionLoading(false);
                setBankDetails(res.data.message[0])
            }).catch(() => { setOptionLoading(true) })
    }

    const updateBankDetails = (payload) => {
        setOptionLoading(true);
        onboardService.updateBankDetails(payload)
            .then((res) => {
                setOptionLoading(false);
                fetchBankDetails();
                console.log(bankDetails);
                navigate('/home');
            })
            .catch(() => { setOptionLoading(true) })
    }


    const onFinishFailed = () => {
        console.log('Failed:', errorInfo);

    }

    return (
        <div className="div1">
            <div className="container">
                <div className="onboarding-header">Bank Details</div>
                <Form form={form} name="bankdetails" layout="vertical" className="form-container" onFinish={onFinish} onFinishFailed={onFinishFailed} >

                    <Form.Item
                        className="form-item"
                        label="Account Holder Name"
                        name="bankAccountHolderName"
                        rules={[
                            {
                                required: true,
                                message: 'Account holder name is required',
                            },
                        ]}>
                        <Input placeholder="Enter Account Holder Name" />
                    </Form.Item>

                    <Form.Item
                        className="form-item"
                        label="Bank Name"
                        name="bankName"
                        rules={[
                            {
                                required: true,
                                message: 'Bank name is required',
                            },
                        ]}>
                        <Input placeholder="Enter Bank Name" />
                    </Form.Item>

                    <Form.Item
                        className="form-item"
                        label="Account Number"
                        name={'accountNummber'}
                        rules={[
                            {
                                required: true,
                                message: 'Account Number is required',
                            },
                        ]}>
                        <Input type="password" placeholder="Enter Account Number" />
                    </Form.Item>

                    <Form.Item
                        className="form-item"
                        label="Confirm Account Number"
                        name={'accountnumber2'}
                        rules={[
                            {
                                required: true,
                                message: 'Enter account number again',
                            },
                        ]}>
                        <Input placeholder="Re-enter Account Number" type="number" />
                    </Form.Item>


                    <Form.Item
                        className="form-item"
                        label="IFSC Code"
                        name={'ifscCode'}
                        rules={[
                            {
                                required: true,
                                message: 'IFSC code is required',
                            },
                        ]}>
                        <Input placeholder="Enter IFSC Code" />
                    </Form.Item>

                    <div style={{ fontWeight: "bold", marginBottom: 2 }}>UPI Details</div>

                    <Form.Item
                        className="form-item"
                        label="UPI ID"
                        name={'upi'}
                        rules={[
                            {
                                required: true,
                                message: 'UPI is required',
                            },
                        ]}>
                        <Input placeholder="Enter UPI ID" />
                    </Form.Item>

                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>

        </div>


    )
}

export default OnboardingBankDetails