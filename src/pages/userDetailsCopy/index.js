
import { Avatar, Card, CircularProgress, Input, Modal, OutlinedInput, Pagination } from "@mui/material"
import DataTable from "react-data-table-component"

import { Button, Rate, Select } from "antd"
import { ArrowDownward, Close, DescriptionOutlined, ExpandMore, FilterAltOutlined, InboxOutlined, MessageOutlined, SaveAltOutlined, SendOutlined } from "@mui/icons-material"
import { forwardRef, useState, useEffect } from "react"

import Layout from "../../components/layout"
import userService from "../../services/userService"
import './style.scss';
import MinMaxDropDown from "./component/minmaxDropDown"
import SingleUserModal from "./component/singleUserModal"
import { useNavigate, useParams } from "react-router-dom"
import socialImages from "./socialImages/index"
import MultiUserSelectDropDown from "./component/multiSelectUser"
import MultiSelUserWithLimiFetchComp from "../jobs/components/MultiSelUserWithLimiFetchComp"
import MultiUserSelectLimitedDropDown from "../userDetails/component/multiSelectUserLimited"


const UserList = forwardRef((props, ref) => {
    const navigate = useNavigate()
    const param = useParams()

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [count, setCount] = useState(0)
    const [data, setdata] = useState()
    const [userSelected , setUserSelected] = useState([]);
    const [userModal, setUserModal] = useState({
        visible: false,
        data: {}
    })
    const [minMaxValue, setMinMaxValue] = useState({ "followers": [0, 100000], "totalViews": [0, 100000], "age": [15, 25] })
    const [options, setOptions] = useState({
        reviews: [
            { label: "⭐", value: 1 },
            { label: "⭐⭐", value: 2 },
            { label: "⭐⭐⭐", value: 3 },
            { label: "⭐⭐⭐⭐", value: 4 },
            { label: "⭐⭐⭐⭐⭐", value: 5 }
        ],
        language: JSON.parse(localStorage.getItem("languages")).map(e => { return { label: e.label, value: e.value, selected: false } }),
        location: JSON.parse(localStorage.getItem("location")).map(e => { return { label: e.label, value: e.value, selected: false } }),
        platforms: JSON.parse(localStorage.getItem("platforms")).map(e => { return { label: e.label, value: e.value, selected: false } }),
        category: JSON.parse(localStorage.getItem("categories")).map(e => { return { label: e.label, value: e.value, selected: false } }),
        gender: [
            { label: "MALE", value: "MALE" },
            { label: "FEMALE", value: "FEMALE" },
            { label: "TRANSGENDER", value: "TRANSGENDER" }
        ],
        user: []
    })
    const [filter, setFilter] = useState([])
    const handleDeleteFilter = (item, index) => {
        if (["followers", "totalViews", "age"].includes(item.cat)) {
            let d = filter
            d = d.filter((e) => e.cat != item.cat)
            setFilter(d)
            return
        }
        let filteritem = [...filter]
        filteritem = filteritem.filter((e, i) => e.value.value !== item.value.value)
        setFilter(filteritem)

        let dummyOption = [...options[item.cat]]
        dummyOption.map((e) => {
            if (e.value === item.value.value) {
                e.selected = false
            }
            return e
        })
        setOptions((prev) => {
            return { ...prev, [item.cat]: dummyOption }
        })
    }

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
    const getData = async () => {
        let searchCriteria = [{
            "field": "documentType",
            "value": "PARTNER_TAG",
            "operator": "==",
            "logical": "AND"
        }]
        let reviews = filter.filter((item) => item.cat === 'reviews')
        if (reviews.length) {

            searchCriteria.push({
                "field": "averageReview",
                "operator": ">=",
                "value": reviews[0].value.value * 20,
                "logical": "AND"
            },
                {
                    "field": "averageReview",
                    "operator": "<=",
                    "value": 100,
                    "logical": "AND"
                })
        }

        let language = filter.filter((item) => item.cat === 'language')
        if (language.length) {
            searchCriteria.push({
                "field": "languages",
                "termField": "languages",
                "operator": "LIKE",
                "termValue": language.map((e) => e.value.value),
                "logical": "AND"
            })
        }

        let location = filter.filter((item) => item.cat === 'location')
        if (location.length) {
            searchCriteria.push({
                "field": "locations",
                "termField": "locations",
                "operator": "LIKE",
                "termValue": location.map((e) => e.value.value),
                "logical": "AND"
            })
        }
        let plateform = filter.filter((item) => item.cat === 'platforms')
        if (plateform.length) {
            searchCriteria.push({
                "field": "platforms",
                "termField": "platforms",
                "operator": "LIKE",
                "termValue": plateform.map((e) => e.value.value),
                "logical": "AND"
            })
        }

        let gender = filter.filter((item) => item.cat === 'gender')
        if (gender.length) {
            searchCriteria.push({
                "field": "gender",
                "termField": "gender",
                "operator": "LIKE",
                "termValue": gender.map((e) => e.value.value),
                "logical": "AND"
            })
        }
        let followers = filter.filter((item) => item.cat === 'followers')
        if (followers.length) {
            searchCriteria.push({
                "field": "totalFollowers",
                "operator": ">=",
                "value": followers[0]?.value?.value[0] * 1000,
                "logical": "AND"
            },
                {
                    "field": "totalFollowers",
                    "operator": "<=",
                    "value": followers[0]?.value?.value[1] * 1000,
                    "logical": "AND"
                })
        }
        let age = filter.filter((item) => item.cat === 'age')
        if (age.length) {
            searchCriteria.push({
                "field": "minAge",
                "operator": ">=",
                "value": age[0]?.value?.value[0],
                "logical": "AND"
            },
                {
                    "field": "maxAge",
                    "operator": "<=",
                    "value": age[0]?.value?.value[1],
                    "logical": "AND"
                })
        }
        let totalViews = filter.filter((item) => item.cat === 'totalViews')
        if (totalViews.length) {
            searchCriteria.push({
                "field": "totalView",
                "operator": ">=",
                "value": totalViews[0]?.value?.value[0],
                "logical": "AND"
            },
                {
                    "field": "totalView",
                    "operator": "<=",
                    "value": totalViews[0]?.value?.value[1],
                    "logical": "AND"
                })
        }
        let categories = filter.filter((item) => item.cat === 'category')
        if (categories.length) {
            searchCriteria.push({
                "field": "tags",
                "termField": "tags",
                "operator": "LIKE",
                "termValue": categories.map((e) => e.value.value),
                "logical": "AND"
            })
        }
        console.log(filter)
        let user = filter.filter((item) => item.cat === 'user')
        if (user.length) {
            searchCriteria.push({
                "field" : "partnerId" ,
                "operator" : "in",
                "value":user.map((e) => e.value.value),
                "logical" : "AND"
            })
        }
        console.log(user)

        try {
            const j = await userService.fetchUserData({
                "page": currentPage,
                "size": rowsPerPage,
                "fetchLevel": "PLATFORM",
                "searchCriteria": searchCriteria

            })
            j.data.message.partnerTags ? setdata(j.data.message.partnerTags) : setdata([])
            setCount(parseInt(j?.data?.message?.count || 0))

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
        return () => { }
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(1)
        getData()
        return () => { }
    }, [filter])
    useEffect(() => {
        const getUser = async () => {
            //const rs = await userService.fetchUsers()
            let rs = {}
            //const rs = await userService.fetchSearchOption()
            const userSetup = (rs?.data?.message || []).map(item => {
                return {
                    value: item.partnerId,
                    label: (item.firstName + " " + item.lastName),
                    name: (item.firstName + " " + item.lastName),
                    image: (item.userPictureLink === undefined ? 'https://seeklogo.com/images/L/logo-com-hr-logo-5636A4D2D5-seeklogo.com.png' : item.userPictureLink),
                    platforms: item.stakeHolderType,
                    category: item.preferredLanguage
                }
            })
            setOptions((prev) => {
                const dummy = { ...prev }
                dummy.user = userSetup
                return dummy
            })
        }
        getUser()
    }, [])
    const columns = [
        //   ...paidByYouColumnList,

        {
            name: "User Profile",
            sortable: true,
            minWidth: "230px",
            maxWidth: "300px",
            selector: (row) => {
                return (
                    <div className="datatable-avatar">
                        <Avatar alt="Remy Sharp" src={row.logoLink || ""} sx={{ width: 37, height: 37 }} />

                        <div>
                            {/* <NavLink to={`/user_details/${row.partnerId}`}>jjjjjjjjjjjjjjj</NavLink> */}
                            <h3 onClick={() => {
                                setUserModal({
                                    visible: true,
                                    data: row
                                })
                                navigate(`/user_details/${row.partnerId}`)
                            }}>{row.userName || row.emailId || ""}</h3>
                            <span>{`${row.stakeHolderType[0] || ""}${row.stakeHolderType[0] ? "-" : ""}${row.totalJobs || 0} Jobs`}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            name: "Reviews",
            sortable: true,
            minWidth: "180px",
            maxWidth: "250px",
            selector: (row) => {
                return (
                    <div>
                        <h3>{(row.averageReview / 20).toFixed(2)} of {row.totalReviews} reviews</h3>
                        <Rate allowHalf disabled defaultValue={(row.averageReview / 20).toFixed(2) || 0} />
                    </div>
                )
            }
        },
        {
            name: "Avg View",
            sortable: true,
            minWidth: "100px",
            maxWidth: "150px",
            selector: (row) => {
                return (formatNumber(row.totalView || 0))
            }
        },
        {
            name: "Location",
            sortable: true,
            minWidth: "130px",
            maxWidth: "190px",
            selector: (row) => {
                return <div className="tag-list">
                    {(row.locations || []).map((tag, tagIndex) => {
                        if (tag === "" || tag === " ") return
                        return <div key={tagIndex} className="tag-item">{tag}</div>
                    })}
                </div>
            }
        },
        {
            name: "Language",
            sortable: true,
            minWidth: "130px",
            maxWidth: "190px",
            selector: (row) => {
                return <div className="tag-list">
                    {(row.languages || []).map((tag, tagIndex) => {
                        if (tag === "" || tag === " ") return
                        return <div key={tagIndex} className="tag-item">{tag}</div>
                    })}
                </div>
            }
        },
        {
            name: "Followers",
            sortable: true,
            minWidth: "130px",
            maxWidth: "190px",
            selector: (row) => `${formatNumber(row.totalFollowers || 0)}`
        },
        {
            name: "Category",
            sortable: true,
            minWidth: "200px",
            maxWidth: "250px",
            selector: (row) => {
                return <div className="tag-list">
                    {(row.tags || []).map((tag, tagIndex) => {
                        if (tag === "" || tag === " ") return
                        return <div key={tagIndex} className="tag-item">{tag}</div>
                    })}
                </div>
            }
        },
        {
            name: "Platform",
            sortable: true,
            minWidth: "200px",
            maxWidth: "250px",
            selector: (row) => {
                return <div className="tag-list">
                    {(row.platforms || []).map((tag, tagIndex) => {
                        if (tag === "" || tag === " ") return
                        return <div key={tagIndex} className="tag-item">{tag}</div>
                    })}
                </div>
            }
        },
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

                    <MessageOutlined
                        onClick={() => { onMessageClick(row)}}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            )
        }
    ]
    const onMessageClick = (row) => {
        console.log('Into User Details onMessageClick', row)
        navigate(`/messages?messageType=USER_USER&id=${row.partnerId}`)
    }
    const columns2 = [
        //   ...paidByYouColumnList,

        {
            name: "User Profile",
            sortable: true,
            minWidth: "230px",
            maxWidth: "300px",
            selector: (row) => {
                return (
                    <div className="datatable-avatar">
                        <img alt="Remy Sharp" src={row.platformType ? (socialImages[row.platformType.toLowerCase()] || "") : ""} style={{ width: "37px", height: "37px" }} />
                        <div>
                            <a style={{ textDecoration: "none" }} href={row.publicLink || ""}><h3>{row.platformName || ""}</h3></a>
                            <span>{`${row.totalJobs || 0} Jobs`}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            name: "Reviews",
            sortable: true,
            minWidth: "180px",
            maxWidth: "250px",
            selector: (row) => {
                return (
                    <div>
                        <h3>{(row.averageReview / 20).toFixed(2)} of {row.totalReviews} reviews</h3>
                        <Rate allowHalf disabled defaultValue={(row.averageReview / 20).toFixed(2) || 0} />
                    </div>
                )
            }
        },
        {
            name: "Avg View",
            sortable: true,
            minWidth: "100px",
            maxWidth: "150px",
            selector: (row) => {
                return (formatNumber(row.totalView || 0))
            }
        },
        {
            name: "Location",
            sortable: true,
            minWidth: "130px",
            maxWidth: "190px",
            selector: (row) => {
                return <div className="tag-list">
                    {(row.locations || []).map((tag, tagIndex) => {
                        if (tag === "" || tag === " ") return
                        return <div key={tagIndex} className="tag-item">{tag}</div>
                    })}
                </div>
            }
        },
        {
            name: "Language",
            sortable: true,
            minWidth: "130px",
            maxWidth: "190px",
            selector: (row) => {
                return <div className="tag-list">
                    {(row.languages || []).map((tag, tagIndex) => {
                        if (tag === "" || tag === " ") return
                        return <div key={tagIndex} className="tag-item">{tag}</div>
                    })}
                </div>
            }
        },
        {
            name: "Followers",
            sortable: true,
            minWidth: "130px",
            maxWidth: "190px",
            selector: (row) => `${formatNumber(row.totalFollowers) || ""}`
        },
        {
            name: "Category",
            sortable: true,
            minWidth: "200px",
            maxWidth: "250px",
            selector: (row) => {
                return <div className="tag-list">
                    {(row.categories || []).map((tag, tagIndex) => {
                        if (tag === "" || tag === " ") return
                        return <div key={tagIndex} className="tag-item">{tag}</div>
                    })}
                </div>
            }
        },
        {
            name: "Platform",
            sortable: true,
            minWidth: "200px",
            maxWidth: "250px",
            selector: (row) => {
                return <div className="tag-list">
                    {(row.tags || []).map((tag, tagIndex) => {
                        if (tag === "" || tag === " ") return
                        return <div key={tagIndex} className="tag-item">{tag}</div>
                    })}
                </div>
            }
        },
        {
            name: "Actions",
            allowOverflow: true,
            minWidth: "8rem",
            maxWidth: "10rem",
            cell: (row) => (
                <div>

                    <SendOutlined
                        onClick={() => { }}
                        style={{ color: "gray", cursor: "pointer" }}
                    />

                    <MessageOutlined
                        onClick={() => { }}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            )
        }
    ]
    // ** Function to handle Pagination
    const handlePageChange = (page) => {
        setCurrentPage(page.selected)
    }
    const handlePerPage = (e) => {
        setCurrentPage(0)
        setRowsPerPage(parseInt(e.target.value))
    }

    const CustomPagination = (props) => {
        return (
            <div className="dataTable-footer">
                <Pagination
                    count={Math.ceil(count / rowsPerPage)}
                    onChange={(e, page) => {
                        setCurrentPage(page)
                    }
                    }
                    page={parseInt(currentPage)}
                    siblingCount={0}
                    variant="outlined"
                    color="primary"
                    shape="rounded"
                />
            </div>
        )
    }
    const handelSelectSinglevalue = (key, innerkey) => {
        let updatedOptions = options[key].map((item) => {
            const updatedValue = { ...item }
            if (item.value === innerkey) {
                updatedValue.selected = true  // !updatedValue.selected
            } else {
                updatedValue.selected = false
            }
            return updatedValue
        })
        setOptions((prev) => {
            return { ...prev, [key]: updatedOptions }
        })
        // updating filters
        let updatedFilter = filter.filter((item) => item.cat !== key)
        if (innerkey !== undefined) {
            updatedFilter.push({ cat: key, value: { label: innerkey, value: innerkey, selected: true } })
        }
        setFilter(updatedFilter)


        // }
    }
    const handelSelectMultivaluevalue = (key, innerkey, extraData) => {
        // updating options if options was already in list
        console.log('Into handleSelectMultivaluevalue' , key, innerkey, extraData)
        let innerkeyCopy = [...innerkey]
        let updatedOptions = (options[key] || []).map((item) => {
            const updatedValue = { ...item }
            if (innerkey.includes(item.value)) {
                updatedValue.selected = true  // !updatedValue.selected
            } else {
                updatedValue.selected = false
            }
            innerkeyCopy.filter((e) => e !== item.value)
            return updatedValue
        })
        if (extraData.length) {
            innerkey.forEach((e, i) => {
                if (extraData[i].value === undefined) {
                    updatedOptions.push({ label: e, value: e, selected: true })
                }
            })
        }
        setOptions((prev) => {
            return { ...prev, [key]: updatedOptions }
        })
        // updating filters
        let innerkeyCopyfilter = [...innerkey]
        let updatedFilter = filter.filter((item) => {
            if (item.cat !== key) return item
            if (innerkeyCopyfilter.includes(item.value.value)) {
                innerkeyCopyfilter = innerkeyCopyfilter.filter((e) => {
                    return e !== item.value.value
                })
                return item
            }
        })
        if (key === "user") {
            innerkeyCopyfilter.forEach(e => {
                const j = options["user"].find((d) => d.value === e)
                updatedFilter.push({cat: key, value:j})
            })
        } else {
            innerkeyCopyfilter.forEach(e => {
                updatedFilter.push({ cat: key, value: { label: e, value: e, selected: true } })
            })
        }
        setFilter(updatedFilter)


        // }
    }

    const handelSelectMultivaluevalueUser = (key, innerkey, extraData) => {
        // updating options if options was already in list
        console.log('Into handleSelectMultivaluevalue' , key, innerkey, extraData)
        let innerkeyCopy = [...innerkey]
        let updatedOptions = (options[key] || []).map((item) => {
            const updatedValue = { ...item }
            if (innerkey.includes(item.value)) {
                updatedValue.selected = true  // !updatedValue.selected
            } else {
                updatedValue.selected = false
            }
            innerkeyCopy.filter((e) => e !== item.value)
            return updatedValue
        })
        if (extraData.length) {
            innerkey.forEach((e, i) => {
                if (extraData[i].value === undefined) {
                    updatedOptions.push({ label: e, value: e, selected: true })
                }
            })
        }
        setOptions((prev) => {
            return { ...prev, [key]: updatedOptions }
        })
        // updating filters
        let innerkeyCopyfilter = [...innerkey]
        let updatedFilter = filter.filter((item) => {
            if (item.cat !== key) return item
            if (innerkeyCopyfilter.includes(item.value.value)) {
                innerkeyCopyfilter = innerkeyCopyfilter.filter((e) => {
                    return e !== item.value.value
                })
                return item
            }
        })
        if (key === "user") {
            innerkeyCopyfilter.forEach(e => {
                const j = options["user"].find((d) => d.value === e)
                updatedFilter.push({cat: key, value:j})
            })
        } else {
            innerkeyCopyfilter.forEach(e => {
                updatedFilter.push({ cat: key, value: { label: e, value: e, selected: true } })
            })
        }
        setFilter(updatedFilter)


        // }
    }
    
    const ExpandableTable = ({ data }) => {
        const [childData, setChildData] = useState([])
        const getChildData = async () => {
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
                            "value": [`${data.partnerId}`],
                            "operator": "in",
                            "logical": "AND"
                        }
                    ]

                })
                j.data.message.platformTagSers && setChildData(j.data.message.platformTagSers)

            } catch (error) {
                console.log(error)
            }
        }
        useEffect(() => {
            getChildData()
        }, [data])
        return (
            <div style={{ marginLeft: "100px" }}>
                <DataTable
                    columns={columns2}
                    noHeader
                    noTableHead
                    // tit
                    data={childData}
                />
            </div>
        )
    }

    return (
        <>
            <div style={{ margin: '2rem 1rem' }} className="react-dataTable query-datatable userDetail">
                <SingleUserModal isVisible={param.partnerId} data={userModal.data} closeModal={() => {
                    setUserModal({
                        visible: false,
                        data: {}
                    })
                    navigate("/user_details")
                }} />
                <div className='select-view'>
                    <MinMaxDropDown
                        name='followerCount'
                        className='select-view-input'
                        placeholder='Followers (k)'
                        lable='Followers  (k)'
                        value={minMaxValue["followers"]}
                        options={[{ "min": 0, "max": 100000, "value": "0-100000", "label": "0-100000" }]}
                        minimum={0}
                        maximum={100000}
                        onChange={(e) => {
                            if (e[0] >= 0 && e[1] <= 100000 && e[0] < e[1]) {
                                setMinMaxValue((prev) => {
                                    let j = filter.filter((e) => e.cat !== "followers")
                                    j.push({ cat: "followers", value: { label: `${e[0]}-${e[1]} k Followers`, value: e } })
                                    setFilter(j)
                                    return { ...prev, "followers": e }
                                })
                            }
                        }}

                    />
                    <Select
                        // mode="multiple"
                        allowClear
                        className='select-view-input'
                        placeholder="Reviews"
                        options={options['reviews']}
                        value={options["reviews"].find((e) => e.selected)}
                        onChange={(e, k) => {
                            handelSelectSinglevalue("reviews", e)
                        }}
                    />
                    <MinMaxDropDown
                        name='avgViews'
                        className='select-view-input'
                        placeholder='Avg Views'
                        lable='Avg Views'
                        value={minMaxValue["totalViews"]}
                        options={[{ "min": 0, "max": 100000, "value": "0-1000000", "label": "0-1000000" }]}
                        minimum={0}
                        maximum={100000}
                        onChange={(e) => {
                            if (e[0] >= 0 && e[1] <= 100000 && e[0] < e[1]) {
                                setMinMaxValue((prev) => {
                                    let j = filter.filter((e) => e.cat !== "totalViews")
                                    j.push({ cat: "totalViews", value: { label: `${e[0]}-${e[1]} Views`, value: e } })
                                    setFilter(j)
                                    return { ...prev, "totalViews": e }
                                })
                            }
                        }}

                    />
                    <Select
                        mode="tags"
                        allowClear
                        className='select-view-input'
                        placeholder="Language"
                        options={options['language']}
                        value={options["language"].filter((e) => e.selected)}
                        onChange={(e, k) => {
                            handelSelectMultivaluevalue('language', e, k)
                        }}
                    />
                    <Select
                        mode="tags"
                        allowClear
                        className='select-view-input'
                        placeholder="Location"
                        options={options['location']}
                        value={options["location"].filter((e) => e.selected)}
                        onChange={(e, k) => {
                            handelSelectMultivaluevalue('location', e, k)
                        }}
                    />
                    <Select
                        mode="tags"
                        allowClear
                        className='select-view-input'
                        placeholder="Platforms"
                        options={options['platforms']}
                        value={options["platforms"].filter((e) => e.selected)}
                        onChange={(e, k) => {
                            handelSelectMultivaluevalue('platforms', e, k)
                        }}
                    />
                    <Select
                        mode="tags"
                        allowClear
                        className='select-view-input'
                        placeholder="Category"
                        options={options['category']}
                        value={options["category"].filter((e) => e.selected)}
                        onChange={(e, k) => {
                            handelSelectMultivaluevalue('category', e, k)
                        }}
                    />
                    <Select
                        mode="multiple"
                        allowClear
                        className='select-view-input'
                        placeholder="Gender"
                        value={options["gender"].filter(e => e.selected)}
                        options={options['gender']}
                        onChange={(e, k) => handelSelectMultivaluevalue("gender", e, k)}
                    />
                    <MinMaxDropDown
                        name='age'
                        className='select-view-input'
                        placeholder='age'
                        lable='Age'
                        value={minMaxValue["age"]}
                        options={[{ "min": 0, "max": 100, "value": "0-100", "label": "0-100" }]}
                        minimum={0}
                        maximum={100}
                        onChange={(e) => {
                            if (e[0] >= 0 && e[1] <= 100 && e[0] < e[1]) {
                                setMinMaxValue((prev) => {
                                    let j = filter.filter((e) => e.cat !== "age")
                                    j.push({ cat: "age", value: { label: `${e[0]}-${e[1]} years`, value: e } })
                                    setFilter(j)
                                    return { ...prev, "age": e }
                                })
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
                    {/* <MultiUserSelectDropDown options={options['user']} onSelect={(e) => handelSelectMultivaluevalue("user", e, [])} /> */}
                    <MultiUserSelectLimitedDropDown options={options['user']} onSelect={(e) => handelSelectMultivaluevalueUser("user", e, [])} 
                    selectedValues={userSelected} />
                </div>
                <DataTable
                    pagination
                    selectableRows
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
                            <div className='filtered-list'>
                                <FilterAltOutlined />
                                {console.log('Into Filter AltOutlined ::::' , filter)}
                                {filter.map((item, index) => {
                                    return <div className='selected-item' key={`${item.cat}${index}`}>
                                        {item.value.label}
                                        <div className='delete' onClick={() => handleDeleteFilter(item, index)}>
                                            <Close fontSize="small" />
                                        </div>
                                    </div>
                                })}
                            </div>
                            {/* <Button style={{ width: "16rem" }} type="primary">
                                Send Request
                            </Button> */}
                        </div>
                    }
                />
                <div className="dataTable-footer">
                </div>
            </div>
        </>
    )
})
export default Layout(UserList)
