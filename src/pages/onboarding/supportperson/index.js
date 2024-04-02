import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Grid,
  Input,
  Row,
  Select,
  Col,
} from "antd";
import onboardService from "../../../services/onboardService";
import SupportPersonCard from "./supportPersonCard";
import { Box, CardContent } from "@mui/material";
import { navigationPageNumber } from "../../Payments/utills";
import MoIndex from "../../../components/mobilePhone";
const { Option } = Select;

const OnboardingSupportPerson = ({ handleNext }) => {
  const ref = useRef(null);
  const [supportPesonsList, setSupportPesonsList] = useState([{}]);
  const [optionLoading, setOptionLoading] = useState(true);
  const [addSupportPerson, setAddSupportPerson] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState({});
  const [mobileNumber, setMobileNumber] = useState("");

  const [form] = Form.useForm();

  const style = {
    background: "#0092ff",
    padding: "8px 0",
  };

  const countryCode = (
    <Select defaultValue="+91">
      <Option value="+91">+91</Option>
      <Option value="+92">+92</Option>
    </Select>
  );

  const onmobileUpdate = (val , value, data , event ) => {
    form.setFieldsValue({
      mobileNumber: val, // Set the desired value
      countryCode: (value === undefined) ? "in" : value.countryCode 
    });
  };

  const onFinish = (values) => {
    let data = {
      addressKey: values.name,
      name: values.name,
      firstName: values.firstName,
      lastName: values.lastName,
      mobileNumber: values.mobileNumber,
      countryCode:values.countryCode,
      emailId: values.emailId,
      gender: values.gender,
      supportTime: values.supportTime,
      workTime: values.workTime,
      parentContactAddressType: "SUPPORT",
    };
    if (selectedPerson && selectedPerson.contactAddressId) {
      data["contactAddressId"] = selectedPerson.contactAddressId;
    }
    createSupportPersons(data);
    setAddSupportPerson(false);
  };

  const setSupportPerson = (person) => {
    setAddSupportPerson(false);
    form.setFieldsValue(person);
    setSelectedPerson(person);
    setMobileNumber(person.mobileNumber);

    setAddSupportPerson(true);
  };

  const onFinishFailed = () => {
    console.log("falied");
  };

  function clickAddSupportPerson() {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    form.resetFields();
    setSelectedPerson({});
    setAddSupportPerson(true);
  }

  useEffect(() => {
    fetchSupportPersons();
  }, []);

  const fetchSupportPersons = () => {
    setOptionLoading(true);
    onboardService
      .fetchSupportPersons()
      .then((res) => {
        setOptionLoading(false);
        if (res.data.message) {
          setSupportPesonsList([...[{}], ...res.data.message]);
        }
      })
      .catch(() => setOptionLoading(false));
  };

  const createSupportPersons = (payload) => {
    setOptionLoading(true);
    onboardService
      .createSupportPersons(payload)
      .then((res) => {
        setOptionLoading(false);
        fetchSupportPersons();
        handleNext(navigationPageNumber["kyc"]);
      })
      .catch(() => setOptionLoading(false));
  };

  const handleSkip = () => {
    handleNext(navigationPageNumber["kyc"]);
  };

  return (
    <>
      <div className="onboarding-basicdetails-container">
        <div className="addCardSupportPerson">
          <ul>
            {supportPesonsList &&
              supportPesonsList.map((person) => (
                <>
                  <li key={person["contactAddressId"]}>
                    {person && person["contactAddressId"] ? (
                      <>
                        <SupportPersonCard
                          setSupportPerson={setSupportPerson}
                          supportPesonsList={person}
                        />
                      </>
                    ) : (
                      <Box m={1} sx={{ cursor: "pointer" }}>
                        <Card
                          variant="outlined"
                          sx={{ width: "100%", height: 180 }}
                          onClick={clickAddSupportPerson}
                        >
                          <CardContent>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: 50,
                                paddingBottom: 16,
                              }}
                            >
                              <b>Add Support Person</b>
                            </div>
                          </CardContent>
                        </Card>
                      </Box>
                    )}
                  </li>
                </>
              ))}
          </ul>
          <div ref={ref}></div>
        </div>

        {addSupportPerson && (
          <>
            {selectedPerson.name ? (
              <div className="onboarding-header">Edit Support Person</div>
            ) : (
              <div className="onboarding-header">Add Support Person</div>
            )}

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
                label="Support Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Support name is required",
                  },
                ]}
              >
                <Input
                  placeholder="Enter support Name"
                  disabled={selectedPerson.name}
                />
              </Form.Item>

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
                <Input placeholder="Enter First Name" name="firstName" />
              </Form.Item>

              <Form.Item
                className="form-item"
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Lasttime is required",
                  },
                ]}
              >
                <Input placeholder="Enter Last Name" />
              </Form.Item>

              <Form.Item
                className="form-item"
                label="Phone Number"
                name="mobileNumber"
                rules={[
                  {
                    required: true,
                    message: "Mobile number is required",
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
                label="Enter Email ID"
                name={"emailId"}
                rules={[
                  {
                    required: true,
                    message: "Email ID is required",
                  },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>

              <Form.Item
                className="form-item"
                label="Support Type"
                rules={[
                  {
                    required: true,
                    message: "Support type is required",
                  },
                ]}
              >
                <Select
                  mode="single"
                  allowClear
                  placeholder="Please select support type"
                  defaultValue={[]}
                  options={[
                    { label: "Content", value: "content" },
                    { label: "Issues", value: "issues" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                className="form-item"
                label="Working Days"
                name={"days"}
                rules={[
                  {
                    required: true,
                    message: "Working days is required",
                  },
                ]}
              >
                <Input placeholder="Enter working days" />
              </Form.Item>

              <Form.Item
                className="form-item"
                label="Work Time"
                name={"workTime"}
                rules={[
                  {
                    required: true,
                    message: "Work time is required",
                  },
                ]}
              >
                <Input placeholder="Enter work time" />
              </Form.Item>

              <Form.Item
                className="form-item"
                label="Support Time"
                name={"supportTime"}
                rules={[
                  {
                    required: true,
                    message: "Support time is required",
                  },
                ]}
              >
                <Input placeholder="Enter support time" />
              </Form.Item>

              <Form.Item
                className="form-item"
                label="Gender"
                name={"gender"}
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

              <Row style={{ width: "100%" }}>
                <Form.Item style={{ margin: "auto" }}>
                  <div style={{ margin: "auto" }}>
                    {selectedPerson.name ? (
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: 20, width: "200px" }}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: 20, width: "200px" }}
                      >
                        Add Support Person
                      </Button>
                    )}

                    <Button
                      style={{ marginLeft: 20, width: "200px" }}
                      onClick={handleSkip}
                    >
                      Skip
                    </Button>
                  </div>
                </Form.Item>
              </Row>
            </Form>
          </>
        )}
      </div>
    </>
  );
};

export default OnboardingSupportPerson;
