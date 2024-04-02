import React from "react";
import './style.scss';
import { Checkbox, Input } from "antd";
import UpArrow from '../../../assets/images/common/up_arrow.png';
import DownArrow from '../../../assets/images/common/down_arrow.png';

const QueryFilters = (props) => {
    const { filters, setFilters } = props;

    const handleFilterShow = (key) => {
        const filteritem = filters[key];
        const updatedFilters = {
            ...filters,
            [key]: { ...filteritem, hide: !filteritem?.hide }
        }
        setFilters(updatedFilters)
    }
    const handleSearch = (key, value) => {
        const filteritem = filters[key];
        const updatedFilters = {
            ...filters,
            [key]: { ...filteritem, search: value }
        }
        setFilters(updatedFilters)
    }

    const handleShowMore = (key) => {
        const filteritem = filters[key];
        const updatedFilters = {
            ...filters,
            [key]: { ...filteritem, showall: !filteritem?.showall }
        }
        setFilters(updatedFilters)
    }

    const handleCheckbox = (key, innerkey) => {
        let inList = true

        const filteritem = filters[key];
        let updatedList = filters[key]?.list?.map(item => {
            if (item.value.toLowerCase() == innerkey.toLowerCase()) {
                item.selected = !item.selected
                inList = false
            }
            return item
        })
        if (inList) {
            updatedList = [...updatedList, { label: innerkey, selected: true, value: innerkey }]
        }
        const updatedFilters = {
            ...filters,
            [key]: { ...filteritem, list: updatedList }
        }
        setFilters(updatedFilters)
    }
    return (
        <div className="jobs-filter-container">
            <div className="container-head">
                Filters
            </div>

            {Object.keys(filters)?.map((item, index) => {
                const filteritem = filters[item];
                const filteredList = filteritem?.list?.filter((e) => e.label?.toLowerCase()?.includes(filteritem.search?.toLowerCase() || ''))
                return (
                    <div className="filter-item" key={index}>
                        <div className="filter-label" onClick={() => handleFilterShow(item)}>
                            {filteritem?.label}
                            <div className="show-hide">
                                <img src={filteritem.hide ? UpArrow : DownArrow} alt="show-hide" />
                            </div>
                        </div>

                        {!filteritem.hide && <div>
                            {item !== "date_of_posting" ? <form onSubmit={(e) => {
                                e.preventDefault()
                                handleCheckbox(item, e.target[0].value)
                            }}>
                                <Input placeholder="Search" value={filteritem.search} onChange={(event) => handleSearch(item, event?.target?.value)} />
                            </form> : <></>}
                            {filteredList.map((inner, innerIndex) => {
                                const isSearched = inner.label?.toLowerCase()?.includes(filteritem.search?.toLowerCase() || '')
                                if (isSearched && (filteritem?.showall || innerIndex < 3)) return (
                                    <div className="filter-inner-item" key={`${inner.value}${innerIndex}`}>
                                        <Checkbox checked={inner.selected} onChange={() => handleCheckbox(item, inner.value)}>{inner.label}</Checkbox>
                                    </div>
                                )
                                else return null
                            })}
                            {filteredList?.length > 3 && <div className="show-more" onClick={() => handleShowMore(item)}> {(!filteritem?.showall && filteredList.length - 3) || 0} more</div>}
                        </div>}
                    </div>
                )
            })}
        </div>
    )
}

export default QueryFilters