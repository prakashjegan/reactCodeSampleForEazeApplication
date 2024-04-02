import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import './style.scss';
import metricsService from '../../services/metricsService';
import MetricsOverallPerformanceView from './components/overall-performance-view';
import MetricsOverallPerformanceEvents from './components/overall-performance-events';
import MetricsCostPerConversion from './components/cost-per-conversion';
import MetricsRevenuePerConversion from './components/revenue-per-conversion';
import { Skeleton } from 'antd';
import MetricsNeedToImprove from './components/need-to-improve';
import MetricsTopPerformance from './components/top-performance';

const Metrics = () => {
    const [options, setOptions] = useState({ influencers: [], business: [], ads: [], jobs: [], platforms: [] });
    const [optionLoading, setOptionLoading] = useState(true);

    useEffect(() => {
        fetchAttributes();
    }, [])

    const fetchAttributes = () => {
        setOptionLoading(true);
        metricsService.fetchAttribute()
            .then(res => {
                configureOptions(res?.data?.message);
                setOptionLoading(false)
            }).catch(() => setOptionLoading(false))
    }

    const configureOptions = (data) => {
        const influencersList = data?.influencers?.map(item => {
            return { ...item, label: item?.userName, value: item?.partnerId }
        })

        const businessList = data?.businesses?.map(item => {
            return { label: item?.userName, value: item?.partnerId }
        })

        const jobsList = data?.jobs?.map(item => {
            return { label: item?.jobName, value: item?.jobID }
        })

        const adsList = data?.ads?.map(item => {
            console.log(item)
            return { label: item?.jobName, value: item?.jobDefinitionId }
        })

        const platformsList = data?.platformTypes?.map(item => {
            return { label: item, value: item }
        })
        setOptions({ ...options, influencers: influencersList, business: businessList, jobs: jobsList, ads: adsList, platforms: platformsList })
    }

    return (
        <div className='metrics-container'>
            {optionLoading && <Skeleton avatar paragraph={{ rows: 4 }} />}
            {!optionLoading && <div>
                <MetricsOverallPerformanceView options={options} />
                <MetricsCostPerConversion options={options} />
                <MetricsRevenuePerConversion options={options} />
                <MetricsOverallPerformanceEvents options={options} />
                <MetricsNeedToImprove options={options}/>
                <MetricsTopPerformance options={options}/>
            </div>}
        </div>
    )
}

export default Layout(Metrics);