import {
  Avatar,
  Card,
  CircularProgress,
  Input,
  OutlinedInput,
  Pagination,
  Stack,
} from "@mui/material";
import DataTable from "react-data-table-component";

import { Button, Rate, Select, Modal, Divider } from "antd";
import {
  ArrowDownward,
  Close,
  DescriptionOutlined,
  ExpandMore,
  FilterAltOutlined,
  InboxOutlined,
  MessageOutlined,
  SaveAltOutlined,
  SendOutlined,
} from "@mui/icons-material";
import { DownOutlined } from "@ant-design/icons";
import { forwardRef, useState, useEffect, useRef } from "react";

import Layout from "../../components/layout";
import userService from "../../services/userService";
import "./style.scss";
import MinMaxDropDown from "./component/minmaxDropDown";
import SingleUserModal from "./component/singleUserModal";
import { useNavigate, useParams } from "react-router-dom";
import socialImages from "./socialImages/index";
import MultiUserSelectDropDown from "./component/multiSelectUser";
import CreateGroupIcon from "../../assets/icons/create-group-icon.png";
import UserGroupChatIcon from "../../assets/icons/group-chat-icon.png";

import MultiSelUserWithLimiFetchComp from "../jobs/components/MultiSelUserWithLimiFetchComp";
import MultiUserSelectLimitedDropDown from "./component/multiSelectUserLimited";
import MultiSelectDropDown from "../jobs/components/MultiSelectUserComponent";

const { Option } = Select;

const UserList = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const param = useParams();
  const type = "";
  const [active, setActive] = !(
    type === undefined ||
    type === "" ||
    type === null
  )
    ? useState(type)
    : useState("all-users");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [data, setdata] = useState();
  const [optionLoading, setOptionLoading] = useState(false);

  const [userGroupDropDown, setUserGroupDropdown] = useState([]);
  const [userGroupDropDownMap, setUserGroupDropdownMap] = useState(new Map());
  const [userGroupDropDownNameMap, setUserGroupDropdownNameMap] = useState(new Map());

  const [filterUserGroupsT, setFilterUserGroupsT] = useState(["ALL"]);

  const [addToGroupIdT, setAddToGroupIdT] = useState("000000000000000000");
  const [addToGroupNameT, setAddToGroupNameT] = useState("");


  const [requestAction, setRequestAction] = useState("");

  //groupsList_modal

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [userSelected, setUserSelected] = useState([]);
  const [selectedUser , setSelectedUser] = useState({});
  const iconRef = useRef(null);

  const showModal = (row) => {
    console.log('Into User Details showModal', row)

    setSelectedUser(row);
    setIsModalOpen(true);
  };
  const handleOk = (groupName )  => {
  };
  const handleOk1 = (e , groupId, groupName )  => {
    console.log('Into User Details handleOk', e , groupId, groupName)
    //let groupId = (userGroupDropDown.find(entry => entry.label === groupName))
    if (groupId === undefined || groupId === '') {
      groupId = "000000000000000000"
    }
    if (groupName === undefined || groupName === '') {
      return;
    }
    let payload = {
      userGroupId: groupId,
      userGroupName: groupName,
      friendID:selectedUser.primaryUserId,
      friendPartnerID:selectedUser.partnerId,
      userGroupType: 'USER_GROUP',
      userGroupSubType : 'USER_GROUP_SUB',
      Status: 'SENT_FOR_REQUEST',
    };
    console.log('AddTo GroupAPI Payload' , payload , selectedUser)
    userService
      .addToGroup(payload)
      .then((res) => {
        console.log("Request accepted");
      })
      .catch((error) => {
        console.log(error);
      });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openUserGroupModal = () => {
    setOpenGroupModal(true);
  };

  const closeGroupModal = () => {
    setAddToGroupIdT("000000000000000000");
    setAddToGroupNameT("");
    setOpenGroupModal(false);
  };

  const handleGroupChat = (id) => {
    navigate(`/messages?messageType=USER_GROUP&id=${id}`);
  };

  const onInputField = (e) => {
    let val = e.target.value
    console.log('Into On Input Field ', val )

    let group = (userGroupDropDownMap.get(val))
    if (group === undefined) {
      setAddToGroupIdT("000000000000000000");
    } else {
      setAddToGroupIdT(group.userGroupId);
    }
    setAddToGroupNameT(val);
    console.log('Into On Input Field ', val , group)
  };

  const handleRequestFilterChange = (field, e) => {
    console.log(
      "Into handleRequestFilterChange ",
      e,
      field
    );
    if (Array.isArray(e)) {
      if (e.length == 0) {
        setAddToGroupIdT("000000000000000000");
        setAddToGroupNameT("");
      } else {
      let group = (userGroupDropDownMap.get(e[0]))
      console.log(" handleRequestFilterChange Handle Change Event1", field, e , group );
      //setFilterUserGroupsT([e[0].groupName]);
      setAddToGroupIdT(group.userGroupId);
      setAddToGroupNameT(group.userGroupName);
      }
    } else {
      if (e === '') {
          setAddToGroupIdT("000000000000000000");
          setAddToGroupNameT("");
        
      } else {
      let group = (userGroupDropDownMap.get(e))
      console.log(" handleRequestFilterChange Handle Change Event1 Non Array", field, e , group );

      //setFilterUserGroupsT([e[0].groupName]);
      setAddToGroupIdT(group.userGroupId);
      setAddToGroupNameT(group.userGroupName);
      }

    }
  };

  //tabs
  const [userModal, setUserModal] = useState({
    visible: false,
    data: {},
  });
  const [minMaxValue, setMinMaxValue] = useState({
    followers: [0, 100000],
    totalViews: [0, 100000],
    age: [15, 25],
  });
  const [options, setOptions] = useState({
    reviews: [
      { label: "⭐", value: 1 },
      { label: "⭐⭐", value: 2 },
      { label: "⭐⭐⭐", value: 3 },
      { label: "⭐⭐⭐⭐", value: 4 },
      { label: "⭐⭐⭐⭐⭐", value: 5 },
    ],
    language: JSON.parse(localStorage.getItem("languages")).map((e) => {
      return { label: e.label, value: e.value, selected: false };
    }),
    location: JSON.parse(localStorage.getItem("location")).map((e) => {
      return { label: e.label, value: e.value, selected: false };
    }),
    platforms: JSON.parse(localStorage.getItem("platforms")).map((e) => {
      return { label: e.label, value: e.value, selected: false };
    }),
    category: JSON.parse(localStorage.getItem("categories")).map((e) => {
      return { label: e.label, value: e.value, selected: false };
    }),
    gender: [
      { label: "MALE", value: "MALE" },
      { label: "FEMALE", value: "FEMALE" },
      { label: "TRANSGENDER", value: "TRANSGENDER" },
    ],
    user: [],
  });

  const [tabs] = useState([
    { label: "All Users", value: "all-users" },
    { label: "Groups", value: "groups" },
    { label: "Requests", value: "requests" },
  ]);
  const [filter, setFilter] = useState([]);
  const handleDeleteFilter = (item, index) => {
    if (["followers", "totalViews", "age"].includes(item.cat)) {
      let d = filter;
      d = d.filter((e) => e.cat != item.cat);
      setFilter(d);
      return;
    }
    let filteritem = [...filter];
    filteritem = filteritem.filter(
      (e, i) => e.value.value !== item.value.value
    );
    setFilter(filteritem);

    let dummyOption = [...options[item.cat]];
    dummyOption.map((e) => {
      if (e.value === item.value.value) {
        e.selected = false;
      }
      return e;
    });
    setOptions((prev) => {
      return { ...prev, [item.cat]: dummyOption };
    });
  };

  const formatNumber = (number) => {
    let formatted = "";
    if (number === 0) {
      formatted += "0";
      return formatted;
    }

    let remainingNumber = number;
    if (remainingNumber >= 1000000) {
      const millions = Math.floor(remainingNumber / 1000000);
      remainingNumber = remainingNumber - millions * 1000000;
      if (millions > 0) {
        formatted += `${millions}M `;
      }
    }
    if (remainingNumber >= 1000) {
      const thousands = Math.floor(remainingNumber / 1000);
      remainingNumber = remainingNumber - thousands * 1000;

      formatted += `${thousands}K `;
    }
    if (remainingNumber > 0) {
      formatted += `${remainingNumber}`;
    }
    return formatted;
  };

  //fetch requests list

  const getData = async () => {
    let searchCriteria = [
      {
        field: "documentType",
        value: "PARTNER_TAG",
        operator: "==",
        logical: "AND",
      },
    ];
    let reviews = filter.filter((item) => item.cat === "reviews");
    if (reviews.length) {
      searchCriteria.push(
        {
          field: "averageReview",
          operator: ">=",
          value: reviews[0].value.value * 20,
          logical: "AND",
        },
        {
          field: "averageReview",
          operator: "<=",
          value: 100,
          logical: "AND",
        }
      );
    }

    let language = filter.filter((item) => item.cat === "language");
    if (language.length) {
      searchCriteria.push({
        field: "languages",
        termField: "languages",
        operator: "LIKE",
        termValue: language.map((e) => e.value.value),
        logical: "AND",
      });
    }

    let location = filter.filter((item) => item.cat === "location");
    if (location.length) {
      searchCriteria.push({
        field: "locations",
        termField: "locations",
        operator: "LIKE",
        termValue: location.map((e) => e.value.value),
        logical: "AND",
      });
    }
    let plateform = filter.filter((item) => item.cat === "platforms");
    if (plateform.length) {
      searchCriteria.push({
        field: "platforms",
        termField: "platforms",
        operator: "LIKE",
        termValue: plateform.map((e) => e.value.value),
        logical: "AND",
      });
    }

    let gender = filter.filter((item) => item.cat === "gender");
    if (gender.length) {
      searchCriteria.push({
        field: "gender",
        termField: "gender",
        operator: "LIKE",
        termValue: gender.map((e) => e.value.value),
        logical: "AND",
      });
    }
    let followers = filter.filter((item) => item.cat === "followers");
    if (followers.length) {
      searchCriteria.push(
        {
          field: "totalFollowers",
          operator: ">=",
          value: followers[0]?.value?.value[0] * 1000,
          logical: "AND",
        },
        {
          field: "totalFollowers",
          operator: "<=",
          value: followers[0]?.value?.value[1] * 1000,
          logical: "AND",
        }
      );
    }
    let age = filter.filter((item) => item.cat === "age");
    if (age.length) {
      searchCriteria.push(
        {
          field: "minAge",
          operator: ">=",
          value: age[0]?.value?.value[0],
          logical: "AND",
        },
        {
          field: "maxAge",
          operator: "<=",
          value: age[0]?.value?.value[1],
          logical: "AND",
        }
      );
    }
    let totalViews = filter.filter((item) => item.cat === "totalViews");
    if (totalViews.length) {
      searchCriteria.push(
        {
          field: "totalView",
          operator: ">=",
          value: totalViews[0]?.value?.value[0],
          logical: "AND",
        },
        {
          field: "totalView",
          operator: "<=",
          value: totalViews[0]?.value?.value[1],
          logical: "AND",
        }
      );
    }
    let categories = filter.filter((item) => item.cat === "category");
    if (categories.length) {
      searchCriteria.push({
        field: "tags",
        termField: "tags",
        operator: "LIKE",
        termValue: categories.map((e) => e.value.value),
        logical: "AND",
      });
    }
    console.log(filter);
    let user = filter.filter((item) => item.cat === "user");
    if (user.length) {
      searchCriteria.push({
        field: "partnerId",
        operator: "in",
        value: user.map((e) => e.value.value),
        logical: "AND",
      });
    }

    let userGroup = filter.filter((item) => item.cat === "filterUserGroups");
    let userGroupIds = [];
    if (userGroup.length) {
      for (let i = 0; i < userGroup.length; i++) {
        userGroupIds.push(userGroup[i].value.value);
      }
    }

    console.log("FilterUserGroup ::::: ", userGroupIds);

    switch (active) {
      case "all-users":
        setdata([]);
        try {
          const j = await userService.fetchAllUsersGroups({
            page: currentPage,
            size: rowsPerPage,
            fetchLevel: "PLATFORM",
            searchCriteria: searchCriteria,
            userGroupIds: userGroupIds,
            userGroupSearch: userGroupIds.length <= 0 ? false : true,
          });
          console.log("In all users fetch");
          console.log(j.data.message.partnerTags);
          j.data.message.partnerTags
            ? setdata(j.data.message.partnerTags)
            : setdata([]);
          setCount(parseInt(j?.data?.message?.count || 0));
        } catch (error) {
          console.log(error);
        }

        break;

      case "groups":
        setdata([]);
        try {
          const j = await userService.fetchAllUsersGroups({
            from: 0,
            page: currentPage,
            size: rowsPerPage,
            fetchLevel: "NONE",
            canFetchExtraAttribute: true,
            searchCriteria: searchCriteria,
            userGroupSearch: true,
            userGroupIds: userGroupIds,
          });
          console.log("In all users fetch");
          console.log(j.data.message.partnerTags);
          j.data.message.partnerTags
            ? setdata(j.data.message.partnerTags)
            : setdata([]);
          setCount(parseInt(j?.data?.message?.count || 0));
        } catch (error) {
          console.log(error);
        }
        break;

      case "requests":
        setdata([]);
        try {
          const rj = await userService.fetchRequestsList({
            from: 0,
            page: currentPage,
            size: rowsPerPage,
            fetchLevel: "NONE",
            canFetchExtraAttribute: true,
            searchCriteria: searchCriteria,
            userGroupSearch: true,
            userGroupIds: userGroupIds,
          });
          console.log("In requets fetch");
          console.log(rj.data.partnerTags);
          rj.data.partnerTags ? setdata(rj.data.partnerTags) : setdata([]);
          setCount(parseInt(rj?.data?.message?.count || 0));
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        console.log("entering switch ");
    }
  };

  useEffect(() => {
    getData();
    return () => {};
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getData();
    return () => {};
  }, [filter]);

  useEffect(() => {
    setCurrentPage(1);
    getData();
    return () => {};
  }, [active]);

  useEffect(() => {
    const fetchDetails = async () => {
      let payload = {
        userGroupSearch: true,
      };
      let rs = await userService.fetchUserGroups(payload);
      console.log("Fetch User Groups", rs);
      let userGroupss = rs?.data?.message;
      console.log("Into Users", userGroupss);
      let messageMa = new Map();
      let messageMaName = new Map();
      if (userGroupss != undefined) {
        let userSetup = [];
        userGroupss.forEach((item) => {
          userSetup.push({
            value: item.userGroupId,
            valueN:item,
            label: item.userGroupName,
            image:
              "https://public-document-influozy.s3.ap-south-1.amazonaws.com/images/Group.jpeg",
          });
          messageMa.set(item.userGroupId, item)
          messageMaName.set(item.userGroupName, item)
        });
        console.log("Into Users", userSetup);
        
        setUserGroupDropdown(userSetup);
        setUserGroupDropdownMap(messageMa);
        setUserGroupDropdownNameMap(messageMaName);

        // setOptions((prev) => {
        //   return { ...prev, ['filterUserGroups']: userSetup };
        // });
        setOptions((prev) => {
          const dummy = { ...prev };
          dummy.filterUserGroups = userSetup;
          return dummy;
        });
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    setActive(active);
    getData();
  }, [requestAction]);

  useEffect(() => {
    const getUser = async () => {
      //const rs = await userService.fetchUsers();
      let rs = {};
      //const rs = await userService.fetchSearchOption()
      const userSetup = (rs?.data?.message || []).map((item) => {
        return {
          value: item.partnerId,
          label: item.firstName + " " + item.lastName,
          name: item.firstName + " " + item.lastName,
          image:
            item.userPictureLink === undefined
              ? "https://seeklogo.com/images/L/logo-com-hr-logo-5636A4D2D5-seeklogo.com.png"
              : item.userPictureLink,
          platforms: item.stakeHolderType,
          category: item.preferredLanguage,
        };
      });
      setOptions((prev) => {
        const dummy = { ...prev };
        dummy.user = userSetup;
        return dummy;
      });
    };
    getUser();
  }, []);

  //accept/reject group request

  const acceptGroupRequest = (groupId, groupName) => {
    setRequestAction("accepting");
    let payload = {
      userGroupId: groupId,
      userGroupName: groupName,
    };

    userService
      .approvegrouprequest(payload)
      .then((res) => {
        console.log("Request accepted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectGroupRequest = (groupId, groupName) => {
    setRequestAction("rejection");

    let payload = {
      userGroupId: groupId,
      userGroupName: groupName,
    };

    userService
      .rejectGrouprequest(payload)
      .then((res) => {
        console.log("Request rejected");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let columns = [
    //   ...paidByYouColumnList,

    {
      name: "User Profile",
      sortable: true,
      minWidth: "230px",
      maxWidth: "300px",
      selector: (row) => {
        return (
          <div className="datatable-avatar">
            <Avatar
              alt="Remy Sharp"
              src={row.logoLink || ""}
              sx={{ width: 37, height: 37 }}
            />

            <div>
              {/* <NavLink to={`/user_details/${row.partnerId}`}>jjjjjjjjjjjjjjj</NavLink> */}
              <h3
                onClick={() => {
                  setUserModal({
                    visible: true,
                    data: row,
                  });
                  navigate(`/user_details/${row.partnerId}`);
                }}
              >
                {row.userName || row.emailId || ""}
              </h3>
              <span>{`${row.stakeHolderType[0] || ""}${
                row.stakeHolderType[0] ? "-" : ""
              }${row.totalJobs || 0} Jobs`}</span>
            </div>
          </div>
        );
      },
    },

    {
      name: "Reviews",
      sortable: true,
      minWidth: "180px",
      maxWidth: "250px",
      selector: (row) => {
        return (
          <div>
            <h3>
              {(row.averageReview / 20).toFixed(2)} of {row.totalReviews}{" "}
              reviews
            </h3>
            <Rate
              allowHalf
              disabled
              defaultValue={(row.averageReview / 20).toFixed(2) || 0}
            />
          </div>
        );
      },
    },
    {
      name: "Avg View",
      sortable: true,
      minWidth: "100px",
      maxWidth: "100px",
      selector: (row) => {
        return formatNumber(row.totalView || 0);
      },
    },
    {
      name: "Location",
      sortable: true,
      minWidth: "100px",
      maxWidth: "100px",
      selector: (row) => {
        return (
          <div className="tag-list">
            {(row.locations || []).map((tag, tagIndex) => {
              if (tag === "" || tag === " ") return;
              return (
                <div key={tagIndex} className="tag-item">
                  {tag}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      name: "Language",
      sortable: true,
      minWidth: "100px",
      maxWidth: "100px",
      selector: (row) => {
        return (
          <div className="tag-list">
            {(row.languages || []).map((tag, tagIndex) => {
              if (tag === "" || tag === " ") return;
              return (
                <div key={tagIndex} className="tag-item">
                  {tag}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      name: "Followers",
      sortable: true,
      minWidth: "100px",
      maxWidth: "100px",
      selector: (row) => `${formatNumber(row.totalFollowers || 0)}`,
    },
    {
      name: "Category",
      sortable: true,
      minWidth: "200px",
      maxWidth: "200px",
      selector: (row) => {
        return (
          <div className="tag-list">
            {(row.tags || []).map((tag, tagIndex) => {
              if (tag === "" || tag === " ") return;
              return (
                <div key={tagIndex} className="tag-item">
                  {tag}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      name: "Platform",
      sortable: true,
      minWidth: "200px",
      maxWidth: "200px",
      selector: (row) => {
        return (
          <div className="tag-list">
            {(row.platforms || []).map((tag, tagIndex) => {
              if (tag === "" || tag === " ") return;
              return (
                <div key={tagIndex} className="tag-item">
                  {tag}
                </div>
              );
            })}
          </div>
        );
      },
    },

    {
      name: "Groups",
      allowOverflow: true,
      minWidth: "10rem",
      maxWidth: "10rem",

      cell: (row) => (
        <div style={{ maxHeight: 150, overflow: "scroll" }}>
          {row.userGroupNames &&
            row.userGroupNames.split(",").map(function (a) {
              if (a !== "") {
                return (
                  <div key={a} style={{ padding: 2 }}>
                    <p
                      style={{
                        backgroundColor: "#FFFFFF", // Background color set to FFFFFF
                        color: "#898989", // Font color set to 898989
                        fontSize: 10,
                        padding: 10, // Increased padding for a more button-like appearance
                        borderRadius: 10, // Border radius set to 70
                        border: "1px solid #898989", // Border added with color set to 898989
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow added
                        display: "inline-block",
                      }}
                    >
                      {{ a } && <>{a}</>}
                    </p>
                  </div>
                );
              }
            })}
        </div>
      ),
    },
  ];

  if (active === "all-users") {
    columns = [
      ...columns,
      ...[
        {
          name: "Actions",
          allowOverflow: true,
          minWidth: "8rem",
          maxWidth: "10rem",
          cell: (row) => (
            <div>
              {/* <SendOutlined
                          onClick={() => { }}
                          style={{ color: "gray", cursor: "pointer" }}
                      /> */}

              <Stack direction="row">
                <MessageOutlined
                  onClick={() => {
                    onMessageClick(row);
                  }}
                  style={{ cursor: "pointer" }}
                />

                {/* <Button size="small" onClick={showModal} type="primary">
                  Add to Group
                </Button> */}
                <img
                  src={CreateGroupIcon}
                  onClick={(e) => showModal(row)}
                  style={{
                    marginLeft: "10px",
                    width: "30px",
                    height: "30px",
                    viewBox: "0 0 30px 30px",
                    fill: "none",
                  }}
                />
              </Stack>
            </div>
          ),
        },
      ],
    ];
  }

  const userGroupArrayLoop = (groupNames, groupIds) => {
    let userGroupArray = [];
    if (groupIds === undefined) {
      return userGroupArray;
    }
    console.log("Into User group Array Loop ::::", groupNames, groupIds);

    let userGroupIds = groupIds.split(",");
    let groupNamesArray = groupNames.split(",");

    // groupNames.split(",").forEach((data) => {
    //   userGroupArray.push({
    //     label: data,
    //     value: data,
    //   });
    // });

    // groupIds.split(",").forEach((data) => {
    //   userGroupIds.push({
    //     id: data,
    //   });
    // });

    for (let i = 0; i < userGroupIds.length; i++) {
      // userGroupArray[i].ids = userGroupIds[i];
      userGroupArray.push({
        label: groupNamesArray[i],
        value: userGroupIds[i],
      });
    }

    return userGroupArray;
  };

  const [isHovered, setIsHovered] = useState(new Map());

  const handleMouseOver = (e, id) => {
    //isHovered.set(id.value , true)
    //setIsHovered(true);
    console.log("Into User List Groups :::", e, isHovered);

    //setIsHovered(isHovered);
    setIsHovered((prevMap) => new Map(prevMap.set(id.value, true)));
  };

  const handleMouseOut = (e, id) => {
    //setIsHovered(false);
    //isHovered.set(id.value , false)
    console.log("Into User List Groups :::", e, isHovered);
    //setIsHovered(isHovered);
    setIsHovered((prevMap) => new Map(prevMap.set(id.value, false)));
  };

  const renderUserGroupOptions = (row) => {
    return (
      <div>
        {userGroupArrayLoop(row.userGroupNames, row.userGroupIds).map(function (
          a
        ) {
          if (a !== "" && a.label !== undefined && a.label !== "") {
            return (
              <>
                {/* {isHovered.get(a.value)} */}
                {/* {a.label} */}
                {console.log("Into iteration of groups", isHovered)}
                {/* {a.label}
                              {a.value} */}
                <div
                  key={a.value}
                  style={{
                    overflow: "hidden",
                    marginBottom: 0,
                    width: "250px",
                    maxHeight: "300px",
                    overflowY: "auto",
                    cursor: "pointer",
                    //borderRadius: '8px',
                    //boxShadow: '0px 0px 5px 0px #000000',
                    backgroundColor: isHovered.get(a.value)
                      ? "#D3D3D3"
                      : "#FFFFFF",
                    display: "flex",
                    flexDirection: "column", // Set flex direction to column
                    alignItems: "center", // Center align items horizontally
                    //overflowY: "hidden",
                    //borderRadius: '8px 0px 0px 8px',
                    //backgroundColor: (isHovered.get(a.value) !== undefined && isHovered.get(a.value)) ? '#D3D3D3' : '#FFFFFF', // Different background color
                    //textDecoration: (isHovered.get(a.value) !== undefined && isHovered.get(a.value)) ? 'underline' : 'none',
                  }}
                  onMouseOver={(e) => handleMouseOver(e, a)}
                  onMouseOut={(e) => handleMouseOut(e, a)}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight:
                        isHovered.get(a.value) !== undefined &&
                        isHovered.get(a.value)
                          ? 600
                          : 400,
                      cursor: "pointer",
                      backgroundColor:
                        isHovered.get(a.value) !== undefined &&
                        isHovered.get(a.value)
                          ? "#D3D3D3"
                          : "#FFFFFF", // Different background color
                      // textDecoration: (isHovered.get(a.value) !== undefined && isHovered.get(a.value)) ? 'underline' : 'none',
                      textAlign: "center", // Center align the text
                      margin: "8px 0", // Add margin for spacing
                      borderRadius: 20,
                    }}
                    onClick={() => {
                      handleGroupChat(a.value);
                    }}
                    onMouseOver={(e) => handleMouseOver(e, a)}
                    onMouseOut={(e) => handleMouseOut(e, a)}
                  >
                    {{ a } && <>{a.label}</>}
                  </p>
                  <Divider style={{ margin: "auto 0 0 0" }} />
                </div>
              </>
            );
          }
        })}
      </div>
    );
  };

  if (active === "groups") {
    columns = [
      ...columns,
      ...[
        {
          name: "Actions",
          allowOverflow: true,
          minWidth: "8rem",
          maxWidth: "10rem",
          cell: (row) => (
            <div style={{ width: "50%" }}>
              <div>
                {/* <SendOutlined
                          onClick={() => { }}
                          style={{ color: "gray", cursor: "pointer" }}
                      /> */}

                <Stack direction="row">
                  <MessageOutlined
                    onClick={() => {
                      onMessageClick(row);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <div style={{ marginLeft: "10px" }}></div>
                  {/* <Button size="small" onClick={showModal} type="primary">
                  Add to Group
                </Button> */}
                  <Select
                    className="no-border-select"
                    value={undefined}
                    onChange={(e) => handleGroupChat(e)}
                    dropdownRender={(e) => renderUserGroupOptions(row)}
                    mode="single"
                    dropdownStyle={{
                      width: "250px",
                      maxHeight: "300px",
                      overflowY: "auto",
                      minWidth: "250px",
                      overflowX: "auto",
                    }}
                    style={{
                      width: "120px",
                      border: "0 !important", // Remove the border
                      //paddingLeft: '8px',
                      // backgroundColor: "#f5f5f5",
                    }} // Set the width as needed
                    bordered={false}
                    suffixIcon={
                      <img
                        ref={iconRef}
                        src={UserGroupChatIcon}
                        onClick={openUserGroupModal}
                        style={{
                          width: "30px",
                          height: "30px",
                          border: "none",
                          //viewBox: "0 0 30px 30px",
                          //backgroundColor: "#f5f5f5",
                          fill: "none",
                        }}
                      />
                    }
                  ></Select>
                  {/* <img ref={iconRef} src={UserGroupChatIcon} onClick={openUserGroupModal} style={{
                    marginLeft: '10px',
                    width: "30px",
                    height: "30px",
                    viewBox: "0 0 30px 30px",
                    fill: "none"
                  }}         
                  /> */}
                  <div>
                    {/* <Button type="primary" onClick={openUserGroupModal}>
                  UserGroups
                </Button> */}
                    <Modal
                      open={openGroupModal}
                      onCancel={closeGroupModal}
                      //bodyStyle={{ height: "100%" }}
                      bodyStyle={{ maxHeight: "300px", overflowY: "auto" }}
                      width={250}
                      footer={null}
                      //style={{ top: 130, left: 400 }}
                      style={{
                        top: 130,
                        left: 400,
                        //position: 'absolute',
                        //top: 'calc(100% + 5px)', // Adjust the vertical position as needed
                        //left: 'calc(80%)',
                        //left: '400px', // Adjust the horizontal position as needed
                        //top: iconRef.current ? iconRef.current.offsetTop + iconRef.current.offsetHeight + 5 : 0,
                        //left: iconRef.current ? iconRef.current.offsetLeft : 0,
                      }}
                      closable={false}
                    >
                      <div>
                        {userGroupArrayLoop(
                          row.userGroupNames,
                          row.userGroupIds
                        ).map(function (a) {
                          if (
                            a !== "" &&
                            a.label !== undefined &&
                            a.label !== ""
                          ) {
                            return (
                              <>
                                {/* {isHovered.get(a.value)} */}
                                {/* {a.label} */}
                                {console.log(
                                  "Into iteration of groups",
                                  isHovered
                                )}
                                {/* {a.label}
                              {a.value} */}
                                <div
                                  key={a.value}
                                  style={{
                                    overflow: "hidden",
                                    marginBottom: 0,

                                    //overflowY: "hidden",
                                    //borderRadius: '8px 0px 0px 8px',
                                    //backgroundColor: (isHovered.get(a.value) !== undefined && isHovered.get(a.value)) ? '#D3D3D3' : '#FFFFFF', // Different background color
                                    //textDecoration: (isHovered.get(a.value) !== undefined && isHovered.get(a.value)) ? 'underline' : 'none',
                                  }}
                                  //onMouseOver={(e) => handleMouseOver( e, a)}
                                  //onMouseOut={(e) =>handleMouseOut( e, a)}
                                >
                                  <p
                                    style={{
                                      fontSize: 12,
                                      cursor: "pointer",
                                      backgroundColor:
                                        isHovered.get(a.value) !== undefined &&
                                        isHovered.get(a.value)
                                          ? "#D3D3D3"
                                          : "#FFFFFF", // Different background color
                                      textDecoration:
                                        isHovered.get(a.value) !== undefined &&
                                        isHovered.get(a.value)
                                          ? "underline"
                                          : "none",
                                    }}
                                    onClick={() => {
                                      handleGroupChat(a.value);
                                    }}
                                    onMouseOver={(e) => handleMouseOver(e, a)}
                                    onMouseOut={(e) => handleMouseOut(e, a)}
                                  >
                                    {{ a } && <>{a.label}</>}
                                  </p>
                                  <Divider style={{ marginTop: 0 }} />
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                    </Modal>
                  </div>
                </Stack>
              </div>
            </div>
          ),
        },
      ],
    ];
  }

  if (active === "requests") {
    columns = [
      ...columns,
      ...[
        {
          name: "Actions",
          allowOverflow: true,
          minWidth: "8rem",
          maxWidth: "10rem",
          cell: (row) => (
            <div>
              {/* <SendOutlined
                          onClick={() => { }}
                          style={{ color: "gray", cursor: "pointer" }}
                      /> */}

              <Stack direction="row">
                <Button
                  size="small"
                  type="primary"
                  style={{ marginRight: 4 }}
                  onClick={() => {
                    acceptGroupRequest(row.userGroupIds, row.userGroupNames);
                  }}
                >
                  Accept
                </Button>

                <Button
                  size="small"
                  type="dashed"
                  onClick={() => {
                    rejectGroupRequest(row.userGroupIds, row.userGroupNames);
                  }}
                >
                  Reject
                </Button>
              </Stack>
            </div>
          ),
        },
      ],
    ];
  }

  const onMessageClick = (row) => {
    console.log("Into User Details onMessageClick", row);
    navigate(`/messages?messageType=USER_USER&id=${row.partnerId}`);
  };
  const columns2 = [
    //   ...paidByYouColumnList,

    {
      name: "User Profile",
      sortable: true,
      minWidth: "230px",
      maxWidth: "230px",
      selector: (row) => {
        return (
          <div className="datatable-avatar">
            <img
              alt="Remy Sharp"
              src={
                row.platformType
                  ? socialImages[row.platformType.toLowerCase()] || ""
                  : ""
              }
              style={{ width: "37px", height: "37px" }}
            />
            <div>
              <a style={{ textDecoration: "none" }} href={row.publicLink || ""}>
                <h3>{row.platformName || ""}</h3>
              </a>
              <span>{`${row.totalJobs || 0} Jobs`}</span>
            </div>
          </div>
        );
      },
    },
    {
      name: "Reviews",
      sortable: true,
      minWidth: "180px",
      maxWidth: "180px",
      selector: (row) => {
        return (
          <div>
            <h3>
              {(row.averageReview / 20).toFixed(2)} of {row.totalReviews}{" "}
              reviews
            </h3>
            <Rate
              allowHalf
              disabled
              defaultValue={(row.averageReview / 20).toFixed(2) || 0}
            />
          </div>
        );
      },
    },
    {
      name: "Avg View",
      sortable: true,
      minWidth: "100px",
      maxWidth: "100px",
      selector: (row) => {
        return formatNumber(row.totalView || 0);
      },
    },
    {
      name: "Location",
      sortable: true,
      minWidth: "100px",
      maxWidth: "100px",
      selector: (row) => {
        return (
          <div className="tag-list">
            {(row.locations || []).map((tag, tagIndex) => {
              if (tag === "" || tag === " ") return;
              return (
                <div key={tagIndex} className="tag-item">
                  {tag}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      name: "Language",
      sortable: true,
      minWidth: "100px",
      maxWidth: "100px",
      selector: (row) => {
        return (
          <div className="tag-list">
            {(row.languages || []).map((tag, tagIndex) => {
              if (tag === "" || tag === " ") return;
              return (
                <div key={tagIndex} className="tag-item">
                  {tag}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      name: "Followers",
      sortable: true,
      minWidth: "100px",
      maxWidth: "100px",
      selector: (row) => `${formatNumber(row.totalFollowers) || ""}`,
    },
    {
      name: "Category",
      sortable: true,
      minWidth: "200px",
      maxWidth: "200px",
      selector: (row) => {
        return (
          <div className="tag-list">
            {(row.categories || []).map((tag, tagIndex) => {
              if (tag === "" || tag === " ") return;
              return (
                <div key={tagIndex} className="tag-item">
                  {tag}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      name: "Platform",
      sortable: true,
      minWidth: "200px",
      maxWidth: "200px",
      selector: (row) => {
        return (
          <div className="tag-list">
            {(row.tags || []).map((tag, tagIndex) => {
              if (tag === "" || tag === " ") return;
              return (
                <div key={tagIndex} className="tag-item">
                  {tag}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      name: "Actions",
      allowOverflow: true,
      minWidth: "8rem",
      maxWidth: "8rem",
      cell: (row) => (
        <div>
          {/* <SendOutlined
            onClick={() => { }}
            style={{ color: "gray", cursor: "pointer" }}
          />

          <MessageOutlined onClick={() => { }} style={{ cursor: "pointer" }} /> */}
        </div>
      ),
    },
  ];
  // ** Function to handle Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page.selected);
  };
  const handlePerPage = (e) => {
    setCurrentPage(0);
    setRowsPerPage(parseInt(e.target.value));
  };

  const CustomPagination = (props) => {
    return (
      <div className="dataTable-footer">
        <Pagination
          count={Math.ceil(count / rowsPerPage)}
          onChange={(e, page) => {
            setCurrentPage(page);
          }}
          page={parseInt(currentPage)}
          siblingCount={0}
          variant="outlined"
          color="primary"
          shape="rounded"
        />
      </div>
    );
  };
  const handelSelectSinglevalue = (key, innerkey) => {
    let updatedOptions = options[key].map((item) => {
      const updatedValue = { ...item };
      if (item.value === innerkey) {
        updatedValue.selected = true; // !updatedValue.selected
      } else {
        updatedValue.selected = false;
      }
      return updatedValue;
    });
    setOptions((prev) => {
      return { ...prev, [key]: updatedOptions };
    });
    // updating filters
    let updatedFilter = filter.filter((item) => item.cat !== key);
    if (innerkey !== undefined) {
      updatedFilter.push({
        cat: key,
        value: { label: innerkey, value: innerkey, selected: true },
      });
    }
    setFilter(updatedFilter);

    // }
  };
  const handelSelectMultivaluevalue = (key, innerkey, extraData) => {
    // updating options if options was already in list
    let innerkeyCopy = [...innerkey];
    let updatedOptions = (options[key] || []).map((item) => {
      const updatedValue = { ...item };
      if (innerkey.includes(item.value)) {
        updatedValue.selected = true; // !updatedValue.selected
      } else {
        updatedValue.selected = false;
      }
      innerkeyCopy.filter((e) => e !== item.value);
      return updatedValue;
    });

    if (extraData.length) {
      innerkey.forEach((e, i) => {
        if (extraData[i].value === undefined) {
          updatedOptions.push({ label: e, value: e, selected: true });
        }
      });
    }

    setOptions((prev) => {
      return { ...prev, [key]: updatedOptions };
    });
    // updating filters
    let innerkeyCopyfilter = [...innerkey];
    let updatedFilter = filter.filter((item) => {
      if (item.cat !== key) return item;
      if (innerkeyCopyfilter.includes(item.value.value)) {
        innerkeyCopyfilter = innerkeyCopyfilter.filter((e) => {
          return e !== item.value.value;
        });
        return item;
      }
    });

    if (key === "user") {
      innerkeyCopyfilter.forEach((e) => {
        const j = options["user"].find((d) => d.value === e);
        updatedFilter.push({ cat: key, value: j });
      });
    } else {
      innerkeyCopyfilter.forEach((e) => {
        updatedFilter.push({
          cat: key,
          value: { label: e, value: e, selected: true },
        });
      });
    }
    setFilter(updatedFilter);

    // }
  };

  const handelSelectMultivaluevalueUser = (key, innerk, extraData) => {
    // updating options if options was already in list

    //console.log('handelSelectMultivaluevalueUser into values :::' , key, innerkey, extraData)
    let innerkey = [];
    for (let i = 0; i < innerk.length; i++) {
      options[key].push(innerk[i]);
      innerkey.push(innerk[i].partnerID);
    }
    console.log(
      "handelSelectMultivaluevalueUser into values :::",
      key,
      innerkey,
      extraData,
      options
    );

    let innerkeyCopy = [...innerkey];
    let updatedOptions = (options[key] || []).map((item) => {
      const updatedValue = { ...item };
      if (innerkey.includes(item.value)) {
        updatedValue.selected = true; // !updatedValue.selected
      } else {
        updatedValue.selected = false;
      }
      innerkeyCopy.filter((e) => e !== item.value);
      return updatedValue;
    });

    if (extraData.length) {
      innerkey.forEach((e, i) => {
        if (extraData[i].value === undefined) {
          updatedOptions.push({ label: e, value: e, selected: true });
        }
      });
    }

    setOptions((prev) => {
      return { ...prev, [key]: updatedOptions };
    });
    // updating filters
    let innerkeyCopyfilter = [...innerkey];
    let updatedFilter = filter.filter((item) => {
      if (item.cat !== key) return item;
      if (innerkeyCopyfilter.includes(item.value.value)) {
        innerkeyCopyfilter = innerkeyCopyfilter.filter((e) => {
          return e !== item.value.value;
        });
        return item;
      }
    });

    if (key === "user") {
      innerkeyCopyfilter.forEach((e) => {
        const j = options["user"].find((d) => d.value === e);
        updatedFilter.push({ cat: key, value: j });
      });
    } else {
      innerkeyCopyfilter.forEach((e) => {
        updatedFilter.push({
          cat: key,
          value: { label: e, value: e, selected: true },
        });
      });
    }
    setFilter(updatedFilter);

    // }
  };

  const handelSelectMultivaluevalueUserGroup = (key, innerk, extraData) => {
    // updating options if options was already in list

    //console.log('handelSelectMultivaluevalueUser into values :::' , key, innerkey, extraData)
    let innerkey = [];
    for (let i = 0; i < innerk.length; i++) {
      //options[key].push(innerk[i]);
      innerkey.push(innerk[i]);
    }
    console.log(
      "handelSelectMultivaluevalueUserGroup into values :::",
      key,
      innerk,
      innerkey,
      extraData,
      options
    );

    let innerkeyCopy = [...innerkey];
    let updatedOptions = (options[key] || []).map((item) => {
      const updatedValue = { ...item };
      if (innerkey.includes(item.value)) {
        updatedValue.selected = true; // !updatedValue.selected
      } else {
        updatedValue.selected = false;
      }
      innerkeyCopy.filter((e) => e !== item.value);
      return updatedValue;
    });

    console.log(
      "handelSelectMultivaluevalueUserGroup into values ::: UpdatedOptions",
      key,
      innerkeyCopy,
      updatedOptions
    );

    if (extraData.length) {
      innerkey.forEach((e, i) => {
        if (extraData[i].value === undefined) {
          updatedOptions.push({ label: e, value: e, selected: true });
        }
      });
    }

    setOptions((prev) => {
      return { ...prev, [key]: updatedOptions };
    });
    // updating filters
    let innerkeyCopyfilter = [...innerkey];
    let updatedFilter = filter.filter((item) => {
      if (item.cat !== key) return item;
      if (innerkeyCopyfilter.includes(item.value.value)) {
        innerkeyCopyfilter = innerkeyCopyfilter.filter((e) => {
          return e !== item.value.value;
        });
        return item;
      }
    });

    if (key === "user") {
      innerkeyCopyfilter.forEach((e) => {
        const j = options["user"].find((d) => d.value === e);
        updatedFilter.push({ cat: key, value: j });
      });
    } else if (key === "filterUserGroups") {
      innerkeyCopyfilter.forEach((e) => {
        const j = options["filterUserGroups"].find((d) => d.value === e);
        updatedFilter.push({ cat: key, value: j });
      });
    } else {
      innerkeyCopyfilter.forEach((e) => {
        updatedFilter.push({
          cat: key,
          value: { label: e, value: e, selected: true },
        });
      });
    }
    setFilter(updatedFilter);

    // }
  };

  const ExpandableTable = ({ data }) => {
    const [childData, setChildData] = useState([]);
    const getChildData = async () => {
      try {
        const j = await userService.fetchUserData({
          from: 0,
          size: 20,
          fetchLevel: "PLATFORM",
          searchCriteria: [
            {
              field: "documentType",
              value: "PARTNER_TAG",
              operator: "==",
              logical: "AND",
            },
            {
              field: "partnerId",
              value: [`${data.partnerId}`],
              operator: "in",
              logical: "AND",
            },
          ],
        });
        j.data.message.platformTagSers &&
          setChildData(j.data.message.platformTagSers);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getChildData();
    }, [data]);
    return (
      <div
        style={{
          marginLeft: "49px",
          border: "1px solid #ccc",
          maxHeight: "200px",
          overflow: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DataTable
          columns={columns2}
          noHeader
          noTableHead
          // tit
          data={childData}
        />
      </div>
    );
  };

  const updateFilterToDefaultValue = () => {
    setUserSelected([]);
    setFilter([]);
    setMinMaxValue({
      followers: [0, 100000],
      totalViews: [0, 100000],
      age: [15, 25],
    });
    let rev = options["reviews"];
    for (let i = 0; i < rev.length; i++) {
      rev[i].selected = false;
    }
    let rev1 = options["language"];
    for (let i = 0; i < rev1.length; i++) {
      rev1[i].selected = false;
    }
    let rev2 = options["location"];
    for (let i = 0; i < rev2.length; i++) {
      rev2[i].selected = false;
    }
    let rev3 = options["platforms"];
    for (let i = 0; i < rev3.length; i++) {
      rev3[i].selected = false;
    }
    let rev4 = options["category"];
    for (let i = 0; i < rev4.length; i++) {
      rev4[i].selected = false;
    }
    let rev5 = options["gender"];
    for (let i = 0; i < rev5.length; i++) {
      rev5[i].selected = false;
    }
    let rev6 = options["user"];
    for (let i = 0; i < rev6.length; i++) {
      rev6[i].selected = false;
    }
    console.log("Into Filter Options ::::", options);
    setFilterUserGroupsT(["ALL"]);
  };

  return (
    <>
      <div className="jobs-container">
        <div className="jobs-tab">
          {tabs?.map((tab, index) => {
            return (
              <div
                onClick={() => {
                  updateFilterToDefaultValue();
                  setActive(tab.value);
                }}
                className={`tab-item ${
                  active === tab.value ? "active-tab" : ""
                }`}
                key={index}
              >
                {tab.label}
              </div>
            );
          })}
        </div>
      </div>

      {active == "requests" ? (
        <></>
      ) : (
        <>
          <div
            style={{ margin: "0rem 1rem" }}
            className="react-dataTable query-datatable userDetail"
          >
            <SingleUserModal
              isVisible={param.partnerId}
              data={userModal.data}
              closeModal={() => {
                setUserModal({
                  visible: false,
                  data: {},
                });
                navigate("/user_details");
              }}
            />
            <div className="select-view">
              <MinMaxDropDown
                name="followerCount"
                className="select-view-input"
                placeholder="Followers (k)"
                lable="Followers  (k)"
                value={minMaxValue["followers"]}
                options={[
                  { min: 0, max: 100000, value: "0-100000", label: "0-100000" },
                ]}
                minimum={0}
                maximum={100000}
                onChange={(e) => {
                  if (e[0] >= 0 && e[1] <= 100000 && e[0] < e[1]) {
                    setMinMaxValue((prev) => {
                      let j = filter.filter((e) => e.cat !== "followers");
                      j.push({
                        cat: "followers",
                        value: {
                          label: `${e[0]}-${e[1]} k Followers`,
                          value: e,
                        },
                      });
                      setFilter(j);
                      return { ...prev, followers: e };
                    });
                  }
                }}
              />
              <Select
                // mode="multiple"
                allowClear
                className="select-view-input"
                placeholder="Reviews"
                options={options["reviews"]}
                value={options["reviews"].find((e) => e.selected)}
                onChange={(e, k) => {
                  handelSelectSinglevalue("reviews", e);
                }}
              />
              <MinMaxDropDown
                name="avgViews"
                className="select-view-input"
                placeholder="Avg Views"
                lable="Avg Views"
                value={minMaxValue["totalViews"]}
                options={[
                  {
                    min: 0,
                    max: 100000,
                    value: "0-1000000",
                    label: "0-1000000",
                  },
                ]}
                minimum={0}
                maximum={100000}
                onChange={(e) => {
                  if (e[0] >= 0 && e[1] <= 100000 && e[0] < e[1]) {
                    setMinMaxValue((prev) => {
                      let j = filter.filter((e) => e.cat !== "totalViews");
                      j.push({
                        cat: "totalViews",
                        value: { label: `${e[0]}-${e[1]} Views`, value: e },
                      });
                      setFilter(j);
                      return { ...prev, totalViews: e };
                    });
                  }
                }}
              />
              <Select
                mode="tags"
                allowClear
                className="select-view-input"
                placeholder="Language"
                options={options["language"]}
                value={options["language"].filter((e) => e.selected)}
                onChange={(e, k) => {
                  handelSelectMultivaluevalue("language", e, k);
                }}
              />
              <Select
                mode="tags"
                allowClear
                className="select-view-input"
                placeholder="Location"
                options={options["location"]}
                value={options["location"].filter((e) => e.selected)}
                onChange={(e, k) => {
                  handelSelectMultivaluevalue("location", e, k);
                }}
              />
              <Select
                mode="tags"
                allowClear
                className="select-view-input"
                placeholder="Platforms"
                options={options["platforms"]}
                value={options["platforms"].filter((e) => e.selected)}
                onChange={(e, k) => {
                  handelSelectMultivaluevalue("platforms", e, k);
                }}
              />
              <Select
                mode="tags"
                allowClear
                className="select-view-input"
                placeholder="Category"
                options={options["category"]}
                value={options["category"].filter((e) => e.selected)}
                onChange={(e, k) => {
                  handelSelectMultivaluevalue("category", e, k);
                }}
              />
              <Select
                mode="multiple"
                allowClear
                className="select-view-input"
                placeholder="Gender"
                value={options["gender"].filter((e) => e.selected)}
                options={options["gender"]}
                onChange={(e, k) => handelSelectMultivaluevalue("gender", e, k)}
              />
              <MinMaxDropDown
                name="age"
                className="select-view-input"
                placeholder="age"
                lable="Age"
                value={minMaxValue["age"]}
                options={[{ min: 0, max: 100, value: "0-100", label: "0-100" }]}
                minimum={0}
                maximum={100}
                onChange={(e) => {
                  if (e[0] >= 0 && e[1] <= 100 && e[0] < e[1]) {
                    setMinMaxValue((prev) => {
                      let j = filter.filter((e) => e.cat !== "age");
                      j.push({
                        cat: "age",
                        value: { label: `${e[0]}-${e[1]} years`, value: e },
                      });
                      setFilter(j);
                      return { ...prev, age: e };
                    });
                  }
                }}
              />
              {/* <Select
                        mode="tags"
                        allowClear
                        className='select-view-input'
                        placeholder="User"
                        options={options['user'].map((e) => {
                            return {...e, label:<div style={{display:"flex", gap:"0.2rem"}}><Avatar style={{width:"20px", height:"20px"}} src={e.image} />   {e.name}</div>}
                        })}
                        value={options["user"]?.filter((e) => e.selected)}
                        onChange={(e, k) => {
                            handelSelectMultivaluevalue('user', e, k)
                        }}
                    /> */}
              {/* <MultiUserSelectDropDown
            options={options["user"]}
            onSelect={(e) => handelSelectMultivaluevalue("user", e, [])}
          /> */}
              <MultiUserSelectLimitedDropDown
                options={options["user"]}
                onSelect={(e) => handelSelectMultivaluevalueUser("user", e, [])}
                selectedValues={userSelected}
                setSelectedValues={setUserSelected}
              />

              {active === "groups" && (
                <>
                  <MultiUserSelectDropDown
                    style={{ width: "100%" }}
                    options={userGroupDropDown}
                    onSelect={(e) =>
                      handelSelectMultivaluevalueUserGroup(
                        "filterUserGroups",
                        e,
                        []
                      )
                    }
                    value={filterUserGroupsT}
                    active={active}
                  />
                </>
              )}
            </div>
            <div className="dataTable-footer"></div>
          </div>
        </>
      )}

      <div
        style={{ margin: "0rem 1rem" }}
        className="react-dataTable query-datatable userDetail"
      >
        <DataTable
          pagination
          selectableRows={false}
          columns={columns}
          paginationPerPage={rowsPerPage}
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={ExpandableTable}
          // expandableIcon={<ExpandMore/>}
          className="react-dataTable"
          sortIcon={<ArrowDownward size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          noHeader
          data={data}
          subHeader={true}
          subHeaderComponent={
            <div className="datatable-subHeader">
              <div className="filtered-list">
                {active === "requests" ? <></> : <FilterAltOutlined />}
                {console.log("Into Filter AltOutlined ::::", filter)}
                {filter.map((item, index) => {
                  return (
                    <div className="selected-item" key={`${item.cat}${index}`}>
                      {item.value.label}
                      <div
                        className="delete"
                        onClick={() => handleDeleteFilter(item, index)}
                      >
                        <Close fontSize="small" />
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <Button style={{ width: "16rem" }} type="primary">
                                Send Request
                            </Button> */}
            </div>
          }
        />

        <div>
          <Modal
            open={isModalOpen}
            onOk={(e) => handleOk1(e , addToGroupIdT ,addToGroupNameT )}
            onCancel={(e) => handleCancel()}
            bodyStyle={{ height: 300 }}
          >
            <>
              <h4>User Groups..</h4>

              <div style={{ margin: 4 }}>
                <p>Enter new user group...</p>
                <Input
                  type="text"
                  style={{ width: "100%", padding: 2 }}
                  id="newGroup"
                  value={addToGroupNameT}
                  onChange={(e)=>{onInputField(e)}}
                ></Input>
              </div>

              <Divider />

              <div style={{ margin: 8, marginTop: -10 }}>
                <p>Select from existing user groups....</p>

                <div style={{ margin: 6, maxHeight: 250 }}>
                  {/* <MultiSelectDropDown
                    style={{ width: "100%" }}
                    options={userGroupDropDown}
                    onSelect={(e) =>
                      handleRequestFilterChange("filterUserGroups", e)
                    }
                    value={filterUserGroupsT}
                    active={active}
                  /> */}
                  <MultiSelectDropDown
                    style={{ width: "100%" }}
                    options={userGroupDropDown}
                    isSingle={true}
                    onSelect={(e) =>
                      handleRequestFilterChange("filterUserGroups", e)
                      
                    }
                    value={addToGroupIdT}
                    active={active}
                  />
                  
                  {/* <MultiUserSelectDropDown
                    style={{ width: "100%" }}
                    options={userGroupDropDown}
                    onSelect={(e) =>
                      handleRequestFilterChange("filterUserGroups", e)
                    }
                    value={filterUserGroupsT}
                    active={active}
                  /> */}
                </div>
              </div>
            </>
          </Modal>
        </div>

        <div className="dataTable-footer"></div>
      </div>
    </>
  );
});
export default Layout(UserList);
