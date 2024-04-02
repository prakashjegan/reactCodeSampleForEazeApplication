import {
  Box,
  MenuList,
  Paper,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import {
  Button,
  DatePicker,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Space,
  Divider,
  Col,
  Switch,
  Card,
} from "antd";
// import DatePicker from '@mui/lab/DatePicker';

import { useLocation, useSearchParams } from "react-router-dom";
import moment from "moment";

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Previews from "./imagePreview";
import rentalService from "../../../services/rentalService";
import onboardService from "../../../services/onboardService";
import MoIndex from "../../../components/mobilePhone";
import { currencyList, currencyList1, myPartnerId } from "../../../config/variables";
import jobsService from "../../../services/jobService";
import { useNavigate } from "react-router-dom";
import { toHumanReadableDate } from "../../../utils/common/commonutils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import InvoiceComponent from "./invoiceComponent";
import invoiceService from "../../../services/invoiceService";
import UserModalForAllPopups from "./userModelForAllPopups";




import Layout from "../../../components/layout";

const CreatePost = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const { Option } = Select;
  const { TextArea } = Input;

  const [postingStartDate, setPostingStartDate] = useState();
  const [postingEndDate, setPostingEndDate] = useState();

  const [optionLoading, setOptionLoading] = useState(false);
  const [supportPesonsList, setSupportPesonsList] = useState();
  const [supportPersonsMap, setSupportPersonsMap] = useState(new Map());
  const [addressList, setAddressList] = useState();
  const [isPoster, setIsPoster] = useState(false);
  const [isCancelEnabled, setIsCancelEnabled] = useState(true);

  const [address, setAddress] = useState();
  const [supportPerson, setSupportPerson] = useState();
  const [addressId, setAddressId] = useState("");
  const [supportPersonId, setSupportPersonId] = useState("");
  const [addressTypeList, setAddressTypeList] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [categoryList, setCategoryList] = useState([]);

  const [addAddress, setAddAddress] = useState(false);

  const [mobileNumber, setMobileNumber] = useState("");
  const [adhocMobileNumber, setAdhocMobileNumber] = useState("");


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postedJob, setPostedJob] = useState(false);
  const [showPIDataEmail, setShowPIDataEmail] = useState(false);
  const [showPIDataMobile, setShowPIDataMobile] = useState(false);
  const [showPIDataEmailText, setShowPIDataEmailText] = useState("");
  const [showPIDataMobileText, setShowPIDataMobileText] = useState("");

  const [showSupportDataEmail, setShowSupportDataEmail] = useState(false);
  const [showSupportDataMobile, setShowSupportDataMobile] = useState(false);
  const [showSupportDataEmailText, setShowSupportDataEmailText] = useState('');
  const [showSupportDataMobileText, setShowSupportDataMobileText] = useState('');
  const [bookingAmount, setBookingAmount] = useState(0);
  const [actualAmount, setActualAmount] = useState();
  const [bookingCurrency, setBookingCurrency] = useState('INR');
  const [jobStartDate, setJobStartDate] = useState();
  const [jobEndDate, setJobEndDate] = useState();
  const [hasInvoice, setHasInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [currentStage, setCurrentStage] = useState({});
  const [isRequestUpdateRequired, setIsRequestUpdateRequired] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  //const [action, setAction] = useState(searchParams.get("action"));
  const [action, setAction] = useState();
  const [toDate, setToDate] = useState(new Date().toLocaleDateString("en-GB"));
  const [jobId, setJobId] = useState();
  const [jobData, setJobData] = useState({})
  const [actionType, setActionType] = useState("")
  const [checkedIn, setCheckedIn] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)
  const [checkInText, setCheckInText] = useState('CheckIn')
  const [showCheckInView, setShowCheckInView] = useState(true)
  const [isPaymentDone, setIsPaymentDone] = useState(false)


  const [bookingLabel, setBookingLabel] = useState("Booking")
  const [jobCat, setJobCat] = useState({})

  const [userModelVisible, setUserModelVisible] = useState(false);
  const [modelUserId, setModelUserId] = useState('')


  const [id, setId] = useState();
  const location = useLocation();

  let jobName = "";
  let contactAddress = {};
  let supportPerson1 = {};
  let jobDescription = "";
  let jobDescriptionLink = "";
  let jobInfluProdCodeLink = "";
  let jobTermsAndConditionLink = "";
  let tags = "";
  let amount = 0;
  let currency1 = "INR";
  let termsAndConditionLink = "";
  let tentativeStartDate = new Date();
  let tentativeEndDate = new Date();
  let jobImageLinks = "";
  let supportPersonMap = new Map();

  const showAddressModal = () => {
    setAddAddress(true);
    setIsModalOpen(true);
  };

  let modelPartnerId = ''
  const popupUserDetails = (label, image, partnerId) => {
    modelPartnerId = partnerId
    setModelUserId(modelPartnerId)
    setUserModelVisible(true)
    //console.log('UserModalForAllPopups Into Popup User Details' ,modelPartnerId , data )
  }

  const LinkOrText = ({ url }) => {
    const isLink = /^(https?:\/\/|www\.)\S+/i.test(url);

    return isLink ? (
      <a
        style={{
          color: "white",
          fontWeight: "bold",
          //textDecoration: "underline",
          cursor: "pointer",
        }}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>
    ) : (
      <span
        style={{
          color: "white",
          fontWeight: "bold",
          //textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        {url}
      </span>
    );
  };

  const showPIData = (type, contactId) => {
    console.log("Into Show PI Data :::", type, contactId);
    setOptionLoading(true);
    onboardService
      .fetchAddressById(contactId)
      .then((res) => {
        setOptionLoading(false);
        console.log("Into Contact Detail fetch", res);
        if (type === "email") {
          if (res.data.message) {
            setShowPIDataEmail(true);
            setShowPIDataEmailText(
              res.data.message.emailId === undefined
                ? "NOT Available"
                : res.data.message.emailId
            );
          }
        }
        if (type === "mobile") {
          setShowPIDataMobile(true);
          setShowPIDataMobileText(
            res.data.message.mobileNumber === undefined
              ? "NOT Available"
              : res.data.message.mobileNumber
          );
        }
      })
      .catch(() => {
        setOptionLoading(false);
      });
  };

  const onChangeSwitch = (comp, e) => {
    console.log('Into OnchangeSwitch::', comp, e)
    switch (comp) {
      case "checkedin":
        setCheckedIn(e)
        break;
      case "paymentdone":
        setPaymentDone(e)
        break;
    }
  }

  const handleJobDate = (ty, e) => {
    console.log('Into handle Job Dates::', ty, e)
    if (e === undefined || e === null) {
      return
    }
    if (ty === 'start') {
      setJobStartDate(e)
      generateAmount(e, jobEndDate, actualAmount)
    }
    if (ty === 'end') {
      setJobEndDate(e)
      generateAmount(jobStartDate, e, actualAmount)
    }

  }

  const generateAmount = (jobStartDate1, jobEndDate1, amount) => {

    let amt = (amount / 100) * ((jobStartDate1 === undefined || jobEndDate1 === undefined || (moment.duration((jobEndDate1).diff(jobStartDate1)).days() <= 0)) ? 1 : moment.duration((jobEndDate1).diff(jobStartDate1)).days())
    setBookingAmount(amt + (amt * 0.18))
    setBookingLabel("Book - " + bookingCurrency + " " + (amt + (amt * 0.18)))
    console.log('Into generateAmount Data :::: ', jobStartDate1, jobEndDate1, amount, amt)

  }

  const showSupportPIData = (type, contactId) => {
    console.log(
      "Into Show Support PI Data :::: ",
      supportPersonsMap,
      contactId,
      type,
      supportPersonsMap[contactId]
    );
    if (type === "email") {
      setShowSupportDataEmail(true);
      setShowSupportDataEmailText(
        supportPersonsMap.get(contactId) === undefined ||
          supportPersonsMap.get(contactId).emailId === undefined
          ? "NOT Available"
          : supportPersonsMap.get(contactId).emailId
      );
    }
    if (type === "mobile") {
      setShowSupportDataMobile(true);
      setShowSupportDataMobileText(
        supportPersonsMap.get(contactId) === undefined ||
          supportPersonsMap.get(contactId).mobileNumber === undefined
          ? "NOT Available"
          : supportPersonsMap.get(contactId).mobileNumber
      );
    }
    // console.log('Into Show PI Data :::', type, contactId)
    // setOptionLoading(true);
    // onboardService
    //   .fetchAddressById(contactId)
    //   .then((res) => {
    //     setOptionLoading(false);
    //     console.log('Into Contact Detail fetch', res)
    //     if (type === 'email') {
    //       if (res.data.message) {
    //         setShowSupportDataEmail(true);
    //         setShowSupportDataEmailText((res.data.message.emailId === undefined) ? "NOT Available" : res.data.message.emailId);
    //       }
    //     } if (type === 'mobile') {
    //       setShowSupportDataMobile(true);
    //       setShowSupportDataMobileText((res.data.message.mobileNumber === undefined) ? "NOT Available" : res.data.message.mobileNumber);

    //     }
    //   })
    //   .catch(() => {
    //     setOptionLoading(false);
    //   });
  };

  const showSupportModal = () => {
    setIsModalOpen(true);
    setAddAddress(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleJobCat = (jobData1) => {
    if ((location === undefined || location === null || location.state === undefined || location.state === null || location.state.jobCat === undefined || location.state.jobCat === null) && (jobData1.jobType !== undefined && jobData1.jobType !== null && jobData1.jobType !== "")) {
      const jobCatl = JSON.parse(localStorage.getItem("LocalStorage_jobTypeCards"))
      const arrayOfObjects = Object.values(jobCatl)
      console.log('Into handleJobCat ::::', jobData1, location)

      arrayOfObjects.map((item, index) => {
        if (item.JobType === jobData1.jobType) {
          console.log('Into handleJobCat ::::Item Iter', jobData1, location, item)
          setJobCat(item)
        }
      });

    } else {
      setJobCat(((location === undefined || location === null || location.state === undefined || location.state === null || location.state.jobCat === undefined || location.state.jobCat === null)) ? {} : location.state.jobCat)
    }
  }

  useEffect(() => {
    let to = searchParams.get("action");
    setAction(to);
    let id = searchParams.get("id");
    setActionType((searchParams.get("action_type") === undefined) ? "" : searchParams.get("action_type"))
    setId(id)
    handleJobCat(jobData)
    setAddressTypeList(
      JSON.parse(localStorage.getItem("LocalStorage_contactTypes"))
    );
    setLocationData(JSON.parse(localStorage.getItem("location")));
    setCategoryList(JSON.parse(localStorage.getItem("categories")));



    switch (to) {
      case "create":
        break;

      case "book":
        fetchPostedJobById(id, 'book');
        break;
      case "edit":
        fetchPostedJobById(id, 'edit');
        break;
      case "approve":
        fetchRequestJobById(id);
        break;
      case "reject":
        fetchRequestJobById(id);
        break;
      case "accept":
        fetchRequestJobById(id);
        break;
      case "update":
        fetchJobById(id);
        break;
      case "cancel":
        fetchJobById(id);
        break;
      case "delete":
        fetchJobById(id);
        break;

      default:
        console.log("error in the  selection- create post");
    }

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

    fetchSupportPersons();
    fetchAddress();
  }, []);

  useEffect(() => {
    setCounter(counter + 1);
  }, [currencyList1()]);

  const postRentalDetails = (payload) => {
    setOptionLoading(true);
    rentalService
      .createRentalPost(payload)
      .then((res) => {
        setOptionLoading(false);
        console.log(res.data);
        navigate("/pastPostedJobs");
      })
      .catch(() => setOptionLoading(false));
  };

  const DateDisplay = ({ date }) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);

    return (
      <div>
        <FontAwesomeIcon icon={faCalendar} /> {formattedDate}
      </div>
    );
  };

  const deleteRentalDetails = (payload) => {
    setOptionLoading(true);
    rentalService
      .deleteRentalPost(payload)
      .then((res) => {
        setOptionLoading(false);
        console.log(res.data);
        navigate("/pastPostedJobs");

      })
      .catch(() => setOptionLoading(false));
  };

  const handleBookingCancel = (e) => {
    console.log('Into HandleBookingCancel', e)
    handleDelete(e)
  }

  const handleBookingUpdate = (e, text) => {
    console.log('Into handleBookingUpdate', e)
    if (text === 'Check-In' || text === 'Check-Out') {
      let doCheck = checkedIn
      let doPayment = paymentDone
      let stageMappingId1 = jobData.checkinStageMappingId
      if (doCheck) {
        if (text === 'Check-In') {
          stageMappingId1 = jobData.checkinStageMappingId
        } else if (text === 'Check-Out') {
          stageMappingId1 = jobData.checkoutStageMappingId
        }
      } else {
        stageMappingId1 = jobData.paymentStageMappingId
      }
      let payload = {
        stageMappingId: stageMappingId1,
        isPaymentDone: doPayment,
        stageStatus: "COMPLETED",
        comments: "Updated Via New Flow",
        uploadLink: "Updated Via New Flow"
      }
      if (!doCheck) {
        payload = {
          stageMappingId: stageMappingId1,
          stageStatus: "COMPLETED",
          comments: "Updated Via New Flow",
          uploadLink: "Updated Via New Flow"
        }
      }
      invoiceService.updateJobStage(payload)
        .then((res) => {
          setOptionLoading(false);
          console.log('Into Job Updated Details', res.data);
          navigate("/pastPostedJobs");
          window.location.reload();
        })
        .catch(() => setOptionLoading(false));
      return
    }
    if (("" + currentStage.stageId) === jobCat.PaymentStageId) {
      currentStage.stageStatus = "APPROVED"
    }
    if (("" + stage.stageId) === jobCat.CheckInStageId) {
      currentStage.stageStatus = "COMPLETED"
    }
    if (("" + stage.stageId) === jobCat.CheckOutStageId) {
      currentStage.stageStatus = "COMPLETED"
    }
    currentStage.comment = "Updated Via New Flow"
    invoiceService.updateJobStage(currentStage)
      .then((res) => {
        setOptionLoading(false);
        console.log('Into Job Updated Details', res.data);
        navigate("/pastPostedJobs");
        window.location.reload();
      })
      .catch(() => setOptionLoading(false));
  }

  const handleRequestUpdate = (e, type) => {
    console.log('Into handleBookingUpdate', e)
    let event1 = true
    if (type === 'approve') {
      event1 = true
    } else {
      event1 = false
    }
    let payload = {
      lastComment: type
    }
    //currentStage.comment = "Updated Via New Flow"
    jobsService.approveJobRequest(payload, event1, jobData.jobRequestId)
      .then((res) => {
        setOptionLoading(false);
        console.log('Into Job Updated Details', res.data);
        navigate("/pastPostedJobs");
        window.location.reload();
      })
      .catch(() => setOptionLoading(false));
  }

  const bookRentalDetails = (payload) => {
    setOptionLoading(true);
    rentalService
      .bookRentalPost(payload)
      .then((res) => {
        setOptionLoading(false);
        console.log('Into BookRental Details', res.data);
        navigate("/pastPostedJobs");

      })
      .catch(() => setOptionLoading(false));
  };

  const updateCurrentStageButtonText = (stage, jobCat, data) => {
    console.log('Into update Current stage button text ,,,, ', stage, jobCat, data)
    if (stage.jobContractStageMappingID === undefined) {
      setCheckInText('Job Done')
      setIsCancelEnabled(false)
      setShowCheckInView(false)
      return
    }
    if (data.currentPendingStatus === 'JOB_DONE') {
      setCheckInText('Job Done')
      setIsCancelEnabled(false)
      setShowCheckInView(false)
      return 
    }
    if (data.currentPendingStatus === 'CHECK-IN' || data.currentPendingStatus === 'CHECK-OUT') {
      if (data.currentPendingStatus !== 'CHECK-IN' || data.isPaymentDone) {
        setIsCancelEnabled(false)
      } else {
        setIsCancelEnabled(true)
      }
      if (data.posterPartnerId === myPartnerId()) {
        if (data.currentPendingStatus === 'CHECK-IN') {
          setCheckInText('Check-In')
        } else {
          setCheckInText('Check-Out')
        }
        setShowCheckInView(true)
      } else {
        setCheckInText('View')
        setShowCheckInView(false)
      }
      return
    }
    if (stage.stageStatus === 'COMPLETED' || stage.stageStatus === 'APPROVED') {
      setIsCancelEnabled(false)
      setCheckInText('View')
      setShowCheckInView(false)
      return
    }
    if (("" + stage.stageId) === jobCat.PaymentStageId) {
      setIsCancelEnabled(true)

      setCheckInText('Paid')
      setShowCheckInView(true)

      return
    }
    if (("" + stage.stageId) === jobCat.CheckInStageId) {
      setIsCancelEnabled(true)

      setCheckInText('Check-In')
      setShowCheckInView(true)


      return
    }
    if (("" + stage.stageId) === jobCat.CheckOutStageId) {
      setIsCancelEnabled(false)
      setCheckInText('Check-Out')
      setShowCheckInView(true)

      return
    }
    setCheckInText('View')
    setShowCheckInView(false)

  }

  const fetchPostedJobById = (payload, action1) => {
    setOptionLoading(true);
    jobsService
      .fetchPostedJobById(payload)
      .then((res) => {
        if (action === "create" || action === "edit") {
          setPostedJob(false);
        } else {
          setPostedJob(true);
        }

        setOptionLoading(false);
        let data = res.data.message.jobDefinitionBOs[0];
        console.log('Into setIsPoster PostedJobById', myPartnerId(), data.posterPartnerId, action)
        handleJobCat(data)
        setIsPoster(data.posterPartnerId === myPartnerId());
        setAddressId(data.addressContactId);
        setSupportPersonId(data.supportContactId);
        data.jobStartDate = moment(data.postingStartDate);
        data.jobEndDate = moment(data.postingEndDate);

        data.jobStartDatedayjs = dayjs(data.postingStartDate);
        data.jobEndDatedayjs = dayjs(data.postingEndDate);
        if (action1 === 'book') {

          data.jobStartDate = moment(Date.now())
          data.jobEndDate = moment(Date.now());
          data.jobStartDatedayjs = dayjs(Date.now());
          data.jobEndDatedayjs = dayjs(Date.now());
          console.log('Into Job Data Value Action book :::', data, res.data.message, isPoster)


        }
        setActualAmount(data.amount);
        if (action1 === 'book') {
          //amt = generateAmount(data.jobStartDate, data.jobEndDate, data.amount)
        }

        //setBookingAmount();
        setBookingCurrency(data.currency);
        setJobStartDate(data.jobStartDate);
        setJobEndDate(data.jobEndDate);
        data.tags1 = data.tags.split(",")
        console.log(data);
        form.setFieldsValue(data);
        console.log('Into Job Data Value :::', data, res.data.message, isPoster)

        setJobData(data);
      })
      .catch(() => setOptionLoading(false));
  };

  const fetchRequestJobById = (payload) => {
    setOptionLoading(true);
    jobsService
      .fetchRequestJobById(payload)
      .then((res) => {
        //setPostedJob(true);
        setOptionLoading(false);
        let data = res.data.message.jobRequestBOs[0];
        handleJobCat(data)
        setAddressId(data.addressContactId);
        setSupportPersonId(data.supportContactId);
        console.log('Into setIsPoster fetchRequestJobById', myPartnerId(), data.posterPartnerId)
        setIsPoster(data.posterPartnerId === myPartnerId());
        if (data.posterApprovedBy !== undefined && data.posterApprovedBy !== null && data.posterApprovedBy !== "") {
          setIsRequestUpdateRequired(false)
        }
        data.jobStartDate = moment(data.postingStartDate);
        data.jobEndDate = moment(data.postingEndDate);

        data.jobStartDatedayjs = dayjs(data.postingStartDate);
        data.jobEndDatedayjs = dayjs(data.postingEndDate);

        data.tags1 = (data.tags === undefined || data.tags === null) ? [] : data.tags.split(",")
        console.log(data);
        form.setFieldsValue(data);
        setJobData(data);
        console.log('Into End of setIsPoster fetchRequestJobById', myPartnerId(), data.posterPartnerId)
      })
      .catch(() => setOptionLoading(false));
  };

  const fetchJobById = (payload) => {
    setOptionLoading(true);
    jobsService
      .fetchJobByIdPopulateInvoice(payload)
      .then((res) => {
        //setPostedJob(true);
        setOptionLoading(false);
        let data = res.data.message.jobBOs[0];
        handleJobCat(data)
        setAddressId(data.addressContactId);
        setSupportPersonId(data.supportContactId);
        setIsPoster(data.posterPartnerId === myPartnerId());
        console.log('Into setIsPoster fetchJobById', myPartnerId(), data.posterPartnerId, data, isPoster, data.posterPartnerId === myPartnerId())
        data.jobStartDate = moment(data.jobStartDate);
        data.jobEndDate = moment(data.jobEndDate);
        data.jobStartDatedayjs = dayjs(data.jobStartDate);
        data.jobEndDatedayjs = dayjs(data.jobEndDate);
        if (data.tags === undefined) {
          data.tags = ""
        }
        if (data.isPaymentDone === undefined) {
          data.isPaymentDone = false
        }
        data.tags1 = data.tags.split(",")
        console.log('FetchJobById ::: ', data, jobCat);

        setCurrentStage(data.currentStage);
        setIsPaymentDone(data.isPaymentDone);
        setPaymentDone(true);
        setCheckedIn(true);
        updateCurrentStageButtonText(data.currentStage, jobCat, data)
        //TODO : Based on CurrentStage Set the correctText
        if (data.invoiceStage !== undefined && data.invoiceStage.tempInvoiceLink !== undefined && data.invoiceStage.tempInvoiceLink !== '' && data.invoiceStage.tempInvoiceLink !== null) {
          let invStg = data.invoiceStage
          console.log('Into Invoice Data Before ::: ', invStg.tempInvoiceLink)
          invStg.tempInvoiceLink = decodeURIComponent(invStg.tempInvoiceLink);
          console.log('Into Invoice Data after ::: ', invStg.tempInvoiceLink)
          const segmentsAfterQuestionMark = data.invoiceStage.tempInvoiceLink.split('?')[0];
          const pathSegments = segmentsAfterQuestionMark.split('/');
          const lastSegment = pathSegments[pathSegments.length - 1];
          invStg.invoiceName = lastSegment
          setInvoiceData(invStg)
          setHasInvoice(true)
        }
        form.setFieldsValue(data);
        setJobData(data);
      })
      .catch(() => setOptionLoading(false));
  };

  const fetchSupportPersons = () => {
    setOptionLoading(true);
    onboardService
      .fetchSupportPersons()
      .then((res) => {
        setOptionLoading(false);
        if (res.data.message) {
          setSupportPesonsList(res.data.message);
          let m = new Map();
          if (res.data.message !== undefined && res.data.message.length > 0) {
            res.data.message.forEach((item) => {
              m.set(item.contactAddressId, item);
            });
            setSupportPersonsMap(m);
            supportPersonMap = m;
          }
          console.log(
            "FetchSupport Persons :::: ",
            supportPesonsList,
            supportPersonMap,
            supportPersonsMap
          );
        }
      })
      .catch(() => setOptionLoading(false));
  };

  const fetchAddress = () => {
    setOptionLoading(true);
    onboardService
      .fetchAddress()
      .then((res) => {
        setOptionLoading(false);
        if (res.data.message) {
          setAddressList(res.data.message);
        }
      })
      .catch(() => {
        setOptionLoading(false);
      });
  };

  const HashtagList = ({ hashtags }) => {
    // Convert comma-separated string to an array of hashtags
    //const hashtagArray = hashtags;
    console.log('Into hashtagLists :::', hashtags)
    const hashtagArray = (hashtags === undefined) ? [] : hashtags.split(',').map((tag) => tag.trim());




    return (
      <>
        {hashtags === undefined && <div></div>}
        {!(hashtags === undefined) && (
          //   <ul style={{
          //   color: "white",
          //   fontWeight: 'bold',
          //   //textDecoration: "underline",
          //   cursor: "pointer",
          // }} >
          //   {hashtagArray.map((hashtag, index) => (
          //     <li key={index}>#{hashtag}</li>
          //   ))}
          // </ul>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            {hashtagArray.map((hashtag, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "8px",
                  //backgroundColor: "#f4f4f4",
                  //color: "#333",
                  color: "white",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                #{hashtag}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const handleDelete = (e) => {
    console.log('ToDo ::: Delete JobId', jobData, action, actionType)
    let payload = {}
    switch (actionType) {
      case "JOB_DEFINITION":
        payload = {
          "jobDefinitionId": jobData.jobDefinitionId
        }
        break;
      case "JOB":
        payload = {
          "jobId": jobData.jobId
        }
        break;
      case "JOB_REQUEST":
        payload = {
          "jobRequestId": jobData.jobRequestId
        }
        break;
    }
    deleteRentalDetails(payload)
    console.log('Into handle Delete', payload)
  }

  const handleBook = (e) => {
    //const formValues = form.getFieldsValue(['jobStartDate', 'password']);
    //console.log('Form values:', formValues);

    console.log('ToDo ::: Book JobId', jobData, action, actionType)
    let payload = {}
    if (isPoster) {
      payload = {
        jobDefinitionId: jobData.jobDefinitionId,
        autoApprove: true,
        adhocUser: true,
        acceptorEmailId: form.getFieldValue("acceptorEmailId"),
        acceptorMobileNumber: form.getFieldValue("adhocMobileNumber"),
        acceptorCountryCode: form.getFieldValue("adhocCountryCode"),
        acceptorPartnerName: form.getFieldValue("acceptorPartnerName"),
        checkedIn: form.getFieldValue("checkedIn"),
        paymentDone: form.getFieldValue("paymentDone"),
        // jobEndDate: form.getFieldValue('jobStartDate').format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        // jobStartDate: form.getFieldValue('jobEndDate').format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        jobEndDate: form.getFieldValue('jobStartDatedayjs').format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        jobStartDate: form.getFieldValue('jobEndDatedayjs').format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
      }
    } else {
      payload = {
        jobDefinitionId: jobData.jobDefinitionId,
        // jobEndDate: form.getFieldValue('jobStartDate').format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        // jobStartDate: form.getFieldValue('jobEndDate').format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        jobEndDate: form.getFieldValue('jobStartDatedayjs').format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        jobStartDate: form.getFieldValue('jobEndDatedayjs').format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
      }
    }
    bookRentalDetails(payload)
    console.log('Into handle Book', payload)
  }

  const onFinish = (values) => {
    console.log("In on finish::::", values, address, supportPerson, jobCat, jobData);
    let data = {

    };
    if (action === 'create') {
      data = {
        jobName: values.jobName,
        //jobEndDate: values.jobEndDatedayjs.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        //jobStartDate: values.jobStartDatedayjs.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        // jobType: location.state.jobCat.JobType,
        jobType: jobCat.JobType,
        jobDescription: values.jobDescription,
        jobTermsAndConditionLink: values.jobTermsAndConditionLink,
        jobDescriptionLink: values.jobDescriptionLink,
        jobInfluProdCodeLink: values.jobInfluProdCodeLink,
        tentativeStartDate: values.jobStartDatedayjs.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        tentativeEndDate: values.jobEndDatedayjs.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        postingStartDate: values.jobStartDatedayjs.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        postingEndDate: values.jobEndDatedayjs.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        maxBufferPeriodInDays: 1,
        addressContactId: addressId,
        jobImageLinks: ((jobData.jobImageLinks === undefined) ? "" : jobData.jobImageLinks + ",") + ((jobData.images1 === undefined) ? "" : jobData.images1.join(",")),
        supportContactId: supportPersonId,
        //cloneFromWorkFlowContractGroupId: location.state.jobCat.MasterContractID,
        cloneFromWorkFlowContractGroupId: jobCat.MasterContractID,
        cloneFromWorkFlowContractGroupType: "MASTER",
        status: "INPROGRESS",
        shownToAllSubscriberCount: true,
        shownToAllLocations: true,
        shownToAllLanguages: true,
        shownToAllPlatforms: true,
        shownToAllTags: true,
        shownToAllUsers: true,

        amount: values.amount * 100,
        "currency": values.currency[0],
        "tags": values.tags.join(', '),
      };
    } else if (action === 'edit') {
      data = {
        ...jobData,
        jobName: values.jobName,
        jobEndDate: values.jobEndDatedayjs.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        jobStartDate: values.jobStartDatedayjs.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        //jobType: location.state.jobCat.JobType,
        //jobType: jobCat.JobType,
        jobDescription: values.jobDescription,
        jobTermsAndConditionLink: values.jobTermsAndConditionLink,
        jobDescriptionLink: values.jobDescriptionLink,
        jobInfluProdCodeLink: values.jobInfluProdCodeLink,
        tentativeStartDate: values.jobStartDate.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        tentativeEndDate: values.jobEndDate.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        postingStartDate: values.jobStartDate.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        postingEndDate: values.jobEndDate.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"),
        maxBufferPeriodInDays: 1,
        addressContactId: addressId,
        jobImageLinks: ((jobData.jobImageLinks === undefined) ? "" : jobData.jobImageLinks + ",") + ((jobData.images1 === undefined) ? "" : jobData.images1.join(",")),
        supportContactId: supportPersonId,
        //cloneFromWorkFlowContractGroupId: location.state.jobCat.MasterContractID,
        //cloneFromWorkFlowContractGroupType: "MASTER",
        status: "INPROGRESS",
        shownToAllSubscriberCount: true,
        shownToAllLocations: true,
        shownToAllLanguages: true,
        shownToAllPlatforms: true,
        shownToAllTags: true,
        shownToAllUsers: true,

        amount: values.amount * 100,
        "currency": values.currency[0],
        "tags": values.tags.join(', '),
      };
    }

    postRentalDetails(data);
    console.log('Into On finsh :::: ', data, values);

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

  const formatUserOptionLabel = (label, image, partnerId) => (
    <>
      {console.log('Into format UserOptionLabel', label, image, partnerId)}
      {/* <Card
        style={{ width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer', height: '45px', border: 'none' }}
        onClick={() => popupUserDetails(label, image, partnerId)}
        bodyStyle={{ padding: '0px', display: 'flex', alignItems: 'center', border: 'none' }}
      > */}
      <div
        style={{ width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer', border: 'none' }}
        onClick={() => popupUserDetails(label, image, partnerId)}
      >
        <img
          src={image}
          alt={label}
          style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }}
        />
        {/* {console.log('Intp formatUserOptionLabel', data.label)} */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold' }}>{label}</div>
          {/* <div style={{ color: '#666', fontSize: '8px' }}>
                <div>{data.stakeHolderType}</div>
                <div style={{ marginLeft: '8px', fontSize: '8px' }}>{data.skillSet}</div>
            </div> */}
        </div>
      </div>
      {/* </Card> */}
    </>
  );

  const addAddressModal = (values) => {
    console.log("Into Add AddressModal", values);

    let addressDetails = {
      addressKey: values.name,
      name: values.name,
      emailId: values.emailId,
      mobileNumber: values.mobileNumber,
      countryCode: values.countryCode,
      contactAddressType: "COMMUNICATION",
      streetName: values.streetName,
      houseNumber: values.houseNumber,
      postalCode: values.postalCode,
      city: values.city,
      state: values.state,
      streetAddress3: values.streetAddress3,
      country: values.country,
      parentContactAddressType: "CONTACT",
    };

    //console.log('Into Add AddressModal' , values , addressDetails)
    updateAddress(addressDetails);
    setIsModalOpen(false);
  };

  const addSupportPersonModal = (values) => {
    let personDetails = {
      addressKey: values.name,
      name: values.name,
      firstName: values.firstName,
      lastName: values.lastName,
      mobileNumber: values.mobileNumber,
      countryCode: values.countryCode,
      emailId: values.emailId,
      gender: values.gender,
      supportTime: values.supportTime,
      workTime: values.workTime,
      contactAddressType: "SUPPORT",
      parentContactAddressType: "SUPPORT",
    };
    createSupportPersons(personDetails);
    setIsModalOpen(false);
  };

  const onFinishFailed = () => { };

  function handleAddress(value) {
    const addressId = value;
    const address = addressList.find((u) => u.contactAddressId === addressId);
    setAddress(address);
    setAddressId(addressId);
    console.log("handle Address ::::", addressId, address);
  }

  function handleSupportPerson(value) {
    const supportId = value;
    const person = supportPesonsList.find(
      (p) => p.contactAddressId === supportId
    );
    setSupportPerson(person);
    setSupportPersonId(supportId);
    console.log("handle Support ::::", supportId, person);
  }

  const onmobileUpdate = (val, value, data, event) => {
    form.setFieldsValue({
      mobileNumber: val, // Set the desired value
      countryCode: (value === undefined) ? "in" : value.countryCode
    });
  };

  const onAdhocmobileUpdate = (val, value, data, event) => {
    //console.log('Into on ADhoc mobileUpdate' , val , value,data,event)
    form.setFieldsValue({
      adhocMobileNumber: val, // Set the desired value
      adhocCountryCode: (value === undefined) ? "in" : value.countryCode
    });
  };

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

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Stack direction={"row"}>
        <div
          style={{
            display: "flex",
            width: "50%",
            backgroundColor: "#C1B11C",
            border: "1px, solid, black",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
              width: "100%",
            }}
          >
            <Previews action={action} jobData={jobData} />
          </div>
        </div>

        <div
          style={{
            width: "50%",
            height: "auto",
            color: "white",
            backgroundColor: "black",
            padding: 10,
          }}
        >
          <Box sx={{}}>
            <Typography
              sx={{ fontWeight: 700, textAlign: "center", color: "white" }}
            >
              {id === '0000000000000000' ? 'Create Post' :
                actionType === 'JOB_DEFINITION' ? 'Posting' :
                  actionType === 'JOB_REQUEST' ? 'Requests' :
                  actionType === 'JOB' ? checkInText : ''}
            </Typography>

            <Box>
              <div
                style={{
                  marginLeft: 2,
                  float: "left",
                  fontSize: 12,
                  padding: "5px",
                  paddingLeft: 10,
                  paddingRight: 15,
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                {toDate}
              </div>
              <div
                style={{
                  marginRight: 100,
                  float: "right",
                  padding: 5,
                  border: "1.5px solid #C1B11C",
                  fontSize: 12,
                }}
              >
                {console.log('Into Job type :::', jobCat)}
                {jobCat.Title}
              </div>
            </Box>

            <Form
              form={form}
              name="jobDetails"
              layout="vertical"
              className="form-container"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Grid container spacing={1} sx={{}}>
                <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Job Name:{" "}
                      </label>
                    }
                    name="jobName"
                  >
                    {(action === "create" ||
                      action === "edit" ||
                      action === "delete") && (
                        <Input
                          value={jobData.jobName}
                          placeholder="Enter job name"
                          disabled={postedJob}
                          style={{ color: "black", backgroundColor: "white" }}
                        />
                      )}
                    {!(
                      action === "create" ||
                      action === "edit" ||
                      action === "delete"
                    ) && (
                        <>
                          <span
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              //textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            {jobData.jobName}
                          </span>
                        </>
                      )}
                  </Form.Item>
                </Grid>

                <Grid item xs={6}>
                  <Space className="form-item" direction="vertical">
                    <Space.Compact>
                      <Form.Item
                        label={
                          <label
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                            }}
                          >
                            Amount:{" "}
                          </label>
                        }
                        name="amount"
                        rules={[
                          {
                            required: true,
                            message: "Amount is required",
                          },
                        ]}
                        initialValue="1000"
                      >
                        {(action === "create" ||
                          action === "edit" ||
                          action === "delete") && (
                            <Input
                              placeholder="Enter Charge"
                              type="number"
                              disabled={postedJob}
                              style={{ color: "black", backgroundColor: "white" }}
                            />
                          )}
                        {!(
                          action === "create" ||
                          action === "edit" ||
                          action === "delete"
                        ) && (
                            <>
                              <span
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  //textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                              >
                                {jobData.amount / 100}
                              </span>
                            </>
                          )}
                      </Form.Item>

                      <Form.Item
                        key={counter}
                        label={
                          <label
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                            }}
                          >
                            Currency
                          </label>
                        }
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
                        {(action === "create" ||
                          action === "edit" ||
                          action === "delete") && (
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
                          )}
                        {!(
                          action === "create" ||
                          action === "edit" ||
                          action === "delete"
                        ) && (
                            <>
                              <span
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  //textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                              >
                                {jobData.currency}
                              </span>
                            </>
                          )}
                      </Form.Item>
                    </Space.Compact>
                  </Space>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: -4 }}>
                <Grid item xs={12}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Description:{" "}
                      </label>
                    }
                    name="jobDescription"
                  >
                    {(action === "create" ||
                      action === "edit" ||
                      action === "delete") && (
                        <TextArea
                          rows={2}
                          placeholder="Enter Description:"
                          disabled={postedJob}
                          style={{ color: "black", backgroundColor: "white" }}
                        />
                      )}
                    {!(
                      action === "create" ||
                      action === "edit" ||
                      action === "delete"
                    ) && (
                        <>
                          <span
                            style={{
                              color: "white",
                              //fontWeight: 'bold',
                              //textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            {jobData.jobDescription}
                          </span>
                        </>
                      )}
                  </Form.Item>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: -4 }}>
                <Grid item xs={12}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Terms and Conditions(Link):{" "}
                      </label>
                    }
                    name="jobTermsAndConditionLink"
                  >
                    {(action === "create" ||
                      action === "edit" ||
                      action === "delete") && (
                        <TextArea
                          rows={2}
                          placeholder="Enter Terms and Condition(Link):"
                          disabled={postedJob}
                          style={{ color: "black", backgroundColor: "white" }}
                        />
                      )}
                    {!(
                      action === "create" ||
                      action === "edit" ||
                      action === "delete"
                    ) && (
                        <>
                          <span
                            style={{
                              color: "white",
                              //fontWeight: 'bold',
                              //textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            {jobData.jobTermsAndConditionLink}
                          </span>
                        </>
                      )}
                  </Form.Item>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: -4 }}>
                <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Description Link:{" "}
                      </label>
                    }
                    name="jobDescriptionLink"
                    style={{ color: "white" }}
                  >
                    {(action === "create" ||
                      action === "edit" ||
                      action === "delete") && (
                        <Input
                          placeholder="Description"
                          disabled={postedJob}
                          style={{ color: "black", backgroundColor: "white" }}
                        />
                      )}
                    {!(
                      action === "create" ||
                      action === "edit" ||
                      action === "delete"
                    ) && (
                        <>
                          <LinkOrText url={jobData.jobDescriptionLink} />
                        </>
                      )}
                  </Form.Item>
                </Grid>
                <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Promo Code Link:{" "}
                      </label>
                    }
                    name="jobInfluProdCodeLink"
                    style={{ color: "white" }}
                  >
                    {(action === "create" ||
                      action === "edit" ||
                      action === "delete") && (
                        <Input
                          placeholder="Promo Code"
                          disabled={postedJob}
                          style={{ color: "black", backgroundColor: "white" }}
                        />
                      )}
                    {!(
                      action === "create" ||
                      action === "edit" ||
                      action === "delete"
                    ) && (
                        <>
                          <LinkOrText url={jobData.jobInfluProdCodeLink} />
                        </>
                      )}
                  </Form.Item>
                </Grid>
              </Grid>
              {/* <Grid container spacing={2} sx={{ marginTop: -4 }}>
                <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Promo Code Link:{" "}
                      </label>
                    }
                    name="jobInfluProdCodeLink"
                    style={{ color: "white" }}
                  >
                    {(action === 'create' || action === 'edit') && (
                      <Input
                        placeholder="Promo Code"
                        disabled={postedJob}
                        style={{ color: "black", backgroundColor: "white" }}
                      />
                    )}
                    {!(action === 'create' || action === 'edit') && (
                      <span>{jobData.jobInfluProdCodeLink}</span>
                    )}
                  </Form.Item>
                </Grid>
              </Grid> */}

              {/* <Grid container spacing={2} sx={{ marginTop: -3 }}>
                <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Poster:{" "}
                      </label>
                    }
                    name="jobDescription"
                  >
                    {(action === 'create' || action === 'edit') && (
                      <Input placeholder="Enter poster name" disabled={postedJob} style={{ color: "black", backgroundColor: "white" }} />

                        )}
                        {!(action === 'create' || action === 'edit') && (
                          <span>{jobData.PosterName}</span>
                        )}
                  </Form.Item>
                </Grid>

                <Grid item xs={6}>
                  {
                    !postedJob && (
                      <Form.Item
                        className="form-item"
                        label={
                          <label
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                            }}
                          >
                            Accepted / Requested:
                          </label>
                        }
                        name="createdAt"
                        style={{ color: "white" }}
                      >
                        {postedJob && <Input disabled={postedJob} style={{ backgroundColor: "white", color: "black" }} />}
                        {!postedJob && <DatePicker format={"DD/MM/YYYY"} />}
                      </Form.Item>
                    )
                  }
                </Grid>
              </Grid> */}
              <Grid container spacing={2} sx={{ marginTop: -4 }}>
                <Grid item xs={100}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Hashtags:{" "}
                      </label>
                    }
                    name={"tags"}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Categories is required",
                      },
                    ]}
                  >
                    {(action === "create" ||
                      action === "edit" ||
                      action === "delete") && (
                        <Select
                          mode="tags"
                          allowClear
                          placeholder="Enter tags"
                          defaultValue={[]}
                          options={categoryList}
                          name="category"
                          disabled={postedJob}
                          style={{ color: "black", backgroundColor: "white" }}
                        />
                      )}
                    {!(
                      action === "create" ||
                      action === "edit" ||
                      action === "delete"
                    ) && (
                        <>
                          <HashtagList hashtags={jobData.tags} />
                        </>
                      )}
                  </Form.Item>
                </Grid>

                {/* <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Enter Address:{" "}
                      </label>
                    }
                    name="addressString"
                  >
                    <Select
                      onChange={handleAddress}
                      placeholder="Select Address"
                      optionFilterProp="children"
                      showSearch
                      filterOption={filterOption}
                      dropdownRender={(menu) => (
                        <>
                          {menu}

                          <Divider
                            style={{
                              margin: "8px 0",
                            }}
                          />
                          <Space
                            style={{
                              padding: "0 8px 4px",
                            }}
                          >
                            <span
                              style={{
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={showAddressModal}
                            >
                              Add new address
                            </span>
                          </Space>
                        </>
                      )}
                      options={
                        addressList &&
                        addressList.map((item) => ({
                          label: `${item.addressKey}, ${item.streetAddress3}, ${item.houseNumber}, ${item.city}, ${item.state}, ${item.postalCode}`,
                          value: `${item.addressKey}, ${item.streetAddress3}, ${item.houseNumber}, ${item.city}, ${item.state}, ${item.postalCode}`,
                        }))
                      }
                    />
                  </Form.Item>
                </Grid> */}
              </Grid>
              <Grid container spacing={1} sx={{ marginTop: -3 }}>
                <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Address:{" "}
                      </label>
                    }
                    name="addressString"
                  >
                    {(action === "create" ||
                      action === "edit" ||
                      action === "delete") && (
                        <Select
                          onChange={handleAddress}
                          placeholder="Select Address"
                          optionFilterProp="children"
                          showSearch
                          filterOption={filterOption}
                          dropdownRender={(menu) => (
                            <>
                              {menu}

                              <Divider
                                style={{
                                  margin: "8px 0",
                                }}
                              />
                              <Space
                                style={{
                                  padding: "0 8px 4px",
                                }}
                              >
                                <span
                                  style={{
                                    color: "blue",
                                    //textDecoration: "underline",
                                    cursor: "pointer",
                                  }}
                                  onClick={showAddressModal}
                                >
                                  Add new address
                                </span>
                              </Space>
                            </>
                          )}
                          options={
                            addressList &&
                            addressList.map((item) => ({
                              label: `${item.addressKey}, ${item.streetAddress3}, ${item.houseNumber}, ${item.city}, ${item.state}, ${item.postalCode}`,
                              value: `${item.contactAddressId}`,
                              // value: `${item.addressKey}, ${item.streetAddress3}, ${item.houseNumber}, ${item.city}, ${item.state}, ${item.postalCode}`,
                            }))
                          }
                        />
                      )}
                    {action !== "create" &&
                      action !== "edit" &&
                      action !== "delete" && (
                        <>
                          <span
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              //textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            {jobData.addressString}
                          </span>
                          <div>
                            <span
                              style={{
                                color: "white",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                showPIData("email", jobData.addressContactId);
                              }}
                            >
                              Email :{" "}
                              {showPIDataEmail
                                ? showPIDataEmailText
                                : "Click Here"}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{
                                color: "white",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                showPIData("mobile", jobData.addressContactId);
                              }}
                            >
                              Mobile :{" "}
                              {showPIDataMobile
                                ? showPIDataMobileText
                                : "Click Here"}
                            </span>
                          </div>
                        </>
                      )}
                  </Form.Item>
                </Grid>
                <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Contact Details:{" "}
                      </label>
                    }
                    name="supportContactId"
                  >
                    {(action === "create" ||
                      action === "edit" ||
                      action === "delete") && (
                        <Select
                          onChange={handleSupportPerson}
                          placeholder="Select support person"
                          optionFilterProp="children"
                          showSearch
                          filterOption={filterOption}
                          dropdownRender={(menu) => (
                            <>
                              {menu}

                              <Divider
                                style={{
                                  margin: "8px 0",
                                }}
                              />
                              <Space
                                style={{
                                  padding: "0 8px 4px",
                                }}
                              >
                                <span
                                  style={{
                                    color: "blue",
                                    //textDecoration: "underline",
                                    cursor: "pointer",
                                  }}
                                  onClick={showSupportModal}
                                >
                                  Add new person
                                </span>
                              </Space>
                            </>
                          )}
                          options={
                            supportPesonsList &&
                            supportPesonsList.map((person) => ({
                              label: `${person.name}`,
                              //value: `${person.name}`,
                              value: `${person.contactAddressId}`,
                            }))
                          }
                        />
                      )}
                    {action !== "create" &&
                      action !== "edit" &&
                      action !== "delete" && (
                        <>
                          <span
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              //textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            {supportPersonsMap.get(jobData.supportContactId) ===
                              undefined
                              ? ""
                              : supportPersonsMap.get(jobData.supportContactId)
                                .firstName +
                              " " +
                              supportPersonsMap.get(jobData.supportContactId)
                                .lastName}
                          </span>
                          <div>
                            <span
                              style={{
                                color: "white",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                showSupportPIData(
                                  "email",
                                  jobData.supportContactId
                                );
                              }}
                            >
                              Email :{" "}
                              {showSupportDataEmail
                                ? showSupportDataEmailText
                                : "Click Here"}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{
                                color: "white",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                showSupportPIData(
                                  "mobile",
                                  jobData.supportContactId
                                );
                              }}
                            >
                              Mobile :{" "}
                              {showSupportDataMobile
                                ? showSupportDataMobileText
                                : "Click Here"}
                            </span>
                          </div>
                        </>
                      )}
                  </Form.Item>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: -4 }}>
                <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        {actionType === 'JOB_DEFINITION' && action !== 'book' && 'Posting From Date:'}
                        {(actionType !== 'JOB_DEFINITION' || action === 'book') && 'Check-in Date:'}

                      </label>
                    }
                    name="jobStartDatedayjs"
                    style={{ color: "white" }}
                  >
                    {(!(action === 'create' || action === 'edit' || action === 'delete' || action === 'book')) && (
                      // <Input
                      //   placeholder="Enter poster name"
                      //   disabled={postedJob}
                      //   style={{ color: "black", backgroundColor: "white" }}
                      // />
                      <DateDisplay date={jobData.jobStartDate} />
                    )}

                    {(action === 'book') && (
                      <>
                        {console.log('Into DatePicker Book')}

                        <DatePicker className='select-view-input' format={"DD/MM/YYYY"} name="jobEndDatedayjs" onChange={(e) => { handleJobDate('start', e) }} />
                        {/* <DatePicker
        className='select-view-input' // Add your custom class here
        label="Posting Start Date"
        inputFormat="dd/MM/yyyy" // Use inputFormat instead of format
        onChange={(e) => { handleJobDate('start', e) }}
        renderInput={(params) => <TextField {...params} />}
      /> */}
                      </>

                    )}

                    {(action === "create" ||
                      action === "edit" ||
                      action === "delete") && (
                        <DatePicker format={"DD/MM/YYYY"} name="jobEndDatedayjs" />
                        //                 <DatePicker
                        //   className='select-view-input' // Add your custom class here
                        //   label="Posting End Date"
                        //   inputFormat="dd/MM/yyyy" // Use inputFormat instead of format
                        //   onChange={(e) => { handleJobDate('end', e) }}
                        //   renderInput={(params) => <TextField {...params} />}
                        // />
                      )}
                  </Form.Item>
                </Grid>

                <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        {/* Posting End Date:{" "} */}
                        {actionType === 'JOB_DEFINITION' && action !== 'book' && 'Posting End Date:'}
                        {(actionType !== 'JOB_DEFINITION' || action === 'book') && 'Check-out Date:'}
                      </label>
                    }
                    name="jobEndDatedayjs"
                    style={{ color: "white" }}
                  >
                    {(!(action === 'create' || action === 'edit' || action === 'delete' || action === 'book')) && (
                      // <Input
                      //   placeholder="Enter poster name"
                      //   disabled={postedJob}
                      //   style={{ color: "black", backgroundColor: "white" }}
                      // />
                      <DateDisplay date={jobData.jobEndDate} />
                    )}
                    {(action === 'book') && (
                      <DatePicker format={"DD/MM/YYYY"} name="jobEndDatedayjs" onChange={(e) => { handleJobDate('end', e) }} />

                    )}

                    {(action === "create" ||
                      action === "edit" ||
                      action === "delete") && (
                        <DatePicker format={"DD/MM/YYYY"} name="jobEndDatedayjs" />

                      )}
                  </Form.Item>
                </Grid>
              </Grid>


              <Grid container spacing={2} sx={{ marginTop: -4 }}>
                {(jobData.posterPartnerId !== undefined && jobData.posterPartnerId !== null &&
                  jobData.posterPartnerName !== undefined && jobData.posterPartnerName !== null
                ) && (
                    <>
                      <Grid item xs={6}>


                        <Form.Item
                          className="form-item"
                          label={
                            <label
                              style={{
                                color: "#C1B11C",
                                fontSize: 16,
                                fontFamily: "mulish",
                              }}
                            >
                              Poster :
                            </label>
                          }
                          name="jobStartDate"
                          style={{ color: "white" }}
                        >
                          {formatUserOptionLabel(jobData.posterPartnerName, jobData.posterPartnerImageLink, jobData.posterPartnerId)}
                        </Form.Item>
                      </Grid>
                    </>
                  )}
                {(jobData.acceptorPartnerName !== undefined && jobData.acceptorPartnerName !== null &&
                  jobData.acceptorPartnerId !== undefined && jobData.acceptorPartnerId !== null
                ) && (
                    <>
                      <Grid item xs={6}>
                        <Form.Item
                          className="form-item"
                          label={
                            <label
                              style={{
                                color: "#C1B11C",
                                fontSize: 16,
                                fontFamily: "mulish",
                              }}
                            >
                              Client:{" "}
                            </label>
                          }
                          name="jobEndDate"
                          style={{ color: "white" }}
                        >
                          {formatUserOptionLabel(jobData.acceptorPartnerName, jobData.acceptorPartnerImageLink, jobData.acceptorPartnerId)}
                        </Form.Item>
                        <UserModalForAllPopups isVisible={userModelVisible} partnerId={modelUserId} closeModal={() => {
                          modelPartnerId = ''
                          setUserModelVisible(false)
                        }} />
                      </Grid>
                    </>
                  )}
              </Grid>
              {hasInvoice && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={10} spacing={2}>
                      <Form.Item
                        className="form-item"
                        label={
                          <label
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                            }}
                          >
                            Invoice:{" "}
                          </label>
                        }
                        name="tempInvoiceLink"
                      >
                        <InvoiceComponent
                          invoiceName={invoiceData.invoiceName}
                          downloadLink={invoiceData.tempInvoiceLink}
                        />
                      </Form.Item>
                    </Grid>
                  </Grid>
                </>
              )}
              {isPoster && action === 'book' && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={3} spacing={2}>
                      <Form.Item
                        className="form-item"
                        label={
                          <label
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                            }}
                          >
                            Client Name:{" "}
                          </label>
                        }
                        name="acceptorPartnerName"
                        rules={[
                          {
                            required: true,
                            message: "Client Name is required",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Name" />
                      </Form.Item>
                    </Grid>

                    <Grid item xs={4}>
                      <Form.Item
                        className="form-item"
                        label={
                          <label
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                            }}
                          >
                            Mobile Number:{" "}
                          </label>
                        }
                        name="acceptorMobileNumber"
                        rules={[
                          {
                            required: true,
                            message: "Mobile Number is required",
                          },
                        ]}
                      >
                        <MoIndex
                          setMobileNumber={setAdhocMobileNumber}
                          mobileNumber={adhocMobileNumber}
                          onmobileUpdate={onAdhocmobileUpdate}
                        />
                      </Form.Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Form.Item
                        className="form-item"
                        label={
                          <label
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                            }}
                          >
                            Email:{" "}
                          </label>
                        }
                        name="acceptorEmailId"
                        rules={[
                          {
                            required: true,
                            message: "Email id is required",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Email" />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Form.Item
                        className="form-item"
                        label={
                          <label
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                            }}
                          >
                            CheckedIn:{" "}
                          </label>
                        }
                        name="checkedIn"
                      >
                        <Switch
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={(e) => onChangeSwitch("checkedin", e)}
                          style={{
                            color: "#C1B11C",
                            fontSize: 16,
                            fontFamily: "mulish",
                            backgroundColor: (checkedIn) ? "#1677ff" : "grey",

                          }} 
                          />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Form.Item
                        className="form-item"
                        label={
                          <label
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                            }}
                          >
                            Payment Completed:{" "}
                          </label>
                        }
                        name="paymentDone"
                      >
                        <Switch
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={(e) => onChangeSwitch("paymentdone", e)}
                          style={{
                            color: "#C1B11C",
                            fontSize: 16,
                            fontFamily: "mulish",
                            backgroundColor: (paymentDone) ? "#1677ff" : "grey",

                          }} />
                      </Form.Item>
                    </Grid>
                  </Grid>
                </>
              )}

              {isPoster && (checkInText === 'Check-In' || checkInText === 'Check-Out') && (
                <>
                  <Grid container spacing={2}>
                    {(checkInText === 'Check-In') && (
                      <Grid item xs={4}>
                        <Form.Item
                          className="form-item"
                          label={
                            <label
                              style={{
                                color: "#C1B11C",
                                fontSize: 16,
                                fontFamily: "mulish",
                              }}
                            >
                              CheckedIn:{" "}
                            </label>
                          }
                          name="checkedIn"
                        >
                          <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            onChange={(e) => onChangeSwitch("checkedin", e)}
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                              backgroundColor: (checkedIn) ? "#1677ff" : "grey",

                            }} 
                            defaultChecked
                            />
                        </Form.Item>
                      </Grid>
                    )}
                    {(checkInText === 'Check-Out') && (
                      <Grid item xs={4}>
                        <Form.Item
                          className="form-item"
                          label={
                            <label
                              style={{
                                color: "#C1B11C",
                                fontSize: 16,
                                fontFamily: "mulish",
                              }}
                            >
                              Checked Out:{" "}
                            </label>
                          }
                          name="checkedOut"
                        >
                          <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            onChange={(e) => onChangeSwitch("checkedin", e)}
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                              backgroundColor: (checkedIn) ? "#1677ff" : "grey",

                            }} 
                            defaultChecked
                            />
                        </Form.Item>
                      </Grid>
                    )}

                    {(!isPaymentDone) && (<Grid item xs={4}>
                      <Form.Item
                        className="form-item"
                        label={
                          <label
                            style={{
                              color: "#C1B11C",
                              fontSize: 16,
                              fontFamily: "mulish",
                            }}
                          >
                            Payment Completed:{" "}
                          </label>
                        }
                        name="paymentDone"
                      >
                        <Switch
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={(e) => onChangeSwitch("paymentdone", e)}
                          style={{
                            color: "#C1B11C",
                            fontSize: 16,
                            fontFamily: "mulish",
                            backgroundColor: (paymentDone) ? "#1677ff" : "grey",

                          }} 
                          defaultChecked
                          />
                      </Form.Item>
                    </Grid>
                    )}
                  </Grid>
                </>
              )}

              {/* <Grid container spacing={1} sx={{ marginTop: -3 }}>
                <Grid item xs={6}>
                  <Form.Item
                    className="form-item"
                    label={
                      <label
                        style={{
                          color: "#C1B11C",
                          fontSize: 16,
                          fontFamily: "mulish",
                        }}
                      >
                        Booked:{" "}
                      </label>
                    }
                    name="posterPartnerName"
                  >
                    <Input
                      placeholder="Booked By: "
                      disabled={postedJob}
                      style={{ color: "black", backgroundColor: "white" }}
                    />
                  </Form.Item>
                </Grid>
              </Grid> */}
              <Grid container spacing={1} sx={{ marginTop: 3 }}>
                {(action === "create" || action === "edit") && (
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button
                      style={{
                        marginLeft: 20, width: "200px", height: "30px",
                        //padding: "8px",
                        cursor: "pointer",
                        color: "#ffffff", // Optional: Set text color for better visibility
                        //backgroundColor: "#cccccc", // Gray background color
                        backgroundColor: "#1677ff",
                        borderRadius: "5px", // Rounded corners
                        fontWeight: "bold",
                      }}
                      htmlType="submit"
                      size="small"
                    >
                      Post
                    </Button>
                  </Form.Item>
                )}
                {(action === "edit" || action === "delete") && (
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    {/* <Button
                      style={{ marginLeft: 20, width: "200px" }}
                      htmlType="submit"
                      size="small"
                      onClick={(e)=>handleDelete(e)}
                    >
                      Delete
                    </Button> */}
                    <div
                      style={{
                        marginLeft: 20,
                        width: "200px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center", // Center the text horizontally
                        textAlign: "center",
                        cursor: "pointer",
                        color: "#ffffff",
                        backgroundColor: "#cccccc",
                        borderRadius: "5px",
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                      onClick={(e) => handleDelete(e)}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#1677ff", e.target.style.fontWeight = "bold")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#cccccc", e.target.style.fontWeight = "normal")}

                    >
                      Delete
                    </div>
                  </Form.Item>

                )}
                {(action === 'book') && (
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                    name={bookingLabel}
                  >
                    <div
                      style={{
                        marginLeft: 20,
                        width: "200px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center", // Center the text horizontally
                        textAlign: "center",
                        cursor: "pointer",
                        color: "#ffffff",
                        backgroundColor: "#1677ff",
                        borderRadius: "5px",
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                      onClick={(e) => handleBook(e)}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#1677ff", e.target.style.fontWeight = "bold")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#cccccc", e.target.style.fontWeight = "normal")}
                      name={bookingLabel}
                      label={bookingLabel}
                    >
                      {bookingLabel}
                    </div>
                  </Form.Item>
                )}
                {(action === 'update' && isCancelEnabled) && (
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                    name='Cancel'
                  >
                    <div
                      style={{
                        marginLeft: 20,
                        width: "200px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center", // Center the text horizontally
                        textAlign: "center",
                        cursor: "pointer",
                        color: "#ffffff",
                        backgroundColor: "#1677ff",
                        borderRadius: "5px",
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                      onClick={(e) => handleBookingCancel(e)}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#1677ff", e.target.style.fontWeight = "bold")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#cccccc", e.target.style.fontWeight = "normal")}
                      name='Cancel'
                      label='Cancel'
                    >
                      Cancel
                    </div>
                  </Form.Item>
                )}
                {(action === 'update' && isPoster && showCheckInView) && (
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                    name={checkInText}
                  >
                    <div
                      style={{
                        marginLeft: 20,
                        width: "200px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center", // Center the text horizontally
                        textAlign: "center",
                        cursor: "pointer",
                        color: "#ffffff",
                        backgroundColor: "#1677ff",
                        borderRadius: "5px",
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                      onClick={(e) => handleBookingUpdate(e, checkInText)}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#1677ff", e.target.style.fontWeight = "bold")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#1677ff", e.target.style.fontWeight = "normal")}
                      name='CheckIn'
                      label='CheckIn'
                    >
                      {checkInText} Or Payment
                    </div>
                  </Form.Item>
                )}
                {(action === 'approve' || action === 'reject' || action === 'accept') && isRequestUpdateRequired && isPoster && (
                  <>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <div
                        style={{
                          marginLeft: 20,
                          width: "200px",
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center", // Center the text horizontally
                          textAlign: "center",
                          cursor: "pointer",
                          color: "#ffffff",
                          backgroundColor: "#1677ff",
                          borderRadius: "5px",
                          transition: "background-color 0.3s, color 0.3s",
                        }}
                        onClick={(e) => handleRequestUpdate(e, "approve")}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#1677ff", e.target.style.fontWeight = "bold")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#1677ff", e.target.style.fontWeight = "normal")}
                        name='CheckIn'
                        label='CheckIn'
                      >
                        Approve
                      </div>
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <div
                        style={{
                          marginLeft: 20,
                          width: "200px",
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center", // Center the text horizontally
                          textAlign: "center",
                          cursor: "pointer",
                          color: "#ffffff",
                          backgroundColor: "#1677ff",
                          borderRadius: "5px",
                          transition: "background-color 0.3s, color 0.3s",
                        }}
                        onClick={(e) => handleRequestUpdate(e, "reject")}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#1677ff", e.target.style.fontWeight = "bold")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#1677ff", e.target.style.fontWeight = "normal")}
                        name='CheckIn'
                        label='CheckIn'
                      >
                        Reject
                      </div>
                    </Form.Item>
                  </>
                )}
                {/* {(action === 'accept' || action === 'reject') && (

                  <>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button
                        style={{ marginLeft: 20, width: "200px" }}
                        htmlType="submit"
                        size="small"
                      >
                        Accept
                      </Button>
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button
                        style={{ marginLeft: 20, width: "200px" }}
                        htmlType="submit"
                        size="small"
                      >
                        Reject
                      </Button>
                    </Form.Item>
                  </>
                )} */}
              </Grid>
            </Form>
          </Box>
        </div>
      </Stack>

      <Modal
        title={addAddress ? "Add Address" : "Add Support Person"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        style={{ top: 10 }}
        footer={null}
      >
        {addAddress ? (
          <Form
            form={form}
            name="basicdetails"
            layout="vertical"
            className="form-container"
            onFinish={addAddressModal}
            onFinishFailed={onFinishFailed}
            style={{ margin: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={3} spacing={2}>
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
                  <Input placeholder="Enter Address Name" />
                </Form.Item>
              </Grid>

              <Grid item xs={4}>
                <Form.Item
                  className="form-item"
                  label="MobileNumber"
                  name="mobileNumber"
                  rules={[
                    {
                      required: true,
                      message: "Mobile Number is required",
                    },
                  ]}
                >
                  <MoIndex
                    setMobileNumber={setMobileNumber}
                    mobileNumber={mobileNumber}
                    onmobileUpdate={onmobileUpdate}
                  />
                </Form.Item>
              </Grid>
              <Grid item xs={4}>
                <Form.Item
                  className="form-item"
                  label="Email"
                  name="emailId"
                  rules={[
                    {
                      required: true,
                      message: "Email id is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter Email" />
                </Form.Item>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                    <Input
                      placeholder="Enter Address"
                      style={{ height: "50px" }}
                    />
                  </Form.Item>
                </Row>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={3}>
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
              </Grid>

              <Grid item xs={3}>
                {" "}
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
              </Grid>

              <Grid item xs={3}>
                {" "}
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
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={3}>
                {" "}
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
              </Grid>
              <Grid item xs={3}>
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
              </Grid>
              <Grid item xs={3}>
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
                  <Select
                    placeholder="Select country"
                    mode="single"
                    isSearchable={true}
                    showSearch={true}
                    type="tag"
                  >
                    {countryData.map((location) => (
                      <Select key={location} value={location["country_name"]}>
                        {location["country_name"]}
                      </Select>
                    ))}
                  </Select>
                </Form.Item>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={3}>
                {" "}
                <Form.Item
                  className="form-item"
                  label="Latitude"
                  name={"latitude"}
                >
                  <Input placeholder="Enter Latitude" />
                </Form.Item>
              </Grid>
              <Grid item xs={3}>
                <Form.Item
                  className="form-item"
                  label="Longitude"
                  name={"longitude"}
                >
                  <Input placeholder="Enter Longitude" />
                </Form.Item>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 20, width: "200px" }}
                >
                  Add Address
                </Button>
              </Grid>
            </Grid>
          </Form>
        ) : (
          <Form
            form={form}
            name="basicdetails"
            layout="vertical"
            className="form-container"
            onFinish={addSupportPersonModal}
            onFinishFailed={onFinishFailed}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
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
                  <Input placeholder="Enter support Name" />
                </Form.Item>
              </Grid>

              <Grid item xs={4}>
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
              </Grid>

              <Grid item xs={4}>
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
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
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
              </Grid>

              <Grid item xs={4}>
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
              </Grid>

              <Grid item xs={4}>
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
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
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
              </Grid>

              <Grid item xs={4}>
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
              </Grid>

              <Grid item xs={4}>
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
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
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
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: 20, width: "200px" }}
                  >
                    Add Support Person
                  </Button>
                </Form.Item>
              </Grid>
            </Grid>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Layout(CreatePost);
