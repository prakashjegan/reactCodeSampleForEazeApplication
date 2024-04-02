
import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import './style.scss';
import DeleteIcon from '../../assets/images/common/close_white.png';
import FilterIcon from '../../assets/images/common/filter.png';
import QueryFilters from './filters';
import QueryDetails from './details';
import QueryList from './list';

const Query = () => {
    const [activeTab, setActiveTab] = useState({
        prev:"your_query",
        current:"your_query"
    })
    const [selectedquestion, setSelectedQuestion] = useState("")
    const [filters, setFilters] = useState({
        platform: { label: 'Platform', list: JSON.parse(localStorage.getItem('platforms'))},
        category: { label: 'Category', list: JSON.parse(localStorage.getItem('categories')) },
        keywords: { label: 'Keywords', list: JSON.parse(localStorage.getItem('categories')) },
        date_of_posting: { label: 'Date of posting', list: [] }
    });


    const configureFilters = (data) => {
        const { platform, category, keywords, date_of_posting } = data;
        const languguagesList = platform?.map(elem => { return { label: elem, value: elem } });
        const categoryList = category?.map(elem => { return { label: elem, value: elem } });
        const keywordsList = keywords?.map(elem => { return { label: elem, value: elem } });
        const date_of_posting_list = date_of_posting?.map(elem => { return { label: elem, value: elem } });

        setFilters({
            platform: { ...filters.platform, list: languguagesList },
            category: { ...filters.category, list: categoryList },
            keywords: { ...filters.keywords, list: keywordsList },
            date_of_posting: { ...filters.date_of_posting, list: date_of_posting_list }
        })
    }

    const handleDeleteFilter = (key, innerkey) => {
        const filteritem = filters[key];
        const updatedList = filters[key]?.list?.map(item => {
            if (item.value === innerkey) item.selected = false
            return item
        })
        const updatedFilters = {
            ...filters,
            [key]: { ...filteritem, list: updatedList }
        }
        setFilters(updatedFilters)
    }

    return (
        <div className='jobs-container'>

            <div className='filtered-list'>
                <img src={FilterIcon} alt='filter' className='filter-icon'/>
                {Object.keys(filters)?.map((item) => {
                    const filteritem = filters[item];
                    return filteritem?.list?.map((inner, index) => {
                        if (inner.selected) return (
                            <div className='selected-item' key={`${inner.value}${index}`}>
                                {inner.label}
                                <div className='delete' onClick={() => handleDeleteFilter(item, inner.value)}>
                                    <img src={DeleteIcon} alt='delete' />
                                </div>
                            </div>
                        )
                        else return null
                    })
                })}
            </div>

            <div className='details-container'>
                <QueryFilters  activeTab={activeTab} activateTab={(e) => setActiveTab(e)} filters={filters} setFilters={setFilters}  />
                <QueryList activeTab={activeTab}  activateTab={(e) => setActiveTab(e)} selectedquestion={selectedquestion} filters={filters} updateSelectedQuery={(id) => setSelectedQuestion(id) } />
                <QueryDetails  activeTab={activeTab}  activateTab={(e) => setActiveTab(e)} selectedquestion={selectedquestion}  />
            </div>
        </div>
    )
}

export default Layout(Query);   