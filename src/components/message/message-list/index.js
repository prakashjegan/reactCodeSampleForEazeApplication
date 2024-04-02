import React, { useState } from "react";
//import { Empty, Tabs, Pagination, Spin, Input, Space } from "antd";
import { Empty, Tabs, Spin, Input, Space } from "antd";
import PropTypes from "prop-types";
//import compose from 'recompose/compose'
import MessageItem from "../message-item";
import { bindActionCreators, compose } from "redux";
import { useEffect } from "react";
import { connect } from "react-redux";
import messageDuck from "../duck";
import messageDetailDuck from "../message-detail/duck";
import "./style.scss";
import { AutoSizer, List } from "react-virtualized";
import { center } from "@antv/g2plot/lib/plots/sankey/sankey";
import { useNavigate, useSearchParams } from "react-router-dom";
import MultiUserSelectDropDown from "./multiUserSelect";
import userService from "../../../services/userService";
import { myPartnerId } from "../../../config/variables";
import SearchSelect from "../../searchComponent/SearchSelect";
import SearchChat from "../../searchComponent/SearchChat";
import Pagination from '@mui/material/Pagination';


const DEFAULT_TAB_KEY = [
  {
    type: "JOB",
    name: "Job",
  },
  {
    type: "JOB_REQUEST",
    name: "Request",
  },
  {
    type: "USER_USER",
    name: "User",
  },
  {
    type: "USER_GROUP",
    name: "Groups",
  },
];

const AddGroup = (index, data) => {};

const MessageList = ({
  chatGroups,
  chatGroupLoading,
  setClickedMessageItem,
  getMessageList,
  getMessageDetails,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let tabTypeV = searchParams?.get("messageType") || "JOB";
  // if (chatGroups != undefined && chatGroups?.message?.userChatGroups != undefined && chatGroups?.message?.userChatGroups.length  >= 1 ) {
  //     tabTypeV = chatGroups?.message?.userChatGroups[0].chatType
  // }
  let searchTerm = searchParams?.get("searchTerm") || "";
  let id = searchParams?.get("id");
  //const [tabType, setTabType] = useState(searchParams?.get("messageType") || "JOB")
  const [tabType, setTabType] = useState(tabTypeV);
  console.log("Set TabType ::: ", tabType, searchParams?.get("messageType"));
  const [searchValue, setSearchValue] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  //const [userChatGroups, setUserChatGroups] = useState(chatGroups?.message?.userChatGroups || [])
  const [userChatGroups, setUserChatGroups] = useState([]);
  const [userOption, setUserOptions] = useState([]);
  let updateInitialDetails = true;
  if (searchTerm === "") {
    updateInitialDetails = true;
  } else {
    updateInitialDetails = false;
  }
  const [updateInitialDetailsS, setUpdateInitialDetailsS] =
    useState(updateInitialDetails);

  // const { count = 0, partnerMap, jobMap, jobRequestMap } = chatGroups?.message || {}
  const { count = 0 } = chatGroups?.message || {};
  let jobRequestMap =
    chatGroups?.message?.jobRequestMap === undefined
      ? new Map()
      : new Map(Object.entries(chatGroups?.message?.jobRequestMap));
  let jobMap =
    chatGroups?.message?.jobMap === undefined
      ? new Map()
      : new Map(Object.entries(chatGroups?.message?.jobMap));
  let partnerMap =
    chatGroups?.message?.partnerMap === undefined
      ? new Map()
      : new Map(Object.entries(chatGroups?.message?.partnerMap));

  console.warn(tabType);
  if (
    !DEFAULT_TAB_KEY.map((e) => e.type).includes(
      searchParams?.get("messageType")
    ) &&
    tabTypeV !== "JOB"
  ) {
    console.log("TabType set as JOB", searchParams?.get("messageType"));
    setTabType("JOB");
    tabTypeV = "JOB";
  }
  useEffect(() => {

    //populateGroupInfo(id, tabTypeV, tabType, getMessageList, searchTerm);
    populateGroupInfo(id, tabTypeV, tabType, getMessageList,searchValue);
  }, [tabType]);

  useEffect(() => {
    console.log(
      "IntoMessageList :::: chat Groups Populate MessageList Update the updateInitialDetails",
      updateInitialDetails,
      chatGroups
    );
    constructGroups(
      chatGroups,
      tabType,
      tabTypeV,
      userChatGroups,
      setUserChatGroups,
      chatGroupInitial,
      updateInitialDetailsS
    );
  }, [chatGroups]);

  const chatGroupInitial = (index, data) => {
    if (data === undefined) {
      data = {};
    }
    console.log("Into chatGroupClick", data, data.userChatGroupID);
    if (
      (partnerMap === undefined || partnerMap.size <= 0) &&
      (jobMap === undefined || jobMap.size <= 0) &&
      (jobRequestMap === undefined || jobRequestMap.size <= 0)
    ) {
      console.log("Into chatGroupClick2222", data, data.userChatGroupID);

      if (data.userChatGroupID === undefined || data.userChatGroupID === "") {
        console.log("Into chatGroupClick3333", data, data.userChatGroupID);

        getMessageDetails({
          chatType: data.chatType,
          page: 1,
          chatGroupID: "000000000000000000",
        });
        setClickedMessageItem(undefined);
      }
      return;
    }
    setSelectedIndex(index);
    console.log("Into chatGroupClick1111", data, partnerMap);
    // const {
    //   jobId,
    //   jobDefinitionId,
    //   jobRequestId,
    //   jobPartnerId,
    //   person2Id,
    //   partner2ID,
    //   userChatGroupID,
    //   userGroupId,
    // } = data;
    console.log(
      "Into Populate message Details :: Empty ",
      data.userChatGroupID
    );
    if (data.userChatGroupID === undefined) {
      getMessageDetails({
        chatType: data.chatType,
        page: 1,
        chatGroupID: "000000000000000000",
      });
      setClickedMessageItem(undefined);
    } else {
      getMessageDetails({
        chatType: data.chatType,
        page: 1,
        chatGroupID: data.userChatGroupID,
      });
      setClickedMessageItem({
        chatType: data.chatType,
        jobId: data.jobId,
        userChatGroupID: data.userChatGroupID,
        jobDefinitionId: data.jobDefinitionId,
        jobRequesId: data.jobRequestId,
        jobPartnerId: data.jobPartnerId,
        person2Id: data.person2Id,
        partner2Id: data.partner2ID,
        partner2Name: partnerMap.get(data.partner2ID)?.userName,
        data: data,
      });
    }
  };

  const chatGroupClick = (index) => {
    setSelectedIndex(index);
    console.log("Into chatGroupClick", userChatGroups[index]);
    const {
      jobId,
      jobDefinitionId,
      jobRequestId,
      jobPartnerId,
      person2Id,
      partner2ID,
      userChatGroupID,
    } = userChatGroups[index];
    getMessageDetails({
      chatType: userChatGroups[index].chatType,
      page: 1,
      chatGroupID: userChatGroupID,
    });
    setClickedMessageItem({
      chatType: userChatGroups[index].chatType,
      jobId: jobId,
      userChatGroupID: userChatGroupID,
      jobDefinitionId: jobDefinitionId,
      jobRequesId: jobRequestId,
      jobPartnerId: jobPartnerId,
      person2Id: person2Id,
      partner2Id: partner2ID,
      partner2Name: partnerMap.get(partner2ID)?.userName,
      data: userChatGroups[index],
    });
  };
  useEffect(() => {
    const getUser = async () => {
      // const rs = await userService.fetchUsers()
      //const rs = await userService.fetchSearchOption()
      // const userSetup = (rs?.data?.message || []).map(item => {
      //     return {
      //         value: item.partnerId,
      //         label: (item.firstName + " " + item.lastName),
      //         name: (item.firstName + " " + item.lastName),
      //         image: (item.userPictureLink === undefined ? 'https://seeklogo.com/images/L/logo-com-hr-logo-5636A4D2D5-seeklogo.com.png' : item.userPictureLink),
      //         platforms: item.stakeHolderType,
      //         category: item.preferredLanguage
      //     }
      // })
      //setUserOptions(userSetup)
    };
    getUser();
  }, []);

  const rowRenderer = ({ index, key, style }) => {
    if (userChatGroups.length === 0) {
      return <div></div>;
    }
    let messageIndentity = undefined;
    let chatGroup = userChatGroups[index];
    console.log(
      "IntoMessageList :::: Into Message Row Renderer ",
      userChatGroups,
      chatGroup.chatType,
      tabType,
      tabTypeV
    );
    switch (tabTypeV) {
      case "JOB":
        messageIndentity = jobMap.get(chatGroup.jobDefinitionId);
        break;
      case "USER_USER":
        messageIndentity = partnerMap.get(chatGroup.partnerId);
        break;
      case "JOB_REQUEST":
        messageIndentity = jobRequestMap.get(chatGroup.jobDefinitionId);
        break;
      case "USER_GROUP":
          messageIndentity = chatGroup;
          console.log('Into User_Group Group MessageIdentity', messageIndentity)
          break;
      default:
        undefined;
        break;
    }
    return (
      <div key={key} style={style} onClick={() => chatGroupClick(index)}>
        <MessageItem
          messageIdentityInfo={messageIndentity}
          messageItem={userChatGroups[index]}
          selected={index === selectedIndex ? true : false}
        />
      </div>
    );
  };

  const addSearchData = (data) => {
    console.log("addSearchData", data);
  };

  const onSearch = (search) => {
    console.log("onSearch", search);
  };

  const handleLocalSearch = (search) => {
    console.log("handleLocalSearch", search.target.value);
    setSearchValue(search.target.value);
    searchTerm = search.target.value;
    updateInitialDetails = false;
    setUpdateInitialDetailsS(updateInitialDetails);
    populateGroupInfo(
      "000000000000000000",
      tabTypeV,
      tabType,
      getMessageList,
      searchTerm
    );
  };

  const handleSearch = () => {
    console.log("handleSearch");
    //updateInitialDetails = true
    //populateGroupInfo("000000000000000000", tabTypeV, tabType, getMessageList, searchTerm)
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Call your function here
      console.log("Enter key pressed", searchTerm, searchValue);
      updateInitialDetails = true;
      setUpdateInitialDetailsS(updateInitialDetails);
      populateGroupInfo(
        "000000000000000000",
        tabTypeV,
        tabType,
        getMessageList,
        searchValue
      );
    }
  };

  const DEFAULT_TABS = DEFAULT_TAB_KEY.map((element) => {
    return {
      label: element.name,
      key: element.type,
      children: (
        <div className="message-item-flex-container">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: "0.75rem",
            }}
          >
            {/* <MultiUserSelectDropDown options={userOption} onSelect={(e, g, h) => console.log(e, g, h)} /> */}
            <Space direction="vertical" size="middle" style={{margin: 2}}>
              {/* <Space.Compact>
                        <SearchChat addSeeAll={false} showSearch={'USER_JOBREQUEST_JOB'} handleClick={addSearchData} onSearch={onSearch} />
                        </Space.Compact> */}
              <Space.Compact>
                <div className="search-input-container">
                  <button onClick={handleSearch}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                  <div style={{ flex: "1" }}>
                    <Input
                      value={searchValue}
                      placeholder="Chat Search..."
                      onChange={(e) => handleLocalSearch(e)}
                      onKeyDown={handleKeyPress}
                      style={{
                        width: "100%",
                        borderColor: "#d9d9d9 !important",
                        border: "none",
                        boxShadow: "none",
                        outline: "none",
                      }}
                    ></Input>
                  </div>
                </div>
              </Space.Compact>
            </Space>
          </div>
          <div style={{ height: "100%" }}>
            {!chatGroupLoading ? (
              <AutoSizer disableWidth>
                {({ height }) =>
                  userChatGroups.length > 0 ? (
                    <List
                      rowHeight={100}
                      rowRenderer={rowRenderer}
                      rowCount={userChatGroups.length}
                      height={height - 65}
                      width={350}
                      overscanRowCount={10}
                    />
                  ) : (
                    <Empty />
                  )
                }
              </AutoSizer>
            ) : (
              <Spin size="middle" style={{ alignSelf: "center" }} />
            )}
          </div>
        </div>
      ),
    };
  });

  const handlePaginationChange = (event, page) => {
    console.log('Into Pagination. Page:', event, 'PageSize:', page);
    setPageIndex(page);
    getMessageList({
      page: page,
      chat_type: tabTypeV,
      searchString: searchValue,
    });
  };

  return (
    <div className="messsage-list-container">
      <Tabs
        size="large"
        defaultActiveKey={tabTypeV}
        items={DEFAULT_TABS}
        destroyInactiveTabPane="true"
        tabBarGutter={60}
        centered={true}
        onChange={(activeKey) => {
          // setTabType(activeKey)
          navigate(`/messages?messageType=${activeKey}`);
          getMessageList({
            chat_type: activeKey,
            page: 0,
            searchString : searchValue
          });
        }}
      />

      {count > 0 ? (
        <div>
          { console.log('Into Pagenation. Page size page. pageSize Count value' , count , pageIndex )
}
          {/* <Pagination
            defaultCurrent={pageIndex}
            total={count}
            showLessItems={true}
            style={{ paddingBottom: "0.5rem" }}
            onChange={handlePaginationChange}
            showSizeChanger={false}
          />{" "} */}
          <Pagination
      page={pageIndex}
      //count={count}
      count={Math.ceil(count / 30)} // Calculate the total number of pages based on the page size

      showFirstButton
      showLastButton
      onChange={handlePaginationChange}
      style={{ paddingBottom: '0.5rem' }}
    />
        </div>

      ) : null}
    </div>
  );
};

MessageList.defaultProps = {
  chatGroups: {},
  chatGroupLoading: false,
  getMessageList: {},
  getMessageDetails: {},
};

MessageList.propTypes = {
  chatGroups: PropTypes.shape({}),
  chatGroupLoading: PropTypes.bool,
  setClickedMessageItem: PropTypes.func.isRequired,
  getMessageList: PropTypes.func.isRequired,
  getMessageDetails: PropTypes.func.isRequired,
};

export default compose(
  connect(
    (state) => ({
      chatGroups: state.chatGroups.payload,
      chatGroupLoading: state.chatGroups.isFetching,
    }),
    (dispatch) =>
      bindActionCreators(
        {
          getMessageList: messageDuck.creators.fetch,
          getMessageDetails: messageDetailDuck.creators.fetch,
        },
        dispatch
      )
  )
)(MessageList);

function populateGroupInfo(id, tabTypeV, tabType, getMessageList, searchTerm) {
  console.log(
    "IntoMessageList :::: populateGroupInfo",
    id, tabTypeV, tabType, searchTerm
  );
  if (id === undefined) {
    let options = {
      page: 1,
      chat_type: tabTypeV,
      searchString: searchTerm,
    };
    console.log(
      "IntoMessageList :::: chat Groups Populate MessageList ",
      options,
      tabTypeV,
      tabType 
    );
    getMessageList(options);
  } else {
    let searchChat = {
      chatType: tabTypeV,
      jobId: tabTypeV === "JOB" ? id : "000000000000000000",
      partnerId: tabTypeV === "USER_USER" ? id : "000000000000000000",
      jobRequestId: tabTypeV === "JOB_REQUEST" ? id : "000000000000000000",
      jobDefinitionId:
        tabTypeV === "JOB_DEFINITION" ? id : "000000000000000000",
      userGroupId:
        tabTypeV === "USER_GROUP" ? id : "000000000000000000",
    };
    let options = {
      page: 1,
      chat_type: tabTypeV,
      searchJobChat: searchChat,
      searchString: searchTerm,
    };
    console.log(
      "IntoMessageList :::: chat Groups Populate MessageList ",
      options
    );

    getMessageList(options);
  }
}

function constructGroups(
  chatGroups,
  tabType,
  tabTypeV,
  userChatGroups,
  setUserChatGroups,
  chatGroupInitial,
  updateInitialDetailsS
) {
  console.log(
    "IntoMessageList :::: chat Groups ",
    chatGroups,
    tabType,
    tabTypeV
  );

  if (chatGroups !== undefined) {
    console.log(
      "IntoMessageList :::: chat Groups Groups ",
      chatGroups,
      tabType,
      tabTypeV
    );
    let groups = chatGroups?.message?.userChatGroups;
    if (
      chatGroups?.message != undefined &&
      chatGroups?.message?.page === undefined
    ) {
      chatGroups.message.page = 1;
    }
    let jobRequestMap =
      chatGroups?.message?.jobRequestMap === undefined
        ? new Map()
        : new Map(Object.entries(chatGroups?.message?.jobRequestMap));
    let jobMap =
      chatGroups?.message?.jobMap === undefined
        ? new Map()
        : new Map(Object.entries(chatGroups?.message?.jobMap));
    let partnerMap =
      chatGroups?.message?.partnerMap === undefined
        ? new Map()
        : new Map(Object.entries(chatGroups?.message?.partnerMap));

    console.log(
      "IntoMessageList Message Details jobAndJobRequest",
      jobMap,
      jobRequestMap,
      partnerMap
    );
    if (
      groups != undefined &&
      groups.length > 0 &&
      groups[0].chatType === tabTypeV
    ) {
      for (let i = 0; i < groups.length; i++) {
        groups[i].jobRequest =
          groups[i].jobRequestId != undefined &&
          jobRequestMap.has(groups[i].jobRequestId)
            ? jobRequestMap.get(groups[i].jobRequestId)
            : undefined;
        groups[i].job =
          groups[i].jobId != undefined && jobMap.has(groups[i].jobId)
            ? jobMap.get(groups[i].jobId)
            : undefined;
        groups[i].person1 =
          groups[i].partnerId != undefined &&
          partnerMap.has(groups[i].partnerId)
            ? partnerMap.get(groups[i].partnerId)
            : undefined;
        groups[i].person2 =
          groups[i].partner2ID != undefined &&
          partnerMap.has(groups[i].partner2ID)
            ? partnerMap.get(groups[i].partner2ID)
            : undefined;
        console.log(
          "Check for UnreadMessages ",
          groups[i].noOfUnReadMessagesPerson1,
          groups[i].noOfUnReadMessagesPerson2,
          myPartnerId(),
          groups[i].partner2ID
        );
        groups[i].unReadMessages =
          groups[i].partner2ID === myPartnerId()
            ? groups[i].noOfUnReadMessagesPerson2
            : groups[i].noOfUnReadMessagesPerson1;
        switch (tabTypeV) {
          case "JOB":
            groups[i].display =
              groups[i].partnerId === myPartnerId()
                ? groups[i].job
                : groups[i].person1;
            groups[i].display.messageTitle = groups[i].job.jobName;
            groups[i].display.logoLink = undefined;
            groups[i].messageTitle = groups[i].display.messageTitle;
            groups[i].logoLink = groups[i].display.logoLink;

            groups[i].senderName =
              groups[i].partnerId === myPartnerId()
                ? groups[i].person1?.partnerName || groups[i].person1?.userName
                : groups[i].person2?.partnerName || groups[i].person2?.userName;
            groups[i].receiverName =
              groups[i].partner2ID === myPartnerId()
                ? groups[i].person1?.partnerName || groups[i].person1?.userName
                : groups[i].person2?.partnerName || groups[i].person2?.userName;
            groups[i].senderUserId =
              groups[i].partnerId === myPartnerId()
                ? groups[i].person1?.primaryUserId
                : groups[i].person2?.primaryUserId;
            groups[i].receiverUserId =
              groups[i].partner2ID === myPartnerId()
                ? groups[i].person1?.primaryUserId
                : groups[i].person2?.primaryUserId;
            groups[i].sender =
              groups[i].partnerId === myPartnerId()
                ? groups[i].person1?.partnerID
                : groups[i].person2?.partnerID;
            groups[i].receiver =
              groups[i].partner2ID === myPartnerId()
                ? groups[i].person1?.partnerID
                : groups[i].person2?.partnerID;
            break;
          case "USER_USER":
            groups[i].display =
              groups[i].partnerId === myPartnerId()
                ? groups[i].person2
                : groups[i].person1;
            groups[i].display.messageTitle =
              groups[i].display.partnerName || groups[i].display.userName;
            //groups[i].display.logoLink =  groups[i].display.logoLink
            groups[i].messageTitle = groups[i].display.messageTitle;
            groups[i].logoLink = groups[i].display.logoLink;

            groups[i].senderName =
              groups[i].partnerId === myPartnerId()
                ? groups[i].person1?.partnerName || groups[i].person1?.userName
                : groups[i].person2?.partnerName || groups[i].person2?.userName;
            groups[i].receiverName =
              groups[i].partner2ID === myPartnerId()
                ? groups[i].person1?.partnerName || groups[i].person1?.userName
                : groups[i].person2?.partnerName || groups[i].person2?.userName;
            groups[i].senderUserId =
              groups[i].partnerId === myPartnerId()
                ? groups[i].person1?.primaryUserId
                : groups[i].person2?.primaryUserId;
            groups[i].receiverUserId =
              groups[i].partner2ID === myPartnerId()
                ? groups[i].person1?.primaryUserId
                : groups[i].person2?.primaryUserId;
            groups[i].sender =
              groups[i].partnerId === myPartnerId()
                ? groups[i].person1?.partnerID
                : groups[i].person2?.partnerID;
            groups[i].receiver =
              groups[i].partner2ID === myPartnerId()
                ? groups[i].person1?.partnerID
                : groups[i].person2?.partnerID;
            break;
            case "USER_GROUP":
              groups[i].display = groups[i];
              groups[i].display.messageTitle =
                groups[i].userGroupName;
              //groups[i].display.logoLink =  groups[i].display.logoLink
              groups[i].messageTitle = groups[i].display.messageTitle;
              groups[i].logoLink = groups[i].display.logoLink;
  
              groups[i].senderName = 
                groups[i].partnerId === myPartnerId()
                  ? groups[i].person1?.partnerName || groups[i].person1?.userName
                  : groups[i].person2?.partnerName || groups[i].person2?.userName;
              groups[i].receiverName =
                groups[i].partner2ID === myPartnerId()
                  ? groups[i].person1?.partnerName || groups[i].person1?.userName
                  : groups[i].person2?.partnerName || groups[i].person2?.userName;
              groups[i].senderUserId =
                groups[i].partnerId === myPartnerId()
                  ? groups[i].person1?.primaryUserId
                  : groups[i].person2?.primaryUserId;
              groups[i].receiverUserId =
                groups[i].partner2ID === myPartnerId()
                  ? groups[i].person1?.primaryUserId
                  : groups[i].person2?.primaryUserId;
              groups[i].sender =
                groups[i].partnerId === myPartnerId()
                  ? groups[i].person1?.partnerID
                  : groups[i].person2?.partnerID;
              groups[i].receiver =
                groups[i].partner2ID === myPartnerId()
                  ? groups[i].person1?.partnerID
                  : groups[i].person2?.partnerID;
              break;
          case "JOB_REQUEST":
            groups[i].display =
              groups[i].partnerId === myPartnerId()
                ? groups[i].jobRequest
                : groups[i].person1;
            groups[i].display.messageTitle = groups[i].jobRequest.jobName;
            groups[i].display.logoLink = undefined;
            groups[i].messageTitle = groups[i].display.messageTitle;
            groups[i].logoLink = groups[i].display.logoLink;

            groups[i].senderName =
              groups[i].partnerId === myPartnerId()
                ? groups[i].person1?.partnerName || groups[i].person1?.userName
                : groups[i].person2?.partnerName || groups[i].person2?.userName;
            groups[i].receiverName =
              groups[i].partner2ID === myPartnerId()
                ? groups[i].person1?.partnerName || groups[i].person1?.userName
                : groups[i].person2?.partnerName || groups[i].person2?.userName;
            groups[i].senderUserId =
              groups[i].partnerId === myPartnerId()
                ? groups[i].person1?.primaryUserId
                : groups[i].person2?.primaryUserId;
            groups[i].receiverUserId =
              groups[i].partner2ID === myPartnerId()
                ? groups[i].person1?.primaryUserId
                : groups[i].person2?.primaryUserId;
            groups[i].sender =
              groups[i].partnerId === myPartnerId()
                ? groups[i].person1?.partnerID
                : groups[i].person2?.partnerID;
            groups[i].receiver =
              groups[i].partner2ID === myPartnerId()
                ? groups[i].person1?.partnerID
                : groups[i].person2?.partnerID;
            break;
        }
        console.log(
          "IntoMessageList Message Details jobAndJobRequest group",
          groups[i].display,
          groups[i].partnerId,
          myPartnerId()
        );
      }
    }
    console.log(
      "IntoMessageList Message Details Groups ",
      groups,
      chatGroups?.message?.page,
      tabType
    );
    if (
      groups != undefined &&
      groups.length > 0 &&
      groups[0].chatType === tabTypeV
    ) {
      let populateChatMessage = false;
      if (userChatGroups.length > 0) {
        if (userChatGroups[0].chatType != tabTypeV) {
          populateChatMessage = true;
        }
      } else {
        populateChatMessage = true;
      }
      if (
        chatGroups?.message?.page != undefined &&
        chatGroups?.message?.page <= 1
      ) {
        console.log("IntoMessageList1 Message Details Groups ", groups);
        setUserChatGroups([...groups]);
      } else {
        setUserChatGroups([...groups]);
      }
      console.log(
        "IntoMessageList Message Details Groups populateChatMessage ",
        populateChatMessage,
        groups,
        updateInitialDetailsS
      );

      if (populateChatMessage && updateInitialDetailsS) {
        chatGroupInitial(0, groups[0]);
      }
    } else {
      let populateChatMessage = false;
      if (userChatGroups.length > 0) {
        if (userChatGroups[0].chatType != tabTypeV) {
          populateChatMessage = true;
        }
      }

      if (populateChatMessage) {
        setUserChatGroups([...(groups || [])]);
      } else {
        setUserChatGroups([...(groups || [])]);
        //setUserChatGroups([...userChatGroups, ...groups|| []])
      }
      console.log(
        "IntoMessageList Message Details Groups populateChatMessage11111 ",
        populateChatMessage,
        groups,
        updateInitialDetailsS
      );

      if (populateChatMessage && updateInitialDetailsS) {
        console.log("Updated the details ");
        chatGroupInitial(0, {});
      }
    }
  } else {
    if (populateChatMessage && updateInitialDetailsS) {
      console.log("Updated the details ");
      chatGroupInitial(0, {});
    }
  }
}
