import React, { useEffect, useState } from "react";
import "./style.scss";
import { Button, Checkbox, Form, Grid, Input, Row, Select } from "antd";
import onboardService from "../../../services/onboardService";
import AddressCard from "./addressCard";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { center } from "@antv/g2plot/lib/plots/sankey/sankey";
import { useRef } from "react";
import { navigationPageNumber } from "../../Payments/utills";
import { PaperPlaneIcon } from "../../../assets/icons/figmaIcons";

const OnboardingAddress = ({ handleNext }) => {
  const ref = useRef(null);

  const [form] = Form.useForm();
  const [addressList, setAddressList] = useState([{}]);
  const [optionLoading, setOptionLoading] = useState(true);
  const [addAddress, setAddAddress] = useState(false);
  const [addressTypeList, setAddressTypeList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [countryData, setCountryData] = useState([]);

  const onFinish = (values) => {
    let data = {
      addressKey: values.name,
      name: values.name,
      contactAddressType: values.contactAddressType,
      streetName: values.streetName,
      houseNumber: values.houseNumber,
      postalCode: values.postalCode,
      city: values.city,
      state: values.state,
      streetAddress3: values.streetAddress3,
      country: values.country,
      parentContactAddressType: "CONTACT",
    };
    if (selectedAddress && selectedAddress.addressKey) {
      data["addressKey"] = selectedAddress.addressKey;
    }
    console.log(values.addressType);
    updateAddress(data);
    setAddAddress(false);
  };

  const onFinishFailed = () => {
    console.log("Failed");
  };

  useEffect(() => {
    fetchAddress();
    setAddressTypeList(
      JSON.parse(localStorage.getItem("LocalStorage_contactTypes"))
    );
    setLocationData(JSON.parse(localStorage.getItem("location")));

    let y = JSON.parse(localStorage.getItem("location"));

    console.log(y[1]["country_name"]);

    let newArray = [];

    let uniqueObject = {};

    for (let i in y) {
      let objTitle = y[i]["country_name"];

      // Use the title as the index
      uniqueObject[objTitle] = y[i];
    }

    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }

    setCountryData(newArray);
    console.log(countryData);
  }, []);

  const clickAddAddress = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    form.resetFields();
    setSelectedAddress({});
    setAddAddress(true);
  };

  const fetchAddress = () => {
    setOptionLoading(true);
    onboardService
      .fetchAddress()
      .then((res) => {
        setOptionLoading(false);
        if (res.data.message) {
          setAddressList([...[{}], ...res.data.message]);
        }
      })
      .catch(() => {
        setOptionLoading(false);
      });
  };

  const updateAddress = (payload) => {
    setOptionLoading(true);
    onboardService
      .updateAddress(payload)
      .then((res) => {
        setOptionLoading(false);
        fetchAddress();
        handleNext(navigationPageNumber["supportPerson"]);
      })
      .catch(() => {
        setOptionLoading(false);
      });
  };

  const setAddress = (address) => {
    setAddAddress(false);
    form.setFieldsValue(address);
    setSelectedAddress(address);
    setAddAddress(true);
  };

  const handleSkip = () => {
    handleNext(navigationPageNumber["supportPerson"]);
  };

  return (
    // <div className="onboarding-address-container">Address</div>

    <div className="onboarding-basicdetails-container">
      <div className="addCardAddress">
        <ul>
          {addressList &&
            addressList.map((address) => (
              <li key={address["contactAddressId"]}>
                <>
                  {address && address["contactAddressId"] ? (
                    <>
                      <AddressCard
                        setAddress={setAddress}
                        addressList={address}
                      />
                    </>
                  ) : (
                    <div>
                      <Box m={1} sx={{ cursor: "pointer" }}>
                        <Card
                          sx={{
                            width: "220px",
                            height: 216,
                            borderRadius: "4px",
                          }}
                          onClick={clickAddAddress}
                        >
                          <CardContent>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: 60,
                              }}
                            >
                              <b>Add Address</b>
                            </div>
                          </CardContent>
                        </Card>
                      </Box>
                    </div>
                  )}
                </>
              </li>
            ))}
        </ul>
      </div>

      {addAddress && (
        <>
          {selectedAddress.addressKey ? (
            <div className="onboarding-header">Edit Address</div>
          ) : (
            <div className="onboarding-header">Add Address</div>
          )}

          <Button type="primary" htmlType="submit" style={{ width: "200px" }}>
            Use My Location
          </Button>

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
              label="Address Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Address name is required",
                },
              ]}
            >
              <Input
                placeholder="Enter Address Name"
                disabled={selectedAddress.addressKey}
              />
            </Form.Item>

            <Form.Item
              className="form-item"
              label="Address Type"
              name="contactAddressType"
              rules={[
                {
                  required: true,
                  message: "Address type is required",
                },
              ]}
            >
              {addressTypeList && (
                <Select placeholder="Select address type">
                  {addressTypeList.map((addressType, index) => (
                    <Select key={index} value={addressType}>
                      {addressType}
                    </Select>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Row style={{ width: "100%" }}>
              <Form.Item
                className="form-item"
                label="Address line"
                name={"streetAddress3"}
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Address line is required",
                  },
                ]}
              >
                <Input placeholder="Enter Address" style={{ height: "50px" }} />
              </Form.Item>
            </Row>

            <Form.Item
              className="form-item"
              label="Street Name"
              name="streetName"
              rules={[
                {
                  required: true,
                  message: "Street name is required",
                },
              ]}
            >
              <Input placeholder="Enter Street Name" />
            </Form.Item>

            <Form.Item
              className="form-item"
              label="House Number"
              name="houseNumber"
              rules={[
                {
                  required: true,
                  message: "House number is required",
                },
              ]}
            >
              <Input placeholder="Enter House Number" />
            </Form.Item>

            <Form.Item
              className="form-item"
              label="ZIP/Postal Code"
              name="postalCode"
              rules={[
                {
                  required: true,
                  message: "Postal code is required",
                },
              ]}
            >
              <Input placeholder="Enter Postal Code" />
            </Form.Item>

            <Form.Item
              className="form-item"
              label="City"
              name={"city"}
              rules={[
                {
                  required: true,
                  message: "City is required",
                },
              ]}
            >
              <Input placeholder="Enter City Name" />
            </Form.Item>

            <Form.Item
              className="form-item"
              label="State"
              name={"state"}
              rules={[
                {
                  required: true,
                  message: "State is required",
                },
              ]}
            >
              <Select placeholder="Select state" showSearch={true}>
                {locationData.map((location, index) => (
                  <Select key={index} value={location["name"]}>
                    {location["name"]}
                  </Select>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              className="form-item"
              label="Country"
              name={"country"}
              rules={[
                {
                  required: true,
                  message: "Country is required",
                },
              ]}
            >
              <Select placeholder="Select country">
                {countryData.map((location) => (
                  <Select key={location} value={location["country_name"]}>
                    {location["country_name"]}
                  </Select>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="form-item" label="Latitude" name={"latitude"}>
              <Input placeholder="Enter Latitude" />
            </Form.Item>

            <Form.Item
              className="form-item"
              label="Longitude"
              name={"longitude"}
            >
              <Input placeholder="Enter Longitude" />
            </Form.Item>

            <div style={{ margin: "auto" }}>
              {selectedAddress.addressKey ? (
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
                  Add Address
                </Button>
              )}

              <Button
                style={{ marginLeft: 20, width: "200px" }}
                onClick={handleSkip}
              >
                Skip
              </Button>
            </div>
          </Form>
        </>
      )}
      <div ref={ref}></div>
    </div>
  );
};

export default OnboardingAddress;
