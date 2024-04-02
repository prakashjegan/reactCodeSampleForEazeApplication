import React, { useState } from 'react';
import './style.scss';
import { DatePicker, Select } from 'antd';
import { METRICS_BREAKPOINTS, METRICS_CHART_TYPE } from '../../../constants/lovs';
import CloseIcon from '../../../assets/images/common/close.png';
import moment from 'moment';

const MetricsFilter = (props) => {
    const { name, filters, options, setFilters } = props;
    const [dateFilters] = useState(['startDate', 'endDate']);
    const [arrayFilters] = useState(['influencers', 'business', 'platforms', 'ads', 'jobs']);

    const handleChange = (field, value) => {
        setFilters({
            ...filters,
            [field]: value
        })
    }

    const handleRemoveFilter = (key, id) => {
        const updatedFilters = {
            ...filters,
            [key]: filters[key]?.filter(elem => elem !== id)
        }
        setFilters(updatedFilters)
    }

    return (
        <div className='metrics-filter-container'>
            <div className='header-view'>
                <div className='card-name'>{name}</div>
                <Select
                    allowClear
                    className='influencers-input'
                    value={filters['type']}
                    placeholder="Type"
                    onChange={(value) => handleChange('type', value)}
                    options={METRICS_CHART_TYPE}
                />
                <div className='breakpoint-selection'>
                    {METRICS_BREAKPOINTS?.map((breakpoint, index) => {
                        return (
                            <div className={`breakpoint-item ${filters['breakpoint'] === breakpoint.value ? 'active-breakpoint' : ''}`} key={index} onClick={() => handleChange('breakpoint', breakpoint.value)}>
                                {breakpoint.label}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='select-view'>
                <Select
                    mode="multiple"
                    allowClear
                    className='select-view-input'
                    placeholder="Influencers"
                    value={filters['influencers']}
                    onChange={(value) => handleChange('influencers', value)}
                    options={options['influencers']} />
                <Select
                    mode="multiple"
                    allowClear
                    className='select-view-input'
                    placeholder="Business"
                    value={filters['business']}
                    onChange={(value) => handleChange('business', value)}
                    options={options['business']} />
                <Select
                    mode="multiple"
                    allowClear
                    className='select-view-input'
                    placeholder="Platforms"
                    value={filters['platforms']}
                    onChange={(value) => handleChange('platforms', value)}
                    options={options['platforms']} />
                <Select
                    mode="multiple"
                    allowClear
                    className='select-view-input'
                    placeholder="Ads"
                    value={filters['ads']}
                    onChange={(value) => handleChange('ads', value)}
                    options={options['ads']} />
                <Select
                    mode="multiple"
                    allowClear
                    className='select-view-input'
                    placeholder="Jobs"
                    value={filters['jobs']}
                    onChange={(value) => handleChange('jobs', value)}
                    options={options['jobs']} />
                <DatePicker
                    className='select-view-input'
                    placeholder="Start Date"
                    value={filters['startDate']}
                    onChange={(value) => handleChange('startDate', value)} />
                <DatePicker
                    className='select-view-input'
                    placeholder="End Date"
                    value={filters['endDate']}
                    onChange={(value) => handleChange('endDate', value)} />
            </div>

            <div className='filter-applied'>
                {Object.keys(filters)?.map((item, index) => {
                    if (dateFilters?.includes(item) && filters[item]) return (
                        <div className='filter-applied-item' key={index}>
                            {moment(filters[item]).format('DD MMM YYYY')}
                            <div className='remove-icon' onClick={() => setFilters({ ...filters, [item]: null })}>
                                <img src={CloseIcon} alt='close' />
                            </div>
                        </div>
                    )
                    if (arrayFilters?.includes(item) && filters[item]?.length !== 0)
                        return filters[item]?.map((fill, index) => {
                            const matched = options[item]?.find(elem => elem.value === fill)
                            return (
                                <div className='filter-applied-item' key={index}>
                                    {matched?.label}
                                    <div className='remove-icon' onClick={() => handleRemoveFilter(item, fill)}>
                                        <img src={CloseIcon} alt='close' />
                                    </div>
                                </div>
                            )
                        })
                    return null
                })}
            </div>
        </div>
    )
}

export default MetricsFilter;