import React, { useEffect, useState } from "react";
import "./style.scss";
import { Button, Checkbox, Form, Grid, Input, Row, Select, Space } from "antd";
const { Option } = Select;
import onboardService from "../../../services/onboardService";
import { Stack } from "@mui/material";
import { toast } from "react-hot-toast";
import { navigationPageNumber } from "../../Payments/utills";
import { currencyList, currencyList1 } from "../../../config/variables";
import MasterContract from "../../home/JobPostArea/MasterContract";
import MoIndex from "../../../components/mobilePhone";

const OnboardingBasicDetails = ({ handleNext }) => {
  console.log("Into OnboardingBasic Details screen ");
  const [form] = Form.useForm();
  const [basicDetails, setBasicDetails] = useState();
  const [optionLoading, setOptionLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  //const [currencyList1, setCurrencyList1] = useState([]);
  const [acceptTC, setAcceptTC] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const countryCode = (
    <Select defaultValue="+91">
      <Option value="+91">+91</Option>
      <Option value="+92">+92</Option>
    </Select>
  );
  const currency = (
    <>
      {console.log("Into OnboardingBasic Details screen", "INR")}
      <Select
        mode="single"
        allowClear
        placeholder="Currency"
        name="currencyLabel"
        defaultValue={"INR"}
        options={currencyList()}
      />
    </>
  );

  const onFinish = (values) => {
    let data = {
      firstName: values.firstName,
      lastName: values.lastName,
      stakeHolderType: values.stakeHolderType.toString(),
      //mobileNumber: values.mobileNumber,
      mobileNumber: mobileNumber,
      countryCode:values.countryCode,
      emailId: values.emailId,
      gender: values.gender,
      chargePerHour: values.chargePerHour * 100,
      currency: values.currency[0],
    };
    console.log(data);
    console.log(basicDetails);
    if (acceptTC) {
      updateBasicDetails(data);
    } else {
      toast.error("Please accept terms and conditions.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onmobileUpdate = (val , value, data , event) => {
    form.setFieldsValue({
      mobileNumber: val, // Set the desired value
      countryCode: (value === undefined) ? "in" : value.countryCode 
    });
  };

  useEffect(() => {
    fetchBasicDetails();
    //setCurrencyList1(currencyList());
    console.log("basic Details screen ", currencyList1());
  }, []);
  
  useEffect(() => {
    setCounter(counter + 1);
  }, [currencyList1()]);

  useEffect(() => {
    form.setFieldsValue(basicDetails);
    console.log(basicDetails);
  }, basicDetails);

  const onChange = (e) => {
    if (e.target.checked) {
      setAcceptTC(true);
    }
    console.log(`checked = ${e.target.checked}`);
  };

  const fetchBasicDetails = () => {
    setOptionLoading(true);
    onboardService
      .fetchBasicDetails()
      .then((res) => {
        setOptionLoading(false);
        let modData = res.data;
        if (modData && modData["chargePerHour"]) {
          modData["chargePerHour"] = modData["chargePerHour"] / 100;
        }
        if (modData && modData["mobileNumber"]) {
          setMobileNumber(modData["mobileNumber"]);
        }
        setBasicDetails(modData);
      })
      .catch(() => setOptionLoading(false));
  };

  const updateBasicDetails = (payload) => {
    setOptionLoading(true);
    onboardService
      .updateBasicDetails(payload)
      .then((res) => {
        setOptionLoading(false);
        fetchBasicDetails();
        handleNext(navigationPageNumber["platform"]);
      })
      .catch(() => setOptionLoading(false));
  };

  return (
    <div className="onboarding-basicdetails-container">
      <div className="popup arrow-top"></div>
      <div className="onboarding-header">Basic Details</div>
      <Form
        form={form}
        name="basicdetails"
        layout="vertical"
        className="form-container"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className="form-item"
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Firstname is required",
            },
          ]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>
        <Form.Item
          className="form-item"
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Lastname is required",
            },
          ]}
        >
          <Input placeholder="Enter Last Name" />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="Who you are"
          name="stakeHolderType"
          rules={[
            {
              required: true,
              message: "Stakeholder is required",
            },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            options={[
              { label: "Normal User", value: "normal-user" },
              { label: "Influencer", value: "influencer" },
              { label: "Business", value: "businessHolder" },
              { label: "Agency", value: "agency" },
            ]}
          />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="Phone Number"
          name="mobileNumber"
          rules={[
            {
              required: true,
              message: "Phone number is required",
            },
            {
              max: 12,
              message: "Phone number should be 12 digits",
            },
          ]}
        >
          {/* <Input addonBefore={countryCode} placeholder="Enter Phone Number" /> */}
          <MoIndex
            setMobileNumber={setMobileNumber}
            mobileNumber={mobileNumber}
            onmobileUpdate={onmobileUpdate}
          />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="Email"
          name="emailId"
          rules={[
            {
              required: true,
              message: "Email ID is required",
            },
          ]}
        >
          <Input placeholder="Enter Email" readonly="readonly" />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="Gender"
          required
          name="gender"
          rules={[
            {
              required: true,
              message: "Gender is required",
            },
          ]}
        >
          <Select
            allowClear
            placeholder="Please select"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Transgender", value: "others" },
              { label: "Rather not disclose", value: "not_disclosed" },
            ]}
          />
        </Form.Item>

        <Space className="form-item" direction="vertical">
          <Space.Compact>
            <Form.Item
              label="Charges"
              name="chargePerHour"
              rules={[
                {
                  required: true,
                  message: "Amount is required",
                },
              ]}
              initialValue="1000"
            >
              <Input placeholder="Enter Charge" type="number" />
            </Form.Item>

            <Form.Item
              key={counter}
              label="Currency"
              name="currency"
              rules={[
                {
                  required: true,
                  message: "Currency is required",
                },
              ]}
              initialValue={["INR"]}
            >
              {console.log("Into onboarding basic Details")}
              <Select
                mode="single"
                isSearchable={true}
                allowClear
                showSearch={true}
                placeholder="Currency"
                name="currency"
                defaultValue={"INR"}
                options={currencyList()}
              />
            </Form.Item>
          </Space.Compact>
        </Space>

        <Row style={{ width: "100%", marginLeft: 16 }}>
          <Form.Item>
            <Checkbox name="termsandconditions" onChange={onChange}>
              I accept and agree to the general
              <a
                href="https://influozy.com/terms-and-conditions/"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                {" "}
                terms and conditions{" "}
              </a>{" "}
              of use.
            </Checkbox>{" "}
            <br></br>
          </Form.Item>
        </Row>

        <Row style={{ width: "100%", marginTop: -16, marginLeft: 16 }}>
          <Form.Item>
            <Checkbox name="notifications">
              I want to reveive e-notifications.
            </Checkbox>
          </Form.Item>
        </Row>

        <Form.Item style={{ margin: "auto" }} className="form-item">
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 20, width: "200px" }}
            >
              Continue
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OnboardingBasicDetails;
